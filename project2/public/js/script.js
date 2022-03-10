document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log(document.getElementById('submitBtn'));
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#datePicker").value = today;
  },
  false
);

// document.getElementById('submitBtn').addEventListener(
//   "DOMContentLoaded",
//   () => {
//     console.log("event triggered");
//     let today = new Date().toISOString().substr(0, 10);
//     document.querySelector("#datePicker").value = today;
//   },
//   false
// );