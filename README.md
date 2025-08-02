# ILR Temperature Monitoring Tool

## Overview

This project provides a mobile-friendly web form to monitor temperatures of ILRs (Ice Lined Refrigerators).  
It dynamically fetches active ILRs and staff list from Google Sheets, and submits temperature data to each ILR’s sheet.

---

## Prerequisites

- Google account with Google Sheets and Apps Script access  
- GitHub account to host HTML/JS/CSS files (optional)  

---

## Step 1: Setup Google Sheets

1. **ILR Metadata Sheet**  
   - Import `ILR_Metadata.csv`  
   - Rename sheet to `data`  
   - Fill ILR info with headers:  
     `ILR_ID, Name, Status, Sheet_ID, Model, Serial, Photo_URL`  
   - Mark active ILRs as `active` (only these appear)  
   - Ensure each active ILR has a sheet tab in temperature log spreadsheet matching its `ILR_ID`

2. **Staff List Sheet**  
   - Import `Staff_List.csv`  
   - Rename to `staff_List`  
   - List staff names starting from cell A2 down  

3. **Temperature Log Spreadsheet**  
   - For each ILR, create a sheet tab named as `ILR_ID`  
   - Add headers:  
     `Timestamp, Date and time, Power status, Temperature, Staff`  

---

## Step 2: Deploy Google Apps Script Web Apps

1. **ILR Metadata and Temperature Submit Script**  
   - Create new standalone GAS project  
   - Paste code from `ILR_Metadata_Submit.gs`  
   - Adjust Spreadsheet IDs if needed  
   - Deploy as web app:  
     - Execute as: Me  
     - Access: Anyone  
   - Copy the Web App URL  

2. **Staff List Script**  
   - New GAS project  
   - Paste code from `Staff_List.gs`  
   - Deploy as web app (same settings)  
   - Copy Web App URL  

---

## Step 3: Update and Host Web App

- Edit `app.js` and replace:  

```js
const ILR_METADATA_URL = 'YOUR_ILR_METADATA_WEBAPP_URL';
const STAFF_LIST_URL = 'YOUR_STAFF_LIST_WEBAPP_URL';
const TEMP_SUBMIT_URL = 'YOUR_TEMPERATURE_SUBMIT_WEBAPP_URL';
