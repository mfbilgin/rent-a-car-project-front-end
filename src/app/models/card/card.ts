export interface Card {
  savedDebitCardId: number;
  userId: number;
  cardholderName: string;
  cardholderLastName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
}
