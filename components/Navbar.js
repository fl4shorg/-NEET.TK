function Navbar({ toggleDarkMode, isDarkMode }) {
    return (
        <nav className="bg-purple-600 p-6 shadow-lg" data-name="navbar">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="logo-container" data-name="logo-container">
                    <img src="https://i.imgur.com/nTqoKxv.png" alt="Logo" className="w-12 h-12 rounded-full" />
                </div>
                <div className="text-white text-3xl font-extrabold" data-name="title">Regras</div>
                <button onClick={toggleDarkMode} className="text-white" data-name="dark-mode-toggle">
                    <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>
        </nav>
    );
}
