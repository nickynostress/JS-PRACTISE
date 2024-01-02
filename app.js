let count1 = 0;
let count2 = 0;

function increment(counterId) {
    if (counterId === 'laskuri1') {
        count1++;
        document.getElementById(counterId).innerText = count1;
    } else if (counterId === 'laskuri2') {
        count2++;
        document.getElementById(counterId).innerText = count2;
    }
    console.log("This button was clicked!");
}

function resetAndMove(counterId) {
    // Save the current count before resetting
    let currentCount;
    if (counterId === 'laskuri1') {
        currentCount = count1;
        count1 = 0;
        document.getElementById(counterId).innerText = count1;
    } else if (counterId === 'laskuri2') {
        currentCount = count2;
        count2 = 0;
        document.getElementById(counterId).innerText = count2;
    }

    // Move to result.html with the counts as parameters
    window.location.href = `result.html?count1=${count1}&count2=${count2}`;
}

function disappear() {
    const disappearBtn = document.getElementById('disappear-btn');
    disappearBtn.style.display = 'none'; // Set the display property to 'none' to hide the button
}

function displayTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    document.getElementById('kello').innerHTML = timeString;

    updateAnalogClock(hours, minutes, seconds);
}

function updateAnalogClock(hours, minutes, seconds) {
    const canvas = document.getElementById('analog-clock');
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawClockFace(context, centerX, centerY, radius);

    drawClockHand(context, centerX, centerY, radius * 0.5, getHourAngle(hours, minutes), 'white');
    drawClockHand(context, centerX, centerY, radius * 0.7, getMinuteAngle(minutes, seconds), 'white');
    drawClockHand(context, centerX, centerY, radius * 0.9, getSecondAngle(seconds), 'white');
}

function drawClockFace(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.stroke();
}

function drawClockHand(context, x, y, length, angle, color) {
    const radians = (angle - 90) * (Math.PI / 180);
    const endX = x + length * Math.cos(radians);
    const endY = y + length * Math.sin(radians);

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);
    context.strokeStyle = color;
    context.stroke();
}

function getHourAngle(hours, minutes) {
    return (360 / 12) * (hours % 12) + (360 / 12) * (minutes / 60);
}

function getMinuteAngle(minutes, seconds) {
    return (360 / 60) * minutes + (360 / 60) * (seconds / 60);
}

function getSecondAngle(seconds) {
    return (360 / 60) * seconds;
}

function updateResultLink() {
    const resultLink = document.getElementById('result-link');
    resultLink.href = `result.html?count1=${count1}&count2=${count2}`;
}

setInterval(displayTime, 1000);
// Remove the following line to stop updating the result link every second
// setInterval(updateResultLink, 1000);