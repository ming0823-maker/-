import { query } from './db.js';

/**
 * 格式化日期為 YYYY-MM-DD
 */
function formatDate(dateVal) {
  if (!dateVal) return null;
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化時間為 HH:mm
 */
function formatTime(timeVal) {
  if (!timeVal) return '';
  if (typeof timeVal === 'string' && timeVal.includes(':')) {
    return timeVal.substring(0, 5);
  }
  return String(timeVal);
}

// ==========================================
// 1. 儀表板相關查詢 (Dashboard Service)
// ==========================================
export async function getDashboardStats() {
  // 1. 統計圖書冊數
  const [bookStats] = await query(`
    SELECT 
      COUNT(*) AS totalTitles,
      COALESCE(SUM(total_copies), 0) AS totalCopies,
      COALESCE(SUM(available_copies), 0) AS availableCopies
    FROM books
  `);

  const totalTitles = Number(bookStats.totalTitles) || 0;
  const totalCopies = Number(bookStats.totalCopies) || 0;
  const availableCopies = Number(bookStats.availableCopies) || 0;
  const borrowedCopies = totalCopies - availableCopies;

  // 2. 統計讀者
  const [memberStats] = await query(`
    SELECT 
      COUNT(*) AS totalMembers,
      COUNT(CASE WHEN status = 'active' THEN 1 END) AS activeMembers
    FROM members
  `);

  // 3. 統計流通借閱
  const [loanStats] = await query(`
    SELECT 
      COUNT(CASE WHEN status IN ('borrowed', 'overdue') THEN 1 END) AS activeLoansCount,
      COUNT(CASE WHEN status = 'overdue' THEN 1 END) AS overdueLoansCount
    FROM loans
  `);

  // 4. 各類別藏書量分佈
  const catRows = await query(`
    SELECT 
      c.category_name AS category,
      COALESCE(SUM(b.total_copies), 0) AS copies
    FROM categories c
    LEFT JOIN books b ON c.category_id = b.category_id
    GROUP BY c.category_id, c.category_name
  `);
  const categoryCounts = {};
  for (const row of catRows) {
    categoryCounts[row.category] = Number(row.copies);
  }

  // 5. 最近 5 筆借閱
  const recentLoansRaw = await query(`
    SELECT 
      l.loan_id AS id,
      l.book_id AS bookId,
      b.title AS bookTitle,
      l.member_id AS memberId,
      m.name AS memberName,
      l.borrow_date AS borrowDate,
      l.due_date AS dueDate,
      l.return_date AS returnDate,
      l.status,
      l.renew_count AS renewCount,
      l.fine_amount AS fine
    FROM loans l
    INNER JOIN books b ON l.book_id = b.book_id
    INNER JOIN members m ON l.member_id = m.member_id
    ORDER BY l.borrow_date DESC, l.created_at DESC
    LIMIT 5
  `);
  const recentLoans = recentLoansRaw.map(r => ({
    ...r,
    borrowDate: formatDate(r.borrowDate),
    dueDate: formatDate(r.dueDate),
    returnDate: formatDate(r.returnDate),
    fine: Number(r.fine) || 0
  }));

  // 6. 座位統計
  const [seatStats] = await query(`
    SELECT 
      COUNT(*) AS total,
      COUNT(CASE WHEN status = 'available' THEN 1 END) AS available,
      COUNT(CASE WHEN status = 'occupied' THEN 1 END) AS occupied,
      COUNT(CASE WHEN status = 'maintenance' THEN 1 END) AS maintenance
    FROM seats
  `);

  return {
    totalTitles,
    totalCopies,
    availableCopies,
    borrowedCopies,
    totalMembers: Number(memberStats.totalMembers) || 0,
    activeMembers: Number(memberStats.activeMembers) || 0,
    activeLoansCount: Number(loanStats.activeLoansCount) || 0,
    overdueLoansCount: Number(loanStats.overdueLoansCount) || 0,
    categoryCounts,
    recentLoans,
    seats: {
      total: Number(seatStats.total) || 0,
      available: Number(seatStats.available) || 0,
      occupied: Number(seatStats.occupied) || 0,
      reserved: 0,
      maintenance: Number(seatStats.maintenance) || 0
    }
  };
}

// ==========================================
// 2. 館藏圖書相關 (Books Service)
// ==========================================
export async function getBooks({ search, category } = {}) {
  let sql = `
    SELECT 
      b.book_id AS id,
      b.isbn,
      b.title,
      b.author,
      b.publisher,
      c.category_name AS category,
      b.publish_year AS publishYear,
      b.location,
      b.total_copies AS totalCopies,
      b.available_copies AS availableCopies,
      b.cover_color AS coverColor,
      b.description
    FROM books b
    LEFT JOIN categories c ON b.category_id = c.category_id
    WHERE 1=1
  `;
  const params = [];

  if (category && category !== '全部') {
    sql += ` AND c.category_name = ?`;
    params.push(category);
  }

  if (search) {
    sql += ` AND (
      b.title LIKE ? OR 
      b.author LIKE ? OR 
      b.isbn LIKE ? OR 
      b.publisher LIKE ? OR 
      b.book_id LIKE ?
    )`;
    const q = `%${search.trim()}%`;
    params.push(q, q, q, q, q);
  }

  sql += ` ORDER BY b.book_id ASC`;
  return await query(sql, params);
}

export async function getBookById(id) {
  const rows = await query(`
    SELECT 
      b.book_id AS id,
      b.isbn,
      b.title,
      b.author,
      b.publisher,
      c.category_name AS category,
      b.publish_year AS publishYear,
      b.location,
      b.total_copies AS totalCopies,
      b.available_copies AS availableCopies,
      b.cover_color AS coverColor,
      b.description
    FROM books b
    LEFT JOIN categories c ON b.category_id = c.category_id
    WHERE b.book_id = ?
  `, [id]);
  return rows[0] || null;
}

export async function createBook(bookData) {
  const { title, isbn, author, publisher, category, publishYear, location, totalCopies, description, coverColor } = bookData;

  // 取得或自動建立分類
  let catId = 1;
  if (category) {
    const catRows = await query(`SELECT category_id FROM categories WHERE category_name = ?`, [category]);
    if (catRows.length > 0) {
      catId = catRows[0].category_id;
    } else {
      const code = category.substring(0, 4).toUpperCase();
      const insertCat = await query(`INSERT INTO categories (category_name, code) VALUES (?, ?)`, [category, code]);
      catId = insertCat.insertId;
    }
  }

  // 產生下一個 BK- 編號
  const [maxRow] = await query(`
    SELECT MAX(CAST(SUBSTRING(book_id, 4) AS UNSIGNED)) AS maxNum FROM books
  `);
  const nextNum = (maxRow.maxNum || 1000) + 1;
  const bookId = `BK-${nextNum}`;

  const copies = parseInt(totalCopies, 10) || 1;
  const finalIsbn = isbn ? isbn.trim() : `978${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  await query(`
    INSERT INTO books (
      book_id, isbn, title, author, publisher, category_id,
      publish_year, location, total_copies, available_copies,
      cover_color, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    bookId,
    finalIsbn,
    title.trim(),
    author.trim(),
    publisher ? publisher.trim() : '通用出版社',
    catId,
    parseInt(publishYear, 10) || new Date().getFullYear(),
    location || 'A區-01架',
    copies,
    copies,
    coverColor || '#3b82f6',
    description ? description.trim() : ''
  ]);

  return await getBookById(bookId);
}

