"use client";

import { useStats } from "@/context/StatsContext";

export default function Dashboard() {
  const { stats, totalEntriesStats } = useStats();

  return (
    <div className="bg-white p-11 m-11 rounded-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Volume */}
          <div className="bg-gray-100 p-11 rounded-md text-center">
            <dt className="text-base font-semibold text-gray-600">24H Volume</dt>
            <dd className="text-4xl font-bold text-gray-900">{stats[0].value}</dd>
          </div>
          {/* KT Fee and HO Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.slice(1).map((stat) => (
              <div key={stat.id} className="bg-gray-100 p-6 rounded-md text-center">
                <dt className="text-base font-semibold text-gray-600">{stat.name}</dt>
                <dd className="text-3xl font-bold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-8">
          {totalEntriesStats.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} p-9 rounded-md text-center text-white`}
            >
              <dt className="text-base font-semibold">{stat.name}</dt>
              <dd className="text-3xl font-bold">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
