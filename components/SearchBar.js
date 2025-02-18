function SearchBar({ onSearch }) {
    return (
        <div className="bg-white p-4 shadow-md" data-name="search-container">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar regras..."
                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        onChange={(e) => onSearch(e.target.value)}
                        data-name="search-input"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
            </div>
        </div>
    );
}