export async function updateBook(id, bookData) {
  const current = await getBookById(id);
  if (!current) return null;

  const { title, isbn, author, publisher, category, publishYear, location, totalCopies, description, coverColor } = bookData;

  let catId = null;
  if (category !== undefined) {
    const catRows = await query(`SELECT category_id FROM categories WHERE category_name = ?`, [category]);
    if (catRows.length > 0) {
      catId = catRows[0].category_id;
    }
  }

  const newTotal = totalCopies !== undefined ? parseInt(totalCopies, 10) : current.totalCopies;
  const borrowedCount = current.totalCopies - current.availableCopies;

  if (newTotal < borrowedCount) {
    throw new Error(`總館藏量不能小於目前借出量 (${borrowedCount} 本)`);
  }

  const newAvailable = newTotal - borrowedCount;

  await query(`
    UPDATE books SET
      title = COALESCE(?, title),
      isbn = COALESCE(?, isbn),
      author = COALESCE(?, author),
      publisher = COALESCE(?, publisher),
      category_id = COALESCE(?, category_id),
      publish_year = COALESCE(?, publish_year),
      location = COALESCE(?, location),
      total_copies = ?,
      available_copies = ?,
      cover_color = COALESCE(?, cover_color),
      description = COALESCE(?, description)
    WHERE book_id = ?
  `, [
    title !== undefined ? title.trim() : null,
    isbn !== undefined ? isbn.trim() : null,
    author !== undefined ? author.trim() : null,
    publisher !== undefined ? publisher.trim() : null,
    catId,
    publishYear !== undefined ? parseInt(publishYear, 10) : null,
    location !== undefined ? location : null,
    newTotal,
    newAvailable,
    coverColor || null,
    description !== undefined ? description.trim() : null,
    id
  ]);

  return await getBookById(id);
}

