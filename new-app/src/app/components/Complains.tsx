"use client";

import { useState } from "react";
import { client } from "@/src/sanity/lib/client";
import toast from "react-hot-toast";

const ComplaintForm = () => {
  const [form, setForm] = useState({
    name: "",
    complaint: "",
    date: "",
    productName: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!form.name || !form.complaint || !form.date || !form.productName || !form.city) {
      toast.error("Please fill in all fields!");
      return;
    }
  
    try {
      const response = await fetch("/api/addComplaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.name,
          complaint: form.complaint,
          date: form.date,
          productName: form.productName,
          city: form.city,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "Failed to submit complaint");
  
      toast.success("Complaint submitted successfully!");
      setForm({ name: "", complaint: "", date: "", productName: "", city: "" });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint!");
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="complaint"
          placeholder="Your Complaint"
          value={form.complaint}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-black hover:bg-white hover:text-black border-2 border-black text-white p-2 font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;