// "use client";
// import React, { useState } from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// import { useToast } from "../context/ToastContext";

// const AddProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     productType: "phone",
//     inventory: "",
//     images: [] as { asset: { _ref: string } }[],
//   });
//   const [loading, setLoading] = useState(false);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const { showToast } = useToast();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) return;

  //   const files = Array.from(e.target.files).slice(0, 4);
  //   const uploadedImages = [...newProduct.images];
  //   const previews = [...imagePreviews];

  //   for (const file of files) {
  //     if (uploadedImages.length >= 4) break;

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await fetch(`/api/uploadImage`, {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) throw new Error("Failed to upload image");
  //       const data = await response.json();

  //       uploadedImages.push({ asset: { _ref: data._id } });
  //       previews.push(URL.createObjectURL(file));
  //     } catch (error) {
  //       console.error("Image upload failed", error);
  //       showToast("Image upload failed. Please try again.");
  //     }
  //   }

  //   setNewProduct((prev) => ({
  //     ...prev,
  //     images: uploadedImages,
  //   }));
  //   setImagePreviews(previews);
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (
  //     !newProduct.name ||
  //     !newProduct.description ||
  //     !newProduct.price ||
  //     !newProduct.inventory
  //   ) {
  //     showToast("All fields are required.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/addProduct", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newProduct),
  //     });

  //     if (!response.ok) throw new Error("Failed to add product");
  //     showToast("Product added successfully!");
  //     setNewProduct({
  //       name: "",
  //       description: "",
  //       price: "",
  //       productType: "phone",
  //       inventory: "",
  //       images: [],
  //     });
  //     setImagePreviews([]);
  //     onProductAdded();
  //   } catch (error) {
  //     console.error("Product upload failed", error);
  //     showToast("Failed to add product. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   return (

//     <form onSubmit={handleSubmit} className="space-y-4  pt-3">
//       <div className="sm:grid sm:grid-cols-2 gap-3">
//       <div className=" block p-2">
//       <input
//         type="text"
//         name="name"
//         placeholder="Product Name"
//         value={newProduct.name}
//         onChange={handleChange}
//         className="w-full p-2 m-1 border rounded"
//         required
//       />
//       <input
//         type="text"
//         name="description"
//         placeholder="Description"
//         value={newProduct.description}
//         onChange={handleChange}
//         className="w-full  m-1 p-2 border rounded"
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={newProduct.price}
//         onChange={handleChange}
//         className="w-full  m-1 p-2 border rounded"
//         required
//       />
//       <select
//         name="productType"
//         value={newProduct.productType}
//         onChange={handleChange}
//         className="w-full m-1 p-2 border rounded"
//       >
//         <option value="phone">Phone</option>
//         <option value="smart-watch">Smart Watch</option>
//         <option value="camera">Camera</option>
//         <option value="headphones">Headphones</option>
//         <option value="computer">Computer</option>
//         <option value="accessories">Accessories</option>
//         <option value="featured">Featured</option>
//       </select>
//       <input
//         type="number"
//         name="inventory"
//         placeholder="Inventory"
//         value={newProduct.inventory}
//         onChange={handleChange}
//         className="w-full m-1 p-2 border rounded"
//         required
//       />
//      </div>
// <div className="h-full flex flex-col my-1 px-2 items-center justify-center sm:items-start sm:justify-start py-2 pb-3">
//   {/* Image Upload & Previews */}
//   <label className="flex h-full justify-center items-center w-full max-w-xs sm:max-w-full font-semibold p-2 text-center text-3xl border hover:underline rounded cursor-pointer">
//     <AiOutlinePlus />
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleImageUpload}
//       className="hidden"
//       multiple
//     />
//   </label>
//   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 flex-1">
//     {imagePreviews.map((src, index) => (
//       <img
//         key={index}
//         src={src}
//         alt={`Preview ${index + 1}`}
//         className="w-full h-full object-cover rounded border"
//       />
//     ))}
//   </div>
// </div>


//   </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         disabled={loading}
//       >
//         {loading ? "Adding Product..." : "Add Product"}
//       </button>
//     </form>
//   );
// };

// export default AddProductForm;




"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useToast } from "../context/ToastContext";

const AddProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    productType: "phone",
    inventory: "",
    isFeatured: false,
    discount: "",
    images: [] as { asset: { _ref: string } }[],
  });
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setNewProduct((prev) => ({ ...prev, [name]: newValue }));
  };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const files = Array.from(e.target.files).slice(0, 4); // Max 4 images
