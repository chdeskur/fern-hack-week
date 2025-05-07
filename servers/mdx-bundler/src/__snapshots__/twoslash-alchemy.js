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
      div: "div",
      p: "p"
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
            children: [(0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "import"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
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
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "class"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "T"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " HDAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " PrivateKeyAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Represents a local account signer and provides methods to sign messages and transactions, as well as static methods to create the signer from mnemonic or private key."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "LocalAccountSigner"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " from"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "@aa-sdk/core"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "import"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " alchemy"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemyTransportConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemyTransport"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Creates an Alchemy transport with the specified configuration options. When sending all traffic to Alchemy, you must pass in one of rpcUrl, apiKey, or jwt. If you want to send Bundler and Paymaster traffic to Alchemy and Node traffic to a different RPC, you must pass in alchemyConnection and nodeRpcUrl."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "alchemy"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " createAlchemySmartAccountClient"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TChain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " UserOperationContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " UserOperationContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "params"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemySmartAccountClientConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TChain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemySmartAccountClient"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TChain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Record"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " never"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createAlchemySmartAccountClient"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " sepolia"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "sepolia"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " from"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "@account-kit/infra"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "import"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " createLightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TTransport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Transport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Transport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "any"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TLightAccountVersion"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LightAccountVersion"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ="
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " CreateLightAccountParams"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TTransport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TLightAccountVersion"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "TSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " TLightAccountVersion"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createLightAccount"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " from"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "@account-kit/smart-contracts"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "import"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " http"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "url"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: " config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " HttpTransportConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " HttpTransport"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "http"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " from"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "viem"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "import"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " generatePrivateKey"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "()"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hex"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "generatePrivateKey"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " from"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "viem/accounts"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line",
              children: (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#C2C3C5",
                  fontStyle: "inherit",
                  "--shiki-dark": "#545454",
                  "--shiki-dark-font-style": "italic"
                },
                children: "// with account hoisting"
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
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
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " transport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemyTransport"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "transport"
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
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " alchemy"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemyTransportConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemyTransport"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Creates an Alchemy transport with the specified configuration options. When sending all traffic to Alchemy, you must pass in one of rpcUrl, apiKey, or jwt. If you want to send Bundler and Paymaster traffic to Alchemy and Node traffic to a different RPC, you must pass in alchemyConnection and nodeRpcUrl."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "alchemy"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "apiKey"
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
                        children: " string"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "apiKey"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "your-api-key"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " hoistedClient"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "    ["
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "x"
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
                        children: " string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "]"
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
                        children: " never"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    account"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "            hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 83"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    extend"
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
                        children: " <"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " &"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " ExactPartial"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "fn"
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
                        children: "client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
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
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "hoistedClient"
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
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "createAlchemySmartAccountClient"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "Chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " UserOperationContext "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "params"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " AlchemySmartAccountClientConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createAlchemySmartAccountClient"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "transport"
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
                        children: " AlchemyTransport"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "The RPC transport"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "transport"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " Chain "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Chain for the client."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "chain"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " sepolia"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "sepolia"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "account"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "account"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " await"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "createLightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "AlchemyTransport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " CreateLightAccountParams"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createLightAccount"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "    "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "signer"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signer"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "class"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "T"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " HDAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " PrivateKeyAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Represents a local account signer and provides methods to sign messages and transactions, as well as static methods to create the signer from mnemonic or private key."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "LocalAccountSigner"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "T"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " extends HDAccount "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " PrivateKeyAccount "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " LocalAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: "privateKeyToAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "(key: Hex): LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "PrivateKeyAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["Creates a ", (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "LocalAccountSigner"
                        }), " instance using the provided private key."]
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "privateKeyToAccountSigner"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
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
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " generatePrivateKey"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "()"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hex"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "generatePrivateKey"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "())"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "    "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "chain"
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
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "chain"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " sepolia"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "sepolia"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "    "
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
                        children: "transport"
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
                        children: " AlchemyTransport"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "transport"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "  }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
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
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " signature"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " `"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "0x"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "${"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "`"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signature"
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
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " await"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " hoistedClient"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "    ["
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "x"
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
                        children: " string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "]"
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
                        children: " never"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    account"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "            hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 83"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    extend"
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
                        children: " <"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " &"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " ExactPartial"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "fn"
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
                        children: "client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
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
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "hoistedClient"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "signMessage"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
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
                        children: "args"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SignMessageParameters"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>)"
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
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signMessage"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "message"
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
                        children: " SignableMessage"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "message"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "Hello world! "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: " }"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line",
              children: (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#C2C3C5",
                  fontStyle: "inherit",
                  "--shiki-dark": "#545454",
                  "--shiki-dark-font-style": "italic"
                },
                children: "// without account hoisting"
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " nonHoistedClient"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "    ["
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "x"
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
                        children: " string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "]"
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
                        children: " never"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    account"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    batch"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        multicall"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " boolean"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Prettify"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "MulticallBatchOptions"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 82"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    extend"
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
                        children: " <"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " &"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " ExactPartial"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "fn"
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
                        children: "client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
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
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "nonHoistedClient"
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
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: "createAlchemySmartAccountClient"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " UserOperationContext"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "(params: AlchemySmartAccountClientConfig"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "Chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " SmartContractAccount "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " UserOperationContext "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "): "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createAlchemySmartAccountClient"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "transport"
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
                        children: " AlchemyTransport"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "The RPC transport"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "transport"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "chain"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " Chain "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " undefined"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Chain for the client."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "chain"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " sepolia"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "sepolia"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " lightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "lightAccount"
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
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " await"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "createLightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "AlchemyTransport"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "config"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " CreateLightAccountParams"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "createLightAccount"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "signer"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signer"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "class"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "T"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " HDAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " PrivateKeyAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LocalAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "Represents a local account signer and provides methods to sign messages and transactions, as well as static methods to create the signer from mnemonic or private key."
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "LocalAccountSigner"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "T"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " extends HDAccount "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " PrivateKeyAccount "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "|"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " LocalAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: "privateKeyToAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "(key: Hex): LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "PrivateKeyAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    }), (0, import_jsx_runtime.jsx)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: (0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["Creates a ", (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "LocalAccountSigner"
                        }), " instance using the provided private key."]
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "privateKeyToAccountSigner"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
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
                        children: "function"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " generatePrivateKey"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "()"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hex"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "generatePrivateKey"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "())"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "chain"
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
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "chain"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
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
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " sepolia"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Chain"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "sepolia"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "  "
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
                        children: "transport"
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
                        children: " AlchemyTransport"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "transport"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: ";"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
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
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
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
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " signature2"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " `"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "0x"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "${"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "`"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signature2"
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
                  color: "#D32F2F",
                  fontStyle: "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: " await"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#1976D2",
                  "--shiki-dark": "#EEFFFF"
                },
                children: (0, import_jsx_runtime.jsxs)(_components.span, {
                  className: "twoslash-hover",
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " nonHoistedClient"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "    ["
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          fontStyle: "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "x"
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
                        children: " string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "]"
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
                        children: " never"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    account"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    batch"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        multicall"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " boolean"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Prettify"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "MulticallBatchOptions"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 82"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    extend"
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
                        children: " <"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " extends"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "        ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    }"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " &"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " ExactPartial"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>("
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "fn"
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
                        children: "client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " client"
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
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Client"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                      className: "line",
                      children: (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}"
                      })
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "nonHoistedClient"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#6F42C1",
                  "--shiki-dark": "#82AAFF"
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
                        children: "signMessage"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
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
                        children: "args"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " SignMessageParameters"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">)"
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
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "signMessage"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "{"
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "message"
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
                        children: " SignableMessage"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "message"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: ' "'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "Hello world! "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: '"'
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#F07178"
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
                        children: "account"
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
                        children: " SmartContractAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "string"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " keyof EntryPointRegistryBase"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "unknown"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">>"
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "account"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#D32F2F",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
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
                  children: [(0, import_jsx_runtime.jsxs)(_components.div, {
                    className: "twoslash-popup-info-hover",
                    children: [(0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " lightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " LightAccount"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "LocalAccountSigner"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<{"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Address"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    nonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "?:"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " NonceManager"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " |"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " undefined"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    sign"
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
                        children: "parameters"
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
                        children: " {"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "        hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Hash"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    })"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#C792EA"
                        },
                        children: " =>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " Promise"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "<"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "Hex"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">;"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "    ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#F78C6C"
                        },
                        children: " 6"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#6F42C1",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " more"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ".."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#F07178"
                        },
                        children: "    type"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "local"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ";"
                      })]
                    }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                      className: "line",
                      children: [(0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "}>"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ' "'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#C3E88D"
                        },
                        children: "v2.0.0"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#22863A",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: '"'
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ">"
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "lightAccount"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#212121",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
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