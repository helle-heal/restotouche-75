
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { ProductData } from "@/types/menu";
import { useToast } from "@/components/ui/use-toast";

const AdminProducts = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);

  const handleSubmit = (product: any) => {
    toast({
      title: "Produit sauvegardé",
      description: "Le produit a été sauvegardé avec succès.",
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/admin/product-category">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Modifier le produit" : "Ajouter un nouveau produit"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Détails du produit</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm 
              categories={categories} 
              onSubmit={handleSubmit}
              product={editingProduct}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
