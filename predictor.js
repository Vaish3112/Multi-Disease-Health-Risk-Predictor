// Helper function: Display result 
function displayResult(elementId, riskLevel) {
    const el = document.getElementById(elementId);
    el.innerText = "Risk Level: " + riskLevel;
    if (riskLevel === "Low") el.style.color = "green";
    else if (riskLevel === "Medium") el.style.color = "orange";
    else if (riskLevel === "High") el.style.color = "red";
}

//Collapsible "Learn About Inputs" button
const coll = document.querySelector(".collapsible");
if(coll){
    coll.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

//Diabetes Risk Calculation
function calculateDiabetesRisk(inputs){
    const age = parseInt(inputs.age);
    const bmi = parseFloat(inputs.bmi);
    const fastingBS = parseFloat(inputs.fastingBS);
    const postprandialBS = parseFloat(inputs.postprandialBS);
    const familyHistory = inputs.familyHistory;
    const activity = inputs.activity;
    const bp = inputs.bloodPressure.split("/").map(x=>Number(x.trim()));
    const systolic = bp[0];
    const diastolic = bp[1];

    // Input validation
    if (isNaN(age) || age < 1 || age > 120) {
        alert("Enter a realistic age (1-120 years).");
        return null;
    }
    if (isNaN(bmi) || bmi < 10 || bmi > 60) {
        alert("Enter a realistic BMI (10-60).");
        return null;
    }
    if (isNaN(fastingBS) || fastingBS < 50 || fastingBS > 400 || isNaN(postprandialBS) || postprandialBS < 50 || postprandialBS > 500) {
        alert("Enter realistic blood sugar values.");
        return null;
    }
    if (isNaN(systolic) || systolic < 70 || systolic > 250 || isNaN(diastolic) || diastolic < 40 || diastolic > 150) {
        alert("Enter realistic blood pressure values.");
        return null;
    }

    let score = 0;

    // Blood sugar & BMI scoring
    if (fastingBS >= 126 || postprandialBS >= 200) score += 4;
    else if (fastingBS >= 100 || postprandialBS >= 140) score += 3;
    else score += 1;

    if (bmi >= 35) score += 4;
    else if (bmi >= 30) score += 3;
    else if (bmi >= 25) score += 2;
    else score += 1;

    if (age >= 65) score += 3;
    else if (age >= 50) score += 2;
    else if (age >= 35) score += 1;

    if (familyHistory === "Yes") score += 2;
    if (activity === "Low") score += 1;
    if (systolic > 130 || diastolic > 85) score += 1;

    if (score >= 12) return "High";  // High: 12+
    else if (score >= 7) return "Medium";  // Medium: 7-11
    else return "Low";  // Low: 0-6
}

//Heart Risk Calculation
function calculateHeartRisk(inputs){
    const age = parseInt(inputs.age);
    const cholesterol = parseFloat(inputs.cholesterol);
    const bp = inputs.bp.split("/").map(Number);
    const systolic = bp[0];
    const diastolic = bp[1];
    const smoking = inputs.smoking;
    const diabetes = inputs.diabetes;
    const activity = inputs.activity;
    const familyHistory = inputs.familyHistory;

    // Input validation
    if (isNaN(age) || age < 1 || age > 120) {
        alert("Enter a realistic age (1-120 years).");
        return null;
    }
    if (isNaN(cholesterol) || cholesterol < 100 || cholesterol > 400) {
        alert("Enter a realistic cholesterol level (100-400 mg/dL).");
        return null;
    }
    if (isNaN(systolic) || systolic < 70 || systolic > 250 || isNaN(diastolic) || diastolic < 40 || diastolic > 150) {
        alert("Enter realistic blood pressure values.");
        return null;
    }

    let score = 0;
    if (age >= 65) score += 3;
    else if (age >= 50) score += 2;
    else if (age >= 35) score += 1;

    if (cholesterol >= 280) score += 3;
    else if (cholesterol >= 240) score += 2;
    else if (cholesterol >= 200) score += 1;

    if (systolic >= 160 || diastolic >= 100) score += 3;
    else if (systolic >= 140 || diastolic >= 90) score += 2;
    else if (systolic >= 120 || diastolic >= 80) score += 1;

    if (smoking === "Yes") score += 2;
    if (diabetes === "Yes") score += 2;
    if (activity === "Low") score += 1;
    if (familyHistory === "Yes") score += 1;

    if (score >= 12) return "High";
    else if (score >= 7) return "Medium";
    else return "Low";
}

//Hypertension Risk Calculation
function calculateHypertensionRisk(inputs){
    const age = parseInt(inputs.age);
    const bmi = parseFloat(inputs.bmi);
    const systolic = parseInt(inputs.systolic);
    const diastolic = parseInt(inputs.diastolic);
    const familyHistory = inputs.familyHistory;
    const activity = inputs.activity;
    const lifestyle = inputs.lifestyle; 

    if (isNaN(age) || age < 1 || age > 120) {
        alert("Enter a realistic age (1-120 years).");
        return null;
    }
    if (isNaN(bmi) || bmi < 10 || bmi > 60) {
        alert("Enter a realistic BMI (10-60).");
        return null;
    }
    if (isNaN(systolic) || systolic < 70 || systolic > 250 || isNaN(diastolic) || diastolic < 40 || diastolic > 150) {
        alert("Enter realistic blood pressure values.");
        return null;
    }

    let score = 0;
    if (systolic >= 160 || diastolic >= 100) score += 3;
    else if (systolic >= 140 || diastolic >= 90) score += 2;
    else if (systolic >= 120 || diastolic >= 80) score += 1;

    if (bmi >= 35) score += 3;
    else if (bmi >= 30) score += 2;
    else if (bmi >= 25) score += 1;

    if (age >= 65) score += 3;
    else if (age >= 50) score += 2;
    else if (age >= 40) score += 1;

    if (familyHistory === "Yes") score += 2;
    if (activity === "Low") score += 1;
    if (lifestyle === "Yes") score += 1;

    if (score >= 12) return "High";
    else if (score >= 7) return "Medium";
    else return "Low";
}

//Hyperlipidemia Risk Calculation
function calculateHyperlipidemiaRisk(inputs){
    const age = parseInt(inputs.age);
    const bmi = parseFloat(inputs.bmi);
    const totalChol = parseFloat(inputs.totalChol);
    const ldl = parseFloat(inputs.ldl);
    const hdl = parseFloat(inputs.hdl);
    const trig = parseFloat(inputs.trig);
    const familyHistory = inputs.familyHistory;

    if (isNaN(age) || age < 1 || age > 120) {
        alert("Enter a realistic age (1-120 years).");
        return null;
    }
    if (isNaN(bmi) || bmi < 10 || bmi > 60) {
        alert("Enter a realistic BMI (10-60).");
        return null;
    }
    if (isNaN(totalChol) || totalChol < 100 || totalChol > 400 || isNaN(ldl) || ldl < 50 || ldl > 300 || isNaN(hdl) || hdl < 20 || hdl > 100 || isNaN(trig) || trig < 50 || trig > 500) {
        alert("Enter realistic lipid profile values.");
        return null;
    }

    let score = 0;
    if (totalChol >= 280) score += 3;
    else if (totalChol >= 240) score += 2;
    else if (totalChol >= 200) score += 1;

    if (ldl >= 190) score += 3;
    else if (ldl >= 160) score += 2;
    else if (ldl >= 130) score += 1;

    if (hdl < 40) score += 2;
    else if (hdl < 50) score += 1;

    if (trig >= 250) score += 3;
    else if (trig >= 200) score += 2;
    else if (trig >= 150) score += 1;

    if (bmi >= 35) score += 2;
    else if (bmi >= 30) score += 1;

    if (age >= 65) score += 3;
    else if (age >= 50) score += 2;
    else if (age >= 45) score += 1;

    if (familyHistory === "Yes") score += 1;

    if (score >= 12) return "High";
    else if (score >= 7) return "Medium";
    else return "Low";
}

// Event Listeners for all forms with validation
document.addEventListener("DOMContentLoaded", function(){

    function validateAndSubmit(inputs, calculateRiskFn, storageKey, predictorName){
        const risk = calculateRiskFn(inputs);
        if(!risk) return; // stop if validation failed
        localStorage.setItem(storageKey, JSON.stringify(inputs));
        localStorage.setItem("riskResult", risk);
        localStorage.setItem("lastPredictor", predictorName);
        window.location.href = "result.html";
    }

    // Diabetes Form
    const diabetesForm = document.getElementById("diabetesForm");
    if(diabetesForm){
        diabetesForm.addEventListener("submit", function(e){
            e.preventDefault();
            const inputs = {
                age: parseInt(document.getElementById("age").value),
                gender: document.getElementById("gender").value,
                bmi: parseFloat(document.getElementById("bmi").value),
                fastingBS: parseFloat(document.getElementById("fbs").value),
                postprandialBS: parseFloat(document.getElementById("ppbs").value),
                familyHistory: document.getElementById("familyHistory").value,
                activity: document.getElementById("activity").value,
                bloodPressure: document.getElementById("bp").value
            };
            validateAndSubmit(inputs, calculateDiabetesRisk, "diabetesInputs", "Diabetes Predictor");
        });
    }

    // Heart Form
    const heartForm = document.getElementById("heartForm");
    if(heartForm){
        heartForm.addEventListener("submit", function(e){
            e.preventDefault();
            const inputs = {
                age: parseInt(document.getElementById("age").value),
                gender: document.getElementById("gender").value,
                cholesterol: parseFloat(document.getElementById("cholesterol").value),
                bp: document.getElementById("bp").value,
                smoking: document.getElementById("smoking").value,
                diabetes: document.getElementById("diabetes").value,
                activity: document.getElementById("activity").value,
                familyHistory: document.getElementById("familyHistory").value
            };
            validateAndSubmit(inputs, calculateHeartRisk, "heartInputs", "Heart Disease Predictor");
        });
    }

    // Hypertension Form
    const hypertensionForm = document.getElementById("hypertensionForm");
    if(hypertensionForm){
        hypertensionForm.addEventListener("submit", function(e){
            e.preventDefault();
            const inputs = {
                age: parseInt(document.getElementById("age").value),
                gender: document.getElementById("gender").value,
                bmi: parseFloat(document.getElementById("bmi").value),
                systolic: parseInt(document.getElementById("systolic").value),
                diastolic: parseInt(document.getElementById("diastolic").value),
                familyHistory: document.getElementById("familyHistory").value,
                activity: document.getElementById("activity").value,
                lifestyle: document.getElementById("lifestyle").value 
            };
            validateAndSubmit(inputs, calculateHypertensionRisk, "hypertensionInputs", "Hypertension Predictor");
        });
    }

    // Hyperlipidemia Form
    const hyperlipidemiaForm = document.getElementById("hyperlipidemiaForm");
    if(hyperlipidemiaForm){
        hyperlipidemiaForm.addEventListener("submit", function(e){
            e.preventDefault();
            const inputs = {
                age: parseInt(document.getElementById("age").value),
                gender: document.getElementById("gender").value,
                bmi: parseFloat(document.getElementById("bmi").value),
                totalChol: parseFloat(document.getElementById("totalChol").value),
                ldl: parseFloat(document.getElementById("ldl").value),
                hdl: parseFloat(document.getElementById("hdl").value),
                trig: parseFloat(document.getElementById("trig").value),
                familyHistory: document.getElementById("familyHistory").value
            };
            validateAndSubmit(inputs, calculateHyperlipidemiaRisk, "hyperlipidemiaInputs", "Hyperlipidemia Predictor");
        });
    }

});
