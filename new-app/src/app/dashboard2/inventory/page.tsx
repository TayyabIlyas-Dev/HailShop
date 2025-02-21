
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import Inventory from "../../components/Inventory";
import AddProductFormWrapper from "../../components/AddProductFormWrapper";
import { SignedOut, SignInButton } from "@clerk/nextjs";

// interface Product {
//   _id: string;
//   name: string;
//   slug: { current: string };
//   images?: { asset: { _ref: string } }[];
//   description: string;
//   price: number;
//   productType: string;
//   inventory: number;
//   discount: number;
// }

const Page =  async () => {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [showMore, setShowMore] = useState(false);
  const { userId } = await auth(); // Get the authenticated user
  const user = await currentUser(); // Fetch user data from Clerk
  const role = user?.publicMetadata?.role; // Get role from metadata
  // console.log("role=", user);
  if (!userId || role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div>
          <p className="text-red-500 text-lg font-semibold">
            Access Denied: Admins Only
          </p>
        </div>
    
        <SignedOut>
          <div className="p-2">
            <button className="text-base underline font-semibold">
             <span className="underline">
             <SignInButton />
             </span>
            </button>{" "}
            to Access
          </div>
        </SignedOut>
      </div>
    );
    
  }
  // const toggleShowMore = () => {
  //   setShowMore((prev) => !prev);
  // };
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await client.fetch(groq`*[_type=="product"]`);
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const handleDeleteProduct = async (productId: string) => {
  //   try {
  //     const response = await fetch("/api/deleteProduct", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ productId }),
  //     });

  //     if (!response.ok) throw new Error("Failed to delete product");

  //     setProducts(products.filter((p) => p._id !== productId));
  //   } catch (error) {
  //     console.error("Product deletion failed:", error);
  //     alert("Failed to delete product. Please try again.");
  //   }
  // };

  return (
    <>
      <div className="bg-[#fcfbfbb7] w-full pb-20 pt-8 p-2">
        <div className="container">
          <div>
            <AddProductFormWrapper/>
          </div>
          {/* <div className="flex   items-center justify-center">
            <button
              className="relative my-6 text-xl mx-10 font-semibold text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              onClick={toggleShowMore}
            >
              {showMore ? " Close form" : "Add a new product"}
            </button>
          </div>
          {showMore && (
            <div className="mt-10 p-4 mx-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl pt-3 font-bold text-center mb-4">
                Add New Product
              </h2>
              <AddProductForm onProductAdded={fetchProducts} />
            </div>
          )} */}
          <div>
            {/* <div className="mt-10 p-4 mx-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl pt-3 font-bold text-center mb-4">
              Add New Product
            </h2>
            <AddProductForm onProductAdded={fetchProducts} />
           </div> */}

            <Inventory />
          </div>
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
