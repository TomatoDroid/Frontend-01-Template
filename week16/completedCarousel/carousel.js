import { createElement } from "./createElement";
import { Timeline, Animation } from "./animation";
import { ease } from "./cubicBezier";

import { enableGesture } from "./gesture";

export class Carousel {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    const timeline = new Timeline();
    timeline.start();

    let position = 0;

    let nextPicStopHandler = null;

    let children = this.data.map((url, currentPosition) => {
      let lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];

        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        console.log(currentTransformValue);

        offset = currentTransformValue + 500 * currentPosition;
      };
      let onPan = (event) => {
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let currentTransformValue = 500 * currentPosition + offset;
        let lastTransformValue = -500 - 500 * lastPosition + offset;
        let nextTransformValue = 500 - 500 * nextPosition + offset;

        let dx = event.detail.clientX - event.detail.startX;

        console.log(currentTransformValue + dx);

        lastElement.style.transform = `translateX(${
          lastTransformValue + dx
        }px)`;
        currentElement.style.transform = `translateX(${
          currentTransformValue + dx
        }px)`;
        nextElement.style.transform = `translateX(${
          nextTransformValue + dx
        }px)`;
      };

      let element = (
        <img src={url} onstart={onStart} onpan={onPan} enableGesture={true} />
      );
      element.style.transform = `translateX(0px)`;
      element.addEventListener("dragstart", (event) => event.preventDefault());
      return element;
    });
    let root = <div class="carousel">{children}</div>;

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = children[position];
      let next = children[nextPosition];

      let currentAmination = new Animation(
        current.style,
        "transform",
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      let nextAmination = new Animation(
        next.style,
        "transform",
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      timeline.add(currentAmination);
      timeline.add(nextAmination);

      position = nextPosition;
      nextPicStopHandler = setTimeout(nextPic, 3000);
    };
    nextPicStopHandler = setTimeout(nextPic, 3000);

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
