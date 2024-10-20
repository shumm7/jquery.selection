declare module "jquery.selection";
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
export {};
//# sourceMappingURL=jquery.selection.d.ts.map