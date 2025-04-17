// components/dashboard/orders-tab.js
import { FiDownload, FiExternalLink } from "react-icons/fi";

export default function OrdersTab({ orders }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't made any purchases yet.</p>
        <a
          href="/products"
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-md font-medium text-gray-500">
            <th className="text-left py-3 px-2">
              Order ID
            </th>
            <th className="text-left py-3 px-2">
              Date
            </th>
            <th className="text-left py-3 px-2">
              Amount
            </th>
            <th className="text-left py-3 px-2">
              Status
            </th>
            <th className="text-left py-3 px-2">
              Items
            </th>
            <th className="text-right py-3 px-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50 text-gray-600"
            >
              <td className="py-3 px-2 text-sm font-medium">
                #{order.id.substring(0, 8)}
              </td>
              <td className="py-3 px-2 text-md text-gray-600">
                {formatDate(order.orderDate)}
              </td>
              <td className="py-3 px-2 text-md font-medium text-gray-600">
                ${Number(order.amount).toFixed(2)}
              </td>
              <td className="py-3 px-2">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.paymentStatus === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="py-3 px-2 text-sm text-gray-600">
                {order.orderItems.length} items
              </td>
              <td className="py-3 px-2 text-right">
                <a
                  href={`/orders/${order.id}`}
                  className="text-indigo-600 hover:text-indigo-800 transition mr-3"
                >
                  <FiExternalLink className="inline-block" />
                </a>
                {order.paymentStatus === "COMPLETED" && (
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <FiDownload className="inline-block" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
