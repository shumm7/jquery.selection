declare module "jquery.selection";
type JQuerySelection_Text = string;
type JQuerySelection_Number = number;
type JQuerySelection_Caret = "keep" | "start" | "end";
type JQuerySelection_InsertMode = "before" | "after";
type JQuerySelection_SelectionMode = "text" | "html";
interface JQuerySelection_Opts {
    text?: JQuerySelection_Text;
    caret?: JQuerySelection_Caret;
    mode?: JQuerySelection_InsertMode;
    start?: JQuerySelection_Number;
    end?: JQuerySelection_Number;
}
interface JQuerySelection_ReplaceOpts extends JQuerySelection_Opts {
    text: JQuerySelection_Text;
    caret?: JQuerySelection_Caret;
}
interface JQuerySelection_InsertOpts extends JQuerySelection_Opts {
    text: JQuerySelection_Text;
    mode: JQuerySelection_InsertMode;
    caret?: JQuerySelection_Caret;
}
interface JQuerySelection_Range extends JQuerySelection_Opts {
    start?: JQuerySelection_Number;
    end?: JQuerySelection_Number;
}
export interface JQuerySelection extends JQuery {
    selection(mode: "replace", opts: JQuerySelection_ReplaceOpts): JQuery<HTMLElement>;
    selection(mode: "insert", opts: JQuerySelection_InsertOpts): JQuery<HTMLElement>;
    selection(mode: "get"): string;
    selection(mode: "getPos"): JQuerySelection_Range;
    selection(mode: "setPos", opts: JQuerySelection_Range): JQuery<HTMLElement>;
    selection(mode?: JQuerySelection_SelectionMode): string;
}
export {};
//# sourceMappingURL=jquery.selection.d.ts.map