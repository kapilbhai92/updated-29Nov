'use client';

import { useState, useEffect } from 'react';

export default function RecievePage() {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    amount: '',
    receiver: '',
    city: '',
    hoFee: '',
    ownerFee: '',
    receiverMobile: '',
    depositor: '',
    depositorMobile: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch data on component load
  useEffect(() => {
    fetch('/api/rdata')
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Add a timestamp to the form data
    const timestamp = new Date().toISOString();

    const formDataWithTimestamp = { ...formData, timestamp };

    const res = await fetch('/api/rdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataWithTimestamp),
    });

    if (res.ok) {
      const newData = await res.json();
      // Prepend the new entry to the beginning of the data array
      setData((prev) => [newData.data, ...prev]);
      setFormData({
        amount: '',
        receiver: '',
        city: '',
        hoFee: '',
        ownerFee: '',
        receiverMobile: '',
        depositor: '',
        depositorMobile: '',
      });
    } else {
      console.error('Failed to add data');
    }

    setLoading(false);
  };



  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Reciever Data</h1>

      <div className="flex gap-8">
        {/* Form Section */}
        <div className="w-1/2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="amount"
              type="number"
              placeholder="Amount in Rupees"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="receiver"
              type="text"
              placeholder="Receiver Name"
              value={formData.receiver}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="hoFee"
              type="number"
              placeholder="HO Fee"
              value={formData.hoFee}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="ownerFee"
              type="number"
              placeholder="Owner Fee"
              value={formData.ownerFee}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="receiverMobile"
              type="text"
              placeholder="Receiver Mobile Number"
              value={formData.receiverMobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="depositor"
              type="text"
              placeholder="Depositor Name"
              value={formData.depositor}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <input
              name="depositorMobile"
              type="text"
              placeholder="Depositor Mobile Number"
              value={formData.depositorMobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-900"
            />
            <button
              type="submit"
              className={`w-full px-4 py-3 font-semibold text-white rounded-lg shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Submit'}
            </button>
          </form>

        </div>

        {/* Data Display Section */}
        <div className="w-1/2">
          {data.length > 0 ? (
            <ul className="space-y-4">
              {data.map((item, index) => (
                <li
                  key={item.id}
                  className={`p-4 border border-gray-300 rounded-lg shadow-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                    }`}
                >
                  <p className="text-2xl mb-3 font-bold text-gray-900">
                    {item.entryNumber}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">Amount:</span> {item.amount} INR
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">Receiver:</span> {item.receiver} ({item.receiverMobile})
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">City:</span> {item.city}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">HO Fee:</span> {item.hoFee} INR
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">Owner Fee:</span> {item.ownerFee} INR
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    <span className="font-bold">Depositor:</span> {item.depositor} ({item.depositorMobile})
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-bold">Timestamp:</span> {new Date(item.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-700 text-lg">No data available.</p>
          )}
        </div>


      </div>
    </div>
  );
}
