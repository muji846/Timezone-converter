# 🌍 Timezone Converter

A beginner-friendly web application that converts times between different timezones using HTML, CSS, and JavaScript with the Luxon library.

## ✨ Features

- **Easy-to-use Interface**: Simple form with dropdown selections
- **Real-time Conversion**: Instant results as you change inputs
- **Mobile-Friendly**: Responsive design that works on all devices
- **Popular Timezones**: Includes UTC, major US cities, European cities, and Asian cities
- **Detailed Results**: Shows timezone offsets and time differences
- **Error Handling**: User-friendly error messages and validation

## 🚀 How to Run Locally

### Option 1: Using Live Server extension (Recommended)

1. **Install Live Server Extension** (if not already installed):
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Start Live Server**:
   - Right-click on `index.html` in the file explorer
   - Select "Open with Live Server"
   - Your browser will open automatically with the app running

3. **Alternative Method**:
   - Open `index.html` in Cursor
   - Press `Ctrl+Shift+P` to open command palette
   - Type "Live Server: Open with Live Server"
   - Press Enter

### Option 2: Direct File Opening

1. **Navigate to your project folder** in File Explorer
2. **Double-click `index.html`** to open in your default browser
3. **Note**: Some features might not work properly this way due to browser security restrictions

### Option 3: Using Python's Built-in Server

1. **Open Command Prompt/Terminal** in your project directory
2. **Run the command**:
   ```bash
   python -m http.server 8000
   ```
3. **Open your browser** and go to `http://localhost:8000`

## 📁 Project Structure

```
Timezone converter/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## 🔧 How It Works

### 1. HTML Structure (`index.html`)
- **Semantic HTML5**: Uses proper tags like `<header>`, `<main>`, `<footer>`
- **Form Elements**: Date/time input, timezone dropdowns, convert button
- **Luxon Library**: Loaded from CDN for timezone calculations
- **Accessibility**: Proper labels and form structure

### 2. CSS Styling (`styles.css`)
- **Modern Design**: Gradient backgrounds, shadows, and smooth transitions
- **Mobile-First**: Responsive design with media queries
- **Flexbox Layout**: Flexible and adaptive component positioning
- **Visual Feedback**: Hover effects and focus states

### 3. JavaScript Logic (`app.js`)
- **Event Handling**: Listens for user interactions
- **Luxon Integration**: Uses Luxon's DateTime objects for accurate conversions
- **Error Handling**: Validates inputs and shows helpful messages
- **Real-time Updates**: Converts time as user changes inputs

## 🎯 Key Functions Explained

### `setDefaultDateTime()`
- Sets the current date/time when the page loads
- Makes the app more user-friendly

### `handleConversion()`
- Main function that orchestrates the conversion process
- Validates all inputs before proceeding

### `convertTimezone()`
- Uses Luxon to perform the actual timezone conversion
- Handles edge cases and error conditions

### `displayResult()`
- Formats and displays the conversion result
- Shows timezone offsets and time differences

## 🌐 Supported Timezones

- **UTC** - Coordinated Universal Time
- **America/New_York** - Eastern Time (EST/EDT)
- **Europe/London** - Greenwich Mean Time (GMT/BST)
- **Asia/Karachi** - Pakistan Standard Time (PKT)
- **Asia/Dubai** - Gulf Standard Time (GST)
- **Asia/Tokyo** - Japan Standard Time (JST)
- **Australia/Sydney** - Australian Eastern Time (AEST/AEDT)

## 🛠️ Customization Ideas

### Add More Timezones
1. Open `index.html`
2. Find the `<select>` elements
3. Add new `<option>` tags with timezone values

### Change Colors
1. Open `styles.css`
2. Look for color values (like `#667eea`)
3. Replace with your preferred colors

### Add Features
- **Time Zone Map**: Visual representation of timezones
- **Favorites**: Save frequently used timezone combinations
- **History**: Track previous conversions
- **Export**: Save results to calendar or text file

## 🐛 Troubleshooting

### "Luxon is not defined" Error
- Check your internet connection (Luxon loads from CDN)
- Try refreshing the page
- Check browser console for other errors

### Timezone Conversion Not Working
- Ensure you've selected different timezones
- Check that the date/time input is valid
- Look at browser console for error messages

### Mobile Issues
- Ensure viewport meta tag is present (it is in our HTML)
- Test on different mobile devices
- Check CSS media queries

## 📚 Learning Resources

- **Luxon Documentation**: [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
- **MDN Web Docs**: [https://developer.mozilla.org/](https://developer.mozilla.org/)
- **CSS Flexbox Guide**: [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🤝 Contributing

Feel free to:
- Report bugs or issues
- Suggest new features
- Submit improvements
- Ask questions about the code

## 📄 License

This project is open source and available under the MIT License.


