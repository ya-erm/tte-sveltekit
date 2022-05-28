import { calculateFills, type FillRawData } from './calculate';

function operation(direction: 'Buy' | 'Sell', quantity: number, price: number): FillRawData {
  return {
    quantity,
    payment: (direction === 'Buy' ? -1 : 1) * quantity * price,
    price,
  };
}

describe('Average price ', () => {
  test('buy in equal proportion (buy 2, buy 2)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Buy', 2, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills.length).toBe(operations.length);
    expect(fills[0].averagePrice).toBe(100);
    expect(fills[1].averagePrice).toBe(110);
  });

  test('buy in different proportions (buy 2, buy 4, buy 1)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Buy', 4, 80),
      operation('Buy', 1, 90),
    ];
    const average = (2 * 100 + 4 * 80 + 1 * 90) / (2 + 4 + 1);
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].averagePrice).toBe(average);
  });

  test('buy and particularly sell (buy 2, sell 1)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 1, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].averagePrice).toBe(100);
  });

  test('buy and sell all (buy 2, sell 2)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 2, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].averagePrice).toBe(null);
  });

  test('cross zero - long (buy 2, sell 4)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 4, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].averagePrice).toBe(120);
  });

  test('cross zero - short (sell 2, buy 4)', () => {
    const operations = [
      // create operations
      operation('Sell', 2, 120),
      operation('Buy', 4, 100),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].averagePrice).toBe(100);
  });
});

describe('Fixed profit or loss', () => {
  test('buy and dont sell (long)', () => {
    const operations = [
      // create operations
      operation('Buy', 1, 50),
      operation('Buy', 2, 55),
      operation('Buy', 5, 45),
    ];
    const fills = calculateFills(operations);
    fills.forEach((fill) => {
      expect(fill.fixedPnL).toBe(null);
    });
  });

  test('sell and dont buy (short)', () => {
    const operations = [
      // create operations
      operation('Sell', 1, 50),
      operation('Sell', 2, 55),
      operation('Sell', 5, 45),
    ];
    const fills = calculateFills(operations);
    fills.forEach((fill) => {
      expect(fill.fixedPnL).toBe(null);
    });
  });

  test('buy and sell all (buy 2, sell 2) with profit', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 2, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].fixedPnL).toBe(40);
  });

  test('buy and sell all (buy 2, sell 2) with loss', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 2, 70),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].fixedPnL).toBe(-60);
  });

  test('cross zero - long (buy 2, sell 4)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 4, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].fixedPnL).toBe(40);
  });

  test('cross zero - short (sell 2, buy 4)', () => {
    const operations = [
      // create operations
      operation('Sell', 2, 120),
      operation('Buy', 4, 100),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].fixedPnL).toBe(40);
  });
});

describe('Current quantity', () => {
  test('buy and dont sell (long)', () => {
    const operations = [
      // create operations
      operation('Buy', 1, 50),
      operation('Buy', 2, 55),
      operation('Buy', 5, 45),
    ];
    const fills = calculateFills(operations);
    expect(fills[0].currentQuantity).toBe(1);
    expect(fills[1].currentQuantity).toBe(3);
    expect(fills[2].currentQuantity).toBe(8);
  });

  test('sell and dont buy (short)', () => {
    const operations = [
      // create operations
      operation('Sell', 1, 50),
      operation('Sell', 2, 55),
      operation('Sell', 5, 45),
    ];
    const fills = calculateFills(operations);
    expect(fills[0].currentQuantity).toBe(-1);
    expect(fills[1].currentQuantity).toBe(-3);
    expect(fills[2].currentQuantity).toBe(-8);
  });

  test('buy and sell all (buy 2, sell 2)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 2, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].currentQuantity).toBe(0);
  });

  test('cross zero - long (buy 2, sell 4)', () => {
    const operations = [
      // create operations
      operation('Buy', 2, 100),
      operation('Sell', 4, 120),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].currentQuantity).toBe(-2);
  });

  test('cross zero - short (sell 2, buy 4)', () => {
    const operations = [
      // create operations
      operation('Sell', 2, 120),
      operation('Buy', 4, 100),
    ];
    const fills = calculateFills(operations);
    expect(fills[fills.length - 1].currentQuantity).toBe(2);
  });
});

test('Complex test (buy, sell, long, short, cross zero)', () => {
  const operations = [
    operation('Buy', 1, 100),
    operation('Sell', 1, 120),

    operation('Buy', 30, 3.5),
    operation('Sell', 10, 4.0),
    operation('Sell', 20, 5.75),

    operation('Buy', 5, 50),
    operation('Sell', 15, 60),
    operation('Buy', 30, 40),
  ];
  const fills = calculateFills(operations);

  expect(fills.length).toBe(operations.length);
  // operation('Buy', 1, 100),
  expect(fills[0].averagePrice).toBe(100);
  expect(fills[0].currentQuantity).toBe(1);
  expect(fills[0].fixedPnL).toBe(null);
  // operation('Sell', 1, 120),
  expect(fills[1].averagePrice).toBe(null);
  expect(fills[1].currentQuantity).toBe(0);
  expect(fills[1].fixedPnL).toBeCloseTo(20);

  // operation('Buy', 30, 3.5),
  expect(fills[2].averagePrice).toBe(3.5);
  expect(fills[2].currentQuantity).toBe(30);
  expect(fills[2].fixedPnL).toBe(null);
  // operation('Sell', 10, 4.0),
  expect(fills[3].averagePrice).toBe(3.5);
  expect(fills[3].currentQuantity).toBe(20);
  expect(fills[3].fixedPnL).toBeCloseTo(0.5 * 10);
  // operation('Sell', 20, 5.75),
  expect(fills[4].averagePrice).toBe(null);
  expect(fills[4].currentQuantity).toBe(0);
  expect(fills[4].fixedPnL).toBeCloseTo((5.75 - 3.5) * 20);

  // operation('Buy', 5, 50),
  expect(fills[5].averagePrice).toBe(50);
  expect(fills[5].currentQuantity).toBe(5);
  expect(fills[5].fixedPnL).toBe(null);
  // operation('Sell', 15, 60),
  expect(fills[6].averagePrice).toBe(60);
  expect(fills[6].currentQuantity).toBe(-10);
  expect(fills[6].fixedPnL).toBeCloseTo(5 * 10);
  //operation('Buy', 30, 40),
  expect(fills[7].averagePrice).toBe(40);
  expect(fills[7].currentQuantity).toBe(20);
  expect(fills[7].fixedPnL).toBeCloseTo(20 * 10);
});
