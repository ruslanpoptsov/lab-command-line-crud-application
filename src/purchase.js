const readline = require('readline-sync');
const { displayPurchasesIndex, displayPurchaseDetails, displayTotalDonation } = require('./view');
const { getPurchases, savePurchases } = require('./storage');

function createPurchase() {
  const id = generateId();
  const name = readline.question('Enter the purchase name: ');
  const amount = parseFloat(readline.question('Enter the purchase amount: '));

  const purchase = {
    id,
    name,
    amount,
    donation: calculateDonation(amount)
  };

  const purchases = getPurchases();
  purchases.push(purchase);
  savePurchases(purchases);

  console.log('Purchase created successfully!');
}

function getAllPurchases() {
  const purchases = getPurchases();
  displayPurchasesIndex(purchases);
}

function getPurchaseById(purchaseId) {
  const purchases = getPurchases();
  const purchase = purchases.find(p => p.id === purchaseId);

  if (purchase) {
    displayPurchaseDetails(purchase);
  } else {
    console.log('Purchase not found.');
  }
}

function updatePurchase() {
  const purchaseId = readline.question('Enter the purchase ID: ');
  const purchases = getPurchases();
  const purchase = purchases.find(p => p.id === purchaseId);

  if (purchase) {
    const newName = readline.question('Enter the new purchase name: ');
    const newAmount = parseFloat(readline.question('Enter the new purchase amount: '));

    purchase.name = newName;
    purchase.amount = newAmount;
    purchase.donation = calculateDonation(newAmount);

    savePurchases(purchases);
    console.log('Purchase updated successfully!');
  } else {
    console.log('Purchase not found.');
  }
}

function deletePurchase() {
  const purchaseId = readline.question('Enter the purchase ID: ');
  const purchases = getPurchases();
  const index = purchases.findIndex(p => p.id === purchaseId);

  if (index !== -1) {
    purchases.splice(index, 1);
    savePurchases(purchases);
    console.log('Purchase deleted successfully!');
  } else {
    console.log('Purchase not found.');
  }
}

function calculateTotalDonation() {
  const purchases = getPurchases();
  const totalDonation = purchases.reduce((total, purchase) => total + purchase.donation, 0);

  displayTotalDonation(totalDonation);
}

// Helper function to generate a unique ID
function generateId() {
  // Implementation of the ID generation logic using nanoid
}

// Helper function to calculate the donation amount
function calculateDonation(amount) {
  // Implementation of the donation calculation logic
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  calculateTotalDonation
};
