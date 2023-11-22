import { Button, Input } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import { useMount } from "react-use";

export default function MathJaxCFn() {
  const [loading, setLoading] = useState(true);
  const input = useRef<TextAreaRef>(null);
  const output = useRef<HTMLDivElement>(null);
  const onRenderClick = () => {
    const MathJax = window.MathJax;
    const inputValue = input.current?.resizableTextArea?.textArea.value?.trim();
    const _output = output.current!;
    const options = MathJax.getMetricsFor(_output);

    MathJax.tex2svgPromise(inputValue, options)
      .then(function (node: Node) {
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
        // console.log(node);
        // console.log(node.textContent)
        _output.innerHTML = "";
        _output.appendChild(node);
      })
      .catch(function (err: any) {
        console.log(err.message);
      })
      .then(function () {
        // e.target?.disabled = display.disabled = false;
      });
  };

  const onClearClick = () => {
    if (output.current) {
      output.current.innerHTML = "";
    }
  };

  useMount(() => {
    if (document.getElementById("mathjax-script")) {
      setLoading(false);
      return;
    }
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    script.id = "mathjax-script";
    script.async = true;
    document.getElementsByTagName("body")[0].appendChild(script);
    script.onload = () => {
      console.log(window.MathJax);
      setLoading(false);
    };
  });

  return (
    <div className="container mx-auto py-2">
      <div className="text-3xl mb-2">Hello MathJax!</div>
      <Input.TextArea
        defaultValue={`x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}`}
        ref={input}
        autoSize={{ minRows: 3 }}
        className="mb-2 text-2xl"
      ></Input.TextArea>
      <div className=" space-x-2">
        <Button type="primary" onClick={onRenderClick} loading={loading}>
          run
        </Button>
        <Button onClick={onClearClick}>clear</Button>
      </div>
      <div ref={output} className=" text-5xl"></div>
    </div>
  );
}
