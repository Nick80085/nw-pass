export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p>Your Word Pass will be sent to your email soon.</p>
      <a
        href="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Back to Home
      </a>
    </div>
  );
}
