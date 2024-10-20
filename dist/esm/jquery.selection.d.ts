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
export type JQuerySelection_Element = HTMLInputElement;
export type JQuerySelection_Text = string;
export type JQuerySelection_Number = number;
export type JQuerySelection_OperationMode = "replace" | "insert" | "get" | "getPos" | "setPos" | JQuerySelection_SelectionMode;
export type JQuerySelection_Caret = "keep" | "start" | "end";
export type JQuerySelection_InsertMode = "before" | "after";
export type JQuerySelection_SelectionMode = "text" | "html";
export interface JQuerySelection_Opts {
    text?: JQuerySelection_Text;
    caret?: JQuerySelection_Caret;
    mode?: JQuerySelection_InsertMode;
    start?: JQuerySelection_Number;
    end?: JQuerySelection_Number;
}
export interface JQuerySelection_ReplaceOpts extends JQuerySelection_Opts {
    text?: JQuerySelection_Text;
    caret?: JQuerySelection_Caret;
}
export interface JQuerySelection_InsertOpts extends JQuerySelection_Opts {
    text?: JQuerySelection_Text;
    mode?: JQuerySelection_InsertMode;
    caret?: JQuerySelection_Caret;
}
export interface JQuerySelection_Range extends JQuerySelection_Opts {
    start?: JQuerySelection_Number;
    end?: JQuerySelection_Number;
}
declare global {
    interface JQuery {
        /**
         * ## .selection('replace', opts)
         * 選択文字列を置き換えます
         * @param {JQuerySelection_Text} opts.text - 置き換え後の文字列
         *
         * @param {JQuerySelection_Caret} opts.caret - "keep", "start", "end" のいずれか。 指定がない場合、"keep" として処理されます。
         * * "keep" - 選択状態を保持させる（置き換え後の文字列が選択される）
         * * "start" - 選択開始位置にキャレットを移動させる
         * * "end" - 選択終了位置にキャレットを移動させる
         */
        selection(mode: "replace", opts?: {
            text?: string;
            caret?: "keep" | "start" | "end";
        }): JQuery<HTMLElement>;
        /**
         * ## .selection('insert', opts)
         * 選択文字列の前、もしくは後に文字列を挿入します
         * @param {JQuerySelection_Text} opts.text - 挿入する文字列
         *
         * @param {JQuerySelection_InsertMode} opts.mode - 挿入モード "before", "after" のいずれか。
         * * "before" - 選択開始位置（選択文字列の前）に文字列を挿入する
         * * "after" - 選択終了位置（選択文字列の後）に文字列を挿入する
         *
         * @param {JQuerySelection_Caret} opts.caret - キャレットモード "keep", "start", "end" のいずれか。 指定がない場合、"keep" として処理されます。
         * * "keep" - 選択状態を保持させる
         * * "start" - 選択開始位置にキャレットを移動させる
         * * "end" - 選択終了位置にキャレットを移動させる
         */
        selection(mode: "insert", opts?: {
            text?: string;
            mode?: "before" | "after";
            caret?: "keep" | "start" | "end";
        }): JQuery<HTMLElement>;
        /**
         * ## .selection('get')
         * 選択されている文字列を取得します
         * @returns {JQuerySelection_Text} - 選択されている文字列を返します
         */
        selection(mode: "get"): string;
        /**
         * ## .selection('getPos')
         * キャレット位置を取得します
         * @returns {JQuerySelection_Range} - キャレット位置を返します
         * * return.start {Integer} - 選択開始位置
         * * return.end {Integer} - 選択終了位置
         */
        selection(mode: "getPos"): {
            start: number;
            end: number;
        };
        /**
         * ## .selection('setPos', opts)
         * キャレット位置を設定します
         * @param {JQuerySelection_Number} opts.start - 選択開始位置（位置は0から数えます）
         * @param {JQuerySelection_Number} opts.end - 選択終了位置（位置は0から数えます）
         */
        selection(mode: "setPos", opts?: {
            start?: number;
            end?: number;
        }): JQuery<HTMLElement>;
        /**
         * ## jQuery.selection(mode)
         * ウィンドウ内の選択されている文字列を取得します
         * @param {JQuerySelection_SelectionMode} mode - 取得モード "text", "html" のいずれか。 指定がない場合、"text" として処理されます。
         * * "text" - テキストを取得します
         * * "html" - HTMLを取得します
         *
         * @returns {JQuerySelection_Text} - 選択されている文字列を返します。
         */
        selection(mode?: "text" | "html"): string;
    }
}
//# sourceMappingURL=jquery.selection.d.ts.map