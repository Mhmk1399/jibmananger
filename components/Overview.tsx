"use client";
import { useState, useEffect } from "react";
import { Users, DollarSign, MessageSquare, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { data, s } from "framer-motion/client";

interface GroupStats {
  memberCount: number;
  totalTransactions: number;
  messageCount: number;
  lastActivity: string;
}

export const Overview = () => {
  const params = useParams();
  const [stats, setStats] = useState<GroupStats>({
    memberCount: 0,
    totalTransactions: 0,
    messageCount: 0,
    lastActivity: "",
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
        
        console.log(data);
        console.log(stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (params.id) {
      fetchStats();
    }
  }, [params.id]);





  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Members</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.memberCount}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalTransactions}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.messageCount}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Activity</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Date(stats.lastActivity).toLocaleDateString()}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
