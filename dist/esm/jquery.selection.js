(function (jQuery) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var jQuery__default = /*#__PURE__*/_interopDefaultLegacy(jQuery);

    /*!
     * jQuery.selection - jQuery Plugin
     *
     * Copyright (c) 2024 しゅう (@shumm7).
     *
     * The major design pattern of this plugin was abstracted from Koji Iwasaki
     * (@madapaja)'s jQuery.selection (https://github.com/madapaja/jquery.selection),
     * which is subject to the same license. Here is the original copyright
     * notice for jQuery.selection:
     *
     *
     * Copyright (c) 2010-2014 IWASAKI Koji (@madapaja).
     * http://blog.madapaja.net/
     * Under The MIT License
     *
     * Permission is hereby granted, free of charge, to any person obtaining
     * a copy of this software and associated documentation files (the
     * "Software"), to deal in the Software without restriction, including
     * without limitation the rights to use, copy, modify, merge, publish,
     * distribute, sublicense, and/or sell copies of the Software, and to
     * permit persons to whom the Software is furnished to do so, subject to
     * the following conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
     * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
     * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
     * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     */
    let $ = jQuery__default["default"];
    let win = window;
    let doc = window.document;
    /**
     * get caret status of the selection of the element
     *
     * @param   {JQuerySelection_Element}   element         target DOM element
     * @return  {JQuerySelection_Opts}    return
     * @return  {JQuerySelection_Text}    return.text     selected text
     * @return  {JQuerySelection_Number}    return.start    start position of the selection
     * @return  {JQuerySelection_Number}    return.end      end position of the selection
     */
    var _getCaretInfo = function (element) {
        var res = {
            text: '',
            start: 0,
            end: 0
        };
        if (!element.value) {
            /* no value or empty string */
            return res;
        }
        try {
            res.start = element.selectionStart ?? undefined;
            res.end = element.selectionEnd ?? undefined;
            res.text = element.value.slice(res.start, res.end);
        }
        catch (e) {
            /* give up */
        }
        return res;
    };
    /**
     * caret operation for the element
     * @type {Object}
     */
    class JQuerySelection_CaretOperation {
        /**
         * get caret position
         *
         * @param   {JQuerySelection_Element}  element         target element
         * @return  {JQuerySelection_Range}    return
         * @return  {JQuerySelection_Number}   return.start    start position for the selection
         * @return  {JQuerySelection_Number}   return.end      end position for the selection
         */
        static getPos(element) {
            var tmp = _getCaretInfo(element);
            return { start: tmp.start, end: tmp.end };
        }
        /**
         * set caret position
         *
         * @param   {JQuerySelection_Element}  element         target element
         * @param   {JQuerySelection_Range}    toRange         caret position
         * @param   {JQuerySelection_Number}   toRange.start   start position for the selection
         * @param   {JQuerySelection_Number}   toRange.end     end position for the selection
         * @param   {JQuerySelection_Caret}    caret           caret mode: any of the following: "keep" | "start" | "end"
         */
        static setPos(element, toRange, caret) {
            caret = this._caretMode(caret);
            if (caret === 'start') {
                toRange.end = toRange.start;
            }
            else if (caret === 'end') {
                toRange.start = toRange.end;
            }
            element.focus();
            try {
                if (element.setSelectionRange) {
                    element.setSelectionRange(toRange.start ?? null, toRange.end ?? null);
                }
            }
            catch (e) {
                /* give up */
            }
        }
        /**
         * get selected text
         *
         * @param   {JQuerySelection_Element} element         target element
         * @return  {JQuerySelection_Text}    return          selected text
         */
        static getText(element) {
            return _getCaretInfo(element).text ?? "";
        }
        /**
         * get caret mode
         *
         * @param   {any}                     caret           caret mode
         * @return  {JQuerySelection_Caret}   return          any of the following: "keep" | "start" | "end"
         */
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
        /**
         * replace selected text
         *
         * @param   {JQuerySelection_Element} element         target element
         * @param   {JQuerySelection_Text}    text            replacement text
         * @param   {JQuerySelection_Caret}   caret           caret mode: any of the following: "keep" | "start" | "end"
         */
        static replace(element, text = "", caret) {
            var tmp = _getCaretInfo(element), orig = element.value, pos = $(element).scrollTop() ?? 0, range = { start: tmp.start, end: (tmp.start ?? 0) + text.length };
            element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.end ?? 0);
            $(element).scrollTop(pos);
            this.setPos(element, range, caret);
        }
        /**
         * insert before the selected text
         *
         * @param   {JQuerySelection_Element} element         target element
         * @param   {JQuerySelection_Text}    text            insertion text
         * @param   {JQuerySelection_Caret}   caret           caret mode: any of the following: "keep" | "start" | "end"
         */
        static insertBefore(element, text = "", caret) {
            var tmp = _getCaretInfo(element), orig = element.value, pos = $(element).scrollTop() ?? 0, range = { start: (tmp.start ?? 0) + text.length, end: (tmp.end ?? 0) + text.length };
            element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.start ?? 0);
            $(element).scrollTop(pos);
            this.setPos(element, range, caret);
        }
        /**
         * insert after the selected text
         *
         * @param   {JQuerySelection_Element} element         target element
         * @param   {JQuerySelection_Text}    text            insertion text
         * @param   {JQuerySelection_Caret}   caret           caret mode: any of the following: "keep" | "start" | "end"
         */
        static insertAfter(element, text = "", caret) {
            var tmp = _getCaretInfo(element), orig = element.value, pos = $(element).scrollTop() ?? 0, range = { start: tmp.start, end: tmp.end };
            element.value = orig.substr(0, tmp.end) + text + orig.substr(tmp.end ?? 0);
            $(element).scrollTop(pos);
            this.setPos(element, range, caret);
        }
    }
    /* add jQuery.selection */
    $.extend({
        /**
         * get selected text on the window
         *
         * @param   {JQuerySelection_SelectionMode} mode            selection mode: any of the following: "text" | "html"
         * @return  {JQuerySelection_Text}          return
         */
        selection: function (mode) {
            var getText = ((mode || 'text').toLowerCase() === 'text');
            try {
                var selection = win.getSelection();
                if (selection) {
                    if (getText) {
                        // get text
                        return selection.toString();
                    }
                    else {
                        // get html
                        var sel = win.getSelection();
                        const anchorNode = sel?.anchorNode;
                        const focusNode = sel?.focusNode;
                        if (sel && anchorNode && focusNode) {
                            var range;
                            if (sel.getRangeAt) {
                                range = sel.getRangeAt(0);
                            }
                            else {
                                range = doc.createRange();
                                range.setStart(anchorNode, sel.anchorOffset);
                                range.setEnd(focusNode, sel.focusOffset);
                            }
                            return $('<div></div>').append(range.cloneContents()).html();
                        }
                    }
                }
            }
            catch (e) {
                /* give up */
            }
            return '';
        }
    });
    /* add selection */
    $.fn.extend({
        selection: function (mode, opts) {
            opts = opts || {};
            switch (mode) {
                /**
                 * selection('getPos')
                 * get caret position
                 *
                 * @return  {JQuerySelection_Range}       return
                 * @return  {JQuerySelection_Number}      return.start    start position for the selection
                 * @return  {JQuerySelection_Number}      return.end      end position for the selection
                 */
                case 'getPos':
                    return JQuerySelection_CaretOperation.getPos(this[0]);
                /**
                 * selection('setPos', opts)
                 * set caret position
                 *
                 * @param   {JQuerySelection_Range}       opts
                 * @param   {JQuerySelection_Number}      opts.start      start position for the selection
                 * @param   {JQuerySelection_Number}      opts.end        end position for the selection
                 */
                case 'setPos':
                    return this.each(function () {
                        JQuerySelection_CaretOperation.setPos(this, opts);
                    });
                /**
                 * selection('replace', opts)
                 * replace the selected text
                 * @param   {JQuerySelection_ReplaceOpts} opts
                 * @param   {JQuerySelection_Text}        opts.text            replacement text
                 * @param   {JQuerySelection_Caret}       opts.caret           caret mode: any of the following: "keep" | "start" | "end"
                 */
                case 'replace':
                    return this.each(function () {
                        JQuerySelection_CaretOperation.replace(this, opts.text, opts.caret);
                    });
                /**
                 * selection('insert', opts)
                 * insert before/after the selected text
                 * @param   {JQuerySelection_InsertOpts}  opts
                 * @param   {JQuerySelection_Text}        opts.text            insertion text
                 * @param   {JQuerySelection_Caret}       opts.caret           caret mode: any of the following: "keep" | "start" | "end"
                 * @param   {JQuerySelection_InsertMode}  opts.mode            insertion mode: any of the following: "before" | "after"
                 */
                case 'insert':
                    return this.each(function () {
                        if (opts.mode === 'before') {
                            JQuerySelection_CaretOperation.insertBefore(this, opts.text, opts.caret);
                        }
                        else {
                            JQuerySelection_CaretOperation.insertAfter(this, opts.text, opts.caret);
                        }
                    });
                /**
                 * selection('get')
                 * get selected text
                 *
                 * @return  {JQuerySelection_Text}    return
                 */
                case 'get':
                /* falls through */
                default:
                    return JQuerySelection_CaretOperation.getText(this[0]);
            }
        }
    });

})(jQuery);
