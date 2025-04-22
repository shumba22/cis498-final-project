export default function BusinessOrdersTab({ orders }) {
  return (
    <div className="space-y-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F8F8F8]">
            <tr>
              {["Date", "Buyer", "Product", "Qty", "Total"].map((label) => (
                <th
                  key={label}
                  className="sticky top-0 px-6 py-3 text-left text-xs font-semibold text-[#666666] uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((o, i) => (
              <tr
                key={o.id}
                className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(o.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {o.buyerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {o.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {o.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${o.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
