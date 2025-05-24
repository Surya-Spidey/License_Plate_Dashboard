const airtable_pat = "patg7F8lFnuPttReN.e3fb427584055449046743906b0c2cfa2d44d883e9fb2a875844afbe17313bad";
const base_id = "app6boscwGUbTlwTn";
const table_name = "Vehicles";

fetch(`https://api.airtable.com/v0/${base_id}/${table_name}`, {
  headers: {
    Authorization: `Bearer ${airtable_pat}`,
  },
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("activity-table");
    let total = 0, reg = 0, unreg = 0;

    // Sort records by Timestamp in descending order
    const sortedRecords = data.records.sort((a, b) => {
      return new Date(b.fields["Timestamp"]) - new Date(a.fields["Timestamp"]);
    });

    sortedRecords.forEach(record => {
      const fields = record.fields;
      const plate = fields["Number Plate"] || "N/A";
      const state = fields["State"] || "N/A";
      const user = fields["User"] || "N/A";
      const timestamp = fields["Timestamp"] || "";
      const dt = new Date(timestamp);
      const time = dt.toLocaleTimeString();
      const date = dt.toLocaleDateString();
      const status = user === "Not Registered" ? "Unregistered" : "Registered";
      const gate = fields["Gate Status"] || "Unknown";
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${date}</td>
        <td>${time}</td>
        <td>${plate}</td>
        <td>${state}</td>
        <td>${user}</td>
        <td><span class="${status.toLowerCase()}">${status}</span></td>
        <td><span class="${gate.toLowerCase()}">${gate}</span></td>
      `;
      tbody.appendChild(row);

      total++;
      if (status === "Registered") reg++;
      else unreg++;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("registered").innerText = reg;
    document.getElementById("unregistered").innerText = unreg;
  });
