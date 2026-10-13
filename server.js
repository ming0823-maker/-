import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { testConnection } from './database/db.js';
import * as dbService from './database/libraryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

let isMySqlConnected = false;
async function checkDbConnection() {
  const status = await testConnection();
  isMySqlConnected = status.connected;
  return status;
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database File Paths
const DATA_DIR = path.join(__dirname, 'data');
const BOOKS_FILE = path.join(DATA_DIR, 'books.json');
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json');
const LOANS_FILE = path.join(DATA_DIR, 'loans.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const SEATS_FILE = path.join(DATA_DIR, 'seats.json');
const SEAT_RESERVATIONS_FILE = path.join(DATA_DIR, 'seat_reservations.json');

// Helper functions to read and write JSON files
async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateDateDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = date1 - date2;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Update loan statuses based on due date
async function syncLoanStatuses() {
  const loans = await readJson(LOANS_FILE);
  const settings = await readJson(SETTINGS_FILE);
  const today = getTodayString();
  let modified = false;

  for (const loan of loans) {
    if (loan.status === 'borrowed' || loan.status === 'overdue') {
      const isOverdue = loan.dueDate < today;
      if (isOverdue) {
        if (loan.status !== 'overdue') {
          loan.status = 'overdue';
          modified = true;
        }
        const overdueDays = calculateDateDiff(today, loan.dueDate);
        const expectedFine = (settings.finePerDay || 5) * overdueDays;
        if (loan.fine !== expectedFine) {
          loan.fine = expectedFine;
          modified = true;
        }
      } else {
        if (loan.status === 'overdue') {
          loan.status = 'borrowed';
          loan.fine = 0;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    await writeJson(LOANS_FILE, loans);
  }
  return loans;
}

// ==================== SYSTEM / DATABASE STATUS API ====================
app.get('/api/system/db-status', async (req, res) => {
  const status = await checkDbConnection();
  res.json({
    engine: isMySqlConnected ? 'MySQL' : 'JSON Store',
    isMySqlConnected,
    database: 'smart_library',
    error: status.error || null
  });
});

// ==================== DASHBOARD API ====================
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const stats = await dbService.getDashboardStats();
      return res.json(stats);
    }

    const books = await readJson(BOOKS_FILE);
    const members = await readJson(MEMBERS_FILE);
    const loans = await syncLoanStatuses();
    const seats = await readJson(SEATS_FILE);
    const seatReservations = await readJson(SEAT_RESERVATIONS_FILE);

    const totalTitles = books.length;
    const totalCopies = books.reduce((acc, b) => acc + (Number(b.totalCopies) || 0), 0);
    const availableCopies = books.reduce((acc, b) => acc + (Number(b.availableCopies) || 0), 0);
    const borrowedCopies = totalCopies - availableCopies;

    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'active').length;

    const activeLoans = loans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
    const overdueLoans = loans.filter(l => l.status === 'overdue');

    // Seat stats
    const totalSeats = seats.length;
    const availableSeats = seats.filter(s => s.status === 'available').length;
    const occupiedSeats = seats.filter(s => s.status === 'occupied').length;
    const reservedSeats = seats.filter(s => s.status === 'reserved').length;

    // Category distribution
    const categoryCounts = {};
    for (const b of books) {
      const cat = b.category || '未分類';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + (Number(b.totalCopies) || 1);
    }

    // Recent 5 loans
    const recentLoans = [...loans]
      .sort((a, b) => b.borrowDate.localeCompare(a.borrowDate))
      .slice(0, 5);

    res.json({
      totalTitles,
      totalCopies,
      availableCopies,
      borrowedCopies,
      totalMembers,
      activeMembers,
      activeLoansCount: activeLoans.length,
      overdueLoansCount: overdueLoans.length,
      categoryCounts,
      recentLoans,
      seats: {
        total: totalSeats,
        available: availableSeats,
        occupied: occupiedSeats,
        reserved: reservedSeats
      }
    });
  } catch (err) {
    res.status(500).json({ error: '無法讀取儀表板資訊: ' + err.message });
  }
});

