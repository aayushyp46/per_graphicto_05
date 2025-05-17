"use client";
import { useState, useEffect, useRef } from "react";
import EditHeader from "@/components/utils/editheader/page";
import SidePanel from "@/components/utils/sidepaneledit/page";
import { useItems } from "@/context/ItemContext";

interface Item {
  id: string | number;
  title?: string;
  description?: string;
  icon?: string;
  fontFamily?: string;
}

const defaultColorPalette = {
  fill: ["#FB7B6B", "#36558F", "#21D8DE", "#8843F2", "#177E89"],
};

export default function EditItemPage() {
  const { items, selectedColorPalette } = useItems();
  const [, setCurrentItemIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoZoom, setAutoZoom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const cycleToNextItem = () => {
    if (items.length > 0) {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  };

  const handleZoomIn = () => {
    setAutoZoom(false);
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setAutoZoom(false);
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.2));
  };

  const resetAutoZoom = () => {
    setAutoZoom(true);
  };

  useEffect(() => {
    
    const calculateZoom = () => {
      if (!containerRef.current || !autoZoom) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = items.length * 150 + 150;
      
      if (contentWidth > containerWidth) {
        
        const newZoom = Math.max(0.2, containerWidth / contentWidth);
        setZoomLevel(newZoom);
      } else {
        setZoomLevel(1); 
      }
    };

    calculateZoom();
    
    
    window.addEventListener('resize', calculateZoom);
    
    return () => {
      window.removeEventListener('resize', calculateZoom);
    };
  }, [items, autoZoom]);

  const wrapText = (text: string, maxWidth: number): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const getItemColor = (index: number) => {
    const palette =
      selectedColorPalette &&
      selectedColorPalette.fill &&
      selectedColorPalette.fill.length > 0
        ? selectedColorPalette.fill
        : defaultColorPalette.fill;

    const colorIndex = index % palette.length;
    return palette[colorIndex];
  };

  const renderAdditionalItem = (item: Item, index: number) => {
    const title = item?.title || "Text Here";
    const description = item?.description || "Description Here";
    const icon = item?.icon || "";

    const displayIcon = icon || "⭐";

    const fontFamily = item?.fontFamily || "Arial";

    const xOffset = index * 150;

    const itemDescriptionLines = wrapText(description, 20);

    const itemColor = getItemColor(index);

    return (
      <g key={String(item.id)} transform={`translate(${xOffset}, 0)`}>
        <rect x="90" y="0" width="120" height="350" rx="60" fill={itemColor} />

        {displayIcon === "⭐" ? (
          <text
            x="150"
            y="60"
            fontSize="30"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ⭐
          </text>
        ) : (
          <g transform="translate(135 40)">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          </g>
        )}

        <text
          x="150"
          y="140"
          fill="#A5B3C2"
          fontSize="20"
          textAnchor="middle"
          fontWeight="bold"
          style={{ fontFamily }}
        >
          {title}
        </text>

        {itemDescriptionLines.map((line, lineIndex) => (
          <text
            key={lineIndex}
            x="150"
            y={170 + lineIndex * 18}
            fill="#A5B3C2"
            fontSize="14"
            textAnchor="middle"
            style={{ fontFamily }}
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  const handleDownload = (format: string) => {
    if (!svgRef.current) return;
    
    const svgElement = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    if (format === 'svg') {
      
      downloadFile(svgUrl, 'design.svg');
      return;
    }
    
    const canvas = document.createElement('canvas');
    const width = svgElement.viewBox.baseVal.width;
    const height = svgElement.viewBox.baseVal.height;
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
   
    if (format !== 'png-transparent') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }
    
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      
      let dataUrl;
      let filename;
      
      if (format === 'jpg') {
        dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        filename = 'design.jpg';
      } else { 
        dataUrl = canvas.toDataURL('image/png');
        filename = 'design.png';
      }
      
      downloadFile(dataUrl, filename);
    };
    
    image.src = svgUrl;
  };
  
  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <EditHeader onDownload={handleDownload} />
      <div className="flex">
        <SidePanel />
        <div 
          ref={containerRef} 
          className="flex  justify-center items-center flex-grow overflow-hidden"
        >
          <div 
            className="bg-white pt-20 rounded-lg p-4"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <svg
              ref={svgRef}
              width={items.length * 150 + 150}
              height="400"
              viewBox={`0 0 ${items.length * 150 + 150} 400`}
              xmlns="http://www.w3.org/2000/svg"
              onClick={cycleToNextItem}
            >
              {items.map((item, index) => renderAdditionalItem(item, index))}
            </svg>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex items-center bg-blue-500 rounded-lg shadow-md p-2">
        <button 
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center bg-blue-300 rounded-l-md hover:bg-blue-400 focus:outline-none"
        >
          <span className="text-xl font-bold">-</span>
        </button>
        
        <div 
          className="px-3 flex items-center justify-center cursor-pointer" 
          onClick={resetAutoZoom}
          title="Click to reset to auto zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </div>
        
        <button 
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center bg-blue-300 rounded-r-md hover:bg-blue-400 focus:outline-none"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
}