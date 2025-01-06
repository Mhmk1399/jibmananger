"use client";
import { useState } from "react";
import { use } from "react";
import { Members } from "../../../components/Members";
import Transactions from "../../../components/Transactions";
import { Chat } from "../../../components/Chat";
import { Overview } from "../../../components/Overview";

const GroupDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState(" نمای کلی");

  const renderContent = () => {
    switch (activeTab) {
      case "نمای کلی":
        return <Overview />;
      case "اعضاء":
        return <Members groupId={resolvedParams.id} />;
      case "چت":
        return <Chat groupId={resolvedParams.id} userId={resolvedParams.id} />;
      case "تراکنشها":
        return <Transactions params={resolvedParams} />;

      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-row justify-between w-full">
              {["نمای کلی", "اعضاء", "تراکنشها"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm transition-all duration-500 ease-in-out font-medium ${
                    activeTab === tab
                      ? " bg-purple-500 rounded-lg  text-purple-100"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default GroupDetailsPage;
