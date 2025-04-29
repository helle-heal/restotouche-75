
import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductCategoryManager = () => {
  const [productsList, setProductsList] = useState<ProductData[]>(allProductsList);
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({ name: "", icon: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load data from localStorage if available
  useEffect(() => {
    const storedProducts = localStorage.getItem('productsList');
    if (storedProducts) {
      try {
        setProductsList(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Error parsing stored products:", error);
      }
    }

    const storedCategories = localStorage.getItem('categoryList');
    if (storedCategories) {
      try {
        setCategoryList(JSON.parse(storedCategories));
      } catch (error) {
        console.error("Error parsing stored categories:", error);
      }
    }
  }, []);

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

    const updatedCategories = [...categoryList, category];
    setCategoryList(updatedCategories);
    localStorage.setItem('categoryList', JSON.stringify(updatedCategories));
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

    const updatedCategories = categoryList.map(c => 
      c.id === editingCategory.id ? editingCategory : c
    );
    setCategoryList(updatedCategories);
    localStorage.setItem('categoryList', JSON.stringify(updatedCategories));
    
    // Update category name in products
    const updatedProducts = productsList.map(p => {
      if (p.categoryId === editingCategory.id) {
        return {
          ...p,
          categoryName: editingCategory.name
        };
      }
      return p;
    });
    
    setProductsList(updatedProducts);
    localStorage.setItem('productsList', JSON.stringify(updatedProducts));
    
    setEditingCategory(null);
    setIsEditingCategory(false);
    
    toast({
      title: "Succès",
      description: "Catégorie modifiée avec succès",
    });
  };

  const confirmDeleteCategory = (id: number) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete === null) return;
    
    const productsInCategory = productsList.filter(p => p.categoryId === categoryToDelete).length;
    
    if (productsInCategory > 0) {
      toast({
        title: "Impossible de supprimer",
        description: `Cette catégorie contient ${productsInCategory} produits. Veuillez d'abord modifier ou supprimer ces produits.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
      return;
    }
    
    const updatedCategories = categoryList.filter(c => c.id !== categoryToDelete);
    setCategoryList(updatedCategories);
    localStorage.setItem('categoryList', JSON.stringify(updatedCategories));
    
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
    
    toast({
      title: "Succès",
      description: "Catégorie supprimée avec succès",
    });
  };

  // Product management
  const handleEditProduct = (productId: number) => {
    navigate(`/admin/products?id=${productId}`);
  };

  const confirmDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProduct = () => {
    if (productToDelete === null) return;
    
    const updatedProducts = productsList.filter(p => p.id !== productToDelete);
    setProductsList(updatedProducts);
    localStorage.setItem('productsList', JSON.stringify(updatedProducts));
    
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    
    toast({
      title: "Succès",
      description: "Produit supprimé avec succès",
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

  // Delete confirmation dialog
  const renderDeleteDialog = () => (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera définitivement {productToDelete ? 'ce produit' : 'cette catégorie'} 
            de notre base de données.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            setProductToDelete(null);
            setCategoryToDelete(null);
          }}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            if (productToDelete) {
              handleDeleteProduct();
            } else if (categoryToDelete) {
              handleDeleteCategory();
            }
          }}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
                  <Button onClick={() => navigate("/admin/products")}>
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
                    {productsList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Aucun produit trouvé. Ajoutez votre premier produit avec le bouton ci-dessus.
                        </TableCell>
                      </TableRow>
                    ) : (
                      productsList.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{categoryList.find(c => c.id === product.categoryId)?.name || product.categoryName}</TableCell>
                          <TableCell>{product.price.toFixed(2)} DH</TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProduct(product.id)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-50"
                              onClick={() => confirmDeleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
                    {categoryList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          Aucune catégorie trouvée. Ajoutez votre première catégorie avec le bouton ci-dessus.
                        </TableCell>
                      </TableRow>
                    ) : (
                      categoryList.map((category) => (
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
                              onClick={() => confirmDeleteCategory(category.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {renderEditCategoryDialog()}
          </TabsContent>
        </Tabs>
        {renderDeleteDialog()}
      </div>
    </AdminLayout>
  );
};

export default ProductCategoryManager;
