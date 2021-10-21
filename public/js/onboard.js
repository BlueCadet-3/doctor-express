const roleSelect = document.getElementById("role-select");
const patientForm = document.getElementById("new-patient");
const doctorForm = document.getElementById("new-doctor");

changeForm("none");

roleSelect.addEventListener('change', async function () {
	changeForm(this.value);
});

async function changeForm (role) {
	if (role === "none") {
		doctorForm.style.display = "none";
		patientForm.style.display = "none";
	} else if (role === "doctor") {
		doctorForm.style.display = "block";
		patientForm.style.display = "none";
	} else if (role === "patient") {
		doctorForm.style.display = "none";
		patientForm.style.display = "block";
	}
}
