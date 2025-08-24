export interface Service {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
}

export interface Provider {
  id: string;
  name: string;
  nameAr: string;
  service: string;
  serviceAr: string;
  governorate: string;
  governorateAr: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  verified: boolean;
  online: boolean;
  description: string;
  descriptionAr: string;
}

export interface Governorate {
  id: string;
  name: string;
  nameAr: string;
  x: number;
  y: number;
  providers: number;
}