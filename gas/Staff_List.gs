function doGet(e) {
  const ss = SpreadsheetApp.openById('1BpfqgZiLC76CvrJSEJ3ycQeavhigBrvnj4x6CIfyhXc');
  const sheet = ss.getSheetByName('staff_List');
  const data = sheet.getRange('A2:A').getValues().flat().filter(String);
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
