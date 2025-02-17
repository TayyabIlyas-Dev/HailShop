// import { defineField, defineType } from "sanity";

// export const product = defineType({
//   name: "product",
//   title: "Products",
//   type: "document",
//   fields: [
//     defineField({
//       name: "name",
//       title: "Name",
//       type: "string",
//     }),
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "name",
//       },
//     },
//     {
//       name: "images",
//       title: "Images",
//       type: "array",
//       of: [{ type: "image" }],
//     },
//     {
//       name: "description",
//       title: "Description",
//       type: "string",
//     },
//     {
//       name: "price",
//       title: "Price",
//       type: "number",
//     },
//     {
//       name: "discount",
//       title: "Discount (%)",
//       type: "number",
//       description: "Optional discount percentage (0-100)",
//       validation: (Rule) =>
//         Rule.min(0).max(100).warning("Discount should be between 0 and 100"),
//     },
//     {
//       name: "productType",
//       title: "Product Type",
//       type: "string",
//       options: {
//         list: [
//           { title: "Phone", value: "phone" },
//           { title: "Smart Watch", value: "smart-watch" },
//           { title: "Camera", value: "camera" },
//           { title: "Headphones", value: "headphones" },
//           { title: "Computer", value: "computer" },
//           { title: "Accessories", value: "accessories" },
//           { title: "Chair", value: "chair" },
//           { title: "Table", value: "table" },
//         ],
//       },
//     },
//     {
//       name: "isFeatured",
//       title: "Featured",
//       type: "boolean",
//       description: "Check if this product should be featured",
//     },
//     {
//       name: "inventory",
//       title: "Current Inventory",
//       type: "number",
//       description: "Total available stock units",
//       validation: (Rule) => Rule.min(0).warning("Inventory cannot be negative"),
//     },
//   ],
// });







import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "images", title: "Images", type: "array", of: [{ type: "image" }] },
    { name: "description", title: "Description", type: "string" },
    { name: "price", title: "Price", type: "number" },
    { name: "discount", title: "Discount (%)", type: "number", description: "Optional discount in percentage" }, // ✅ Discount added
    { name: "isFeatured", title: "Featured", type: "boolean", description: "Check if product is featured" }, // ✅ Featured added
    {
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Phone", value: "phone" },
          { title: "Smart Watch", value: "smart-watch" },
          { title: "Camera", value: "camera" },
          { title: "Headphones", value: "headphones" },
          { title: "Computer", value: "computer" },
          { title: "Accessories", value: "accessories" },
          { title: "Chair", value: "chair" },
          { title: "Table", value: "table" },
        ],
      },
    },
    { name: "inventory", title: "Current Inventory", type: "number", validation: (Rule) => Rule.min(0) },
  ],
});








// import { defineField, defineType } from "sanity";

// export const product = defineType({
//   name: "product",
//   title: "Products",
//   type: "document",
//   fields: [
//     defineField({
//       name: "name",
//       title: "Name",
//       type: "string",
//     }),
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "name",
//       },
//     },
//     {
//       name: "images",
//       title: "Images",
//       type: "array",
//       of: [{ type: "image" }],
//     },
//     {
//       name: "description",
//       title: "Description",
//       type: "string",
//     },
//     {
//       name: "price",
//       title: "Price",
//       type: "number",
//     },

//   ],
// });
