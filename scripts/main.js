document.addEventListener('DOMContentLoaded', () => {
    const userCountElement = document.getElementById('user-count');
    
    if (userCountElement) {
        // Initial count
        let count = 63019;
        
        // Retrieve count from local storage to simulate persistence during session navigation
        const storedCount = localStorage.getItem('vpnUserCount');
        const lastUpdate = localStorage.getItem('vpnLastUpdate');
        const now = Date.now();

        if (storedCount && lastUpdate) {
            const diff = Math.floor((now - parseInt(lastUpdate)) / 3000); // Estimated increments missed
            count = parseInt(storedCount) + diff;
        }

        const formatter = new Intl.NumberFormat('ru-RU');
        
        const updateDisplay = () => {
             userCountElement.textContent = formatter.format(count);
             userCountElement.classList.add('pulse-text');
             setTimeout(() => userCountElement.classList.remove('pulse-text'), 300);
        };

        updateDisplay();

        // Increment logic
        setInterval(() => {
            // Random increment between 0 and 2 to look natural but growing
            const increment = Math.random() > 0.3 ? 1 : 0; 
            
            if (increment > 0) {
                count += increment;
                updateDisplay();
                
                // Save state
                localStorage.setItem('vpnUserCount', count);
                localStorage.setItem('vpnLastUpdate', Date.now());
            }
        }, 3000); // Every 3 seconds
    }
});