export async function deleteBook(id) {
  const activeLoans = await query(`
    SELECT loan_id FROM loans 
    WHERE book_id = ? AND status IN ('borrowed', 'overdue')
  `, [id]);

  if (activeLoans.length > 0) {
    throw new Error('該書籍尚有借出未歸還紀錄，無法刪除！');
  }

  const result = await query(`DELETE FROM books WHERE book_id = ?`, [id]);
  return result.affectedRows > 0;
}

// ==========================================
// 3. 讀者會員相關 (Members Service)
// ==========================================
export async function getMembers({ search, type } = {}) {
  let sql = `
    SELECT 
      m.member_id AS id,
      m.name,
      mt.type_name AS type,
      m.email,
      m.phone,
      m.status,
      m.joined_date AS joinedDate,
      COUNT(CASE WHEN l.status IN ('borrowed', 'overdue') THEN 1 END) AS currentBorrowed,
      mt.max_borrow_limit AS maxBorrowLimit,
      m.notes
    FROM members m
    INNER JOIN member_types mt ON m.type_id = mt.type_id
    LEFT JOIN loans l ON m.member_id = l.member_id
    WHERE 1=1
  `;
  const params = [];

  if (type && type !== '全部') {
    sql += ` AND mt.type_name = ?`;
    params.push(type);
  }

  if (search) {
    sql += ` AND (
      m.name LIKE ? OR 
      m.member_id LIKE ? OR 
      m.email LIKE ? OR 
      m.phone LIKE ?
    )`;
    const q = `%${search.trim()}%`;
    params.push(q, q, q, q);
  }

  sql += ` GROUP BY m.member_id, m.name, mt.type_name, m.email, m.phone, m.status, m.joined_date, mt.max_borrow_limit, m.notes`;
  sql += ` ORDER BY m.member_id ASC`;

  const rows = await query(sql, params);
  return rows.map(r => ({
    ...r,
    joinedDate: formatDate(r.joinedDate),
    currentBorrowed: Number(r.currentBorrowed) || 0
  }));
}

export async function getMemberById(id) {
  const members = await getMembers({ search: id });
  return members.find(m => m.id === id) || null;
}

export async function createMember(memberData) {
  const { name, type, email, phone, maxBorrowLimit, notes } = memberData;

  // 取得身分 ID
  const typeName = type || '學生';
  const typeRows = await query(`SELECT type_id FROM member_types WHERE type_name = ?`, [typeName]);
  const typeId = typeRows.length > 0 ? typeRows[0].type_id : 1;

  // 產生新證號
  const [maxRow] = await query(`
    SELECT MAX(CAST(SUBSTRING(member_id, 5) AS UNSIGNED)) AS maxNum FROM members
  `);
  const nextNum = (maxRow.maxNum || 2000) + 1;
  const memberId = `MEM-${nextNum}`;

  const today = new Date().toISOString().split('T')[0];

  await query(`
    INSERT INTO members (
      member_id, type_id, name, email, phone, status, joined_date, notes
    ) VALUES (?, ?, ?, ?, ?, 'active', ?, ?)
  `, [
    memberId,
    typeId,
    name.trim(),
    email ? email.trim() : `${memberId.toLowerCase()}@library.local`,
    phone ? phone.trim() : '',
    today,
    notes ? notes.trim() : ''
  ]);

  return await getMemberById(memberId);
}

