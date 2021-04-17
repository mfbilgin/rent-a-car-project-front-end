export interface DebitCard {
  debitCardId?: number;
  cardholderName: string;
  cardholderLastName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
  balance?: Number;
}
