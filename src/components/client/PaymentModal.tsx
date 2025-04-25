
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/components/client/Cart";
import { DollarSign, CreditCard } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import InvoicePreview from "@/components/client/InvoicePreview";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (paymentMethod: string) => void;
  cartItems: CartItem[];
  customerEmail: string | null;
  isMobileMenu?: boolean;
}

interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentComplete,
  cartItems,
  customerEmail,
  isMobileMenu = false,
}: PaymentModalProps) => {
  const [paymentTab, setPaymentTab] = useState<string>("cash");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const form = useForm<CardFormData>({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  });

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentSubmit = async (data?: CardFormData) => {
    setProcessingPayment(true);
    
    try {
      if (paymentTab === "card" && isMobileMenu) {
        // Simulate online payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!data) {
          throw new Error("Données de carte manquantes");
        }
      }

      setProcessingPayment(false);
      setShowInvoice(true);
    } catch (error) {
      setProcessingPayment(false);
      toast.error("Erreur lors du paiement. Veuillez réessayer.");
    }
  };

  const handleConfirmInvoice = () => {
    onPaymentComplete(paymentTab);
    setShowInvoice(false);
  };

  if (!isOpen) return null;

  if (showInvoice) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <InvoicePreview
            items={cartItems}
            totalAmount={totalAmount}
            paymentMethod={paymentTab}
            customerEmail={customerEmail}
            onConfirm={handleConfirmInvoice}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Paiement de votre commande
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="cash" className="w-full" value={paymentTab} onValueChange={setPaymentTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="cash" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Espèces
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Carte
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-2">Instructions:</p>
                <p className="text-sm text-muted-foreground">
                  1. Appuyez sur "Payer" ci-dessous
                </p>
                <p className="text-sm text-muted-foreground">
                  2. Un employé viendra encaisser votre paiement
                </p>
                <p className="text-sm text-muted-foreground">
                  3. Vous recevrez votre reçu et votre commande
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total à payer:</span>
                  <span className="text-lg font-bold">{totalAmount.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="card">
            {isMobileMenu ? (
              <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom sur la carte</FormLabel>
                      <FormControl>
                        <Input placeholder="JEAN DUPONT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total à payer:</span>
                    <span className="text-lg font-bold">{totalAmount.toFixed(2)} DH</span>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold mb-2">Instructions:</p>
                  <p className="text-sm text-muted-foreground">
                    1. Appuyez sur "Payer" ci-dessous
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2. Insérez votre carte dans le terminal
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3. Suivez les instructions sur le terminal de paiement
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total à payer:</span>
                    <span className="text-lg font-bold">{totalAmount.toFixed(2)} DH</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={() => handlePaymentSubmit()}
            disabled={processingPayment}
          >
            {processingPayment ? "Traitement..." : "Payer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
