function RulesCounter({ total }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 mx-auto max-w-7xl" data-name="rules-counter">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                        <i className="fas fa-book-open text-purple-600 text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Total de Regras</h2>
                        <p className="text-gray-600">Base atualizada de regras e diretrizes</p>
                    </div>
                </div>
                <div className="bg-purple-600 px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold text-white">{total}</span>
                </div>
            </div>
        </div>
    );
}
