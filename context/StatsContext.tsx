"use client";

import React, { createContext, useContext, useMemo } from "react";
import sendEntries from "@/sendEntries.json";
import receiveEntries from "@/recieveEntries.json";

interface Stats {
  id: number;
  name: string;
  value: string | number;
  bgColor?: string;
}

interface StatsContextValue {
  stats: Stats[];
  totalEntriesStats: Stats[];
}

const StatsContext = createContext<StatsContextValue | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  // Utility function to calculate fees based on amount
  const calculateFee = (amount: number): number => {
    let fee = 50; // Default fee for amounts ≤ ₹50,000

    // Round amount up to the nearest 10,000 and apply the fee structure
    const roundedAmount = Math.ceil(amount / 10000) * 10000;

    if (roundedAmount <= 50000) {
      fee = 50;
    } else if (roundedAmount <= 60000) {
      fee = 60;
    } else if (roundedAmount <= 70000) {
      fee = 70;
    } else if (roundedAmount <= 80000) {
      fee = 80;
    } else if (roundedAmount <= 90000) {
      fee = 90;
    } else if (roundedAmount <= 100000) {
      fee = 100;
    } else {
      const increment = Math.floor((roundedAmount - 100000) / 10000);
      fee = 100 + increment * 10;
    }

    return fee;
  };

  // Calculate fees and distribute them
  const fees = useMemo(() => {
    let totalSendKT = 0;
    let totalSendHO = 0;
    let totalReceiveKT = 0;

    sendEntries.forEach((entry) => {
      const fee = calculateFee(parseFloat(entry.amount)); // Total fee for the entry
      totalSendKT += (fee * 35) / 100; // KT Fee = 35% of total fee
      totalSendHO += (fee * 65) / 100; // HO Fee = 65% of total fee
    });

    receiveEntries.forEach((entry) => {
      const fee = calculateFee(parseFloat(entry.amount)); // Total fee for the entry
      totalReceiveKT += (fee * 35) / 100; // KT Fee = 35% of total fee
    });

    return {
      totalSendKT,
      totalSendHO,
      totalReceiveKT,
    };
  }, []);

  // Calculate Total Volume
  const totalVolume = useMemo(() => {
    const sendVolume = sendEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.amount),
      0
    );
    const receiveVolume = receiveEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.amount),
      0
    );
    return sendVolume + receiveVolume;
  }, []);

  // Calculate counts for send and receive entries
  const entryCounts = useMemo(() => ({
    sendCount: sendEntries.length,
    receiveCount: receiveEntries.length,
  }), []);

  // Stats for UI
  const stats = useMemo(
    () => [
      { id: 1, name: "24H Volume", value: totalVolume.toLocaleString("en-US") },
      { id: 2, name: "KT Fee", value: (fees.totalSendKT + fees.totalReceiveKT).toFixed(2) },
      { id: 3, name: "HO Fee", value: fees.totalSendHO.toFixed(2) },
    ],
    [totalVolume, fees]
  );

  const totalEntriesStats = useMemo(
    () => [
      {
        id: 4,
        name: "Send Entry",
        value: entryCounts.sendCount,
        bgColor: "bg-green-500",
      },
      {
        id: 5,
        name: "Receive Entry",
        value: entryCounts.receiveCount,
        bgColor: "bg-red-500",
      },
    ],
    [entryCounts]
  );

  return (
    <StatsContext.Provider value={{ stats, totalEntriesStats }}>
      {children}
    </StatsContext.Provider>
  );
};
