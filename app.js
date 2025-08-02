const ILR_METADATA_URL = 'YOUR_ILR_METADATA_WEBAPP_URL';
const STAFF_LIST_URL = 'YOUR_STAFF_LIST_WEBAPP_URL';
const TEMP_SUBMIT_URL = 'YOUR_TEMPERATURE_SUBMIT_WEBAPP_URL';

let ilrs = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadStaffList();
  loadILRs();

  document.getElementById('temp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitForm();
  });
});

async function loadILRs() {
  try {
    const response = await fetch(ILR_METADATA_URL);
    ilrs = await response.json();
    if (ilrs.length === 0) {
      showDone();
    } else {
      currentIndex = 0;
      showILR(ilrs[currentIndex]);
    }
  } catch (error) {
    alert('Failed to load ILR data: ' + error);
  }
}

async function loadStaffList() {
  try {
    const response = await fetch(STAFF_LIST_URL);
    const staff = await response.json();
    const staffSelect = document.getElementById('staff');
    staffSelect.innerHTML = '<option value="">Select staff</option>';
    staff.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      staffSelect.appendChild(option);
    });
  } catch (error) {
    const staffSelect = document.getElementById('staff');
    staffSelect.innerHTML = '<option value="">Failed to load staff</option>';
  }
}

function showILR(ilr) {
  document.getElementById('ilr-info').innerHTML = `
    <h2>\${ilr.Name} (\${ilr.ILR_ID})</h2>
    <p><strong>Model:</strong> \${ilr.Model}</p>
    <p><strong>Serial:</strong> \${ilr.Serial}</p>
    <img class="ilr-photo" src="\${ilr.Photo_URL}" alt="ILR Photo" />
  `;
  document.getElementById('ilrId').value = ilr.ILR_ID;
  document.getElementById('sheetId').value = ilr.Sheet_ID;
  document.getElementById('recordedAt').value = '';
  document.getElementById('powerStatus').value = '';
  document.getElementById('temperature').value = '';
  document.getElementById('staff').value = '';
}

async function submitForm() {
  const data = {
    ilrId: document.getElementById('ilrId').value,
    sheetId: document.getElementById('sheetId').value,
    recordedAt: document.getElementById('recordedAt').value,
    powerStatus: document.getElementById('powerStatus').value,
    temperature: parseFloat(document.getElementById('temperature').value).toFixed(1),
    staff: document.getElementById('staff').value
  };
  try {
    const response = await fetch(TEMP_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      currentIndex++;
      if (currentIndex < ilrs.length) {
        showILR(ilrs[currentIndex]);
      } else {
        showDone();
      }
    } else {
      alert('Failed to submit temperature data.');
    }
  } catch (error) {
    alert('Error submitting data: ' + error);
  }
}

function showDone() {
  document.getElementById('ilr-info').innerHTML = '';
  document.getElementById('temp-form').style.display = 'none';
  document.getElementById('done-message').style.display = 'block';
}
