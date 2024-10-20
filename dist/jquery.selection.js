(function (jQuery) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var jQuery__default = /*#__PURE__*/_interopDefaultLegacy(jQuery);

    (function ($, win, doc) {
      var _getCaretInfo = function (element) {
        var res = {
          text: '',
          start: 0,
          end: 0
        };
        if (!element.value) {
          return res;
        }
        try {
          res.start = element.selectionStart ?? undefined;
          res.end = element.selectionEnd ?? undefined;
          res.text = element.value.slice(res.start, res.end);
        } catch (e) {}
        return res;
      };
      class JQuerySelection_CaretOperation {
        static getPos(element) {
          var tmp = _getCaretInfo(element);
          return {
            start: tmp.start,
            end: tmp.end
          };
        }
        static setPos(element, toRange, caret) {
          caret = this._caretMode(caret);
          if (caret === 'start') {
            toRange.end = toRange.start;
          } else if (caret === 'end') {
            toRange.start = toRange.end;
          }
          element.focus();
          try {
            if (element.setSelectionRange) {
              element.setSelectionRange(toRange.start ?? 0, toRange.end ?? 0);
            }
          } catch (e) {}
        }
        static getText(element) {
          return _getCaretInfo(element).text ?? "";
        }
        static _caretMode(caret) {
          caret = caret || "keep";
          if (caret === false) {
            caret = 'end';
          }
          switch (caret) {
            case 'keep':
            case 'start':
            case 'end':
              break;
            default:
              caret = 'keep';
          }
          return caret;
        }
        static replace(element, text = "", caret) {
          var tmp = _getCaretInfo(element),
            orig = element.value,
            pos = $(element).scrollTop() ?? 0,
            range = {
              start: tmp.start,
              end: tmp.start ?? 0 + text.length
            };
          element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.end ?? 0);
          $(element).scrollTop(pos);
          this.setPos(element, range, caret);
        }
        static insertBefore(element, text = "", caret) {
          var tmp = _getCaretInfo(element),
            orig = element.value,
            pos = $(element).scrollTop() ?? 0,
            range = {
              start: (tmp.start ?? 0) + text.length,
              end: (tmp.end ?? 0) + text.length
            };
          element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.start ?? 0);
          $(element).scrollTop(pos);
          this.setPos(element, range, caret);
        }
        static insertAfter(element, text = "", caret) {
          var tmp = _getCaretInfo(element),
            orig = element.value,
            pos = $(element).scrollTop() ?? 0,
            range = {
              start: tmp.start,
              end: tmp.end
            };
          element.value = orig.substr(0, tmp.end) + text + orig.substr(tmp.end ?? 0);
          $(element).scrollTop(pos);
          this.setPos(element, range, caret);
        }
      }
      $.extend({
        selection: function (mode) {
          var getText = (mode || 'text').toLowerCase() === 'text';
          try {
            var selection = win.getSelection();
            if (selection) {
              if (getText) {
                return selection.toString();
              } else {
                var sel = win.getSelection();
                const anchorNode = sel?.anchorNode;
                const focusNode = sel?.focusNode;
                if (sel && anchorNode && focusNode) {
                  var range;
                  if (sel.getRangeAt) {
                    range = sel.getRangeAt(0);
                  } else {
                    range = doc.createRange();
                    range.setStart(anchorNode, sel.anchorOffset);
                    range.setEnd(focusNode, sel.focusOffset);
                  }
                  return $('<div></div>').append(range.cloneContents()).html();
                }
              }
            }
          } catch (e) {}
          return '';
        }
      });
      $.fn.extend({
        selection: function (mode, opts) {
          opts = opts || {};
          switch (mode) {
            case 'getPos':
              return JQuerySelection_CaretOperation.getPos(this[0]);
            case 'setPos':
              return this.each(function () {
                JQuerySelection_CaretOperation.setPos(this, opts);
              });
            case 'replace':
              return this.each(function () {
                JQuerySelection_CaretOperation.replace(this, opts.text, opts.caret);
              });
            case 'insert':
              return this.each(function () {
                if (opts.mode === 'before') {
                  JQuerySelection_CaretOperation.insertBefore(this, opts.text, opts.caret);
                } else {
                  JQuerySelection_CaretOperation.insertAfter(this, opts.text, opts.caret);
                }
              });
            case 'get':
            default:
              return JQuerySelection_CaretOperation.getText(this[0]);
          }
          return this;
        }
      });
    })(jQuery__default["default"], window, window.document);

})(jQuery);
