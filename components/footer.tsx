import React from "react";
import Plus from "./plus";

const Footer = () => {
  return (
    /* From Uiverse.io by cf2-exe */
    <div className="flex justify-center items-center relative transition-all duration-[450ms] ease-in-out w-auto h-fit mx-4 mt-[32rem]">
      <article className="border border-solid border-white w-full ease-in-out duration-500 left-0 rounded-2xl h-fit flex shadow-lg shadow-gray-400/70 bg-blue-600 backdrop-blur-md">
        <label
          className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-white rounded-xl"
          htmlFor="dashboard"
        >
          <input
            id="dashboard"
            name="path"
            type="radio"
            className="hidden peer/expand"
          />
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </label>
        <label
          className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
          htmlFor="profile"
        >
          <input
            id="profile"
            name="path"
            type="radio"
            className="hidden peer/expand"
          />
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
          </svg>
        </label>
        <Plus />
        <label
          className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
          htmlFor="help"
        >
          <input
            id="help"
            name="path"
            type="radio"
            className="hidden peer/expand"
          />
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect width="24" height="24" fill="none"></rect>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10H17C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8H7ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H7ZM6.93417 2C6.95604 2 6.97799 2 7 2L17.0658 2C17.9523 1.99995 18.7161 1.99991 19.3278 2.08215C19.9833 2.17028 20.6117 2.36902 21.1213 2.87868C21.631 3.38835 21.8297 4.0167 21.9179 4.67221C22.0001 5.28388 22.0001 6.0477 22 6.9342V13.0658C22.0001 13.9523 22.0001 14.7161 21.9179 15.3278C21.8297 15.9833 21.631 16.6117 21.1213 17.1213C20.6117 17.631 19.9833 17.8297 19.3278 17.9179C18.7161 18.0001 17.9523 18.0001 17.0658 18L15.0543 18L12.984 21.3124C12.5295 22.0396 11.4705 22.0396 11.016 21.3124L8.94576 18L6.9342 18C6.0477 18.0001 5.28388 18.0001 4.67221 17.9179C4.0167 17.8297 3.38835 17.631 2.87868 17.1213C2.36902 16.6117 2.17028 15.9833 2.08215 15.3278C1.99991 14.7161 1.99995 13.9523 2 13.0658L2 7C2 6.97799 2 6.95604 2 6.93417C1.99995 6.04769 1.99991 5.28387 2.08215 4.67221C2.17028 4.0167 2.36902 3.38835 2.87868 2.87868C3.38835 2.36902 4.0167 2.17028 4.67221 2.08215C5.28387 1.99991 6.04769 1.99995 6.93417 2Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </label>
        <label
          className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
          htmlFor="settings"
        >
          <input
            id="settings"
            name="path"
            type="radio"
            className="hidden peer/expand"
          />
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7 14C10.623 14 9.74999 13.1046 9.74999 12C9.74999 10.8954 10.623 10 11.7 10C12.7769 10 13.65 10.8954 13.65 12C13.65 12.5304 13.4445 13.0391 13.0789 13.4142C12.7132 13.7893 12.2172 14 11.7 14Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.8841 16.063V14.721C16.8841 14.3887 17.0128 14.07 17.2419 13.835L18.1672 12.886C18.6443 12.3967 18.6443 11.6033 18.1672 11.114L17.2419 10.165C17.0128 9.93001 16.8841 9.61131 16.8841 9.27899V7.93599C16.8841 7.24398 16.3371 6.68299 15.6624 6.68299H14.353C14.029 6.68299 13.7182 6.55097 13.4891 6.31599L12.5638 5.36699C12.0867 4.87767 11.3132 4.87767 10.8361 5.36699L9.91087 6.31599C9.68176 6.55097 9.37102 6.68299 9.04702 6.68299H7.73759C7.41341 6.68299 7.10253 6.81514 6.87339 7.05034C6.64425 7.28554 6.51566 7.6045 6.51592 7.93699V9.27899C6.51591 9.61131 6.3872 9.93001 6.15809 10.165L5.23282 11.114C4.75573 11.6033 4.75573 12.3967 5.23282 12.886L6.15809 13.835C6.3872 14.07 6.51591 14.3887 6.51592 14.721V16.063C6.51592 16.755 7.06288 17.316 7.73759 17.316H9.04702C9.37102 17.316 9.68176 17.448 9.91087 17.683L10.8361 18.632C11.3132 19.1213 12.0867 19.1213 12.5638 18.632L13.4891 17.683C13.7182 17.448 14.029 17.316 14.353 17.316H15.6614C15.9856 17.3163 16.2966 17.1844 16.5259 16.9493C16.7552 16.7143 16.8841 16.3955 16.8841 16.063Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </label>
      </article>
    </div>
  );
};

export default Footer;
