"use client";
import TransactionChart from "@/components/circle";
import Plan from "@/components/plan";
import Profile from "@/components/profile";
import Welcome from "@/components/welcome";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-purple-50 p-2">
      <Profile />
      <Welcome />
      <TransactionChart incomes={[]} outcomes={[]} />
      <Plan />
    </div>
  );
};

export default page;
