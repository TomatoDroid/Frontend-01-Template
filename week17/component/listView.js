import { createElement } from "./createElement";
import { Timeline, Animation } from "./animation";
import { ease } from "./cubicBezier";

import { enableGesture } from "./gesture";

export class ListView {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();

    this.state = Object.create(null);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }

  appendChild(child) {
    this.children.push(child);
  }

  select(i) {
    for (let view of this.childViews) {
      view.style.display = "none";
    }
    this.childViews[i].style.display = "";

    for (let view of this.titleViews) {
      view.classList.remove("selected");
    }
    this.titleViews[i].classList.add("selected");
  }

  render() {
    let data = this.getAttribute("data");
    return (
      <div class="list-view" style="width:300px">
        {data.map(this.children[0])}
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
