import{r as t,a,j as e}from"./index.1da63547.js";import{f as u}from"./fromEvent.f1420d4a.js";import{d as n}from"./debounceTime.e7311982.js";import{m as c}from"./map.e2ffbc04.js";import{I as f}from"./index.91e89195.js";import"./tslib.es6.9a4241f2.js";import"./mergeMap.746d07b1.js";import"./Observable.e24fb2bb.js";import"./OperatorSubscriber.7b4f405e.js";import"./async.ed1da8a1.js";import"./index.a2923c53.js";import"./index.434e4ebc.js";import"./button.52476b55.js";import"./isVisible.7ca29fb7.js";import"./render.43ae6a3d.js";import"./AntdIcon.78424b7e.js";import"./Compact.9bf7b630.js";import"./CloseCircleFilled.ad36d395.js";import"./useMergedState.31cb9ce1.js";function A(){const o=t.exports.useRef(null),[s,i]=t.exports.useState("");return t.exports.useEffect(()=>{var p;const m=u((p=o.current)==null?void 0:p.input,"keyup").pipe(n(1e3),c(r=>r.target.value)).subscribe(r=>{i(r)});return()=>{m.unsubscribe()}},[]),a("div",{className:"px-8 py-6",children:[e("h1",{children:"RxInput"}),e(f,{ref:o,type:"text",size:"large"}),e("h2",{children:s})]})}export{A as default};
