// Wait for the DOM to be fully loaded before running our JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Timezone Converter loaded successfully!');
    
    // Get references to all the HTML elements we need to work with
    const dateTimeInput = document.getElementById('dateTime');
    const fromTimezoneSelect = document.getElementById('fromTimezone');
    const toTimezoneSelect = document.getElementById('toTimezone');
    const convertBtn = document.getElementById('convertBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultDisplay = document.getElementById('resultDisplay');
    
    // Set the default date/time to current time when the page loads
    setDefaultDateTime();
    
    // Add event listener to the convert button
    convertBtn.addEventListener('click', handleConversion);
    
    // Add event listeners to inputs for real-time conversion (optional enhancement)
    dateTimeInput.addEventListener('change', handleConversion);
    fromTimezoneSelect.addEventListener('change', handleConversion);
    toTimezoneSelect.addEventListener('change', handleConversion);
    
    /**
     * Sets the default date and time to the current local time
     * This makes the app more user-friendly by not requiring users to input current time
     */
    function setDefaultDateTime() {
        const now = new Date();
        
        // Format the current date/time for the datetime-local input
        // We need to convert to local timezone string format (YYYY-MM-DDTHH:MM)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        dateTimeInput.value = formattedDateTime;
        
        console.log('Default date/time set to:', formattedDateTime);
    }
    
    /**
     * Main function that handles the timezone conversion
     * This function is called whenever the user clicks convert or changes inputs
     */
    function handleConversion() {
        // Get the values from all input fields
        const dateTimeValue = dateTimeInput.value;
        const fromTimezone = fromTimezoneSelect.value;
        const toTimezone = toTimezoneSelect.value;
        
        // Validate that all required fields are filled
        if (!dateTimeValue || !fromTimezone || !toTimezone) {
            showError('Please fill in all fields before converting.');
            return;
        }
        
        // Validate that the timezones are different (no point converting to same timezone)
        if (fromTimezone === toTimezone) {
            showError('Please select different timezones for conversion.');
            return;
        }
        
        try {
            // Perform the actual timezone conversion
            const convertedTime = convertTimezone(dateTimeValue, fromTimezone, toTimezone);
            
            // Display the result
            displayResult(convertedTime, fromTimezone, toTimezone);
            
        } catch (error) {
            console.error('Conversion error:', error);
            showError('An error occurred during conversion. Please try again.');
        }
    }
    
    /**
     * Converts a date/time from one timezone to another using Luxon
     * @param {string} dateTimeString - The input date/time string (YYYY-MM-DDTHH:MM format)
     * @param {string} fromTimezone - The source timezone (e.g., "America/New_York")
     * @param {string} toTimezone - The target timezone (e.g., "Europe/London")
     * @returns {Object} - Object containing the converted time information
     */
    function convertTimezone(dateTimeString, fromTimezone, toTimezone) {
        console.log(`Converting from ${fromTimezone} to ${toTimezone}`);
        
        // Parse the input date/time string
        // We need to create a DateTime object in the source timezone first
        const sourceDateTime = luxon.DateTime.fromISO(dateTimeString, {
            zone: fromTimezone
        });
        
        // Check if the DateTime was created successfully
        if (!sourceDateTime.isValid) {
            throw new Error(`Invalid date/time: ${sourceDateTime.invalidReason}`);
        }
        
        console.log('Source time:', sourceDateTime.toISO());
        
        // Convert to the target timezone
        const targetDateTime = sourceDateTime.setZone(toTimezone);
        
        console.log('Target time:', targetDateTime.toISO());
        
        // Return an object with all the information we need
        return {
            source: {
                time: sourceDateTime,
                timezone: fromTimezone,
                offset: sourceDateTime.offsetNameLong
            },
            target: {
                time: targetDateTime,
                timezone: toTimezone,
                offset: targetDateTime.offsetNameLong
            },
            // Calculate the time difference between timezones
            timeDifference: targetDateTime.offset - sourceDateTime.offset
        };
    }
    
    /**
     * Displays the conversion result in a user-friendly format
     * @param {Object} result - The conversion result object
     * @param {string} fromTimezone - Source timezone name
     * @param {string} toTimezone - Target timezone name
     */
    function displayResult(result, fromTimezone, toTimezone) {
        // Format the times in a readable way
        const sourceTime = result.source.time.toFormat('EEEE, MMMM d, yyyy \'at\' h:mm a');
        const targetTime = result.target.time.toFormat('EEEE, MMMM d, yyyy \'at\' h:mm a');
        
        // Get timezone abbreviations for display
        const sourceAbbr = result.source.time.toFormat('ZZ');
        const targetAbbr = result.target.time.toFormat('ZZ');
        
        // Create the result HTML
        const resultHTML = `
            <div class="time-display">
                <div class="source-time">
                    <strong>${fromTimezone} (${sourceAbbr}):</strong><br>
                    ${sourceTime}
                </div>
                <div class="conversion-arrow">→</div>
                <div class="target-time">
                    <strong>${toTimezone} (${targetAbbr}):</strong><br>
                    ${targetTime}
                </div>
            </div>
            <div class="timezone-info">
                <p><strong>Timezone Offset:</strong> ${result.source.offset} → ${result.target.offset}</p>
                <p><strong>Time Difference:</strong> ${formatTimeDifference(result.timeDifference)}</p>
            </div>
        `;
        
        // Update the display
        resultDisplay.innerHTML = resultHTML;
        resultContainer.style.display = 'block';
        
        // Scroll to the result for better UX
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        console.log('Result displayed successfully');
    }
    
    /**
     * Formats the time difference in a human-readable way
     * @param {number} differenceMinutes - Time difference in minutes
     * @returns {string} - Formatted time difference string
     */
    function formatTimeDifference(differenceMinutes) {
        const hours = Math.floor(Math.abs(differenceMinutes) / 60);
        const minutes = Math.abs(differenceMinutes) % 60;
        
        let result = '';
        if (hours > 0) {
            result += `${hours} hour${hours !== 1 ? 's' : ''}`;
            if (minutes > 0) {
                result += ` and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
        } else {
            result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
        
        // Add direction (ahead or behind)
        if (differenceMinutes > 0) {
            result += ' ahead';
        } else if (differenceMinutes < 0) {
            result += ' behind';
        } else {
            result = 'Same time';
        }
        
        return result;
    }
    
    /**
     * Shows an error message to the user
     * @param {string} message - The error message to display
     */
    function showError(message) {
        // Hide any previous results
        resultContainer.style.display = 'none';
        
        // Show error in the result area
        resultDisplay.innerHTML = `<div class="error-message">❌ ${message}</div>`;
        resultContainer.style.display = 'block';
        
        // Add error styling
        resultContainer.style.borderLeftColor = '#e74c3c';
        
        console.error('Error displayed:', message);
    }
    
    // Add some CSS for the error message
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .error-message {
            color: #e74c3c;
            font-weight: 600;
            text-align: center;
            padding: 10px;
        }
        
        .time-display {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .source-time, .target-time {
            flex: 1;
            min-width: 200px;
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e1e5e9;
        }
        
        .conversion-arrow {
            font-size: 1.5rem;
            color: #667eea;
            font-weight: bold;
        }
        
        .timezone-info {
            border-top: 1px solid #e1e5e9;
            padding-top: 15px;
            margin-top: 15px;
        }
        
        .timezone-info p {
            margin-bottom: 8px;
        }
        
        @media (max-width: 600px) {
            .time-display {
                flex-direction: column;
                text-align: center;
            }
            
            .conversion-arrow {
                transform: rotate(90deg);
            }
        }
    `;
    document.head.appendChild(errorStyle);
    
    console.log('All event listeners and functions set up successfully!');
});
