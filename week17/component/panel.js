import { createElement } from "./createElement";
import { Timeline, Animation } from "./animation";
import { ease } from "./cubicBezier";

import { enableGesture } from "./gesture";

export class Panel {
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
    return (
      <div class="panel" style="border:1px solid lightgreen;width:300px">
        <h1 style="background:lightgreen;width:300px;margin:0">{this.title}</h1>
        <div style="min-height:300px;width:300px;">{this.children}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
