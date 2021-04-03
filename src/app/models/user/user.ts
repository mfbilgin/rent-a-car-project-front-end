import { Binary } from '@angular/compiler';
import { Byte } from '@angular/compiler/src/util';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  status: boolean;
  findexPoint: number;
}
