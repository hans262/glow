import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Redux = lazy(() => import('./redux'))
const Rxjs = lazy(() => import('./rxjs'))
const Game = lazy(() => import('./game'))
const DuckShooter = lazy(() => import('./duckshooter'))
const G6Graphic = lazy(() => import('./g6'))
const Plane = lazy(() => import('./plane'))
const IconView = lazy(() => import('./components/Icon'))
const MathJax = lazy(() => import('./test/MathJax'))

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={'路由加载中'}>
          <Routes>
            <Route path={"/"} element={<Test />} />
            <Route path={"/tensorflow"} element={<Tensorflow />} />
            <Route path="/redux" element={<Redux />} />
            <Route path="/rxjs/*" element={<Rxjs />} />
            <Route path="/game" element={<Game />} />
            <Route path="/duckshooter" element={<DuckShooter />} />
            <Route path="/g6" element={<G6Graphic />} />
            <Route path="/plane" element={<Plane />} />
            <Route path="/icon" element={<IconView />} />
            <Route path="/mathjax" element={<MathJax />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}