const { nanoid } = require('nanoid');

const { round } = require('lodash');

let purchases = [];

function createPurchase(name, amount) {
  const id = nanoid();
  const donation = round(amount, 2);
  const purchase = { id, name, amount, donation };
  purchases.push(purchase);
  return purchase;
}

function getPurchases() {
  return purchases;
}

function getPurchaseById(id) {
  return purchases.find(purchase => purchase.id === id);
}

function updatePurchase(id, name, amount) {
  const purchase = getPurchaseById(id);
  if (purchase) {
    purchase.name = name;
    purchase.amount = amount;
    purchase.donation = round(amount, 2);
    return purchase;
  }
  return null;
}

function deletePurchase(id) {
  const index = purchases.findIndex(purchase => purchase.id === id);
  if (index !== -1) {
    return purchases.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};
