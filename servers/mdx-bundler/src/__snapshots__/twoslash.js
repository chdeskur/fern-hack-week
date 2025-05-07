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
      p: "p",
      ul: "ul",
      li: "li",
      a: "a",
      em: "em",
      strong: "strong"
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
                children: "// @filename: b.ts"
              })
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
                        children: "const"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " helloWorld"
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
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "helloWorld"
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
                children: " '"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#C3E88D"
                },
                children: "./a"
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#22863A",
                  "--shiki-dark": "#89DDFF"
                },
                children: "'"
              })]
            }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
              className: "line"
            }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
              className: "line",
              children: [(0, import_jsx_runtime.jsx)(_components.span, {
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
                        children: "var"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " console"
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
                        children: " Console"
                      })]
                    }), (0, import_jsx_runtime.jsxs)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: [(0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["The ", (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "console"
                        }), " module provides a simple debugging console that is similar to the JavaScript console mechanism provided by web browsers."]
                      }), "\n", (0, import_jsx_runtime.jsx)(_components.p, {
                        children: "The module exports two specific components:"
                      }), "\n", (0, import_jsx_runtime.jsxs)(_components.ul, {
                        children: ["\n", (0, import_jsx_runtime.jsxs)(_components.li, {
                          children: ["A ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "Console"
                          }), " class with methods such as ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "console.log()"
                          }), ", ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "console.error()"
                          }), " and ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "console.warn()"
                          }), " that can be used to write to any Node.js stream. * A global ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "console"
                          }), " instance configured to write to ", (0, import_jsx_runtime.jsx)(_components.a, {
                            href: "https://nodejs.org/docs/latest-v20.x/api/process.html#processstdout",
                            children: (0, import_jsx_runtime.jsx)(_components.code, {
                              children: "process.stdout"
                            })
                          }), " and ", (0, import_jsx_runtime.jsx)(_components.a, {
                            href: "https://nodejs.org/docs/latest-v20.x/api/process.html#processstderr",
                            children: (0, import_jsx_runtime.jsx)(_components.code, {
                              children: "process.stderr"
                            })
                          }), ". The global ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "console"
                          }), " can be used without importing the ", (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "node:console"
                          }), " module."]
                        }), "\n"]
                      }), "\n", (0, import_jsx_runtime.jsxs)(_components.p, {
                        children: [(0, import_jsx_runtime.jsx)(_components.em, {
                          children: (0, import_jsx_runtime.jsx)(_components.strong, {
                            children: "Warning"
                          })
                        }), ": The global console object's methods are neither consistently synchronous like the browser APIs they resemble, nor are they consistently asynchronous like all other Node.js streams. See the ", (0, import_jsx_runtime.jsx)(_components.a, {
                          href: "https://nodejs.org/docs/latest-v20.x/api/process.html#a-note-on-process-io",
                          children: (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "note on process I/O"
                          })
                        }), " for more information."]
                      }), "\n", (0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["Example using the global ", (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "console"
                        }), ":"]
                      }), "\n", (0, import_jsx_runtime.jsx)(_components.pre, {
                        className: "shiki shiki-themes min-light material-theme-darker",
                        style: {
                          backgroundColor: "#ffffff",
                          "--shiki-dark-bg": "#212121",
                          color: "#24292eff",
                          "--shiki-dark": "#EEFFFF"
                        },
                        tabIndex: "0",
                        children: (0, import_jsx_runtime.jsxs)(_components.code, {
                          children: [(0, import_jsx_runtime.jsx)(_components.span, {
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
                              children: " name"
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
                              children: " '"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "Will Robinson"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "'"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: ";"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#1976D2",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: " console"
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
                              children: "warn"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: "("
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "`"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "Danger $name! Danger!"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "`"
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
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#C2C3C5",
                                fontStyle: "inherit",
                                "--shiki-dark": "#545454",
                                "--shiki-dark-font-style": "italic"
                              },
                              children: " // Prints: Danger Will Robinson! Danger!, to stderr ```"
                            })]
                          }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                            className: "line"
                          }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                            className: "line",
                            children: [(0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: "Example "
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#D32F2F",
                                "--shiki-dark": "#C792EA"
                              },
                              children: "using"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#1976D2",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: " the"
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
                              children: "Console"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "`"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: " class"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#D32F2F",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: ":"
                            })]
                          }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                            className: "line"
                          }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                            className: "line",
                            children: [(0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "```"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "js const out = getStreamSomehow(); const err = getStreamSomehow(); const myConsole = new console.Console(out, err);"
                            })]
                          }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                            className: "line"
                          }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                            className: "line",
                            children: (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "myConsole.log('hello world'); // Prints: hello world, to out myConsole.log('hello %s', 'world'); // Prints: hello world, to out myConsole.error(new Error('Whoops, something bad happened')); // Prints: [Error: Whoops, something bad happened], to err"
                            })
                          }), "\n", (0, import_jsx_runtime.jsx)(_components.span, {
                            className: "line"
                          }), "\n", (0, import_jsx_runtime.jsxs)(_components.span, {
                            className: "line",
                            children: [(0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "const name = 'Will Robinson'; myConsole.warn("
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "`"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#6F42C1",
                                "--shiki-dark": "#FFCB6B"
                              },
                              children: "Danger"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#6F42C1",
                                "--shiki-dark": "#FFCB6B"
                              },
                              children: " $name"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: "! "
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#6F42C1",
                                "--shiki-dark": "#FFCB6B"
                              },
                              children: "Danger"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#24292EFF",
                                "--shiki-dark": "#EEFFFF"
                              },
                              children: "!"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "`"
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#C3E88D"
                              },
                              children: "); // Prints: Danger Will Robinson! Danger!, to err "
                            }), (0, import_jsx_runtime.jsx)(_components.span, {
                              style: {
                                color: "#22863A",
                                "--shiki-dark": "#89DDFF"
                              },
                              children: "```"
                            })]
                          })]
                        })
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "console"
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
                          color: "#1976D2",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "Console"
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
                        children: "log"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "(message"
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
                        children: " any"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#212121",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ","
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: " ..."
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "optionalParams: any[]): "
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#D32F2F",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "void"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " ("
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
                        children: "1"
                      }), (0, import_jsx_runtime.jsx)(_components.span, {
                        style: {
                          color: "#24292EFF",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " overload)"
                      })]
                    }), (0, import_jsx_runtime.jsxs)(_components.div, {
                      className: "twoslash-popup-jsdoc",
                      children: [(0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["Prints to ", (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "stdout"
                        }), " with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to ", (0, import_jsx_runtime.jsx)(_components.a, {
                          href: "http://man7.org/linux/man-pages/man3/printf.3.html",
                          children: (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "printf(3)"
                          })
                        }), " (the arguments are all passed to ", (0, import_jsx_runtime.jsx)(_components.a, {
                          href: "https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args",
                          children: (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "util.format()"
                          })
                        }), ")."]
                      }), "\n", (0, import_jsx_runtime.jsx)(_components.p, {
                        children: (0, import_jsx_runtime.jsx)(_components.code, {
                          children: "js const count = 5; console.log('count: %d', count); // Prints: count: 5, to stdout console.log('count:', count); // Prints: count: 5, to stdout "
                        })
                      }), "\n", (0, import_jsx_runtime.jsxs)(_components.p, {
                        children: ["See ", (0, import_jsx_runtime.jsx)(_components.a, {
                          href: "https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args",
                          children: (0, import_jsx_runtime.jsx)(_components.code, {
                            children: "util.format()"
                          })
                        }), " for more information."]
                      })]
                    })]
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "log"
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
                        children: " helloWorld"
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
                      })]
                    })
                  }), (0, import_jsx_runtime.jsx)(_components.span, {
                    className: "twoslash-target",
                    children: "helloWorld"
                  })]
                })
              }), (0, import_jsx_runtime.jsx)(_components.span, {
                style: {
                  color: "#24292EFF",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
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