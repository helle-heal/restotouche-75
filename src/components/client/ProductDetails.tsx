
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, X } from "lucide-react";
import { ProductData } from "@/types/menu";

interface ProductDetailsProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, options: ProductOptions) => void;
}

interface ProductOptions {
  size: "simple" | "double";
  cheese: string[];
  extras: string[];
  specialInstructions: string;
  quantity: number;
}

const ProductDetails = ({ product, isOpen, onClose, onAddToCart }: ProductDetailsProps) => {
  const [options, setOptions] = useState<ProductOptions>({
    size: "simple",
    cheese: [],
    extras: [],
    specialInstructions: "",
    quantity: 1,
  });

  if (!product) return null;

  const cheeseOptions = [
    { id: "cheddar", label: "Cheddar", price: 10 },
    { id: "emmental", label: "Emmental", price: 10 },
    { id: "bleu", label: "Bleu", price: 15 },
  ];

  const extrasOptions = [
    { id: "bacon", label: "Bacon", price: 15 },
    { id: "egg", label: "Œuf au plat", price: 10 },
    { id: "avocado", label: "Avocat", price: 20 },
  ];

  const calculateTotal = () => {
    let total = product.price;
    if (options.size === "double") total += 30;
    total += options.cheese.length * 10;
    total += options.extras.reduce((sum, extra) => {
      const extraOption = extrasOptions.find(opt => opt.id === extra);
      return sum + (extraOption?.price || 0);
    }, 0);
    return total * options.quantity;
  };

  const handleSubmit = () => {
    onAddToCart(product.id, options);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{product.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="w-full h-48 overflow-hidden rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold">{product.price.toFixed(2)} DH</p>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Taille</Label>
              <RadioGroup
                value={options.size}
                onValueChange={(value: "simple" | "double") => 
                  setOptions({ ...options, size: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="simple" id="simple" />
                  <Label htmlFor="simple">Simple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="double" id="double" />
                  <Label htmlFor="double">Double (+30.00 DH)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Fromage</Label>
              <div className="mt-2 space-y-2">
                {cheeseOptions.map((cheese) => (
                  <div key={cheese.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cheese.id}
                      checked={options.cheese.includes(cheese.id)}
                      onCheckedChange={(checked) => {
                        setOptions({
                          ...options,
                          cheese: checked
                            ? [...options.cheese, cheese.id]
                            : options.cheese.filter((c) => c !== cheese.id),
                        });
                      }}
                    />
                    <Label htmlFor={cheese.id}>
                      {cheese.label} (+{cheese.price.toFixed(2)} DH)
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Extras</Label>
              <div className="mt-2 space-y-2">
                {extrasOptions.map((extra) => (
                  <div key={extra.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={extra.id}
                      checked={options.extras.includes(extra.id)}
                      onCheckedChange={(checked) => {
                        setOptions({
                          ...options,
                          extras: checked
                            ? [...options.extras, extra.id]
                            : options.extras.filter((e) => e !== extra.id),
                        });
                      }}
                    />
                    <Label htmlFor={extra.id}>
                      {extra.label} (+{extra.price.toFixed(2)} DH)
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="instructions">Instructions spéciales</Label>
              <Textarea
                id="instructions"
                placeholder="Ex: Sans oignon, sauce à part..."
                value={options.specialInstructions}
                onChange={(e) =>
                  setOptions({ ...options, specialInstructions: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label>Quantité</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setOptions({
                      ...options,
                      quantity: Math.max(1, options.quantity - 1),
                    })
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{options.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setOptions({ ...options, quantity: options.quantity + 1 })
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Ajouter - {calculateTotal().toFixed(2)} DH
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
