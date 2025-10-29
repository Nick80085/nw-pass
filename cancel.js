export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Canceled</h1>
      <p>You can try again anytime.</p>
      <a
        href="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Back to Home
      </a>
    </div>
  );
}
