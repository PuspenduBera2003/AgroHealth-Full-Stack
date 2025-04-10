import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import generateOTP from '../../api/generateOtp';
import updateSignUpInitialized from '../../redux/Auth/Actions/signUpInitialized';
import 'react-toastify/dist/ReactToastify.css';
import InputField from './InputField';
import OTPInput from './OtpInput';
import logo from '../../images/logo.png';
import cropImg from '../../images/paddy-field.jpg';

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const theme = useSelector(state => state.Theme.currentTheme);
    const isAuth = useSelector(state => state.Auth.isAuthenticated);
    const dispatch = useDispatch();
    const signUpInitialized = useSelector(state => state.Auth.signUpInitialized);
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            toast.error("Please agree to terms & conditions", { position: "bottom-right", autoClose: 5000, hideProgressBar: false, theme, transition: Bounce });
            return;
        }
        if (!isValidEmail(credentials.email)) {
            toast.error("Please enter a valid email address", { position: "bottom-right", autoClose: 5000, hideProgressBar: false, theme, transition: Bounce });
            return;
        }
        if (credentials.password !== confirmPassword) {
            toast.error("Password doesn't match", { position: "bottom-right", autoClose: 5000, hideProgressBar: false, theme, transition: Bounce });
            return;
        }

        const signUpPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await generateOTP(credentials);
                if (response.success) {
                    resolve('OTP sent successfully!');
                    dispatch(updateSignUpInitialized({
                        start: true,
                        response: { success: true, serverReplied: true },
                        email: credentials.email,
                        password: credentials.password,
                        username: credentials.username,
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
            pending: 'Sending OTP...',
            success: 'OTP sent successfully! 🎉',
            error: { render({ data }) { return data.message; } },
        }, { position: 'bottom-right', theme });
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
            return;
        }
        return (() => {
            dispatch(updateSignUpInitialized({
                start: false,
                response: { success: false, serverReplied: false },
                email: '',
                password: '',
                username: '',
                token: ''
            }));
        }
        )
    }, [])

    return (
        <div className="flex w-full items-center justify-center relative dark:bg-stone-800 p-2" style={{ minHeight: 'calc(100vh - 56px)' }}>
            {/* <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            /> */}
            <div className="w-full bg-gradient-to-br flex items-center justify-center mx-2">
                <img
                    src={cropImg}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 transition-opacity duration-100 ease-in-out"
                />
                <div className="relative z-10 flex flex-col gap-5 items-center justify-center bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md">
                    <div className="flex flex-row items-center justify-center from-purple-100 via-purple-200 to-purple-300 dark:from-stone-600 dark:via-stone-700 dark:to-stone-800 bg-gradient-to-r rounded-t-lg px-5 py-4 gap-2 w-full">
                        <img src={logo} alt="AgroHealth" className="w-11" />
                        <h2 className="text-2xl font-semibold text-black dark:text-white">AgroHealth</h2>
                    </div>

                    {signUpInitialized.response.success ?
                        <OTPInput prevCredentials={credentials} /> :
                        <div className='flex flex-col items-center gap-4 pb-2 w-full'>
                            <div className="text-xl font-bold text-black dark:text-gray-200">Create your account</div>
                            <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4 px-8">
                                <InputField name="username" placeholder="yourname" label="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                                <InputField name="email" placeholder="you@example.com" label="Email Address" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type="email" />
                                <InputField name="password" placeholder="Enter your password" label="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" />
                                <InputField name="confirmPassword" placeholder="Confirm your password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} className="h-5 w-5 rounded" />
                                    <label className='text-black dark:text-gray-100'>I agree to the terms and conditions</label>
                                </div>
                                <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-lg">Sign Up</button>
                            </form>
                            <div className="text-sm text-center mt-1 pb-3 text-black dark:text-gray-100">
                                Already have an account? <Link to='/auth/signin' className="text-purple-600 dark:text-purple-300 hover:underline">Login</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SignUp;