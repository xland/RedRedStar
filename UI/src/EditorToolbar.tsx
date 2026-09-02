import "./EditorToolbar.scss";
import { createEffect, createSignal } from "solid-js";
import { getFormatState } from "roosterjs";
import type { ContentModelFormatState, IEditor } from "roosterjs";
import { ToolbarContext } from "./EditorToolbarBtn/ToolbarContext";
import AlignCenterButton from "./EditorToolbarBtn/AlignCenterButton";
import AlignJustifyButton from "./EditorToolbarBtn/AlignJustifyButton";
import AlignLeftButton from "./EditorToolbarBtn/AlignLeftButton";
import AlignMiddleButton from "./EditorToolbarBtn/AlignMiddleButton";
import AlignRightButton from "./EditorToolbarBtn/AlignRightButton";
import BackgroundColorButton from "./EditorToolbarBtn/BackgroundColorButton";
import BoldButton from "./EditorToolbarBtn/BoldButton";
import BulletButton from "./EditorToolbarBtn/BulletButton";
import ClearFormatButton from "./EditorToolbarBtn/ClearFormatButton";
import CodeBlockButton from "./EditorToolbarBtn/CodeBlockButton";
import CodeButton from "./EditorToolbarBtn/CodeButton";
import FontFamilySelect from "./EditorToolbarBtn/FontFamilySelect";
import FontSizeSelect from "./EditorToolbarBtn/FontSizeSelect";
import ItalicButton from "./EditorToolbarBtn/ItalicButton";
import LinkButton from "./EditorToolbarBtn/LinkButton";
import NumberingButton from "./EditorToolbarBtn/NumberingButton";
import QuoteButton from "./EditorToolbarBtn/QuoteButton";
import RedoButton from "./EditorToolbarBtn/RedoButton";
import StrikethroughButton from "./EditorToolbarBtn/StrikethroughButton";
import SubscriptButton from "./EditorToolbarBtn/SubscriptButton";
import SuperscriptButton from "./EditorToolbarBtn/SuperscriptButton";
import TextColorButton from "./EditorToolbarBtn/TextColorButton";
import UnderlineButton from "./EditorToolbarBtn/UnderlineButton";
import UndoButton from "./EditorToolbarBtn/UndoButton";
import UnlinkButton from "./EditorToolbarBtn/UnlinkButton";

export default function EditorToolbar(props: {
  getEditor: () => IEditor | undefined;
}) {
  const [format, setFormat] = createSignal<ContentModelFormatState>({});

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

  const run = (action: (editor: IEditor) => void) => {
    const editor = props.getEditor();
    if (!editor || editor.isDisposed()) return;
    editor.focus();
    action(editor);
    setFormat(getFormatState(editor));
  };

  return (
    <div id="editorToolbar">
      <ToolbarContext
        value={{
          getEditor: props.getEditor,
          format,
          run,
        }}
      >
        <UndoButton />
        <RedoButton />
        <div class="toolDivider" />
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <StrikethroughButton />
        <ClearFormatButton />
        <div class="toolDivider" />
        <SubscriptButton />
        <SuperscriptButton />
        <div class="toolDivider" />
        <FontFamilySelect />
        <FontSizeSelect />
        <div class="toolDivider" />
        <TextColorButton />
        <BackgroundColorButton />
        <div class="toolDivider" />
        <AlignLeftButton />
        <AlignCenterButton />
        <AlignRightButton />
        <AlignJustifyButton />
        <div class="toolDivider" />
        <BulletButton />
        <NumberingButton />
        <QuoteButton />
        <div class="toolDivider" />
        <CodeButton />
        <CodeBlockButton />
        <div class="toolDivider" />
        <LinkButton />
        <UnlinkButton />
        <AlignMiddleButton />
        <div class="toolDivider" />
      </ToolbarContext>
    </div>
  );
}
