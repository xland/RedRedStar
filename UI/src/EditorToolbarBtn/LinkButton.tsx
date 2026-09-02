import { createEffect, createSignal } from "solid-js";
import { insertLink } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import linkSvg from "./icon/link.svg?raw";

export default function LinkButton() {
  const { run } = useToolbar();
  const [open, setOpen] = createSignal(false);
  const [url, setUrl] = createSignal("");
  let linkInput: HTMLInputElement | undefined;

  createEffect(() => {
    if (open()) linkInput?.focus();
  });

  const confirmLink = () => {
    const value = url().trim();
    if (value) run((ed) => insertLink(ed, value));
    setUrl("");
    setOpen(false);
  };

  return (
    <>
      <button class="toolBtn" title="插入链接" onClick={() => setOpen(true)}>
        <span class="toolIcon" innerHTML={linkSvg} />
      </button>
      <div class={{ toolLink: true, open: open() }}>
        <input
          ref={linkInput}
          type="url"
          placeholder="输入链接地址后回车"
          value={url()}
          onInput={(e) => setUrl(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmLink();
            if (e.key === "Escape") setOpen(false);
          }}
          onBlur={() => setOpen(false)}
        />
      </div>
    </>
  );
}
