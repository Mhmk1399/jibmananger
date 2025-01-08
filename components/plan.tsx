"use client";
import { useEffect, useState, useCallback } from "react";
import TransactionList from "../components/transactionList";
import TransactionChart from "./circle";
import moment from "moment-jalaali";
interface Transaction {
  amount: number;
  description: string;
  category?: {
    name: string;
    color: string;
  }
  date: Date;
  user:{
    _id: string;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    profilePicture: string;
    birthdate: string;
    gender: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    bank: {
      _id: string;
      name: string;
      cardNumber: string;
      cvv2: string;
      expiryDate: string;
      shabaNumber: string;
      AccountBalance: number;
    }
    recipient: {
      _id: string;
      name: string;
      phoneNumber: string;
    }
  }
  recipient?: {
    _id: string;
    name: string;
    phoneNumber: string;
  }
  bank?: {
    _id: string;
    name: string;
    cardNumber: string;
    cvv2: string;
    expiryDate: string;
    shabaNumber: string;
    AccountBalance: number;
  }
}

const Plan: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState({
    incomes: Array(12).fill(0),
    outcomes: Array(12).fill(0)
  });

  const processTransactions = (transactions: Transaction[], type: string) => {
    const monthlyTotals = Array(12).fill(0);
    console.log(type);
    
    transactions.forEach(transaction => {
      const jalaliDate = moment(transaction.date);
      const month = jalaliDate.jMonth();
      monthlyTotals[month] += transaction.amount;
    });
      
    return monthlyTotals;
  };

  const fetchTransactions = useCallback(async () => {
    try {
      const [incomesResponse, outcomesResponse] = await Promise.all([
        fetch('/api/transactions/incomes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch('/api/transactions/outcomes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      ]);
  
      if (!incomesResponse.ok || !outcomesResponse.ok) {
        throw new Error('Failed to fetch transactions');
      }
  
      const incomesData = await incomesResponse.json();
      const outcomesData = await outcomesResponse.json();
  
      setMonthlyData({
        incomes: processTransactions(incomesData, 'incomes'),
        outcomes: processTransactions(outcomesData, 'outcomes')
      });
  
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, []);
  

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  

  return (
    <>
      <div className="flex flex-row p-6 max-w-4xl gap-2 mx-auto w-full" dir="rtl">
        <TransactionChart 
          incomes={monthlyData.incomes} 
          outcomes={monthlyData.outcomes} 
        />
      </div>
      <div className="space-y-4">
        <div id="income-list">
          <TransactionList type="incomes" />
        </div>
        <div id="outcome-list">
          <TransactionList type="outcomes" />
        </div>
      </div>
    </>
  );
};

export default Plan;