// ==================== BOOKS API ====================
app.get('/api/books', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const books = await dbService.getBooks(req.query);
      return res.json(books);
    }

    const { search, category } = req.query;
    let books = await readJson(BOOKS_FILE);

    if (category && category !== '全部') {
      books = books.filter(b => b.category === category);
    }

    if (search) {
      const q = search.trim().toLowerCase();
      books = books.filter(b =>
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.isbn && b.isbn.toLowerCase().includes(q)) ||
        (b.publisher && b.publisher.toLowerCase().includes(q)) ||
        (b.id && b.id.toLowerCase().includes(q))
      );
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const book = await dbService.getBookById(req.params.id);
      if (!book) return res.status(404).json({ error: '找不到該書籍' });
      return res.json(book);
    }

    const books = await readJson(BOOKS_FILE);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: '找不到該書籍' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const newBook = await dbService.createBook(req.body);
      return res.status(201).json(newBook);
    }

    const books = await readJson(BOOKS_FILE);
    const { title, isbn, author, publisher, category, publishYear, location, totalCopies, description, coverColor } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: '書名與作者為必填項目' });
    }

    const nextNumber = books.length > 0
      ? Math.max(...books.map(b => parseInt(b.id.replace('BK-', ''), 10) || 1000)) + 1
      : 1001;

    const copies = parseInt(totalCopies, 10) || 1;

    const newBook = {
      id: `BK-${nextNumber}`,
      title: title.trim(),
      isbn: isbn ? isbn.trim() : `978${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      author: author.trim(),
      publisher: publisher ? publisher.trim() : '通用出版社',
      category: category || '未分類',
      publishYear: parseInt(publishYear, 10) || new Date().getFullYear(),
      location: location || 'A區-01架',
      totalCopies: copies,
      availableCopies: copies,
      coverColor: coverColor || '#3b82f6',
      description: description ? description.trim() : ''
    };

    books.push(newBook);
    await writeJson(BOOKS_FILE, books);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const updated = await dbService.updateBook(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: '找不到該書籍' });
      return res.json(updated);
    }

    const books = await readJson(BOOKS_FILE);
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: '找不到該書籍' });

    const currentBook = books[index];
    const { title, isbn, author, publisher, category, publishYear, location, totalCopies, description, coverColor } = req.body;

    const newTotal = parseInt(totalCopies, 10) || currentBook.totalCopies;
    const borrowedCount = currentBook.totalCopies - currentBook.availableCopies;
    
    if (newTotal < borrowedCount) {
      return res.status(400).json({ error: `總館藏量不能小於目前借出量 (${borrowedCount} 本)` });
    }

    const updatedBook = {
      ...currentBook,
      title: title !== undefined ? title.trim() : currentBook.title,
      isbn: isbn !== undefined ? isbn.trim() : currentBook.isbn,
      author: author !== undefined ? author.trim() : currentBook.author,
      publisher: publisher !== undefined ? publisher.trim() : currentBook.publisher,
      category: category !== undefined ? category : currentBook.category,
      publishYear: publishYear !== undefined ? parseInt(publishYear, 10) : currentBook.publishYear,
      location: location !== undefined ? location : currentBook.location,
      totalCopies: newTotal,
      availableCopies: newTotal - borrowedCount,
      coverColor: coverColor || currentBook.coverColor,
      description: description !== undefined ? description.trim() : currentBook.description
    };

    books[index] = updatedBook;
    await writeJson(BOOKS_FILE, books);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    if (isMySqlConnected) {
      await dbService.deleteBook(req.params.id);
      return res.json({ success: true, message: '書籍已成功刪除' });
    }

    const books = await readJson(BOOKS_FILE);
    const loans = await readJson(LOANS_FILE);
    const bookId = req.params.id;

    // Check if book has active loans
    const hasActiveLoan = loans.some(l => l.bookId === bookId && (l.status === 'borrowed' || l.status === 'overdue'));
    if (hasActiveLoan) {
      return res.status(400).json({ error: '該書籍尚有借出未歸還紀錄，無法刪除！' });
    }

    const filtered = books.filter(b => b.id !== bookId);
    if (filtered.length === books.length) {
      return res.status(404).json({ error: '找不到該書籍' });
    }

    await writeJson(BOOKS_FILE, filtered);
    res.json({ success: true, message: '書籍已成功刪除' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== MEMBERS API ====================
app.get('/api/members', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const members = await dbService.getMembers(req.query);
      return res.json(members);
    }

    const { search, type } = req.query;
    let members = await readJson(MEMBERS_FILE);

    if (type && type !== '全部') {
      members = members.filter(m => m.type === type);
    }

    if (search) {
      const q = search.trim().toLowerCase();
      members = members.filter(m =>
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.id && m.id.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.phone && m.phone.toLowerCase().includes(q))
      );
    }

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const newMember = await dbService.createMember(req.body);
      return res.status(201).json(newMember);
    }

    const members = await readJson(MEMBERS_FILE);
    const { name, type, email, phone, maxBorrowLimit, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: '讀者姓名為必填項目' });
    }

    const nextNumber = members.length > 0
      ? Math.max(...members.map(m => parseInt(m.id.replace('MEM-', ''), 10) || 2000)) + 1
      : 2001;

    const defaultLimits = {
      '學生': 5,
      '教職員': 10,
      '一般讀者': 3
    };

    const newMember = {
      id: `MEM-${nextNumber}`,
      name: name.trim(),
      type: type || '學生',
      email: email ? email.trim() : '',
      phone: phone ? phone.trim() : '',
      status: 'active',
      joinedDate: getTodayString(),
      currentBorrowed: 0,
      maxBorrowLimit: parseInt(maxBorrowLimit, 10) || defaultLimits[type] || 5,
      notes: notes ? notes.trim() : ''
    };

    members.push(newMember);
    await writeJson(MEMBERS_FILE, members);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const updated = await dbService.updateMember(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: '找不到該讀者' });
      return res.json(updated);
    }

    const members = await readJson(MEMBERS_FILE);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: '找不到該讀者' });

    const currentMember = members[index];
    const { name, type, email, phone, status, maxBorrowLimit, notes } = req.body;

    const updatedMember = {
      ...currentMember,
      name: name !== undefined ? name.trim() : currentMember.name,
      type: type !== undefined ? type : currentMember.type,
      email: email !== undefined ? email.trim() : currentMember.email,
      phone: phone !== undefined ? phone.trim() : currentMember.phone,
      status: status !== undefined ? status : currentMember.status,
      maxBorrowLimit: maxBorrowLimit !== undefined ? parseInt(maxBorrowLimit, 10) : currentMember.maxBorrowLimit,
      notes: notes !== undefined ? notes.trim() : currentMember.notes
    };

    members[index] = updatedMember;
    await writeJson(MEMBERS_FILE, members);
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    if (isMySqlConnected) {
      await dbService.deleteMember(req.params.id);
      return res.json({ success: true, message: '讀者已成功刪除' });
    }

    const members = await readJson(MEMBERS_FILE);
    const loans = await readJson(LOANS_FILE);
    const memberId = req.params.id;

    const hasActiveLoan = loans.some(l => l.memberId === memberId && (l.status === 'borrowed' || l.status === 'overdue'));
    if (hasActiveLoan) {
      return res.status(400).json({ error: '該讀者尚有借閱中書籍，無法刪除！' });
    }

    const filtered = members.filter(m => m.id !== memberId);
    if (filtered.length === members.length) {
      return res.status(404).json({ error: '找不到該讀者' });
    }

    await writeJson(MEMBERS_FILE, filtered);
    res.json({ success: true, message: '讀者已成功刪除' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== LOANS / CIRCULATION API ====================
app.get('/api/loans', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const loans = await dbService.getLoans(req.query);
      return res.json(loans);
    }

    const { status, search } = req.query;
    let loans = await syncLoanStatuses();

    if (status && status !== 'all') {
      if (status === 'active') {
        loans = loans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
      } else {
        loans = loans.filter(l => l.status === status);
      }
    }

    if (search) {
      const q = search.trim().toLowerCase();
      loans = loans.filter(l =>
        (l.bookTitle && l.bookTitle.toLowerCase().includes(q)) ||
        (l.memberName && l.memberName.toLowerCase().includes(q)) ||
        (l.bookId && l.bookId.toLowerCase().includes(q)) ||
        (l.memberId && l.memberId.toLowerCase().includes(q)) ||
        (l.id && l.id.toLowerCase().includes(q))
      );
    }

    loans.sort((a, b) => b.borrowDate.localeCompare(a.borrowDate));
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrow a book
app.post('/api/loans/borrow', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const loan = await dbService.borrowBook(req.body);
      return res.status(201).json({ success: true, message: `成功借出《${loan.bookTitle}》！應還日期：${loan.dueDate}`, loan });
    }

    const { bookId, memberId, days } = req.body;
    if (!bookId || !memberId) {
      return res.status(400).json({ error: '請提供書籍編號與讀者證號' });
    }

    const books = await readJson(BOOKS_FILE);
    const members = await readJson(MEMBERS_FILE);
    const loans = await syncLoanStatuses();
    const settings = await readJson(SETTINGS_FILE);

    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ error: '找不到該書籍' });
    if (book.availableCopies <= 0) {
      return res.status(400).json({ error: `《${book.title}》目前所有館藏已全數借出！` });
    }

    const member = members.find(m => m.id === memberId);
    if (!member) return res.status(404).json({ error: '找不到該讀者' });
    if (member.status !== 'active') {
      return res.status(400).json({ error: `讀者 ${member.name} 狀態為停用，無法借書！` });
    }

    if (member.currentBorrowed >= member.maxBorrowLimit) {
      return res.status(400).json({ error: `讀者 ${member.name} 已達借書上限 (${member.maxBorrowLimit} 本)` });
    }

    const memberOverdue = loans.filter(l => l.memberId === memberId && l.status === 'overdue');
    if (memberOverdue.length > 0) {
      return res.status(400).json({ error: `讀者 ${member.name} 尚有 ${memberOverdue.length} 本逾期書籍未還，請先完成歸還與罰款！` });
    }

    const borrowDays = parseInt(days, 10) || settings.maxBorrowDays || 14;
    const borrowDate = getTodayString();
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + borrowDays);
    const dueDate = `${dueDateObj.getFullYear()}-${String(dueDateObj.getMonth() + 1).padStart(2, '0')}-${String(dueDateObj.getDate()).padStart(2, '0')}`;

    const nextNumber = loans.length > 0
      ? Math.max(...loans.map(l => parseInt(l.id.replace('LN-', ''), 10) || 3000)) + 1
      : 3001;

    const newLoan = {
      id: `LN-${nextNumber}`,
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      borrowDate,
      dueDate,
      returnDate: null,
      status: 'borrowed',
      renewCount: 0,
      fine: 0
    };

    book.availableCopies -= 1;
    member.currentBorrowed += 1;
    loans.push(newLoan);

    await Promise.all([
      writeJson(BOOKS_FILE, books),
      writeJson(MEMBERS_FILE, members),
      writeJson(LOANS_FILE, loans)
    ]);

    res.status(201).json({ success: true, message: `成功借出《${book.title}》！應還日期：${dueDate}`, loan: newLoan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return a book
app.post('/api/loans/return', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const loan = await dbService.returnBook(req.body.loanId);
      let msg = `已成功歸還《${loan.bookTitle}》！`;
      if (loan.fine > 0) msg += ` (此筆借閱逾期，應繳罰款 NT$ ${loan.fine} 元)`;
      return res.json({ success: true, message: msg, loan });
    }

    const { loanId } = req.body;
    if (!loanId) return res.status(400).json({ error: '請指定借閱紀錄編號' });

    const loans = await syncLoanStatuses();
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return res.status(404).json({ error: '找不到該借閱紀錄' });
    if (loan.status === 'returned') {
      return res.status(400).json({ error: '該書籍已經歸還過' });
    }

    const books = await readJson(BOOKS_FILE);
    const members = await readJson(MEMBERS_FILE);

    const book = books.find(b => b.id === loan.bookId);
    const member = members.find(m => m.id === loan.memberId);

    loan.returnDate = getTodayString();
    const wasOverdue = loan.status === 'overdue';
    loan.status = 'returned';

    if (book) {
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
    }
    if (member) {
      member.currentBorrowed = Math.max(0, member.currentBorrowed - 1);
    }

    await Promise.all([
      writeJson(BOOKS_FILE, books),
      writeJson(MEMBERS_FILE, members),
      writeJson(LOANS_FILE, loans)
    ]);

    let msg = `已成功歸還《${loan.bookTitle}》！`;
    if (wasOverdue && loan.fine > 0) {
      msg += ` (此筆借閱逾期，應繳罰款 NT$ ${loan.fine} 元)`;
    }

    res.json({ success: true, message: msg, loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Renew loan
app.post('/api/loans/renew', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const loan = await dbService.renewBook(req.body.loanId);
      return res.json({ success: true, message: `續借成功！新歸還期限為：${loan.dueDate}`, loan });
    }

    const { loanId } = req.body;
    const loans = await syncLoanStatuses();
    const settings = await readJson(SETTINGS_FILE);

    const loan = loans.find(l => l.id === loanId);
    if (!loan) return res.status(404).json({ error: '找不到該借閱紀錄' });
    if (loan.status === 'returned') {
      return res.status(400).json({ error: '已歸還書籍無法續借' });
    }
    if (loan.status === 'overdue') {
      return res.status(400).json({ error: '逾期書籍無法線上續借，請直接至櫃台歸還' });
    }
    if (loan.renewCount >= 2) {
      return res.status(400).json({ error: '已達到最大續借次數 (最多續借 2 次)' });
    }

    const currentDue = new Date(loan.dueDate);
    currentDue.setDate(currentDue.getDate() + (settings.maxBorrowDays || 14));
    loan.dueDate = `${currentDue.getFullYear()}-${String(currentDue.getMonth() + 1).padStart(2, '0')}-${String(currentDue.getDate()).padStart(2, '0')}`;
    loan.renewCount += 1;

    await writeJson(LOANS_FILE, loans);
    res.json({ success: true, message: `續借成功！新歸還期限為：${loan.dueDate}`, loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SEATS API ====================
// Get all seats
app.get('/api/seats', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const seats = await dbService.getSeats(req.query);
      return res.json(seats);
    }

    const { zone, status } = req.query;
    let seats = await readJson(SEATS_FILE);
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);

    if (zone && zone !== '全部') {
      seats = seats.filter(s => s.zone === zone);
    }
    if (status && status !== '全部') {
      seats = seats.filter(s => s.status === status);
    }

    const enriched = seats.map(s => {
      let activeRes = null;
      if (s.currentReservationId) {
        activeRes = reservations.find(r => r.id === s.currentReservationId && (r.status === 'active' || r.status === 'reserved' || r.status === 'checked_in'));
      }
      return { ...s, activeReservation: activeRes };
    });

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get seat stats
app.get('/api/seats/stats', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const stats = await dbService.getSeatStats();
      return res.json(stats);
    }

    const seats = await readJson(SEATS_FILE);
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);
    const today = getTodayString();
    const todayRes = reservations.filter(r => r.date === today);

    res.json({
      total: seats.length,
      available: seats.filter(s => s.status === 'available').length,
      occupied: seats.filter(s => s.status === 'occupied').length,
      reserved: seats.filter(s => s.status === 'reserved').length,
      maintenance: seats.filter(s => s.status === 'maintenance').length,
      todayReservationsCount: todayRes.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reservations list
app.get('/api/seats/reservations', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const reservations = await dbService.getReservations(req.query);
      return res.json(reservations);
    }

    const { date, status, memberId } = req.query;
    let reservations = await readJson(SEAT_RESERVATIONS_FILE);

    if (date) {
      reservations = reservations.filter(r => r.date === date);
    }
    if (status && status !== 'all') {
      reservations = reservations.filter(r => r.status === status);
    }
    if (memberId) {
      reservations = reservations.filter(r => r.memberId === memberId);
    }

    reservations.sort((a, b) => {
      const compDate = (b.date || '').localeCompare(a.date || '');
      if (compDate !== 0) return compDate;
      return (b.startTime || '').localeCompare(a.startTime || '');
    });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reserve a seat
app.post('/api/seats/reserve', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const resv = await dbService.reserveSeat(req.body);
      return res.status(201).json({
        success: true,
        message: `預約成功！座位：${resv.seatName} (${resv.zone})，時段：${resv.startTime} ~ ${resv.endTime}`,
        reservation: resv
      });
    }

    const { seatId, memberId, date, startTime, durationHours } = req.body;

    if (!seatId || !memberId || !startTime) {
      return res.status(400).json({ error: '請提供座位編號、讀者證號與預約開始時間！' });
    }

    const seats = await readJson(SEATS_FILE);
    const members = await readJson(MEMBERS_FILE);
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);

    const seat = seats.find(s => s.id === seatId);
    if (!seat) return res.status(404).json({ error: '找不到該座位' });
    if (seat.status === 'maintenance') {
      return res.status(400).json({ error: '該座位維護中，暫停預約！' });
    }

    const member = members.find(m => m.id === memberId);
    if (!member) return res.status(404).json({ error: '找不到該讀者' });
    if (member.status !== 'active') {
      return res.status(400).json({ error: `讀者 ${member.name} 借閱證已停用，無法預約座位！` });
    }

    const targetDate = date || getTodayString();
    const hours = parseInt(durationHours, 10) || 2;

    const [startH, startM] = startTime.split(':').map(Number);
    const endH = startH + hours;
    const endTime = `${String(endH).padStart(2, '0')}:${String(startM || 0).padStart(2, '0')}`;

    // Conflict check on the same date for the seat
    const conflict = reservations.find(r => {
      if (r.seatId === seatId && r.date === targetDate && (r.status === 'active' || r.status === 'reserved' || r.status === 'checked_in')) {
        return !(endTime <= r.startTime || startTime >= r.endTime);
      }
      return false;
    });

    if (conflict) {
      return res.status(400).json({
        error: `該座位在 ${targetDate} ${conflict.startTime} ~ ${conflict.endTime} 已被讀者預約！`
      });
    }

    // Conflict check for member
    const memberConflict = reservations.find(r => {
      if (r.memberId === memberId && r.date === targetDate && (r.status === 'active' || r.status === 'reserved' || r.status === 'checked_in')) {
        return !(endTime <= r.startTime || startTime >= r.endTime);
      }
      return false;
    });

    if (memberConflict) {
      return res.status(400).json({
        error: `讀者 ${member.name} 在此時段 (${memberConflict.startTime}~${memberConflict.endTime}) 已有其他預約席位 (${memberConflict.seatName})！`
      });
    }

    const nextNumber = reservations.length > 0
      ? Math.max(...reservations.map(r => parseInt(r.id.replace('RES-', ''), 10) || 4000)) + 1
      : 4001;

    const newRes = {
      id: `RES-${nextNumber}`,
      seatId: seat.id,
      seatName: seat.name,
      zone: seat.zone,
      memberId: member.id,
      memberName: member.name,
      date: targetDate,
      startTime,
      endTime,
      durationHours: hours,
      status: 'reserved',
      createdAt: `${getTodayString()} ${new Date().toTimeString().slice(0, 5)}`
    };

    reservations.push(newRes);

    if (targetDate === getTodayString() && seat.status === 'available') {
      seat.status = 'reserved';
      seat.currentReservationId = newRes.id;
    }

    await Promise.all([
      writeJson(SEATS_FILE, seats),
      writeJson(SEAT_RESERVATIONS_FILE, reservations)
    ]);

    res.status(201).json({
      success: true,
      message: `預約成功！座位：${seat.name} (${seat.zone})，時段：${startTime} ~ ${endTime}`,
      reservation: newRes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check-in to seat
app.post('/api/seats/checkin', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const result = await dbService.checkinSeat(req.body.reservationId);
      return res.json(result);
    }

    const { reservationId } = req.body;
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);
    const seats = await readJson(SEATS_FILE);

    const r = reservations.find(item => item.id === reservationId);
    if (!r) return res.status(404).json({ error: '找不到該預約紀錄' });
    if (r.status === 'checked_in') return res.status(400).json({ error: '已完成報到使用中' });
    if (r.status === 'completed' || r.status === 'cancelled') {
      return res.status(400).json({ error: '該預約已結束或已取消，無法報到' });
    }

    r.status = 'checked_in';
    const seat = seats.find(s => s.id === r.seatId);
    if (seat) {
      seat.status = 'occupied';
      seat.currentReservationId = r.id;
    }

    await Promise.all([
      writeJson(SEAT_RESERVATIONS_FILE, reservations),
      writeJson(SEATS_FILE, seats)
    ]);

    res.json({ success: true, message: `報到成功！歡迎使用 ${r.seatName} 席位`, reservation: r });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Release seat early / check-out
app.post('/api/seats/release', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const result = await dbService.releaseSeat(req.body);
      return res.json(result);
    }

    const { reservationId } = req.body;
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);
    const seats = await readJson(SEATS_FILE);

    const r = reservations.find(item => item.id === reservationId);
    if (!r) return res.status(404).json({ error: '找不到該預約紀錄' });

    r.status = 'completed';
    const seat = seats.find(s => s.id === r.seatId);
    if (seat && (seat.currentReservationId === r.id || seat.status !== 'maintenance')) {
      seat.status = 'available';
      seat.currentReservationId = null;
    }

    await Promise.all([
      writeJson(SEAT_RESERVATIONS_FILE, reservations),
      writeJson(SEATS_FILE, seats)
    ]);

    res.json({ success: true, message: `已成功簽退！座位 ${r.seatName} 已釋放供他人使用`, reservation: r });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel reservation
app.post('/api/seats/cancel', async (req, res) => {
  try {
    if (isMySqlConnected) {
      const result = await dbService.cancelReservation(req.body.reservationId);
      return res.json(result);
    }

    const { reservationId } = req.body;
    const reservations = await readJson(SEAT_RESERVATIONS_FILE);
    const seats = await readJson(SEATS_FILE);

    const r = reservations.find(item => item.id === reservationId);
    if (!r) return res.status(404).json({ error: '找不到該預約紀錄' });
    if (r.status === 'completed' || r.status === 'cancelled') {
      return res.status(400).json({ error: '該預約已結束或已取消' });
    }

    r.status = 'cancelled';
    const seat = seats.find(s => s.id === r.seatId);
    if (seat && seat.currentReservationId === r.id) {
      seat.status = 'available';
      seat.currentReservationId = null;
    }

    await Promise.all([
      writeJson(SEAT_RESERVATIONS_FILE, reservations),
      writeJson(SEATS_FILE, seats)
    ]);

    res.json({ success: true, message: `預約 ${r.id} 已成功取消，座位已釋出`, reservation: r });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SETTINGS & DEMO RESET API ====================
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await readJson(SETTINGS_FILE);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const current = await readJson(SETTINGS_FILE);
    const updated = { ...current, ...req.body };
    await writeJson(SETTINGS_FILE, updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(PORT, async () => {
  console.log(`=================================================`);
  console.log(`🚀 圖書館管理系統服務已啟動: http://localhost:${PORT}`);
  
  const status = await checkDbConnection();
  if (status.connected) {
    console.log(`🐬 資料庫狀態: [已連線 MySQL] (使用 smart_library 資料庫)`);
  } else {
    console.log(`📁 資料庫狀態: [本機 JSON 模式] (MySQL 離線中，安全無縫降級保護)`);
    console.log(`💡 提示：開啟 MySQL 並匯入 database/setup_all.sql 後，即可一鍵啟用 MySQL！`);
  }
  console.log(`=================================================`);

  // 自動在預設瀏覽器開啟系統（確認伺服器完全就緒後開啟）
  if (process.env.AUTO_OPEN !== 'false') {
    const url = `http://localhost:${PORT}`;
    const cmd = process.platform === 'win32' ? `start ${url}` :
                process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
    exec(cmd, () => {});
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 通訊埠 ${PORT} 已被其他程式佔用，請關閉佔用埠號的程式後重試！`);
  } else {
    console.error(`❌ 伺服器啟動錯誤:`, err.message);
  }
});
