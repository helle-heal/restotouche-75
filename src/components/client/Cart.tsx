
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Types pour le panier avec options
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  options?: {
    size?: string;
    cheese?: string[];
    extras?: string[];
    specialInstructions?: string;
  };
  uniqueId?: string; // Identifiant unique pour différencier les produits avec options différentes
}

interface CartProps {
  items: CartItem[];
  onQuantityChange: (uniqueId: string, quantity: number) => void;
  onRemoveItem: (uniqueId: string) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onQuantityChange, onRemoveItem, onCheckout }: CartProps) => {
  // Calculer le total
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fonction pour afficher les options du produit
  const displayOptions = (item: CartItem) => {
    if (!item.options) return null;
    
    const options = [];
    
    if (item.options.size && item.options.size !== "simple") {
      options.push(`Taille: ${item.options.size}`);
    }
    
    if (item.options.cheese && item.options.cheese.length > 0) {
      options.push(`Fromage: ${item.options.cheese.join(', ')}`);
    }
    
    if (item.options.extras && item.options.extras.length > 0) {
      options.push(`Extras: ${item.options.extras.join(', ')}`);
    }
    
    if (item.options.specialInstructions) {
      options.push(`Note: ${item.options.specialInstructions}`);
    }
    
    if (options.length === 0) return null;
    
    return (
      <div className="text-xs text-muted-foreground mt-1">
        {options.map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>
    );
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Mon Panier
        </CardTitle>
        <span className="text-sm text-muted-foreground">
          {items.length} article(s)
        </span>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Votre panier est vide
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.uniqueId} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price.toFixed(2)} €
                  </p>
                  {displayOptions(item)}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onQuantityChange(item.uniqueId || `${item.id}`, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onQuantityChange(item.uniqueId || `${item.id}`, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500"
                    onClick={() => onRemoveItem(item.uniqueId || `${item.id}`)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>{totalAmount.toFixed(2)} €</span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Passer commande
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;
