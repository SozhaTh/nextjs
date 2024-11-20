import ProductCard from "@/components/ProductCard";
import { conn } from '@/libs/mysql';

async function loadProducts() {
  try {
    const products = await conn.query('SELECT * FROM product');
    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    return [];  
  }
}

export const dynamic = 'force-dynamic';

async function ProductsPage() {
  const products = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductsPage;