//     const uploadedImages = [...newProduct.images];

//     for (const file of files) {
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch(`/api/uploadImage`, {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) throw new Error("Failed to upload image");
//             const data = await response.json();
//             uploadedImages.push(data._id); // ✅ Sanity image ID save karo
//         } catch (error) {
//             console.error("Image upload failed", error);
//         }
//     }

//     setNewProduct((prev) => ({ ...prev, images: uploadedImages }));
// };

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const files = Array.from(e.target.files).slice(0, 4);
  const uploadedImages = [...newProduct.images];
  const previews = [...imagePreviews];

  for (const file of files) {
    if (uploadedImages.length >= 4) break;

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
      previews.push(URL.createObjectURL(file));
    } catch (error) {
      console.error("Image upload failed", error);
      showToast("Image upload failed. Please try again.");
    }
  }

  setNewProduct((prev) => ({
    ...prev,
    images: uploadedImages,
  }));
  setImagePreviews(previews);
};

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.inventory) {
  //     showToast("All fields are required.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/addProduct", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newProduct),
  //     });

  //     if (!response.ok) throw new Error("Failed to add product");
  //     showToast("Product added successfully!");
  //     setNewProduct({
  //       name: "",
  //       description: "",
  //       price: "",
  //       productType: "phone",
  //       inventory: "",
  //       isFeatured: false,
  //       discount: "",
  //       images: [],
  //     });
  //     setImagePreviews([]);
  //     onProductAdded();
  //   } catch (error) {
  //     console.error("Product upload failed", error);
  //     showToast("Failed to add product. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.inventory
    ) {
      showToast("All fields are required.");
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
      showToast("Product added successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        productType: "phone",
        inventory: "",
        isFeatured: false,
        discount: "",
        images: [],
      });
      setImagePreviews([]);
      onProductAdded();
    } catch (error) {
      console.error("Product upload failed", error);
      showToast("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-3">
      <div className="sm:grid sm:grid-cols-2 gap-3">
        <div className="block p-2">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full p-2 m-1 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full m-1 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (Without discount)"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full m-1 p-2 border rounded"
            required
          />
          <select
            name="productType"
            value={newProduct.productType}
            onChange={handleChange}
            className="w-full m-1 p-2 border rounded"
          >
            <option value="phone">Phone</option>
            <option value="smart-watch">Smart Watch</option>
            <option value="camera">Camera</option>
            <option value="headphones">Headphones</option>
            <option value="computer">Computer</option>
            <option value="accessories">Accessories</option>
            <option value="chair">Chair</option>
            <option value="table">Table</option>
          </select>
          <input
            type="number"
            name="inventory"
            placeholder="Inventory"
            value={newProduct.inventory}
            onChange={handleChange}
            className="w-full m-1 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={newProduct.discount}
            onChange={handleChange}
            className="w-full m-1 p-2 border rounded"
          />
          {/* <label className="flex items-center space-x-2 m-1">
            <input
              type="checkbox"
              name="isFeatured"
              checked={newProduct.isFeatured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Featured Product</span>
          </label> */}
                <label className="flex items-center m-2 cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      name="isFeatured"
      checked={newProduct.isFeatured}
      onChange={handleChange}
      className="sr-only peer"
    />
    <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-black transition-colors"></div>
    <div className="absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
  </div>
  <span className="ml-2 text-sm font-medium">Featured</span>
</label>

        </div>

        <div className="h-full flex flex-col my-1 px-2 items-center justify-center sm:items-start sm:justify-start py-2 pb-3">
          <label className="flex h-full justify-center items-center w-full max-w-xs sm:max-w-full font-semibold p-2 text-center text-3xl border hover:underline rounded cursor-pointer">
            <AiOutlinePlus />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 flex-1">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded border" />
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
