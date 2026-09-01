import "./TitleBar.scss";
import ipc from "./ipc";
import { onSettled } from "solid-js";
export default function TitleBar() {
  let initTitleBtnListener = () => {
    let titleLabel = document.querySelector("#titleLabel");
    titleLabel.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 2 }); // HTCAPTION
    });
    let minimizeBtn = document.querySelector("#minimizeBtn");
    minimizeBtn.addEventListener("mousedown", async (event) => {
      minimizeBtn.classList.add("suppressHover");
      await ipc.invoke("minimize");
      window.addEventListener(
        "mousemove",
        () => {
          document
            .querySelector("#minimizeBtn")
            .classList.remove("suppressHover");
        },
        { once: true },
      );
    });
    let restoreBtn = document.querySelector("#restoreBtn");
    restoreBtn.addEventListener("mousedown", async (event) => {
      await ipc.invoke("restore");
    });
    let maximizeBtn = document.querySelector("#maximizeBtn");
    maximizeBtn.addEventListener("mousedown", async (event) => {
      await ipc.invoke("maximize");
    });
    let closeBtn = document.querySelector("#closeBtn");
    closeBtn.addEventListener("mousedown", async (event) => {
      window.close();
    });
    ipc.on("maximize", () => {
      document.querySelector("#restoreBtn").style.display = "flex";
      document.querySelector("#maximizeBtn").style.display = "none";
    });
    ipc.on("restore", () => {
      document.querySelector("#restoreBtn").style.display = "none";
      document.querySelector("#maximizeBtn").style.display = "flex";
    });
  };
  onSettled(() => {
    initTitleBtnListener();
    ipc.invoke("showWindow");
  });
  return (
    <div id="titleBar">
      <div id="titleLabel">这是窗口标题</div>
      <div id="btnBox">
        <div id="minimizeBtn" class="titleBtn">
          <i class="iconfont minimize"></i>
        </div>
        <div id="restoreBtn" class="titleBtn" style="display:none">
          <i class="iconfont restore"></i>
        </div>
        <div id="maximizeBtn" class="titleBtn">
          <i class="iconfont maximize"></i>
        </div>
        <div id="closeBtn" class="titleBtn">
          <i class="iconfont close"></i>
        </div>
      </div>
    </div>
  );
}
