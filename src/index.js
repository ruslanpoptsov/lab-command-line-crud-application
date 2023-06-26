const readline = require('readline-sync');
const { displayMenu } = require('./view');
const { createPurchase, getAllPurchases, getPurchaseById, updatePurchase, deletePurchase, calculateTotalDonation } = require('./purchase');

function main() {
  let exit = false;
  
  while (!exit) {
    displayMenu();
    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        createPurchase();
        break;
      case '2':
        getAllPurchases();
        break;
      case '3':
        const purchaseId = readline.question('Enter the purchase ID: ');
        getPurchaseById(purchaseId);
        break;
      case '4':
        updatePurchase();
        break;
      case '5':
        deletePurchase();
        break;
      case '6':
        calculateTotalDonation();
        break;
      case '7':
        exit = true;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

main();
