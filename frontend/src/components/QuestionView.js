import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { useParams } from "react-router-dom";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import Header from "./header/Header";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = () => {
  const [code, setCode] = useState();
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const { questionId } = useParams(); // Get the questionId from the URL parameter
  const [question, setQuestion] = useState(null); // State to store the selected question

  // Function to fetch a specific question by ID
  const fetchQuestionById = async (id) => {
    try {
      const response = await axios.get(`/question/find/${id}`); // Replace with your backend endpoint
      setQuestion(response.data); // Set the question in state
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    if (questionId) {
      fetchQuestionById(questionId); // Fetch the question when questionId changes
    }
  }, [questionId]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key":
          "a4288ae3a1msh179e9f4d34796d0p1d00bajsna89936e98d53",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        if (status === 429) {
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! `,
            10000
          );
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key":
          "a4288ae3a1msh179e9f4d34796d0p1d00bajsna89936e98d53",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!question) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="font-medium text-center">
          <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4"></div>
          <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4"></div>
        </div>
      </div>
    );
    
  }

  return (
    <>
    < Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-300 via-white to-gray-100 h-auto">
        {/* Left Side: Question Display */}
        <div className="lg:w-1/2 p-4 bg-blue-50 text-black  shadow mb-4 lg:mb-0">
          
          <h2 className="text-xl font-semibold mb-2">{question.title}</h2>

          <p className="text-black">{question.question}</p>

          <pre className="bg-gray-300 p-2 mt-4 rounded">
            <code className="text-sm text-gray-900">
               {question.output}
            </code>
          </pre>
          <p className="mt-4">Give it a try!</p>
        </div>

        {/* Right Side: Code Editor and Output */}
        <div className="lg:w-1/2 flex flex-col bg-white">
          {/* Top Bar: Languages Dropdown and Theme Dropdown */}
          <div className="flex p-2">
            <div className="px-4 py-2">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div className="px-4 py-2">
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
          </div>

          {/* Code Editor and Output Section */}
          <div className="flex flex-col space-y-4 p-4">
            {/* Code Editor */}
            <div className="flex-grow lg:max-h-[50vh]">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>

            {/* Custom Input Field */}
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />

            {/* Compile and Execute Button */}
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>

            {/* Output Window */}
            <OutputWindow outputDetails={outputDetails} />

            {/* Output Details */}
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Landing;
