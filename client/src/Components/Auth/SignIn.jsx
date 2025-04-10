import React, { useEffect, useState } from 'react';
import cropImg from '../../images/paddy-field.jpg';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import handleSignInSubmit from '../../api/handleSignInSubmit';
import updateUserDetails from '../../redux/Auth/Actions/userDetails';
import updateIsAuthenticated from '../../redux/Auth/Actions/IsAuthenticated';
import 'react-toastify/dist/ReactToastify.css';

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const SignIn = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
    const theme = useSelector(state => state.Theme.currentTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.Auth.isAuthenticated);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate email
        if (!isValidEmail(credentials.email)) {
            toast.error('Please enter a valid email address', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                theme,
                transition: Bounce,
            });
            return;
        }
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await handleSignInSubmit(credentials);
                    if (response.success) {
                        dispatch(updateUserDetails(response.user));
                        localStorage.setItem('isAuthenticated', true);
                        dispatch(updateIsAuthenticated(true));
                        resolve('Signed in successfully!');
                        navigate('/u/profile');
                    } else {
                        reject(new Error(response.error || 'Sign in failed.'));
                    }
                } catch (error) {
                    reject(new Error('An unexpected error occurred.'));
                }
            }),
            {
                pending: 'Signing in...',
                success: 'Signed in successfully! 🎉',
                error: {
                    render({ data }) {
                        return data.message;
                    },
                },
            }
        );
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
            return;
        }
    }, [isAuth])

    return (
        <div className="relative md:h-screen flex items-center justify-center w-full dark:bg-stone-800 p-2" style={{ minHeight: 'calc(100vh - 75px)' }}>
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
                theme={theme}
                transition={Bounce}
                pauseOnNavigation={false}
            /> */}
            {/* Background Image */}
            <img
                src={cropImg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 transition-opacity duration-100 ease-in-out"
            />

            {/* Form Container */}
            <div className="relative w-full bg-gradient-to-br flex items-center justify-center mx-2">
                <div className="relative z-10 flex flex-col gap-5 items-center justify-center bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md">
                    {/* Header */}
                    <div className="flex flex-row items-center justify-center from-purple-100 via-purple-200 to-purple-300 dark:from-stone-600 dark:via-stone-700 dark:to-stone-800 bg-gradient-to-r rounded-t-lg px-5 py-4 gap-2 w-full">
                        <img src={logo} alt="AgroHealth" className="w-11" />
                        <h2 className="text-2xl font-semibold text-black dark:text-white">
                            AgroHealth
                        </h2>
                    </div>

                    {/* Title */}
                    <div className="text-xl font-bold text-black dark:text-gray-200">
                        Login to your account
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 px-8">
                        {/* Email Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={credentials.email}
                                name='email'
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                className="p-2 rounded-lg bg-white dark:bg-stone-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="p-2 rounded-lg bg-white dark:bg-stone-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className={`h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-stone-400 checked:bg-purple-600 dark:checked:bg-purple-500 checked:border-transparent appearance-none cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-gray-400
        transition-colors duration-300 ease-in-out
        `}
                            />
                            <label htmlFor="rememberMe" className="text-sm font-medium text-black dark:text-white">
                                Remember me
                            </label>
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-colors"
                        >
                            Login
                        </button>
                    </form>

                    {/* Forgot Password Link */}
                    <div className="text-sm text-center mt-2">
                        <a href="#_" className="text-purple-600 dark:text-purple-400 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-sm text-center mt-1 pb-3 text-black dark:text-gray-100">
                        Don't have an account?{" "}
                        <Link to='/auth/signup' href="#_" className="text-purple-600 dark:text-purple-400 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
