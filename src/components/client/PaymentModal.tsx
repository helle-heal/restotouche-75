
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/components/client/Cart";
import { Cash, CreditCard, FileText, Receipt } from "lucide-react";
import InvoicePreview from "@/components/client/InvoicePreview";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (paymentMethod: string) => void;
  cartItems: CartItem[];
  customerEmail: string | null;
}

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentComplete,
  cartItems,
  customerEmail,
}: PaymentModalProps) => {
  const [paymentTab, setPaymentTab] = useState<string>("cash");
  const [selectedCard, setSelectedCard] = useState<string>("visa");
  const [showInvoice, setShowInvoice] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Calculer le total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentSubmit = () => {
    setProcessingPayment(true);
    
    // Simuler le traitement du paiement
    setTimeout(() => {
      setProcessingPayment(false);
      setShowInvoice(true);
    }, 1500);
  };

  const handleConfirmInvoice = () => {
    onPaymentComplete(paymentTab);
    setShowInvoice(false);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {!showInvoice ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Paiement de votre commande
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="cash" className="w-full" value={paymentTab} onValueChange={setPaymentTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="cash" className="flex items-center gap-2">
                  <Cash className="h-4 w-4" />
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
                      1. Appuyez sur "Payer" ci-dessous.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2. Un employé viendra encaisser votre paiement.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      3. Vous recevrez votre reçu et votre commande.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total à payer:</span>
                      <span className="text-lg font-bold">{totalAmount.toFixed(2)} DH</span>
                    </div>
                    {customerEmail && (
                      <p className="text-sm text-muted-foreground">
                        Une facture sera envoyée à: {customerEmail}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="card">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-2">Choisissez votre carte:</p>
                    <RadioGroup 
                      value={selectedCard} 
                      onValueChange={setSelectedCard}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visa" id="visa" />
                        <Label htmlFor="visa">Visa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mastercard" id="mastercard" />
                        <Label htmlFor="mastercard">Mastercard</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="amex" id="amex" />
                        <Label htmlFor="amex">American Express</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold mb-2">Instructions:</p>
                    <p className="text-sm text-muted-foreground">
                      1. Appuyez sur "Payer" ci-dessous.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2. Insérez votre carte dans le terminal.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      3. Suivez les instructions sur le terminal de paiement.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total à payer:</span>
                      <span className="text-lg font-bold">{totalAmount.toFixed(2)} DH</span>
                    </div>
                    {customerEmail && (
                      <p className="text-sm text-muted-foreground">
                        Une facture électronique sera envoyée à: {customerEmail}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                className="btn-primary"
                onClick={handlePaymentSubmit}
                disabled={processingPayment}
              >
                {processingPayment ? "Traitement..." : "Payer"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <InvoicePreview
            items={cartItems}
            totalAmount={totalAmount}
            paymentMethod={paymentTab}
            customerEmail={customerEmail}
            onConfirm={handleConfirmInvoice}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
