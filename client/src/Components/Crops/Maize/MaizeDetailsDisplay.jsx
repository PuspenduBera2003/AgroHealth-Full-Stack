import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import generateMessage from '../../../api/generateMessage';
import { getMaizeDetails } from '../../../api/getMaizeDetails';
import updateMaizeInitial from '../../../redux/Crops/Actions/maizeDetailsInitial';
import DeleteConfirmation from './DeleteConfirmation';

const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-4 w-96 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-9/12 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded transition-colors duration-200 ease-in-out"></div>
    </div>
);

const MaizeDetailsDisplay = () => {
    const maizeDetails = useSelector((state) => state.Crop.maizeDetails);
    const [loadingIndex, setLoadingIndex] = useState(null); // Track which button is loading
    const [chatMap, setChatMap] = useState({}); // Track chat for each item by index
    const [languageMap, setLanguageMap] = useState({}); // Track selected language for each item
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const theme = useSelector(state => state.Theme.currentTheme);
    const userDetails = useSelector((state) => state.Auth.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetch() {
            if (!userDetails) return;
            const maizeDetails = await getMaizeDetails(userDetails.id);
            dispatch(updateMaizeInitial(maizeDetails.data));
        }
        fetch();
    }, [])

    const handleSendMessage = async (prompt, image, index) => {
        if (!prompt) {
            toast.error("Prompt is missing. Please provide a valid prompt.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                theme,
            });
            return;
        }

        const sendMessagePromise = new Promise(async (resolve, reject) => {
            setLoadingIndex(index);
            try {
                const language = languageMap[index] || 'English'; // Default to English if no language selected
                const response = await generateMessage(
                    `Describe about ${prompt} for maize in short. If possible use tabular data. Give the response in ${language}`,
                    image
                );

                if (response.result) {
                    setChatMap((prev) => ({ ...prev, [index]: response.result }));
                    resolve("Response generated successfully!");
                } else {
                    reject(new Error("Failed to generate a response. Please try again."));
                }
            } catch (error) {
                reject(new Error("An unexpected error occurred. Please try again."));
            } finally {
                setLoadingIndex(null);
            }
        });

        toast.promise(
            sendMessagePromise,
            {
                pending: "Processing your request...",
                success: "Response generated successfully! 🎉",
                error: {
                    render({ data }) {
                        return data.message || "An error occurred while generating the response.";
                    },
                },
            },
            { position: "bottom-right", theme }
        );
    };

    const handleLanguageChange = (index, value) => {
        setLanguageMap((prev) => ({ ...prev, [index]: value }));
    };

    const dateConverter = (isoString) => {
        const date = new Date(isoString);

        const formattedDate = date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Use 24-hour format
        }).replace(",", "");
        return formattedDate;
    }

    console.log(maizeDetails)

    return (
        <div className="space-y-6 p-6">
            {maizeDetails && maizeDetails.length > 0 ? (
                maizeDetails.map((detail, index) => (
                    <div key={index} className="p-4 flex flex-row flex-wrap items-center relative">
                        {
                            openModalIndex === index &&
                            <DeleteConfirmation setModalOpen={() => setOpenModalIndex(null)} image={detail.image} />
                        }
                        <div className={`w-full flex flex-wrap justify-center gap-1 md:gap-4 lg:gap-6 mb-4 rounded-lg overflow-hidden ${openModalIndex === index ? 'opacity-40 pointer-events-none' : ''}`}>
                            <div className="flex flex-wrap gap-6 items-center justify-center h-full">
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60">
                                    <img
                                        src={detail.image}
                                        alt={`Maize Disease Result ${index}`}
                                        className="w-full h-full object-cover rounded-lg hover:opacity-70 transition-opacity duration-300"
                                    />
                                    <button
                                        onClick={() => setOpenModalIndex(index)}
                                        className="absolute top-1 left-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                                        title="Delete"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <div className="text-center text-lg text-gray-800 dark:text-gray-100 transition-colors duration-200 ease-in-out">
                                    <div className="font-bold text-2xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2 px-3 mt-2">
                                        Verdict
                                    </div>
                                    <p>{detail.result}</p>
                                    {/* Language Selector */}
                                    <select
                                        className="m-2 w-40 bg-stone-100 dark:bg-stone-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm custom-dropdown transition-colors duration-200 ease-in-out"
                                        value={languageMap[index] || 'English'}
                                        onChange={(e) => handleLanguageChange(index, e.target.value)}
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">हिंदी</option>
                                        <option value="Bengali">বাংলা</option>
                                        <option value="Gujarati">ગુજરાતી</option>
                                        <option value="Punjabi">ਪੰਜਾਬੀ</option>
                                        <option value="Tamil">தமிழ்</option>
                                        <option value="Telugu">తెలుగు</option>
                                        <option value="Kannada">ಕನ್ನಡ</option>
                                        <option value="Malayalam">മലയാളം</option>
                                        <option value="Marathi">मराठी</option>
                                        <option value="Odia">ଓଡ଼ିଆ</option>
                                        <option value="Urdu">اُردُو</option>
                                        <option value="Assamese">অসমীয়া</option>
                                    </select>
                                    <button
                                        type="button"
                                        className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 transition-colors duration-200 ease-in-out 
                                            ${loadingIndex === index ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => handleSendMessage(detail.result, detail.image, index)}
                                        disabled={loadingIndex === index}>
                                        {loadingIndex === index ? "Loading..." : "Know More"}
                                    </button>
                                    <p className='text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 ease-in-out'>
                                        Uploaded on {dateConverter(detail.timestamp)}
                                    </p>
                                </div>
                            </div>
                            <div className="transition-colors duration-200 ease-in-out text-center text-lg text-gray-800 dark:text-gray-100 max-w-96 markdown">
                                {/* Render Skeleton or Markdown */}
                                {loadingIndex === index ? (
                                    <SkeletonLoader />
                                ) : chatMap[index] ? (
                                    <ReactMarkdown
                                        children={chatMap[index]}
                                        remarkPlugins={[remarkGfm]}
                                        className="prose prose-indigo dark:prose-invert max-w-44 sm:max-w-none"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700 dark:text-gray-300 transition-colors duration-200 ease-in-out">No maize details available.</p>
            )}
        </div>
    );
};

export default MaizeDetailsDisplay;