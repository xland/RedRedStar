import "./WinBorder.scss";
import msg from "./msg";
export default function WinBorder() {
  return (
    <>
      <div id="borderLeft" onMouseDown={() => msg.invoke("hittest", { val: 10 })} />
      <div id="borderTop" onMouseDown={() => msg.invoke("hittest", { val: 12 })} />
      <div id="borderRight" onMouseDown={() => msg.invoke("hittest", { val: 11 })} />
      <div id="borderBottom" onMouseDown={() => msg.invoke("hittest", { val: 15 })} />
      <div id="cornerTopLeft" onMouseDown={() => msg.invoke("hittest", { val: 13 })} />
      <div id="cornerTopRight" onMouseDown={() => msg.invoke("hittest", { val: 14 })} />
      <div id="cornerBottomRight" onMouseDown={() => msg.invoke("hittest", { val: 17 })} />
      <div id="cornerBottomLeft" onMouseDown={() => msg.invoke("hittest", { val: 16 })} />
    </>
  );
}
