import React, { useRef, useEffect, useState } from 'react';
import { toast } from "sonner";
import { 
  Pencil, Eraser, Paintbrush, Highlighter, 
  ChevronDown, CircleDashed, X, Send, Trash2, Brush
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ColorPickerCircle component
const ColorPickerCircle = ({ color, isActive, onClick }: { color: string, isActive: boolean, onClick: () => void }) => (
  <div 
    className={`color-option ${isActive ? 'active' : ''}`} 
    style={{ backgroundColor: color }} 
    onClick={onClick}
  />
);

// BgOption component for background options
const BgOption = ({ color, pattern, isActive, onClick }: { color: string, pattern?: string, isActive: boolean, onClick: () => void }) => (
  <div 
    className={`bg-option ${isActive ? 'active' : ''}`} 
    style={{ 
      backgroundColor: color,
      backgroundImage: pattern ? `url(${pattern})` : undefined,
      backgroundSize: 'cover'
    }} 
    onClick={onClick}
  />
);

// Tool button component
const ToolButton = ({ 
  icon, 
  isActive, 
  onClick,
  tooltip
}: { 
  icon: React.ReactNode, 
  isActive: boolean, 
  onClick: () => void,
  tooltip: string
}) => (
  <Button
    variant={isActive ? "default" : "outline"}
    size="icon"
    className={`brush-option ${isActive ? 'active' : ''}`}
    onClick={onClick}
    title={tooltip}
  >
    {icon}
  </Button>
);

// Define types for brush tool and background
type BrushTool = 'pencil' | 'paintbrush' | 'highlighter' | 'spray' | 'eraser';
type BackgroundOption = {
  name: string;
  color: string;
  pattern?: string;
};

// Drawing Canvas component
const DrawingCanvas = () => {
  // Canvas and drawing state management
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<BrushTool>('pencil');
  const [color, setColor] = useState('#9b87f5'); // Default purple
  const [brushSize, setBrushSize] = useState(5);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    drawingTitle: string;
  }>({
    name: '',
    drawingTitle: ''
  });
  
  // Background options
  const backgroundOptions: BackgroundOption[] = [
    { name: 'Branco', color: '#ffffff' },
    { name: 'Bege', color: '#F5F5DC' },
    { name: 'Cinza claro', color: '#f0f0f0' },
    { name: 'Azul claro', color: '#e6f7ff' },
    { name: 'Verde claro', color: '#e6fff0' },
    { name: 'Rosa claro', color: '#fff0f5' },
    { name: 'Xadrez', color: '#f8f8f8', pattern: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjhmOGY4Ii8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y4ZjhmOCIvPjwvc3ZnPg==' },
    { name: 'Linhas', color: '#ffffff', pattern: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+' },
    { name: 'Pontos', color: '#ffffff', pattern: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjEuNSIgZmlsbD0iI2UwZTBlMCIvPjwvcGF0dGVybjx1L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==' }
  ];
  
  const [currentBackground, setCurrentBackground] = useState<BackgroundOption>(backgroundOptions[0]);
  
  // Color palette
  const colorPalette = [
    '#000000', // Black
    '#FFFFFF', // White
    '#9b87f5', // Purple (primary)
    '#FF0000', // Red
    '#FF8000', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#00FFFF', // Cyan
    '#0000FF', // Blue
    '#8000FF', // Violet
    '#FF00FF', // Magenta
    '#FF0080', // Pink
    '#804000', // Brown
    '#808080', // Gray
    '#C0C0C0', // Silver
    '#E6E6E6', // Light Gray
  ];

  // Initialize canvas on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientWidth * 0.75; // 4:3 aspect ratio
      
      // Initialize or restore context
      const context = canvas.getContext('2d');
      if (!context) return;
      
      contextRef.current = context;
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      
      // Fill with initial background
      applyBackground(currentBackground);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Apply background effect
  const applyBackground = (bg: BackgroundOption) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    // Save current drawing
    const savedImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Clear canvas and fill with background
    context.fillStyle = bg.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add pattern if specified
    if (bg.pattern) {
      const img = new Image();
      img.onload = () => {
        const pattern = context.createPattern(img, 'repeat');
        if (pattern) {
          context.fillStyle = pattern;
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          // Restore drawing on top of new background
          context.putImageData(savedImageData, 0, 0);
        }
      };
      img.src = bg.pattern;
    } else {
      // Restore drawing on top of plain background
      context.putImageData(savedImageData, 0, 0);
    }
    
    setCurrentBackground(bg);
  };

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    context.beginPath();
    context.moveTo(x, y);
    
    if (currentTool === 'spray') {
      spraySplatter(x, y);
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    
    const context = contextRef.current;
    if (!context) return;
    
    context.closePath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    let x, y;
    
    if ('touches' in e) {
      // Prevent scrolling while drawing
      e.preventDefault();
      
      // Touch event
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    switch (currentTool) {
      case 'pencil':
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = color;
        context.globalAlpha = 1;
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
        break;
        
      case 'paintbrush':
        context.lineWidth = brushSize * 1.5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = color;
        context.globalAlpha = 0.8;
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
        break;
        
      case 'highlighter':
        context.lineWidth = brushSize * 2;
        context.lineCap = 'square';
        context.lineJoin = 'bevel';
        context.strokeStyle = color;
        context.globalAlpha = 0.3;
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
        break;
        
      case 'spray':
        context.globalAlpha = 0.8;
        spraySplatter(x, y);
        break;
        
      case 'eraser':
        context.lineWidth = brushSize * 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = currentBackground.color;
        context.globalAlpha = 1;
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
        break;
    }
  };

  // Create spray paint effect
  const spraySplatter = (x: number, y: number) => {
    const context = contextRef.current;
    if (!context) return;
    
    context.fillStyle = color;
    
    // Random spray density based on brush size
    const density = brushSize * 3;
    
    for (let i = 0; i < density; i++) {
      const offsetX = getRandomInt(-brushSize * 2, brushSize * 2);
      const offsetY = getRandomInt(-brushSize * 2, brushSize * 2);
      
      // Create a radial distribution
      if (offsetX * offsetX + offsetY * offsetY <= brushSize * brushSize * 4) {
        const sprayX = x + offsetX;
        const sprayY = y + offsetY;
        
        context.beginPath();
        context.arc(sprayX, sprayY, getRandomInt(0, 1), 0, Math.PI * 2);
        context.fill();
      }
    }
  };

  // Helper function for random integers
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    // Completely clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reapply background color
    context.fillStyle = currentBackground.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // If background has a pattern, reapply it
    if (currentBackground.pattern) {
      const img = new Image();
      img.onload = () => {
        const pattern = context.createPattern(img, 'repeat');
        if (pattern) {
          context.fillStyle = pattern;
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      };
      img.src = currentBackground.pattern;
    }
    
    // Reset the drawing path
    context.beginPath();
    
    // Show toast notification
    toast("Lousa limpa!", { description: "Comece um novo desenho." });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit drawing
  const handleSubmit = async () => {
    // Validate form
    if (!formData.name.trim() || !formData.drawingTitle.trim()) {
      toast("Preencha todos os campos", { description: "Nome e título do desenho são obrigatórios" });
      return;
    }
    
    setIsSubmitting(true);
    setStatusMessage('Enviando desenho...');
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");
      
      // Convert canvas to base64 string
      const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
      
      // Upload to ImgBB
      const imgbbFormData = new FormData();
      imgbbFormData.append('key', '3d9fa0bdf06acddf7b9b0e0122b2dc9d');
      imgbbFormData.append('image', imageBase64);
      
      const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: imgbbFormData
      });
      
      const imgbbData = await imgbbResponse.json();
      
      if (!imgbbData.success) {
        throw new Error("Failed to upload image");
      }
      
      const imageUrl = imgbbData.data.url;
      setStatusMessage('Imagem enviada! Registrando na planilha...');
      
      // Send to Google Sheet
      const sheetData = {
        nomePessoa: formData.name,
        nomeDesenho: formData.drawingTitle,
        linkImagem: imageUrl
      };
      
      await fetch('https://script.google.com/macros/s/AKfycbwy2V3MIsdN-pZIyGn_Xe8wWMvtXY_EPKWcMU0j6G0eblRZ4pO-Ny7y5cgCheQOw73d/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetData)
      });
      
      toast("Desenho enviado com sucesso!", { 
        description: "Seu desenho foi salvo e registrado."
      });
      
      // Clear form fields but keep the drawing
      setFormData({
        name: '',
        drawingTitle: ''
      });
      
    } catch (error) {
      console.error("Error submitting drawing:", error);
      toast("Erro ao enviar desenho", { 
        description: "Tente novamente mais tarde."
      });
    } finally {
      setIsSubmitting(false);
      setStatusMessage('');
    }
  };

  // JSX for rendering
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Tools sidebar */}
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-bold mb-3">Ferramentas de Desenho</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <ToolButton 
                icon={<Pencil size={18} />} 
                isActive={currentTool === 'pencil'}
                onClick={() => setCurrentTool('pencil')}
                tooltip="Lápis"
              />
              <ToolButton 
                icon={<Paintbrush size={18} />} 
                isActive={currentTool === 'paintbrush'}
                onClick={() => setCurrentTool('paintbrush')}
                tooltip="Pincel"
              />
              <ToolButton 
                icon={<Highlighter size={18} />} 
                isActive={currentTool === 'highlighter'}
                onClick={() => setCurrentTool('highlighter')}
                tooltip="Marcador"
              />
              <ToolButton 
                icon={<Brush size={18} />} 
                isActive={currentTool === 'spray'}
                onClick={() => setCurrentTool('spray')}
                tooltip="Spray"
              />
              <ToolButton 
                icon={<Eraser size={18} />} 
                isActive={currentTool === 'eraser'}
                onClick={() => setCurrentTool('eraser')}
                tooltip="Borracha"
              />
            </div>

            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors" className="flex-1">Cores</TabsTrigger>
                <TabsTrigger value="backgrounds" className="flex-1">Fundos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors" className="mt-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  {colorPalette.map((c) => (
                    <ColorPickerCircle 
                      key={c} 
                      color={c} 
                      isActive={color === c}
                      onClick={() => setColor(c)} 
                    />
                  ))}
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm mb-1">Tamanho do pincel: {brushSize}px</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={brushSize} 
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full" 
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm mb-1">Cor personalizada:</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded overflow-hidden"
                    />
                    <input 
                      type="text" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="backgrounds" className="mt-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  {backgroundOptions.map((bg, index) => (
                    <BgOption 
                      key={index} 
                      color={bg.color} 
                      pattern={bg.pattern}
                      isActive={currentBackground === bg}
                      onClick={() => applyBackground(bg)} 
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 flex">
              <Button 
                variant="destructive" 
                onClick={clearCanvas} 
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Limpar Lousa
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-bold mb-3">Enviar Desenho</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm mb-1">Seu Nome:</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label htmlFor="drawingTitle" className="block text-sm mb-1">Nome do Desenho:</label>
                <Input
                  id="drawingTitle"
                  name="drawingTitle"
                  value={formData.drawingTitle}
                  onChange={handleInputChange}
                  placeholder="Título do seu desenho"
                />
              </div>
              
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Desenho
                  </span>
                )}
              </Button>
              
              {statusMessage && (
                <p className="text-sm text-center text-primary">{statusMessage}</p>
              )}
            </div>
          </Card>
        </div>
        
        {/* Drawing canvas */}
        <div>
          <Card className="p-0 overflow-hidden">
            <div className="relative border-b border-border bg-neutral-50">
              <div className="p-3 text-center font-medium border-b border-border">
                {formData.drawingTitle || "Meu Desenho"}
              </div>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="drawing-canvas w-full"
                  onMouseDown={startDrawing}
                  onMouseUp={endDrawing}
                  onMouseOut={endDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={endDrawing}
                  onTouchMove={draw}
                ></canvas>
              </div>
            </div>
            <div className="p-2 text-center text-sm text-muted-foreground">
              {currentTool === 'pencil' && "Lápis: traços finos e precisos"}
              {currentTool === 'paintbrush' && "Pincel: traços grossos e suaves"}
              {currentTool === 'highlighter' && "Marcador: traços transparentes e largos"}
              {currentTool === 'spray' && "Spray: efeito difuso como spray de tinta"}
              {currentTool === 'eraser' && "Borracha: apaga partes do desenho"}
            </div>
          </Card>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Clique e arraste para desenhar. Use as ferramentas à esquerda para personalizar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