export async function updateMember(id, memberData) {
  const current = await getMemberById(id);
  if (!current) return null;

  const { name, type, email, phone, status, notes } = memberData;

  let typeId = null;
  if (type !== undefined) {
    const typeRows = await query(`SELECT type_id FROM member_types WHERE type_name = ?`, [type]);
    if (typeRows.length > 0) typeId = typeRows[0].type_id;
  }

  await query(`
    UPDATE members SET
      name = COALESCE(?, name),
      type_id = COALESCE(?, type_id),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      status = COALESCE(?, status),
      notes = COALESCE(?, notes)
    WHERE member_id = ?
  `, [
    name !== undefined ? name.trim() : null,
    typeId,
    email !== undefined ? email.trim() : null,
    phone !== undefined ? phone.trim() : null,
    status !== undefined ? status : null,
    notes !== undefined ? notes.trim() : null,
    id
  ]);

  return await getMemberById(id);
}

export async function deleteMember(id) {
  const activeLoans = await query(`
    SELECT loan_id FROM loans 
    WHERE member_id = ? AND status IN ('borrowed', 'overdue')
  `, [id]);

  if (activeLoans.length > 0) {
    throw new Error('該讀者尚有借閱中書籍，無法刪除！');
  }

  const result = await query(`DELETE FROM members WHERE member_id = ?`, [id]);
  return result.affectedRows > 0;
}

// ==========================================
// 4. 借閱流通相關 (Loans Service)
// ==========================================
export async function getLoans({ status, search } = {}) {
  let sql = `
    SELECT 
      l.loan_id AS id,
      l.book_id AS bookId,
      b.title AS bookTitle,
      l.member_id AS memberId,
      m.name AS memberName,
      l.borrow_date AS borrowDate,
      l.due_date AS dueDate,
      l.return_date AS returnDate,
      l.status,
      l.renew_count AS renewCount,
      l.fine_amount AS fine
    FROM loans l
    INNER JOIN books b ON l.book_id = b.book_id
    INNER JOIN members m ON l.member_id = m.member_id
    WHERE 1=1
  `;
  const params = [];

  if (status && status !== 'all') {
    if (status === 'active') {
      sql += ` AND l.status IN ('borrowed', 'overdue')`;
    } else {
      sql += ` AND l.status = ?`;
      params.push(status);
    }
  }

  if (search) {
    sql += ` AND (
      b.title LIKE ? OR 
      m.name LIKE ? OR 
      l.book_id LIKE ? OR 
      l.member_id LIKE ? OR 
      l.loan_id LIKE ?
    )`;
    const q = `%${search.trim()}%`;
    params.push(q, q, q, q, q);
  }

  sql += ` ORDER BY l.borrow_date DESC, l.created_at DESC`;
  const rows = await query(sql, params);
  return rows.map(r => ({
    ...r,
    borrowDate: formatDate(r.borrowDate),
    dueDate: formatDate(r.dueDate),
    returnDate: formatDate(r.returnDate),
    fine: Number(r.fine) || 0
  }));
}

export async function borrowBook({ bookId, memberId, days }) {
  const book = await getBookById(bookId);
  if (!book) throw new Error('找不到該書籍');
  if (book.availableCopies <= 0) {
    throw new Error(`《${book.title}》目前所有館藏已全數借出！`);
  }

  const member = await getMemberById(memberId);
  if (!member) throw new Error('找不到該讀者');
  if (member.status !== 'active') {
    throw new Error(`讀者 ${member.name} 狀態為停用，無法借書！`);
  }
  if (member.currentBorrowed >= member.maxBorrowLimit) {
    throw new Error(`讀者 ${member.name} 已達借書上限 (${member.maxBorrowLimit} 本)`);
  }

  // 檢查是否尚有逾期書籍
  const overdues = await query(`
    SELECT loan_id FROM loans 
    WHERE member_id = ? AND status = 'overdue'
  `, [memberId]);
  if (overdues.length > 0) {
    throw new Error(`讀者 ${member.name} 尚有 ${overdues.length} 本逾期書籍未還，請先完成歸還與繳清罰款！`);
  }

  const borrowDays = parseInt(days, 10) || 14;
  const now = new Date();
  const borrowDate = formatDate(now);
  now.setDate(now.getDate() + borrowDays);
  const dueDate = formatDate(now);

  const [maxRow] = await query(`
    SELECT MAX(CAST(SUBSTRING(loan_id, 4) AS UNSIGNED)) AS maxNum FROM loans
  `);
  const nextNum = (maxRow.maxNum || 3000) + 1;
  const loanId = `LN-${nextNum}`;

  // 交易處理：減少庫存、新增借閱
  await query(`
    INSERT INTO loans (loan_id, book_id, member_id, borrow_date, due_date, status, renew_count, fine_amount)
    VALUES (?, ?, ?, ?, ?, 'borrowed', 0, 0.00)
  `, [loanId, bookId, memberId, borrowDate, dueDate]);

  await query(`
    UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?
  `, [bookId]);

  return {
    id: loanId,
    bookId,
    bookTitle: book.title,
    memberId,
    memberName: member.name,
    borrowDate,
    dueDate,
    returnDate: null,
    status: 'borrowed',
    renewCount: 0,
    fine: 0
  };
}

