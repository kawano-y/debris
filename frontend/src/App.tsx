import { useState } from 'react'
import './App.css'

function App() {
  // APIから取得したメッセージを保存する変数
  const [message, setMessage] = useState<string>("ボタンを押すとAPIを叩きます");
  const [loading, setLoading] = useState<boolean>(false);

  // コードに直接URLを書かない
  const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;

  const callPythonApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(LAMBDA_URL);
      const data = await response.json();
      setMessage(data.message); // Pythonから返ってきたメッセージを画面にセット
    } catch (error) {
      console.error("API呼び出しに失敗しました:", error);
      setMessage("APIの呼び出しに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>最安サーバーレス アプリ</h1>

      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'inline-block' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{message}</p>
        <button
          onClick={callPythonApi}
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? "通信中..." : "Python APIを叩く"}
        </button>
      </div>

      <p style={{ color: '#666' }}>フロント: TypeScript (React) ｜ バック: Python (Lambda)</p>
    </div>
  )
}

export default App
