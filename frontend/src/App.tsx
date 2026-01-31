import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>AI Interview Prep App</h1>
      <p>If you see this, your Vercel deployment is working!</p>
      
      <div style={{ margin: '20px' }}>
        <button onClick={() => setCount((count) => count + 1)}>
          Test Counter: {count}
        </button>
      </div>

      <div style={{ marginTop: '50px', color: '#666' }}>
        <p>Next steps: Edit <code>src/App.tsx</code> to build your interview interface.</p>
      </div>
    </div>
  )
}

export default App
