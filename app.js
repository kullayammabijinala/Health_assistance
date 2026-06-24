const BASE_URL = "http://localhost:8080/api/health";

// Single Page Navigation Controller
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageId}-page`).classList.add('active');
}

// Intercept and Handle Vitals Processing Submit Engine
document.getElementById('vitalsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        userName: document.getElementById('userName').value,
        age: parseInt(document.getElementById('age').value),
        bloodPressure: parseInt(document.getElementById('bp').value),
        cholesterol: parseInt(document.getElementById('cholesterol').value),
        heartRate: parseInt(document.getElementById('heartRate').value)
    };

    try {
        const response = await fetch(`${BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Server network error occurred.");

        const data = await response.json();
        
        // Show result box elements with data
        const resultBox = document.getElementById('resultBox');
        const resultText = document.getElementById('resultText');
        
        resultText.innerText = `Hello ${data.userName}, based on your vitals inputs, our tracking algorithm classified this status evaluation as: ${data.riskResult}`;
        resultBox.classList.remove('hidden');
        
        // Reset inputs smoothly
        document.getElementById('vitalsForm').reset();

    } catch (error) {
        console.error("Error processing transaction logs:", error);
        alert("Could not process analysis request safely at this time.");
    }
});

// Fetch historical application logs using an async loop structure
async function loadHistory() {
    const tableBody = document.getElementById('historyTableBody');
    tableBody.innerHTML = `<tr><td colspan="6">Loading log arrays...</td></tr>`;

    try {
        const response = await fetch(`${BASE_URL}/history`);
        if (!response.ok) throw new Error("Failed to load historical metrics.");

        const data = await response.json();
        tableBody.innerHTML = ""; // Wipe loading element placeholder

        if(data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6">No previous checkups logged inside the local database.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.userName}</strong></td>
                <td>${item.age}</td>
                <td>${item.bloodPressure} mmHg</td>
                <td>${item.cholesterol} mg/dL</td>
                <td>${item.heartRate} bpm</td>
                <td style="color: ${item.riskResult === 'High Risk' ? '#dc2626' : item.riskResult === 'Moderate Risk' ? '#d97706' : '#16a34a'}; font-weight: bold;">
                    ${item.riskResult}
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error pulling history objects:", error);
        tableBody.innerHTML = `<tr><td colspan="6" style="color: red;">Error pulling historical database structures.</td></tr>`;
    }
}