function buildNextMap(pattern) {
  const map = {};
  let idx = 0;
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] === pattern[idx]) {
      idx++;
    } else if (idx > 0) {
      map[`found_${pattern.slice(0, i + 1)}`] = `found_${pattern.slice(
        0,
        idx + 1
      )}`;
      idx = pattern[i] === pattern[idx] ? 1 : 0;
    }
  }
  return map;
}

function buildStatus(pattern) {
  const nextMap = buildNextMap(pattern);
  const status = {
    start: (c) => {
      if (c === `${pattern[0]}`) {
        return pattern.length === 1
          ? status[`end`]
          : status[`found_${pattern.slice(0, 2)}`];
      } else {
        return status["start"];
      }
    },
    end: () => status[`end`],
  };

  for (let i = 1; i < pattern.length; i++) {
    const key = `found_${pattern.slice(0, i + 1)}`;
    const nextKey = `found_${pattern.slice(0, i + 2)}`;
    status[key] = (c) => {
      if (c === pattern[i]) {
        return key === nextKey ? status[`end`] : status[nextKey];
      } else if (nextMap[key]) {
        return status[nextMap[key]](c);
      } else {
        return status["start"](c);
      }
    };
  }
  console.log(status);
  return status;
}

function pattern(patt, str) {
  const status = buildStatus(patt);
  let state = status.start;
  for (let c of str) {
    state = state(c);
  }
  return state === status[`end`];
}

console.log(pattern("abababx", "I am ababababx"));
