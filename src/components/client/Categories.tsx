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

const categoryColors: { [key: number]: string } = {
  1: "bg-[#9b87f5] hover:bg-[#7E69AB]",
  2: "bg-[#F97316] hover:bg-[#ea6506]",
  3: "bg-[#0EA5E9] hover:bg-[#0284c7]",
  4: "bg-[#D946EF] hover:bg-[#c026d3]",
  5: "bg-[#8B5CF6] hover:bg-[#7c3aed]"
};

const Categories = ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3">Catégories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <Badge
                key={category.id}
                className={`cursor-pointer flex items-center justify-start p-2 text-black
                  ${selectedCategory === category.id 
                    ? "bg-secondary/80 hover:bg-secondary/60" 
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
