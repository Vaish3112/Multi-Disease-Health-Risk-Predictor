document.addEventListener("DOMContentLoaded", function() {

const result = localStorage.getItem("riskResult") || "Low";
document.getElementById("risk-text").textContent = "Your risk: " + result; // update text

// update gauge
const gaugeFill = document.getElementById("gauge-fill");
const gaugeText = document.getElementById("gauge-text");
let percent = 0;
let color = "";
if (result === "Low") {
  percent = 30;
  color = "green";
} else if (result === "Medium") {
  percent = 70;
  color = "orange";
} else {
  percent = 100;
  color = "red";
}

const circumference = 2 * Math.PI * 70; 
const offset = circumference - (circumference * percent / 100);
gaugeFill.style.strokeDashoffset = offset;
gaugeFill.style.stroke = color;
gaugeText.textContent = percent + "%";


// Recommendation content with personalization
const adviceDiv = document.getElementById("advice-text");
let adviceHTML = "";

// Get predictor & inputs
const predictorName = localStorage.getItem("lastPredictor") || "Unknown Predictor";
let inputs = {};
if (predictorName === "Diabetes Predictor") inputs = JSON.parse(localStorage.getItem("diabetesInputs")) || {};
else if (predictorName === "Heart Disease Predictor") inputs = JSON.parse(localStorage.getItem("heartInputs")) || {};
else if (predictorName === "Hypertension Predictor") inputs = JSON.parse(localStorage.getItem("hypertensionInputs")) || {};
else if (predictorName === "Hyperlipidemia Predictor") inputs = JSON.parse(localStorage.getItem("hyperlipidemiaInputs")) || {};

// Personalized advice arrays
let extraAdvice = [];

// Diabetes personalization
if(predictorName === "Diabetes Predictor"){
    if(inputs.bmi > 25) extraAdvice.push("Maintain a healthy BMI.");
    if(inputs.fastingBS > 100) extraAdvice.push("Monitor fasting blood sugar levels.");
    if(inputs.postprandialBS > 140) extraAdvice.push("Check postprandial blood sugar regularly.");
    if(inputs.activity === "Low") extraAdvice.push("Increase physical activity.");
    if(inputs.familyHistory === "Yes") extraAdvice.push("Regular checkups are recommended due to family history.");
}

// Heart Disease personalization
if(predictorName === "Heart Disease Predictor"){
    if(inputs.cholesterol > 200) extraAdvice.push("Watch your cholesterol intake.");
    if(inputs.bp){
        const bp = inputs.bp.split("/").map(Number);
        if(bp[0] > 140 || bp[1] > 90) extraAdvice.push("Monitor blood pressure regularly.");
    }
    if(inputs.smoking === "Yes") extraAdvice.push("Consider quitting smoking.");
    if(inputs.diabetes === "Yes") extraAdvice.push("Manage diabetes carefully.");
    if(inputs.activity === "Low") extraAdvice.push("Increase physical activity for heart health.");
    if(inputs.familyHistory === "Yes") extraAdvice.push("Family history indicates higher risk — regular checkups advised.");
}

// Hypertension personalization
if(predictorName === "Hypertension Predictor"){
    if(inputs.systolic > 140 || inputs.diastolic > 90) extraAdvice.push("Keep track of your blood pressure frequently.");
    if(inputs.bmi > 25) extraAdvice.push("Maintain a healthy BMI.");
    if(inputs.activity === "Low") extraAdvice.push("Engage in regular physical activity.");
    if(inputs.lifestyle === "Yes") extraAdvice.push("Reduce smoking/alcohol consumption.");
    if(inputs.familyHistory === "Yes") extraAdvice.push("Family history increases risk — consult a doctor regularly.");
}

// Hyperlipidemia personalization
if(predictorName === "Hyperlipidemia Predictor"){
    if(inputs.totalChol > 200) extraAdvice.push("Reduce high cholesterol through diet and exercise.");
    if(inputs.ldl > 130) extraAdvice.push("Monitor LDL levels closely.");
    if(inputs.hdl < 50) extraAdvice.push("Increase HDL with healthy fats and activity.");
    if(inputs.trig > 150) extraAdvice.push("Watch triglyceride levels; avoid sugary foods.");
    if(inputs.bmi > 25) extraAdvice.push("Maintain healthy BMI.");
    if(inputs.familyHistory === "Yes") extraAdvice.push("Regular lipid profile checkups are recommended.");
}

// Construct HTML based on risk level
if(result === "Low"){
    adviceHTML = `
        <div class="recommendation-card" style="background:#e0ffe0; border-left:5px solid green; padding:15px; margin-bottom:10px;">
            <h3>Great Job! You’re on Track!</h3>
            <p><strong>Risk:</strong> All main indicators are healthy. Keep up your good habits!</p>
            <p><strong>What you can do:</strong></p>
            <ul>
                <li>Maintain a balanced diet tailored for your health.</li>
                <li>Exercise regularly (30–60 mins, 3–5 times a week).</li>
                <li>Keep regular checkups and monitor key indicators occasionally.</li>
                <li>Stay hydrated and manage stress effectively.</li>
                <li>Sleep well (7–8 hours daily).</li>
                ${extraAdvice.map(a => `<li>${a}</li>`).join("")}
            </ul>
        </div>
    `;
} else if(result === "Medium"){
    adviceHTML = `
        <div class="recommendation-card" style="background:#fff8dc; border-left:5px solid orange; padding:15px; margin-bottom:10px;">
            <h3>Stay Alert! Take Action Now</h3>
            <p><strong>Risk:</strong> Some key indicators are above optimal levels. Small changes can make a big difference.</p>
            <p><strong>What you can do:</strong></p>
            <ul>
                <li>Improve your diet (reduce sugar, salt, unhealthy fats).</li>
                <li>Exercise daily (even 20–30 mins brisk walk helps).</li>
                <li>Monitor key indicators more frequently.</li>
                <li>Maintain healthy weight and avoid overeating.</li>
                <li>Practice stress-reducing activities (meditation, yoga).</li>
                ${extraAdvice.map(a => `<li>${a}</li>`).join("")}
            </ul>
        </div>
    `;
} else { // High
    adviceHTML = `
        <div class="recommendation-card" style="background:#ffe0e0; border-left:5px solid red; padding:15px; margin-bottom:10px;">
            <h3>Immediate Attention Needed!</h3>
            <p><strong>Risk:</strong> Main indicators are high. Prompt action is essential for your health.</p>
            <p><strong>What you can do:</strong></p>
            <ul>
                <li>Consult a healthcare professional immediately.</li>
                <li>Follow a strict diet and medication plan if prescribed.</li>
                <li>Exercise daily under guidance.</li>
                <li>Monitor your indicators frequently (daily if needed).</li>
                <li>Work on reducing BMI, cholesterol, or other key risk factors.</li>
                ${extraAdvice.map(a => `<li>${a}</li>`).join("")}
            </ul>
        </div>
    `;
}

adviceDiv.innerHTML = adviceHTML;


// Download PDF
document.getElementById("download-pdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ask for username
    function formatUserName(fullName) {
        if (!fullName) return "Unknown User";
        const names = fullName.trim().split(" ");
        return names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(" ");
    }
    
    let userName = prompt("Enter your name:") || "Unknown User";
    userName = formatUserName(userName);

    const now = new Date();
    const dateTime = now.toLocaleString();
    const riskResult = localStorage.getItem("riskResult") || "Low";

    // Determine predictor & inputs
    let inputs = {};
    let predictorName = localStorage.getItem("lastPredictor") || "Unknown Predictor";
    if (predictorName === "Diabetes Predictor") inputs = JSON.parse(localStorage.getItem("diabetesInputs")) || {};
    else if (predictorName === "Heart Disease Predictor") inputs = JSON.parse(localStorage.getItem("heartInputs")) || {};
    else if (predictorName === "Hypertension Predictor") inputs = JSON.parse(localStorage.getItem("hypertensionInputs")) || {};
    else if (predictorName === "Hyperlipidemia Predictor") inputs = JSON.parse(localStorage.getItem("hyperlipidemiaInputs")) || {};

    const adviceText = document.getElementById("advice-text").innerText;

    let y = 30;

    // Logo 
    try {
        doc.addImage("assets/logo.png", "PNG", 10, 10, 25, 25);
    } catch(e) {
        console.log("Logo not found or skipped");
    }

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204); // blue color
    doc.text("Multi-Disease Health Risk Predictor", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 15;
    doc.setTextColor(0,0,0); // reset color

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    // User Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("User Information:", 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userName}`, 15, y); y += 7;
    doc.text(`Date & Time: ${dateTime}`, 15, y); y += 7;
    doc.text(`Predictor Used: ${predictorName}`, 15, y); y += 7;
    doc.text(`Risk Result: ${riskResult}`, 15, y); y += 10;

    // Divider
    doc.line(10, y, 200, y);
    y += 10;

    // Inputs Provided
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Inputs Provided:", 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    for (const [key, value] of Object.entries(inputs)) {
        let label = key.charAt(0).toUpperCase() + key.slice(1);
        doc.text(`${label}: ${value}`, 15, y);
        y += 7;
    }
    y += 5;

    // Divider
    doc.line(10, y, 200, y);
    y += 10;

    // Recommendations
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recommendations:", 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Split the advice into lines
    const adviceLines = adviceText.split("\n").map(line => line.trim()).filter(line => line !== "");

    // Separate the main message and actionable points
    let inList = false;
    adviceLines.forEach(line => {
        if(line.toLowerCase().includes("what you can do")) {
            inList = true; // Start bullet points after this line
            doc.text("What you can do:", 15, y);
            y += 7;
        } else if (inList) {
            // Each line in bullet
            doc.text(`\u2022 ${line}`, 20, y); // 20px indent for bullet
            y += 7;
        } else {
            // Regular text
            doc.text(line, 15, y);
            y += 7;
        }
        });

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated by Multi-Disease Predictor | 2025", doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: "center" });

    // Save PDF with user's name
    doc.save(`${userName}_health_report.pdf`);
});

