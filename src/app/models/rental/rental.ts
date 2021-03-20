export interface Rental {
  rentalId?: number;
  carId: number;
  customerId: number;
  userId: number;
  rentDate: Date;
  returnDate: Date;
}
