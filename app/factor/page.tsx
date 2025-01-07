"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FactorImage {
  fileUrl: string;
  fileName: string;
  _id: string;
  uploadDate: string;
  fileSize: number;
}

const Page = () => {
  const [factorImages, setFactorImages] = useState<FactorImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFactorImages = async () => {
      try {
        const response = await fetch("/api/media", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data, "data images");
          setFactorImages(data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactorImages();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
        <p className="text-gray-500 mt-8 animate-pulse ">
          در حال بارگذاری فاکتورها...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 bg-purple-50"
    >
      {factorImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factorImages.map((image) => (
            <motion.div
              key={image._id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                width={300}
                height={200}
                src={image.fileUrl}
                alt={image.fileName}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-right" dir="rtl">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    تاریخ آپلود:{" "}
                    {new Date(image.uploadDate).toLocaleDateString("fa-IR")}
                  </span>
                  <span>
                    حجم فایل: {(image.fileSize / 1024 / 1024).toFixed(2)}{" "}
                    مگابایت
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[80vh] text-gray-500"
        >
          <svg
            className="w-32 h-32 mb-4 border-b-2 border-purple-500"
            fill="#a855f7 "
            viewBox="0 0 24 24"
            stroke="a855f7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl font-semibold">هیچ فاکتوری موجود نیست</p>
          <p className="text-sm mt-2">لطفا ابتدا فاکتور خود را آپلود کنید</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Page;
