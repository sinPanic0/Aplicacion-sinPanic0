const state = {};
const subjectId = 1;

function setState(updater) {
  Object.assign(state, updater(state));
}

setState(prev => ({ ...prev, [subjectId]: { completedToday: true } }));

console.log(state);
console.log(state[subjectId]?.completedToday);
console.log(state[1]?.completedToday);
console.log(state["1"]?.completedToday);
