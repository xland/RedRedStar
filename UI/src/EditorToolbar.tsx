import "./EditorToolbar.scss";
import { createEffect, createSignal, For } from "solid-js";
import {
  clearFormat,
  getFormatState,
  insertLink,
  redo,
  removeLink,
  setAlignment,
  setBackgroundColor,
  setFontName,
  setFontSize,
  setTextColor,
  toggleBlockQuote,
  toggleBold,
  toggleBullet,
  toggleCode,
  toggleItalic,
  toggleNumbering,
  toggleStrikethrough,
  toggleSubscript,
  toggleSuperscript,
  toggleUnderline,
  undo,
} from "roosterjs";
import type {
  ContentModelFormatState,
  IEditor,
  ShallowMutableContentModelParagraph,
} from "roosterjs";
import alignCenterSvg from "./EditorToolbar/align-center.svg?raw";
import alignJustifySvg from "./EditorToolbar/align-justify.svg?raw";
import alignLeftSvg from "./EditorToolbar/align-left.svg?raw";
import alignMiddleSvg from "./EditorToolbar/align-middle.svg?raw";
import alignRightSvg from "./EditorToolbar/align-right.svg?raw";
import boldSvg from "./EditorToolbar/bold.svg?raw";
import bulletedListSvg from "./EditorToolbar/bulleted-list.svg?raw";
import codeBlockSvg from "./EditorToolbar/code-block.svg?raw";
import codeSvg from "./EditorToolbar/code.svg?raw";
import fontBackgroundSvg from "./EditorToolbar/font-background.svg?raw";
import fontColorSvg from "./EditorToolbar/font-color.svg?raw";
import fontFamilySvg from "./EditorToolbar/font-family.svg?raw";
import fontSizeSvg from "./EditorToolbar/font-size.svg?raw";
import italicSvg from "./EditorToolbar/italic.svg?raw";
import linkSvg from "./EditorToolbar/link.svg?raw";
import numberedListSvg from "./EditorToolbar/numbered-list.svg?raw";
import quoteSvg from "./EditorToolbar/quote.svg?raw";
import redoSvg from "./EditorToolbar/redo.svg?raw";
import removeFormatSvg from "./EditorToolbar/remove-format.svg?raw";
import strikethroughSvg from "./EditorToolbar/strikethrough.svg?raw";
import subscriptSvg from "./EditorToolbar/subscript.svg?raw";
import superscriptSvg from "./EditorToolbar/superscript.svg?raw";
import underlineSvg from "./EditorToolbar/underline.svg?raw";
import undoSvg from "./EditorToolbar/undo.svg?raw";
import unlinkSvg from "./EditorToolbar/unlink.svg?raw";

const CODE_FONT = "Consolas, monospace";
const CODE_BG = "#f6f8fa";
const DEFAULT_FONT = "微软雅黑";

const FONT_NAMES = [
  "Arial",
  "Arial Black",
  "Calibri",
  "Cambria",
  "Comic Sans MS",
  "Consolas",
  "Courier New",
  "Georgia",
  "Helvetica",
  "Impact",
  "Segoe UI",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "微软雅黑",
  "宋体",
  "黑体",
  "楷体",
  "仿宋",
];

const FONT_SIZES = [
  "10px",
  "11px",
  "12px",
  "14px",
  "15px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
  "60px",
  "72px",
];

/** 对选中的段落整体切换代码块样式（等宽字体 + 灰底） */
function toggleCodeBlock(editor: IEditor) {
  editor.focus();
  editor.formatContentModel((model) => {
    let changed = false;
    model.blocks.forEach((block) => {
      if (block.blockType !== "Paragraph") return;
      const paragraph = block as ShallowMutableContentModelParagraph;
      const segments = paragraph.segments;
      const isCodeBlock =
        segments.length > 0 && segments.every((seg) => !!seg.code);
      segments.forEach((seg) => {
        if (seg.code) {
          if (isCodeBlock) delete seg.code;
        } else {
          seg.code = { format: { fontFamily: CODE_FONT } };
        }
      });
      if (isCodeBlock) {
        if (paragraph.format) delete paragraph.format.backgroundColor;
      } else {
        paragraph.format = { ...paragraph.format, backgroundColor: CODE_BG };
      }
      changed = true;
    });
    return changed;
  });
}

