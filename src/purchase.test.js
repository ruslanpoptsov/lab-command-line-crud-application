const { createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase } = require('./purchase');

describe('Purchase Functions', () => {
  let samplePurchase;

  beforeEach(() => {
    samplePurchase = createPurchase('Mechanical Pencil', 4.44);
  });

  afterEach(() => {
    samplePurchase = null;
  });

  test('createPurchase should create a new purchase object', () => {
    expect(samplePurchase).toMatchObject({
      name: 'Mechanical Pencil',
      amount: '4.44',
      donation: '4.44',
    });
  });

  test('getPurchases should return an array of purchases', () => {
    const purchases = getPurchases();
    expect(Array.isArray(purchases)).toBe(true);
    expect(purchases.length).toBe(1);
    expect(purchases[0]).toMatchObject(samplePurchase);
  });

  test('getPurchaseById should return the purchase with the given id', () => {
    const foundPurchase = getPurchaseById(samplePurchase.id);
    expect(foundPurchase).toMatchObject(samplePurchase);
  });

  test('updatePurchase should update the name and amount of the purchase', () => {
    const updatedPurchase = updatePurchase(samplePurchase.id, 'Updated Pencil', 5.99);
    expect(updatedPurchase).toMatchObject({
      id: samplePurchase.id,
      name: 'Updated Pencil',
      amount: '5.99',
      donation: '5.99',
    });
    expect(getPurchases().length).toBe(1);
  });

  test('deletePurchase should delete the purchase with the given id', () => {
    const deletedPurchase = deletePurchase(samplePurchase.id);
    expect(deletedPurchase).toMatchObject(samplePurchase);
    expect(getPurchases().length).toBe(0);
  });
});