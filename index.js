const { create, index, show, update, destroy, calculateTotalDonation } = require("./src/purchaseController");

function displayMenu() {
  console.log("\n====== Purchase Tracker ======");
  console.log("1. Create a purchase");
  console.log("2. Show all purchases");
  console.log("3. Show purchase details");
  console.log("4. Update a purchase");
  console.log("5. Delete a purchase");
  console.log("6. Calculate total donation");
  console.log("0. Exit");
  console.log("==============================");
  console.log();
}

function run() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function promptAction() {
    readline.question("Select an option: ", (option) => {
      switch (option) {
        case "0":
          console.log("Goodbye!");
          readline.close();
          break;
        case "1":
          readline.question("Enter the name of the purchase: ", (name) => {
            readline.question("Enter the purchase amount: ", (amount) => {
              const purchase = create(name, parseFloat(amount));
              console.log(`Purchase "${purchase.name}" created with id: ${purchase.id}`);
              promptAction();
            });
          });
          break;
        case "2":
          const purchasesList = index();
          console.log("=== All Purchases ===");
          console.log(purchasesList);
          promptAction();
          break;
        case "3":
          readline.question("Enter the purchase ID: ", (id) => {
            const purchaseDetails = show(id);
            console.log("=== Purchase Details ===");
            console.log(purchaseDetails);
            promptAction();
          });
          break;
        case "4":
          readline.question("Enter the purchase ID to update: ", (id) => {
            readline.question("Enter the new name for the purchase: ", (name) => {
              readline.question("Enter the new purchase amount: ", (amount) => {
                const updatedPurchase = update(id, name, parseFloat(amount));
                if (updatedPurchase) {
                  console.log(`Purchase "${updatedPurchase.name}" updated successfully.`);
                } else {
                  console.log("Purchase not found.");
                }
                promptAction();
              });
            });
          });
          break;
        case "5":
          readline.question("Enter the purchase ID to delete: ", (id) => {
            const deletedPurchase = destroy(id);
            if (deletedPurchase) {
              console.log(`Purchase "${deletedPurchase.name}" deleted successfully.`);
            } else {
              console.log("Purchase not found.");
            }
            promptAction();
          });
          break;
        case "6":
          const totalDonation = calculateTotalDonation();
          console.log("=== Total Donation ===");
          console.log(`$${totalDonation.toFixed(2)}`);
          promptAction();
          break;
        default:
          console.log("Invalid option. Please try again.");
          promptAction();
      }
    });
  }

  displayMenu();
  promptAction();
}

run();
