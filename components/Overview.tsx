"use client";
import { useState, useEffect } from "react";
import { Users, DollarSign } from "lucide-react";
import { useParams } from "next/navigation";
import PieChart from "./pie";

interface GroupOwner {
  _id: string;
  name: string;
  phoneNumber: number;
}

interface GroupMember {
  _id: string;
  name: string;
  phoneNumber: number;
}

interface Transaction {
  amount: number;
  description: string;
  date: string;
  createdBy: string;
  type: "income" | "outcome";
  _id: string;
}

interface GroupInfo {
  _id: string;
  name: string;
  description: string;
  budget: number;
  ownerId: GroupOwner;
  members: GroupMember[];
  transactions: Transaction[];
  messages: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GroupStats {
  memberCount: number;
  totalTransactions: number;
  messageCount: number;
  lastActivity: string;
  groupInfo: GroupInfo;
}

export const Overview = () => {
  const params = useParams();
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [stats, setStats] = useState<GroupStats>({
    memberCount: 0,
    totalTransactions: 0,
    messageCount: 0,
    lastActivity: "",
    groupInfo: {
      _id: "",
      name: "",
      description: "",
      budget: 0,
      ownerId: {
        _id: "",
        name: "",
        phoneNumber: 0,
      },
      members: [],
      transactions: [],
      messages: [],
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/groups/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setStats(data.stats);
        console.log(data, "group data");
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (params.id) {
      fetchStats();
    }
  }, [params.id]);


  useEffect(() => {
    const income = stats.groupInfo.transactions.reduce(
      (sum, transaction) =>
        transaction.type === "income" ? sum + transaction.amount : sum,
      0
    );
    console.log(income, "income");

    const outcome = stats.groupInfo.transactions.reduce(
      (sum, transaction) =>
        transaction.type === "outcome" ? sum + transaction.amount : sum,
      0
    );
    console.log(outcome, "outcome");

    setIncome(income);
    setOutcome(outcome);
  }, [stats.groupInfo.transactions]);

  return (
    <div dir="rtl">
      <PieChart incomes={income} outcomes={outcome} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-12">
        <div className="bg-gradient-to-tl border-2 border-purple-400 from-purple-200 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600">اعضاء</p>
              <p className="text-2xl font-semibold text-gray-700">
                {stats.memberCount}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-tl border-2 mb-20 border-purple-400 from-purple-200 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">تراکنش ها</p>
              <p className="text-2xl font-semibold text-gray-700">
                {stats.groupInfo.transactions.length}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.messageCount}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div> */}

        {/* <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Activity</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Date(stats.lastActivity).toLocaleDateString()}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
