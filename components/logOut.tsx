import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/getOneUser", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        // Remove the token from local storage
        localStorage.removeItem("token");
        toast.success("با موفقیت خارج شدید", {
          style: {
            direction: "rtl",
            backgroundColor: "#10B981",
            color: "white",
          },
        });
        // Redirect to login page
        router.replace("/register");
      } else if (response.status === 401) {
        // Token not found or invalid
        toast.error("توکن یافت نشد، لطفا دوباره وارد شوید", {
          style: {
            direction: "rtl",
            backgroundColor: "#EF4444",
            color: "white",
          },
        });
        // Redirect to login page
        window.location.href = "/login";
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("خطا در خروج از حساب کاربری", {
        style: {
          direction: "rtl",
          backgroundColor: "#EF4444",
          color: "white",
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white/20 backdrop-blur-md rounded-lg p-6 w-80 max-w-[90%] mx-4"
        dir="rtl"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-100 border-b border-white pb-2">
          خروج از حساب کاربری
        </h2>
        <p className="text-gray-200 mb-6">
          آیا مطمئن هستید که می‌خواهید خارج شوید؟
        </p>
        <div className="flex justify-start gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-500 text-gray-100 hover:bg-purple-800 rounded-md"
          >
            انصراف
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-800"
          >
            خروج
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogoutModal;
