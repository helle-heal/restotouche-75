
import React, { useState } from "react";
import EmailForm from "@/components/client/EmailForm";
import Categories from "@/components/client/Categories";
import FeaturedProducts from "@/components/client/FeaturedProducts";
import Cart, { CartItem } from "@/components/client/Cart";
import { allProductsList } from "@/data";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import PaymentModal from "@/components/client/PaymentModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";

const MobileMenu = () => {
  const [emailStep, setEmailStep] = useState(true);
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEmailSubmit = (email: string) => {
    setClientEmail(email);
    setEmailStep(false);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product: CartItem) => {
    // Vérifier si le produit avec les mêmes options existe déjà dans le panier
    const existingItemIndex = cartItems.findIndex((item) => item.uniqueId === product.uniqueId);

    if (existingItemIndex !== -1) {
      // Si le produit existe, mettre à jour sa quantité
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
      toast.success(`${product.name} ajouté (${updatedCartItems[existingItemIndex].quantity})`);
    } else {
      // Sinon, ajouter le nouveau produit au panier
      setCartItems([...cartItems, product]);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  const handleQuantityChange = (uniqueId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(uniqueId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (uniqueId: string) => {
    const itemToRemove = cartItems.find((item) => item.uniqueId === uniqueId);
    if (itemToRemove) {
      setCartItems(cartItems.filter((item) => item.uniqueId !== uniqueId));
      toast.info(`${itemToRemove.name} retiré du panier`);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    setShowPaymentModal(false);
    toast.success(`Paiement par ${paymentMethod} effectué avec succès!`);
    setCartItems([]);
  };

  if (emailStep) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <EmailForm onSubmit={handleEmailSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-6">
                <Categories
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </div>
            </SheetContent>
          </Sheet>

          <h2 className="text-xl font-bold">RestoTouch</h2>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="py-6">
                <Cart
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="pt-20 p-4">
        <div className="my-6">
          <FeaturedProducts
            onAddToCart={handleAddToCart}
            categoryId={selectedCategory}
          />
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        cartItems={cartItems}
        customerEmail={clientEmail}
        isMobileMenu={true}
      />
    </div>
  );
};

export default MobileMenu;
