import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  NavLink,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { routes as rxjsRoutes, Layout as RxjsLayout } from "./rxjs";
import Test from "./test/Test";

const Tensorflow = lazy(() => import("./tensorflow"));
const Zustand = lazy(() => import("./zustand"));

const MathJax = lazy(() => import("./test/MathJax"));
const Peer = lazy(() => import("./test/Peer"));
const AudioRecorder = lazy(() => import("./test/AudioRecorder"));
const ImageClassify = lazy(() => import("./tensorflow/ImageClassify"));
const ChatGpt3 = lazy(() => import("./test/ChatGpt3"));

const DuckShooter = lazy(() => import("./duckshooter"));
const BlockGame = lazy(() => import("./game/BlockGame"));
const BalloonGame = lazy(() => import("./game/BalloonGame"));

export default function App() {
  // console.log(import.meta.env)
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider
        router={createBrowserRouter(routes, {
          basename: import.meta.env.BASE_URL,
        })}
      />
    </Suspense>
  );
}

const Root: React.FC = () => {
  return (
    <div className="container mx-auto p-20">
      <div className=" text-2xl text-center">React Example</div>
      <nav className="text-xl">
        {routes.map((r, k) => (
          <li key={k}>
            <NavLink to={r.path!}>
              {r.path === "/" ? "home" : r.path?.slice(1)}
            </NavLink>
          </li>
        ))}
      </nav>
    </div>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
  },
  { path: "/tensorflow", element: <Tensorflow /> },
  { path: "/image-classify", element: <ImageClassify /> },
  { path: "/zustand", element: <Zustand /> },
  { path: "/chat-gpt3", element: <ChatGpt3 /> },
  { path: "/game-block", element: <BlockGame /> },
  { path: "/game-balloon", element: <BalloonGame /> },
  { path: "/game-duckshooter", element: <DuckShooter /> },
  { path: "/mathjax", element: <MathJax /> },
  { path: "/peer", element: <Peer /> },
  { path: "/audio-recorder", element: <AudioRecorder /> },
  { path: "/test", element: <Test /> },
  { path: "/rxjs", element: <RxjsLayout />, children: rxjsRoutes },
];
