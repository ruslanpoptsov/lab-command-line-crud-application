const chalk = require('chalk');

function renderIndex(purchases) {
  console.log(chalk.bold('Purchases:'));
  purchases.forEach((purchase) => {
    console.log(`${purchase.id}: ${purchase.name}`);
  });
  console.log();
}

function renderShow(purchase) {
  console.log(chalk.bold('Purchase Details:'));
  console.log(`ID: ${purchase.id}`);
  console.log(`Name: ${purchase.name}`);
  console.log(`Amount: $${purchase.amount}`);
  console.log(`Donation: $${purchase.donation}`);
  console.log();
}

module.exports = {
  renderIndex,
  renderShow,
};