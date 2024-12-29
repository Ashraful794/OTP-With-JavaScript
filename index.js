let generatedOTP;

const otpExpireElem = document.getElementById("otp-expires-id");

let intvId;
let timeoutId;

function expireOTP() {
  const totalTime = 15000;
  const interval = 1000;

  let slice = totalTime / interval;

  intvId = setInterval(function () {
    otpExpireElem.innerText = `OTP will expire in ${slice} seconds`;
    slice = slice - 1;
  }, interval);

  timeoutId = setTimeout(function () {
    otpExpireElem.innerText = "OTP Expired";
    clearInterval(intvId);
    generateOTP();
  }, totalTime);
}

function resetInput() {
  clearInterval(intvId);
  otpExpireElem.innerText = "";
  clearTimeout(timeoutId);
}

function tackleOTPBoxes() {
  const boxes = document.getElementById("otp-box-list-id");
  boxes.addEventListener("input", function (e) {
    const target = e.target;
    const value = target.value;

    if (isNaN(value)) {
      target.value = "";
      return;
    }

    const nextElement = target.nextElementSibling;

    if (nextElement) {
      nextElement.focus();
    }

    validateOTP();
  });

  boxes.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      const target = e.target;

      if (target.value !== "") {
        target.value = "";
        target.focus();
      } else if (target.value === "") {
        const prevElement = target.previousElementSibling;

        if (prevElement) {
          prevElement.value = "";
          prevElement.focus();
        }
      }
    }
  });

  setTimeout(generateOTP, 2000);
}

function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  const otpElem = document.getElementById("geenerated-otp-id");

  otpElem.innerText = `Your OTP: ${generatedOTP}`;

  expireOTP();
}

function validateOTP() {
  let typedNumber = "";
  const boxListElem = document.getElementById("otp-box-list-id");
  let target;
  [...boxListElem.children].forEach((elem) => {
    typedNumber = typedNumber + elem.value;
    target = elem;
  });

  console.log(generatedOTP, typedNumber);

  const result = generatedOTP === parseInt(typedNumber, 10);
  const resultElem = document.getElementById("result-id");
  if (result) {
    resultElem.innerText = "OTP has been validate successfully";
    resultElem.classList.remove("fail");
    resultElem.classList.add("success");
    resetInput();
    target.blur();
  } else {
    resultElem.innerText = "OTP is Invalid";
    resultElem.classList.remove("success");
    resultElem.classList.add("fail");
  }
}

function init() {
  console.log("JavaScript initialization done!!!");
  tackleOTPBoxes();
  setTimeout(generateOTP, 2000);
}

tackleOTPBoxes();
