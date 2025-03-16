(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))x(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&x(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function x(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,W=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),F=new WeakMap;let nt=class{constructor(t,e,x){if(this._$cssResult$=!0,x!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(W&&t===void 0){const x=e!==void 0&&e.length===1;x&&(t=F.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),x&&F.set(e,t))}return t}toString(){return this.cssText}};const gt=i=>new nt(typeof i=="string"?i:i+"",void 0,q),ft=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((x,s,r)=>x+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new nt(e,i,q)},vt=(i,t)=>{if(W)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const x=document.createElement("style"),s=L.litNonce;s!==void 0&&x.setAttribute("nonce",s),x.textContent=e.cssText,i.appendChild(x)}},K=W?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const x of t.cssRules)e+=x.cssText;return gt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:$t,getOwnPropertyDescriptor:yt,getOwnPropertyNames:_t,getOwnPropertySymbols:bt,getPrototypeOf:At}=Object,y=globalThis,Y=y.trustedTypes,Ct=Y?Y.emptyScript:"",j=y.reactiveElementPolyfillSupport,P=(i,t)=>i,H={toAttribute(i,t){switch(t){case Boolean:i=i?Ct:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Z=(i,t)=>!mt(i,t),J={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=J){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const x=Symbol(),s=this.getPropertyDescriptor(t,x,e);s!==void 0&&$t(this.prototype,t,s)}}static getPropertyDescriptor(t,e,x){const{get:s,set:r}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);r.call(this,o),this.requestUpdate(t,l,x)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??J}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=At(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,x=[..._t(e),...bt(e)];for(const s of x)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[x,s]of e)this.elementProperties.set(x,s)}this._$Eh=new Map;for(const[e,x]of this.elementProperties){const s=this._$Eu(e,x);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const x=new Set(t.flat(1/0).reverse());for(const s of x)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){const x=e.attribute;return x===!1?void 0:typeof x=="string"?x:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const x of e.keys())this.hasOwnProperty(x)&&(t.set(x,this[x]),delete this[x]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var x;return(x=e.hostConnected)==null?void 0:x.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var x;return(x=e.hostDisconnected)==null?void 0:x.call(e)})}attributeChangedCallback(t,e,x){this._$AK(t,x)}_$EC(t,e){var r;const x=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,x);if(s!==void 0&&x.reflect===!0){const o=(((r=x.converter)==null?void 0:r.toAttribute)!==void 0?x.converter:H).toAttribute(e,x.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var r;const x=this.constructor,s=x._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=x.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:H;this._$Em=s,this[s]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,x){if(t!==void 0){if(x??(x=this.constructor.getPropertyOptions(t)),!(x.hasChanged??Z)(this[t],e))return;this.P(t,e,x)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,x){this._$AL.has(t)||this._$AL.set(t,e),x.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var x;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(x=this._$EO)==null||x.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(x=>{var s;return(s=x.hostUpdated)==null?void 0:s.call(x)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[P("elementProperties")]=new Map,C[P("finalized")]=new Map,j==null||j({ReactiveElement:C}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,R=M.trustedTypes,Q=R?R.createPolicy("lit-html",{createHTML:i=>i}):void 0,lt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+$,wt=`<${ht}>`,A=document,z=()=>A.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",X=Array.isArray,St=i=>X(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",B=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,_=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,st=/"/g,at=/^(?:script|style|textarea|title)$/i,Et=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),g=Et(1),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),it=new WeakMap,b=A.createTreeWalker(A,129);function ct(i,t){if(!X(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Q!==void 0?Q.createHTML(t):t}const Pt=(i,t)=>{const e=i.length-1,x=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=E;for(let l=0;l<e;l++){const n=i[l];let a,c,h=-1,v=0;for(;v<n.length&&(o.lastIndex=v,c=o.exec(n),c!==null);)v=o.lastIndex,o===E?c[1]==="!--"?o=tt:c[1]!==void 0?o=et:c[2]!==void 0?(at.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=_):c[3]!==void 0&&(o=_):o===_?c[0]===">"?(o=s??E,h=-1):c[1]===void 0?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=c[3]===void 0?_:c[3]==='"'?st:xt):o===st||o===xt?o=_:o===tt||o===et?o=E:(o=_,s=void 0);const m=o===_&&i[l+1].startsWith("/>")?" ":"";r+=o===E?n+wt:h>=0?(x.push(a),n.slice(0,h)+lt+n.slice(h)+$+m):n+$+(h===-2?l:m)}return[ct(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),x]};class T{constructor({strings:t,_$litType$:e},x){let s;this.parts=[];let r=0,o=0;const l=t.length-1,n=this.parts,[a,c]=Pt(t,e);if(this.el=T.createElement(a,x),b.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=b.nextNode())!==null&&n.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(lt)){const v=c[o++],m=s.getAttribute(h).split($),U=/([.?@])?(.*)/.exec(v);n.push({type:1,index:r,name:U[2],strings:m,ctor:U[1]==="."?kt:U[1]==="?"?zt:U[1]==="@"?Ot:I}),s.removeAttribute(h)}else h.startsWith($)&&(n.push({type:6,index:r}),s.removeAttribute(h));if(at.test(s.tagName)){const h=s.textContent.split($),v=h.length-1;if(v>0){s.textContent=R?R.emptyScript:"";for(let m=0;m<v;m++)s.append(h[m],z()),b.nextNode(),n.push({type:2,index:++r});s.append(h[v],z())}}}else if(s.nodeType===8)if(s.data===ht)n.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)n.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(t,e){const x=A.createElement("template");return x.innerHTML=t,x}}function S(i,t,e=i,x){var o,l;if(t===w)return t;let s=x!==void 0?(o=e._$Co)==null?void 0:o[x]:e._$Cl;const r=O(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,e,x)),x!==void 0?(e._$Co??(e._$Co=[]))[x]=s:e._$Cl=s),s!==void 0&&(t=S(i,s._$AS(i,t.values),s,x)),t}class Mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:x}=this._$AD,s=((t==null?void 0:t.creationScope)??A).importNode(e,!0);b.currentNode=s;let r=b.nextNode(),o=0,l=0,n=x[0];for(;n!==void 0;){if(o===n.index){let a;n.type===2?a=new N(r,r.nextSibling,this,t):n.type===1?a=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(a=new Tt(r,this,t)),this._$AV.push(a),n=x[++l]}o!==(n==null?void 0:n.index)&&(r=b.nextNode(),o++)}return b.currentNode=A,s}p(t){let e=0;for(const x of this._$AV)x!==void 0&&(x.strings!==void 0?(x._$AI(t,x,e),e+=x.strings.length-2):x._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,x,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=x,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):St(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:x}=t,s=typeof x=="number"?this._$AC(t):(x.el===void 0&&(x.el=T.createElement(ct(x.h,x.h[0]),this.options)),x);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const o=new Mt(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=it.get(t.strings);return e===void 0&&it.set(t.strings,e=new T(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let x,s=0;for(const r of t)s===e.length?e.push(x=new N(this.O(z()),this.O(z()),this,this.options)):x=e[s],x._$AI(r),s++;s<e.length&&(this._$AR(x&&x._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var x;for((x=this._$AP)==null?void 0:x.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,x,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,x.length>2||x[0]!==""||x[1]!==""?(this._$AH=Array(x.length-1).fill(new String),this.strings=x):this._$AH=d}_$AI(t,e=this,x,s){const r=this.strings;let o=!1;if(r===void 0)t=S(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const l=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=S(this,l[x+n],e,n),a===w&&(a=this._$AH[n]),o||(o=!O(a)||a!==this._$AH[n]),a===d?t=d:t!==d&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class kt extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class zt extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Ot extends I{constructor(t,e,x,s,r){super(t,e,x,s,r),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??d)===w)return;const x=this._$AH,s=t===d&&x!==d||t.capture!==x.capture||t.once!==x.once||t.passive!==x.passive,r=t!==d&&(x===d||s);s&&this.element.removeEventListener(this.name,this,x),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,x){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=x}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const V=M.litHtmlPolyfillSupport;V==null||V(T,N),(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.2.1");const Nt=(i,t,e)=>{const x=(e==null?void 0:e.renderBefore)??t;let s=x._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;x._$litPart$=s=new N(t.insertBefore(z(),r),r,void 0,e??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let k=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}};var ot;k._$litElement$=!0,k.finalized=!0,(ot=globalThis.litElementHydrateSupport)==null||ot.call(globalThis,{LitElement:k});const G=globalThis.litElementPolyfillSupport;G==null||G({LitElement:k});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:Z},Ht=(i=Lt,t,e)=>{const{kind:x,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),r.set(e.name,i),x==="accessor"){const{name:o}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,n,i)},init(l){return l!==void 0&&this.P(o,void 0,i),l}}}if(x==="setter"){const{name:o}=e;return function(l){const n=this[o];t.call(this,l),this.requestUpdate(o,n,i)}}throw Error("Unsupported decorator location: "+x)};function f(i){return(t,e)=>typeof e=="object"?Ht(i,t,e):((x,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,o?{...x,wrapped:!0}:x),o?Object.getOwnPropertyDescriptor(s,r):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function D(i){return f({...i,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=(i,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(i,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(i,t){return(e,x,s)=>{const r=o=>{var l;return((l=o.renderRoot)==null?void 0:l.querySelector(i))??null};return Rt(e,x,{get(){return r(this)}})}}const It=["xxxxxxxx xxxxx   xxx      xxxxxxx xxxxx"],Dt=["                        x           ","                      x x           ","            xx      xx            xx","           x   x    xx            xx","xx        x     x   xx              ","xx        x   x xx    x x           ","          x     x       x           ","           x   x                    ","            xx                      ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    ","                                    "],jt=["  xxx   xxx  ","             ","x    x x    x","x    x x    x","x    x x    x","  xxx   xxx  ","             ","  xxx   xxx  ","x    x x    x","x    x x    x","x    x x    x","             ","  xxx   xxx  "],Bt=["                                                             x ","                                            x               x x","                                  x x      x     xx        x   ","                                  x    x    x xxxxxx    xx     ","                                  x xxxxxxxx          x  x xxx ","                                     x     x       xxxx    xxx ","                                xx                 xxx x       ","                             x  xx       xx        xx          ","                             x  x                              ","                            x                                  ","                             x  x                              ","                             x  xx       xx        xx          ","                                xx                 xxx x       ","                                     x     x       xxxx    xxx ","                                  x xxxxxxxx          x  x xxx ","                                  x    x    x xxxxxx    xx     ","                                  x x      x     xx        x   ","                                            x               x x","                                                             x "],rt=[" x     ","   x   ","xx  xxx"],Vt=["xx     xx                        ","xx     xx                        ","                                 ","    xx                           ","    xx                           ","                                 ","                                 ","                                 ","                                 ","                      xx xx      ","                     x     x     ","                     x      x  xx","                     xxx   x   xx","                          x      ","                                 ","                                 ","                                 ","                    xx           ","                    x            ","                     xxx         ","                       x         "],Gt=["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxx                                                                                                                                                          xxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"],Wt=["xx             x    xxxx        xxxxx"," x            x     xx  xx      x    "," xx           x      x   x      xx   ","  x          xx      x  xx       xx  ","  x    x     x       xxxx         xxx","  x   xxx   xx       x   xxx        x","  xx xx xx  x       xx     x        x","   xxx   x xx       x      x        x","   xx    xxx        x     xx        x","   xx     xx        x    xx        xx","                    xxxxxx   xx   xx ","                              xxxx   "],ut={random:rt,acorn:rt,"long gun":It,"gospher glider gun":Dt,"simkin glider gun":Vt,pulsar:jt,spaceship:Bt,"long frame":Gt,WBS:Wt};class qt{constructor(t,e,x,s,r=42,o){this.cellSize=20,this.white="oklch(100% 0 0 / 30%)",this.strokeWidth=1,this.currMousePos=[0,0],this.currHoveredCell=null,this.intervalId=null,this.largePaint=!1,this.drawState=!1,this.canvas=t,this.color=e,this.bgColor=x,this.startingCellNum=r,this.cellSize=s,this.ctx=this.canvas.getContext("2d"),this.cells=new Map;const l=this.canvas.getBoundingClientRect();this.canvas.width=l.width,this.canvas.height=l.height,this.createGrid(),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this),this.handleClick=this.handleClick.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.nextTick=this.nextTick.bind(this),this.setEventListeners(),this.seed(o)}resize(){var x;const t=this.getCurrentPattern();(x=this.ctx)==null||x.clearRect(0,0,this.canvas.width,this.canvas.height);const e=this.canvas.getBoundingClientRect();this.canvas.width=e.width,this.canvas.height=e.height,this.createGrid(),this.drawPattern(t)}createGrid(){this.cells.clear(),this.gridPath=new Path2D;for(let t=0;t<=this.canvas.width;t+=this.cellSize)this.gridPath.moveTo(t,0),this.gridPath.lineTo(t,this.canvas.height);for(let t=0;t<=this.canvas.height;t+=this.cellSize)this.gridPath.moveTo(0,t),this.gridPath.lineTo(this.canvas.width,t);for(let t=0;t<this.canvas.height;t+=this.cellSize)for(let e=0;e<this.canvas.width;e+=this.cellSize){const x=this.getNeighborCoordinates(e,t),s=new Zt([e,e+this.cellSize,t,t+this.cellSize],this.ctx,x,this.color,this.bgColor);this.cells.set(e+","+t,s)}this.drawGrid()}getNeighborCoordinates(t,e){const x=[];for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(r===0&&s===0)continue;const o=t+r*this.cellSize,l=e+s*this.cellSize;o>=0&&o<this.canvas.width&&l>=0&&l<this.canvas.height?x.push(o+","+l):x.push(null)}return x}setEventListeners(){this.canvas.addEventListener("mousemove",this.handleMouseMove),this.canvas.addEventListener("mouseleave",this.handleMouseLeave),this.canvas.addEventListener("mousedown",this.handleMouseDown)}disconnect(){this.removeEventListeners()}removeEventListeners(){this.canvas.removeEventListener("mousemove",this.handleMouseMove),this.canvas.removeEventListener("mouseleave",this.handleMouseLeave),this.canvas.removeEventListener("mousedown",this.handleMouseDown),this.intervalId&&clearInterval(this.intervalId)}handleMouseLeave(){this.currHoveredCell=null}handleMouseDown(){this.currHoveredCell&&(this.drawState=!this.currHoveredCell.active),this.handleClick()}handleMouseMove(t){const e=t.offsetX-t.offsetX%this.cellSize,x=t.offsetY-t.offsetY%this.cellSize;this.currMousePos[0]===e&&this.currMousePos[1]===x||(this.currMousePos[0]=e,this.currMousePos[1]=x,this.currHoveredCell=this.cells.get(e+","+x)||null,t.buttons===1&&this.handleClick())}handleClick(){var t;this.currHoveredCell&&(this.currHoveredCell.active=this.drawState),this.currHoveredCell&&this.largePaint&&((t=this.currHoveredCell)==null||t.neighbours.forEach(e=>{const x=e?this.cells.get(e):null;x&&(x.active=this.drawState)}))}drawGrid(){!this.ctx||!this.gridPath||(this.ctx.strokeStyle=this.white,this.ctx.lineWidth=this.strokeWidth,this.ctx.stroke(this.gridPath))}checkNeighbours(t){var x;let e=0;for(let s of t.neighbours)s&&(x=this.cells.get(s))!=null&&x.active&&e++;e<2?t.liveOnNextTick=!1:t.active&&(e===2||e===3)?t.liveOnNextTick=!0:t.active&&e>3?t.liveOnNextTick=!1:!t.active&&e===3&&(t.liveOnNextTick=!0)}nextTick(){this.cells.forEach(t=>this.checkNeighbours(t)),this.cells.forEach(t=>t.evalNextTick())}run(t=2e3){this.intervalId||(this.intervalId=setInterval(this.nextTick,t))}stop(){this.intervalId&&clearInterval(this.intervalId),this.intervalId=null}getCurrentPattern(){const t=Array(Math.floor(this.canvas.height/this.cellSize)).fill(null).map(()=>Array(Math.floor(this.canvas.width/this.cellSize)).fill(" "));let e=1/0,x=0;for(let[o,l]of this.cells.entries()){const[n,a]=o.split(",").map(c=>Math.floor(Number(c)/this.cellSize));l.active&&(t[a][n]="x",n<e&&(e=n),n>x&&(x=n))}const s=t.map(o=>o.join("").substring(e,x+1));let r=s.length-1;for(;s[r].trim().length===0;)s.pop(),r--;for(;s[0].trim().length===0;)s.shift();return s}clear(){this.stop(),this.cells.forEach(t=>{t.active=!1,t.liveOnNextTick=!1})}toggleLargePaint(){this.largePaint=!this.largePaint}reset(t){this.clear(),this.seed(t)}seed(t){t==="random"?this.pickRandomCells(this.startingCellNum):this.drawPattern(ut[t])}pickRandomCells(t){for(let e=0;e<t;e++){const x=Math.floor(Math.random()*this.canvas.width),s=x-x%this.cellSize,r=Math.floor(Math.random()*this.canvas.height),o=r-r%this.cellSize,l=this.cells.get(s+","+o);l&&(l.active=!0)}}drawPattern(t){let e=Math.floor(this.canvas.height/this.cellSize/2*this.cellSize)-Math.floor(t.length/2)*this.cellSize,x=t[0].length;for(let r of t)r.length>x&&(x=r.length);const s=Math.floor((Math.floor(this.canvas.width/this.cellSize)-x)/2)*this.cellSize-this.cellSize;for(let r=0;r<t.length;r++){let o=s;const l=t[r];for(let n=0;n<l.length;n++){if(o+=this.cellSize,l[n]===" ")continue;const a=this.cells.get(o+","+e);a&&(a.active=!0)}e+=this.cellSize}}}class Zt{constructor(t,e,x,s,r){this.isActive=!1,this.liveOnNextTick=!1,this.coordinates=t,this.ctx=e,this.neighbours=x,this.colors={active:s,inactive:r},this.id=t.join()}get active(){return this.isActive}set active(t){if(this.isActive===t)return;this.isActive=t;const e=t?this.colors.active:this.colors.inactive;this.draw(e)}draw(t){const[e,x,s,r]=this.coordinates;this.ctx.fillStyle=t,this.ctx.fillRect(e+2,s+2,x-e-4,r-s-4)}evalNextTick(){this.active=this.liveOnNextTick}}const Xt=ft`
  :host {
    position: relative;
    overflow: hidden;
  }
  h1 {
    position: absolute;
    top: -1.75rem;
    margin: 0;
    font-size: 1.5rem;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 0;
  }
  .controls {
    --color: #000000b3;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #37414736;
    padding: 0.5rem;
    border: 2px solid var(--color);
    inset-block: 50%;
    border-radius: 5px 0 0 5px;
    height: fit-content;
    translate: 100% -50%;
    transition: 200ms ease-in-out;
    font-size: 0.75rem;

    label:has([type='radio']) {
      display: inline-flex;
    }
  }

  .controls--open {
    translate: 0% -50%;
  }

  .controls > div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    top: 0;

    button,
    select,
    input {
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: var(--bg-color, #2e3155);
      padding: 0.25rem;
      accent-color: hsl(from var(--bg-color, #2e3155) h s calc(l * 1.75));
      transition: background-color 125ms ease-in-out;
      &:hover {
        background-color: hsl(from var(--bg-color, #2e3155) h s calc(l * 1.25));
      }
    }
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: -1rem;
    align-items: flex-end;
    span {
      margin-top: -0.25rem;
    }
  }
  .control-btn {
    --color: #000000b3;
    z-index: 2;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border: 1px solid var(--color);
    background-color: #ffffff36;
    padding: 0.125rem;
    border-radius: 50%;
    display: grid;
    place-content: center;
    color: var(--color);
    cursor: pointer;

    &:hover {
      --color: #00000065;
    }
  }
  .control-play {
    right: 3.5rem;
  }

  .controls select {
    text-transform: capitalize;
  }
`;var Ft=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,p=(i,t,e,x)=>{for(var s=x>1?void 0:x?Kt(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(x?o(t,e,s):o(s))||s);return x&&s&&Ft(t,e,s),s};const pt=Object.keys(ut);let u=class extends k{constructor(){super(...arguments),this.bgColor="darkslateblue",this.color="white",this.cellSize=20,this.startingCellNum=42,this.interval=1e3,this.controls=!1,this.drawConsole=!1,this.size="large",this.seed="random",this.game=null,this.running=!1,this.largePaint=!1,this.controlsOpen=!1}firstUpdated(i){this.game=new qt(this.canvas,this.color,this.bgColor,this.cellSize,this.startingCellNum,this.seed)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this.game)==null||i.disconnect()}togglePlay(){this.running?this.stop():this.play()}play(){this.game&&this.game.run(this.interval),this.running=!0}stop(){this.game&&this.game.stop(),this.running=!1}render(){const i=g`<style>
      :host {
        width: 100rem;
        height: 50rem;
      }
      button {
        --bg-color: ${this.bgColor};
      }
    </style>`,t=g`<style>
      :host {
        width: 40rem;
        height: 30rem;
      }
      button {
        --bg-color: ${this.bgColor};
      }
    </style>`;return g`
      ${this.size==="large"?i:""} ${this.size==="small"?t:""}
      <canvas style="background-color: ${this.bgColor}"></canvas>
      ${this.controls&&g` <button class="control-btn control-play" @click=${this.togglePlay}>
          ${this.game&&!this.running?g` <svg width="25" height="25" viewBox="-2.5 -3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                    fill="currentcolor"
                  ></path>
                </g>
              </svg>`:g` <svg width="25" height="25" viewBox="-2.5 -3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                    fill="currentcolor"
                  ></path>
                  <path
                    d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                    fill="currentcolor"
                  ></path>
                </g>
              </svg>`}
        </button>

        <button class="control-btn" @click=${()=>this.controlsOpen=!this.controlsOpen}>
          <svg width="25" height="25" viewBox="0 -8 72 72">
            <g>
              <title>Settings</title>
              <path
                fill="currentcolor"
                d="M56.74,20.89l-1-2.31c3.33-7.53,3.11-7.75,2.46-8.41L54,6l-.42-.35h-.49c-.26,0-1,0-7.51,2.93l-2.38-1C40.09,0,39.77,0,38.87,0h-6c-.9,0-1.25,0-4.1,7.66l-2.37,1C22,6.78,19.45,5.84,18.75,5.84l-.56,0-4.58,4.49c-.7.65-.94.88,2.58,8.3l-1,2.3c-7.79,3-7.79,3.3-7.79,4.23v5.89c0,.92,0,1.25,7.82,4l1,2.29c-3.33,7.53-3.11,7.76-2.46,8.41L18,50l.42.37h.5c.25,0,1,0,7.5-3l2.38,1C31.9,56,32.21,56,33.12,56h6c.92,0,1.25,0,4.11-7.66l2.39-1c4.37,1.85,6.93,2.79,7.61,2.79l.57,0,4.62-4.52c.66-.66.89-.89-2.62-8.28l1-2.3c7.81-3,7.81-3.33,7.81-4.23V24.93C64.57,24,64.57,23.68,56.74,20.89ZM36,37.8A9.8,9.8,0,1,1,46,28,9.91,9.91,0,0,1,36,37.8Z"
              ></path>
            </g>
          </svg>
        </button>
        <div class=${this.controlsOpen?"controls controls--open":"controls"} id="controls">
          <div>
            <select
              @change=${e=>{this.seed=e.target.value,this.game&&this.game.reset(this.seed),this.running=!1}}
            >
              ${pt.map(e=>g`<option value=${e} ?selected=${this.seed===e}>${e}</option>`)}
            </select>
            <button
              @click=${()=>{this.game&&(this.game.toggleLargePaint(),this.largePaint=!this.largePaint)}}
            >
              Paint Toggle: ${this.largePaint?9:1}
            </button>
            <button
              @click=${()=>{this.game&&this.game.clear(),this.running=!1}}
            >
              Clear
            </button>
            ${this.running?g`<button @click=${this.stop}>Stop</button>`:g`<button @click=${this.play}>Run</button> `}
            <button
              @click=${()=>{this.game&&this.game.nextTick()}}
            >
              Next Tick
            </button>
            <div class="control-group">
              <input
                type="range"
                min="50"
                max="1000"
                value=${this.interval}
                @change=${e=>{var x,s;this.interval=+e.target.value,this.running&&((x=this.game)==null||x.stop(),(s=this.game)==null||s.run(this.interval))}}
              />
              <span>Interval: ${this.interval}ms</span>
            </div>

            <div>
              <label
                >Large
                <input
                  type="radio"
                  name="size"
                  value="large"
                  @change=${e=>{this.size=e.target.value,setTimeout(()=>{var x;(x=this.game)==null||x.resize()},0)}}
                  ?checked=${this.size==="large"}
              /></label>
              <label>
                Small
                <input
                  type="radio"
                  name="size"
                  value="small"
                  @change=${e=>{this.size=e.target.value,setTimeout(()=>{var x;(x=this.game)==null||x.resize()},0)}}
                  ?checked=${this.size==="small"}
                />
              </label>
            </div>
            ${this.drawConsole?g`<button @click=${()=>{var e;return console.log((e=this.game)==null?void 0:e.getCurrentPattern())}}>Print to Console</button>`:""}
            <button
              @click=${()=>{this.game&&this.game.reset(this.seed),this.running=!1}}
            >
              Reset
            </button>
          </div>
        </div>`}
    `}};u.styles=Xt;p([f({attribute:"bg-color"})],u.prototype,"bgColor",2);p([f({attribute:"color"})],u.prototype,"color",2);p([f({attribute:"cell-size",type:Number})],u.prototype,"cellSize",2);p([f({type:Number,attribute:"starting-number"})],u.prototype,"startingCellNum",2);p([f({type:Number})],u.prototype,"interval",2);p([f({type:Boolean})],u.prototype,"controls",2);p([f({attribute:"draw-console",type:Boolean})],u.prototype,"drawConsole",2);p([f({type:String})],u.prototype,"size",2);p([f({converter:{fromAttribute(i){return pt.includes(i)?i:(console.warn(`Invalid seed value: "${i}". Using "random" instead.`),"random")}}})],u.prototype,"seed",2);p([dt("canvas")],u.prototype,"canvas",2);p([dt("#controls")],u.prototype,"controlsEl",2);p([D()],u.prototype,"game",2);p([D()],u.prototype,"running",2);p([D()],u.prototype,"largePaint",2);p([D()],u.prototype,"controlsOpen",2);u=p([Ut("game-of-life")],u);
