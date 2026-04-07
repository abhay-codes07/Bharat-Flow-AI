export interface TransactionItem {
  name: string;
  price: number;
}

export interface Transaction {
  vendorName: string;
  date: string;
  items: TransactionItem[];
  gstAmount: number;
  totalAmount: number;
}
