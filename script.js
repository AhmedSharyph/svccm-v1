const submitUrl = "https://script.google.com/macros/s/AKfycbzihtn9My9Mo1axcBCpvrDqEsGHsrQo1F7ed50QpLgOxA6C-SfsSHyfq6KkTe-XYjfP/exec";
const staffUrl = "https://script.google.com/macros/s/AKfycby25kdI1ay3Yhjhipic-1fXa7yOot0uh9Q9z6udH_i8XkvG_o-Yh-AcOnNKdpg8UE_Mwg/exec";

window.onload = () => {
  fetch(submitUrl + "?mode=ilrs").then(res => res.json()).then(data => {
    const ilrSelect = document.getElementById("ilr");
    data.forEach(ilr => {
      const option = document.createElement("option");
      option.value = ilr.ILR_ID;
      option.textContent = ilr.Name;
      ilrSelect.appendChild(option);
    });
  });

  fetch(staffUrl).then(res => res.json()).then(data => {
    const staffSelect = document.getElementById("staff");
    data.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      staffSelect.appendChild(option);
    });
  });

  document.getElementById("tempForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("timestamp").value = new Date().toISOString();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(submitUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.text();
    document.getElementById("msg").innerText = result;
    e.target.reset();
  });
};
