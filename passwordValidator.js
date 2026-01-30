// function isValidPassword(password, username) {
//   if (password.length < 8) {
//     return false;
//   }
//   if (password.indexOf(' ') !== -1) {
//     return false;
//   }
//   if (password.indexOf(username) !== -1) {
//     return false;
//   }
//   return true;
// }

function avg(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  let res = total / arr.length;
  return res;
}