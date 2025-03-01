// "use client";

// import { useEffect, useState } from "react";
// import { SignedIn, useAuth } from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import { client } from "../../lib/sanityClient";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";

// interface Complaint {
//   _id: string;
//   userName: string;
//   email: string;
//   complaint: string;
//   complainStatus: string;
//   city: string;
//   date: string;
//   productName: string;
// }

// const ComplaintsPage = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const { userId } = useAuth();

//   const showToast = (message: string, type: "success" | "error") => {
//     toast(message, {
//       icon: type === "success" ? <FaCheck className="text-white" /> : <FaTimes className="text-white" />,
//       style: {
//         borderRadius: "5px",
//         background: "#0b0b0b",
//         color: "white",
//         padding: "12px 20px",
//         marginTop: "40px",
//         fontWeight: "bold",
//       },
//     });
//   };

//   const updateComplaintStatus = async (complaintId: string, newStatus: string) => {
//     try {
//       await client.patch(complaintId).set({ complainStatus: newStatus }).commit();

//       setComplaints((prevComplaints) =>
//         prevComplaints.map((complaint) =>
//           complaint._id === complaintId ? { ...complaint, complainStatus: newStatus } : complaint
//         )
//       );
//       showToast("Complaint status updated successfully!", "success");
//     } catch (error) {
//       console.error("Error updating status:", error);
//       showToast("Failed to update complaint status!", "error");
//     }
//   };

  // useEffect(() => {
  //   const fetchComplaints = async () => {
  //     try {
  //       const data = await client.fetch(
  //         `*[_type == "complaint"]{_id, userName, email, city, complaint, productName, complainStatus, date}`
  //       );
  //       setComplaints(data);
  //     } catch (error) {
  //       console.error("Error fetching complaints:", error);
  //     }
  //   };
  //   fetchComplaints();
  // }, []);

//   const deleteComplaint = async (id: string) => {
//     try {
//       await client.delete(id);
//       setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
//       showToast("Complaint deleted successfully!", "success");
//     } catch (error) {
//       console.error("Error deleting complaint:", error);
//       showToast("Failed to delete complaint!", "error");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-white">Customer Complaints</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {complaints.map((complaint, index) => (
//           <motion.div
//             key={complaint._id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-gray-50 text-black p-6 rounded-2xl shadow-lg"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h4 className="text-black font-bold">{complaint.userName}</h4>
//               <p className="text-xs text-gray-800">{complaint.date}</p>
//             </div>
//             <p className="mt-2 text-lg">{complaint.productName}</p>
//             <p className="mt-2 text-base h-[70px] w-full overflow-hidden overflow-y-scroll custom-scrollbar2">
//               {complaint.complaint}
//             </p>
//             <p className="mt-2 text-sm">{complaint.city}</p>
//             <p className="mt-2 text-sm text-gray-500">Status: {complaint.complainStatus}</p>
//             <div className="text-center">
//               <select
//                 value={complaint.complainStatus}
//                 onChange={(e) => updateComplaintStatus(complaint._id, e.target.value)}
//                 className={`font-semibold p-1 rounded ${complaint.complainStatus === "Pending"
//                     ? "text-orange-600"
//                     : complaint.complainStatus === "In Progress"
//                       ? "text-blue-600"
//                       : complaint.complainStatus === "Resolved"
//                         ? "text-green-600"
//                         : complaint.complainStatus === "Rejected"
//                           ? "text-red-600"
//                           : ""
//                   }`}
//               >
//                 <option value="Pending" className="text-orange-500">Pending</option>
//                 <option value="In Progress" className="text-blue-600">In Progress</option>
//                 <option value="Resolved" className="text-green-600">Resolved</option>
//                 <option value="Rejected" className="text-red-600">Rejected</option>
//               </select>
//             </div>
//             <SignedIn>
//               <button
//                 onClick={() => {
//                   console.log("Delete button clicked for:", complaint._id);
//                   deleteComplaint(complaint._id);
//                 }}
//                 className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition"
//               >
//                 Delete
//               </button>
//             </SignedIn>

//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ComplaintsPage;


"use client";

import { useEffect, useState } from "react";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { client } from "../../../sanity/lib/client";

interface Complaint {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  complaint: string;
  complainStatus: string;
  city: string;
  date: string;
  productName: string;
}

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { userId } = useAuth();

  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      icon: type === "success" ? <FaCheck className="text-white" /> : <FaTimes className="text-white" />,
      style: {
        borderRadius: "5px",
        background: "#0b0b0b",
        color: "white",
        padding: "12px 20px",
        marginTop: "40px",
        fontWeight: "bold",
      },
    });
  };

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/deleteComplaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "complaint"]{_id, userName, email, city, complaint, productName, complainStatus, date}`
        );
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const updateComplaintStatus = async (complaintId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/deleteComplaint/${complaintId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complainStatus: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, complainStatus: newStatus } : complaint
        )
      );
      showToast("Complaint status updated successfully!", "success");
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update complaint status!", "error");
    }
  };

  const deleteComplaint = async (id: string) => {
    try {
      const response = await fetch(`/api/complaint/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete complaint");

      setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
      showToast("Complaint deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting complaint:", error);
      showToast("Failed to delete complaint!", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Customer Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint, index) => (
          <motion.div
            key={complaint._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 text-black p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-black font-bold">{complaint.userName}</h4>
              <p className="text-xs text-gray-800">{complaint.date}</p>
            </div>
            <p className="mt-2 text-lg">{complaint.productName}</p>
            <p className="mt-2 text-base h-[70px] w-full overflow-hidden overflow-y-scroll custom-scrollbar2">
              {complaint.complaint}
            </p>
            <p className="mt-2 text-sm">City: {complaint.city}</p>
            <p className="mt-2 text-sm">Phone: {complaint.phoneNumber}</p>
            <p className="mt-2 text-sm text-gray-500">Status: {complaint.complainStatus}</p>
            <div className="text-center">
              <select
                value={complaint.complainStatus}
                onChange={(e) => updateComplaintStatus(complaint._id, e.target.value)}
                className={`font-semibold p-1 rounded ${
                  complaint.complainStatus === "Pending"
                    ? "text-orange-600"
                    : complaint.complainStatus === "In Progress"
                    ? "text-blue-600"
                    : complaint.complainStatus === "Resolved"
                    ? "text-green-600"
                    : complaint.complainStatus === "Rejected"
                    ? "text-red-600"
                    : ""
                }`}
              >
                <option value="Pending" className="text-orange-500">Pending</option>
                <option value="In Progress" className="text-blue-600">In Progress</option>
                <option value="Resolved" className="text-green-600">Resolved</option>
                <option value="Rejected" className="text-red-600">Rejected</option>
              </select>
            </div>
            <SignedIn>
              <button
                onClick={() => deleteComplaint(complaint._id)}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </SignedIn>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