export async function returnBook(loanId) {
  const loans = await query(`SELECT * FROM loans WHERE loan_id = ?`, [loanId]);
  if (loans.length === 0) throw new Error('找不到該借閱紀錄');
  const loan = loans[0];
  if (loan.status === 'returned') throw new Error('該書籍已經歸還過');

  const today = formatDate(new Date());

  await query(`
    UPDATE loans 
    SET status = 'returned', return_date = ?
    WHERE loan_id = ?
  `, [today, loanId]);

  await query(`
    UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?
  `, [loan.book_id]);

  const [updated] = await getLoans({ search: loanId });
  return updated;
}

export async function renewBook(loanId) {
  const loans = await query(`SELECT * FROM loans WHERE loan_id = ?`, [loanId]);
  if (loans.length === 0) throw new Error('找不到該借閱紀錄');
  const loan = loans[0];
  if (loan.status === 'returned') throw new Error('已歸還書籍無法續借');
  if (loan.status === 'overdue') throw new Error('逾期書籍無法線上續借，請直接至櫃台歸還');
  if (loan.renew_count >= 2) throw new Error('已達到最大續借次數 (最多續借 2 次)');

  const currentDue = new Date(loan.due_date);
  currentDue.setDate(currentDue.getDate() + 14);
  const newDueDate = formatDate(currentDue);

  await query(`
    UPDATE loans 
    SET due_date = ?, renew_count = renew_count + 1
    WHERE loan_id = ?
  `, [newDueDate, loanId]);

  const [updated] = await getLoans({ search: loanId });
  return updated;
}

// ==========================================
// 5. 自習座位相關 (Seats Service)
// ==========================================
export async function getSeats({ zone, status } = {}) {
  let sql = `
    SELECT 
      s.seat_id AS id,
      s.seat_number AS name,
      s.zone_name AS zone,
      s.seat_type AS type,
      s.features,
      s.status
    FROM seats s
    WHERE 1=1
  `;
  const params = [];

  if (zone && zone !== '全部') {
    sql += ` AND s.zone_name = ?`;
    params.push(zone);
  }
  if (status && status !== '全部') {
    sql += ` AND s.status = ?`;
    params.push(status);
  }

  sql += ` ORDER BY s.seat_id ASC`;
  const seats = await query(sql, params);

  // 解析 features 字串為陣列
  return seats.map(s => ({
    ...s,
    features: s.features ? s.features.split(',').map(f => f.trim()) : []
  }));
}

export async function getSeatStats() {
  const [stats] = await query(`
    SELECT 
      COUNT(*) AS total,
      COUNT(CASE WHEN status = 'available' THEN 1 END) AS available,
      COUNT(CASE WHEN status = 'occupied' THEN 1 END) AS occupied,
      COUNT(CASE WHEN status = 'maintenance' THEN 1 END) AS maintenance
    FROM seats
  `);

  const today = formatDate(new Date());
  const [todayRes] = await query(`
    SELECT COUNT(*) AS count FROM seat_reservations WHERE reserve_date = ?
  `, [today]);

  return {
    total: Number(stats.total) || 0,
    available: Number(stats.available) || 0,
    occupied: Number(stats.occupied) || 0,
    reserved: 0,
    maintenance: Number(stats.maintenance) || 0,
    todayReservationsCount: Number(todayRes.count) || 0
  };
}

