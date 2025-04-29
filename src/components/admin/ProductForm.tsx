
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImagePlus } from "lucide-react";
import { Category, ProductData } from "@/types/menu";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  price: z.string().refine((val) => !isNaN(Number(val)), "Le prix doit être un nombre"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  categoryId: z.string().min(1, "Veuillez sélectionner une catégorie"),
  image: z.any(),
});

interface ProductFormProps {
  categories: Category[];
  onSubmit: (values: any) => void;
  product?: ProductData | null;
}

const ProductForm = ({ categories, onSubmit, product }: ProductFormProps) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price ? String(product.price) : "",
      description: product?.description || "",
      categoryId: product?.categoryId ? String(product.categoryId) : "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: String(product.price),
        description: product.description,
        categoryId: String(product.categoryId),
      });
      setImagePreview(product.image);
    }
  }, [product, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const productData = {
      ...values,
      price: parseFloat(values.price),
      categoryId: parseInt(values.categoryId),
      image: imagePreview || "https://placehold.co/400x300/e2e8f0/1e293b?text=Product+Image",
    };

    onSubmit(productData);
    form.reset();
    setImagePreview(null);
    toast({
      title: "Produit sauvegardé",
      description: "Le produit a été sauvegardé avec succès.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Burger Classic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (DH)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre produit..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Image du produit</Label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="w-32 h-32 rounded-md overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="border-2 border-dashed rounded-lg p-4 w-full">
                    <input
                      type="file"
                      id="product-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="product-image">
                      <Button type="button" variant="outline" className="w-full" asChild>
                        <span>
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Choisir une image
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit">Sauvegarder le produit</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
