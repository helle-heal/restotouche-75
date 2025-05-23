
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

// Définition des couleurs pour chaque catégorie
const getCategoryColor = (categoryId: number): { bg: string, hover: string } => {
  switch (categoryId) {
    case 1:
      return { bg: "bg-[#9b87f5]", hover: "hover:bg-[#7E69AB]" }; // Purple
    case 2:
      return { bg: "bg-[#F97316]", hover: "hover:bg-orange-600" }; // Orange
    case 3:
      return { bg: "bg-[#0EA5E9]", hover: "hover:bg-sky-600" }; // Blue
    case 4:
      return { bg: "bg-[#D946EF]", hover: "hover:bg-fuchsia-600" }; // Pink
    case 5:
      return { bg: "bg-[#22C55E]", hover: "hover:bg-green-600" }; // Green
    case 6:
      return { bg: "bg-[#EAB308]", hover: "hover:bg-yellow-600" }; // Yellow
    default:
      return { bg: "bg-secondary", hover: "hover:bg-secondary/80" }; // Default
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
            const colorStyle = isSelected ? getCategoryColor(category.id) : { bg: "bg-secondary", hover: "hover:bg-secondary/80" };
            
            return (
              <Badge
                key={category.id}
                className={`cursor-pointer flex items-center justify-start p-2 text-black transition-colors
                  ${colorStyle.bg} ${colorStyle.hover}`}
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
