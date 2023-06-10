import{w as W,k as h,x as c,I as q,J as S,K as F,j,h as z,L as G,d as H,f as k}from"./index.a2923c53.js";import{R as N,r as m,j as I}from"./index.1da63547.js";function A(n){var o;return n==null||(o=n.getRootNode)===null||o===void 0?void 0:o.call(n)}function M(n){return A(n)!==(n==null?void 0:n.ownerDocument)}function Q(n){return M(n)?A(n):null}function U(n,o){W(n,"[@ant-design/icons] ".concat(o))}function _(n){return h(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(h(n.icon)==="object"||typeof n.icon=="function")}function R(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var t=n[e];switch(e){case"class":o.className=t,delete o.class;break;default:o[e]=t}return o},{})}function T(n,o,e){return e?N.createElement(n.tag,c(c({key:o},R(n.attrs)),e),(n.children||[]).map(function(t,r){return T(t,"".concat(o,"-").concat(n.tag,"-").concat(r))})):N.createElement(n.tag,c({key:o},R(n.attrs)),(n.children||[]).map(function(t,r){return T(t,"".concat(o,"-").concat(n.tag,"-").concat(r))}))}function E(n){return q(n)[0]}function $(n){return n?Array.isArray(n)?n:[n]:[]}var V=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,X=function(o){var e=m.exports.useContext(S),t=e.csp,r=e.prefixCls,l=V;r&&(l=l.replace(/anticon/g,r)),m.exports.useEffect(function(){var i=o.current,s=Q(i);F(l,"@ant-design-icons",{prepend:!0,csp:t,attachTo:s})},[])},Y=["icon","className","onClick","style","primaryColor","secondaryColor"],u={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Z(n){var o=n.primaryColor,e=n.secondaryColor;u.primaryColor=o,u.secondaryColor=e||E(o),u.calculated=!!e}function nn(){return c({},u)}var y=function(o){var e=o.icon,t=o.className,r=o.onClick,l=o.style,i=o.primaryColor,s=o.secondaryColor,f=j(o,Y),C=m.exports.useRef(),d=u;if(i&&(d={primaryColor:i,secondaryColor:s||E(i)}),X(C),U(_(e),"icon should be icon definiton, but got ".concat(e)),!_(e))return null;var a=e;return a&&typeof a.icon=="function"&&(a=c(c({},a),{},{icon:a.icon(d.primaryColor,d.secondaryColor)})),T(a.icon,"svg-".concat(a.name),c(c({className:t,onClick:r,style:l,"data-icon":a.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},f),{},{ref:C}))};y.displayName="IconReact";y.getTwoToneColors=nn;y.setTwoToneColors=Z;const w=y;function P(n){var o=$(n),e=z(o,2),t=e[0],r=e[1];return w.setTwoToneColors({primaryColor:t,secondaryColor:r})}function on(){var n=w.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var en=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];P(G.primary);var g=m.exports.forwardRef(function(n,o){var e,t=n.className,r=n.icon,l=n.spin,i=n.rotate,s=n.tabIndex,f=n.onClick,C=n.twoToneColor,d=j(n,en),a=m.exports.useContext(S),x=a.prefixCls,v=x===void 0?"anticon":x,B=a.rootClassName,D=H(B,v,(e={},k(e,"".concat(v,"-").concat(r.name),!!r.name),k(e,"".concat(v,"-spin"),!!l||r.name==="loading"),e),t),p=s;p===void 0&&f&&(p=-1);var L=i?{msTransform:"rotate(".concat(i,"deg)"),transform:"rotate(".concat(i,"deg)")}:void 0,O=$(C),b=z(O,2),J=b[0],K=b[1];return I("span",{role:"img","aria-label":r.name,...d,ref:o,tabIndex:p,onClick:f,className:D,children:I(w,{icon:r,primaryColor:J,secondaryColor:K,style:L})})});g.displayName="AntdIcon";g.getTwoToneColor=on;g.setTwoToneColor=P;const an=g;export{an as A,Q as g};
