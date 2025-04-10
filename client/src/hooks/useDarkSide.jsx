import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import toggleTheme from "../redux/theme/Actions/ToggleTheme";

export default function useDarkSide() {

    const dispatch = useDispatch();
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        if (localStorage.theme === "dark") {
            localStorage.removeItem("theme");
            dispatch(toggleTheme(theme))
        }
        else {
            localStorage.setItem("theme", theme);
            dispatch(toggleTheme(theme))
        }
    }, [theme, colorTheme, dispatch]);

    return [colorTheme, setTheme];
}