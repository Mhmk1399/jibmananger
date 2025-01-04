"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UpdateProfileModal from "./updateProfile";
import LogoutModal from "./logOut";

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className="flex flex-row-reverse items-center justify-between w-full h-16 px-4 bg-purple-500 shadow-md">
      <div className="flex flex-col font-medium items-end justify-end h-fit w-full relative mt-2">
        <div className="relative" ref={dropdownRef}>
          <motion.div
            className="flex items-center justify-center mx-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gray-100 text-xs font-bold mr-3">
              نام پنل کاربری
            </span>
            <div className="w-8 h-10 overflow-hidden rounded-full">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                alt="profile"
                src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              />
            </div>
            <motion.svg
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-4 h-4 ml-1"
              fill="#ffffff"
              //   stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-4 w-48 bg-purple-600 rounded-2xl shadow-lg z-10 backdrop-blur-sm bg-white/90"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6", color: "#111827" }}
                  className="block px-4 py-2 text-right rounded-2xl text-sm text-gray-100 w-full"
                  onClick={() => setIsUpdateModalOpen(true)}
                >
                  بروزرسانی پروفایل
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6", color: "#111827" }}
                  className="block px-4 py-2 text-sm rounded-2xl text-gray-100 w-full text-right"
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  خروج
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div
        className="w-full text-[0.7rem] font-bold mt-2 rounded-md flex text-gray-200 items-start justify-end"
        dir="rtl"
      >
        {mounted
          ? new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              //   second: '2-digit',
            }).format(currentDateTime)
          : null}
      </div>
      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {}}
      />
    </section>
  );
};

export default Profile;
