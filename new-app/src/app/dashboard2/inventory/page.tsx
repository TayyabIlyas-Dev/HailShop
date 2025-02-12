"use client";

import React, { useState, useEffect } from "react";
import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import StockCard from "../../components/StockCard";
import AddProductForm from "../../components/AddProductForm";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    images?: { asset: { _ref: string } }[];
    description: string;
    price: number;
    productType: string;
    inventory: number;
}

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await client.fetch(groq`*[_type=="product"]`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId: string) => {
        try {
            const response = await fetch("/api/deleteProduct", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) throw new Error("Failed to delete product");

            setProducts(products.filter((p) => p._id !== productId));
        } catch (error) {
            console.error("Product deletion failed:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    return (
        <>
        <div className="bg-[#f8f8f8] w-full pb-20 pt-8 p-2">
            <div className="container">
            <div className="mt-10 p-4 mx-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl pt-3 font-bold text-center mb-4">Add New Product</h2>
                    <AddProductForm onProductAdded={fetchProducts} />
                </div>
                <div className="pt-9 px-3 text-start">
                    <h1 className="text-4xl  px-3 font-bold">Inventory</h1>
                </div>
                {loading ? (
                    <p className="text-center text-gray-600">Loading products...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mx-3 mt-8">
  {products.map((product) => (
    <StockCard key={product._id} product={product} onDelete={handleDeleteProduct} />
  ))}
</div>

                )}
              
            </div>
        </div>
        </>
    );
};

export default Page;



// const ProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
//     const [newProduct, setNewProduct] = useState({
//         name: "",
//         description: "",
//         price: "",
//         productType: "phone",
//         inventory: "",
//         images: [] as { asset: { _ref: string } }[],
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//     };

//     const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (!e.target.files || e.target.files.length === 0) return;
    
//         const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
//         const uploadedImages = [...newProduct.images];
    
//         for (const file of files) {
//             if (uploadedImages.length >= 4) break; // Stop if already 4 images uploaded
    
//             const formData = new FormData();
//             formData.append("file", file);
    
//             try {
//                 const response = await fetch(`/api/uploadImage`, {
//                     method: "POST",
//                     body: formData,
//                 });
    
//                 if (!response.ok) throw new Error("Failed to upload image");
//                 const data = await response.json();
    
//                 uploadedImages.push({ asset: { _ref: data._id } });
//             } catch (error) {
//                 console.error("Image upload failed", error);
//                 alert("Image upload failed. Please try again.");
//             }
//         }
    
//         setNewProduct((prev) => ({
//             ...prev,
//             images: uploadedImages,
//         }));
//     };
    

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.inventory) {
//             alert("All fields are required.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await fetch("/api/addProduct", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newProduct),
//             });

//             if (!response.ok) throw new Error("Failed to add product");
//             alert("Product added successfully!");
//             setNewProduct({ name: "", description: "", price: "", productType: "phone", inventory: "", images: [] });
//             onProductAdded();
//         } catch (error) {
//             console.error("Product upload failed", error);
//             alert("Failed to add product. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} className="w-full p-2 border rounded" required />
//             <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="w-full p-2 border rounded" required />
//             <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} className="w-full p-2 border rounded" required />
//             <select name="productType" value={newProduct.productType} onChange={handleChange} className="w-full p-2 border rounded">
//                 <option value="phone">Phone</option>
//                 <option value="smart-watch">Smart Watch</option>
//                 <option value="camera">Camera</option>
//                 <option value="headphones">Headphones</option>
//                 <option value="computer">Computer</option>
//                 <option value="accessories">Accessories</option>
//             </select>
//             <input type="number" name="inventory" placeholder="Inventory" value={newProduct.inventory} onChange={handleChange} className="w-full p-2 border rounded" required />
//             <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" multiple />
//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
//                 {loading ? "Adding Product..." : "Add Product"}
//             </button>
//         </form>
//     );
// };