import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "zipCode", title: "Zip Code", type: "string" }),
    defineField({
      name: "productStatus",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "Delivered", value: "Delivered" },
          { title: "Dispatch", value: "Dispatch" },
          { title: "Pending", value: "Pending" },
        ],
      },
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "orderItem",
          title: "Order Item",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "productQty",
              title: "Quantity",
              type: "number",
            }),
          ],
        },
      ],
    }),
    defineField({ name: "totalPrice", title: "Total Price", type: "number" }),
    defineField({
      name: "totalQuantity",
      title: "Total Quantity",
      type: "number",
    }),
    defineField({ name: "orderDate", title: "Order Date", type: "datetime" }),
  ],
});
