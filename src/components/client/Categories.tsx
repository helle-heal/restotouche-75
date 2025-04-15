
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beef, Pizza, Salad, Coffee, IceCream, Wine } from "lucide-react";

// Catégories fictives
const categories = [
  { id: 1, name: "Burgers", icon: Beef },
  { id: 2, name: "Pizzas", icon: Pizza },
  { id: 3, name: "Salades", icon: Salad },
  { id: 4, name: "Desserts", icon: IceCream },
  { id: 5, name: "Boissons", icon: Coffee },
  { id: 6, name: "Alcools", icon: Wine },
];

interface CategoriesProps {
  onCategorySelect: (categoryId: number) => void;
  selectedCategory: number | null;
}

const Categories = ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3">Catégories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Badge
                key={category.id}
                className={`cursor-pointer flex items-center justify-start p-2 hover:bg-resto-orange/80 ${
                  selectedCategory === category.id
                    ? "bg-resto-orange"
                    : "bg-secondary"
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                <Icon size={16} className="mr-2" />
                {category.name}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;
