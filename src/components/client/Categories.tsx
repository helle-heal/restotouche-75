import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beef, Pizza, Salad, Coffee, IceCream, Wine } from "lucide-react";
import { categories } from "@/data";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Beef":
      return Beef;
    case "Pizza":
      return Pizza;
    case "Salad":
      return Salad;
    case "Coffee":
      return Coffee;
    case "IceCream":
      return IceCream;
    case "Wine":
      return Wine;
    default:
      return Coffee;
  }
};

interface CategoriesProps {
  onCategorySelect: (categoryId: number) => void;
  selectedCategory: number | null;
}

const Categories = ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3 text-black">Catégories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            const isSelected = selectedCategory === category.id;
            return (
              <Badge
                key={category.id}
                className={`cursor-pointer flex items-center justify-start p-2 text-black transition-colors
                  ${isSelected 
                    ? "bg-[#9b87f5] hover:bg-[#7E69AB]" 
                    : "bg-secondary hover:bg-secondary/80"}`}
                onClick={() => onCategorySelect(category.id)}
              >
                <IconComponent size={16} className="mr-2" />
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
