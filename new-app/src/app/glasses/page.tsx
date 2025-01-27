import React from "react";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../lib/sanityClient";
import Image from "next/image";

const Page = async () => {
  // Fetch data from Sanity
  const Query = `*[_type == "Glasses"]{
    title,
    price,
    ItemURL,
    image {
      asset->{
        _id,
        url
      }
    }
  }`;
  const dataP = await client.fetch(Query);

  return (
    <div className="font-[sans-serif] p-4 mx-auto lg:max-w-5xl max-w-2xl">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dataP.map((product: any, index: number) => (
          <div
            key={index}
            className="bg-white border overflow-hidden rounded-2xl cursor-pointer shadow-md hover:border-blue-600 transition-all relative"
          >
            <Link href={product.ItemURL} passHref>
            <div className="bg-gray-50 overflow-hidden mx-auto rounded-b-2xl">
  <Image
    src={urlFor(product.image.asset).url()}
    alt={product.title || "Product Image"}
    width={281} // Provide width
    height={218} // Provide height
    className="aspect-[281/218] w-full object-contain"
    layout="responsive" // Makes the image responsive
  />
</div>
            </Link>
            <div className="p-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">
                {product.title}
              </h3>
              <div className="flex items-center justify-between gap-2 mt-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    className="fill-gray-800 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-sm sm:text-base text-gray-800 font-bold">
                  <span className="text-green-600">$ &nbsp;</span>
                  {product.price}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
