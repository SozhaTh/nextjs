import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-4xl font-bold tracking-wider">FashionStore</span>
            <span className="text-sm italic text-gray-300">Estilo para toda ocasión</span>
          </div>
        </Link>

        <ul className="flex gap-6">
          
          <li>
            <Link
              href="/products"
              className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Ver productos
            </Link>
            
          </li>
          <li>
            <Link
              href="/new"
              className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Agregar Producto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
