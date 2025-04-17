export default function BusinessOrdersTab({ orders }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Sales</h2>
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Buyer</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Qty</th>
            <th className="p-3 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">{new Date(o.orderDate).toLocaleDateString()}</td>
              <td className="p-3">{o.buyerName}</td>
              <td className="p-3">{o.productName}</td>
              <td className="p-3">{o.quantity}</td>
              <td className="p-3">${o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}