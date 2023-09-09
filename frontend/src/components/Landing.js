import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
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
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
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
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);

                    showErrorToast(
                        `Quota of 100 requests exceeded for the Day! `,
                        10000
                    );
                }
                setProcessing(false);
                console.log("catch block...", error);
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

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast(`Compiled Successfully!`);
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
        }
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

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

    return (
        <>
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

            <a
                href="https://github.com/manuarora700/react-code-editor"
                title="Fork me on GitHub"
                class="github-corner"
                target="_blank"
                rel="noreferrer"
            >
                <svg
                    width="50"
                    height="50"
                    viewBox="0 0 250 250"
                    className="relative z-20 h-20 w-20"
                >
                    <title>Fork me on GitHub</title>
                    <path d="M0 0h250v250"></path>
                    <path
                        d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2"
                        fill="currentColor"
                        style={{ transformOrigin: "130px 110px" }}
                        class="octo-arm"
                    ></path>
                    <path
                        d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z"
                        fill="currentColor"
                        class="octo-body"
                    ></path>
                </svg>
            </a>

            <div className="flex flex-col lg:flex-row bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-screen">
                {/* Left Side: Question Display */}
                <div className="lg:w-1/2 p-4 bg-black text-white rounded shadow mb-4 lg:mb-0">
                    {/* Your question content and lead code display here */}
                    <h2 className="text-xl font-semibold mb-2">
                        Problem: Binary Search Implementation
                    </h2>
                    <p className="text-gray-300">
                        You are given a sorted array <code>arr</code> of
                        integers in ascending order.
                    </p>
                    <p className="text-gray-300">
                        Write a JavaScript function <code>binarySearch</code>{" "}
                        that takes an array <code>arr</code>
                        and a target integer <code>target</code> as input and
                        returns the index of the target integer in the array if
                        it is present. If the target is not found in the array,
                        return <code>false</code>.
                    </p>
                    <p className="text-gray-300">
                        Implement the <code>binarySearch</code> function and use
                        the provided helper function
                        <code>binarySearchHelper</code> to perform the binary
                        search recursively.
                    </p>
                    <pre className="bg-gray-100 p-2 mt-4 rounded">
                        <code className="text-sm text-gray-900">
                            {/* Example code related to the question */}
                            function solveProblem(input){" "}
                            {
                                // Your code here
                            }
                        </code>
                    </pre>
                    <p className="mt-4">Give it a try!</p>
                </div>

                {/* Right Side: Code Editor and Output */}
                <div className="lg:w-1/2 flex flex-col bg-gray-100">
                    {/* Top Bar: Languages Dropdown and Theme Dropdown */}
                    <div className="flex p-2">
                        <div className="px-4 py-2">
                            <LanguagesDropdown
                                onSelectChange={onSelectChange}
                            />
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
                                "bg-gradient-to-r from-teal-300 to-purple-500 hover:from-teal-400 hover:to-purple-600 text-white font-bold py-2 px-4 rounded shadow",
                                !code ? "opacity-50" : ""
                            )}
                        >
                            {processing
                                ? "Processing..."
                                : "Compile and Execute"}
                        </button>

                        {/* Output Window */}
                        <OutputWindow outputDetails={outputDetails} />

                        {/* Output Details */}
                        {outputDetails && (
                            <OutputDetails outputDetails={outputDetails} />
                        )}
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
};
export default Landing;
