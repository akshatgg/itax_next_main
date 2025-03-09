export default function ShippingAndDeliveryPolicy() {
  // Create a new Date object for the current date
  const currentDate = new Date();

  // Format the current date as desired
  const lastUpdated = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white text-justify p-8">
      <h1 className="text-3xl font-bold mb-4">Shipping & Delivery Policy</h1>

      <h2 className="text-xl font-bold mb-2">Last updated on {lastUpdated}</h2>

      <p className="mb-4">
        Shipping is not applicable for our services at iTaxEasy. As we primarily
        provide digital services related to taxation, GST filing, and online
        products, there are no physical shipments involved.
      </p>

      <p className="mb-4">
        Disclaimer: The above content is provided solely for informational
        purposes by iTaxEasy. We take every effort to ensure accuracy, but we
        shall not be liable for any claims or liabilities arising from
        non-adherence to this policy by our users.
      </p>
    </div>
  );
}
