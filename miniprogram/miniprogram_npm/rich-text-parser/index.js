module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1607224703672, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _html2json = require('./html2json');

var _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parser = function (_ParseJson) {
  _inherits(Parser, _ParseJson);

  function Parser() {
    _classCallCheck(this, Parser);

    return _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).apply(this, arguments));
  }

  _createClass(Parser, [{
    key: 'getRichTextJson',
    value: function getRichTextJson(html) {
      return _get(Parser.prototype.__proto__ || Object.getPrototypeOf(Parser.prototype), 'getHtmlJson', this).call(this, html);
    }
  }, {
    key: 'definedCustomTag',
    value: function definedCustomTag(options) {
      var newOptions = {};
      for (var i in options) {
        newOptions[i] = options[i] ? options[i] : 'div';
      }
      _get(Parser.prototype.__proto__ || Object.getPrototypeOf(Parser.prototype), 'definedCustomTag', this).call(this, newOptions);
    }
  }]);

  return Parser;
}(_html2json2.default);

var parser = new Parser();
exports.default = parser;
}, function(modId) {var map = {"./html2json":1607224703673}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1607224703673, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _discode = require('./discode');

var _discode2 = _interopRequireDefault(_discode);

var _htmlparser = require('./htmlparser');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlToJson = function () {
  function HtmlToJson() {
    _classCallCheck(this, HtmlToJson);

    this.__placeImgeUrlHttps = 'https';
    this.customTag = {};
  }

  _createClass(HtmlToJson, [{
    key: 'removeDoctype',
    value: function removeDoctype(html) {
      return html.replace(/<\?xml.*\?>\n/, '').replace(/<.*!doctype.*\n/, '').replace(/<.*!DOCTYPE.*\n/, '');
    }
  }, {
    key: 'trimHtml',
    value: function trimHtml(html) {
      return html.replace(/\r?\n+/g, '').replace(/<!--.*?-->/ig, '').replace(/\/\*.*?\*\//ig, '').replace(/[ ]+</ig, '<');
    }
  }, {
    key: 'definedCustomTag',
    value: function definedCustomTag(options) {
      this.customTag = options;
    }
  }, {
    key: 'getHtmlJson',
    value: function getHtmlJson(html) {
      html = this.removeDoctype(html);
      html = this.trimHtml(html);
      html = _discode2.default.strDiscode(html);
      var customTag = this.customTag;


      var bufArray = [];
      var results = {
        children: []
      };

      (0, _htmlparser2.default)(html, {
        start: function start(tag, attrs, unary) {
          var node = {
            name: tag
          };

          if (attrs.length !== 0) {
            node.attrs = attrs.reduce(function (pre, attr) {
              var name = attr.name;
              var value = attr.value;
              if (pre[name]) {
                if (Array.isArray(pre[name])) {
                  pre[name].push(value);
                } else {
                  pre[name] = [pre[name], value];
                }
              } else {
                pre[name] = value;
              }
              return pre;
            }, {});
          }

          node.attrs = Object.assign({}, node.attrs);
          var hasClass = node.attrs.hasOwnProperty('class');
          node.attrs.class = hasClass ? node.attrs.class + ' rich-' + node.name : 'rich-' + node.name;

          if (node.name === 'img') {
            var imgUrl = node.attrs.src;
            if (imgUrl[0] === '') {
              imgUrl.splice(0, 1);
            }
            imgUrl = _discode2.default.urlToHttpUrl(imgUrl, this.__placeImgeUrlHttps);
            node.attrs.src = imgUrl;
          }

          if (node.name === 'source') {
            results.source = node.attrs.src;
          }

          if (unary) {
            var parent = bufArray[0] || results;
            if (parent.children === undefined) {
              parent.children = [];
            }
            parent.children.push(node);
          } else {
            bufArray.unshift(node);
          }
        },
        end: function end(tag) {
          var node = bufArray.shift();
          if (node.name !== tag) console.error('invalid state: mismatch end tag');

          if (node.name === 'video' && results.source) {
            node.attrs.src = results.source;
            delete results.source;
          }

          if (customTag.hasOwnProperty(node.name)) {
            node.name = customTag[node.name];
          }

          if (bufArray.length === 0) {
            results.children.push(node);
          } else {
            var parent = bufArray[0];
            if (parent.children === undefined) {
              parent.children = [];
            }
            parent.children.push(node);
          }
        },
        chars: function chars(text) {
          var node = {
            text: text,
            type: 'text'
          };

          if (bufArray.length === 0) {
            results.children.push(node);
          } else {
            var parent = bufArray[0];
            if (parent.children === undefined) {
              parent.children = [];
            }
            parent.children.push(node);
          }
        },
        comment: function comment(text) {}
      });

      return results;
    }
  }]);

  return HtmlToJson;
}();

exports.default = HtmlToJson;
}, function(modId) { var map = {"./discode":1607224703674,"./htmlparser":1607224703675}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1607224703674, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Discode = function () {
  function Discode() {
    _classCallCheck(this, Discode);
  }

  _createClass(Discode, [{
    key: 'strNumDiscode',
    value: function strNumDiscode(str) {
      str = str.replace(/&forall;/g, '∀');
      str = str.replace(/&part;/g, '∂');
      str = str.replace(/&exists;/g, '∃');
      str = str.replace(/&empty;/g, '∅');
      str = str.replace(/&nabla;/g, '∇');
      str = str.replace(/&isin;/g, '∈');
      str = str.replace(/&notin;/g, '∉');
      str = str.replace(/&ni;/g, '∋');
      str = str.replace(/&prod;/g, '∏');
      str = str.replace(/&sum;/g, '∑');
      str = str.replace(/&minus;/g, '−');
      str = str.replace(/&lowast;/g, '∗');
      str = str.replace(/&radic;/g, '√');
      str = str.replace(/&prop;/g, '∝');
      str = str.replace(/&infin;/g, '∞');
      str = str.replace(/&ang;/g, '∠');
      str = str.replace(/&and;/g, '∧');
      str = str.replace(/&or;/g, '∨');
      str = str.replace(/&cap;/g, '∩');
      str = str.replace(/&cap;/g, '∪');
      str = str.replace(/&int;/g, '∫');
      str = str.replace(/&there4;/g, '∴');
      str = str.replace(/&sim;/g, '∼');
      str = str.replace(/&cong;/g, '≅');
      str = str.replace(/&asymp;/g, '≈');
      str = str.replace(/&ne;/g, '≠');
      str = str.replace(/&le;/g, '≤');
      str = str.replace(/&ge;/g, '≥');
      str = str.replace(/&sub;/g, '⊂');
      str = str.replace(/&sup;/g, '⊃');
      str = str.replace(/&nsub;/g, '⊄');
      str = str.replace(/&sube;/g, '⊆');
      str = str.replace(/&supe;/g, '⊇');
      str = str.replace(/&oplus;/g, '⊕');
      str = str.replace(/&otimes;/g, '⊗');
      str = str.replace(/&perp;/g, '⊥');
      str = str.replace(/&sdot;/g, '⋅');
      return str;
    }
  }, {
    key: 'strGreeceDiscode',
    value: function strGreeceDiscode(str) {
      str = str.replace(/&Alpha;/g, 'Α');
      str = str.replace(/&Beta;/g, 'Β');
      str = str.replace(/&Gamma;/g, 'Γ');
      str = str.replace(/&Delta;/g, 'Δ');
      str = str.replace(/&Epsilon;/g, 'Ε');
      str = str.replace(/&Zeta;/g, 'Ζ');
      str = str.replace(/&Eta;/g, 'Η');
      str = str.replace(/&Theta;/g, 'Θ');
      str = str.replace(/&Iota;/g, 'Ι');
      str = str.replace(/&Kappa;/g, 'Κ');
      str = str.replace(/&Lambda;/g, 'Λ');
      str = str.replace(/&Mu;/g, 'Μ');
      str = str.replace(/&Nu;/g, 'Ν');
      str = str.replace(/&Xi;/g, 'Ν');
      str = str.replace(/&Omicron;/g, 'Ο');
      str = str.replace(/&Pi;/g, 'Π');
      str = str.replace(/&Rho;/g, 'Ρ');
      str = str.replace(/&Sigma;/g, 'Σ');
      str = str.replace(/&Tau;/g, 'Τ');
      str = str.replace(/&Upsilon;/g, 'Υ');
      str = str.replace(/&Phi;/g, 'Φ');
      str = str.replace(/&Chi;/g, 'Χ');
      str = str.replace(/&Psi;/g, 'Ψ');
      str = str.replace(/&Omega;/g, 'Ω');
      str = str.replace(/&alpha;/g, 'α');
      str = str.replace(/&beta;/g, 'β');
      str = str.replace(/&gamma;/g, 'γ');
      str = str.replace(/&delta;/g, 'δ');
      str = str.replace(/&epsilon;/g, 'ε');
      str = str.replace(/&zeta;/g, 'ζ');
      str = str.replace(/&eta;/g, 'η');
      str = str.replace(/&theta;/g, 'θ');
      str = str.replace(/&iota;/g, 'ι');
      str = str.replace(/&kappa;/g, 'κ');
      str = str.replace(/&lambda;/g, 'λ');
      str = str.replace(/&mu;/g, 'μ');
      str = str.replace(/&nu;/g, 'ν');
      str = str.replace(/&xi;/g, 'ξ');
      str = str.replace(/&omicron;/g, 'ο');
      str = str.replace(/&pi;/g, 'π');
      str = str.replace(/&rho;/g, 'ρ');
      str = str.replace(/&sigmaf;/g, 'ς');
      str = str.replace(/&sigma;/g, 'σ');
      str = str.replace(/&tau;/g, 'τ');
      str = str.replace(/&upsilon;/g, 'υ');
      str = str.replace(/&phi;/g, 'φ');
      str = str.replace(/&chi;/g, 'χ');
      str = str.replace(/&psi;/g, 'ψ');
      str = str.replace(/&omega;/g, 'ω');
      str = str.replace(/&thetasym;/g, 'ϑ');
      str = str.replace(/&upsih;/g, 'ϒ');
      str = str.replace(/&piv;/g, 'ϖ');
      str = str.replace(/&middot;/g, '·');
      return str;
    }
  }, {
    key: 'strcharacterDiscode',
    value: function strcharacterDiscode(str) {
      // 加入常用解析
      str = str.replace(/&nbsp;/g, ' ');
      str = str.replace(/&quot;/g, "'");
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&#8226;/g, '•');
      return str;
    }
  }, {
    key: 'strOtherDiscode',
    value: function strOtherDiscode(str) {
      str = str.replace(/&OElig;/g, 'Œ');
      str = str.replace(/&oelig;/g, 'œ');
      str = str.replace(/&Scaron;/g, 'Š');
      str = str.replace(/&scaron;/g, 'š');
      str = str.replace(/&Yuml;/g, 'Ÿ');
      str = str.replace(/&fnof;/g, 'ƒ');
      str = str.replace(/&circ;/g, 'ˆ');
      str = str.replace(/&tilde;/g, '˜');
      str = str.replace(/&ensp;/g, '');
      str = str.replace(/&emsp;/g, '');
      str = str.replace(/&thinsp;/g, '');
      str = str.replace(/&zwnj;/g, '');
      str = str.replace(/&zwj;/g, '');
      str = str.replace(/&lrm;/g, '');
      str = str.replace(/&rlm;/g, '');
      str = str.replace(/&ndash;/g, '–');
      str = str.replace(/&mdash;/g, '—');
      str = str.replace(/&lsquo;/g, '‘');
      str = str.replace(/&rsquo;/g, '’');
      str = str.replace(/&sbquo;/g, '‚');
      str = str.replace(/&ldquo;/g, '“');
      str = str.replace(/&rdquo;/g, '”');
      str = str.replace(/&bdquo;/g, '„');
      str = str.replace(/&dagger;/g, '†');
      str = str.replace(/&Dagger;/g, '‡');
      str = str.replace(/&bull;/g, '•');
      str = str.replace(/&hellip;/g, '…');
      str = str.replace(/&permil;/g, '‰');
      str = str.replace(/&prime;/g, '′');
      str = str.replace(/&Prime;/g, '″');
      str = str.replace(/&lsaquo;/g, '‹');
      str = str.replace(/&rsaquo;/g, '›');
      str = str.replace(/&oline;/g, '‾');
      str = str.replace(/&euro;/g, '€');
      str = str.replace(/&trade;/g, '™');
      str = str.replace(/&larr;/g, '←');
      str = str.replace(/&uarr;/g, '↑');
      str = str.replace(/&rarr;/g, '→');
      str = str.replace(/&darr;/g, '↓');
      str = str.replace(/&harr;/g, '↔');
      str = str.replace(/&crarr;/g, '↵');
      str = str.replace(/&lceil;/g, '⌈');
      str = str.replace(/&rceil;/g, '⌉');
      str = str.replace(/&lfloor;/g, '⌊');
      str = str.replace(/&rfloor;/g, '⌋');
      str = str.replace(/&loz;/g, '◊');
      str = str.replace(/&spades;/g, '♠');
      str = str.replace(/&clubs;/g, '♣');
      str = str.replace(/&hearts;/g, '♥');
      str = str.replace(/&diams;/g, '♦');
      str = str.replace(/&#39;/g, '\'');
      return str;
    }
  }, {
    key: 'strMoreDiscode',
    value: function strMoreDiscode(str) {
      str = str.replace(/\r\n/g, '');
      str = str.replace(/\n/g, '');
      str = str.replace(/code/g, 'wxxxcode-style');
      return str;
    }
  }, {
    key: 'strDiscode',
    value: function strDiscode(str) {
      str = this.strNumDiscode(str);
      str = this.strGreeceDiscode(str);
      str = this.strcharacterDiscode(str);
      str = this.strOtherDiscode(str);
      str = this.strMoreDiscode(str);
      return str;
    }
  }, {
    key: 'urlToHttpUrl',
    value: function urlToHttpUrl(url, rep) {
      var patt1 = new RegExp('^//');
      var result = patt1.test(url);
      if (result) {
        url = rep + ':' + url;
      }
      return url;
    }
  }]);

  return Discode;
}();

var disCode = new Discode();
exports.default = disCode;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1607224703675, function(require, module, exports) {


/**
 * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 */

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");

function HTMLParser(html, handler) {
	var index,
	    chars,
	    match,
	    stack = [],
	    last = html;
	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {
		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") == 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					if (handler.comment) handler.comment(html.substring(4, index));
					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") == 0) {
				match = html.match(endTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") == 0) {
				match = html.match(startTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(startTag, parseStartTag);
					chars = false;
				}
			}

			if (chars) {
				index = html.indexOf("<");
				var text = '';
				while (index === 0) {
					text += "<";
					html = html.substring(1);
					index = html.indexOf("<");
				}
				text += index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (handler.chars) handler.chars(text);
			}
		} else {

			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) handler.chars(text);

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html == last) throw "Parse Error: " + html;
		last = html;
	}

	// Clean up any remaining tags
	parseEndTag();

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();

		if (block[tagName]) {
			while (stack.last() && inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (closeSelf[tagName] && stack.last() == tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		if (!unary) stack.push(tagName);

		if (handler.start) {
			var attrs = [];

			rest.replace(attr, function (match, name) {
				var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}
		}
	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		if (!tagName) var pos = 0;

		// Find the closest opened tag of the same type
		else {
				tagName = tagName.toLowerCase();
				for (var pos = stack.length - 1; pos >= 0; pos--) {
					if (stack[pos] == tagName) break;
				}
			}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.end) handler.end(stack[i]);
			} // Remove the open elements from the stack
			stack.length = pos;
		}
	}
};

function makeMap(str) {
	var obj = {},
	    items = str.split(",");
	for (var i = 0; i < items.length; i++) {
		obj[items[i]] = true;
	}return obj;
}

module.exports = HTMLParser;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1607224703672);
})()
//# sourceMappingURL=index.js.map