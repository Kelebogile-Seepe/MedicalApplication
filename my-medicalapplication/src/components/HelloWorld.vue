<template>
  <div class="app">
    <!-- LOGIN -->
    <div v-if="stage==='login'">
      <h2>🔑 Clinic Login</h2>
      <select v-model="role">
        <option>Receptionist</option>
        <option>Doctor</option>
        <option>Pharmacist</option>
      </select>
      <br><br>
      <button @click="login">Login</button>
    </div>

    <!-- RECEPTIONIST -->
    <div v-if="stage==='receptionist'">
      <h2>🗂 Receptionist Panel</h2>
      <button @click="createFile">Create Patient File</button>
      <button @click="sendToDoctor">Send File to Doctor</button>
      <br><br>
      <button class="back-btn" @click="goBack">⬅ Back to Main</button>
    </div>

    <!-- DOCTOR -->
    <div v-if="stage==='doctor'">
      <h2>🧑‍⚕️ Doctor Panel</h2>
      <button @click="receiveFile">Receive File</button>
      <button @click="diagnose">Diagnose Patient</button>
      <button @click="prescribe">Write Prescription</button>
      <button @click="sendToPharmacist">Send File to Pharmacist</button>
      <br><br>
      <button class="back-btn" @click="goBack">⬅ Back to Main</button>
    </div>

    <!-- PHARMACIST -->
    <div v-if="stage==='pharmacist'">
      <h2>💊 Pharmacist Panel</h2>
      <button @click="receivePrescription">Receive Prescription</button>
      <button @click="dispense">Dispense Medication</button>
      <button @click="confirmReception">Send Confirmation</button>
      <br><br>
      <button class="back-btn" @click="goBack">⬅ Back to Main</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClinicJourney",
  data() {
    return {
      stage: "login",
      role: "Receptionist",
      patientFile: null,
      prescription: null
    };
  },
  methods: {
    login() {
      this.stage = this.role.toLowerCase();
    },
    goBack() {
      this.stage = "login";
      this.patientFile = null;
      this.prescription = null;
    },
    // Receptionist actions
    createFile() {
      this.patientFile = "Patient File A";
      alert("Receptionist created " + this.patientFile);
    },
    sendToDoctor() {
      if (this.patientFile) {
        alert("File sent to Doctor 📤");
        this.stage = "doctor";
      } else {
        alert("Please create a file first!");
      }
    },
    // Doctor actions
    receiveFile() {
      alert("Doctor received: " + this.patientFile);
    },
    diagnose() {
      alert("Doctor diagnosed the patient 🧑‍⚕️");
    },
    prescribe() {
      this.prescription = "Paracetamol, 3 days";
      alert("Prescription: " + this.prescription);
    },
    sendToPharmacist() {
      if (this.prescription) {
        alert("Sent prescription to Pharmacist 📤");
        this.stage = "pharmacist";
      } else {
        alert("Write a prescription first!");
      }
    },
    // Pharmacist actions
    receivePrescription() {
      alert("Pharmacist received: " + this.prescription);
    },
    dispense() {
      alert("Pharmacist dispensed " + this.prescription);
    },
    confirmReception() {
      alert("Confirmation sent to Receptionist ✅");
      this.stage = "login"; // back to login
    }
  }
};
</script>

<style scoped>
.app {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 350px;
  text-align: center;
  margin: auto;
}
button {
  margin: 6px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #45a049;
}
.back-btn {
  background: #f44336;
}
.back-btn:hover {
  background: #d32f2f;
}
</style>
