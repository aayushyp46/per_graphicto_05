"use client";

import { useState, useEffect, useRef } from "react";
import EditHeader from "@/components/utils/editheader/page";
import SidePanel from "@/components/utils/sidepaneledit/page";
import { useItems } from "@/context/ItemContext";

/* ---------------- RAZORPAY TYPES ---------------- */
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: () => void;
  theme?: {
    color?: string;
  };
}

/* ---------------- ITEM TYPE ---------------- */
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

  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoZoom, setAutoZoom] = useState(true);

  /* 💳 Payment states */
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  const MONTHLY_PRICE = 599;
  const ANNUAL_PRICE = MONTHLY_PRICE * 12 - 100;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* ---------------- ZOOM LOGIC ---------------- */
  useEffect(() => {
    const calculateZoom = () => {
      if (!containerRef.current || !autoZoom) return;

      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = items.length * 150 + 150;

      setZoomLevel(
        contentWidth > containerWidth
          ? Math.max(0.2, containerWidth / contentWidth)
          : 1
      );
    };

    calculateZoom();
    window.addEventListener("resize", calculateZoom);
    return () => window.removeEventListener("resize", calculateZoom);
  }, [items, autoZoom]);

  const handleZoomIn = () => {
    setAutoZoom(false);
    setZoomLevel((z) => Math.min(z + 0.1, 2));
  };

  const handleZoomOut = () => {
    setAutoZoom(false);
    setZoomLevel((z) => Math.max(z - 0.1, 0.2));
  };

  const resetAutoZoom = () => setAutoZoom(true);

  /* ---------------- SVG HELPERS ---------------- */
  const wrapText = (text: string, max: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";

    words.forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (test.length <= max) current = test;
      else {
        lines.push(current);
        current = word;
      }
    });

    if (current) lines.push(current);
    return lines;
  };

  const getItemColor = (index: number) => {
    const palette =
      selectedColorPalette?.fill?.length
        ? selectedColorPalette.fill
        : defaultColorPalette.fill;
    return palette[index % palette.length];
  };

  const renderItem = (item: Item, index: number) => {
    const xOffset = index * 150;
    const lines = wrapText(item.description || "Description Here", 20);

    return (
      <g key={item.id} transform={`translate(${xOffset},0)`}>
        <rect
          x="90"
          y="0"
          width="120"
          height="350"
          rx="60"
          fill={getItemColor(index)}
        />

        <text x="150" y="60" fontSize="30" textAnchor="middle">
          ⭐
        </text>

        <text
          x="150"
          y="140"
          fontSize="20"
          fill="#A5B3C2"
          textAnchor="middle"
          fontWeight="bold"
        >
          {item.title || "Text Here"}
        </text>

        {lines.map((line, i) => (
          <text
            key={i}
            x="150"
            y={170 + i * 18}
            fontSize="14"
            fill="#A5B3C2"
            textAnchor="middle"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  /* ---------------- DOWNLOAD LOGIC ---------------- */
  const handleDownload = (format: "png" | "svg") => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    if (format === "svg") {
      downloadFile(url, "design.svg");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = svgRef.current.viewBox.baseVal.width;
    canvas.height = svgRef.current.viewBox.baseVal.height;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      downloadFile(canvas.toDataURL("image/png"), "design.png");
    };
    img.src = url;
  };

  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- RAZORPAY ---------------- */
  const loadRazorpay = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay SDK failed"));
      document.body.appendChild(script);
    });

  const handlePaymentAndDownload = async () => {
    try {
      await loadRazorpay();

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const order: { id: string; amount: number } = await res.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Graphicto",
        description: plan === "annual" ? "Annual Access" : "Monthly Access",
        handler: () => {
          setShowPaymentModal(false);
          handleDownload("png");
        },
        theme: { color: "#00a8e8" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="bg-gray-200 min-h-screen">
      <EditHeader onDownload={() => setShowPaymentModal(true)} />

      <div className="flex">
        <SidePanel />

        <div
          ref={containerRef}
          className="flex-grow flex justify-center items-center"
        >
          <div
            className="bg-white pt-20 rounded-lg p-4"
            style={{ transform: `scale(${zoomLevel})`, transition: "0.3s" }}
          >
            <svg
              ref={svgRef}
              width={items.length * 150 + 150}
              height="400"
              viewBox={`0 0 ${items.length * 150 + 150} 400`}
            >
              {items.map(renderItem)}
            </svg>
          </div>
        </div>
      </div>

      {/* 🔍 Zoom Controls */}
      <div className="fixed bottom-4 right-4 bg-blue-500 rounded-lg flex">
        <button onClick={handleZoomOut} className="px-3 text-white">
          −
        </button>
        <div
          onClick={resetAutoZoom}
          className="px-3 text-white cursor-pointer"
        >
          {Math.round(zoomLevel * 100)}%
        </div>
        <button onClick={handleZoomIn} className="px-3 text-white">
          +
        </button>
      </div>

      {/* 💳 Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Choose Plan
            </h2>

            <button
              onClick={() => setPlan("monthly")}
              className={`w-full p-3 mb-2 border rounded ${
                plan === "monthly" && "border-blue-500 bg-blue-50"
              }`}
            >
              Monthly ₹599
            </button>

            <button
              onClick={() => setPlan("annual")}
              className={`w-full p-3 border rounded ${
                plan === "annual" && "border-blue-500 bg-blue-50"
              }`}
            >
              Annual ₹{ANNUAL_PRICE}{" "}
              <span className="text-green-600">(Save ₹100)</span>
            </button>

            <button
              onClick={handlePaymentAndDownload}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded font-semibold"
            >
              Pay ₹{plan === "annual" ? ANNUAL_PRICE : MONTHLY_PRICE} & Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
      