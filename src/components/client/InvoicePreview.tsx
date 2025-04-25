
import React from "react";
import { Button } from "@/components/ui/button";
import { Receipt, DollarSign, CreditCard } from "lucide-react";
import { CartItem } from "@/components/client/Cart";
import { DialogTitle, DialogHeader } from "@/components/ui/dialog";

interface InvoicePreviewProps {
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  customerEmail: string | null;
  onConfirm: () => void;
}

const InvoicePreview = ({
  items,
  totalAmount,
  paymentMethod,
  customerEmail,
  onConfirm,
}: InvoicePreviewProps) => {
  // Générer un numéro de facture aléatoire
  const invoiceNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          {paymentMethod === "cash" ? "Reçu" : "Facture"} #{invoiceNumber}
        </DialogTitle>
      </DialogHeader>

      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <div className="font-bold">RestoTouch</div>
          <div className="text-right">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        </div>

        <div>
          {customerEmail && (
            <div className="mb-2">
              <span className="font-semibold">Email client: </span>
              <span>{customerEmail}</span>
            </div>
          )}

          <div className="mb-2">
            <span className="font-semibold">Facture n°: </span>
            <span>F-{invoiceNumber}</span>
          </div>

          <div>
            <span className="font-semibold">Paiement: </span>
            <span className="flex items-center gap-1">
              {paymentMethod === "cash" ? (
                <>
                  <DollarSign className="h-4 w-4" /> Espèces
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" /> Carte bancaire
                </>
              )}
            </span>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-1">Produit</th>
              <th className="py-1 text-center">Qté</th>
              <th className="py-1 text-right">PU</th>
              <th className="py-1 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-1">{item.name}</td>
                <td className="py-1 text-center">{item.quantity}</td>
                <td className="py-1 text-right">{item.price.toFixed(2)} DH</td>
                <td className="py-1 text-right">{(item.price * item.quantity).toFixed(2)} DH</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-right font-semibold py-2">Total:</td>
              <td className="text-right font-bold py-2">{totalAmount.toFixed(2)} DH</td>
            </tr>
          </tfoot>
        </table>

        {paymentMethod === "cash" ? (
          <div className="text-sm text-center text-muted-foreground">
            Merci de votre visite!
          </div>
        ) : (
          <div className="text-sm text-center text-muted-foreground">
            Une facture électronique a été envoyée à votre adresse email.
            <br />
            Merci de votre visite!
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={onConfirm}>
          Confirmer et terminer
        </Button>
      </div>
    </>
  );
};

export default InvoicePreview;
