// import assert from "assert";
import { add } from "../src/add.js";
import test from "ava";

test("add", (t) => {
  if (add(3, 4) === 7) {
    t.pass();
  }
});

// describe("add", function () {
//   it("add(3, 4) shoud be 7", function () {
//     assert.equal(add(3, 4), 7);
//   });
// });
