"use client";
import { useState } from "react";

type Item = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export default function TemplateAIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setItems([]);
    setError("");

    try {
      const res = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "AI generation failed");
      } else {
        setItems(data.items);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "graphicto-template.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">⚡ AI Template Generator</h2>

      <textarea
        className="w-full border p-2 rounded text-sm"
        placeholder="e.g. Features for a mobile app"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        disabled={loading || !prompt}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Generating..." : "Generate (Max 16)"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* PREVIEW */}
      {items.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg text-white"
                style={{ backgroundColor: item.color }}
              >
                <div className="text-lg mb-1">{item.icon}</div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs opacity-90">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={downloadJSON}
            className="mt-4 w-full bg-black text-white py-2 rounded"
          >
            ⬇️ Download Template JSON
          </button>
        </>
      )}
    </div>
  );
}
