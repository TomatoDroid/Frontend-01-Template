let element = document.body;

let contexts = Object.create(null);

let MOUSE_SYSBOL = Symbol("mouse");

element.addEventListener("mousedown", (event) => {
  contexts[MOUSE_SYSBOL] = Object.create(null);
  start(event, contexts[MOUSE_SYSBOL]);
  let mousemove = (event) => {
    move(event, contexts[MOUSE_SYSBOL]);
  };
  let mouseend = (event) => {
    end(event, contexts[MOUSE_SYSBOL]);
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseend);
  };
  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", mouseend);
});

element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    start(touch, contexts[touch.identifier]);
  }
});
element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    move(touch, contexts[touch.identifier]);
  }
});
element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    end(touch, contexts);
  }
});
element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    cancel(touch, contexts);
  }
});

let start = (point, contexts) => {
  contexts.startX = point.clientX;
  contexts.startY = point.clientY;
  contexts.isTap = true;
  contexts.isPan = false;
  contexts.isPress = false;
  contexts.timoutHandler = setTimeout(() => {
    if (contexts.isPan) {
      return;
    }
    contexts.isTap = false;
    contexts.isPan = false;
    contexts.isPress = true;
    console.log("pressstart");
  }, 500);
};
let move = (point, contexts) => {
  let dx = point.clientX - contexts.startX;
  let dy = point.clientY - contexts.startY;
  if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {
    contexts.isTap = false;
    contexts.isPan = true;
    contexts.isPress = false;
    console.log("panstart");
  }
  if (contexts.isPan) {
    console.log("panmove");
  }
//   console.log("move", point.clientX, point.clientY);
};
let end = (point, contexts) => {
  if (contexts.isPan) {
    console.log("pan");
  }
  if (contexts.isTap) {
    console.log("Tap");
  }
  if (contexts.isPress) {
    console.log("pressend");
  }
  clearTimeout(contexts.timoutHandler);
};
let cancel = (point, contexts) => {
  console.log("cancel");
};
