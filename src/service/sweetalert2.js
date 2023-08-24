import Swal from "sweetalert2";

//設置彈窗高度
function setZIndexForSwal() {
  const swalPopup = document.querySelector(".swal2-container");
  if (swalPopup) {
    swalPopup.style.zIndex = "3000";
  }
}

function errorMsg(message) {
  Swal.fire({
    icon: "error",
    title: message,
    didOpen: setZIndexForSwal,
  });
}

function successMsg(message) {
  Swal.fire({
    icon: "success",
    title: message,
    didOpen: setZIndexForSwal,
  });
}
function errorsMsgTimer(message, time) {
  Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: time,
    didOpen: setZIndexForSwal,
  });
}
function successMsgTimer(message, time) {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: time,
    didOpen: setZIndexForSwal,
  });
}

export { errorMsg,successMsg, successMsgTimer, errorsMsgTimer };
