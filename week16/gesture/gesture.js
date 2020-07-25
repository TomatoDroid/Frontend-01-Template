function enableGesture(element) {
  const contexts = Object.create(null);

  const MOUSE_SYMBOL = Symbol("mouseSymbol");

  if (window.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseup = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    });
  }

  element.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  element.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  const start = (point, contexts) => {
    element.dispatchEvent(
      new CustomEvent("start", {
        detail: {
          startX: point.clientX,
          startY: point.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
        },
      })
    );
    contexts.startX = point.clientX;
    contexts.startY = point.clientY;
    contexts.moves = [];
    contexts.isTap = true;
    contexts.isPan = false;
    contexts.isPress = false;
    contexts.timeoutHandler = setTimeout(() => {
      if (contexts.isPan) {
        return;
      }
      contexts.isTap = false;
      contexts.isPan = false;
      contexts.isPress = true;
      element.dispatchEvent(new CustomEvent("pressstart"));
    }, 500);
  };
  const move = (point, contexts) => {
    let dx = point.clientX - contexts.startX;
    let dy = point.clientY - contexts.startY;
    if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {
      if (contexts.isPress) {
        element.dispatchEvent(new CustomEvent("presscancel"));
      }
      contexts.isTap = false;
      contexts.isPan = true;
      contexts.isPress = false;
      element.dispatchEvent(
        new CustomEvent("panstart", {
          detail: {
            startX: contexts.startX,
            startY: contexts.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }
    if (contexts.isPan) {
      contexts.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      contexts.moves = contexts.moves.filter(
        (record) => Date.now() - record.t < 300
      );
      element.dispatchEvent(
        new CustomEvent("pan", {
          detail: {
            startX: contexts.startX,
            startY: contexts.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }
  };
  const end = (point, contexts) => {
    if (contexts.isTap) {
      element.dispatchEvent(new CustomEvent("tap"));
    }
    if (contexts.isPan) {
      const dx = point.clientX;
      const dy = point.clientY;
      const record = contexts.moves[0];
      const speed =
        Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
        (Date.now() - record.t);
      const isFlink = speed > 2.5;
      if (isFlink) {
        element.dispatchEvent(
          new CustomEvent("flink", {
            detail: {
              startX: contexts.startX,
              startY: contexts.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              speed: speed,
            },
          })
        );
      }
      element.dispatchEvent(
        new CustomEvent("panend", {
          detail: {
            startX: contexts.startX,
            startY: contexts.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed: speed,
            isFlink,
          },
        })
      );
    }
    if (contexts.isPress) {
      element.dispatchEvent(new CustomEvent("pressend"));
    }
    clearTimeout(contexts.timeoutHandler);
  };
  const cancel = (point, contexts) => {
    element.dispatchEvent(new CustomEvent("canceled"));
    clearTimeout(contexts.timeoutHandler);
  };
}
