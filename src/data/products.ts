import { ProductData } from "@/types/menu";

export const allProductsList: ProductData[] = [
  // Burgers
  {
    id: 1,
    name: "Burger Classic",
    description: "Steak haché, salade, tomate, oignon, sauce maison",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200",
    categoryId: 1,
    categoryName: "Burgers",
    popular: true
  },
  {
    id: 2,
    name: "Cheeseburger Deluxe",
    description: "Double steak, double cheddar, bacon, oignons caramélisés",
    price: 10.5,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=300&h=200",
    categoryId: 1,
    categoryName: "Burgers"
  },
  {
    id: 3,
    name: "Burger Végétarien",
    description: "Steak de légumes, avocat, roquette, sauce tahini",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&h=200",
    categoryId: 1,
    categoryName: "Burgers"
  },
  
  // Pizzas
  {
    id: 4,
    name: "Pizza Margherita",
    description: "Sauce tomate, mozzarella, basilic frais",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&h=200",
    categoryId: 2,
    categoryName: "Pizzas",
    popular: true
  },
  {
    id: 5,
    name: "Pizza Quatre Fromages",
    description: "Mozzarella, gorgonzola, parmesan, chèvre",
    price: 11.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&h=200",
    categoryId: 2,
    categoryName: "Pizzas"
  },
  {
    id: 6,
    name: "Pizza Pepperoni",
    description: "Sauce tomate, mozzarella, pepperoni, origan",
    price: 10.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&h=200",
    categoryId: 2,
    categoryName: "Pizzas"
  },
  
  // Salades
  {
    id: 7,
    name: "Salade César",
    description: "Laitue romaine, croûtons, parmesan, sauce césar",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=200",
    categoryId: 3,
    categoryName: "Salades",
    popular: true
  },
  {
    id: 8,
    name: "Salade Grecque",
    description: "Tomate, concombre, poivron, olive, feta, oignon rouge",
    price: 8.0,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&h=200",
    categoryId: 3,
    categoryName: "Salades"
  },
  {
    id: 9,
    name: "Salade de Quinoa",
    description: "Quinoa, avocat, mangue, légumes croquants, vinaigrette légère",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=300&h=200",
    categoryId: 3,
    categoryName: "Salades"
  },
  
  // Desserts
  {
    id: 10,
    name: "Tiramisu",
    description: "Mascarpone, café, cacao, biscuits",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&h=200",
    categoryId: 4,
    categoryName: "Desserts",
    popular: true
  },
  {
    id: 11,
    name: "Brownie Chocolat",
    description: "Brownie au chocolat noir, noix, boule de glace vanille",
    price: 6.0,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&h=200",
    categoryId: 4,
    categoryName: "Desserts"
  },
  {
    id: 12,
    name: "Crème Brûlée",
    description: "Crème à la vanille, caramel croustillant",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=300&h=200",
    categoryId: 4,
    categoryName: "Desserts"
  },
  
  // Boissons
  {
    id: 13,
    name: "Limonade Maison",
    description: "Citron frais, sucre de canne, menthe",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=300&h=200",
    categoryId: 5,
    categoryName: "Boissons",
    popular: true
  },
  {
    id: 14,
    name: "Thé Glacé",
    description: "Thé noir, pêche, citron",
    price: 3.0,
    image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=300&h=200",
    categoryId: 5,
    categoryName: "Boissons"
  },
  {
    id: 15,
    name: "Smoothie Fruits Rouges",
    description: "Fraise, framboise, myrtille, banane, lait d'amande",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=300&h=200",
    categoryId: 5,
    categoryName: "Boissons"
  },
  
  // Alcools
  {
    id: 16,
    name: "Verre de Vin Rouge",
    description: "Cabernet Sauvignon, arômes de fruits noirs",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&h=200",
    categoryId: 6,
    categoryName: "Alcools",
    popular: true
  },
  {
    id: 17,
    name: "Bière Artisanale",
    description: "IPA locale, notes d'agrumes et de houblon",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&h=200",
    categoryId: 6,
    categoryName: "Alcools"
  },
  {
    id: 18,
    name: "Cocktail Mojito",
    description: "Rhum, menthe fraîche, citron vert, sucre de canne",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=300&h=200",
    categoryId: 6,
    categoryName: "Alcools"
  },
];

export const popularProducts = allProductsList.filter(product => product.popular === true);
