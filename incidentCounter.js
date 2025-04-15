function main() {
    console.log("Incident Counter Initialized");
  
    const daysTotal  = document.getElementById("days-tally");
    const hoursTotal = document.getElementById("hours-tally");
    const resetButton = document.getElementById("resetButton");
  
    // Get unique counter key from body attribute
    const counterKey = document.body.getAttribute("data-counter-key") || "defaultCounter";
    const startDateKey = `${counterKey}_startDate`;
  
    // Load or set startDate
    let startDate = localStorage.getItem(startDateKey);
    if (!startDate) {
      startDate = new Date().toISOString();
      localStorage.setItem(startDateKey, startDate);
    }
  
    function updateDisplay() {
      const now = new Date();
      const start = new Date(startDate);
  
      const diffMs = now - start;
      const totalHours = Math.floor(diffMs / 1000 / 60 / 60);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
  
      daysTotal.textContent = days < 10 ? +days : days;
      hoursTotal.textContent = hours < 10 ? +hours : hours;
  
      console.log(`[${counterKey}] Days: ${days}, Hours: ${hours}`);
    }
  
    function resetCounter() {
      const confirmReset = window.confirm("Are you sure you want to reset the counter?");
      if (confirmReset) {
        startDate = new Date().toISOString();
        localStorage.setItem(startDateKey, startDate);
        console.log(`[${counterKey}] Counter reset.`);
        updateDisplay();
      }
    }
  
    resetButton.addEventListener("click", resetCounter);
  
    // Update every second
    setInterval(updateDisplay, 1000);
  
    // Initial display update
    updateDisplay();
  }
  
  main();
  