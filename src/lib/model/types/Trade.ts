export type Trade = {
  /** Идентификатор сделки */
  id: string;
  /** Дата и время исполнения сделки в ISO8601 */
  date: string;
  /** Количество */
  quantity: number;
  /** Цена */
  price: number;
};