export async function getReservations({ date, status, memberId } = {}) {
  let sql = `
    SELECT 
      r.reservation_id AS id,
      r.seat_id AS seatId,
      s.seat_number AS seatName,
      s.zone_name AS zone,
      r.member_id AS memberId,
      m.name AS memberName,
      r.reserve_date AS date,
      r.start_time AS startTime,
      r.end_time AS endTime,
      r.duration_hours AS durationHours,
      r.status,
      r.created_at AS createdAt
    FROM seat_reservations r
    INNER JOIN seats s ON r.seat_id = s.seat_id
    INNER JOIN members m ON r.member_id = m.member_id
    WHERE 1=1
  `;
  const params = [];

  if (date) {
    sql += ` AND r.reserve_date = ?`;
    params.push(date);
  }
  if (status && status !== '全部') {
    sql += ` AND r.status = ?`;
    params.push(status);
  }
  if (memberId) {
    sql += ` AND r.member_id = ?`;
    params.push(memberId);
  }

  sql += ` ORDER BY r.reserve_date DESC, r.start_time DESC`;
  const rows = await query(sql, params);
  return rows.map(r => ({
    ...r,
    date: formatDate(r.date),
    startTime: formatTime(r.startTime),
    endTime: formatTime(r.endTime)
  }));
}

export async function reserveSeat({ seatId, memberId, date, startTime, durationHours }) {
  const member = await getMemberById(memberId);
  if (!member) throw new Error('讀者證號不存在');
  if (member.status !== 'active') throw new Error('該讀者已被停權，無法預約座位');

  const startHour = parseInt(startTime.split(':')[0], 10);
  const dur = parseInt(durationHours, 10) || 2;
  const endHour = startHour + dur;
  const formattedStart = `${String(startHour).padStart(2, '0')}:00:00`;
  const formattedEnd = `${String(endHour).padStart(2, '0')}:00:00`;

  // 檢查時段衝突 (同一座位同時段已有人預約或使用中)
  const conflicts = await query(`
    SELECT reservation_id FROM seat_reservations
    WHERE seat_id = ? AND reserve_date = ? AND status IN ('reserved', 'checked_in')
    AND NOT (end_time <= ? OR start_time >= ?)
  `, [seatId, date, formattedStart, formattedEnd]);

  if (conflicts.length > 0) {
    throw new Error('該時段此座位已被預約，請選擇其他座位或時段！');
  }

  const [maxRow] = await query(`
    SELECT MAX(CAST(SUBSTRING(reservation_id, 5) AS UNSIGNED)) AS maxNum FROM seat_reservations
  `);
  const nextNum = (maxRow.maxNum || 4000) + 1;
  const resId = `RES-${nextNum}`;

  await query(`
    INSERT INTO seat_reservations (
      reservation_id, seat_id, member_id, reserve_date,
      start_time, end_time, duration_hours, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'reserved')
  `, [resId, seatId, memberId, date, formattedStart, formattedEnd, dur]);

  const [created] = await getReservations({ memberId });
  return created;
}

export async function checkinSeat(reservationId) {
  const [res] = await query(`SELECT * FROM seat_reservations WHERE reservation_id = ?`, [reservationId]);
  if (!res) throw new Error('找不到該預約紀錄');

  await query(`UPDATE seat_reservations SET status = 'checked_in' WHERE reservation_id = ?`, [reservationId]);
  await query(`UPDATE seats SET status = 'occupied' WHERE seat_id = ?`, [res.seat_id]);

  return { success: true, message: '簽到成功！' };
}

export async function releaseSeat({ seatId, reservationId }) {
  if (reservationId) {
    await query(`UPDATE seat_reservations SET status = 'completed' WHERE reservation_id = ?`, [reservationId]);
  }
  if (seatId) {
    await query(`UPDATE seats SET status = 'available' WHERE seat_id = ?`, [seatId]);
  }
  return { success: true, message: '座位已成功釋放！' };
}

export async function cancelReservation(reservationId) {
  const [res] = await query(`SELECT * FROM seat_reservations WHERE reservation_id = ?`, [reservationId]);
  if (!res) throw new Error('找不到該預約紀錄');

  await query(`UPDATE seat_reservations SET status = 'cancelled' WHERE reservation_id = ?`, [reservationId]);
  await query(`UPDATE seats SET status = 'available' WHERE seat_id = ?`, [res.seat_id]);

  return { success: true, message: '預約已成功取消' };
}