// ----- 3️⃣ Chart Setup -----
    const chartCanvas = document.getElementById('diabetesChart');
    const originalColors = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)"
    ];
    const borderColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)"
    ];

    let labels = [], data = [], normalRanges = [], chartTitle = "";

    if(predictorName === "Diabetes Predictor"){
        labels = ["BMI", "Fasting Blood Sugar", "Postprandial Blood Sugar", "Physical Activity"];
        data = [
            inputs.bmi || 0,
            inputs.fastingBS || 0,
            inputs.postprandialBS || 0,
            (inputs.activity === "Low" ? 20 : inputs.activity === "Medium" ? 50 : 80)
        ];
        normalRanges = [24.9, 99, 140, 50];
        chartTitle = "Diabetes Risk Factors";
    } 
    else if(predictorName === "Heart Disease Predictor"){
        labels = ["Cholesterol", "BP", "Smoking", "Physical Activity"];
        data = [
            inputs.cholesterol || 0,
            inputs.bp ? inputs.bp.split("/")[0] : 0,
            (inputs.smoking === "Yes" ? 100 : 0),
            (inputs.activity === "Low" ? 20 : inputs.activity === "Medium" ? 50 : 80)
        ];
        normalRanges = [200, 120, 0, 50];
        chartTitle = "Heart Disease Risk Factors";
    } 
    else if(predictorName === "Hypertension Predictor"){
        labels = ["BMI", "Systolic BP", "Diastolic BP", "Physical Activity"];
        data = [
            inputs.bmi || 0,
            inputs.systolic || 0,
            inputs.diastolic || 0,
            (inputs.activity === "Low" ? 20 : inputs.activity === "Medium" ? 50 : 80)
        ];
        normalRanges = [24.9, 120, 80, 50];
        chartTitle = "Hypertension Risk Factors";
    } 
    else if(predictorName === "Hyperlipidemia Predictor"){
        labels = ["Total Cholesterol", "LDL", "HDL", "Triglycerides"];
        data = [
            inputs.totalChol || 0,
            inputs.ldl || 0,
            inputs.hdl || 0,
            inputs.trig || 0
        ];
        normalRanges = [200, 130, 60, 150];
        chartTitle = "Hyperlipidemia Risk Factors";
    }

    Chart.register(ChartDataLabels);

    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Value",
                data: data,
                backgroundColor: originalColors,
                borderColor: borderColors,
                borderWidth: 1
            }, {
                label: "Normal Range",
                data: normalRanges,
                type: 'line',
                borderColor: 'rgba(0,0,0,0.5)',
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                borderDash: [5,5]
            }]
        },
        options: {
            responsive: true,
                layout: {
                    padding: {
                        top: 20 
                    }
                },
            plugins: {
                legend: { display: false },
                title: { display: true, text: chartTitle },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const i = context.dataIndex;
                            const val = context.parsed.y;
                            const normal = normalRanges[i];
                            let note = val <= normal ? "Normal" : val <= normal*1.2 ? "Slightly High" : "High Risk - Take Action!";
                            return `${labels[i]}: ${val} (Normal: ≤${normal}) — ${note}`;
                        }
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: '#000',
                    font: { weight: 'bold' },
                    formatter: function(value) { return value; }
                }
            },
            animation: { duration: 1200, easing: 'easeOutBounce' },
            scales: { y: { beginAtZero: true ,max: Math.max(...data, ...normalRanges) * 1.2} }
        },
        plugins: [ChartDataLabels]
    });


});
