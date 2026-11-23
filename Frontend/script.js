async function predictWheatDisease() {
    const fileInput = document.getElementById("wheatImageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a wheat leaf image first!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("resDisease").innerText = data.disease;
        document.getElementById("resConfidence").innerText = data.confidence;
        document.getElementById("resRemedy").innerText = data.remedy;

        document.getElementById("predictionResult").style.display = "block";
    } catch (error) {
        console.error(error);
        alert("Backend connection failed. Make sure the FastAPI server is running.");
    }
}

function openPage(title, icon, desc) {
    localStorage.setItem("pageTitle", title);
    localStorage.setItem("pageIcon", icon);
    localStorage.setItem("pageDesc", desc);
    window.location.href = "page.html";
}
const imageInput = document.getElementById("wheatImageInput");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const preview = document.getElementById("imagePreview");

        preview.src = e.target.result;

        preview.style.display = "block";
    };

    reader.readAsDataURL(file);

});