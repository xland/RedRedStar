import "./Border.scss";
import { onSettled } from "solid-js";
import ipc from "./ipc";
export default function Border() {
  let initDragListener = () => {
    let borderLeft = document.querySelector("#borderLeft");
    borderLeft.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 10 }); // HTLEFT
    });
    let borderTop = document.querySelector("#borderTop");
    borderTop.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 12 }); // HTTOP
    });
    let borderRight = document.querySelector("#borderRight");
    borderRight.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 11 }); // HTRIGHT
    });
    let borderBottom = document.querySelector("#borderBottom");
    borderBottom.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 15 }); // HTBOTTOM
    });
    let cornerTopLeft = document.querySelector("#cornerTopLeft");
    cornerTopLeft.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 13 }); // HTTOPLEFT
    });
    let cornerTopRight = document.querySelector("#cornerTopRight");
    cornerTopRight.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 14 }); // HTTOPRIGHT
    });
    let cornerBottomRight = document.querySelector("#cornerBottomRight");
    cornerBottomRight.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 17 }); // HTBOTTOMRIGHT
    });
    let cornerBottomLeft = document.querySelector("#cornerBottomLeft");
    cornerBottomLeft.addEventListener("mousedown", async (event) => {
      await ipc.invoke("hittest", { val: 16 }); // HTBOTTOMLEFT
    });
  }
  onSettled(() => {
    initDragListener();
  });
  return (
    <>
      <div id="borderLeft"></div>
      <div id="borderTop"></div>
      <div id="borderRight"></div>
      <div id="borderBottom"></div>
      <div id="cornerTopLeft"></div>
      <div id="cornerTopRight"></div>
      <div id="cornerBottomRight"></div>
      <div id="cornerBottomLeft"></div>
    </>
  );
}
