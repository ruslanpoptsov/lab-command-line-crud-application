const chalk = require('chalk');

function displayMenu() {
  console.log('=== Purchase Management ===');
  console.log('1. Create a purchase');
  console.log('2. View all purchases');
  console.log('3. View purchase details');
  console.log('4. Update a purchase');
  console.log('5. Delete a purchase');
  console.log('6. Calculate total donation');
  console.log('7. Exit');
}

function displayPurchasesIndex(purchases) {
  console.log('=== Purchases Index ===');
  purchases.forEach(purchase => {
    console.log(chalk.bold(purchase.id), '-', purchase.name);
  });
}

function displayPurchaseDetails(purchase) {
  console.log('=== Purchase Details ===');
  console.log('ID:', chalk.bold(purchase.id));
  console.log('Name:', purchase.name);
  console.log('Amount:', purchase.amount);
  console.log('Donation:', purchase.donation);
}

function displayTotalDonation(totalDonation) {
  console.log('=== Total Donation ===');
  console.log('Total Donation Amount:', totalDonation);
}

module.exports = {
  displayMenu,
  displayPurchasesIndex,
  displayPurchaseDetails,
  displayTotalDonation
};
