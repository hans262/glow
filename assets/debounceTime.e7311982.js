import{b as d}from"./async.ed1da8a1.js";import{o as m,c as v}from"./OperatorSubscriber.7b4f405e.js";function w(o,a){return a===void 0&&(a=d),m(function(r,e){var n=null,i=null,u=null,l=function(){if(n){n.unsubscribe(),n=null;var t=i;i=null,e.next(t)}};function c(){var t=u+o,f=a.now();if(f<t){n=this.schedule(void 0,t-f),e.add(n);return}l()}r.subscribe(v(e,function(t){i=t,u=a.now(),n||(n=a.schedule(c,o),e.add(n))},function(){l(),e.complete()},void 0,function(){i=n=null}))})}export{w as d};
