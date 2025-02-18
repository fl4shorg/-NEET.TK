function Card({ title, description, paragraphs }) {
    const [showToast, setShowToast] = React.useState(false);
    const [showGallery, setShowGallery] = React.useState(false);

    const getIcon = (title) => {
        const icons = {
            "Proibido": "fa-ban text-red-500",
            "Aviso": "fa-exclamation-triangle text-yellow-500",
            "Recomendação": "fa-lightbulb text-blue-500",
            "Importante": "fa-info-circle text-green-500",
            "Dúvidas": "fa-question-circle text-purple-500"
        };
        return icons[title] || "fa-clipboard-list text-gray-500";
    };

    const copyContent = async () => {
        try {
            const content = `${title}\n${description}\n${paragraphs.join('\n')}`;
            await navigator.clipboard.writeText(content);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="relative" data-name="card-wrapper">
            {showToast && (
                <div className="toast fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg" data-name="toast">
                    Copiado com sucesso!
                </div>
            )}
            
            <div className="card bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 hover:border-purple-500 transition-all duration-300" data-name="card">
                <div className="border-b-2 border-gray-200 bg-gradient-to-r from-purple-500 to-purple-700 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white p-2 rounded-full">
                                <i className={`fas ${getIcon(title)} text-2xl`}></i>
                            </div>
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setShowGallery(true)}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-300"
                                title="Ver cards"
                                data-name="gallery-button"
                            >
                                <i className="fas fa-images"></i>
                            </button>
                            <button 
                                onClick={copyContent}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-300"
                                title="Copiar conteúdo"
                                data-name="copy-button"
                            >
                                <i className="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-start space-x-3 mb-6">
                        <div className="bg-purple-100 p-2 rounded-full mt-1">
                            <i className="fas fa-align-left text-purple-600"></i>
                        </div>
                        <p className="text-gray-700">{description}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <i className="fas fa-list-ul text-purple-600"></i>
                            <h3 className="font-semibold text-gray-800">Parágrafos</h3>
                        </div>
                        {paragraphs.map((paragraph, index) => (
                            <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <span className="text-sm font-bold text-purple-600">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className="text-gray-700">{paragraph}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showGallery && (
                <CardGallery onClose={() => setShowGallery(false)} />
            )}
        </div>
    );
}

function CardGallery({ onClose }) {
    const cards = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" data-name="gallery-modal">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-500 to-purple-700">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-full">
                            <i className="fas fa-images text-purple-600"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white">Galeria de Cards</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200"
                        data-name="close-gallery"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cards.map((num) => (
                            <div key={num} className="group relative rounded-lg overflow-hidden shadow-lg" data-name={`card-${num}`}>
                                <img 
                                    src={`cards/card${num}.jpg`} 
                                    alt={`Card ${num}`}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <a 
                                            href={`cards/card${num}.jpg`}
                                            download={`card${num}.jpg`}
                                            className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-50 transition-colors duration-300"
                                            data-name={`download-${num}`}
                                        >
                                            <i className="fas fa-download"></i>
                                            <span>Download</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
