
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";

// Produits recommandés fictifs
const featuredProducts = [
  {
    id: 1,
    name: "Burger Classic",
    description: "Steak haché, salade, tomate, oignon, sauce maison",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200",
    category: "Burgers",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    description: "Sauce tomate, mozzarella, basilic frais",
    price: 9.0,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&h=200",
    category: "Pizzas",
  },
  {
    id: 3,
    name: "Salade César",
    description: "Laitue romaine, croûtons, parmesan, sauce césar",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=200",
    category: "Salades",
  },
];

interface FeaturedProductsProps {
  onAddToCart: (productId: number) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold">Recommandations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="card-hover overflow-hidden">
            <div className="w-full h-40 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <span className="font-bold text-resto-orange">
                  {product.price.toFixed(2)} €
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => onAddToCart(product.id)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter au panier
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
