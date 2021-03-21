import { CarDetails } from './carDetails';
import { Image } from 'src/app/models/image/image';
export interface CarDetailAndImagesDto {
  car: CarDetails;
  carImages: Image[];
}
