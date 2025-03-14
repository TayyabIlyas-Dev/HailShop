// "use client";
// import { useState } from "react";

// export default function ProductUpdateForm({ product }: { product: any }) {
//   const [formData, setFormData] = useState({
//     name: product.name || "",
//     price: product.price || "",
//     description: product.description || "",
//     inventory: product.inventory || "",
//     productType: product.productType || "",
//   });

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const res = await fetch("/api/update-product", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: product._id, ...formData }),
//     });

//     if (res.ok) {
//       alert("Product updated successfully!");
//     } else {
//       alert("Error updating product");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Update Product</h2>

//       <label className="block mb-2">Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2">Price:</label>
//       <input
//         type="number"
//         name="price"
//         value={formData.price}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2">Description:</label>
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2">Inventory:</label>
//       <input
//         type="number"
//         name="inventory"
//         value={formData.inventory}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />

//       <label className="block mt-4 mb-2">Product Type:</label>
//       <select
//         name="productType"
//         value={formData.productType}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       >
//         <option value="phone">Phone</option>
//         <option value="smart-watch">Smart Watch</option>
//         <option value="camera">Camera</option>
//         <option value="headphones">Headphones</option>
//         <option value="computer">Computer</option>
//         <option value="accessories">Accessories</option>
//         <option value="featured">Featured</option>
//       </select>

//       <button
//         type="submit"
//         className="mt-4 bg-blue-500 text-white p-2 rounded"
//       >
//         Update Product
//       </button>
//     </form>
//   );
// }








"use client";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function UpdateProductForm({ product, onUpdate, onCancel }: { 
  product: any, 
  onUpdate: (updatedProduct: any) => Promise<void>, 
  onCancel: () => void 
}) {
  const [updatedProduct, setUpdatedProduct] = useState({
    // name: product.name,
    description: product.description,
    price: product.price,
    discount: product.discount || "",
    isFeatured: product.isFeatured || false,
    productType: product.productType || "phone",
    inventory: product.inventory,
    images: product.images || []
  });

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : ["inventory", "discount", "price"].includes(name) ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate({ 
        ...updatedProduct, 
        inventory: Number(updatedProduct.inventory) // Ensure inventory is a number
      });
      showToast("Product updated successfully!");
    } catch (error) {
      console.log(error);
      
      showToast("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-10 pt-3">
      {/* <input type="text" name="name" placeholder="Product Name" value={updatedProduct.name} onChange={handleChange} className="w-full p-2 border rounded" required /> */}
      <input type="text" name="description" placeholder="Description" value={updatedProduct.description} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="number" name="price" placeholder="Price" value={updatedProduct.price} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="number" name="discount" placeholder="Discount (%)" value={updatedProduct.discount} onChange={handleChange} className="w-full p-2 border rounded" />
      <label className="flex items-center cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      name="isFeatured"
      checked={updatedProduct.isFeatured}
      onChange={handleChange}
      className="sr-only peer"
    />
    <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-black transition-colors"></div>
    <div className="absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
  </div>
  <span className="ml-2 text-sm font-medium">Featured</span>
</label>


      <select name="productType" value={updatedProduct.productType} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="phone">Phone</option>
        <option value="smart-watch">Smart Watch</option>
        <option value="camera">Camera</option>
        <option value="headphones">Headphones</option>
        <option value="computer">Computer</option>
        <option value="accessories">Accessories</option>
        <option value="chair">Chair</option>
        <option value="table">Table</option>
      </select>
      <input type="number" name="inventory" placeholder="Inventory" value={updatedProduct.inventory} onChange={handleChange} className="w-full p-2 border rounded" required />
      <div className="flex justify-between gap-2">
        <button type="submit" className="flex-1 bg-black hover:bg-white font-semibold hover:text-black border-2 border-black text-white p-2  " disabled={loading}>
          {loading ? "Updating Product..." : "Update Product"}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 add-to-cart ">
          Cancel
        </button>
      </div>
    </form>
  );
}
