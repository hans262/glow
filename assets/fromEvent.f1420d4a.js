import{c as y,d as c}from"./tslib.es6.9a4241f2.js";import{a as E,m as L,i as l}from"./mergeMap.746d07b1.js";import{O as h,i as t}from"./Observable.e24fb2bb.js";import{m as A}from"./map.e2ffbc04.js";var M=Array.isArray;function O(r,n){return M(n)?r.apply(void 0,y([],c(n))):r(n)}function w(r){return A(function(n){return O(r,n)})}var T=["addListener","removeListener"],b=["addEventListener","removeEventListener"],x=["on","off"];function d(r,n,e,i){if(t(e)&&(i=e,e=void 0),i)return d(r,n,e).pipe(w(i));var s=c(j(r)?b.map(function(u){return function(o){return r[u](n,o,e)}}):F(r)?T.map(v(r,n)):_(r)?x.map(v(r,n)):[],2),m=s[0],p=s[1];if(!m&&E(r))return L(function(u){return d(u,n,e)})(l(r));if(!m)throw new TypeError("Invalid event target");return new h(function(u){var o=function(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];return u.next(1<a.length?a:a[0])};return m(o),function(){return p(o)}})}function v(r,n){return function(e){return function(i){return r[e](n,i)}}}function F(r){return t(r.addListener)&&t(r.removeListener)}function _(r){return t(r.on)&&t(r.off)}function j(r){return t(r.addEventListener)&&t(r.removeEventListener)}export{d as f};
