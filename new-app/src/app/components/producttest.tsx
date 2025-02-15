
import React from "react";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

interface Product {
  title: string;
  price: number;
  image: any;
  ItemURL?: string;
}

const ProCard: React.FC = async () => {
  const productsQuery = `*[_type == "product"]{
    title,
    price,
    image,
    ItemURL
  }`;
  const products: Product[] = await client.fetch(productsQuery);

  return (
    <>


      <div className="font-[sans-serif] bg-[#f8f8f8]p-4 mx-0 max-w-[1400px] px-5">

        <div className="mt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ">
            {products.map((product, index) => (
              <div
              key={index}
                className="group overflow-hidden cursor-pointer relative hover:shadow-lg"
              >
                {product.ItemURL ? (
                    <Link href={product.ItemURL} passHref>
                    <div className="bg-gray-100 w-full overflow-hidden ">
                      {product.image && (
                          <img
                          src={urlForImage(product.image.asset).url()}
                          alt={product.title}
                          style={{ width: "250px", height: "250px" }}
                          />
                        )}
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-100 w-full overflow-hidden rounded-t-2xl">
                    {product.image && (
                      <img
                        src={urlForImage(product.image.asset).url()}
                        alt={product.title}
                        style={{ width: "250px", height: "250px" }}
                      />
                    )}
                  </div>
                )}
                <div
                  className="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10
                  transition-all duration-500
                  left-0 right-0
                  group-hover:bottom-20 group-hover:py-3 group-hover:bg-white group-hover:opacity-100
                  lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
                  max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60
                  hover:padding-top-4 lg:hover:padding-top-3 lg:hover:padding-bottom-3"
                  >
                  <button
                    type="button"
                    title="Add to wishlist"
                    className="bg-transparent outline-none border-none"
                    >
                    <AiOutlineHeart className="fill-gray-800 w-5 h-5 inline-block" />
                  </button>
                  <button
                    type="button"
                    title="Add to cart"
                    className="bg-transparent outline-none border-none"
                  >
                    <AiOutlineShoppingCart className="fill-gray-800 w-5 h-5 inline-block" />
                  </button>
                </div>
                <div className="z-20 relative bg-white p-4 rounded-br-2xl rounded-bl-2xl">
                  <h4 className="text-[20px] font-semibold text-gray-800 truncate">
                    {product.title}
                  </h4>
                  <h6 className="text-sm font-sans text-gray-600 mt-2 cursor-auto">
                   <span className="text-green-500">$</span>  {product.price}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
            
    </>
  );
};

export default ProCard;
