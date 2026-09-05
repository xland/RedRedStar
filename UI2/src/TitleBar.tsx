import "./TitleBar.scss";
import msg from "./msg";
export default function TitleBar() {
  const onMinimize = async (e: MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    btn.classList.add("suppressHover");
    await msg.invoke("minimize");
    window.addEventListener(
      "mousemove",
      () => {
        document.querySelector<HTMLElement>("#minimizeBtn")?.classList.remove("suppressHover");
      },
      { once: true },
    );
  };
  const syncMaximizeBtn = (restored: boolean) => {
    document.querySelector<HTMLElement>("#restoreBtn").style.display = restored ? "none" : "flex";
    document.querySelector<HTMLElement>("#maximizeBtn").style.display = restored ? "flex" : "none";
  };
  msg.on("maximize", () => syncMaximizeBtn(false));
  msg.on("restore", () => syncMaximizeBtn(true));
  msg.once("ready", () => {
    msg.invoke("showWindow");
  });
  return (
    <div id="titleBar">
      <div id="titleLabel" onMouseDown={() => msg.invoke("hittest", { val: 2 })}>
        这是窗口标题
      </div>
      <div id="btnBox">
        <div id="minimizeBtn" class="titleBtn" onMouseDown={onMinimize}>
          <i class="iconfont minimize"></i>
        </div>
        <div id="restoreBtn" class="titleBtn" style="display:none" onMouseDown={() => msg.invoke("restore")}>
          <i class="iconfont restore"></i>
        </div>
        <div id="maximizeBtn" class="titleBtn" onMouseDown={() => msg.invoke("maximize")}>
          <i class="iconfont maximize"></i>
        </div>
        <div id="closeBtn" class="titleBtn" onMouseDown={() => window.close()}>
          <i class="iconfont close"></i>
        </div>
      </div>
    </div>
  );
}
