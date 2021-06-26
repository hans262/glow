import { useRef } from "react"

export default function MathJaxCFn() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const defaultValue = `x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}`

  const onRenderClick = () => {
    const MathJax = window.MathJax
    // console.log(MathJax)
    let input = inputRef.current?.value?.trim()
    let output = outputRef.current!
    let options = MathJax.getMetricsFor(output)

    MathJax.tex2svgPromise(input, options).then(function (node: any) {
      output.appendChild(node);
      MathJax.startup.document.clear();
      MathJax.startup.document.updateDocument();
    }).catch(function (err: any) {
      console.log(err.message)
    }).then(function () {
      // button.disabled = display.disabled = false;
    })
  }

  const onClearClick = () => {
    outputRef.current!.innerHTML = ''
  }

  return (
    <div style={{ padding: 10 }}>
      <h2>hello MathJax!</h2>
      <textarea defaultValue={defaultValue} ref={inputRef}
        style={{ width: 600, height: 300, fontSize: 20 }}>
      </textarea><br />
      <button onClick={onRenderClick}>render</button>
      <button onClick={onClearClick} style={{ marginLeft: 10 }}>clear</button>
      <div ref={outputRef} style={{ fontSize: 50 }}></div>
    </div>
  )
}