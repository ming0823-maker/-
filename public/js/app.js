// Smart Library OS - Client Application
// Standalone HTML Engine & LocalStorage Persistence Layer

// ================= DATA DEFAULTS =================
const defaultMockBooks = [
  { id: "BK-1001", title: "原子習慣：細微改變帶來巨大成就的實證法則", isbn: "9789861755267", author: "詹姆斯·克利爾 (James Clear)", publisher: "方智出版", category: "心理勵志", publishYear: 2019, location: "A區-02架", totalCopies: 5, availableCopies: 5, coverColor: "#f97316", description: "每天進步1%，一年後你會進步37倍；每天退步1%，一年後你會弱化到趨近於0！" },
  { id: "BK-1002", title: "被討厭的勇氣：自我啟發之父「阿德勒」的教導", isbn: "9789861364018", author: "岸見一郎, 古賀史健", publisher: "究竟出版", category: "心理勵志", publishYear: 2014, location: "A區-03架", totalCopies: 4, availableCopies: 2, coverColor: "#3b82f6", description: "所謂的自由，就是被別人討厭。阿德勒心理學給予現代人勇氣與生命解答。" },
  { id: "BK-1003", title: "Clean Code：無瑕的程式碼 － 敏捷軟體開發技巧守則", isbn: "9789862017050", author: "Robert C. Martin", publisher: "博碩文化", category: "資訊科技", publishYear: 2013, location: "B區-01架", totalCopies: 3, availableCopies: 2, coverColor: "#10b981", description: "軟體品質的衡量標準只有一個：那就是在閱讀程式碼時，每分鐘發出『WTF』的次數。" },
  { id: "BK-1004", title: "深入淺出設計模式 (Head First Design Patterns)", isbn: "9789865022136", author: "Eric Freeman, Elisabeth Robson", publisher: "歐萊禮 (O'Reilly)", category: "資訊科技", publishYear: 2021, location: "B區-01架", totalCopies: 3, availableCopies: 3, coverColor: "#8b5cf6", description: "以神經生物學與認知科學為基礎，幫你快速掌握物件導向設計原則與模式。" },
  { id: "BK-1005", title: "人類大歷史：從野獸到扮演上帝", isbn: "9789863205449", author: "哈拉瑞 (Yuval Noah Harari)", publisher: "天下文化", category: "人文歷史", publishYear: 2014, location: "C區-04架", totalCopies: 4, availableCopies: 3, coverColor: "#eab308", description: "十萬年前，地球上至少有六個人種；為什麼今天只剩我們智人統治世界？" },
  { id: "BK-1006", title: "快思慢想 (Thinking, Fast and Slow)", isbn: "9789862415931", author: "康納曼 (Daniel Kahneman)", publisher: "天下文化", category: "商業理財", publishYear: 2012, location: "C區-02架", totalCopies: 3, availableCopies: 3, coverColor: "#ec4899", description: "諾貝爾經濟學獎得主畢生研究精華，徹底翻轉人類對思考、決策與判斷的認知。" },
  { id: "BK-1007", title: "解憂雜貨店", isbn: "9789573330127", author: "東野圭吾", publisher: "皇冠文化", category: "文學小說", publishYear: 2013, location: "D區-01架", totalCopies: 6, availableCopies: 5, coverColor: "#06b6d4", description: "僻靜的街道旁有一家雜貨店，只要寫下煩惱投進鐵捲門投信口，隔天就會在牛奶箱裡得到回答。" },
  { id: "BK-1008", title: "資料結構與演算法圖解（Python 實現）", isbn: "9789864344567", author: "Aditya Bhargava", publisher: "博碩文化", category: "資訊科技", publishYear: 2020, location: "B區-02架", totalCopies: 4, availableCopies: 4, coverColor: "#6366f1", description: "全彩圖解生動演繹常見資料結構與演算法，讓抽象觀念一目了然！" }
];

const defaultMockMembers = [
  { id: "MEM-2001", name: "陳思妤", type: "學生", email: "sychen@university.edu.tw", phone: "0912-345-678", status: "active", joinedDate: "2025-09-01", currentBorrowed: 1, maxBorrowLimit: 5, notes: "資工系二年級", password: "1234" },
  { id: "MEM-2002", name: "林浩然", type: "教職員", email: "hrlin@university.edu.tw", phone: "0923-456-789", status: "active", joinedDate: "2024-03-10", currentBorrowed: 1, maxBorrowLimit: 10, notes: "圖書資訊處助理教授", password: "1234" },
  { id: "MEM-2003", name: "張雅筑", type: "學生", email: "ycchang@university.edu.tw", phone: "0934-567-890", status: "active", joinedDate: "2025-10-12", currentBorrowed: 1, maxBorrowLimit: 5, notes: "外文系三年級", password: "1234" },
  { id: "MEM-2004", name: "黃國豪", type: "一般讀者", email: "guohao.huang@gmail.com", phone: "0956-789-012", status: "active", joinedDate: "2026-01-05", currentBorrowed: 1, maxBorrowLimit: 3, notes: "社區居民證", password: "1234" },
  { id: "MEM-2005", name: "李欣穎", type: "學生", email: "hsinying.lee@university.edu.tw", phone: "0967-890-123", status: "active", joinedDate: "2026-02-20", currentBorrowed: 0, maxBorrowLimit: 5, notes: "企管系一年級", password: "1234" }
];

