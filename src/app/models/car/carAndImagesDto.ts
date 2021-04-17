import { CarDetail } from './carDetails';
import { Image } from 'src/app/models/image/image';
export interface CarDetailAndImagesDto {
  car: CarDetail;
  carImages: Image[];
}
