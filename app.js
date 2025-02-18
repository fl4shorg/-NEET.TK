function App() {
    const [rules, setRules] = React.useState([]);
    const [filteredRules, setFilteredRules] = React.useState([]);
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    React.useEffect(() => {
        const loadRules = async () => {
            try {
                const data = await fetchRules();
                setRules(data);
                setFilteredRules(data);
            } catch (error) {
                reportError(error);
            }
        };
        loadRules();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = rules.filter(rule =>
            rule.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRules(filtered);
    };

    return (
        <div data-name="app">
            <Navbar 
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                isDarkMode={isDarkMode}
            />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <RulesCounter total={rules.length} />
                <SearchBar onSearch={handleSearch} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" data-name="cards-container">
                    {filteredRules.map((rule) => (
                        <Card
                            key={rule.id}
                            title={rule.title}
                            description={rule.description}
                            paragraphs={rule.paragraphs}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
