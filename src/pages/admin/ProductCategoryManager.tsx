
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { categories } from "@/data/categories";
import { allProductsList } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { Category, ProductData } from "@/types/menu";

const ProductCategoryManager = () => {
  const [productsList, setProductsList] = useState<ProductData[]>(allProductsList);
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({ name: "", icon: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const { toast } = useToast();

  // Category management functions
  const handleAddCategory = () => {
    if (newCategory.name.trim() === "" || newCategory.icon.trim() === "") {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...categoryList.map(c => c.id), 0) + 1;
    const category: Category = {
      id: newId,
      name: newCategory.name,
      icon: newCategory.icon,
    };

    setCategoryList([...categoryList, category]);
    setNewCategory({ name: "", icon: "" });
    setIsAddingCategory(false);
    
    toast({
      title: "Succès",
      description: "Catégorie ajoutée avec succès",
    });
  };

  const handleEditCategory = () => {
    if (!editingCategory) return;
    
    if (editingCategory.name.trim() === "" || editingCategory.icon.trim() === "") {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    setCategoryList(categoryList.map(c => 
      c.id === editingCategory.id ? editingCategory : c
    ));
    setEditingCategory(null);
    setIsEditingCategory(false);
    
    toast({
      title: "Succès",
      description: "Catégorie modifiée avec succès",
    });
  };

  const handleDeleteCategory = (id: number) => {
    const productsInCategory = productsList.filter(p => p.categoryId === id).length;
    
    if (productsInCategory > 0) {
      toast({
        title: "Impossible de supprimer",
        description: `Cette catégorie contient ${productsInCategory} produits. Veuillez d'abord modifier ou supprimer ces produits.`,
        variant: "destructive",
      });
      return;
    }
    
    setCategoryList(categoryList.filter(c => c.id !== id));
    
    toast({
      title: "Succès",
      description: "Catégorie supprimée avec succès",
    });
  };

  // Add category dialog
  const renderAddCategoryDialog = () => (
    <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Catégorie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la catégorie</Label>
            <Input 
              id="name" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icône (nom)</Label>
            <Input 
              id="icon" 
              value={newCategory.icon} 
              onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
            />
            <p className="text-sm text-muted-foreground">
              Entrez le nom de l'icône (ex: Beef, Pizza, Coffee...)
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddCategory}>Ajouter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Edit category dialog
  const renderEditCategoryDialog = () => (
    <Dialog open={isEditingCategory} onOpenChange={setIsEditingCategory}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la catégorie</DialogTitle>
        </DialogHeader>
        {editingCategory && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nom de la catégorie</Label>
              <Input 
                id="edit-name" 
                value={editingCategory.name} 
                onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icône (nom)</Label>
              <Input 
                id="edit-icon" 
                value={editingCategory.icon} 
                onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Entrez le nom de l'icône (ex: Beef, Pizza, Coffee...)
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditingCategory(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditCategory}>Enregistrer</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Produits et Catégories</h1>
        
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Liste des Produits</CardTitle>
                  <Button onClick={() => window.location.href = "/admin/products"}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau Produit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productsList.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.categoryName}</TableCell>
                        <TableCell>{product.price.toFixed(2)} DH</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50">
                            <Trash className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Liste des Catégories</CardTitle>
                  {renderAddCategoryDialog()}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Icône</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryList.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.icon}</TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingCategory(category);
                              setIsEditingCategory(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {renderEditCategoryDialog()}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProductCategoryManager;
