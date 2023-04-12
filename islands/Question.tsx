import { useState,useCallback } from "preact/hooks";

export default function Question() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
  
    const onValueChange = useCallback((e: any) => {
      setPrompt((e.target as HTMLTextAreaElement).value);
    }, [prompt]);
  
    const onClick = useCallback(async () => {
      setLoading(true);
  
      const response = await fetch("/api/helper", {
        method: "POST",
        body: prompt,
      });
  
      const data = await response.json();
      setResult(data.message);
      setImageLoading(true);
      setImage(data.image);
      setLoading(false);
    }, [prompt]);
  
    return (
      <div>
        <h1 class="text-2xl font-bold mb-5">pizzAI</h1>
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded"
          value={prompt}
          onInput={onValueChange}
        >
        </textarea>
        <button
          className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-700"
          onClick={onClick}
        >
          I'm hungry 🍕 🍕 🍕
        </button>
        <div className="mt-10 content-center whitespace-pre-wrap">
          {imageLoading ? <img src={image} width={256} height={256} /> : null}
          {loading ? "the pizza person is thinking" : result}
        </div>
      </div>
    );
  }