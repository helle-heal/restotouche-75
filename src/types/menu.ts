
export interface Category {
  id: number;
  name: string;
  icon: string;
}

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
