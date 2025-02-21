import { Package, RotateCcw, Headset, CreditCard } from "lucide-react";

const ValuePoints = () => {
  const features = [
    {
      icon: <Package size={32} />,
      title: "Free shipping",
      description: "Free Shipping On All Orders Above 2999",
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Warranty Ensured",
      description: "48 Hours Check Warranty",
    },
    {
      icon: <Headset size={32} />,
      title: "Top-notch support",
      description: "Tech Staff Is Always Available.",
    },
    {
      icon: <CreditCard size={32} />,
      title: "COD Payments",
      description: "Cash On Delivery Across Pakistan",
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 px-5 py-7 border-b-2 last:border-b-0 sm:border-b-0 sm:border-r-2 md:last:border-r-0"
          >
            <div className="text-black dark:text-white">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">{feature.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuePoints;
