import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("با موفقیت خارج شدید", {
          style: {
            direction: "rtl",
            backgroundColor: "#10B981",
            color: "white",
          },
        });
        // Redirect to login page or home
        window.location.href = "/login";
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
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
