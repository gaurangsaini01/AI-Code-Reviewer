import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { toast } from 'react-toastify'

function App() {
  const [ loading,setLoading ] = useState(false)
  const [ code, setCode ] = useState(` function sum(a,b) {
  return a + b
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true);
    let id = toast.loading('Loading', { theme: "dark", position: 'top-right' });
    try {
      const response = await axios.post(import.meta.env.VITE_APP_MODE==='dev'?import.meta.env.VITE_APP_BACKEND_URL:import.meta.env.VITE_APP_PROD_URL, { code });
      setReview(response.data);
    } catch (error) {
      toast.error('Review failed: ' + ('Backend error occurred'), { theme: "dark", position: 'top-right' });
      console.error("Review code failed:", error); // Log for debugging
    } finally {
      toast.dismiss(id);
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="review" disabled={loading}>{loading?'Reviewing':'Review'}</button>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App