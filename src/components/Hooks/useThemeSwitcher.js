import React, { useEffect, useState } from 'react';

const useThemeSwitcher = () => {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [mode, setMode] = useState("");

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");

        const handleChange = () => {
            let newMode;
            if (userPref) {
                newMode = userPref === "dark" ? "dark" : "light";
            } else {
                newMode = mediaQuery.matches ? "dark" : "light";
                window.localStorage.setItem("theme", newMode);
            }

            setMode(newMode);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const setTheme = (newMode) => {
        window.localStorage.setItem("theme", newMode);
        setMode(newMode);
    };

    return [mode, setTheme];
};

export default useThemeSwitcher;
