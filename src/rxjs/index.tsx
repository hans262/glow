import { NavLink, Outlet, RouteObject } from "react-router-dom";
import clsx from "clsx";
import Queue from "./Queue";
import RxDrag from "./RxDrag";
import Subject from "./Subject";
import Observable from "./Observable";
import Progress from "./Progress";

export const Layout: React.FC = () => {
  return (
    <div className="container mx-auto">
      <nav className="list-disc border-b p-6 text-xl">
        {routes.map((r, k) => (
          <li key={k}>
            <NavLink
              end={r.index}
              to={r.index ? "" : r.path!}
              className={({ isActive }) => clsx({ "text-[red]": isActive })}
            >
              {r.index ? "home" : r.path}
            </NavLink>
          </li>
        ))}
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export const routes: RouteObject[] = [
  {
    index: true,
    element: <Queue />,
  },
  {
    path: "drag",
    element: <RxDrag />,
  },
  {
    path: "subject",
    element: <Subject />,
  },
  {
    path: "observable",
    element: <Observable />,
  },
  {
    path: "progress",
    element: <Progress />,
  },
];
