import React, { useContext, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultMarkdown,
    setInput,
    input,
  } = useContext(Context);

  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [resultMarkdown]);

  // ✅ New: handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Dev</span>
              </p>
              <p className="sub-line">How can I help you today</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest temples to visit which includes trekking</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: sustainable ecosystem</p>
                <img src={assets.message} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm ideas for our upcoming hackathon</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" ref={resultRef}>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              <div className="markdown-output">
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <ReactMarkdown>{resultMarkdown}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
           <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter prompt here"
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
