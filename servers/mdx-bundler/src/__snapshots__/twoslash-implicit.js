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
    default: () => mdx_bundler_entry_point__random_uuid__default
  });
  var import_jsx_runtime = __toESM(require_jsx_runtime());

  // global-externals:@mdx-js/react
  var { useMDXComponents } = MdxJsReact;

  // _mdx_bundler_entry_point-_random_uuid_.mdx
  function _createMdxContent(props) {
    const _components = Object.assign({
      pre: "pre",
      code: "code",
      span: "span",
      div: "div"
    }, useMDXComponents(), props.components);
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children: (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
        children: (0, import_jsx_runtime.jsx)(_components.pre, {
          className: "shiki shiki-themes min-light material-theme-darker twoslash lsp",
          style: {
            backgroundColor: "#ffffff",
            "--shiki-dark-bg": "#212121",
            color: "#24292eff",
            "--shiki-dark": "#EEFFFF"
          },
          tabIndex: "0",
          children: (0, import_jsx_runtime.jsxs)(_components.code, {
            children: [(0, import_jsx_runtime.jsx)(_components.span, {
              className: "line",
              children: (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#C2C3C5",
                  fontStyle: "inherit",
                  "--shiki-dark": "#545454",
                  "--shiki-dark-font-style": "italic"
                },
                children: "// This suppose to throw an error,"
              })
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line",
              children: (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#C2C3C5",
                  fontStyle: "inherit",
                  "--shiki-dark": "#545454",
                  "--shiki-dark-font-style": "italic"
                },
                children: "// but it won't because we disabled noImplicitAny."
              })
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#C792EA"
                },
                children: "const"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsx)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " fn"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "a"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " any"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " any"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "fn"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: " ="
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " ("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  fontStyle: "inherit",
                  "--shiki-dark": "#EEFFFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsx)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "a"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " any"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "a"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#C792EA"
                },
                children: " =>"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsx)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "a"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " any"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "a"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "+"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#F78C6C"
                },
                children: " 1"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            })]
          })
        })
      })
    });
  }
  function MDXContent(props = {}) {
    const { wrapper: MDXLayout } = Object.assign({}, useMDXComponents(), props.components);
    return MDXLayout ? (0, import_jsx_runtime.jsx)(MDXLayout, Object.assign({}, props, {
      children: (0, import_jsx_runtime.jsx)(_createMdxContent, props)
    })) : _createMdxContent(props);
  }
  var mdx_bundler_entry_point__random_uuid__default = MDXContent;
  return __toCommonJS(mdx_bundler_entry_point__random_uuid__exports);
})();
;return Component;