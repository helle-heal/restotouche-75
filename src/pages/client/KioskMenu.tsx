import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmailForm from "@/components/client/EmailForm";
import Categories from "@/components/client/Categories";
import FeaturedProducts from "@/components/client/FeaturedProducts";
import Cart, { CartItem } from "@/components/client/Cart";
import QRCode from "@/components/client/QRCode";
import Logo from "@/components/layout/Logo";
import { ArrowLeft, Menu } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { allProductsList } from "@/data/menuData";

const KioskMenu = () => {
  const [emailFormCompleted, setEmailFormCompleted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<number[]>([]);

  const handleEmailSubmit = (email: string | null) => {
    setEmail(email);
    setEmailFormCompleted(true);
  };

  const handleSkipEmail = () => {
    setEmail(null);
    setEmailFormCompleted(true);
  };

  const handleAddToCart = (productId: number) => {
    // Simuler l'ajout au panier
    // Dans une application réelle, on récupérerait les détails du produit depuis une API
    const sampleProducts = [
      { id: 1, name: "Burger Classic", price: 8.5 },
      { id: 2, name: "Pizza Margherita", price: 9.0 },
      { id: 3, name: "Salade César", price: 7.5 },
    ];

    const product = sampleProducts.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    toast.success(`${product.name} ajouté au panier`);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Filtrer les produits en fonction de la catégorie
    const filteredIds = allProductsList
      .filter(product => product.categoryId === categoryId)
      .map(product => product.id);
    setFilteredProducts(filteredIds);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    toast.success("Commande confirmée ! Votre ticket est en cours d'impression.");
    setCartItems([]);
  };

  if (!emailFormCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <EmailForm onSubmit={handleEmailSubmit} onSkip={handleSkipEmail} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <Logo size="lg" />
              </div>
              <Categories
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <Categories
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="md:col-span-6 lg:col-span-7 space-y-8">
          <FeaturedProducts 
            onAddToCart={handleAddToCart} 
            categoryId={selectedCategory}
            filteredProducts={filteredProducts}
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Cart
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
          <QRCode />
        </div>
      </main>

      <footer className="bg-white p-4 border-t text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          {email && <p>{email}</p>}
          <p>©2025 RestoTouch - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default KioskMenu;
