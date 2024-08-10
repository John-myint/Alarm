const btn = document.getElementsByClassName("btn")[0];
const hr = document.getElementsByClassName("hr")[0];
const min = document.getElementsByClassName("min")[0];
const sec = document.getElementsByClassName("sec")[0];
const pausebtn = document.getElementsByClassName("pausebtn")[0];

const hrDisplay = document.getElementsByClassName("hrDisplay")[0];
const minDisplay = document.getElementsByClassName("minDisplay")[0];
const secDisplay = document.getElementsByClassName("secDisplay")[0];

let hrValue;
let minValue;
let secValue;
let intervalId;
const updateAlarm = () => {
    hrDisplay.innerHTML = hrValue < 10 ? "0"+ hrValue : hrValue;
    minDisplay.innerHTML = minValue < 10 ? "0"+ minValue : minValue;
    secDisplay.innerHTML =secValue < 10 ? "0"+ secValue : secValue;

}

const clearInput = ()=> {
    hr.value = "";
    min.value = "";
    sec.value = "";
}

const executeAlarm = ()=> {
if (!intervalId) {
        intervalId = setInterval(() => {
            if (secValue === 0) {
                secValue = 59;
                if (minValue === 0) {
                    if (hrValue === 0) {
                        clearInterval(intervalId);
                        intervalId = null;
                        alert("Time's up!");
                        return;
                    } else {
                        hrValue -= 1;
                        minValue = 59;
                    }
                } else {
                    minValue -= 1;
                }
            } else {
                secValue -= 1;
            }
            updateAlarm();
        }, 1000);
}
}
btn.addEventListener("click", ()=>{

    hrValue = parseInt(hr.value , 10);
    minValue = parseInt(min.value , 10);
    secValue = parseInt(sec.value , 10);

    isNaN(hrValue) ? hrValue = 0 : hrValue;
    isNaN(minValue) ? minValue = 0 : minValue;
    isNaN(secValue) ? secValue = 0 : secValue;

    clearInput();
    executeAlarm();
    updateAlarm();
})

pausebtn.addEventListener("click", ()=>{
    clearInterval(intervalId);
    intervalId = null;
})

