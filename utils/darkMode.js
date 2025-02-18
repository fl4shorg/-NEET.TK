function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = React.useState(
        localStorage.getItem("dark-mode") === "enabled"
    );

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}
