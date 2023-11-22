import { useRef } from "react";
import { DuckShooter } from "./DuckShooter";
import { useMount, useUnmount } from "react-use";

export default function DuckGame() {
  const root = useRef<HTMLDivElement>(null);
  const _game = useRef<DuckShooter>();

  useMount(() => {
    if (_game.current) return;
    if (!root.current) return;
    console.log("Mount");
    // 初始化游戏对象，创建游戏视图
    _game.current = new DuckShooter(root.current);
    // 开始游戏
    _game.current.play();
  });

  useUnmount(() => {
    console.log("销毁");
    _game.current?.destroy();
  });

  return (
    <div className="container mx-auto p-10">
      <div
        ref={root}
        className="w-full h-[calc(100vh-theme(spacing.20))] rounded-md "
      ></div>
    </div>
  );
}