type ToolbarItem =
  | { kind: "divider" }
  | {
      kind: "button";
      key: string;
      title: string;
      icon: string;
      action: (editor: IEditor) => void;
      active?: (state: ContentModelFormatState) => boolean;
      disabled?: (state: ContentModelFormatState) => boolean;
      onClick?: () => void;
    }
  | {
      kind: "select";
      key: string;
      title: string;
      placeholder: string;
      options: string[];
      value: (state: ContentModelFormatState) => string;
      apply: (editor: IEditor, value: string) => void;
    }
  | {
      kind: "color";
      key: string;
      title: string;
      icon: string;
      value: (state: ContentModelFormatState) => string;
      apply: (editor: IEditor, value: string) => void;
    };

export default function EditorToolbar(props: {
  getEditor: () => IEditor | undefined;
}) {
  const [format, setFormat] = createSignal<ContentModelFormatState>({});
  const [linkOpen, setLinkOpen] = createSignal(false);
  const [linkUrl, setLinkUrl] = createSignal("");
  let linkInput: HTMLInputElement | undefined;

  const TOOLBAR: ToolbarItem[] = [
    {
      kind: "button",
      key: "undo",
      title: "撤销 (Ctrl+Z)",
      icon: undoSvg,
      action: undo,
    },
    {
      kind: "button",
      key: "redo",
      title: "重做 (Ctrl+Y)",
      icon: redoSvg,
      action: redo,
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "bold",
      title: "加粗 (Ctrl+B)",
      icon: boldSvg,
      action: toggleBold,
      active: (s) => !!s.isBold,
    },
    {
      kind: "button",
      key: "italic",
      title: "斜体 (Ctrl+I)",
      icon: italicSvg,
      action: toggleItalic,
      active: (s) => !!s.isItalic,
    },
    {
      kind: "button",
      key: "underline",
      title: "下划线 (Ctrl+U)",
      icon: underlineSvg,
      action: toggleUnderline,
      active: (s) => !!s.isUnderline,
    },
    {
      kind: "button",
      key: "strike",
      title: "删除线",
      icon: strikethroughSvg,
      action: toggleStrikethrough,
      active: (s) => !!s.isStrikeThrough,
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "subscript",
      title: "下标",
      icon: subscriptSvg,
      action: toggleSubscript,
      active: (s) => !!s.isSubscript,
    },
    {
      kind: "button",
      key: "superscript",
      title: "上标",
      icon: superscriptSvg,
      action: toggleSuperscript,
      active: (s) => !!s.isSuperscript,
    },
    { kind: "divider" },
    {
      kind: "select",
      key: "fontFamily",
      title: "字体",
      placeholder: DEFAULT_FONT,
      options: FONT_NAMES,
      value: (s) =>
        s.fontName && FONT_NAMES.includes(s.fontName)
          ? s.fontName
          : DEFAULT_FONT,
      apply: (ed, v) => setFontName(ed, v),
    },
    {
      kind: "select",
      key: "fontSize",
      title: "字号",
      placeholder: "15px",
      options: FONT_SIZES,
      value: (s) =>
        s.fontSize && FONT_SIZES.includes(s.fontSize) ? s.fontSize : "15px",
      apply: (ed, v) => setFontSize(ed, v),
    },
    { kind: "divider" },
    {
      kind: "color",
      key: "textColor",
      title: "文字颜色",
      icon: fontColorSvg,
      value: (s) => s.textColor ?? "#333333",
      apply: (ed, v) => setTextColor(ed, v),
    },
    {
      kind: "color",
      key: "backgroundColor",
      title: "背景高亮",
      icon: fontBackgroundSvg,
      value: (s) => s.backgroundColor ?? "#ffff00",
      apply: (ed, v) => setBackgroundColor(ed, v),
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "alignLeft",
      title: "左对齐",
      icon: alignLeftSvg,
      action: (ed) => setAlignment(ed, "left"),
      active: (s) => s.textAlign === "left",
    },
    {
      kind: "button",
      key: "alignCenter",
      title: "居中对齐",
      icon: alignCenterSvg,
      action: (ed) => setAlignment(ed, "center"),
      active: (s) => s.textAlign === "center",
    },
    {
      kind: "button",
      key: "alignRight",
      title: "右对齐",
      icon: alignRightSvg,
      action: (ed) => setAlignment(ed, "right"),
      active: (s) => s.textAlign === "right",
    },
    {
      kind: "button",
      key: "alignJustify",
      title: "两端对齐",
      icon: alignJustifySvg,
      action: (ed) => setAlignment(ed, "justify"),
      active: (s) => s.textAlign === "justify",
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "bullet",
      title: "无序列表",
      icon: bulletedListSvg,
      action: toggleBullet,
      active: (s) => !!s.isBullet,
    },
    {
      kind: "button",
      key: "numbering",
      title: "有序列表",
      icon: numberedListSvg,
      action: toggleNumbering,
      active: (s) => !!s.isNumbering,
    },
    {
      kind: "button",
      key: "quote",
      title: "引用",
      icon: quoteSvg,
      action: toggleBlockQuote,
      active: (s) => !!s.isBlockQuote,
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "code",
      title: "行内代码",
      icon: codeSvg,
      action: toggleCode,
      active: (s) => !!s.isCodeInline,
    },
    {
      kind: "button",
      key: "codeBlock",
      title: "代码块",
      icon: codeBlockSvg,
      action: toggleCodeBlock,
      active: (s) => !!s.isCodeBlock,
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "link",
      title: "插入链接",
      icon: linkSvg,
      action: () => {},
      onClick: () => setLinkOpen(true),
    },
    {
      kind: "button",
      key: "unlink",
      title: "移除链接",
      icon: unlinkSvg,
      action: removeLink,
      disabled: (s) => !s.canUnlink,
    },
    { kind: "divider" },
    {
      kind: "button",
      key: "clearFormat",
      title: "清除格式",
      icon: removeFormatSvg,
      action: clearFormat,
    },
  ];

  createEffect(
    () => props.getEditor(),
    (editor) => {
      if (!editor) return;

      const refresh = () => {
        if (!editor.isDisposed()) setFormat(getFormatState(editor));
      };
      const dispose = editor.attachDomEvent({
        selectionchange: { beforeDispatch: refresh },
        keyup: { beforeDispatch: refresh },
        click: { beforeDispatch: refresh },
        input: { beforeDispatch: refresh },
      });
      refresh();
      return dispose;
    },
  );

  createEffect(
    () => linkOpen(),
    (open) => {
      if (open) linkInput?.focus();
    },
  );

  const run = (action: (editor: IEditor) => void) => {
    const editor = props.getEditor();
    if (!editor || editor.isDisposed()) return;
    editor.focus();
    action(editor);
    setFormat(getFormatState(editor));
  };

  const confirmLink = () => {
    const editor = props.getEditor();
    const url = linkUrl().trim();
    if (editor && !editor.isDisposed() && url) {
      insertLink(editor, url);
      setFormat(getFormatState(editor));
    }
    setLinkUrl("");
    setLinkOpen(false);
  };

  return (
    <div id="editorToolbar">
      <For each={TOOLBAR}>
        {(item) => {
          switch (item.kind) {
            case "divider":
              return <div class="toolDivider" />;
            case "button":
              return (
                <button
                  class={{ toolBtn: true, active: !!item.active?.(format()) }}
                  disabled={item.disabled?.(format())}
                  title={item.title}
                  onClick={() =>
                    item.onClick ? item.onClick() : run(item.action)
                  }
                >
                  <span class="toolIcon" innerHTML={item.icon} />
                </button>
              );
            case "select":
              return (
                <select
                  class="toolSelect"
                  title={item.title}
                  value={item.value(format())}
                  onChange={(e) => {
                    const v = e.currentTarget.value;
                    if (v) run((ed) => item.apply(ed, v));
                  }}
                >
                  <option value="">{item.placeholder}</option>
                  <For each={item.options}>
                    {(opt) => <option value={opt}>{opt}</option>}
                  </For>
                </select>
              );
            case "color":
              return (
                <label class="toolBtn colorBtn" title={item.title}>
                  <span class="toolIcon" innerHTML={item.icon} />
                  <input
                    type="color"
                    value={item.value(format())}
                    onInput={(e) =>
                      run((ed) => item.apply(ed, e.currentTarget.value))
                    }
                  />
                </label>
              );
          }
        }}
      </For>
      <div class={{ toolLink: true, open: linkOpen() }}>
        <input
          ref={linkInput}
          type="url"
          placeholder="输入链接地址后回车"
          value={linkUrl()}
          onInput={(e) => setLinkUrl(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmLink();
            if (e.key === "Escape") setLinkOpen(false);
          }}
          onBlur={() => setLinkOpen(false)}
        />
      </div>
    </div>
  );
}
