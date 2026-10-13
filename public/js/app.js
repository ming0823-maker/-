// Smart Library OS - Client Application

// ================= OFFLINE / FILE:// PROTOCOL ADAPTER =================
if (window.location.protocol === 'file:') {
  console.warn('智慧圖書館正以本地檔案模式 (file://) 運行，已自動啟用離線預覽相容層。');

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
    { id: "MEM-2001", name: "陳思妤", type: "學生", email: "sychen@university.edu.tw", phone: "0912-345-678", status: "active", joinedDate: "2025-09-01", currentBorrowed: 1, maxBorrowLimit: 5, notes: "資工系二年級" },
    { id: "MEM-2002", name: "林浩然", type: "教職員", email: "hrlin@university.edu.tw", phone: "0923-456-789", status: "active", joinedDate: "2024-03-10", currentBorrowed: 1, maxBorrowLimit: 10, notes: "圖書資訊處助理教授" },
    { id: "MEM-2003", name: "張雅筑", type: "學生", email: "ycchang@university.edu.tw", phone: "0934-567-890", status: "active", joinedDate: "2025-10-12", currentBorrowed: 1, maxBorrowLimit: 5, notes: "外文系三年級" },
    { id: "MEM-2004", name: "黃國豪", type: "一般讀者", email: "guohao.huang@gmail.com", phone: "0956-789-012", status: "active", joinedDate: "2026-01-05", currentBorrowed: 1, maxBorrowLimit: 3, notes: "社區居民證" },
    { id: "MEM-2005", name: "廖俊凱", type: "學生", email: "jkliao@university.edu.tw", phone: "0967-890-123", status: "active", joinedDate: "2026-02-18", currentBorrowed: 0, maxBorrowLimit: 5, notes: "電機系一年級" }
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
    { id: "LN-3005", bookId: "BK-1007", bookTitle: "解憂雜貨店", memberId: "MEM-2001", memberName: "陳思妤", borrowDate: "2026-08-10", dueDate: "2026-08-24", returnDate: "2026-08-20", status: "returned", renewCount: 0, fine: 0 }
  ];

  const defaultMockReservations = [
    { id: "RES-4001", seatId: "SEAT-A02", seatName: "A-02", zone: "靜音自習區", memberId: "MEM-2001", memberName: "陳思妤", date: "2026-09-15", startTime: "09:00", endTime: "13:00", durationHours: 4, status: "completed", createdAt: "2026-09-15 08:45" },
    { id: "RES-4002", seatId: "SEAT-A03", seatName: "A-03", zone: "靜音自習區", memberId: "MEM-2002", memberName: "林浩然", date: "2026-09-15", startTime: "14:00", endTime: "18:00", durationHours: 4, status: "checked_in", createdAt: "2026-09-15 09:10" },
    { id: "RES-4003", seatId: "SEAT-B01", seatName: "B-01", zone: "電腦檢索區", memberId: "MEM-2003", memberName: "張雅筑", date: "2026-09-15", startTime: "10:00", endTime: "12:00", durationHours: 2, status: "checked_in", createdAt: "2026-09-15 09:50" }
  ];

  const defaultMockSettings = {
    maxBorrowDays: 14,
    maxBooksPerMember: 5,
    finePerDay: 5,
    systemName: "智慧圖書館管理系統",
    enableFine: true
  };

  function getStore(key, fallback) {
    try {
      const data = localStorage.getItem('lib_mock_' + key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }
  function setStore(key, data) {
    try {
      localStorage.setItem('lib_mock_' + key, JSON.stringify(data));
    } catch {}
  }

  let mockBooks = getStore('books', defaultMockBooks);
  let mockMembers = getStore('members', defaultMockMembers);
  let mockSeats = getStore('seats', defaultMockSeats);
  let mockLoans = getStore('loans', defaultMockLoans);
  let mockReservations = getStore('reservations', defaultMockReservations);
  let mockSettings = getStore('settings', defaultMockSettings);

  const originalFetch = window.fetch;
  window.fetch = async function(url, options = {}) {
    if (typeof url === 'string' && (url.startsWith('/api') || url.startsWith('http://localhost:3000/api'))) {
      const method = (options.method || 'GET').toUpperCase();
      const cleanUrl = url.replace('http://localhost:3000', '');
      const path = cleanUrl.split('?')[0];
      const params = new URLSearchParams(cleanUrl.split('?')[1] || '');
      let body = {};
      if (options.body) {
        try { body = JSON.parse(options.body); } catch {}
      }

      let resData = null;

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
      else if (path === '/api/system/db-status') {
        resData = { engine: '離線預覽 (file://)', isMySqlConnected: false, database: '本機快取', error: null };
      }
      else if (path === '/api/books') {
        if (method === 'GET') {
          let list = [...mockBooks];
          const q = params.get('q');
          const cat = params.get('category');
          if (q) list = list.filter(b => b.title.includes(q) || b.author.includes(q) || b.isbn.includes(q));
          if (cat) list = list.filter(b => b.category === cat);
          resData = list;
        } else if (method === 'POST') {
          const newBook = {
            id: 'BK-' + (1000 + mockBooks.length + 1),
            ...body,
            availableCopies: Number(body.totalCopies || 1),
            totalCopies: Number(body.totalCopies || 1)
          };
          mockBooks.unshift(newBook);
          setStore('books', mockBooks);
          resData = { success: true, message: '書籍新增成功（離線暫存）', book: newBook };
        }
      }
      else if (path.startsWith('/api/books/')) {
        const id = path.replace('/api/books/', '');
        if (method === 'GET') {
          resData = mockBooks.find(b => b.id === id) || null;
        } else if (method === 'PUT') {
          const idx = mockBooks.findIndex(b => b.id === id);
          if (idx !== -1) {
            mockBooks[idx] = { ...mockBooks[idx], ...body };
            setStore('books', mockBooks);
            resData = { success: true, book: mockBooks[idx] };
          }
        } else if (method === 'DELETE') {
          mockBooks = mockBooks.filter(b => b.id !== id);
          setStore('books', mockBooks);
          resData = { success: true, message: '已刪除' };
        }
      }
      else if (path === '/api/members') {
        if (method === 'GET') {
          resData = [...mockMembers];
        } else if (method === 'POST') {
          const newMember = {
            id: 'MEM-' + (2000 + mockMembers.length + 1),
            currentBorrowed: 0,
            status: 'active',
            joinedDate: new Date().toISOString().split('T')[0],
            ...body
          };
          mockMembers.unshift(newMember);
          setStore('members', mockMembers);
          resData = { success: true, member: newMember };
        }
      }
      else if (path.startsWith('/api/members/')) {
        const id = path.replace('/api/members/', '');
        if (method === 'PUT') {
          const idx = mockMembers.findIndex(m => m.id === id);
          if (idx !== -1) {
            mockMembers[idx] = { ...mockMembers[idx], ...body };
            setStore('members', mockMembers);
            resData = { success: true, member: mockMembers[idx] };
          }
        } else if (method === 'DELETE') {
          mockMembers = mockMembers.filter(m => m.id !== id);
          setStore('members', mockMembers);
          resData = { success: true, message: '已刪除' };
        }
      }
      else if (path === '/api/loans' || path === '/api/loans/active') {
        const status = params.get('status') || (path.includes('active') ? 'active' : 'all');
        if (status === 'active') {
          resData = mockLoans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
        } else {
          resData = [...mockLoans];
        }
      }
      else if (path === '/api/loans/borrow') {
        const book = mockBooks.find(b => b.id === body.bookId);
        const member = mockMembers.find(m => m.id === body.memberId);
        if (book && member) {
          book.availableCopies = Math.max(0, (book.availableCopies || 1) - 1);
          member.currentBorrowed = (member.currentBorrowed || 0) + 1;
          const today = new Date();
          const due = new Date();
          due.setDate(today.getDate() + (Number(body.days) || 14));
          const newLoan = {
            id: 'LN-' + (3000 + mockLoans.length + 1),
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
        if (loan) {
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
        if (loan) {
          loan.renewCount = (loan.renewCount || 0) + 1;
          const curDue = new Date(loan.dueDate);
          curDue.setDate(curDue.getDate() + 14);
          loan.dueDate = curDue.toISOString().split('T')[0];
          setStore('loans', mockLoans);
          resData = { success: true, message: `續借成功！新到期日為：${loan.dueDate}`, loan };
        }
      }
      else if (path === '/api/seats') {
        resData = [...mockSeats];
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
        resData = [...mockReservations];
      }
      else if (path === '/api/seats/reserve') {
        const seat = mockSeats.find(s => s.id === body.seatId);
        const member = mockMembers.find(m => m.id === body.memberId);
        if (seat) {
          const resId = 'RES-' + (4000 + mockReservations.length + 1);
          seat.status = 'reserved';
          seat.currentReservationId = resId;
          const newRes = {
            id: resId,
            seatId: seat.id,
            seatName: seat.name,
            zone: seat.zone,
            memberId: member ? member.id : 'MEM-GUEST',
            memberName: member ? member.name : '讀者',
            date: body.date,
            startTime: body.startTime,
            durationHours: body.durationHours,
            status: 'confirmed',
            createdAt: new Date().toISOString()
          };
          mockReservations.unshift(newRes);
          setStore('seats', mockSeats);
          setStore('reservations', mockReservations);
          resData = { success: true, message: `預約成功！座位：${seat.name}，時段：${body.startTime}`, reservation: newRes };
        }
      }
      else if (path === '/api/seats/checkin') {
        const res = mockReservations.find(r => r.id === body.reservationId);
        if (res) {
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
        if (res) {
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
          ok: true,
          status: 200,
          json: async () => resData,
          text: async () => JSON.stringify(resData)
        };
      }
    }
    return originalFetch.apply(this, arguments);
  };
}

let currentTab = 'dashboard';
let categoriesChartInstance = null;
let circulationChartInstance = null;
let cachedActiveLoans = [];
let allBooksCache = [];
let allMembersCache = [];
let allSeatsCache = [];

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    const warning = document.getElementById('file-protocol-warning');
    if (warning) warning.classList.remove('hidden');
  }
  initClock();
  initDateBadge();
  switchTab('dashboard');
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
  settings: { title: '系統參數設定', subtitle: '借閱天數、逾期滯納金與營運規則配置' }
};

function switchTab(tabId) {
  currentTab = tabId;

  // Update Nav Buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Update Sections
  ['dashboard', 'circulation', 'seats', 'books', 'members', 'loans', 'settings'].forEach(id => {
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
  const info = tabTitles[tabId] || { title: '智慧圖書館', subtitle: '' };
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

  if (loans.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
        <i class="fa-solid fa-box-open text-3xl mb-2 text-slate-300"></i>
        <p class="text-sm">目前無任何未歸還借閱紀錄</p>
      </div>
    `;
    return;
  }

  container.innerHTML = loans.map(l => {
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

    const url = new URL('/api/seats', window.location.origin);
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
              <button onclick="checkinSeat('${active.id}')" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 rounded-xl text-xs transition flex items-center justify-center gap-1">
                <i class="fa-solid fa-circle-check"></i>報到簽到
              </button>
              <button onclick="cancelSeatReservation('${active.id}')" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition" title="取消預約">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          ` : ''}

          ${isOcc && active ? `
            <button onclick="releaseSeat('${active.id}')" class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>辦理簽退釋放</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderSeatReservationsTable(reservations) {
  const tbody = document.getElementById('seat-reservations-table-body');
  if (!tbody) return;

  if (reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400">目前尚無任何預約紀錄</td></tr>`;
    return;
  }

  tbody.innerHTML = reservations.map(r => {
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

    const url = new URL('/api/books', window.location.origin);
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

    grid.innerHTML = books.map(book => {
      const availRatio = book.totalCopies > 0 ? (book.availableCopies / book.totalCopies) * 100 : 0;
      const isAvailable = book.availableCopies > 0;

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
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>快速借出
                   </button>`
                : `<button disabled class="flex-1 bg-slate-100 text-slate-400 text-xs font-semibold py-2 rounded-xl cursor-not-allowed">已無在庫可借</button>`}
              <button onclick="editBook('${book.id}')" title="編輯書籍" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button onclick="deleteBook('${book.id}', '${escapeHtml(book.title)}')" title="刪除書籍" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition">
                <i class="fa-regular fa-trash-can"></i>
              </button>
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

    const url = new URL('/api/members', window.location.origin);
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

    const url = new URL('/api/loans', window.location.origin);
    if (search) url.searchParams.set('search', search);
    if (status) url.searchParams.set('status', status);

    const res = await fetch(url);
    const loans = await res.json();

    const tbody = document.getElementById('loans-table-body');
    if (loans.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="py-12 text-center text-slate-400">無符合條件的借閱紀錄</td></tr>`;
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
    const loans = await res.json();

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
    link.setAttribute('download', `圖書館借閱紀錄報表_${new Date().toISOString().slice(0, 10)}.csv`);
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
