"use client";
import Plan from "@/components/plan";
import Welcome from "@/components/welcome";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-purple-50 p-2">
      {/* <Profile /> */}
      <Welcome />
      {/* <TransactionChart incomes={100000} outcomes={1655553540} /> */}
      <Plan />
    </div>
  );
};

export default Page;
