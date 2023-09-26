import { useState } from "react";
import './style.css';

function App() {
  const [currentResponse, setCurrentResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(undefined);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
          ],
          model: "gpt-3.5-turbo",
          prompt: prompt,
        }),
      });

      const { payload } = await response.json();
      return setCurrentResponse(payload);
    } catch (error) {
      console.error("There was an error making the request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Chatgpt Custom App</h1>
        <textarea onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={handleClick}>Handle request</button>
        <p>{loading ? "Loading ..." : currentResponse}</p>
      </div>
    </div>
  );
}

export default App;
