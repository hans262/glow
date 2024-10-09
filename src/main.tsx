import ReactDOM from 'react-dom/client'
import App from './App'
import './index.less'

if (import.meta.env.VITE_VCONSOLE === "true") {
  import('vconsole').then(vconsole => {
    new vconsole.default()
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
  // <div>hello world</div>
)
//react 18 如果使用严格模式React.StrictMode
//会导致useEffect再开发时运行两次