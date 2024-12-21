export interface Package {
  id: string;
  receiver: {
    id: string;
    name: string;
    phone: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  sender: {
    id: string;
    name: string;
    phone: string;
    address: string;
    atitude: string;
    latitude: string;
    longitude: string;
  };
}
