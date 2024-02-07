import { ProductProps } from "@/utils/data/products";
import { ProductCardProps } from "../card-store";

export function add(products: ProductCardProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);
  if (existingProduct) {
    return products.map((product) =>
      existingProduct.id === product.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
}
