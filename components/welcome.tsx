import React from "react";
import Notification from "./notification";

const Welcome = () => {
  return (
    <div
      dir="rtl"
      className="text-right mt-4  p-4 rounded-2xl border-2 border-purple-500 shadow-lg"
    >
        <Notification />
      <h1 className="text-xl font-bold text-purple-400 ">
        به سامانه <br />{" "}
        <strong className="font-extrabold text-2xl text-purple-400">
          {" "}
          جیب منیجر{" "}
        </strong>{" "}
        خوش آمدید ...
      </h1>
      <p className="text-xs text-gray-50 bg-purple-400 p-4 rounded-2xl mt-4">
        تمامی اطلاعات مالی خود را در اینجا ثبت کنید و از آنها به بهترین نحو برای
        مدیریت و برنامه ریزی استفاده کنید.
      </p>
    </div>
  );
};

export default Welcome;
