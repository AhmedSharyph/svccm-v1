// script.js - FridgeTrack

const ilrMetaURL = 'https://script.google.com/macros/s/AKfycbzihtn9My9Mo1axcBCpvrDqEsGHsrQo1F7ed50QpLgOxA6C-SfsSHyfq6KkTe-XYjfP/exec';
const staffListURL = 'https://script.google.com/macros/s/AKfycby25kdI1ay3Yhjhipic-1fXa7yOot0uh9Q9z6udH_i8XkvG_o-Yh-AcOnNKdpg8UE_Mwg/exec';
const submitURL = 'https://script.google.com/macros/s/AKfycbzihtn9My9Mo1axcBCpvrDqEsGHsrQo1F7ed50QpLgOxA6C-SfsSHyfq6KkTe-XYjfP/exec';

let ilrList = [];
let currentILRIndex = 0;

// Load ILR data
async function loadILRs() {
  try {
    const response = await fetch(ilrMetaURL);
    const data = await response.json();
    ilrList = data.filter(ilr => ilr.Status === 'Active');
    if (ilrList.length > 0) {
      renderILR(ilrList[0]);
    }
  } catch (error) {
    console.error('Failed to load ILR data:', error);
  }
}

// Render ILR info
function renderILR(ilr) {
  document.getElementById('ilrName').textContent = ilr.Name;
  document.getElementById('ilrModel').textContent = ilr.Model;
  document.getElementById('ilrSerial').textContent = ilr.Serial;
  document.getElementById('ilrPhoto').src = ilr.Photo_URL;
  document.getElementById('ilrId').value = ilr.ILR_ID;
  document.getElementById('ilrSheetId').value = ilr.Sheet_ID;
  document.getElementById('ilrForm').reset();
  loadStaff();
}

// Load staff list
async function loadStaff() {
  try {
    const res = await fetch(staffListURL);
    const staff = await res.json();
    const staffSelect = document.getElementById('staff');
    staffSelect.innerHTML = '';
    staff.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      staffSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load staff list:', error);
  }
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    ilr_id: form.ilrId.value,
    sheet_id: form.ilrSheetId.value,
    datetime: form.datetime.value,
    power_status: form.power.value,
    temperature: form.temperature.value,
    staff: form.staff.value,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(submitURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await res.text();
    document.getElementById('status').textContent = 'Submitted: ' + result;

    // Load next ILR
    currentILRIndex++;
    if (currentILRIndex < ilrList.length) {
      renderILR(ilrList[currentILRIndex]);
    } else {
      document.getElementById('status').textContent += ' — All ILRs done!';
      document.getElementById('ilrForm').style.display = 'none';
    }
  } catch (error) {
    console.error('Submit failed:', error);
    document.getElementById('status').textContent = 'Submission failed';
  }
}

document.getElementById('ilrForm').addEventListener('submit', handleSubmit);
window.onload = loadILRs;
