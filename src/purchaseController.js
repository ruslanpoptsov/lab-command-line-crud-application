const { nanoid } = require("nanoid");
const chalk = require("chalk");
const { readJSONFile, writeJSONFile } = require("./helpers");

const PURCHASES_FILE = "data/purchases.json";

function create(name, amount) {
  const purchase = {
    id: nanoid(),
    name,
    amount,
    donation: calculateDonation(amount),
  };

  const purchases = readJSONFile(PURCHASES_FILE);
  purchases.push(purchase);
  writeJSONFile(PURCHASES_FILE, purchases);

  return purchase;
}

function index() {
  const purchases = readJSONFile(PURCHASES_FILE);
  return purchases.map((purchase) => `${purchase.id} - ${purchase.name}`);
}

function show(id) {
  const purchases = readJSONFile(PURCHASES_FILE);
  const purchase = purchases.find((purchase) => purchase.id === id);

  if (purchase) {
    const { name, amount, donation } = purchase;
    return `${chalk.bold("Name:")} ${name}\n${chalk.bold("Amount:")} $${amount.toFixed(
      2
    )}\n${chalk.bold("Donation:")} $${donation.toFixed(2)}`;
  } else {
    return "Purchase not found.";
  }
}

function update(id, name, amount) {
  const purchases = readJSONFile(PURCHASES_FILE);
  const purchase = purchases.find((purchase) => purchase.id === id);

  if (purchase) {
    purchase.name = name;
    purchase.amount = amount;
    purchase.donation = calculateDonation(amount);

    writeJSONFile(PURCHASES_FILE, purchases);
    return purchase;
  } else {
    return null;
  }
}

function destroy(id) {
  const purchases = readJSONFile(PURCHASES_FILE);
  const index = purchases.findIndex((purchase) => purchase.id === id);

  if (index > -1) {
    const deletedPurchase = purchases.splice(index, 1)[0];
    writeJSONFile(PURCHASES_FILE, purchases);
    return deletedPurchase;
  } else {
    return null;
  }
}

function calculateDonation(amount) {
  const roundedAmount = Math.ceil(amount);
  return roundedAmount - amount;
}

function calculateTotalDonation() {
  const purchases = readJSONFile(PURCHASES_FILE);
  const totalDonation = purchases.reduce((total, purchase) => total + purchase.donation, 0);
  return totalDonation;
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
  calculateTotalDonation,
};
