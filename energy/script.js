// Generate 40,000+ fake transactions
const transactions = [];
const cryptoTypes = ['BTC', 'ETH', 'USDT'];
const transactionTypes = ['Deposit', 'Withdraw'];
const names = [
  'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Moore', 'Edward Davis',
  'Fiona Clark', 'George Miller', 'Helen Taylor', 'Ian Wilson', 'Jane White',
  'Kyle Harris', 'Laura Lewis', 'Michael Hall', 'Nina Scott', 'Oscar Martin',
  'Paul King', 'Quinn Lee', 'Rachel Wright', 'Steven Adams', 'Tina Nelson'
];

// Helper function to generate random numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate transaction data
for (let i = 0; i < 40000; i++) {
  const randomDate = new Date(Date.now() - getRandomInt(0, 365 * 24 * 60 * 60 * 1000)); // Random date in the past year
  const date = randomDate.toLocaleString();
  const type = transactionTypes[getRandomInt(0, transactionTypes.length - 1)];
  const crypto = cryptoTypes[getRandomInt(0, cryptoTypes.length - 1)];
  const amount = getRandomInt(10, 5000); // Random amount between $10 and $5000
  const name = names[getRandomInt(0, names.length - 1)];

  transactions.push({
    date,
    name,
    type,
    crypto,
    amount: $${amount.toFixed(2)}
  });
}

// Variables for filtering
let filteredTransactions = [...transactions];
let startIndex = 0;

// Function to update the table with filtered transactions
function updateTable() {
  const tableBody = document.querySelector('#transaction-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  const endIndex = startIndex + 10;
  const visibleTransactions = filteredTransactions.slice(startIndex, endIndex);

  visibleTransactions.forEach((transaction) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.name}</td>
      <td>${transaction.type}</td>
      <td>${transaction.crypto}</td>
      <td>${transaction.amount}</td>
    `;
    tableBody.appendChild(row);
  });

  // Update startIndex for the next batch of transactions
  startIndex = endIndex >= filteredTransactions.length ? 0 : endIndex;
}

// Function to filter transactions based on user input
function filterTransactions() {
  const nameFilter = document.getElementById('name-filter').value.toLowerCase();
  const typeFilter = document.getElementById('type-filter').value;
  const cryptoFilter = document.getElementById('crypto-filter').value;

  filteredTransactions = transactions.filter((transaction) => {
    return (
      (nameFilter === '' || transaction.name.toLowerCase().includes(nameFilter)) &&
      (typeFilter === 'All' || transaction.type === typeFilter) &&
      (cryptoFilter === 'All' || transaction.crypto === cryptoFilter)
    );
  });

  // Reset to the first page of filtered results
  startIndex = 0;
  updateTable();
}

// Attach event listeners to the filter inputs
document.getElementById('name-filter').addEventListener('input', filterTransactions);
document.getElementById('type-filter').addEventListener('change', filterTransactions);
document.getElementById('crypto-filter').addEventListener('change', filterTransactions);

// Initial table load
updateTable();

// Update table every 10 seconds
setInterval(updateTable, 10000);