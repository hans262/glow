import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Redux = lazy(() => import('./redux'))
const Rxjs = lazy(() => import('./rxjs'))

const IconView = lazy(() => import('./components/Icon'))
const MathJax = lazy(() => import('./test/MathJax'))
const Mysql = lazy(() => import('./mysql'))
const Peer = lazy(() => import('./test/Peer'))
const AudioRecorder = lazy(() => import('./test/AudioRecorder'))
const ImageClassify = lazy(() => import('./tensorflow/ImageClassify'))
const ChatGpt3 = lazy(() => import('./test/ChatGpt3'))

const DuckShooter = lazy(() => import('./duckshooter'))
const BlockGame = lazy(() => import('./game/BlockGame'))
const BalloonGame = lazy(() => import('./game/BalloonGame'))

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={"/"} element={<ImageClassify />} />
            <Route path={"/tensorflow"} element={<Tensorflow />} />
            <Route path={"/test"} element={<Test />} />
            <Route path="/redux" element={<Redux />} />
            <Route path="/rxjs/*" element={<Rxjs />} />
            <Route path="/chat_gpt3" element={<ChatGpt3 />} />
            <Route path="/game_block" element={<BlockGame />} />
            <Route path="/game_balloon" element={<BalloonGame />} />
            <Route path="/game_duckshooter" element={<DuckShooter />} />
            <Route path="/icon" element={<IconView />} />
            <Route path="/mathjax" element={<MathJax />} />
            <Route path="/mysql" element={<Mysql />} />
            <Route path="/peer" element={<Peer />} />
            <Route path="/audio_recorder" element={<AudioRecorder />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}