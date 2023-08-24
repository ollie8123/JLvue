import Swal from "sweetalert2";

function errorMsg(message) {
  Swal.fire({
    icon: "error",
    title: message,
  });
}
function successMsg(message) {
  Swal.fire({
    icon: "success",
    title: message,
  });
}
function errorsMsgTimer(message, time) {
  Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: time,
  });
}
function successMsgTimer(message, time) {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: time,
  });
}

export { errorMsg,successMsg, successMsgTimer, errorsMsgTimer };
