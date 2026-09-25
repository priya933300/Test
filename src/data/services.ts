import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'prod-a',
    nameBn: 'Product / Service A - জরুরি ইলেকট্রিক্যাল ও এসি সার্ভিসিং',
    nameEn: 'Product / Service A - Emergency Electrical & AC Servicing',
    category: 'electrical',
    categoryLabelBn: 'ইলেকট্রিক্যাল ও এসি',
    categoryLabelEn: 'Electrical & AC',
    price: 499,
    originalPrice: 799,
    etaBn: '২৫ - ৩৫ মিনিট',
    etaEn: '25 - 35 mins',
    rating: 4.9,
    reviewCount: 148,
    image: '/src/assets/images/service_home_repair_1790347614281.jpg',
    descriptionBn: 'দক্ষ টেকনিশিয়ান দ্বারা ওয়্যারিং, সুইচবোর্ড, ফ্যান ও এসি চেকআপ এবং দ্রুত সমাধান।',
    descriptionEn: 'Expert technician doorstep wiring, AC inspection, switchboard and appliance repair.',
    featuresBn: ['সার্টিফাইড ইলেকট্রিশিয়ান', '৩০ দিনের ওয়ারেন্টি', 'সেফটি ইনস্পেকশন'],
    featuresEn: ['Certified Electrician', '30-Day Warranty', 'Safety Inspection']
  },
  {
    id: 'prod-b',
    nameBn: 'Product / Service B - স্পেশালিস্ট ডক্টর কনসাল্টেশন',
    nameEn: 'Product / Service B - Specialist Doctor Consultation',
    category: 'health',
    categoryLabelBn: 'স্বাস্থ্য ও ডক্টর',
    categoryLabelEn: 'Health & Doctor',
    price: 999,
    originalPrice: 1499,
    etaBn: '১৫ - ২৫ মিনিট',
    etaEn: '15 - 25 mins',
    rating: 4.8,
    reviewCount: 310,
    image: '/src/assets/images/service_doctor_consult_1790347634277.jpg',
    descriptionBn: 'অভিজ্ঞ এমবিবিএস / বিশেষজ্ঞ ডাক্তারের সাথে তাৎক্ষণিক চেম্বার অথবা ভিডিও কল প্রেসক্রিপশন।',
    descriptionEn: 'Instant video/chamber appointment with verified medical specialists & digital prescription.',
    featuresBn: ['ভেরিফাইড ডাক্তার', 'ডিজিটাল প্রেসক্রিপশন', 'ফ্রি ফলো-আপ'],
    featuresEn: ['Verified Specialists', 'Digital Rx', 'Free 7-Day Follow-up']
  },
  {
    id: 'prod-c',
    nameBn: 'Product / Service C - ফুল হোম ডিপ ক্লিনিং ও জীবাণুমুক্তকরণ',
    nameEn: 'Product / Service C - Full Home Deep Cleaning & Sanitization',
    category: 'cleaning',
    categoryLabelBn: 'হোম ক্লিনিং',
    categoryLabelEn: 'Home Cleaning',
    price: 1499,
    originalPrice: 2200,
    etaBn: '৪০ - ৬০ মিনিট',
    etaEn: '40 - 60 mins',
    rating: 4.9,
    reviewCount: 224,
    image: '/src/assets/images/service_cleaning_service_1790347648903.jpg',
    descriptionBn: 'মডার্ন স্টিম ও ভ্যাকুয়াম ইকুইপমেন্ট দিয়ে সম্পূর্ণ ঘর, কিচেন ও বাথরুমের গভীর পরিষ্কার।',
    descriptionEn: 'Comprehensive deep cleaning for kitchen, washroom and living rooms with eco-friendly sanitizers.',
    featuresBn: ['৩ জন পেশাদার কর্মী', 'ইকো-ফ্রেন্ডলি ক্যামিকেল', '১০০% জীবাণুমুক্ত'],
    featuresEn: ['3-Member Crew', 'Eco-Friendly Chemicals', '100% Sanitized']
  },
  {
    id: 'prod-d',
    nameBn: 'Product / Service D - প্রিমিয়াম হোম অ্যাপ্লায়েন্স রিপেয়ার',
    nameEn: 'Product / Service D - Premium Home Appliance & Device Repair',
    category: 'appliance',
    categoryLabelBn: 'অ্যাপ্লায়েন্স মেরামত',
    categoryLabelEn: 'Appliance Repair',
    price: 1999,
    originalPrice: 2800,
    etaBn: '৩০ - ৫০ মিনিট',
    etaEn: '30 - 50 mins',
    rating: 4.7,
    reviewCount: 189,
    image: '/src/assets/images/service_appliance_repair_1790347663214.jpg',
    descriptionBn: 'রেফ্রিজারেটর, ওয়াশিং মেশিন, মাইক্রোওভেন বা টিভি ডায়াগনসিস ও পার্টস রিপ্লেসমেন্ট।',
    descriptionEn: 'Precision troubleshooting and genuine parts repair for refrigerators, washing machines and microwave ovens.',
    featuresBn: ['অরিজিনাল স্পেয়ার পার্টস', '৯০ দিনের গ্যারান্টি', 'অন-স্পট ফিক্স'],
    featuresEn: ['Genuine Spare Parts', '90-Day Guarantee', 'On-spot Fix']
  }
];

export const DEFAULT_CONFIG = {
  whatsappNumber: '919876543210',
  upiId: 'yourname@paytm',
  merchantName: 'QuickServe Nearby Services',
  businessAddress: 'Kolkata, West Bengal / Dhaka',
  currencySymbol: '₹'
};
