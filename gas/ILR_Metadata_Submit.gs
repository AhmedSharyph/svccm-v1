const ILR_SHEET_NAME = 'data';

function doGet(e) {
  const ss = SpreadsheetApp.openById('1gHOP_AvCawsIo2gzT9_GEVx_EQk5NmnmqAvsU1SIwI0');
  const sheet = ss.getSheetByName(ILR_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const activeILRs = data.slice(1).filter(row => row[2].toLowerCase() === 'active').map(row => ({
    ILR_ID: row[0],
    Name: row[1],
    Status: row[2],
    Sheet_ID: row[3],
    Model: row[4],
    Serial: row[5],
    Photo_URL: row[6]
  }));
  return ContentService.createTextOutput(JSON.stringify(activeILRs))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(data.sheetId);
  const sheet = ss.getSheetByName(data.ilrId);
  sheet.appendRow([
    new Date(),        // Timestamp (submission time)
    data.recordedAt,   // Date and time of measurement (user input)
    data.powerStatus,
    data.temperature,
    data.staff
  ]);
  return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.TEXT);
}
