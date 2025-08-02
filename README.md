# FridgeTrack - ILR Temperature Monitoring Tool

## Requirements
- 3 Google Sheets (ILR Metadata, Staff List, Temperature Log)
- 2 GAS Web Apps (see below)

## Setup Instructions

1. **Google Sheets:**
   - Use `ILR_Metadata_Sheet.xlsx`, `Staff_List_Sheet.xlsx`, and `Temperature_Log_Sheet.xlsx` as templates.
   - Upload to Google Sheets and note the IDs.

2. **GAS Web Apps:**
   - Deploy metadata+submit script and staff script as web apps.
   - Enable `Anyone` access for `GET`/`POST`.

3. **Edit JS File:**
   - Replace `submitUrl` and `staffUrl` with your actual GAS URLs if changed.

4. **Deploy HTML:**
   - Host HTML, JS, and CSS via GitHub Pages or any static hosting.

## Author
Shaviyani Atoll Hospital - Vaccine Cold Chain Unit
