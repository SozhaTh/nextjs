import Link from "next/link";
function ProductCard({ product }) {
  return (
    <Link
      className="bg-white rounded-lg border border-gray-300 shadow-lg mb-6  transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 p-2"
      href={`/products/${product.id}`}
    >
       <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
        {product.image && (
          <img
            src={product.image}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
            alt={product.name}
          />
        )}
      </div>

      <div className="p-6 space-y-3">
        <h1 className="text-xl font-semibold text-gray-800">{product.name}</h1>
        <h2 className="text-2xl text-pink-600 font-bold">S/. {product.price}</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Tallas:</strong> {product.tallas}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Material:</strong> {product.material}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
