# Daily Vocabulary Email Sender

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/daily-vocabulary-email/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/daily-vocabulary-email/ci.yml)](https://github.com/yourusername/daily-vocabulary-email/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Google Apps Script project that automatically sends daily vocabulary emails containing words in English, Swahili, and Spanish. The script reads from Google Docs files, batches the words, and formats them into an HTML email table.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)

## Features

- Automated daily email delivery of vocabulary words
- Support for three languages: English, Swahili, and Spanish
- Configurable batch size for daily word count
- HTML-formatted email with responsive table layout
- Persistent indexing to track progress through word lists
- Automatic restart of lists when completed

## Prerequisites

- Google Account with access to Google Drive and Gmail
- Google Apps Script enabled (automatically available with Google Account)
- Three Google Docs files containing vocabulary lists (one for each language)
- Basic understanding of Google Apps Script deployment

## Installation

1. **Create a new Google Apps Script project:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Name your project "Daily Vocabulary Email Sender"

2. **Add the script code:**
   - Copy the contents of `learning_email.js` into the script editor
   - Save the project (Ctrl+S or Cmd+S)

3. **Create vocabulary documents:**
   - In Google Drive, create a folder to store your vocabulary files
   - Create three Google Docs files with your vocabulary lists:
     - One file named "ENGLISH" containing English words (one per line)
     - One file named "SWAHILI" containing Swahili words (one per line)
     - One file named "SPANISH" containing Spanish words (one per line)

4. **Configure permissions:**
   - The script requires access to Google Drive, Docs, and Gmail
   - On first run, you'll be prompted to authorize these permissions

5. **Set up a trigger (optional for automation):**
   - In the Apps Script editor, go to Triggers (clock icon)
   - Add a new trigger for `sendDailyWordEmail` function
   - Set it to run daily at your preferred time

## Configuration

Edit the `CONFIG` object at the top of the script to customize the behavior:

```javascript
const CONFIG = {
  folderId: 'YOUR_FOLDER_ID_HERE', // Google Drive folder ID containing vocabulary files
  fileNames: {
    english: 'ENGLISH', // Name of English vocabulary file
    swahili: 'SWAHILI', // Name of Swahili vocabulary file
    spanish: 'SPANISH'  // Name of Spanish vocabulary file
  },
  emailRecipient: 'your-email@example.com', // Email address to receive daily emails
  batchSize: 10 // Number of words to send per email
};
```

### How to find your folder ID:
1. Open the Google Drive folder containing your vocabulary files
2. The folder ID is the long string in the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

## Usage

### Manual Execution

1. Open your Apps Script project at [script.google.com](https://script.google.com)
2. Select the `sendDailyWordEmail` function from the dropdown
3. Click the play button (▶️) to run the script
4. Check your email for the daily vocabulary message

### Automated Execution

Set up a time-driven trigger as described in the Installation section to run the script automatically every day.

### Example Email Output

The script generates an HTML email with a table format:

| English | Swahili | Spanish |
|---------|---------|---------|
| Hello   | Habari  | Hola    |
| Goodbye | Kwaheri | Adiós   |
| Thank you | Asante | Gracias |

*Note: Once a list finishes, it automatically restarts from the beginning.*

## API Documentation

This project is a standalone Google Apps Script and does not expose any external APIs. All functionality is contained within the script functions:

- `sendDailyWordEmail()`: Main function to send the daily email
- `getFileIdByName(folderId, fileName)`: Retrieves file ID by name from a folder
- `getNextBatch(docId, propertyKey)`: Gets the next batch of words from a document
- `generateTableRows(eng, swa, spa)`: Generates HTML table rows for the email

## Contributing

We welcome contributions to improve this project! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

### Development Setup

1. Clone the repository
2. Copy `learning_email.js` to a new Google Apps Script project
3. Make modifications and test in the Apps Script environment
4. Update this README if necessary

### Code Style

- Use clear, descriptive variable and function names
- Add comments for complex logic
- Follow JavaScript best practices for Google Apps Script

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

**"One or more files could not be found in the specified folder."**
- Verify that your vocabulary files exist in the specified folder
- Check that the file names in `CONFIG.fileNames` match exactly (case-sensitive)
- Ensure the `folderId` in CONFIG is correct

**"Error accessing folder or file"**
- Check your Google Drive permissions
- Make sure the script has been authorized to access Drive and Docs
- Verify that the folder and files are not deleted or moved

**No email received**
- Confirm your email address in `CONFIG.emailRecipient` is correct
- Check your spam/junk folder
- Ensure Gmail permissions are granted to the script

**Script runs but sends empty emails**
- Verify that your vocabulary files contain text
- Check that words are separated by new lines (not spaces)
- Ensure the batch size doesn't exceed available words

**Words not displaying correctly**
- Make sure each word is on a separate line in your Google Docs
- Remove any extra formatting or tables from the documents
- Check for encoding issues if using special characters

### Getting Help

If you encounter issues not covered here:
1. Check the Google Apps Script execution logs for error messages
2. Verify all prerequisites are met
3. Test with a smaller batch size first
4. Reach out to the project maintainers with detailed error information

### Performance Notes

- The script processes documents efficiently but may take longer with very large files
- Daily execution is recommended to avoid Gmail sending limits
- Monitor your Google quota usage for Apps Script executions
