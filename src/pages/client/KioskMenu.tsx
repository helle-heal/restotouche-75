
import React, { useState } from "react";
import EmailForm from "@/components/client/EmailForm";
import Categories from "@/components/client/Categories";
import FeaturedProducts from "@/components/client/FeaturedProducts";
import Cart, { CartItem } from "@/components/client/Cart";
import { allProductsList } from "@/data";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import QRCode from "@/components/client/QRCode";
import PaymentModal from "@/components/client/PaymentModal";
import { QrCode } from "lucide-react";
import Logo from "@/components/layout/Logo";

const KioskMenu = () => {
  const [emailStep, setEmailStep] = useState(true);
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleEmailSubmit = (email: string) => {
    setClientEmail(email);
    setEmailStep(false);
  };

  const handleEmailSkip = () => {
    setEmailStep(false);
    setClientEmail(null);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (productId: number) => {
    const product = allProductsList.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`${product.name} ajouté (${existingItem.quantity + 1})`);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      setCartItems(cartItems.filter((item) => item.id !== id));
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
        <EmailForm 
          onSubmit={handleEmailSubmit} 
          onSkip={handleEmailSkip}
          showSkipButton={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec logo et bouton QR */}
      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowQRCode(true)}
            className="rounded-full"
            aria-label="Afficher le code QR"
          >
            <QrCode className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="text-xl font-bold mb-2">Bienvenue</h2>
              {clientEmail ? (
                <p className="text-sm text-muted-foreground">
                  Email: {clientEmail}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Commande sans email
                </p>
              )}
              <Button 
                variant="outline" 
                className="mt-2 w-full" 
                onClick={() => setEmailStep(true)}
              >
                Modifier
              </Button>
            </div>
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            <Cart
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>

          <div className="lg:col-span-3">
            <FeaturedProducts
              onAddToCart={handleAddToCart}
              categoryId={selectedCategory}
            />
          </div>
        </div>
      </div>

      <QRCode 
        isOpen={showQRCode} 
        onClose={() => setShowQRCode(false)}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        cartItems={cartItems}
        customerEmail={clientEmail}
      />
    </div>
  );
};

export default KioskMenu;
