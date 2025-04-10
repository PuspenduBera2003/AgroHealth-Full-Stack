import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import generateOTP from '../../api/generateOtp';
import updateSignUpInitialized from '../../redux/Auth/Actions/signUpInitialized';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import handleSignUpSubmit from '../../api/handleSignUpSubmit';
import updateUserDetails from '../../redux/Auth/Actions/userDetails';
import updateIsAuthenticated from '../../redux/Auth/Actions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ prevCredentials }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.Theme.currentTheme);
    const navigate = useNavigate();

    const signUpInitialized = useSelector(state => state.Auth.signUpInitialized);
    console.log(signUpInitialized);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        const newOtp = pastedData.split("");
        setOtp([...newOtp, "", "", "", ""].slice(0, 4));
        const lastIndex = Math.min(pastedData.length - 1, 3);
        inputRefs.current[lastIndex].focus();
    };

    const handleOtpSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 4) {
            // Perform OTP submission or validation here
            const credentials = { ...prevCredentials, token: signUpInitialized.token }
            const signUpPromise = new Promise(async (resolve, reject) => {
                try {
                    const response = await handleSignUpSubmit(credentials, otpValue);
                    if (response.success) {
                        resolve('User registered successfully!');
                        dispatch(updateUserDetails(response.user));
                        localStorage.setItem('isAuthenticated', true);
                        dispatch(updateIsAuthenticated(true));
                        navigate('/u/profile');
                    } else {
                        reject(new Error(response.error || 'Failed to send OTP. Please try again.'));
                    }
                } catch (error) {
                    reject(new Error('An unexpected error occurred. Please try again.'));
                }
            });
            toast.promise(signUpPromise, {
                pending: 'Signing you up...',
                success: 'Registered with AgroHealth successfully! 🎉',
                error: { render({ data }) { return data.message; } },
            }, { position: 'bottom-right', theme });
        } else {
            toast.error('Please enter the full OTP.');
        }
    };


    const handleResend = () => {
        const signUpPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await generateOTP(prevCredentials);
                if (response.success) {
                    resolve('OTP sent successfully!');
                    dispatch(updateSignUpInitialized({
                        start: true,
                        response: { success: true, serverReplied: true },
                        email: prevCredentials.email,
                        password: prevCredentials.password,
                        username: prevCredentials.username,
                        token: response.token
                    }));
                } else {
                    reject(new Error(response.error || 'Failed to send OTP. Please try again.'));
                }
            } catch (error) {
                reject(new Error('An unexpected error occurred. Please try again.'));
            }
        });

        toast.promise(signUpPromise, {
            pending: 'Resending OTP...',
            success: 'OTP sent successfully! 🎉',
            error: { render({ data }) { return data.message; } },
        }, { position: 'bottom-right', theme });
    }

    return (
        <div className="flex flex-col items-center gap-4 p-2 pb-4">
            <div className="text-xl font-bold text-black dark:text-gray-200">Submit OTP</div>
            <div className="flex gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl font-semibold border rounded-md bg-white dark:bg-stone-800 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                ))}
            </div>
            <div className='flex flex-row gap-2'>
                <p className="text-black text-sm dark:text-gray-100">
                    Didn't receive the code?
                </p>
                <p onClick={handleResend} className='text-purple-600 dark:text-purple-300 text-sm cursor-pointer hover:underline'>
                    Resend OTP
                </p>
            </div>
            <button onClick={handleOtpSubmit} className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700">Submit</button>
        </div>
    );
};

export default OTPInput;