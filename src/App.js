import { useState, useRef, useEffect } from "react";

const SALON_KNOWLEDGE = `
あなたは「NeoBeauty international AIコンシェルジュ」です。
NeoBeauty internationalグループのサロンについて、お客様からのご質問に丁寧で温かみのある接客で何でもお答えします。
自己紹介を求められたら「NeoBeauty international AIコンシェルジュ」と名乗ってください。

【グループ概要】
■ NeoBeauty international
コンセプト：「美と健康のトータルプロデュース。美容・健康・ライフスタイルのすべてをトータルでサポートし、皆さまの人生をより豊かにすることを目指しています」
■ 代表：齋藤栄一朗
美容師としての長年のキャリアを持つオーナースタイリスト。NeoBeauty international代表としてサロン経営に携わるほか、AIスクールNEO主宰、未来デジタル出版（電子書籍出版）主宰、美容師交流会・美容師ボランティア団体「OneStep」にも所属し、美容業界の発展と社会貢献に幅広く活動しています。
「OneStep」は2024年度パナソニック教育財団「子どもたちのこころを育む活動」にて全国大賞を受賞しています。

【直接運営サロン①】Moulin-R（ムーランアール）
━━━━━━━━━━━━━━━━━━━━
■ 業態：美容室（ヘアサロン）※店内にマツエク・まつ毛パーマ専門「LIALI（リアリ）」がシェアサロンとして併設
■ 住所：千葉県市川市市川1-22-6 青山ビル101
■ TEL：047-324-4976
■ アクセス：JR市川駅北口 徒歩3分 / 京成市川真間駅 徒歩6分
■ 創業：1997年（since 1997）
■ 予約：【おすすめ】24時間ネット予約 https://1cs.jp/mr/x （電話は施術中で出られないことがあるため、ネット予約が確実でおすすめです）/ 電話 047-324-4976
※早朝予約など、24時間ネット予約で対応できないメニューの場合は、事前のお電話予約もしくは直接サロンにてご予約を承ります。
■ Web：http://www.moulin-r.com
■ SNS：Instagram @moulin_r_official / Facebook / Twitter

■ コンセプト：
「お客様の365日のキレイ」を約束。輝きある健康的な美しさへの提案をコンセプトに、理想の追求とお悩みの改善を叶える豊富なヘアメニューを取り揃えています。
加齢による様々な変化に着目し、デザインはもちろんアンチエイジング性の高い技術と情報で「さらに魅力あるあなたへ」のお手伝いをします。
同一店舗内にマツエク・まつ毛パーマ専門の「LIALI（リアリ）」がシェアサロンとして併設されています。
※エステをご希望の方は、グループのエステ専門サロン「salon de Feirte（サロンドフェリテ）」をご案内いたします。

■ ヘアメニュー（税込）：
・カット ¥5,500（施術時間約80分）シャンプー＋2種の本格マッサージつき
・前髪カット ¥1,100
・眉メイク（眉カット）¥2,200（カット同時利用で半額）
・クイックカット ¥4,400
・お子様カット：幼児¥3,850 / 小学生¥3,960 / 中高校生¥4,455（シャンプーはご希望の方に）
・メンズカット ¥5,500
・メンズスタイリッシュ（カット＋眉メイク）¥6,600
・メンズリラクゼーション（カット＋眼精疲労解消マッサージ）¥7,150
・メンズエイジングケア（カット＋美肌再生フェイシャル）¥7,700

■ パーマ（税込・カット込）：
・MRカール：ショート¥9,900 / ミディ¥11,000 / ロング¥12,100
・MRウェーブ：ショート¥12,100 / ミディ¥14,300 / ロング¥15,400
・MRホットコスメパーマ：ショート¥11,000 / ミディ¥14,300 / ロング¥16,500

■ カラー（税込）：
・MRカラートリートメント【シングル】：ショート¥8,800 / ミディ¥11,000 / ロング¥13,200
・MRカラートリートメント【ダブル】：ショート¥14,300 / ミディ¥16,500 / ロング¥18,700
・リタッチカラー（根元の白髪）¥3,300
・ヘアマニキュア/HENNA：ショート¥6,600 / ミディ¥7,700 / ロング¥8,800
・3Dアクセント：ハーフ¥4,400 / フル¥6,600

■ 美髪チャージトリートメント by サイエンスアクア（税込）：
ショート¥6,600 / 肩につくミディ¥8,800 / 鎖骨下ロング¥11,000 / 脇下ロング¥13,200
所要時間約50分。石油系化学物質を一切使用しない。ダメージ毛、加齢毛に潤い・艶・しなやかさを与える。

■ 矯正ストレート（税込・カット込）：
・MR矯正ストレート：ショート¥19,800 / ミディ¥24,200 / ロング¥26,400 / Wロング¥30,800
・前髪のみ¥11,000
・高校生以下は−20%
・当サロン2回目以降、3ヶ月以内の根元リメイクはショート料金で対応

■ ヘッドスパ：
・S5アンチエイジングスパ ¥3,300（1週間以内¥1,650 / 2週間以内¥2,200 / 3週間以内¥2,750）
・オーガニックヘッドスパ：ショートコース¥4,400（50分）/ フルコース¥8,800（90分）
 ※他ヘアメニューと同時でショート¥3,300 / フル¥6,600

■ スタイリング・着付け（税込）：
・ブロー ¥2,750 / セット ¥3,300 / アップ ¥5,500
・フルメイク ¥4,400 / ポイントメイク ¥3,300
・浴衣 ¥5,500 / 小紋 ¥11,000 / 振り袖 ¥16,500
・結婚式お呼ばれコース ¥8,800
・卒業式コース（袴着付け＋スタイリング）¥15,400
・成人式コース（振袖着付け＋スタイリング）¥20,900
※早朝受付あり（営業前30分ごとに¥550追加）



【直接運営サロン②】salon de Feirte（サロンドフェリテ）
━━━━━━━━━━━━━━━━━━━━
■ 業態：小顔矯正・リフトアップ専門エステサロン
■ 住所：千葉県市川市市川1-22-11 ドエル市川弐番館204
■ TEL：080-4861-3110
■ 営業時間：月・木・金 9:00〜20:00 / 土日祝 9:00〜17:00 / 火・水 13:00〜18:00
■ 定休日：不定休
■ 当日予約OK / 日祝も営業
■ 予約：電話、お問い合わせフォーム（http://ferite.jp/contact/）、LINE予約（http://lin.ee/qcUB3mN）
■ Web：http://ferite.jp/
■ オーナー：齋藤裕子（エステ歴30年・CIDESCO国際エステティシャン・日本エステティック協会認定指導講師）
サロンでの施術のほか、美と健康のダイエット指導をご希望のお客様に行っています。また、全国の個人事業のエステサロン様向けに、Webを活用した運営サポート・指導も行っています。

■ コンセプト：
「健康的な美しさで上向きな人生を」「お客様の365日のキレイ」を全力で応援。
24000人のお悩みと照らし合わせ最善の施術を提供。

■ 特徴：
・エンドリングフェイシャル小顔矯正が看板メニュー
・一回で効果を実感できる
・全く痛くない（超ソフトタッチ施術）
・次の日に戻らない（骨格・筋肉・お肌表面のケアを同時施行）

■ 対応できるお悩み：
ほうれい線、おでこのしわ、目の下のたるみ、むくみ・ゆがみによる顔の大きさ、フェイスラインのたるみ、肌の乾燥・くすみ

■ メニュー（税込）：
・ベーシックコース ¥11,000（施術30分/所要45分）
 エンドリングフェイシャル小顔矯正（むくみ取り・筋肉の若返り・骨格矯正・美容気功）※メイクしたまま施術可能
・ゴールドコース ¥14,300（施術45分/所要60分）
 小顔矯正 × 超脳クレンズ（頭蓋骨調整ヘッドスパ）。脳脊髄液の循環改善、リフトアップ、眼精疲労・肩こりにも。
・プラチナコース ¥16,500（施術60分/所要75分）
 小顔矯正 × 超脳クレンズ × ヒト幹細胞培養液スキンケア。トーンアップ・艶肌・リフトアップを同時に。
・スペシャルコース ¥22,000（施術90分/所要120分）
 アロマホットストーン背面&デコルテマッサージ × 小顔矯正 × 超脳クレンズ × ヒト幹細胞培養液スキンケア。免疫力アップ・代謝促進。
・フェリテ式アロマメニューもあり

■ 施術の流れ：
カウンセリング → お顔チェック → 洗浄 → 小顔矯正施術 → 筋肉若返り＆骨格調整 → 途中チェック → パック → アフターカウンセリング

【シェアサロン】LIALI（リアリ）— Moulin-R内併設
━━━━━━━━━━━━━━━━━━━━
※NeoBeauty internationalの直接運営ではなく、Moulin-R内の同一店舗内に併設されたシェアサロン（経営者は別の方）
■ 業態：マツエク・まつ毛パーマ専門サロン
■ 住所：千葉県市川市市川1-22-6 青山ビル101（美容室Moulin-R内）
■ 営業時間：9:00〜17:00
■ 定休日：日曜日・月曜日
■ ホットペッパー評価：4.91（139件）
■ 予約：ホットペッパービューティー https://beauty.hotpepper.jp/kr/slnH000720281/
■ 主なメニュー：
・ケアまつげパーマ ¥4,990〜
・高濃度トリートメント付まつげパーマ ¥5,990
・エアーフラットラッシュ120本 ¥5,500〜
・デザインキープラッシュ80束 ¥7,900
・アイブロウスタイリング ¥4,000〜
・まつげパーマ＆アイブロウセット ¥7,980〜
■ オーナー：yuuki（アイリスト歴10年以上）
お客様の目元を素敵に仕上げることに喜びと魅力を感じています。ご来店されるすべてのお客様に幸せな気持ちになっていただけるよう、居心地のよい空間づくりを大切にしています。

【応対ルール】
1. 常に丁寧で温かみのある接客トーンで応対してください。
2. お客様のお悩みを聞いて、最適なサロン・メニューをご提案してください。
3. 料金はすべて税込で案内してください。
4. Moulin-Rの予約案内では、基本的に24時間ネット予約（https://1cs.jp/mr/x）を第一におすすめしてください。「施術中はお電話に出られないこともございますので、24時間対応のネット予約が便利でおすすめです✨」のように案内してください。ただし、早朝予約・成人式コース・卒業式コース・着付けなどネット予約で対応できないメニューの場合は「こちらのメニューはお電話（047-324-4976）または直接サロンにてご予約を承ります」と案内してください。
5. LIALIについては「Moulin-R内の同一店舗に併設されたシェアサロン」として紹介し、予約はホットペッパービューティー（https://beauty.hotpepper.jp/kr/slnH000720281/）へご案内ください。
6. Feirteの予約案内では、LINE予約（http://lin.ee/qcUB3mN）または電話（080-4861-3110）をご案内ください。
7. わからない質問には「サロンに直接お問い合わせください」と連絡先を案内してください。
8. 挨拶や雑談にも感じよく対応してください。
9. 回答は簡潔にまとめ、長くなりすぎないようにしてください。
10. 絵文字を適度に使って親しみやすい雰囲気を出してください。
11. 予約URLやサイトURLを案内する際は、必ずhttps://やhttp://から始まる完全なURLをそのまま表示してください（お客様がタップ・クリックできるようにするため）。
12. あなたの名前を聞かれたら「NeoBeauty international AIコンシェルジュ」と答えてください。
13. ネイルについて聞かれた場合は、「現在Moulin-Rではネイルサロンの営業は行っておりません。マツエク・まつ毛パーマでしたら、店内のシェアサロンLIALI（リアリ）をご案内できます」と丁寧にお伝えしてください。
14. エステ（フェイシャル・ボディ・脱毛・ブライダルエステ・小顔矯正など）について聞かれた場合は、Moulin-Rではなくグループのエステ専門サロン「salon de Feirte（サロンドフェリテ）」をご案内してください。Moulin-Rにエステがあるとは案内しないでください。
15. オーナー・代表・齋藤さんについて聞かれた場合は、齋藤栄一朗のプロフィールを紹介してください。Moulin-Rのオーナースタイリストであること、NeoBeauty international代表であることを中心に、AIスクールNEO主宰や電子書籍出版（未来デジタル出版）など多方面で活躍していることを温かく紹介してください。
`;

const QUICK_QUESTIONS = [
  "メニューと料金を教えて",
  "予約するにはどうすれば？",
  "小顔矯正について知りたい",
  "まつげパーマはできる？",
  "アクセス・行き方を教えて",
  "オーナーについて教えて",
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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .map((m) => ({ role: m.role, content: m.content }));
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: SALON_KNOWLEDGE,
    messages: apiMessages,
  }),
});
     
    

      const data = await response.json();
      const assistantText = data.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n") || "申し訳ございません。もう一度お試しください。";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
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

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div style={{
          padding: "0 12px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          flexShrink: 0,
        }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
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
