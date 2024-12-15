export interface Sender {
  map(arg0: (item: any, index: any) => any): unknown;
  id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
