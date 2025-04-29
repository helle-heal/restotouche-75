import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { ProductData } from "@/types/menu";
import { useToast } from "@/components/ui/use-toast";
import { allProductsList } from "@/data/products";

const AdminProducts = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState<ProductData[]>(allProductsList);

  useEffect(() => {
    // Extract product ID from URL query params
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('id');
    
    if (productId) {
      const product = productsList.find(p => p.id === parseInt(productId));
      if (product) {
        setEditingProduct(product);
        setIsEditing(true);
      } else {
        toast({
          title: "Produit non trouvé",
          description: "Le produit que vous essayez de modifier n'existe pas.",
          variant: "destructive",
        });
        navigate("/admin/product-category");
      }
    }
  }, [location.search, productsList, toast, navigate]);

  const handleSubmit = (product: ProductData) => {
    if (isEditing && editingProduct) {
      // Update existing product
      const updatedProducts = productsList.map(p => 
        p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p
      );
      setProductsList(updatedProducts);
      
      // Update allProductsList as well to keep data in sync
      const categoryName = categories.find(c => c.id === product.categoryId)?.name || '';
      localStorage.setItem('productsList', JSON.stringify(updatedProducts));
      
      toast({
        title: "Produit mis à jour",
        description: "Le produit a été mis à jour avec succès.",
      });
      
      navigate("/admin/product-category");
    } else {
      // Add new product
      const newId = Math.max(...productsList.map(p => p.id), 0) + 1;
      const categoryName = categories.find(c => c.id === product.categoryId)?.name || '';
      
      const newProduct = {
        ...product,
        id: newId,
        categoryName,
      };
      
      const updatedProducts = [...productsList, newProduct];
      setProductsList(updatedProducts);
      
      // Update allProductsList as well to keep data in sync
      localStorage.setItem('productsList', JSON.stringify(updatedProducts));
      
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté avec succès.",
      });
      
      navigate("/admin/product-category");
    }
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
