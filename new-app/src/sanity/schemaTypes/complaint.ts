export default {
  name: "complaint",
  type: "document",
  title: "Complaints",
  fields: [
    {
      name: "userName",
      type: "string",
      title: "User Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "complaint",
      type: "text",
      title: "Complaint",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      type: "datetime",
      title: "Date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "productName",
      type: "string",
      title: "Product Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "phoneNumber",
      type: "string",
      title: "Phone Number",
      validation: (Rule: any) => Rule.required().min(11).max(11),
    },
    {
      name: "complainStatus",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "In Progress", value: "In_Progress" },
          { title: "Resolved", value: "Resolved" },
          { title: "Rejected", value: "Rejected" },
        ],
      },
    },
  ],
};
