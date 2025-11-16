const CONFIG = {
  folderId: '1Cn-xQBIUb8o5XjQhVphpnX1M7ruQ2Ear', 
  
  fileNames: {
    english: 'ENGLISH', 
    swahili: 'SWAHILI',
    spanish: 'SPANISH'
  },

  emailRecipient: 'calvinkinyanjui017@gmail.com',
  batchSize: 10
};

function sendDailyWordEmail() {
  const englishId = getFileIdByName(CONFIG.folderId, CONFIG.fileNames.english);
  const swahiliId = getFileIdByName(CONFIG.folderId, CONFIG.fileNames.swahili);
  const spanishId = getFileIdByName(CONFIG.folderId, CONFIG.fileNames.spanish);

  if (!englishId || !swahiliId || !spanishId) {
    Logger.log("One or more files could not be found in the specified folder.");
    return;
  }

  const englishBatch = getNextBatch(englishId, 'ENGLISH_INDEX');
  const swahiliBatch = getNextBatch(swahiliId, 'SWAHILI_INDEX');
  const spanishBatch = getNextBatch(spanishId, 'SPANISH_INDEX');

  if (!englishBatch.length && !swahiliBatch.length && !spanishBatch.length) {
    Logger.log("No words found in any documents.");
    return;
  }

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 800px; margin: auto;">
      <h2 style="color: #2c3e50;">Daily Vocabulary / Msamiati wa Siku / Vocabulario Diario</h2>
      <p>Here are your ${CONFIG.batchSize} entries for today:</p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f2f2f2; text-align: left;">
          <th style="padding: 10px; border-bottom: 2px solid #ddd; width: 33%;">English</th>
          <th style="padding: 10px; border-bottom: 2px solid #ddd; width: 33%;">Swahili</th>
          <th style="padding: 10px; border-bottom: 2px solid #ddd; width: 33%;">Spanish</th>
        </tr>
        ${generateTableRows(englishBatch, swahiliBatch, spanishBatch)}
      </table>
      
      <p style="margin-top: 20px; color: #777; font-size: 12px;">
        <em>Note: Once a list finishes, it automatically restarts from the beginning.</em>
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.emailRecipient,
    subject: `Daily Vocabulary: Eng | Swa | Spa - ${new Date().toLocaleDateString()}`,
    htmlBody: htmlBody
  });
}

function getFileIdByName(folderId, fileName) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFilesByName(fileName);
    
    if (files.hasNext()) {
      return files.next().getId();
    } else {
      Logger.log(`Error: Could not find file named "${fileName}" in folder.`);
      return null;
    }
  } catch (e) {
    Logger.log(`Error accessing folder or file: ${e.toString()}`);
    return null;
  }
}

function getNextBatch(docId, propertyKey) {
  const text = DocumentApp.openById(docId).getBody().getText();
  
  // UPDATED: Split by new lines (\n) instead of spaces
  let lines = text.split(/\r?\n/).filter(function(line) {
    return line.trim().length > 0; // Remove empty lines
  });

  if (lines.length === 0) return [];

  // Get the saved index (the "bookmark")
  const scriptProperties = PropertiesService.getScriptProperties();
  let currentIndex = parseInt(scriptProperties.getProperty(propertyKey)) || 0;
  
  let batch = [];
  
  
  if (currentIndex + CONFIG.batchSize <= lines.length) {
    
    batch = lines.slice(currentIndex, currentIndex + CONFIG.batchSize);
    currentIndex += CONFIG.batchSize;
  } else {

    const remaining = lines.slice(currentIndex);
    batch = batch.concat(remaining);
    
    
    const needed = CONFIG.batchSize - remaining.length;
    
    
    if (needed > 0) {
      batch = batch.concat(lines.slice(0, needed));
      currentIndex = needed; 
    } else {
      currentIndex = 0;
    }
  }

  
  if (currentIndex >= lines.length) {
    currentIndex = 0;
  }


  scriptProperties.setProperty(propertyKey, currentIndex.toString());
  
  return batch;
}

function generateTableRows(eng, swa, spa) {
  let rows = '';
  for (let i = 0; i < CONFIG.batchSize; i++) {
    rows += `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; vertical-align: top;">${eng[i] || '-'}</td>
        <td style="padding: 8px; vertical-align: top;">${swa[i] || '-'}</td>
        <td style="padding: 8px; vertical-align: top;">${spa[i] || '-'}</td>
      </tr>
    `;
  }
  return rows;
}