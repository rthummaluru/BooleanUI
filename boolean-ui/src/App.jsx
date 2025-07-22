import { useState } from "react";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [model, setModel] = useState("gemini");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/generate-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_type: model, job_description: jobDescription }),
      });
      const data = await res.json();
      setResult(data.boolean_query);
    } catch (err) {
      console.error(err);
      setResult("❌ Error generating query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen grid place-items-center bg-red-100">
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Boolean Query Generator</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded text-gray-800"
              placeholder="Paste job description here..."
              rows="6"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
            <select
              className="w-full p-3 border border-gray-300 rounded text-gray-800"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gemini">Gemini</option>
              <option value="claude">Claude</option>
              <option value="openai">OpenAI</option>
              <option value="deepseek">DeepSeek</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              {loading ? "Generating..." : "Generate Boolean Query"}
            </button>
          </form>
          {result && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Result:</h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded mt-2 text-gray-800"
                rows="4"
                value={result}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
