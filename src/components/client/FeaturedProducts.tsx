
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { allProductsList, popularProducts } from "@/data";
import { ProductData } from "@/types/menu";
import ProductDetails from "./ProductDetails";
import { CartItem } from "./Cart";

interface ProductOptions {
  size: "simple" | "double";
  cheese: string[];
  extras: string[];
  specialInstructions: string;
  quantity: number;
}

interface FeaturedProductsProps {
  onAddToCart: (product: CartItem) => void;
  categoryId?: number | null;
  filteredProducts?: number[];
}

const FeaturedProducts = ({ onAddToCart, categoryId, filteredProducts }: FeaturedProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const productsToDisplay = () => {
    if (categoryId && filteredProducts && filteredProducts.length > 0) {
      return allProductsList.filter(product => filteredProducts.includes(product.id));
    } else if (categoryId) {
      return allProductsList.filter(product => product.categoryId === categoryId);
    } else {
      return popularProducts;
    }
  };

  const displayedProducts = productsToDisplay();
  const title = categoryId 
    ? allProductsList.find(p => p.categoryId === categoryId)?.categoryName || "Produits" 
    : "Recommandations";

  // Fonction pour créer un identifiant unique basé sur le produit et ses options
  const createUniqueId = (productId: number, options: ProductOptions) => {
    const optionsString = JSON.stringify({
      size: options.size,
      cheese: options.cheese.sort(),
      extras: options.extras.sort(),
      specialInstructions: options.specialInstructions
    });
    
    return `${productId}-${optionsString}`;
  };

  const handleAddToCart = (productId: number, options: ProductOptions) => {
    const product = allProductsList.find(p => p.id === productId);
    if (!product) return;

    // Calculer le prix total avec les options
    let totalPrice = product.price;
    
    // Ajustement du prix selon la taille
    if (options.size === "double") {
      totalPrice += 30;
    }
    
    // Ajout du prix des fromages (10 DH par fromage)
    totalPrice += options.cheese.length * 10;
    
    // Ajout du prix des extras
    options.extras.forEach(extra => {
      switch (extra) {
        case "bacon":
          totalPrice += 15;
          break;
        case "egg":
          totalPrice += 10;
          break;
        case "avocado":
          totalPrice += 20;
          break;
      }
    });

    // Créer un identifiant unique
    const uniqueId = createUniqueId(productId, options);

    // Créer l'objet du produit à ajouter au panier
    const cartItem: CartItem = {
      id: productId,
      name: product.name,
      price: totalPrice,
      quantity: options.quantity,
      options: {
        size: options.size,
        cheese: options.cheese,
        extras: options.extras,
        specialInstructions: options.specialInstructions
      },
      uniqueId: uniqueId
    };

    // Ajouter au panier avec les options
    onAddToCart(cartItem);
  };

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
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ProductDetails
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default FeaturedProducts;
