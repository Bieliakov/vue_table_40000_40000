export default {
  rangeArray
}

function rangeArray(size, startAt = 0){
  return [...Array(size).keys()].map(i => i + startAt);
}
