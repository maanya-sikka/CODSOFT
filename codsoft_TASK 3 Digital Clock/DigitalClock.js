let intervalId; // Variable to store the interval ID

function updateClock() {
    const selectedTimeZone = document.getElementById('timezone').value;
    let now;

    if (selectedTimeZone === 'local') {
        now = new Date();
    } else {
        // Use Intl.DateTimeFormat to format the date consistently
        now = new Date().toLocaleString("en-US", { timeZone: selectedTimeZone });
        now = new Date(now);
    }

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    document.getElementById('hours').innerText = (hours % 12) || 12;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
    document.getElementById('period').innerText = period;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options);

    const isNightTime = hours >= 19 || hours < 6;
    document.body.classList.toggle('dark-mode', isNightTime);
}

function startClockInterval() {
    clearInterval(intervalId); // Clear existing interval before starting a new one
    intervalId = setInterval(updateClock, 1000); // Set a new interval
}

// Add event listener for timezone change
document.getElementById('timezone').addEventListener('change', function () {
    updateClock(); // Update immediately when timezone changes
    startClockInterval(); // Start the interval again
});

// Initial call to display the clock immediately
updateClock();

// Start the interval initially
startClockInterval();
