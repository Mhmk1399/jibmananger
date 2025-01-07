"use client";
import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}
interface FormErrors {
  name?: string;
  phoneNumber?: string;
}

export const Members = ({ groupId }: { groupId: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [newMemberData, setNewMemberData] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (newMemberData.name.length < 3) {
      newErrors.name = "نام باید حداقل ۳ کاراکتر باشد";
    }

    // Phone validation
    if (!newMemberData.phoneNumber.match(/^09[0-9]{9}$/)) {
      newErrors.phoneNumber = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setMembers(data.stats.groupInfo.members);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMemberData),
      });
      const data = await response.json();

      if (data.success) {
        await fetchMembers();
        toast.success("اعضا با موفقیت اضافه شدند");
        setShowAddMemberModal(false);
        setNewMemberData({ name: "", phoneNumber: "" });
        setErrors({});
      }
    } catch (error) {
      toast.error("خطا در افزودن اعضا");
      console.error("Error adding member:", error);
    }
  };

  return (
    <div dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">اعضاء</h2>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          اضافه کردن اعضا
          <UserPlus size={20} />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg border-2 border-purple-300 shadow-lg">
        <ul className="divide-y divide-gray-200">
          {members.map((member) => (
            <li
              key={member._id}
              className="px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-purple-700">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.phoneNumber}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAddMemberModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white/20 backdrop-blur-sm mx-4 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl text-purple-100 font-bold mb-4">
              اضافه کردن اعضا به گروه
            </h2>
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-gray-100 mb-2">نام :</label>
                <input
                  type="text"
                  value={newMemberData.name}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-100 mb-2">شماره تماس :</label>
                <input
                  type="text"
                  value={newMemberData.phoneNumber}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 text-red-50 transition-all duration-200 ease-in-out  bg-red-400 rounded-lg hover:text-gray-800"
                >
                  بستن
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 transition-all duration-200 ease-in-out text-white rounded-lg hover:bg-purple-700"
                >
                  اضافه کردن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
