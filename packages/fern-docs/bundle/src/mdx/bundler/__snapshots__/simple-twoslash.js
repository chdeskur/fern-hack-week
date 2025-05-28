var Component = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // global-externals:react/jsx-runtime
  var require_jsx_runtime = __commonJS({
    "global-externals:react/jsx-runtime"(exports, module) {
      module.exports = _jsx_runtime;
    }
  });

  // _mdx_bundler_entry_point-_random_uuid_.mdx
  var mdx_bundler_entry_point__random_uuid__exports = {};
  __export(mdx_bundler_entry_point__random_uuid__exports, {
    default: () => MDXContent,
    frontmatter: () => frontmatter
  });
  var import_jsx_runtime = __toESM(require_jsx_runtime());

  // global-externals:@mdx-js/react
  var { useMDXComponents } = MdxJsReact;

  // _mdx_bundler_entry_point-_random_uuid_.mdx
  var frontmatter = {
    "title": "Simple Twoslash"
  };
  function _createMdxContent(props) {
    const _components = {
      p: "p",
      ...useMDXComponents(),
      ...props.components
    }, { ErrorBoundary, TwoSlash } = _components;
    if (!ErrorBoundary) _missingMdxReference("ErrorBoundary", true);
    if (!TwoSlash) _missingMdxReference("TwoSlash", true);
    return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [(0, import_jsx_runtime.jsx)(_components.p, {
        children: "Some information about the project."
      }), "\n", (0, import_jsx_runtime.jsx)(ErrorBoundary, {
        children: (0, import_jsx_runtime.jsx)(TwoSlash, {
          content: {
            "code": `var Component=(()=>{var t=Object.create;var n=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var m=(e,s)=>()=>(s||e((s={exports:{}}).exports,s),s.exports),E=(e,s)=>{for(var i in s)n(e,i,{get:s[i],enumerable:!0})},c=(e,s,i,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of p(s))!y.call(e,r)&&r!==i&&n(e,r,{get:()=>s[r],enumerable:!(o=k(s,r))||o.enumerable});return e};var A=(e,s,i)=>(i=e!=null?t(D(e)):{},c(s||!e||!e.__esModule?n(i,"default",{value:e,enumerable:!0}):i,e)),N=e=>c(n({},"__esModule",{value:!0}),e);var d=m((g,h)=>{h.exports=_jsx_runtime});var C={};E(C,{default:()=>u});var l=A(d());var{useMDXComponents:a}=MdxJsReact;function F(e){let s=Object.assign({pre:"pre",code:"code",span:"span",div:"div"},a(),e.components);return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(s.pre,{className:"shiki shiki-themes min-light material-theme-darker twoslash lsp",style:{backgroundColor:"#ffffff","--shiki-dark-bg":"#212121",color:"#24292eff","--shiki-dark":"#EEFFFF"},tabIndex:"0",children:(0,l.jsxs)(s.code,{children:[(0,l.jsxs)(s.span,{className:"line",children:[(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" "}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:(0,l.jsxs)(s.span,{className:"twoslash-hover",children:[(0,l.jsx)(s.div,{className:"twoslash-popup-info-hover",children:(0,l.jsxs)(s.span,{className:"line",children:[(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" hi"}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:":"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:' "'}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Hello"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:'"'})]})}),(0,l.jsx)(s.span,{className:"twoslash-target",children:"hi"})]})}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:" ="}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:' "'}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Hello"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:'"'}),(0,l.jsx)(s.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:";"})]}),\`
\`,(0,l.jsxs)(s.span,{className:"line",children:[(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" "}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:(0,l.jsxs)(s.span,{className:"twoslash-query-persisted",children:[(0,l.jsxs)(s.span,{className:"twoslash-popup-info",children:[(0,l.jsx)(s.div,{className:"twoslash-popup-arrow"}),(0,l.jsx)(s.div,{className:"twoslash-popup-scroll-container",children:(0,l.jsxs)(s.span,{className:"line",children:[(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" msg"}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:":"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:' "'}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Hello, world"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:'"'})]})})]}),"msg"]})}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:" ="}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:" \`"}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:"\${"}),(0,l.jsx)(s.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:(0,l.jsxs)(s.span,{className:"twoslash-hover",children:[(0,l.jsx)(s.div,{className:"twoslash-popup-info-hover",children:(0,l.jsxs)(s.span,{className:"line",children:[(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,l.jsx)(s.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" hi"}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:":"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:' "'}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Hello"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:'"'})]})}),(0,l.jsx)(s.span,{className:"twoslash-target",children:"hi"})]})}),(0,l.jsx)(s.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:"}"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:", world"}),(0,l.jsx)(s.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"\`"}),(0,l.jsx)(s.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:";"})]}),\`
\`,(0,l.jsx)(s.span,{className:"line"})]})})})})}function f(e={}){let{wrapper:s}=Object.assign({},a(),e.components);return s?(0,l.jsx)(s,Object.assign({},e,{children:(0,l.jsx)(F,e)})):F(e)}var u=f;return N(C);})();
;return Component;`,
            "jsxElements": []
          }
        })
      }), "\n", (0, import_jsx_runtime.jsx)(_components.p, {
        children: "And another one."
      }), "\n", (0, import_jsx_runtime.jsx)(ErrorBoundary, {
        children: (0, import_jsx_runtime.jsx)(TwoSlash, {
          content: {
            "code": 'var Component=(()=>{var F=Object.create;var r=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var y=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),E=(n,e)=>{for(var l in e)r(n,l,{get:e[l],enumerable:!0})},c=(n,e,l,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of k(e))!D.call(n,o)&&o!==l&&r(n,o,{get:()=>e[o],enumerable:!(a=p(e,o))||a.enumerable});return n};var g=(n,e,l)=>(l=n!=null?F(m(n)):{},c(e||!n||!n.__esModule?r(l,"default",{value:n,enumerable:!0}):l,n)),C=n=>c(r({},"__esModule",{value:!0}),n);var h=y((N,d)=>{d.exports=_jsx_runtime});var w={};E(w,{default:()=>f});var s=g(h());var{useMDXComponents:i}=MdxJsReact;function t(n){let e=Object.assign({pre:"pre",code:"code",span:"span",div:"div",p:"p",ul:"ul",li:"li",a:"a",em:"em",strong:"strong"},i(),n.components);return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(e.pre,{className:"shiki shiki-themes min-light material-theme-darker twoslash lsp",style:{backgroundColor:"#ffffff","--shiki-dark-bg":"#212121",color:"#24292eff","--shiki-dark":"#EEFFFF"},tabIndex:"0",children:(0,s.jsxs)(e.code,{children:[(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:(0,s.jsxs)(e.span,{className:"twoslash-hover",children:[(0,s.jsxs)(e.div,{className:"twoslash-popup-info-hover",children:[(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"var"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:" console"}),(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:":"}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#FFCB6B"},children:" Console"})]}),(0,s.jsxs)(e.div,{className:"twoslash-popup-jsdoc",children:[(0,s.jsxs)(e.p,{children:["The ",(0,s.jsx)(e.code,{children:"console"})," module provides a simple debugging console that is similar to the JavaScript console mechanism provided by web browsers."]}),`\n`,(0,s.jsx)(e.p,{children:"The module exports two specific components:"}),`\n`,(0,s.jsxs)(e.ul,{children:[`\n`,(0,s.jsxs)(e.li,{children:["A ",(0,s.jsx)(e.code,{children:"Console"})," class with methods such as ",(0,s.jsx)(e.code,{children:"console.log()"}),", ",(0,s.jsx)(e.code,{children:"console.error()"})," and ",(0,s.jsx)(e.code,{children:"console.warn()"})," that can be used to write to any Node.js stream. * A global ",(0,s.jsx)(e.code,{children:"console"})," instance configured to write to ",(0,s.jsx)(e.a,{href:"https://nodejs.org/docs/latest-v20.x/api/process.html#processstdout",children:(0,s.jsx)(e.code,{children:"process.stdout"})})," and ",(0,s.jsx)(e.a,{href:"https://nodejs.org/docs/latest-v20.x/api/process.html#processstderr",children:(0,s.jsx)(e.code,{children:"process.stderr"})}),". The global ",(0,s.jsx)(e.code,{children:"console"})," can be used without importing the ",(0,s.jsx)(e.code,{children:"node:console"})," module."]}),`\n`]}),`\n`,(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.em,{children:(0,s.jsx)(e.strong,{children:"Warning"})}),": The global console object\'s methods are neither consistently synchronous like the browser APIs they resemble, nor are they consistently asynchronous like all other Node.js streams. See the ",(0,s.jsx)(e.a,{href:"https://nodejs.org/docs/latest-v20.x/api/process.html#a-note-on-process-io",children:(0,s.jsx)(e.code,{children:"note on process I/O"})})," for more information."]}),`\n`,(0,s.jsxs)(e.p,{children:["Example using the global ",(0,s.jsx)(e.code,{children:"console"}),":"]}),`\n`,(0,s.jsx)(e.pre,{className:"shiki shiki-themes min-light material-theme-darker",style:{backgroundColor:"#ffffff","--shiki-dark-bg":"#212121",color:"#24292eff","--shiki-dark":"#EEFFFF"},tabIndex:"0",children:(0,s.jsxs)(e.code,{children:[(0,s.jsx)(e.span,{className:"line"}),`\n`,(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"const"}),(0,s.jsx)(e.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" name"}),(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:" ="}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:" \'"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Will Robinson"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"\'"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:";"}),(0,s.jsx)(e.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" console"}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#89DDFF"},children:"."}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#82AAFF"},children:"warn"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:"("}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"`"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Danger $name! Danger!"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"`"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:")"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:";"}),(0,s.jsx)(e.span,{style:{color:"#C2C3C5",fontStyle:"inherit","--shiki-dark":"#545454","--shiki-dark-font-style":"italic"},children:" // Prints: Danger Will Robinson! Danger!, to stderr ```"})]}),`\n`,(0,s.jsx)(e.span,{className:"line"}),`\n`,(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:"Example "}),(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#C792EA"},children:"using"}),(0,s.jsx)(e.span,{style:{color:"#1976D2","--shiki-dark":"#EEFFFF"},children:" the"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:" `"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"Console"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"`"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:" class"}),(0,s.jsx)(e.span,{style:{color:"#D32F2F","--shiki-dark":"#89DDFF"},children:":"})]}),`\n`,(0,s.jsx)(e.span,{className:"line"}),`\n`,(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"```"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"js const out = getStreamSomehow(); const err = getStreamSomehow(); const myConsole = new console.Console(out, err);"})]}),`\n`,(0,s.jsx)(e.span,{className:"line"}),`\n`,(0,s.jsx)(e.span,{className:"line",children:(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"myConsole.log(\'hello world\'); // Prints: hello world, to out myConsole.log(\'hello %s\', \'world\'); // Prints: hello world, to out myConsole.error(new Error(\'Whoops, something bad happened\')); // Prints: [Error: Whoops, something bad happened], to err"})}),`\n`,(0,s.jsx)(e.span,{className:"line"}),`\n`,(0,s.jsxs)(e.span,{className:"line",children:[(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"const name = \'Will Robinson\'; myConsole.warn("}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"`"}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#FFCB6B"},children:"Danger"}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#FFCB6B"},children:" $name"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:"! "}),(0,s.jsx)(e.span,{style:{color:"#6F42C1","--shiki-dark":"#FFCB6B"},children:"Danger"}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:"!"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"`"}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#C3E88D"},children:"); // Prints: Danger Will Robinson! Danger!, to err "}),(0,s.jsx)(e.span,{style:{color:"#22863A","--shiki-dark":"#89DDFF"},children:"```"})]})]})})]})]}),(0,s.jsx)(e.span,{className:"twoslash-target",children:"console"})]})}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:"."}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#EEFFFF"},children:(0,s.jsxs)(e.span,{children:["e",(0,s.jsx)(e.span,{className:"twoslash-completion-cursor",children:(0,s.jsx)(e.div,{className:"twoslash-completion-list",children:(0,s.jsx)(e.div,{className:"twoslash-completion-list-item",children:(0,s.jsxs)(e.span,{children:[(0,s.jsx)(e.span,{className:"twoslash-completions-matched",children:"e"}),(0,s.jsx)(e.span,{className:"twoslash-completions-unmatched",children:"rror"})]})})})})]})}),(0,s.jsx)(e.span,{style:{color:"#24292EFF","--shiki-dark":"#89DDFF"},children:";"})]}),`\n`,(0,s.jsx)(e.span,{className:"line"})]})})})})}function u(n={}){let{wrapper:e}=Object.assign({},i(),n.components);return e?(0,s.jsx)(e,Object.assign({},n,{children:(0,s.jsx)(t,n)})):t(n)}var f=u;return C(w);})();\n;return Component;',
            "jsxElements": []
          }
        })
      })]
    });
  }
  function MDXContent(props = {}) {
    const { wrapper: MDXLayout } = {
      ...useMDXComponents(),
      ...props.components
    };
    return MDXLayout ? (0, import_jsx_runtime.jsx)(MDXLayout, {
      ...props,
      children: (0, import_jsx_runtime.jsx)(_createMdxContent, {
        ...props
      })
    }) : _createMdxContent(props);
  }
  function _missingMdxReference(id, component) {
    throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
  }
  return __toCommonJS(mdx_bundler_entry_point__random_uuid__exports);
})();
;return Component;