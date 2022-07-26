import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Redux = lazy(() => import('./redux'))
const Rxjs = lazy(() => import('./rxjs'))
const Game = lazy(() => import('./game'))
const DuckShooter = lazy(() => import('./duckshooter'))
const IconView = lazy(() => import('./components/Icon'))
const MathJax = lazy(() => import('./test/MathJax'))
const Mysql = lazy(() => import('./mysql'))
const Peer = lazy(() => import('./test/Peer'))

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={"/"} element={<Test />} />
            <Route path={"/tensorflow"} element={<Tensorflow />} />
            <Route path="/redux" element={<Redux />} />
            <Route path="/rxjs/*" element={<Rxjs />} />
            <Route path="/game" element={<Game />} />
            <Route path="/duckshooter" element={<DuckShooter />} />
            <Route path="/icon" element={<IconView />} />
            <Route path="/mathjax" element={<MathJax />} />
            <Route path="/mysql" element={<Mysql />} />
            <Route path="/peer" element={<Peer />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}