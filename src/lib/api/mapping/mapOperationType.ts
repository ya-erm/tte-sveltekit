import type { V1OperationType } from '$lib/api';
import { OperationType } from '$lib/model';

export function mapOperationType(type: V1OperationType | undefined): OperationType {
  switch (type) {
    case 'OPERATION_TYPE_BUY':
    case 'OPERATION_TYPE_BUY_CARD':
      return OperationType.Buy;
    case 'OPERATION_TYPE_SELL':
    case 'OPERATION_TYPE_SELL_CARD':
      return OperationType.Sell;
    case 'OPERATION_TYPE_ACCRUING_VARMARGIN':
    case 'OPERATION_TYPE_WRITING_OFF_VARMARGIN':
      return OperationType.VarMargin;
    case 'OPERATION_TYPE_BROKER_FEE':
      return OperationType.Commission;
    case 'OPERATION_TYPE_SERVICE_FEE':
      return OperationType.ServiceCommission;
    case 'OPERATION_TYPE_MARGIN_FEE':
      return OperationType.MarginCommission;
    default:
      return OperationType.Other;
  }
}
