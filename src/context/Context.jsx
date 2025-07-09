import React, { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Single string for Markdown
  const [resultMarkdown, setResultMarkdown] = useState("");

  const delayWord = (index, word) => {
    setTimeout(() => {
      setResultMarkdown((prev) => prev + word + " ");
    }, 50 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultMarkdown("");
  };

  const onSent = async (prompt) => {
  setResultMarkdown("");
  setLoading(true);
  setShowResult(true);

  let response;
  if (prompt !== undefined) {
    response = await main(prompt);
    setRecentPrompt(prompt);
  } else {
    setPreviousPrompt((prev) => [...prev, input]);
    setRecentPrompt(input);
    response = await main(input);
  }

  // ✅ Split by spaces AND preserve newlines
  const tokens = response.split(/(\s+)/); 

  tokens.forEach((token, index) => {
    setTimeout(() => {
      setResultMarkdown((prev) => prev + token);
    }, 20 * index); // Faster feels smoother for longer text
  });

  setLoading(false);
  setInput("");
  };


  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultMarkdown, // ✅ Not chunks anymore
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
