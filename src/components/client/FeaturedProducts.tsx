
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { allProductsList, popularProducts, ProductData } from "@/data/menuData";

interface FeaturedProductsProps {
  onAddToCart: (productId: number) => void;
  categoryId?: number | null;
  filteredProducts?: number[];
}

const FeaturedProducts = ({ onAddToCart, categoryId, filteredProducts }: FeaturedProductsProps) => {
  // Déterminer quels produits afficher
  const productsToDisplay = () => {
    if (categoryId && filteredProducts && filteredProducts.length > 0) {
      // Si une catégorie est sélectionnée et des produits sont filtrés
      return allProductsList.filter(product => filteredProducts.includes(product.id));
    } else if (categoryId) {
      // Si une catégorie est sélectionnée, mais pas de filtres spécifiques
      return allProductsList.filter(product => product.categoryId === categoryId);
    } else {
      // Par défaut, afficher les produits populaires
      return popularProducts;
    }
  };

  const displayedProducts = productsToDisplay();
  const title = categoryId 
    ? allProductsList.find(p => p.categoryId === categoryId)?.categoryName || "Produits" 
    : "Recommandations";

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold">{title}</h2>
      {displayedProducts.length === 0 ? (
        <p className="text-muted-foreground">Aucun produit disponible dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => (
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
                    {product.price.toFixed(2)} DH
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
      )}
    </div>
  );
};

export default FeaturedProducts;
