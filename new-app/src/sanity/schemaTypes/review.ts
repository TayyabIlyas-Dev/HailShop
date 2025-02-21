export default {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "productId",
      title: "Product ID",
      type: "string",
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "name",
      title: "User Name",
      type: "string",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
