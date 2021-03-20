import { Car } from './car';
import { Image } from 'src/app/models/image/image';
export interface CarDetailAndImagesDto {
  car: Car;
  carImages: Image[];
}
