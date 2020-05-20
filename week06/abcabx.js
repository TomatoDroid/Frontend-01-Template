function match(data) {
  let state = start;
  for (let c of data) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === "a") {
    return foundA1;
  } else {
    return start;
  }
}

function end() {
  return end;
}

function foundA1(c) {
  if (c === "b") {
    return foundB1;
  } else {
    return start(c);
  }
}

function foundB1(c) {
  if (c === "c") {
    return foundC;
  } else {
    return start(c);
  }
}

function foundC(c) {
  if (c === "a") {
    return foundA2;
  } else {
    return start;
  }
}

function foundA2(c) {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if (c === "x") {
    return end;
  } else {
    return foundB1(c);
  }
}

console.log(match("abcabx"));
