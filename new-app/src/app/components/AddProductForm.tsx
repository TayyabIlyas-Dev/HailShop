'use client'
import React, { useState } from "react";

const AddProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        productType: "phone",
        inventory: "",
        images: [] as { asset: { _ref: string } }[],
    });
    const [loading, setLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // To show previews

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
        const uploadedImages = [...newProduct.images];
        const previews = [...imagePreviews];

        for (const file of files) {
            if (uploadedImages.length >= 4) break; // Stop if already 4 images uploaded

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`/api/uploadImage`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to upload image");
                const data = await response.json();

                uploadedImages.push({ asset: { _ref: data._id } });
                previews.push(URL.createObjectURL(file)); // Generate local preview
            } catch (error) {
                console.error("Image upload failed", error);
                alert("Image upload failed. Please try again.");
            }
        }

        setNewProduct((prev) => ({
            ...prev,
            images: uploadedImages,
        }));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.inventory) {
            alert("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/addProduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) throw new Error("Failed to add product");
            alert("Product added successfully!");
            setNewProduct({ name: "", description: "", price: "", productType: "phone", inventory: "", images: [] });
            setImagePreviews([]); // Clear previews
            onProductAdded();
        } catch (error) {
            console.error("Product upload failed", error);
            alert("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            <select name="productType" value={newProduct.productType} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="phone">Phone</option>
                <option value="smart-watch">Smart Watch</option>
                <option value="camera">Camera</option>
                <option value="headphones">Headphones</option>
                <option value="computer">Computer</option>
                <option value="accessories">Accessories</option>
            </select>
            <input type="number" name="inventory" placeholder="Inventory" value={newProduct.inventory} onChange={handleChange} className="w-full p-2 border rounded" required />

            {/* Image Upload & Previews */}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" multiple />
            <div className="flex gap-2 mt-2">
                {imagePreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded border" />
                ))}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
                {loading ? "Adding Product..." : "Add Product"}
            </button>
        </form>
    );
};

export default AddProductForm;
