let ipc = {
  invoke: (method, args) => {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(8).substring(2);
      const msg = { id, method, ...args };
      ipc[id] = { resolve, reject };
      window.chrome.webview.postMessage(msg);
    });
  },
  on: (eventName, listener) => {
    if (ipc[eventName]) {
      ipc[eventName].push(listener);
    } else {
      ipc[eventName] = [listener];
    }
  },
  off: (eventName, listener) => {
    if (ipc[eventName]) {
      ipc[eventName] = ipc[eventName].filter((l) => l !== listener);
    }
  },
  once: (eventName, listener) => {
    const onceListener = (arg) => {
      listener(arg);
      ipc.off(eventName, onceListener);
    };
    ipc.on(eventName, onceListener);
  },
};
window.chrome.webview.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg.id && ipc[msg.id]) {
    if (msg.error) {
      ipc[msg.id].reject(msg.error);
    } else {
      ipc[msg.id].resolve(msg.result);
    }
    delete ipc[msg.id];
  } else if (msg.eventName && ipc[msg.eventName]) {
    ipc[msg.eventName].forEach((listener) => listener(msg));
  }
});

let initDragListener = () => {
  let titleBox = document.querySelector("#titleBox");
  titleBox.addEventListener("mousedown", async (event) => {
    await ipc.invoke("hittest", { val: 2 }); // HTCAPTION
  });
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
let initTitleBtnListener = () => {
  let minimizeBtn = document.querySelector("#minimizeBtn");
  minimizeBtn.addEventListener("mousedown", async (event) => {
    await ipc.invoke("minimize");
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
    document.querySelector("#restoreBtn").style.display = "block";
    document.querySelector("#maximizeBtn").style.display = "none";
  })
  ipc.on("restore", () => {
    document.querySelector("#restoreBtn").style.display = "none";
    document.querySelector("#maximizeBtn").style.display = "block";
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initDragListener();
  initTitleBtnListener();
  ipc.invoke("showWindow");
});
