import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";

async function loadProduct(productId) {
  const [data] = await conn.query("SELECT * FROM product WHERE id = ?", [
    productId,
  ]);
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)] bg-gray-100 text-gray-800">
      <div className="flex w-5/6 max-w-4xl h-auto justify-between gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-4xl font-semibold mb-4 text-gray-900">{product.name}</h3>
            <h4 className="text-4xl font-bold text-violet-600 mb-6">S/. {product.price}</h4>
            <div className="space-y-2 text-base">
              <p>
                <span className="font-medium">Tallas:</span> {product.tallas}
              </p>
              <p>
                <span className="font-medium">Colores:</span> {product.color}
              </p>
              <p>
                <span className="font-medium">Material:</span> {product.material}
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-start">
            <Buttons productId={product.id} />
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-white flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm object-contain hover:scale-110 transition-transform duration-500 ease-in-out"
            style={{ background: 'none' }}
          />
        </div>
      </div>
    </section>
  );
}
  
  export default ProductPage;
  