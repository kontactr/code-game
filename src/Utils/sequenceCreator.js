let seqence =
  "ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstuvwxyz`!@#$%^&*()_+-";
//seqence = "AB!";
let regExReplace = /[a-z|A-Z|\W]/g;
let allChars = {},
  index = 0;
for (let k of seqence) {
  allChars[k] = index;
  allChars[index++] = k;
}
index -= 1;
function generateSequence(StartIndex = 1) {
  StartIndex = StartIndex <= 0 ? 1 : StartIndex;
  let t = "";
  for (let p = 0; p < StartIndex; p++) t += allChars[0];
  let length = StartIndex;
  let startSeqence = t;
  return [
    startSeqence,
    function nextSequence() {
      if (t[length - 1] === allChars[index]) {
        while (length > 0 && t[length - 1] === allChars[index]) {
          length -= 1;
        }
        if (length <= 0) {
          t = startSeqence + allChars[0];
          startSeqence += allChars[0];
          length = t.length;
        } else {
          t =
            t.slice(0, length - 1) +
            allChars[allChars[t[length - 1]] + 1] +
            t.slice(length).replace(regExReplace, allChars[0]);
          length = t.length;
        }
      } else {
        t =
          t.slice(0, length - 1) +
          allChars[allChars[t[length - 1]] + 1] +
          t.slice(length + 1);
      }
      return t;
    }
  ];
}
export default generateSequence(1)[1];
