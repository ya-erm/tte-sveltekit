export type FillRawData = {
  payment: number;
  quantity: number;
  price: number;
  fee?: number | null;
};

export type FillCalculation = {
  averagePrice: number | null;
  currentQuantity: number;
  fixedPnL: number | null;
};

export function calculateFills(operations: FillRawData[]) {
  let currentQuantity = 0;
  let averagePrice: number | null = null;
  let averagePriceCorrected: number | null = null;

  const fills: FillCalculation[] = [];
  for (let i = 0; i < operations.length; i++) {
    const { payment, quantity, price, fee } = operations[i];

    const commission = fee || 0;
    const direction = -Math.sign(payment);
    const cost = direction * price * quantity;
    const costCorrected = cost + commission;

    let sumUp = currentQuantity * (averagePrice || 0) + cost;
    let sumUpCorrected = currentQuantity * (averagePriceCorrected || 0) + costCorrected;

    const nextQuantity = currentQuantity + direction * quantity;

    let fixedPnL = null;

    // Переход через 0
    if ((nextQuantity < 0 && currentQuantity > 0) || (nextQuantity > 0 && currentQuantity < 0)) {
      const proportion = Math.abs(currentQuantity / quantity);

      const partialCostCorrected = costCorrected * proportion;

      fixedPnL =
        Math.sign(currentQuantity) *
        direction *
        (currentQuantity * (averagePriceCorrected || 0) + partialCostCorrected);

      averagePrice = price;
      averagePriceCorrected = (costCorrected * (1 - proportion)) / nextQuantity;

      currentQuantity = nextQuantity;
    } else {
      if (direction * currentQuantity < 0) {
        fixedPnL = direction * quantity * (averagePriceCorrected || 0) - costCorrected;

        currentQuantity = nextQuantity;
      } else {
        currentQuantity = nextQuantity;

        if (currentQuantity != 0) {
          averagePrice = Math.abs(sumUp / currentQuantity);
          averagePriceCorrected = Math.abs(sumUpCorrected / currentQuantity);
        }
      }

      if (currentQuantity == 0) {
        sumUp = 0;
        sumUpCorrected = 0;
        averagePrice = null;
        averagePriceCorrected = null;
      }
    }

    fills.push({
      averagePrice,
      currentQuantity,
      fixedPnL,
    });
  }

  return fills;
}
