import React, { useState } from "react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  async function detectLanguage(text) {
    if (!("ai" in self) || !("languageDetector" in self.ai)) {
      console.error("Language Detector API not supported.");
      return null;
    }

    try {
      const detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      return results.length > 0 ? results[0].detectedLanguage : null;
    } catch (error) {
      console.error("Language detection error:", error);
      return null;
    }
  }

  async function translateText(text, sourceLang, targetLang) {
    if (!("ai" in self) || !("translator" in self.ai)) {
      console.error("Translator API not supported.");
      return;
    }

    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });
      return await translator.translate(text);
    } catch (error) {
      console.error("Translation error:", error);
      return null;
    }
  }

  async function summarizeText(text) {
    if (!("ai" in self) || !("summarizer" in self.ai)) {
      console.error("Summarizer API not supported.");
      return null;
    }
  
    try {
      setLoading(true);
      console.log("Summarizing text:", text);
      const summarizer = await self.ai.summarizer.create({
        task: "summarization", 
        format: "plain-text",
        length: "short",
      });
  
      const result = await summarizer.summarize(text);
      console.log("Summary result:", result);
      return result ? result.summary || result : "Summarization failed";
    } catch (error) {
      console.error("Summarization error:", error);
      return "Error in summarization";
    } finally {
      setLoading(false);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const detectedLanguage = await detectLanguage(inputText);
    const newMessage = { text: inputText, detectedLanguage, summary: "", translation: "" };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleSummarize = async (index) => {
    const message = messages[index];
    if (!message.text) return;
  
    const summary = await summarizeText(message.text);
    if (summary) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = { ...updatedMessages[index], summary };
        return updatedMessages;
      });
    }
  };  
  

  const handleTranslate = async (index) => {
    const message = messages[index];
    const translation = await translateText(message.text, message.detectedLanguage, selectedLanguage);
    if (translation) {
      const updatedMessages = [...messages];
      updatedMessages[index].translation = translation;
      setMessages(updatedMessages);
    }
  };

  return (
    <div className="w-full bg-[#13272a] text-white xl:w-full h-screen flex flex-col justify-between xl:p-4">
      <div className="mt-4 mb-5 xl:mt-0">
      <h1 className="text-xl xl:text-2xl text-[#34676f] font-[Jejumyeongjo]">ConciseVerbify.</h1>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-6xl bg-[#13272a] px-10 h-[640px] rounded-2xl flex flex-col items-center m-auto xl:py-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="w-sm mb-4 p-4 bg-[#1c393e] rounded-xl xl:w-full">
            <p className="text-lg">{msg.text}</p>
            {msg.detectedLanguage && <p className="text-md text-gray-400">Detected: {msg.detectedLanguage}</p>}
            {msg.text.length > 150 && msg.detectedLanguage === "en" && (
              <button onClick={() => handleSummarize(index)} className="mt-2 bg-[#13272a] p-2 rounded-lg">Summarize</button>
            )}
            <div className="mt-6">
              <select className="text-white bg-[#13272a] p-2 rounded" onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>
              <button onClick={() => handleTranslate(index)} className="ml-2 bg-[#13272a] p-2 rounded-lg">Translate</button>
            </div>
            {msg.summary && <p className="mt-2 text-[#93e6f3]">Summary: {msg.summary}</p>}
            {msg.translation && <p className="mt-2 text-[#b4bfc1] text-lg">Translation: {msg.translation}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-sm flex xl:w-full items-center justify-center mt-4 pb-10 m-auto">
        <textarea
          className="w-full bg-[#13272a] p-6 xl:w-5xl rounded-xl text-white focus:outline-none border-2 border-[#1c393e]"
          placeholder="Type something..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="bg-[#1c393e] rounded-2xl p-4 ml-2">
          <i className="ri-arrow-up-line text-2xl"></i>
        </button>
      </form>
    </div>
  );
};

export default Home;