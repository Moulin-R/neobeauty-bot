import { useState, useRef, useEffect } from "react";

// ============================================================
// SALON_KNOWLEDGE（システムプロンプト）は api/chat.js に移動済み
// フロントエンドにはAPIキーもプロンプトも持たせない
// ============================================================

const ALL_QUESTIONS = [
  "メニューと料金を教えて",
  "予約するにはどうすれば？",
  "小顔矯正について知りたい",
  "まつげパーマはできる？",
  "アクセス・行き方を教えて",
  "オーナーについて教えて",
  "カラーの料金は？",
  "パーマの種類を教えて",
  "トリートメントについて知りたい",
  "メンズメニューはある？",
  "着付けや成人式の対応は？",
  "ヘッドスパについて教えて",
  "縮毛矯正はできる？",
  "お子様カットはある？",
  "Feirteのメニューを教えて",
  "LIALIについて教えて",
  "アイブロウはできる？",
  "駐車場はありますか？",
  "営業時間を教えて",
  "初めてでも大丈夫？",
];

export default function NeoBeautyConcierge() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "こんにちは✨\n「NeoBeauty international AIコンシェルジュ」です！\n\nMoulin-R（ムーランアール）、salon de Feirte（サロンドフェリテ）、LIALI（リアリ）に関するご質問に何でもお答えします💫\n\nメニュー・料金・ご予約方法・お悩み相談など、お気軽にどうぞ！",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 未質問のものから6個選ぶ
  const getAvailableQuestions = () => {
    const remaining = ALL_QUESTIONS.filter((q) => !askedQuestions.includes(q));
    return remaining.slice(0, 6);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    // 質問候補から選ばれた場合、使用済みリストに追加
    if (ALL_QUESTIONS.includes(text.trim())) {
      setAskedQuestions((prev) => [...prev, text.trim()]);
    }

    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .map((m) => ({ role: m.role, content: m.content }));

      // ★ 修正箇所：messages だけを送信（model / system / max_tokens はサーバー側で管理）
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantText = data.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n") || "申し訳ございません。もう一度お試しください。";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "申し訳ございません、接続に問題が発生しました。\n\nお急ぎの場合はこちらからどうぞ📞\n・Moulin-R ネット予約：https://1cs.jp/mr/x\n・Feirte：080-4861-3110",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s）\)]+)/g;
    return text.split("\n").map((line, i) => {
      const parts = line.split(urlRegex);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            urlRegex.test(part) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer" style={{
                color: "#b8944d", textDecoration: "underline", wordBreak: "break-all",
              }}>{part}</a>
            ) : ( part )
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const availableQuestions = getAvailableQuestions();

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #fdf6f0 0%, #fef9f5 40%, #f8f0ea 100%)",
      fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #2d2926 0%, #4a3f3a 50%, #2d2926 100%)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 4px 20px rgba(45,41,38,0.15)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px)",
        }} />
        <div style={{
          width: 48, height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #c9a96e 0%, #e8d5a3 50%, #c9a96e 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 12px rgba(201,169,110,0.4)",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#2d2926", fontFamily: "Cormorant Garamond, serif" }}>NB</span>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 18, fontWeight: 600, color: "#e8d5a3",
            letterSpacing: "0.08em",
            lineHeight: 1.2,
          }}>NeoBeauty international</div>
          <div style={{
            fontSize: 11, color: "rgba(232,213,163,0.7)",
            letterSpacing: "0.15em",
            marginTop: 2,
            fontWeight: 300,
          }}>AI コンシェルジュ ✦ 美と健康のトータルプロデュース</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-end",
            gap: 8,
            animation: "fadeSlideIn 0.3s ease-out",
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: 32, height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                fontSize: 12, fontWeight: 700, color: "#2d2926",
                fontFamily: "Cormorant Garamond, serif",
                boxShadow: "0 2px 8px rgba(201,169,110,0.3)",
              }}>NB</div>
            )}
            <div style={{
              maxWidth: "78%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #4a3f3a 0%, #2d2926 100%)"
                : "#ffffff",
              color: msg.role === "user" ? "#f5f0eb" : "#3d3532",
              fontSize: 14,
              lineHeight: 1.7,
              fontWeight: 400,
              boxShadow: msg.role === "user"
                ? "0 2px 12px rgba(45,41,38,0.2)"
                : "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(201,169,110,0.1)",
              letterSpacing: "0.02em",
            }}>
              {formatMessage(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 12, fontWeight: 700, color: "#2d2926",
              fontFamily: "Cormorant Garamond, serif",
            }}>NB</div>
            <div style={{
              padding: "14px 20px",
              borderRadius: "18px 18px 18px 4px",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "flex", gap: 6, alignItems: "center",
            }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#c9a96e",
                  animation: `bounce 1.2s ease-in-out ${j * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions — 常に表示、質問済みのものは除外 */}
      {availableQuestions.length > 0 && !loading && (
        <div style={{
          padding: "0 12px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          flexShrink: 0,
        }}>
          {availableQuestions.map((q, i) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid rgba(201,169,110,0.4)",
                background: "rgba(255,255,255,0.8)",
                color: "#4a3f3a",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                backdropFilter: "blur(4px)",
                fontFamily: "inherit",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #c9a96e, #e8d5a3)";
                e.target.style.color = "#2d2926";
                e.target.style.borderColor = "#c9a96e";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.8)";
                e.target.style.color = "#4a3f3a";
                e.target.style.borderColor = "rgba(201,169,110,0.4)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: "12px 12px 16px",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201,169,110,0.15)",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          maxWidth: 680,
          margin: "0 auto",
        }}>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid rgba(201,169,110,0.25)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            padding: "0 4px 0 16px",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSubmit(e); }}
              placeholder="ご質問をどうぞ..."
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#3d3532",
                background: "transparent",
                padding: "12px 0",
                fontFamily: "inherit",
                letterSpacing: "0.02em",
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              style={{
                width: 38, height: 38,
                borderRadius: "50%",
                border: "none",
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #c9a96e, #b8944d)"
                  : "#e0d8d0",
                color: input.trim() && !loading ? "#fff" : "#b5a99e",
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
        <div style={{
          textAlign: "center",
          fontSize: 10,
          color: "#b5a99e",
          marginTop: 8,
          letterSpacing: "0.05em",
        }}>
          NeoBeauty international AIコンシェルジュ — 美と健康のトータルプロデュース
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #b5a99e; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
}
