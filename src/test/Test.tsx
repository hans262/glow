import { useRef } from "react";
import { useMount } from "react-use";

function Test() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useMount(() => {
    if (!canvas.current) return;
    canvas.current.width = 600;
    canvas.current.height = 400;

    const ctx = canvas.current.getContext("2d")!;

    ctx.strokeRect(10, 10, 200, 100);
  });

  return (
    <div className=" container p-2 h-screen">
      <div
        className="h-full w-full border"
        style={{
          // backgroundImage:
            // "radial-gradient(farthest-corner at 40px 40px, #f35 0%,#fff 50%), radial-gradient(farthest-corner at 200px 40px, blue 0%,#fff 50%)",
            backgroundImage: `linear-gradient(circle at 0px 0px, red, yellow),
            linear-gradient(to left, blue, green)`
        }}
      ></div>
    </div>
  );
}

export default Test;
