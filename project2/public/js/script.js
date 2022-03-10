const { update } = require("../../models/User.model");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#datePicker").value = today;
  },
  false
);

