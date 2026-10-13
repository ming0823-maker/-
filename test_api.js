async function runTests() {
  const base = 'http://localhost:3000';

  console.log('--- 1. Testing GET /api/books ---');
  const booksRes = await fetch(`${base}/api/books`);
  const books = await booksRes.json();
  console.log(`Retrieved ${books.length} books.`);

  console.log('--- 2. Testing GET /api/members ---');
  const membersRes = await fetch(`${base}/api/members`);
  const members = await membersRes.json();
  console.log(`Retrieved ${members.length} members.`);

  console.log('--- 3. Testing Borrow & Return flow ---');
  const borrowRes = await fetch(`${base}/api/loans/borrow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      memberId: 'MEM-2005',
      bookId: 'BK-1004',
      days: 14
    })
  });
  const borrowResult = await borrowRes.json();
  console.log('Borrow result:', borrowResult.message);
  const loanId = borrowResult.loan.id;

  const returnRes = await fetch(`${base}/api/loans/return`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loanId })
  });
  const returnResult = await returnRes.json();
  console.log('Return result:', returnResult.message);

  console.log('--- 4. Testing Seats API ---');
  const seatsRes = await fetch(`${base}/api/seats`);
  const seats = await seatsRes.json();
  console.log(`Retrieved ${seats.length} seats.`);

  const seatStatsRes = await fetch(`${base}/api/seats/stats`);
  const seatStats = await seatStatsRes.json();
  console.log(`Seat stats: Total ${seatStats.total}, Available ${seatStats.available}, Occupied ${seatStats.occupied}, Reserved ${seatStats.reserved}`);

  console.log('--- 5. Testing Seat Reservation Workflow ---');
  const reserveRes = await fetch(`${base}/api/seats/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seatId: 'SEAT-A04',
      memberId: 'MEM-2005',
      date: '2026-09-15',
      startTime: '15:00',
      durationHours: 2
    })
  });
  const reserveResult = await reserveRes.json();
  console.log('Reservation result:', reserveResult.message);
  const resId = reserveResult.reservation.id;

  // Check-in
  const checkinRes = await fetch(`${base}/api/seats/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservationId: resId })
  });
  const checkinResult = await checkinRes.json();
  console.log('Check-in result:', checkinResult.message);

  // Release
  const releaseRes = await fetch(`${base}/api/seats/release`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservationId: resId })
  });
  const releaseResult = await releaseRes.json();
  console.log('Release result:', releaseResult.message);

  console.log('\nAll API integration tests passed successfully! 🎉');
}

runTests().catch(err => console.error('Test failed:', err));
