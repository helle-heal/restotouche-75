
export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  categoryName: string;
  popular?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface PaymentInfo {
  method: "cash" | "card";
  cardType?: "visa" | "mastercard" | "amex";
  invoiceNumber: string;
  timestamp: string;
}

