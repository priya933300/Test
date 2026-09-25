export interface ServiceItem {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'electrical' | 'health' | 'cleaning' | 'appliance';
  categoryLabelBn: string;
  categoryLabelEn: string;
  price: number;
  originalPrice?: number;
  etaBn: string;
  etaEn: string;
  rating: number;
  reviewCount: number;
  image: string;
  descriptionBn: string;
  descriptionEn: string;
  featuresBn: string[];
  featuresEn: string[];
}

export interface UserData {
  name: string;
  phone: string;
  age: string;
  address: string;
  lat: number | null;
  lon: number | null;
  mapLink: string;
  selectedService: ServiceItem | null;
  utrNumber?: string;
  paymentConfirmed?: boolean;
}

export interface AppConfig {
  whatsappNumber: string;
  upiId: string;
  merchantName: string;
  businessAddress: string;
  currencySymbol: string;
}

export type Step = 1 | 2 | 3 | 4 | 'receipt';
export type Language = 'bn' | 'en';