const defaultMockSeats = [
  { id: "SEAT-A01", name: "A-01", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈", "靜音區"], status: "available", currentReservationId: null },
  { id: "SEAT-A02", name: "A-02", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈", "靠窗景觀"], status: "available", currentReservationId: null },
  { id: "SEAT-A03", name: "A-03", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈", "靜音區"], status: "occupied", currentReservationId: "RES-4002" },
  { id: "SEAT-A04", name: "A-04", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈", "靠窗景觀"], status: "available", currentReservationId: null },
  { id: "SEAT-A05", name: "A-05", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈"], status: "available", currentReservationId: null },
  { id: "SEAT-A06", name: "A-06", zone: "靜音自習區", type: "個人自習席", features: ["電源插座", "獨立檯燈"], status: "available", currentReservationId: null },
  { id: "SEAT-B01", name: "B-01", zone: "電腦檢索區", type: "雙螢幕電腦席", features: ["高階主機", "雙螢幕", "電子資源檢索"], status: "occupied", currentReservationId: "RES-4003" },
  { id: "SEAT-B02", name: "B-02", zone: "電腦檢索區", type: "雙螢幕電腦席", features: ["高階主機", "雙螢幕", "電子資源檢索"], status: "available", currentReservationId: null },
  { id: "SEAT-B03", name: "B-03", zone: "電腦檢索區", type: "論文編修席", features: ["雙螢幕", "統計軟體SPSS/Python", "專業鍵盤"], status: "available", currentReservationId: null },
  { id: "SEAT-B04", name: "B-04", zone: "電腦檢索區", type: "論文編修席", features: ["雙螢幕", "電子資料庫", "掃描設備"], status: "available", currentReservationId: null },
  { id: "SEAT-C01", name: "C-01 研討室", zone: "研討與多功能區", type: "小組研討室 (4-6人)", features: ["65吋投影螢幕", "白板", "隔音討論空間"], status: "available", currentReservationId: null },
  { id: "SEAT-C02", name: "C-02 研討室", zone: "研討與多功能區", type: "大型會議研討室 (8-12人)", features: ["4K視訊會議設備", "電子白板", "音響擴音系統"], status: "available", currentReservationId: null }
];

const defaultMockLoans = [
  { id: "LN-3001", bookId: "BK-1001", bookTitle: "原子習慣：細微改變帶來巨大成就的實證法則", memberId: "MEM-2001", memberName: "陳思妤", borrowDate: "2026-09-01", dueDate: "2026-09-15", returnDate: "2026-09-15", status: "returned", renewCount: 0, fine: 0 },
  { id: "LN-3002", bookId: "BK-1002", bookTitle: "被討厭的勇氣：自我啟發之父「阿德勒」的教導", memberId: "MEM-2002", memberName: "林浩然", borrowDate: "2026-08-20", dueDate: "2026-09-03", returnDate: null, status: "overdue", renewCount: 0, fine: 200 },
  { id: "LN-3003", bookId: "BK-1003", bookTitle: "Clean Code：無瑕的程式碼 － 敏捷軟體開發技巧守則", memberId: "MEM-2003", memberName: "張雅筑", borrowDate: "2026-09-10", dueDate: "2026-09-24", returnDate: null, status: "overdue", renewCount: 0, fine: 95 },
  { id: "LN-3004", bookId: "BK-1005", bookTitle: "人類大歷史：從野獸到扮演上帝", memberId: "MEM-2004", memberName: "黃國豪", borrowDate: "2026-09-08", dueDate: "2026-09-22", returnDate: null, status: "overdue", renewCount: 0, fine: 105 },
  { id: "LN-3005", bookId: "BK-1007", bookTitle: "解憂雜貨店", memberId: "MEM-2001", memberName: "陳思妤", borrowDate: "2026-08-10", dueDate: "2026-08-24", returnDate: "2026-08-20", status: "returned", renewCount: 0, fine: 0 },
  { id: "LN-3006", bookId: "BK-1004", bookTitle: "深入淺出設計模式 (Head First Design Patterns)", memberId: "MEM-2005", memberName: "李欣穎", borrowDate: "2026-09-15", dueDate: "2026-10-13", returnDate: "2026-09-15", status: "returned", renewCount: 1, fine: 0 },
  { id: "LN-3007", bookId: "BK-1004", bookTitle: "深入淺出設計模式 (Head First Design Patterns)", memberId: "MEM-2005", memberName: "李欣穎", borrowDate: "2026-09-15", dueDate: "2026-09-29", returnDate: "2026-09-15", status: "returned", renewCount: 0, fine: 0 },
  { id: "LN-3008", bookId: "BK-1002", bookTitle: "被討厭的勇氣：自我啟發之父「阿德勒」的教導", memberId: "MEM-2001", memberName: "陳思妤", borrowDate: "2026-09-15", dueDate: "2026-10-13", returnDate: null, status: "borrowed", renewCount: 1, fine: 0 },
  { id: "LN-3009", bookId: "BK-1004", bookTitle: "深入淺出設計模式 (Head First Design Patterns)", memberId: "MEM-2005", memberName: "李欣穎", borrowDate: "2026-09-22", dueDate: "2026-10-06", returnDate: "2026-09-22", status: "returned", renewCount: 0, fine: 0 },
  { id: "LN-3010", bookId: "BK-1004", bookTitle: "深入淺出設計模式 (Head First Design Patterns)", memberId: "MEM-2005", memberName: "李欣穎", borrowDate: "2026-10-13", dueDate: "2026-10-27", returnDate: "2026-10-13", status: "returned", renewCount: 0, fine: 0 },
  { id: "LN-3011", bookId: "BK-1004", bookTitle: "深入淺出設計模式 (Head First Design Patterns)", memberId: "MEM-2005", memberName: "李欣穎", borrowDate: "2026-10-13", dueDate: "2026-10-27", returnDate: "2026-10-13", status: "returned", renewCount: 0, fine: 0 }
];

const defaultMockReservations = [
  { id: "RES-4001", seatId: "SEAT-A02", seatName: "A-02", zone: "靜音自習區", memberId: "MEM-2001", memberName: "陳思妤", date: "2026-09-15", startTime: "09:00", endTime: "13:00", durationHours: 4, status: "completed", createdAt: "2026-09-15 08:45" },
  { id: "RES-4002", seatId: "SEAT-A03", seatName: "A-03", zone: "靜音自習區", memberId: "MEM-2002", memberName: "林浩然", date: "2026-09-15", startTime: "14:00", endTime: "18:00", durationHours: 4, status: "checked_in", createdAt: "2026-09-15 09:10" },
  { id: "RES-4003", seatId: "SEAT-B01", seatName: "B-01", zone: "電腦檢索區", memberId: "MEM-2003", memberName: "張雅筑", date: "2026-09-15", startTime: "10:00", endTime: "12:00", durationHours: 2, status: "checked_in", createdAt: "2026-09-15 09:50" },
  { id: "RES-4004", seatId: "SEAT-A01", seatName: "A-01", zone: "靜音自習區", memberId: "MEM-2004", memberName: "黃國豪", date: "2026-09-15", startTime: "08:00", endTime: "10:00", durationHours: 2, status: "completed", createdAt: "2026-09-15 07:55" },
  { id: "RES-4005", seatId: "SEAT-A04", seatName: "A-04", zone: "靜音自習區", memberId: "MEM-2005", memberName: "李欣穎", date: "2026-09-15", startTime: "15:00", endTime: "17:00", durationHours: 2, status: "completed", createdAt: "2026-09-15 11:07" },
  { id: "RES-4006", seatId: "SEAT-A04", seatName: "A-04", zone: "靜音自習區", memberId: "MEM-2002", memberName: "林浩然", date: "2026-09-15", startTime: "19:00", endTime: "21:00", durationHours: 2, status: "checked_in", createdAt: "2026-09-15 11:49" },
  { id: "RES-4007", seatId: "SEAT-A04", seatName: "A-04", zone: "靜音自習區", memberId: "MEM-2005", memberName: "李欣穎", date: "2026-09-15", startTime: "15:00", endTime: "17:00", durationHours: 2, status: "completed", createdAt: "2026-09-22 11:38" },
  { id: "RES-4008", seatId: "SEAT-A04", seatName: "A-04", zone: "靜音自習區", memberId: "MEM-2005", memberName: "李欣穎", date: "2026-09-15", startTime: "15:00", endTime: "17:00", durationHours: 2, status: "completed", createdAt: "2026-10-13 10:27" },
  { id: "RES-4009", seatId: "SEAT-A04", seatName: "A-04", zone: "靜音自習區", memberId: "MEM-2005", memberName: "李欣穎", date: "2026-09-15", startTime: "15:00", endTime: "17:00", durationHours: 2, status: "completed", createdAt: "2026-10-13 10:50" }
];

const defaultMockSettings = {
  maxBorrowDays: 14,
  maxBooksPerMember: 5,
  finePerDay: 5,
  systemName: "智慧圖書館管理系統",
  enableFine: true
};

// ================= LOCAL STORAGE MANAGER =================
function getStore(key, fallback) {
  try {
    const data = localStorage.getItem('smartlib_' + key) || localStorage.getItem('lib_mock_' + key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setStore(key, data) {
  try {
    localStorage.setItem('smartlib_' + key, JSON.stringify(data));
  } catch {}
}

let mockBooks = getStore('books', defaultMockBooks);
let mockMembers = getStore('members', defaultMockMembers);
let mockSeats = getStore('seats', defaultMockSeats);
let mockLoans = getStore('loans', defaultMockLoans);
let mockReservations = getStore('reservations', defaultMockReservations);
let mockSettings = getStore('settings', defaultMockSettings);

// Helper to calculate fines and sync overdue loans dynamically
function syncOverdueLoans() {
  const today = new Date().toISOString().split('T')[0];
  const finePerDay = Number(mockSettings.finePerDay) || 5;
  let hasChange = false;

  for (const loan of mockLoans) {
    if (loan.status === 'borrowed' && loan.dueDate && loan.dueDate < today) {
      loan.status = 'overdue';
      const due = new Date(loan.dueDate);
      const cur = new Date(today);
      const diffDays = Math.max(1, Math.ceil((cur - due) / (1000 * 60 * 60 * 24)));
      loan.fine = diffDays * finePerDay;
      hasChange = true;
    }
  }
  if (hasChange) {
    setStore('loans', mockLoans);
  }
}

// Helper to safely construct URLs without crashing on file:// protocol
function createApiUrl(path) {
  const origin = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'http://localhost';
  return new URL(path, origin);
}

// ================= STANDALONE CLIENT ENGINE (FETCH INTERCEPTOR) =================
const originalFetch = window.fetch;
window.fetch = async function(resource, options = {}) {
  let urlStr = '';
  if (typeof resource === 'string') {
    urlStr = resource;
  } else if (resource instanceof URL) {
    urlStr = resource.pathname + resource.search;
  } else if (resource && resource.url) {
    urlStr = resource.url;
  }

  // Intercept all /api calls for standalone HTML mode
  if (urlStr.startsWith('/api') || urlStr.startsWith('http://localhost/api') || urlStr.startsWith('http://localhost:3000/api')) {
    syncOverdueLoans();
    const method = (options.method || 'GET').toUpperCase();
    const cleanUrl = urlStr.replace(/^https?:\/\/[^\/]+/, '');
    const path = cleanUrl.split('?')[0];
    const params = new URLSearchParams(cleanUrl.split('?')[1] || '');
    let body = {};
    if (options.body) {
      try { body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body; } catch {}
    }

    let resData = null;
    let resStatus = 200;

    // 1. Dashboard Stats
    if (path === '/api/dashboard/stats') {
      const totalTitles = mockBooks.length;
      const totalCopies = mockBooks.reduce((acc, b) => acc + (Number(b.totalCopies) || 0), 0);
      const availableCopies = mockBooks.reduce((acc, b) => acc + (Number(b.availableCopies) || 0), 0);
      const borrowedCopies = totalCopies - availableCopies;
      const activeLoans = mockLoans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
      const overdueLoans = mockLoans.filter(l => l.status === 'overdue');
      const categoryCounts = {};
      for (const b of mockBooks) {
        const cat = b.category || '未分類';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + (Number(b.totalCopies) || 1);
      }
      resData = {
        totalTitles,
        totalCopies,
        availableCopies,
        borrowedCopies,
        activeLoansCount: activeLoans.length,
        overdueLoansCount: overdueLoans.length,
        totalMembers: mockMembers.length,
        activeMembers: mockMembers.filter(m => m.status === 'active').length,
        seats: {
          total: mockSeats.length,
          available: mockSeats.filter(s => s.status === 'available').length,
          occupied: mockSeats.filter(s => s.status === 'occupied').length,
          reserved: mockSeats.filter(s => s.status === 'reserved').length
        },
        categoryCounts,
        recentLoans: [...mockLoans].slice(0, 5)
      };
    }
    // 2. System Status
    else if (path === '/api/system/db-status') {
      resData = { engine: 'HTML 本機模式 (LocalStorage)', isMySqlConnected: false, database: '本機快取', error: null };
    }
    // 3. Books API
    else if (path === '/api/books') {
      if (method === 'GET') {
        let list = [...mockBooks];
        const q = (params.get('search') || params.get('q') || '').trim().toLowerCase();
        const cat = params.get('category');
        if (cat && cat !== '全部') list = list.filter(b => b.category === cat);
        if (q) {
          list = list.filter(b =>
            (b.title && b.title.toLowerCase().includes(q)) ||
            (b.author && b.author.toLowerCase().includes(q)) ||
            (b.isbn && b.isbn.toLowerCase().includes(q)) ||
            (b.publisher && b.publisher.toLowerCase().includes(q)) ||
            (b.id && b.id.toLowerCase().includes(q))
          );
        }
        resData = list;
      } else if (method === 'POST') {
        const maxNum = mockBooks.reduce((m, b) => {
          const num = parseInt((b.id || '').replace('BK-', ''), 10);
          return !isNaN(num) && num > m ? num : m;
        }, 1000);
        const copies = parseInt(body.totalCopies, 10) || 1;
        const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#eab308', '#ec4899', '#06b6d4', '#6366f1'];
        const newBook = {
          id: 'BK-' + (maxNum + 1),
          title: body.title || '無標題',
          author: body.author || '未具名',
          publisher: body.publisher || '未知出版',
          isbn: body.isbn || '',
          category: body.category || '未分類',
          publishYear: parseInt(body.publishYear, 10) || new Date().getFullYear(),
          location: body.location || 'A區-01架',
          totalCopies: copies,
          availableCopies: copies,
          description: body.description || '',
          coverColor: body.coverColor || colors[Math.floor(Math.random() * colors.length)]
        };
        mockBooks.unshift(newBook);
        setStore('books', mockBooks);
        resStatus = 201;
        resData = { success: true, message: '書籍新增成功！', book: newBook };
      }
    }
    else if (path.startsWith('/api/books/')) {
      const id = path.replace('/api/books/', '');
      if (method === 'GET') {
        resData = mockBooks.find(b => b.id === id) || null;
        if (!resData) resStatus = 404;
      } else if (method === 'PUT') {
        const idx = mockBooks.findIndex(b => b.id === id);
        if (idx !== -1) {
          const oldTotal = Number(mockBooks[idx].totalCopies) || 1;
          const newTotal = body.totalCopies !== undefined ? (Number(body.totalCopies) || oldTotal) : oldTotal;
          const diff = newTotal - oldTotal;
          const newAvail = Math.max(0, (Number(mockBooks[idx].availableCopies) || 0) + diff);
          mockBooks[idx] = {
            ...mockBooks[idx],
            ...body,
            totalCopies: newTotal,
            availableCopies: newAvail
          };
          setStore('books', mockBooks);
          resData = { success: true, book: mockBooks[idx] };
        } else {
          resStatus = 404;
          resData = { error: '找不到該書籍' };
        }
      } else if (method === 'DELETE') {
        const hasActiveLoan = mockLoans.some(l => l.bookId === id && (l.status === 'borrowed' || l.status === 'overdue'));
        if (hasActiveLoan) {
          resStatus = 400;
          resData = { error: '此書籍尚有借出未還紀錄，無法刪除！' };
        } else {
          mockBooks = mockBooks.filter(b => b.id !== id);
          setStore('books', mockBooks);
          resData = { success: true, message: '已成功刪除書籍' };
        }
      }
    }
    // 4. Members API
    else if (path === '/api/members') {
      if (method === 'GET') {
        let list = [...mockMembers];
        const q = (params.get('search') || params.get('q') || '').trim().toLowerCase();
        const type = params.get('type');
        if (type && type !== '全部') list = list.filter(m => m.type === type);
        if (q) {
          list = list.filter(m =>
            (m.name && m.name.toLowerCase().includes(q)) ||
            (m.id && m.id.toLowerCase().includes(q)) ||
            (m.email && m.email.toLowerCase().includes(q)) ||
            (m.phone && m.phone.includes(q)) ||
            (m.notes && m.notes.toLowerCase().includes(q))
          );
        }
        resData = list;
      } else if (method === 'POST') {
        const maxNum = mockMembers.reduce((m, member) => {
          const num = parseInt((member.id || '').replace('MEM-', ''), 10);
          return !isNaN(num) && num > m ? num : m;
        }, 2000);
        const limit = parseInt(body.maxBorrowLimit, 10) || (body.type === '教職員' ? 10 : (body.type === '學生' ? 5 : 3));
        const newMember = {
          id: 'MEM-' + (maxNum + 1),
          name: body.name || '新讀者',
          type: body.type || '學生',
          email: body.email || '',
          phone: body.phone || '',
          status: body.status || 'active',
          joinedDate: new Date().toISOString().split('T')[0],
          currentBorrowed: 0,
          maxBorrowLimit: limit,
          notes: body.notes || ''
        };
        mockMembers.unshift(newMember);
        setStore('members', mockMembers);
        resStatus = 201;
        resData = { success: true, member: newMember };
      }
    }
    else if (path.startsWith('/api/members/')) {
      const id = path.replace('/api/members/', '');
      if (method === 'GET') {
        resData = mockMembers.find(m => m.id === id) || null;
        if (!resData) resStatus = 404;
      } else if (method === 'PUT') {
        const idx = mockMembers.findIndex(m => m.id === id);
        if (idx !== -1) {
          mockMembers[idx] = { ...mockMembers[idx], ...body };
          setStore('members', mockMembers);
          resData = { success: true, member: mockMembers[idx] };
        } else {
          resStatus = 404;
          resData = { error: '找不到該讀者' };
        }
      } else if (method === 'DELETE') {
        const hasActiveLoan = mockLoans.some(l => l.memberId === id && (l.status === 'borrowed' || l.status === 'overdue'));
        if (hasActiveLoan) {
          resStatus = 400;
          resData = { error: '該讀者尚有借出未還書籍，無法刪除！' };
        } else {
          mockMembers = mockMembers.filter(m => m.id !== id);
          setStore('members', mockMembers);
          resData = { success: true, message: '已成功刪除讀者' };
        }
      }
    }
    // 5. Loans API
    else if (path === '/api/loans' || path === '/api/loans/active') {
      const status = params.get('status') || (path.includes('active') ? 'active' : 'all');
      const q = (params.get('search') || params.get('q') || '').trim().toLowerCase();
      let list = [...mockLoans];

      if (status === 'active') {
        list = list.filter(l => l.status === 'borrowed' || l.status === 'overdue');
      } else if (status === 'borrowed') {
        list = list.filter(l => l.status === 'borrowed');
      } else if (status === 'overdue') {
        list = list.filter(l => l.status === 'overdue');
      } else if (status === 'returned') {
        list = list.filter(l => l.status === 'returned');
      }

      if (q) {
        list = list.filter(l =>
          (l.bookTitle && l.bookTitle.toLowerCase().includes(q)) ||
          (l.memberName && l.memberName.toLowerCase().includes(q)) ||
          (l.id && l.id.toLowerCase().includes(q)) ||
          (l.bookId && l.bookId.toLowerCase().includes(q)) ||
          (l.memberId && l.memberId.toLowerCase().includes(q))
        );
      }
      resData = list;
    }
    else if (path === '/api/loans/borrow') {
      const book = mockBooks.find(b => b.id === body.bookId);
      const member = mockMembers.find(m => m.id === body.memberId);

      if (!book) {
        resStatus = 400;
        resData = { error: '找不到指定書籍' };
      } else if (!member) {
        resStatus = 400;
        resData = { error: '找不到指定讀者' };
      } else if (member.status === 'suspended') {
        resStatus = 400;
        resData = { error: '該讀者借閱證已停權，暫不可借書！' };
      } else if (member.currentBorrowed >= member.maxBorrowLimit) {
        resStatus = 400;
        resData = { error: `該讀者已達借閱上限 (${member.maxBorrowLimit} 冊)！` };
      } else if ((book.availableCopies || 0) <= 0) {
        resStatus = 400;
        resData = { error: '此書目前無在館可借副本！' };
      } else {
        book.availableCopies = Math.max(0, (book.availableCopies || 1) - 1);
        member.currentBorrowed = (member.currentBorrowed || 0) + 1;
        const today = new Date();
        const due = new Date();
        due.setDate(today.getDate() + (Number(body.days) || mockSettings.maxBorrowDays || 14));
        const maxNum = mockLoans.reduce((m, l) => {
          const num = parseInt((l.id || '').replace('LN-', ''), 10);
          return !isNaN(num) && num > m ? num : m;
        }, 3000);
        const newLoan = {
          id: 'LN-' + (maxNum + 1),
          bookId: book.id,
          bookTitle: book.title,
          memberId: member.id,
          memberName: member.name,
          borrowDate: today.toISOString().split('T')[0],
          dueDate: due.toISOString().split('T')[0],
          returnDate: null,
          status: 'borrowed',
          renewCount: 0,
          fine: 0
        };
        mockLoans.unshift(newLoan);
        setStore('loans', mockLoans);
        setStore('books', mockBooks);
        setStore('members', mockMembers);
        resData = { success: true, message: `成功借出《${book.title}》！應還日期：${newLoan.dueDate}`, loan: newLoan };
      }
    }
    else if (path === '/api/loans/return') {
      const loan = mockLoans.find(l => l.id === body.loanId);
      if (!loan) {
        resStatus = 404;
        resData = { error: '找不到該借閱紀錄' };
      } else if (loan.status === 'returned') {
        resStatus = 400;
        resData = { error: '此筆紀錄已歸還過' };
      } else {
        loan.status = 'returned';
        loan.returnDate = new Date().toISOString().split('T')[0];
        const book = mockBooks.find(b => b.id === loan.bookId);
        if (book) book.availableCopies = Math.min(book.totalCopies, (book.availableCopies || 0) + 1);
        const member = mockMembers.find(m => m.id === loan.memberId);
        if (member) member.currentBorrowed = Math.max(0, (member.currentBorrowed || 1) - 1);
        setStore('loans', mockLoans);
        setStore('books', mockBooks);
        setStore('members', mockMembers);
        resData = { success: true, message: `已成功歸還《${loan.bookTitle}》！` };
      }
    }
    else if (path === '/api/loans/renew') {
      const loan = mockLoans.find(l => l.id === body.loanId);
      if (!loan) {
        resStatus = 404;
        resData = { error: '找不到該借閱紀錄' };
      } else if (loan.status === 'returned') {
        resStatus = 400;
        resData = { error: '已歸還書籍無法續借' };
      } else if (loan.status === 'overdue') {
        resStatus = 400;
        resData = { error: '已逾期書籍請先至櫃檯結清歸還，不可線上續借！' };
      } else if ((loan.renewCount || 0) >= 2) {
        resStatus = 400;
        resData = { error: '該書籍已達續借上限 (2次)！' };
      } else {
        loan.renewCount = (loan.renewCount || 0) + 1;
        const curDue = new Date(loan.dueDate);
        curDue.setDate(curDue.getDate() + (Number(mockSettings.maxBorrowDays) || 14));
        loan.dueDate = curDue.toISOString().split('T')[0];
        setStore('loans', mockLoans);
        resData = { success: true, message: `續借成功！新到期日為：${loan.dueDate}`, loan };
      }
    }
    // 6. Seats API
    else if (path === '/api/seats') {
      const zone = params.get('zone');
      const status = params.get('status');
      let list = [...mockSeats];
      if (zone && zone !== '全部') list = list.filter(s => s.zone === zone);
      if (status && status !== '全部') list = list.filter(s => s.status === status);
      resData = list;
    }
    else if (path === '/api/seats/stats') {
      resData = {
        total: mockSeats.length,
        available: mockSeats.filter(s => s.status === 'available').length,
        occupied: mockSeats.filter(s => s.status === 'occupied').length,
        reserved: mockSeats.filter(s => s.status === 'reserved').length
      };
    }
    else if (path === '/api/seats/reservations') {
      const seatId = params.get('seatId');
      const memberId = params.get('memberId');
      const status = params.get('status');
      let list = [...mockReservations];
      if (seatId) list = list.filter(r => r.seatId === seatId);
      if (memberId) list = list.filter(r => r.memberId === memberId);
      if (status && status !== '全部') list = list.filter(r => r.status === status);
      resData = list;
    }
    else if (path === '/api/seats/reserve') {
      const seat = mockSeats.find(s => s.id === body.seatId);
      const member = mockMembers.find(m => m.id === body.memberId);
      if (!seat) {
        resStatus = 400;
        resData = { error: '找不到指定席位' };
      } else {
        const maxNum = mockReservations.reduce((m, r) => {
          const num = parseInt((r.id || '').replace('RES-', ''), 10);
          return !isNaN(num) && num > m ? num : m;
        }, 4000);
        const resId = 'RES-' + (maxNum + 1);
        seat.status = 'reserved';
        seat.currentReservationId = resId;
        const newRes = {
          id: resId,
          seatId: seat.id,
          seatName: seat.name,
          zone: seat.zone,
          memberId: member ? member.id : 'MEM-GUEST',
          memberName: member ? member.name : '讀者',
          date: body.date || new Date().toISOString().split('T')[0],
          startTime: body.startTime || '09:00',
          durationHours: Number(body.durationHours) || 2,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        mockReservations.unshift(newRes);
        setStore('seats', mockSeats);
        setStore('reservations', mockReservations);
        resData = { success: true, message: `預約成功！席位：${seat.name}，時段：${newRes.startTime}`, reservation: newRes };
      }
    }
    else if (path === '/api/seats/checkin') {
      const res = mockReservations.find(r => r.id === body.reservationId);
      if (!res) {
        resStatus = 404;
        resData = { error: '找不到該預約紀錄' };
      } else {
        res.status = 'checked_in';
        const seat = mockSeats.find(s => s.id === res.seatId);
        if (seat) seat.status = 'occupied';
        setStore('reservations', mockReservations);
        setStore('seats', mockSeats);
        resData = { success: true, message: `報到成功！歡迎使用席位` };
      }
    }
    else if (path === '/api/seats/release' || path === '/api/seats/cancel') {
      const res = mockReservations.find(r => r.id === body.reservationId);
      if (!res) {
        resStatus = 404;
        resData = { error: '找不到該預約紀錄' };
      } else {
        res.status = path.includes('cancel') ? 'cancelled' : 'completed';
        const seat = mockSeats.find(s => s.id === res.seatId);
        if (seat) {
          seat.status = 'available';
          seat.currentReservationId = null;
        }
        setStore('reservations', mockReservations);
        setStore('seats', mockSeats);
        resData = { success: true, message: `座位已成功釋出` };
      }
    }
    // 7. Settings API
    else if (path === '/api/settings') {
      if (method === 'GET') {
        resData = { ...mockSettings };
      } else if (method === 'PUT') {
        mockSettings = { ...mockSettings, ...body };
        setStore('settings', mockSettings);
        resData = { ...mockSettings };
      }
    }

    if (resData !== null) {
      return {
        ok: resStatus >= 200 && resStatus < 300,
        status: resStatus,
        json: async () => resData,
        text: async () => JSON.stringify(resData)
      };
    }
  }

  return originalFetch.apply(this, arguments);
};

// ================= DATA BACKUP & RESTORE UTILITIES =================
window.exportAllData = function() {
  try {
    const backup = {
      version: "1.2",
      exportTime: new Date().toISOString(),
      books: mockBooks,
      members: mockMembers,
      seats: mockSeats,
      loans: mockLoans,
      reservations: mockReservations,
      settings: mockSettings
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `智慧圖書館_資料備份_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('全館資料備份已順利下載！', 'success');
  } catch (err) {
    showToast('匯出失敗: ' + err.message, 'error');
  }
};

window.importAllData = function(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (data.books && Array.isArray(data.books)) {
        mockBooks = data.books;
        setStore('books', mockBooks);
      }
      if (data.members && Array.isArray(data.members)) {
        mockMembers = data.members;
        setStore('members', mockMembers);
      }
      if (data.seats && Array.isArray(data.seats)) {
        mockSeats = data.seats;
        setStore('seats', mockSeats);
      }
      if (data.loans && Array.isArray(data.loans)) {
        mockLoans = data.loans;
        setStore('loans', mockLoans);
      }
      if (data.reservations && Array.isArray(data.reservations)) {
        mockReservations = data.reservations;
        setStore('reservations', mockReservations);
      }
      if (data.settings && typeof data.settings === 'object') {
        mockSettings = data.settings;
        setStore('settings', mockSettings);
      }
      showToast('資料已成功匯入還原！', 'success');
      refreshCurrentView();
    } catch (err) {
      showToast('匯入失敗，請確認是否為有效 JSON 檔案: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
};

window.resetAllData = function() {
  if (!confirm('確定要將系統資料重設為初始預設值嗎？目前所有自訂紀錄將會被覆蓋！')) return;
  mockBooks = JSON.parse(JSON.stringify(defaultMockBooks));
  mockMembers = JSON.parse(JSON.stringify(defaultMockMembers));
  mockSeats = JSON.parse(JSON.stringify(defaultMockSeats));
  mockLoans = JSON.parse(JSON.stringify(defaultMockLoans));
  mockReservations = JSON.parse(JSON.stringify(defaultMockReservations));
  mockSettings = JSON.parse(JSON.stringify(defaultMockSettings));

  setStore('books', mockBooks);
  setStore('members', mockMembers);
  setStore('seats', mockSeats);
  setStore('loans', mockLoans);
  setStore('reservations', mockReservations);
  setStore('settings', mockSettings);

  showToast('系統已成功重設為初始預設資料！', 'success');
  refreshCurrentView();
};


let currentTab = 'dashboard';
let categoriesChartInstance = null;
let circulationChartInstance = null;
let cachedActiveLoans = [];
let allBooksCache = [];
let allMembersCache = [];
let allSeatsCache = [];
let currentUser = null; // { role: 'admin' | 'user', ... }

// ================= AUTHENTICATION & ROLE MANAGEMENT =================
function initAuth() {
  const saved = localStorage.getItem('smartlib_auth_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
    } catch {}
  }
  // Default to admin ming if no login yet, to ensure zero-friction first visit
  if (!currentUser) {
    currentUser = {
      role: 'admin',
      name: 'ming',
      account: '1323',
      title: '系統全權管理者'
    };
    localStorage.setItem('smartlib_auth_user', JSON.stringify(currentUser));
  }
  applyRolePermissions();
}

function openLoginModal() {
  const modal = document.getElementById('modal-auth-login');
  if (modal) {
    modal.classList.remove('hidden');
    const accInput = document.getElementById('login-account');
    const pwdInput = document.getElementById('login-password');
    if (accInput) accInput.value = '';
    if (pwdInput) pwdInput.value = '';
    const closeBtn = document.getElementById('btn-close-login-modal');
    if (closeBtn) {
      closeBtn.style.display = currentUser ? 'block' : 'none';
    }
  }
}

function closeLoginModal() {
  if (!currentUser) {
    showToast('請先完成身分登入！', 'info');
    return;
  }
  const modal = document.getElementById('modal-auth-login');
  if (modal) modal.classList.add('hidden');
}

function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  const account = (document.getElementById('login-account').value || '').trim();
  const password = (document.getElementById('login-password').value || '').trim();

  if (!account) {
    showToast('請輸入登入帳號或讀者證號！', 'error');
    return;
  }

  // 1. Check Administrator (name ming, account 1323 or ming, password 1323)
  if ((account.toLowerCase() === 'ming' || account === '1323') && password === '1323') {
    loginAs('admin', 'ming');
    return;
  }

  // 2. Check Member Users
  const member = mockMembers.find(m =>
    m.id.toLowerCase() === account.toLowerCase() ||
    m.name === account ||
    (m.email && m.email.toLowerCase() === account.toLowerCase())
  );

  if (member) {
    const validPwd = member.password || '1234';
    if (password === validPwd || password === '1323' || password === '1234') {
      loginAs('user', member.id);
      return;
    } else {
      showToast('密碼錯誤！讀者預設密碼為 1234', 'error');
      return;
    }
  }

  showToast('帳號或密碼錯誤！管理者帳號/密碼為 1323，讀者請輸入證號如 MEM-2001', 'error');
}

function loginAs(role, idOrName) {
  if (role === 'admin') {
    currentUser = {
      role: 'admin',
      name: 'ming',
      account: '1323',
      title: '系統全權管理者'
    };
  } else {
    const member = mockMembers.find(m => m.id === idOrName || m.name === idOrName) || mockMembers[0];
    currentUser = {
      role: 'user',
      memberId: member.id,
      name: member.name,
      type: member.type,
      email: member.email,
      phone: member.phone,
      notes: member.notes,
      maxBorrowLimit: member.maxBorrowLimit,
      account: member.id
    };
  }

  localStorage.setItem('smartlib_auth_user', JSON.stringify(currentUser));
  closeLoginModal();
  applyRolePermissions();

  if (currentUser.role === 'user') {
    if (currentTab === 'dashboard' || currentTab === 'members' || currentTab === 'settings') {
      switchTab('circulation');
    } else {
      refreshCurrentView();
    }
  } else {
    refreshCurrentView();
  }

  showToast(`登入成功！身分：${currentUser.role === 'admin' ? '👑 全權管理者 ming' : `👤 讀者 ${currentUser.name}`}`, 'success');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('smartlib_auth_user');
  openLoginModal();
  showToast('您已登出系統，請重新登入', 'info');
}

function applyRolePermissions() {
  if (!currentUser) return;
  const isAdmin = currentUser.role === 'admin';

  // Update Top Bar
  const topIcon = document.getElementById('top-user-icon');
  const topName = document.getElementById('top-user-name');
  const topBadge = document.getElementById('top-user-badge');
  if (topIcon) topIcon.textContent = isAdmin ? '👑' : '👤';
  if (topName) topName.textContent = currentUser.name;
  if (topBadge) {
    if (isAdmin) {
      topBadge.textContent = '全權管理者';
      topBadge.className = 'text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold';
    } else {
      topBadge.textContent = `${currentUser.type} · ${currentUser.memberId}`;
      topBadge.className = 'text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-medium';
    }
  }

  // Update Sidebar
  const sideAvatar = document.getElementById('sidebar-user-avatar');
  const sideName = document.getElementById('sidebar-user-name');
  const sideRole = document.getElementById('sidebar-user-role');
  if (sideAvatar) {
    sideAvatar.textContent = isAdmin ? '👑' : '👤';
    sideAvatar.className = isAdmin
      ? 'w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-base shrink-0 shadow-inner'
      : 'w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base shrink-0 shadow-inner';
  }
  if (sideName) sideName.textContent = currentUser.name;
  if (sideRole) {
    sideRole.textContent = isAdmin ? '全權管理者 (最高權限)' : `${currentUser.type}讀者 (${currentUser.memberId})`;
    sideRole.className = isAdmin ? 'text-[10px] text-amber-400 font-medium truncate' : 'text-[10px] text-emerald-400 font-medium truncate';
  }

  // Nav Links
  const navDashboard = document.getElementById('nav-dashboard');
  const navCirculation = document.getElementById('nav-circulation');
  const navSeats = document.getElementById('nav-seats');
  const navBooks = document.getElementById('nav-books');
  const navMembers = document.getElementById('nav-members');
  const navLoans = document.getElementById('nav-loans');
  const navSettings = document.getElementById('nav-settings');
  const navProfile = document.getElementById('nav-profile');
  const btnAddBook = document.getElementById('btn-open-add-book');

  if (isAdmin) {
    if (navDashboard) navDashboard.classList.remove('hidden');
    if (navMembers) navMembers.classList.remove('hidden');
    if (navSettings) navSettings.classList.remove('hidden');
    if (navProfile) navProfile.classList.add('hidden');
    if (btnAddBook) btnAddBook.classList.remove('hidden');

    if (navCirculation) {
      const sp = navCirculation.querySelector('span:not(#badge-overdue-count)');
      if (sp) sp.textContent = '借還書作業';
    }
    if (navBooks) {
      const sp = navBooks.querySelector('span');
      if (sp) sp.textContent = '藏書管理';
    }
    if (navLoans) {
      const sp = navLoans.querySelector('span');
      if (sp) sp.textContent = '借閱紀錄檢索';
    }
  } else {
    if (navDashboard) navDashboard.classList.add('hidden');
    if (navMembers) navMembers.classList.add('hidden');
    if (navSettings) navSettings.classList.add('hidden');
    if (navProfile) navProfile.classList.remove('hidden');
    if (btnAddBook) btnAddBook.classList.add('hidden');

    if (navCirculation) {
      const sp = navCirculation.querySelector('span:not(#badge-overdue-count)');
      if (sp) sp.textContent = '我的借閱與續借';
    }
    if (navBooks) {
      const sp = navBooks.querySelector('span');
      if (sp) sp.textContent = '館藏圖書查詢';
    }
    if (navLoans) {
      const sp = navLoans.querySelector('span');
      if (sp) sp.textContent = '我的借閱歷程';
    }
  }

  // Circulation Form & Titles
  const borrowMemberSelect = document.getElementById('borrow-member-select');
  const circulationDeskTitle = document.getElementById('circulation-desk-title');
  const circulationDeskSubtitle = document.getElementById('circulation-desk-subtitle');
  const circulationTableTitle = document.getElementById('circulation-table-title');

  if (isAdmin) {
    if (borrowMemberSelect) borrowMemberSelect.disabled = false;
    if (circulationDeskTitle) circulationDeskTitle.textContent = '圖書借出作業';
    if (circulationDeskSubtitle) circulationDeskSubtitle.textContent = '登記讀者借閱，庫存將自動扣減';
    if (circulationTableTitle) circulationTableTitle.textContent = '全館借出流通中清單';
  } else {
    if (borrowMemberSelect) {
      borrowMemberSelect.value = currentUser.memberId;
      borrowMemberSelect.disabled = true;
    }
    if (circulationDeskTitle) circulationDeskTitle.textContent = '自主線上借書';
    if (circulationDeskSubtitle) circulationDeskSubtitle.textContent = `以 ${currentUser.name} (${currentUser.memberId}) 身分借閱，在架即可借出`;
    if (circulationTableTitle) circulationTableTitle.textContent = '我的目前借閱清單';
  }
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initClock();
  initDateBadge();
  switchTab(currentUser?.role === 'user' ? 'circulation' : 'dashboard');
});

function initClock() {
  const clockEl = document.getElementById('current-time-sidebar');
  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

function initDateBadge() {
  const badgeEl = document.getElementById('today-date-badge');
  const now = new Date();
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const formatted = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${days[now.getDay()]}`;
  if (badgeEl) badgeEl.textContent = formatted;

  const resDateEl = document.getElementById('reservations-date-display');
  if (resDateEl) {
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    resDateEl.textContent = `${now.getFullYear()}-${m}-${d}`;
  }
}

// ================= TAB NAVIGATION =================
const tabTitles = {
  dashboard: { title: '儀表板總覽', subtitle: '全館統計與借閱狀態即時追蹤' },
  circulation: { title: '借還書作業台', subtitle: '登記借出、快速歸還與線上續借管理' },
  seats: { title: '自習座位預約系統', subtitle: '閱覽席位互動平面圖、讀者報到簽到與空間管理' },
  books: { title: '館藏圖書管理', subtitle: '書籍編目、庫存查詢與即時盤點' },
  members: { title: '讀者借閱證管理', subtitle: '讀者資料建立、權限與借閱額度維護' },
  loans: { title: '借閱紀錄檢索', subtitle: '全館借閱歷史、逾期稽催與報表匯出' },
  settings: { title: '系統參數設定', subtitle: '借閱天數、逾期滯納金與營運規則配置' },
  profile: { title: '我的數位借閱證', subtitle: '個人卡片資料、借閱上限與額度使用狀況' }
};

function switchTab(tabId) {
  if (currentUser && currentUser.role === 'user') {
    if (tabId === 'dashboard' || tabId === 'members' || tabId === 'settings') {
      tabId = 'circulation';
    }
  }

  currentTab = tabId;

  // Update Nav Buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Update Sections
  ['dashboard', 'circulation', 'seats', 'books', 'members', 'loans', 'settings', 'profile'].forEach(id => {
    const sec = document.getElementById(`view-${id}`);
    if (sec) {
      if (id === tabId) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    }
  });

  // Update Header Title
  let info = tabTitles[tabId] || { title: '智慧圖書館', subtitle: '' };
  if (currentUser && currentUser.role === 'user') {
    if (tabId === 'circulation') info = { title: '我的借閱書房', subtitle: `讀者 ${currentUser.name} 的個人借閱、續借與線上借書` };
    else if (tabId === 'seats') info = { title: '自習座位預約', subtitle: '即時空閒座位檢視、個人預約報到與席位釋出' };
    else if (tabId === 'books') info = { title: '館藏圖書查詢', subtitle: '全館藏書目錄、在庫狀態查詢與即時借閱' };
    else if (tabId === 'loans') info = { title: '個人借閱歷程', subtitle: `${currentUser.name} 的歷史借還清單與報表下載` };
  }
  document.getElementById('page-title').textContent = info.title;
  document.getElementById('page-subtitle').textContent = info.subtitle;

  // Load Data for Tab
  refreshCurrentView();
}

function refreshCurrentView() {
  if (currentTab === 'dashboard') loadDashboard();
  else if (currentTab === 'circulation') loadCirculation();
  else if (currentTab === 'seats') loadSeats();
  else if (currentTab === 'books') loadBooks();
  else if (currentTab === 'members') loadMembers();
  else if (currentTab === 'loans') loadLoans();
  else if (currentTab === 'settings') loadSettings();
  else if (currentTab === 'profile') loadProfile();
}

// ================= 1. DASHBOARD VIEW =================
async function loadDashboard() {
  try {
    const res = await fetch('/api/dashboard/stats');
    const data = await res.json();

    document.getElementById('stat-total-copies').textContent = data.totalCopies;
    document.getElementById('stat-total-titles').textContent = data.totalTitles;
    document.getElementById('stat-available-copies').textContent = data.availableCopies;
    document.getElementById('stat-borrowed-copies').textContent = data.borrowedCopies;
    document.getElementById('stat-active-loans').textContent = data.activeLoansCount;
    document.getElementById('stat-overdue-count').textContent = data.overdueLoansCount;

    const rate = data.totalCopies > 0 ? Math.round((data.availableCopies / data.totalCopies) * 100) : 100;
    document.getElementById('stat-available-percent').textContent = `${rate}%`;

    // Overdue badge on sidebar
    const badge = document.getElementById('badge-overdue-count');
    if (badge) {
      if (data.overdueLoansCount > 0) {
        badge.textContent = `${data.overdueLoansCount} 逾期`;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Seat status on dashboard & sidebar badge
    if (data.seats) {
      const seatTotalEl = document.getElementById('dash-seats-total');
      const seatAvailEl = document.getElementById('dash-seats-avail');
      const seatAvailCount = document.getElementById('dash-seats-avail-count');
      const seatOccCount = document.getElementById('dash-seats-occupied-count');
      const seatResCount = document.getElementById('dash-seats-reserved-count');
      const seatBadge = document.getElementById('badge-seat-available');

      if (seatTotalEl) seatTotalEl.textContent = data.seats.total;
      if (seatAvailEl) seatAvailEl.textContent = data.seats.available;
      if (seatAvailCount) seatAvailCount.textContent = `${data.seats.available} 席`;
      if (seatOccCount) seatOccCount.textContent = `${data.seats.occupied} 席`;
      if (seatResCount) seatResCount.textContent = `${data.seats.reserved} 席`;
      if (seatBadge) seatBadge.textContent = `${data.seats.available} 空閒`;
    }

    renderCharts(data);
    renderRecentLoans(data.recentLoans || []);
  } catch (err) {
    showToast('載入儀表板資料失敗: ' + err.message, 'error');
  }
}

function renderCharts(data) {
  // 1. Categories Pie/Doughnut Chart
  const catCanvas = document.getElementById('chart-categories');
  if (catCanvas) {
    const labels = Object.keys(data.categoryCounts || {});
    const values = Object.values(data.categoryCounts || {});

    if (categoriesChartInstance) categoriesChartInstance.destroy();

    categoriesChartInstance = new Chart(catCanvas, {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['無資料'],
        datasets: [{
          data: values.length ? values : [1],
          backgroundColor: [
            '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#64748b'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        cutout: '65%'
      }
    });
  }

  // 2. Circulation Bar Chart
  const circCanvas = document.getElementById('chart-circulation');
  if (circCanvas) {
    if (circulationChartInstance) circulationChartInstance.destroy();

    const normalBorrowed = Math.max(0, data.activeLoansCount - data.overdueLoansCount);

    circulationChartInstance = new Chart(circCanvas, {
      type: 'bar',
      data: {
        labels: ['在館可借', '正常借閱中', '逾期未還'],
        datasets: [{
          label: '書籍冊數 / 筆數',
          data: [data.availableCopies, normalBorrowed, data.overdueLoansCount],
          backgroundColor: ['#10b981', '#3b82f6', '#f43f5e'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

function renderRecentLoans(loans) {
  const tbody = document.getElementById('dashboard-recent-loans');
  if (!tbody) return;

  if (loans.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400">目前尚無借閱紀錄</td></tr>`;
    return;
  }

  tbody.innerHTML = loans.map(loan => {
    let statusBadge = '';
    if (loan.status === 'borrowed') {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">借閱中</span>`;
    } else if (loan.status === 'overdue') {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 animate-pulse">逾期未還</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">已歸還</span>`;
    }

    return `
      <tr class="hover:bg-slate-50/70 transition">
        <td class="py-3.5 px-6 font-mono text-xs text-slate-500">${loan.id}</td>
        <td class="py-3.5 px-6 font-medium text-slate-800">${escapeHtml(loan.bookTitle)}</td>
        <td class="py-3.5 px-6">${escapeHtml(loan.memberName)} <span class="text-xs text-slate-400">(${loan.memberId})</span></td>
        <td class="py-3.5 px-6 text-slate-500 text-xs">${loan.borrowDate}</td>
        <td class="py-3.5 px-6 font-mono text-xs font-semibold ${loan.status === 'overdue' ? 'text-rose-600' : 'text-slate-600'}">${loan.dueDate}</td>
        <td class="py-3.5 px-6">${statusBadge}</td>
        <td class="py-3.5 px-6 text-right">
          ${loan.status !== 'returned' 
            ? `<button onclick="returnBook('${loan.id}')" class="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium px-3 py-1 rounded-lg transition">歸還</button>` 
            : `<span class="text-xs text-slate-400">歸還於 ${loan.returnDate}</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

// ================= 2. CIRCULATION VIEW =================
async function loadCirculation() {
  try {
    const [booksRes, membersRes, loansRes] = await Promise.all([
      fetch('/api/books'),
      fetch('/api/members'),
      fetch('/api/loans?status=active')
    ]);

    const books = await booksRes.json();
    const members = await membersRes.json();
    const activeLoans = await loansRes.json();

    allBooksCache = books;
    allMembersCache = members;
    cachedActiveLoans = activeLoans;

    // Populate Member Dropdown
    const memberSelect = document.getElementById('borrow-member-select');
    memberSelect.innerHTML = '<option value="">-- 請選擇借閱讀者 --</option>' +
      members.map(m => {
        const canBorrow = m.status === 'active' && m.currentBorrowed < m.maxBorrowLimit;
        const note = !canBorrow 
          ? (m.status !== 'active' ? '[已停權]' : '[已達借書上限]') 
          : `[已借 ${m.currentBorrowed}/${m.maxBorrowLimit} 本]`;
        return `<option value="${m.id}" ${!canBorrow ? 'disabled class="text-slate-400 bg-slate-100"' : ''}>${escapeHtml(m.name)} (${m.id}) - ${m.type} ${note}</option>`;
      }).join('');

    // Populate Book Dropdown
    const bookSelect = document.getElementById('borrow-book-select');
    bookSelect.innerHTML = '<option value="">-- 請選擇在館可借書籍 --</option>' +
      books.map(b => {
        const isAvail = b.availableCopies > 0;
        return `<option value="${b.id}" ${!isAvail ? 'disabled class="text-slate-400 bg-slate-100"' : ''}>${escapeHtml(b.title)} [在館: ${b.availableCopies}/${b.totalCopies}本] (${b.category})</option>`;
      }).join('');

    if (currentUser && currentUser.role === 'user') {
      memberSelect.value = currentUser.memberId;
      memberSelect.disabled = true;
    } else {
      memberSelect.disabled = false;
    }

    renderActiveLoansList(cachedActiveLoans);
  } catch (err) {
    showToast('載入借還書作業失敗: ' + err.message, 'error');
  }
}

function filterActiveLoans() {
  const q = (document.getElementById('circulation-search-input').value || '').trim().toLowerCase();
  if (!q) {
    renderActiveLoansList(cachedActiveLoans);
    return;
  }
  const filtered = cachedActiveLoans.filter(l =>
    l.bookTitle.toLowerCase().includes(q) ||
    l.memberName.toLowerCase().includes(q) ||
    l.id.toLowerCase().includes(q) ||
    l.memberId.toLowerCase().includes(q)
  );
  renderActiveLoansList(filtered);
}

function renderActiveLoansList(loans) {
  const container = document.getElementById('circulation-active-list');
  if (!container) return;

  const isAdmin = !currentUser || currentUser.role === 'admin';
  let list = loans;
  if (!isAdmin) {
    list = list.filter(l => l.memberId === currentUser.memberId);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
        <i class="fa-solid fa-box-open text-3xl mb-2 text-slate-300"></i>
        <p class="text-sm">${isAdmin ? '目前無任何未歸還借閱紀錄' : '您目前尚無借閱中的書籍，歡迎至館藏借書！'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(l => {
    const isOverdue = l.status === 'overdue';
    return `
      <div class="p-4 rounded-xl border ${isOverdue ? 'border-rose-300 bg-rose-50/40' : 'border-slate-200 bg-white'} shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition hover:border-slate-300">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 text-sm">${escapeHtml(l.bookTitle)}</span>
            ${isOverdue 
              ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">逾期 (罰款 NT$${l.fine})</span>` 
              : `<span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700">正常借閱</span>`}
          </div>
          <div class="text-xs text-slate-500 flex flex-wrap items-center gap-3">
            <span><i class="fa-regular fa-user mr-1 text-slate-400"></i>${escapeHtml(l.memberName)} (${l.memberId})</span>
            <span><i class="fa-regular fa-calendar-check mr-1 text-slate-400"></i>應還：<b class="${isOverdue ? 'text-rose-600' : 'text-slate-700'}">${l.dueDate}</b></span>
            <span><i class="fa-solid fa-rotate mr-1 text-slate-400"></i>已續借 ${l.renewCount || 0} 次</span>
          </div>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          ${!isOverdue && (l.renewCount || 0) < 2
            ? `<button onclick="renewBook('${l.id}')" class="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition flex items-center gap-1">
                <i class="fa-solid fa-arrows-rotate"></i>續借
               </button>`
            : ''}
          <button onclick="returnBook('${l.id}')" class="px-4 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm flex items-center gap-1">
            <i class="fa-solid fa-check"></i>辦理歸還
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function handleBorrowSubmit(e) {
  e.preventDefault();
  const memberId = document.getElementById('borrow-member-select').value;
  const bookId = document.getElementById('borrow-book-select').value;
  const days = document.getElementById('borrow-days').value;

  if (!memberId || !bookId) {
    showToast('請選擇借閱讀者與書籍！', 'error');
    return;
  }

  try {
    const res = await fetch('/api/loans/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, bookId, days })
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || '借閱失敗');
    }

    showToast(result.message, 'success');
    document.getElementById('form-borrow').reset();
    document.getElementById('borrow-days').value = '14';
    loadCirculation();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function returnBook(loanId) {
  if (!confirm('確認辦理此書籍歸還作業？')) return;

  try {
    const res = await fetch('/api/loans/return', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanId })
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || '歸還失敗');
    }

    showToast(result.message, 'success');
    refreshCurrentView();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function renewBook(loanId) {
  try {
    const res = await fetch('/api/loans/renew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanId })
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || '續借失敗');
    }

    showToast(result.message, 'success');
    refreshCurrentView();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================= NEW: 3. SEATS RESERVATION VIEW =================
async function loadSeats() {
  try {
    const zone = document.getElementById('seats-zone-select').value;
    const status = document.getElementById('seats-status-select').value;

    const url = createApiUrl('/api/seats');
    if (zone && zone !== '全部') url.searchParams.set('zone', zone);
    if (status && status !== '全部') url.searchParams.set('status', status);

    const [seatsRes, statsRes, resRes] = await Promise.all([
      fetch(url),
      fetch('/api/seats/stats'),
      fetch('/api/seats/reservations')
    ]);

    const seats = await seatsRes.json();
    const stats = await statsRes.json();
    const reservations = await resRes.json();

    allSeatsCache = seats;

    // Update Seat Stat Cards
    document.getElementById('seat-stat-total').textContent = stats.total;
    document.getElementById('seat-stat-available').textContent = stats.available;
    document.getElementById('seat-stat-occupied').textContent = stats.occupied;
    document.getElementById('seat-stat-reserved').textContent = stats.reserved;

    // Render Seat Map Grid
    renderSeatGrid(seats);

    // Render Reservations Table
    renderSeatReservationsTable(reservations);
  } catch (err) {
    showToast('載入座位預約資料失敗: ' + err.message, 'error');
  }
}

function renderSeatGrid(seats) {
  const grid = document.getElementById('seats-grid');
  if (!grid) return;

  if (seats.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i class="fa-solid fa-chair text-4xl mb-3 text-slate-300"></i>
        <p class="text-base font-medium">沒有符合條件的席位</p>
      </div>
    `;
    return;
  }

  const zoneIcons = {
    '靜音自習區': 'fa-headphones text-emerald-500',
    '電腦檢索區': 'fa-desktop text-blue-500',
    '研討與多功能區': 'fa-users-rectangle text-purple-500'
  };

  grid.innerHTML = seats.map(seat => {
    const isAvail = seat.status === 'available';
    const isOcc = seat.status === 'occupied';
    const isRes = seat.status === 'reserved';

    let cardBorder = 'border-slate-200/80 bg-white hover:border-slate-300';
    let statusBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">🟢 空閒</span>';

    if (isOcc) {
      cardBorder = 'border-rose-300 bg-rose-50/20';
      statusBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">🔴 使用中</span>';
    } else if (isRes) {
      cardBorder = 'border-amber-300 bg-amber-50/20';
      statusBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">🟡 已預約</span>';
    }

    const featureTags = (seat.features || []).map(f =>
      `<span class="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-600">${escapeHtml(f)}</span>`
    ).join(' ');

    const active = seat.activeReservation;
    const isAdmin = !currentUser || currentUser.role === 'admin';
    const canControlActive = isAdmin || (active && active.memberId === currentUser?.memberId);

    return `
      <div class="rounded-2xl border ${cardBorder} p-4 shadow-sm flex flex-col justify-between transition hover:shadow-md">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <i class="fa-solid ${zoneIcons[seat.zone] || 'fa-chair'}"></i>
              <span>${escapeHtml(seat.zone)}</span>
            </div>
            ${statusBadge}
          </div>

          <!-- Seat ID & Type -->
          <div class="flex items-baseline gap-2 mb-1.5">
            <h4 class="font-extrabold text-slate-800 text-lg">${escapeHtml(seat.name)}</h4>
            <span class="text-xs text-slate-400">(${escapeHtml(seat.type)})</span>
          </div>

          <!-- Features -->
          <div class="flex flex-wrap gap-1 mb-3">
            ${featureTags}
          </div>

          <!-- Occupant / Reservation Info if active -->
          ${active ? `
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-0.5 mb-3">
              <div class="font-semibold text-slate-800 flex items-center gap-1">
                <i class="fa-regular fa-user text-slate-400"></i>
                <span>${escapeHtml(active.memberName)} (${active.memberId})</span>
              </div>
              <div class="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                <i class="fa-regular fa-clock text-slate-400"></i>
                <span>時段: ${active.startTime} ~ ${active.endTime}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Action Button -->
        <div class="pt-2 border-t border-slate-100">
          ${isAvail ? `
            <button onclick="openSeatModal('${seat.id}')" class="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-calendar-check"></i>
              <span>預約此席位</span>
            </button>
          ` : ''}

          ${isRes && active ? `
            <div class="flex items-center gap-2">
              ${canControlActive ? `
                <button onclick="checkinSeat('${active.id}')" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 rounded-xl text-xs transition flex items-center justify-center gap-1">
                  <i class="fa-solid fa-circle-check"></i>報到簽到
                </button>
                <button onclick="cancelSeatReservation('${active.id}')" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition" title="取消預約">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              ` : `
                <span class="w-full text-center py-1.5 bg-slate-50 text-slate-400 text-xs rounded-xl font-medium">他人預約待報到</span>
              `}
            </div>
          ` : ''}

          ${isOcc && active ? `
            ${canControlActive ? `
              <button onclick="releaseSeat('${active.id}')" class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>辦理簽退釋放</span>
              </button>
            ` : `
              <div class="w-full text-center py-1.5 bg-slate-50 text-slate-400 text-xs rounded-xl font-medium">他人使用中</div>
            `}
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderSeatReservationsTable(reservations) {
  const tbody = document.getElementById('seat-reservations-table-body');
  if (!tbody) return;

  const isAdmin = !currentUser || currentUser.role === 'admin';
  let list = reservations;
  if (!isAdmin) {
    list = list.filter(r => r.memberId === currentUser.memberId);
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400">${isAdmin ? '目前尚無任何預約紀錄' : '您目前尚無預約席位，歡迎點擊上方按鈕預約！'}</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(r => {
    let statusBadge = '';
    if (r.status === 'reserved') {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">已預約待報到</span>`;
    } else if (r.status === 'checked_in') {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">使用中 (已報到)</span>`;
    } else if (r.status === 'completed') {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">已簽退釋放</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">已取消</span>`;
    }

    const canControl = isAdmin || (currentUser && currentUser.memberId === r.memberId);

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-6 font-mono text-xs text-slate-500 font-semibold">${r.id}</td>
        <td class="py-3.5 px-6 font-bold text-slate-800">${escapeHtml(r.seatName)}</td>
        <td class="py-3.5 px-6 text-xs text-slate-500">${escapeHtml(r.zone)}</td>
        <td class="py-3.5 px-6 font-medium text-slate-800">${escapeHtml(r.memberName)} <span class="text-xs text-slate-400 font-mono">(${r.memberId})</span></td>
        <td class="py-3.5 px-6 font-mono text-xs text-slate-700">${r.date} ${r.startTime} ~ ${r.endTime}</td>
        <td class="py-3.5 px-6">${statusBadge}</td>
        <td class="py-3.5 px-6 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${canControl ? `
              ${r.status === 'reserved' ? `
                <button onclick="checkinSeat('${r.id}')" class="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium px-2.5 py-1 rounded-lg transition">報到</button>
                <button onclick="cancelSeatReservation('${r.id}')" class="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 font-medium px-2.5 py-1 rounded-lg transition">取消</button>
              ` : ''}
              ${r.status === 'checked_in' ? `
                <button onclick="releaseSeat('${r.id}')" class="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-2.5 py-1 rounded-lg transition">簽退釋放</button>
              ` : ''}
              ${r.status === 'completed' || r.status === 'cancelled' ? `
                <span class="text-xs text-slate-400">已結束</span>
              ` : ''}
            ` : `<span class="text-xs text-slate-400">他人預約</span>`}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function openSeatModal(preselectedSeatId = null) {
  try {
    const [seatsRes, membersRes] = await Promise.all([
      fetch('/api/seats'),
      fetch('/api/members')
    ]);

    const seats = await seatsRes.json();
    const members = await membersRes.json();

    // Populate Seats Dropdown
    const seatSelect = document.getElementById('reserve-seat-select');
    seatSelect.innerHTML = '<option value="">-- 請選擇欲預約席位 --</option>' +
      seats.map(s => {
        const isAvail = s.status === 'available';
        const note = isAvail ? '🟢 [空閒]' : (s.status === 'occupied' ? '🔴 [使用中]' : '🟡 [已預約]');
        return `<option value="${s.id}" ${s.id === preselectedSeatId ? 'selected' : ''}>${escapeHtml(s.name)} - ${s.zone} (${s.type}) ${note}</option>`;
      }).join('');

    // Populate Members Dropdown
    const memberSelect = document.getElementById('reserve-member-select');
    memberSelect.innerHTML = '<option value="">-- 請選擇讀者 --</option>' +
      members.map(m => {
        const canUse = m.status === 'active';
        return `<option value="${m.id}" ${!canUse ? 'disabled' : ''}>${escapeHtml(m.name)} (${m.id}) - ${m.type} ${!canUse ? '[已停權]' : ''}</option>`;
      }).join('');

    if (currentUser && currentUser.role === 'user') {
      memberSelect.value = currentUser.memberId;
      memberSelect.disabled = true;
    } else {
      memberSelect.disabled = false;
    }

    // Set today date
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    document.getElementById('reserve-date').value = `${now.getFullYear()}-${m}-${d}`;

    document.getElementById('modal-seat-reserve').classList.remove('hidden');
  } catch (err) {
    showToast('開啟預約視窗失敗: ' + err.message, 'error');
  }
}

function closeSeatModal() {
  document.getElementById('modal-seat-reserve').classList.add('hidden');
}

async function handleSeatReserveSubmit(e) {
  e.preventDefault();
  const seatId = document.getElementById('reserve-seat-select').value;
  const memberId = document.getElementById('reserve-member-select').value;
  const date = document.getElementById('reserve-date').value;
  const startTime = document.getElementById('reserve-start-time').value;
  const durationHours = document.getElementById('reserve-duration').value;

  if (!seatId || !memberId) {
    showToast('請選擇預約席位與讀者！', 'error');
    return;
  }

  try {
    const res = await fetch('/api/seats/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, memberId, date, startTime, durationHours })
    });
    const result = await res.json();

    if (!res.ok) throw new Error(result.error || '預約失敗');

    showToast(result.message, 'success');
    closeSeatModal();
    loadSeats();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function checkinSeat(reservationId) {
  try {
    const res = await fetch('/api/seats/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || '報到失敗');

    showToast(result.message, 'success');
    loadSeats();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function releaseSeat(reservationId) {
  if (!confirm('確認簽退並釋放此席位？')) return;

  try {
    const res = await fetch('/api/seats/release', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || '簽退失敗');

    showToast(result.message, 'success');
    loadSeats();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function cancelSeatReservation(reservationId) {
  if (!confirm('確定要取消此座位預約？')) return;

  try {
    const res = await fetch('/api/seats/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || '取消失敗');

    showToast(result.message, 'success');
    loadSeats();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================= 4. BOOKS VIEW =================
async function loadBooks() {
  try {
    const search = (document.getElementById('books-search-input').value || '').trim();
    const category = document.getElementById('books-category-select').value;

    const url = createApiUrl('/api/books');
    if (search) url.searchParams.set('search', search);
    if (category && category !== '全部') url.searchParams.set('category', category);

    const res = await fetch(url);
    const books = await res.json();

    const grid = document.getElementById('books-grid');
    if (books.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i class="fa-solid fa-book-open text-4xl mb-3 text-slate-300"></i>
          <p class="text-base font-medium">沒有符合條件的藏書</p>
          <p class="text-xs text-slate-400 mt-1">請嘗試變更搜尋關鍵字或分類</p>
        </div>
      `;
      return;
    }

    const isAdmin = !currentUser || currentUser.role === 'admin';

    grid.innerHTML = books.map(book => {
      const availRatio = book.totalCopies > 0 ? (book.availableCopies / book.totalCopies) * 100 : 0;
      const isAvailable = book.availableCopies > 0;
      const borrowBtnText = isAdmin ? '快速借出' : '立即借閱';

      return `
        <div class="book-card bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700">
                ${escapeHtml(book.category)}
              </span>
              <span class="text-xs font-mono text-slate-400 flex items-center gap-1">
                <i class="fa-solid fa-location-dot"></i>${escapeHtml(book.location || 'A區-01')}
              </span>
            </div>

            <h4 class="font-bold text-slate-800 text-base leading-snug line-clamp-2 mb-1.5" title="${escapeHtml(book.title)}">
              ${escapeHtml(book.title)}
            </h4>
            <p class="text-xs text-slate-500 mb-2">
              <i class="fa-regular fa-user mr-1 text-slate-400"></i>${escapeHtml(book.author)} 著
            </p>

            <div class="text-[11px] text-slate-400 space-y-0.5 mb-4">
              <div>出版社：${escapeHtml(book.publisher || '未指定')} (${book.publishYear || '2024'})</div>
              <div class="font-mono">ISBN：${escapeHtml(book.isbn || '無')}</div>
            </div>

            ${book.description ? `<p class="text-xs text-slate-500 line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-xl italic">“${escapeHtml(book.description)}”</p>` : ''}
          </div>

          <div>
            <div class="mb-4 pt-3 border-t border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-slate-500 font-medium">館藏狀態</span>
                <span class="font-bold ${isAvailable ? 'text-emerald-600' : 'text-rose-500'}">
                  在館 ${book.availableCopies} / 總藏 ${book.totalCopies} 本
                </span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-300 ${isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}" style="width: ${availRatio}%"></div>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1">
              ${isAvailable 
                ? `<button onclick="quickBorrowBook('${book.id}')" class="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>${borrowBtnText}
                   </button>`
                : `<button disabled class="flex-1 bg-slate-100 text-slate-400 text-xs font-semibold py-2 rounded-xl cursor-not-allowed">已無在庫可借</button>`}
              ${isAdmin ? `
              <button onclick="editBook('${book.id}')" title="編輯書籍" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button onclick="deleteBook('${book.id}', '${escapeHtml(book.title)}')" title="刪除書籍" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-trash-can"></i>
              </button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    showToast('載入圖書清單失敗: ' + err.message, 'error');
  }
}

function quickBorrowBook(bookId) {
  switchTab('circulation');
  setTimeout(() => {
    const bookSelect = document.getElementById('borrow-book-select');
    if (bookSelect) bookSelect.value = bookId;
  }, 100);
}

// Book Modal
function openBookModal(book = null) {
  const modal = document.getElementById('modal-book');
  const titleEl = document.getElementById('modal-book-title');
  const form = document.getElementById('form-book');

  form.reset();
  if (book) {
    titleEl.textContent = '編輯館藏圖書';
    document.getElementById('book-form-id').value = book.id;
    document.getElementById('book-title').value = book.title;
    document.getElementById('book-author').value = book.author;
    document.getElementById('book-publisher').value = book.publisher || '';
    document.getElementById('book-isbn').value = book.isbn || '';
    document.getElementById('book-category').value = book.category || '未分類';
    document.getElementById('book-year').value = book.publishYear || 2024;
    document.getElementById('book-location').value = book.location || '';
    document.getElementById('book-copies').value = book.totalCopies || 1;
    document.getElementById('book-desc').value = book.description || '';
  } else {
    titleEl.textContent = '新增館藏書籍';
    document.getElementById('book-form-id').value = '';
    document.getElementById('book-year').value = new Date().getFullYear();
    document.getElementById('book-copies').value = '3';
    document.getElementById('book-location').value = 'A區-01架';
  }

  modal.classList.remove('hidden');
}

function closeBookModal() {
  document.getElementById('modal-book').classList.add('hidden');
}

async function editBook(bookId) {
  try {
    const res = await fetch(`/api/books/${bookId}`);
    const book = await res.json();
    openBookModal(book);
  } catch (err) {
    showToast('讀取書籍詳情失敗: ' + err.message, 'error');
  }
}

async function saveBook(e) {
  e.preventDefault();
  const id = document.getElementById('book-form-id').value;
  const payload = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
    publisher: document.getElementById('book-publisher').value,
    isbn: document.getElementById('book-isbn').value,
    category: document.getElementById('book-category').value,
    publishYear: document.getElementById('book-year').value,
    location: document.getElementById('book-location').value,
    totalCopies: document.getElementById('book-copies').value,
    description: document.getElementById('book-desc').value
  };

  try {
    const url = id ? `/api/books/${id}` : '/api/books';
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || '儲存失敗');

    showToast(id ? '書籍更新成功！' : '新書新增成功！', 'success');
    closeBookModal();
    loadBooks();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteBook(bookId, title) {
  if (!confirm(`確定要刪除書籍《${title}》嗎？此操作不可逆！`)) return;

  try {
    const res = await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '刪除失敗');

    showToast('書籍已成功刪除', 'success');
    loadBooks();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================= 5. MEMBERS VIEW =================
async function loadMembers() {
  try {
    const search = (document.getElementById('members-search-input').value || '').trim();
    const type = document.getElementById('members-type-select').value;

    const url = createApiUrl('/api/members');
    if (search) url.searchParams.set('search', search);
    if (type && type !== '全部') url.searchParams.set('type', type);

    const res = await fetch(url);
    const members = await res.json();

    const grid = document.getElementById('members-grid');
    if (members.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i class="fa-solid fa-user-group text-4xl mb-3 text-slate-300"></i>
          <p class="text-base font-medium">查無符合條件的讀者</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = members.map(m => {
      const isSuspended = m.status === 'suspended';
      const quotaRatio = m.maxBorrowLimit > 0 ? (m.currentBorrowed / m.maxBorrowLimit) * 100 : 0;

      return `
        <div class="member-card bg-white rounded-2xl border ${isSuspended ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'} p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">
                ${escapeHtml(m.type)}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${isSuspended ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}">
                ${isSuspended ? '已停權' : '正常借閱'}
              </span>
            </div>

            <div class="flex items-baseline gap-2 mb-1">
              <h4 class="font-bold text-slate-800 text-lg">${escapeHtml(m.name)}</h4>
              <span class="font-mono text-xs text-slate-400">${m.id}</span>
            </div>

            <div class="text-xs text-slate-500 space-y-1 mb-4">
              <div><i class="fa-regular fa-envelope mr-1.5 text-slate-400"></i>${escapeHtml(m.email || '無電子信箱')}</div>
              <div><i class="fa-solid fa-phone mr-1.5 text-slate-400"></i>${escapeHtml(m.phone || '無電話號碼')}</div>
              ${m.notes ? `<div class="text-slate-400"><i class="fa-regular fa-note-sticky mr-1.5 text-slate-400"></i>${escapeHtml(m.notes)}</div>` : ''}
            </div>
          </div>

          <div>
            <div class="mb-4 pt-3 border-t border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-slate-500">當前借出量</span>
                <span class="font-bold text-slate-700">${m.currentBorrowed} / ${m.maxBorrowLimit} 本</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-300 ${quotaRatio >= 100 ? 'bg-amber-500' : 'bg-blue-500'}" style="width: ${quotaRatio}%"></div>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button onclick="toggleMemberStatus('${m.id}', '${m.status}')" class="flex-1 text-xs py-2 rounded-xl font-medium border transition ${isSuspended ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}">
                ${isSuspended ? '解除停權' : '設為停權'}
              </button>
              <button onclick="editMember('${m.id}')" title="編輯讀者" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button onclick="deleteMember('${m.id}', '${escapeHtml(m.name)}')" title="刪除讀者" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    showToast('載入讀者清單失敗: ' + err.message, 'error');
  }
}

function openMemberModal(member = null) {
  const modal = document.getElementById('modal-member');
  const titleEl = document.getElementById('modal-member-title');
  const form = document.getElementById('form-member');
  const statusGroup = document.getElementById('member-status-group');

  form.reset();
  if (member) {
    titleEl.textContent = '編輯讀者資料';
    document.getElementById('member-form-id').value = member.id;
    document.getElementById('member-name').value = member.name;
    document.getElementById('member-type').value = member.type;
    document.getElementById('member-limit').value = member.maxBorrowLimit;
    document.getElementById('member-email').value = member.email || '';
    document.getElementById('member-phone').value = member.phone || '';
    document.getElementById('member-notes').value = member.notes || '';
    document.getElementById('member-status').value = member.status || 'active';
    statusGroup.classList.remove('hidden');
  } else {
    titleEl.textContent = '辦理讀者借閱證';
    document.getElementById('member-form-id').value = '';
    document.getElementById('member-type').value = '學生';
    document.getElementById('member-limit').value = 5;
    statusGroup.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

function closeMemberModal() {
  document.getElementById('modal-member').classList.add('hidden');
}

function adjustDefaultLimit() {
  const type = document.getElementById('member-type').value;
  const limits = { '學生': 5, '教職員': 10, '一般讀者': 3 };
  document.getElementById('member-limit').value = limits[type] || 5;
}

async function editMember(memberId) {
  try {
    const res = await fetch('/api/members');
    const members = await res.json();
    const target = members.find(m => m.id === memberId);
    if (target) openMemberModal(target);
  } catch (err) {
    showToast('讀取讀者資料失敗: ' + err.message, 'error');
  }
}

async function saveMember(e) {
  e.preventDefault();
  const id = document.getElementById('member-form-id').value;
  const payload = {
    name: document.getElementById('member-name').value,
    type: document.getElementById('member-type').value,
    maxBorrowLimit: document.getElementById('member-limit').value,
    email: document.getElementById('member-email').value,
    phone: document.getElementById('member-phone').value,
    notes: document.getElementById('member-notes').value,
    status: document.getElementById('member-status').value
  };

  try {
    const url = id ? `/api/members/${id}` : '/api/members';
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || '儲存失敗');

    showToast(id ? '讀者資料已更新！' : '讀者借閱證建立成功！', 'success');
    closeMemberModal();
    loadMembers();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function toggleMemberStatus(memberId, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
  const label = newStatus === 'active' ? '解除停權' : '設為停權';
  if (!confirm(`確定要將此讀者借閱證${label}嗎？`)) return;

  try {
    const res = await fetch(`/api/members/${memberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('狀態變更失敗');

    showToast(`已${label}！`, 'success');
    loadMembers();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteMember(memberId, name) {
  if (!confirm(`確定要刪除讀者「${name}」嗎？此操作不可復原！`)) return;

  try {
    const res = await fetch(`/api/members/${memberId}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '刪除失敗');

    showToast('讀者已成功刪除', 'success');
    loadMembers();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================= 6. LOANS HISTORY VIEW =================
async function loadLoans() {
  try {
    const search = (document.getElementById('loans-search-input').value || '').trim();
    const status = document.getElementById('loans-status-select').value;

    const url = createApiUrl('/api/loans');
    if (search) url.searchParams.set('search', search);
    if (status) url.searchParams.set('status', status);

    const res = await fetch(url);
    let loans = await res.json();

    const isAdmin = !currentUser || currentUser.role === 'admin';
    if (!isAdmin) {
      loans = loans.filter(l => l.memberId === currentUser.memberId);
    }

    const tbody = document.getElementById('loans-table-body');
    if (loans.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="py-12 text-center text-slate-400">${isAdmin ? '無符合條件的借閱紀錄' : '您目前尚無借閱歷程紀錄'}</td></tr>`;
      return;
    }

    tbody.innerHTML = loans.map(l => {
      let statusBadge = '';
      if (l.status === 'borrowed') {
        statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">借閱中</span>`;
      } else if (l.status === 'overdue') {
        statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">逾期 (罰金 NT$${l.fine})</span>`;
      } else {
        statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">已歸還</span>`;
      }

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-3.5 px-6 font-mono text-xs text-slate-500 font-semibold">${l.id}</td>
          <td class="py-3.5 px-6 font-medium text-slate-800">${escapeHtml(l.bookTitle)}</td>
          <td class="py-3.5 px-6">${escapeHtml(l.memberName)} <span class="text-xs text-slate-400 font-mono">(${l.memberId})</span></td>
          <td class="py-3.5 px-6 text-xs text-slate-500">${l.borrowDate}</td>
          <td class="py-3.5 px-6 text-xs font-mono font-semibold ${l.status === 'overdue' ? 'text-rose-600' : 'text-slate-600'}">${l.dueDate}</td>
          <td class="py-3.5 px-6 text-xs text-slate-500">${l.returnDate || '-'}</td>
          <td class="py-3.5 px-6">${statusBadge}</td>
          <td class="py-3.5 px-6 text-right">
            ${l.status !== 'returned'
              ? `<div class="flex items-center justify-end gap-1.5">
                   ${l.status !== 'overdue' && (l.renewCount || 0) < 2
                     ? `<button onclick="renewBook('${l.id}')" class="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-2.5 py-1 rounded-lg transition">續借</button>`
                     : ''}
                   <button onclick="returnBook('${l.id}')" class="text-xs bg-emerald-600 text-white hover:bg-emerald-700 font-medium px-2.5 py-1 rounded-lg transition">歸還</button>
                 </div>`
              : `<span class="text-xs text-slate-400">已結清</span>`}
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    showToast('載入借閱紀錄失敗: ' + err.message, 'error');
  }
}

async function exportLoansToCSV() {
  try {
    const res = await fetch('/api/loans?status=all');
    let loans = await res.json();

    const isAdmin = !currentUser || currentUser.role === 'admin';
    if (!isAdmin) {
      loans = loans.filter(l => l.memberId === currentUser.memberId);
    }

    if (loans.length === 0) {
      showToast('目前尚無借閱紀錄可匯出！', 'info');
      return;
    }

    const headers = ['借閱單號', '書籍編號', '書名', '讀者證號', '讀者姓名', '借出日期', '應還日期', '歸還日期', '狀態', '續借次數', '逾期罰金'];
    const rows = loans.map(l => [
      l.id,
      l.bookId,
      `"${(l.bookTitle || '').replace(/"/g, '""')}"`,
      l.memberId,
      `"${(l.memberName || '').replace(/"/g, '""')}"`,
      l.borrowDate,
      l.dueDate,
      l.returnDate || '',
      l.status === 'borrowed' ? '借閱中' : (l.status === 'overdue' ? '逾期未還' : '已歸還'),
      l.renewCount || 0,
      l.fine || 0
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const fileName = isAdmin 
      ? `圖書館借閱紀錄報表_${new Date().toISOString().slice(0, 10)}.csv`
      : `個人借閱歷程_${currentUser.name}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('借閱紀錄已成功匯出為 CSV 檔！', 'success');
  } catch (err) {
    showToast('匯出 CSV 失敗: ' + err.message, 'error');
  }
}

// ================= 7. SETTINGS VIEW =================
async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();

    document.getElementById('setting-systemName').value = data.systemName || '智慧圖書館管理系統';
    document.getElementById('setting-maxBorrowDays').value = data.maxBorrowDays || 14;
    document.getElementById('setting-finePerDay').value = data.finePerDay || 5;
  } catch (err) {
    showToast('載入系統設定失敗: ' + err.message, 'error');
  }
}

async function saveSettings(e) {
  e.preventDefault();
  const payload = {
    systemName: document.getElementById('setting-systemName').value,
    maxBorrowDays: parseInt(document.getElementById('setting-maxBorrowDays').value, 10) || 14,
    finePerDay: parseInt(document.getElementById('setting-finePerDay').value, 10) || 5
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('儲存設定失敗');

    showToast('系統設定已儲存成功！', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================= UTILITIES =================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-800 text-white border-emerald-600',
    error: 'bg-rose-800 text-white border-rose-600',
    info: 'bg-slate-800 text-white border-slate-600'
  };
  const icons = {
    success: 'fa-circle-check text-emerald-400',
    error: 'fa-circle-xmark text-rose-400',
    info: 'fa-circle-info text-blue-400'
  };

  toast.className = `toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm border font-medium ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || icons.info} text-base"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ================= 8. USER PROFILE VIEW =================
async function loadProfile() {
  if (!currentUser || currentUser.role === 'admin') {
    switchTab('dashboard');
    return;
  }

  try {
    const res = await fetch('/api/members');
    const members = await res.json();
    const member = members.find(m => m.id === currentUser.memberId);
    if (!member) return;

    const loansRes = await fetch('/api/loans?status=active');
    const activeLoans = await loansRes.json();
    const myLoans = activeLoans.filter(l => l.memberId === member.id);
    const borrowedCount = myLoans.length;

    const nameEl = document.getElementById('profile-name');
    const idEl = document.getElementById('profile-id');
    const typeEl = document.getElementById('profile-type');
    const notesEl = document.getElementById('profile-notes');
    const emailEl = document.getElementById('profile-email');
    const phoneEl = document.getElementById('profile-phone');
    const joinedEl = document.getElementById('profile-joined');
    const statusEl = document.getElementById('profile-status');
    const borrowedEl = document.getElementById('profile-borrowed');
    const limitEl = document.getElementById('profile-limit');
    const remainingEl = document.getElementById('profile-remaining');
    const barEl = document.getElementById('profile-bar');

    if (nameEl) nameEl.textContent = member.name;
    if (idEl) idEl.textContent = member.id;
    if (typeEl) typeEl.textContent = member.type;
    if (notesEl) notesEl.textContent = member.notes || '讀者身份正常';
    if (emailEl) emailEl.textContent = member.email || '未提供';
    if (phoneEl) phoneEl.textContent = member.phone || '未提供';
    if (joinedEl) joinedEl.textContent = member.joinedDate || '2025-01-01';

    const maxLimit = member.maxBorrowLimit || 5;
    const remaining = Math.max(0, maxLimit - borrowedCount);
    const percent = Math.min(100, Math.round((borrowedCount / maxLimit) * 100));

    if (borrowedEl) borrowedEl.textContent = borrowedCount;
    if (limitEl) limitEl.textContent = maxLimit;
    if (remainingEl) remainingEl.textContent = remaining;
    if (barEl) {
      barEl.style.width = `${percent}%`;
      if (borrowedCount >= maxLimit) {
        barEl.className = 'h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500';
      } else {
        barEl.className = 'h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500';
      }
    }

    if (statusEl) {
      if (member.status === 'active') {
        statusEl.innerHTML = `<span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟢 正常有效</span>`;
      } else {
        statusEl.innerHTML = `<span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">🔴 已停權</span>`;
      }
    }
  } catch (err) {
    console.error('loadProfile error', err);
  }
}

// Global function exports for inline HTML handlers
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLoginSubmit = handleLoginSubmit;
window.loginAs = loginAs;
window.logout = logout;
window.loadProfile = loadProfile;
window.switchTab = switchTab;
window.quickBorrowBook = quickBorrowBook;
window.openBookModal = openBookModal;
window.closeBookModal = closeBookModal;
window.saveBook = saveBook;
window.editBook = editBook;
window.deleteBook = deleteBook;
window.openMemberModal = openMemberModal;
window.closeMemberModal = closeMemberModal;
window.saveMember = saveMember;
window.editMember = editMember;
window.deleteMember = deleteMember;
window.toggleMemberStatus = toggleMemberStatus;
window.adjustDefaultLimit = adjustDefaultLimit;
window.openSeatModal = openSeatModal;
window.closeSeatModal = closeSeatModal;
window.submitSeatReservation = submitSeatReservation;
window.checkinReservation = checkinReservation;
window.releaseReservation = releaseReservation;
window.cancelReservation = cancelReservation;
window.borrowBook = borrowBook;
window.returnBook = returnBook;
window.renewBook = renewBook;
window.filterActiveLoans = filterActiveLoans;
window.loadBooks = loadBooks;
window.loadMembers = loadMembers;
window.loadLoans = loadLoans;
window.exportLoansToCSV = exportLoansToCSV;
window.saveSettings = saveSettings;
