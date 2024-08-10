const setStopBtn = document.getElementsByClassName("setStopBtn")[0];
const hr = document.getElementsByClassName("hr")[0];
const min = document.getElementsByClassName("min")[0];
const sec = document.getElementsByClassName("sec")[0];
const togglebtn = document.getElementsByClassName("togglebtn")[0];

const hrDisplay = document.getElementsByClassName("hrDisplay")[0];
const minDisplay = document.getElementsByClassName("minDisplay")[0];
const secDisplay = document.getElementsByClassName("secDisplay")[0];

let hrValue, minValue, secValue;
let intervalId = null;
let isPaused = false;

const updateAlarm = () => {
    hrDisplay.innerHTML = hrValue < 10 ? "0" + hrValue : hrValue;
    minDisplay.innerHTML = minValue < 10 ? "0" + minValue : minValue;
    secDisplay.innerHTML = secValue < 10 ? "0" + secValue : secValue;
};

const clearInput = () => {
    hr.value = "";
    min.value = "";
    sec.value = "";
};

const executeAlarm = () => {
    intervalId = setInterval(() => {
        if (secValue === 0) {
            secValue = 59;
            if (minValue === 0) {
                if (hrValue === 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    togglebtn.textContent = "Play";
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
};

setStopBtn.addEventListener("click", () => {
    if (intervalId === null) {
        // Timer is not running, so set the alarm
        hrValue = parseInt(hr.value, 10);
        minValue = parseInt(min.value, 10);
        secValue = parseInt(sec.value, 10);

        if (isNaN(hrValue)) hrValue = 0;
        if (isNaN(minValue)) minValue = 0;
        if (isNaN(secValue)) secValue = 0;

        updateAlarm();
        clearInput();
        executeAlarm();
        togglebtn.textContent = "Pause"; // Set button text to "Pause" when starting
        setStopBtn.textContent = "Stop"; // Change button text to "Stop"
    } else {
        // Timer is running, so stop the alarm
        clearInterval(intervalId);
        intervalId = null;
        togglebtn.textContent = "Play";
        setStopBtn.textContent = "Set"; // Reset button text to "Set"
    }
});

togglebtn.addEventListener("click", () => {
    if (intervalId === null) {
        // Timer is not running, so start or resume it
        executeAlarm();
        togglebtn.textContent = "Pause";
        isPaused = false;
    } else if (isPaused) {
        // Timer is paused, resume it
        executeAlarm();
        togglebtn.textContent = "Pause";
        isPaused = false;
    } else {
        // Timer is running, pause it
        clearInterval(intervalId);
        intervalId = null;
        togglebtn.textContent = "Play";
        isPaused = true;
    }
});
