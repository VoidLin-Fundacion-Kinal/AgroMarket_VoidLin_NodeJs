import { useState } from "react";
import { useInvoices } from "../../shared/hooks/useInvoices";

export const Invoices = () => {
  const { allInvoices } = useInvoices();
  const [openItems, setOpenItems] = useState(false);
  const [items, setItems] = useState([]);

  const handleItems = () => {
    setOpenItems(!openItems);
  };
  

  const handleViewCart = (invoice) => {
    // Acceso corregido según tu estructura de datos real
    const cartItems = invoice.cart?.items || [];
    setItems(cartItems);
    setOpenItems(true);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
          <thead className="text-gray-800 uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Products</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((invoice) => (
              <tr key={invoice._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{invoice.user?.email || "No email"}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleViewCart(invoice)}
                    className="text-blue-600 hover:underline"
                  >
                    Ver productos ({invoice.cart?.items?.length || 0})
                  </button>
                </td>
                <td className="px-6 py-4">Q{invoice.total?.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(invoice.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openItems && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-70"
              onClick={handleItems}
            ></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-3xl shadow-xl z-10 overflow-y-auto max-h-[80vh]">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
                onClick={handleItems}
                aria-label="Cerrar modal"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Productos del Registro
              </h2>

              <div className="space-y-6">
                {items.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No hay productos en esta factura.
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item._id || item.product?._id}
                      className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
                    >
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {item.product?.name || "Producto sin nombre"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <strong>Cantidad:</strong> {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <strong>Precio unitario:</strong> Q{item.product?.price?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">
                        <strong>Subtotal:</strong> Q{(
                          item.quantity * (item.product?.price || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};