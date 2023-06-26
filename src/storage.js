const fs = require('fs');

const dataFilePath = 'purchases.json';

function getPurchases() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function savePurchases(purchases) {
  fs.writeFileSync(dataFilePath, JSON.stringify(purchases, null, 2), 'utf8');
}

module.exports = {
  getPurchases,
  savePurchases
};
