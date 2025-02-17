import Link from "next/link"; // Import Next.js Link
import React from "react";
import { BsPlugin } from "react-icons/bs";
import { 
  FaRegHeart, 
  FaMobileAlt, 
  FaCamera, 
  FaHeadphones, 
  FaLaptop, 
  FaPlug,
  
} from "react-icons/fa";
import { GiDesk, GiHeadphones } from "react-icons/gi";
import { GiOfficeChair } from "react-icons/gi";
import { IoWatchSharp } from "react-icons/io5";

type Category = {
  name: string;
  icon: JSX.Element;
  path?: string; // Optional path for navigation
};

const categories: Category[] = [
  { name: "Phones", icon: <FaMobileAlt className="text-2xl" />, path: "/category/Phones" },
  { name: "Smart Watches", icon: <IoWatchSharp className="text-2xl" />, path: "/category/smartWatches" },
  { name: "Cameras", icon: <FaCamera className="text-2xl" />, path: "/category/Cameras" },
  {name: "Headphones", icon: <FaHeadphones className="text-2xl font-bold" />, path: "/category/Headphones"},
  { name: "Computers", icon: <FaLaptop className="text-2xl" />, path: "/category/Computer" },
  { name: "Accessories", icon: <BsPlugin className="text-2xl" />, path: "/category/Accessories" },
  { name: "Tables", icon: <GiDesk className="text-2xl" />, path: "/category/Tables" },
  { name: "Chairs", icon: <GiOfficeChair className="text-2xl" />, path: "/category/Chairs" },
];

const BrowseCategory: React.FC = () => {
  return (
    <div className="p-4 py-8 bg-[#FAFAFA]">
      <h2 className="text-3xl font-bold mb-4 text-center pb-16">Browse By Category</h2>
      <div className="gap-4 flex flex-wrap justify-center items-center">
        {categories.map((category, index) => {
          const content = (
            <div
              key={index}
              className="flex flex-col cursor-pointer items-center p-4 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[340px] xl:[400px] bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              {category.icon}
              <span className="mt-2 text-center text-sm font-medium">
                {category.name}
              </span>
            </div>
          );

          return category.path ? (
            <Link href={category.path} key={index}>
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCategory;








// import { Link } from "lucide-react";
// import React from "react";
// import { FaRegHeart, FaMobileAlt, FaCamera, FaHeadphones, FaLaptop, FaGamepad } from "react-icons/fa";

// type Category = {
//   name: string;
//   icon: JSX.Element;
// };

// const categories: Category[] = [
//     { name: "Phones", icon: <FaMobileAlt className="text-2xl" /> },
//     { name: "Smart Watches", icon: <FaRegHeart className="text-2xl" /> },
//     { name: "Cameras", icon: <FaCamera className="text-2xl" /> },
//     { name: "Headphones", icon: <FaHeadphones className="text-2xl" /> },
//     { name: "Computers", icon: <FaLaptop className="text-2xl" /> },
//     { name: "Gaming", icon: <FaGamepad className="text-2xl" /> },
//   ];

// const BrowseCategory: React.FC = () => {
//   return (
//     <div className="p-4 py-8  bg-[#FAFAFA]">
//       <h2 className="text-3xl  font-bold mb-4 text-center  pb-16">Browse By Category</h2>
//       <div className=" gap-4 flex flex-wrap justify-center items-center">
//         {categories.map((category, index) => (
//           <div
//           key={index}
//           className="flex flex-col cursor-pointer items-center p-4 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[340px] xl:[400px] bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow"
//           >
  
//             {category.icon}
//             <span className="mt-2 text-center text-sm font-medium">
//               {category.name}
//             </span>
  
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BrowseCategory;
