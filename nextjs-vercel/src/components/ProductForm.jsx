"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    tallas: "",
    color: "",
    material: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          tallas: res.data.tallas,
          color: res.data.color,
          material: res.data.material,
        });
      });
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("tallas", product.tallas);
    formData.append("color", product.color);
    formData.append("material", product.material);

    if (file) {
      formData.append("image", file);
    }

    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b ">
      <form
        className="bg-white shadow-lg rounded-lg px-10 pt-5 pb-10 w-full max-w-lg border-t-4 "
        onSubmit={handleSubmit}
        ref={form}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {params.id ? "Actualizar Producto" : "Agregar Nuevo Producto"}
        </h2>
  
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Nombre del producto:
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre del producto"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:ring-2 focus:outline-none"
          autoFocus
        />
  
        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Precio del producto:
        </label>
        <input
          name="price"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
  
        <label
          htmlFor="tallas"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Tallas del producto:
        </label>
        <input
          name="tallas"
          type="text"
          placeholder="Ejemplo: S, M, L, XL"
          onChange={handleChange}
          value={product.tallas}
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
  
        <label
          htmlFor="color"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Colores disponibles:
        </label>
        <input
          name="color"
          type="text"
          placeholder="Ejemplo: Rojo, Azul, Verde"
          onChange={handleChange}
          value={product.color}
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
  
        <label
          htmlFor="material"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Material del producto:
        </label>
        <input
          name="material"
          type="text"
          placeholder="Ejemplo: Algodón, Poliester"
          onChange={handleChange}
          value={product.material}
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
  
        <label
          htmlFor="productImage"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Imagen del producto:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded-lg w-full py-2 px-4 mb-4 text-gray-700"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
  
        {file && (
          <img
            className="w-full max-h-64 object-contain rounded-lg border mt-4"
            src={URL.createObjectURL(file)}
            alt="Vista previa"
          />
        )}
  
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          {params.id ? "Actualizar Producto" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
  
}  

export default ProductForm;
