const fs = require("fs");
const { create, destroy, update, show, calculateTotalDonation } = require("../src/purchaseController");

const TEST_FILE = "data/test_purchases.json";

beforeEach(() => {
  fs.copyFileSync("data/purchases.json", TEST_FILE);
});

afterEach(() => {
  fs.unlinkSync(TEST_FILE);
});

test("create - should create a new purchase", () => {
  const newPurchase = create("New Item", 25.99);
  const testPurchases = JSON.parse(fs.readFileSync(TEST_FILE));

  expect(newPurchase).toEqual({
    id: expect.any(String),
    name: "New Item",
    amount: 25.99,
    donation: 0.01,
  });

  expect(testPurchases.length).toBe(3);
  expect(testPurchases[2]).toEqual(newPurchase);
});

test("destroy - should delete an existing purchase", () => {
  const deletedPurchase = destroy("purchase1");
  const testPurchases = JSON.parse(fs.readFileSync(TEST_FILE));

  expect(deletedPurchase).toEqual({
    id: "purchase1",
    name: "Item 1",
    amount: 10.99,
    donation: 0.01,
  });

  expect(testPurchases.length).toBe(1);
  expect(testPurchases.find((purchase) => purchase.id === "purchase1")).toBeUndefined();
});

test("destroy - should return null if purchase not found", () => {
  const deletedPurchase = destroy("invalidId");
  const testPurchases = JSON.parse(fs.readFileSync(TEST_FILE));

  expect(deletedPurchase).toBeNull();
  expect(testPurchases.length).toBe(2);
});

test("update - should update an existing purchase", () => {
  const updatedPurchase = update("purchase1", "Updated Item", 30.99);
  const testPurchases = JSON.parse(fs.readFileSync(TEST_FILE));

  expect(updatedPurchase).toEqual({
    id: "purchase1",
    name: "Updated Item",
    amount: 30.99,
    donation: 0.01,
  });

  expect(testPurchases.length).toBe(2);
  expect(testPurchases.find((purchase) => purchase.id === "purchase1")).toEqual(updatedPurchase);
});

test("update - should return null if purchase not found", () => {
  const updatedPurchase = update("invalidId", "Updated Item", 30.99);
  const testPurchases = JSON.parse(fs.readFileSync(TEST_FILE));

  expect(updatedPurchase).toBeNull();
  expect(testPurchases.length).toBe(2);
});

test("show - should return purchase details for an existing purchase", () => {
  const purchaseDetails = show("purchase1");

  expect(purchaseDetails).toBe(
    "Name: Item 1\nAmount: $10.99\nDonation: $0.01"
  );
});

test("show - should return 'Purchase not found.' for non-existing purchase", () => {
  const purchaseDetails = show("invalidId");

  expect(purchaseDetails).toBe("Purchase not found.");
});

test("calculateTotalDonation - should return the correct total donation amount", () => {
  const totalDonation = calculateTotalDonation();

  expect(totalDonation).toBe(0.52);
});
