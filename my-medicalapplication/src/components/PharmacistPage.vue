<template>
   <sidenavPage/>
   <div class="containair "><topnavPage/>
     <div class="pharmacist-panel">
      
   <div class="welcome-card">
      <div>
        <h2 class="welcome-title">Welcome, Pharmacist!</h2>
        <span class="role-badge">Pharmacist</span>
        <p class="welcome-subtitle">You are now logged into the MedFlow system.</p>
      </div>
      <button class="notif-btn">🔔</button>
    </div>
  
    <section class="prescription-list">
      <h3>Pending Prescriptions</h3>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Prescription</th>
            <th>Doctor</th>
            <th>Received Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prescription) in prescriptions" :key="prescription.id">
            <td><span class="expand-icon">+</span> {{ prescription.patient }}</td>
            <td>{{ prescription.medication }}</td>
            <td>👨‍⚕️ {{ prescription.doctor }}</td>
            <td>📅 {{ prescription.date }}</td>
            <td><span class="status-received">Received</span></td>
            <td>
              <button class="details-button" @click="selectPrescription(prescription)">
                View Details ➝
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <section class="dispensing-section">
      <h3>Prescription Dispensing</h3>
      <div v-if="selectedPrescription">
        <p><strong>Patient:</strong> {{ selectedPrescription.patient }}</p>
        <p><strong>Medication:</strong> {{ selectedPrescription.medication }}</p>
        <p><strong>Doctor:</strong> {{ selectedPrescription.doctor }}</p>
        <p><strong>Date:</strong> {{ selectedPrescription.date }}</p>
        <button class="dispense-btn" @click="dispense">✅ Dispense Medication</button>
      </div>
      <div v-else class="placeholder">
        Select a prescription from the pending list to begin dispensing.
      </div>
        
    </section>
    </section>

    
  </div>
   </div>
</template>

<script>
import topnavPage from './topnavPage.vue';
import sidenavPage from './sidenavPage.vue';

export default {

  components: { topnavPage, sidenavPage },
  
  data() {
    return {
      selectedPrescription: null,
      prescriptions: [
        { id: 1, patient: "Alice Johnson", medication: "Amoxicillin 500mg, 30 tablets", doctor: "Dr. Emily White", date: "2024-07-29" },
        { id: 2, patient: "Robert Smith", medication: "Hydrochlorothiazide 25mg, 60 tablets", doctor: "Dr. Alex Green", date: "2024-07-28" },
        { id: 3, patient: "Maria García", medication: "Metformin 850mg, 90 tablets", doctor: "Dr. Susan Brown", date: "2024-07-27" },
        { id: 4, patient: "David Lee", medication: "Atorvastatin 40mg, 30 tablets", doctor: "Dr. Alex Green", date: "2024-07-26" },
        { id: 5, patient: "Sophia Miller", medication: "Lisinopril 10mg, 30 tablets", doctor: "Dr. Emily White", date: "2024-07-25" }
      ]
    };
  },

  mounted() {
    this.loadPrescriptions();
  },

  methods: {
    async dispense(fileId) {
  await fetch("http://localhost:5000/api/sendToPharmacist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileId,
      pharmacistName: this.pharmacistName,
      medication: this.medication,
      dosage: this.dosage,
      instructions: this.instructions
    })
  });
}

  }
};
</script>

<style scoped>
.pharmacist-panel {
  padding: 25px;
  font-family: Arial, sans-serif;
 width: 85%;
}

h3 {
  margin-bottom: 10px;
}

.prescription-list,
.dispensing-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0,0,0,0.05);
  min-height: 20vh;

}
.containair{
  display: flex;

}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.welcome-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
}
.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
}
.role-badge {
  display: inline-block;
  background: #e9d5ff;
  color: #6b21a8;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.25rem;
}
.welcome-subtitle {
  color: #4b5563;
  font-size: 0.875rem;
}
.expand-icon {
  font-weight: bold;
  color: #666;
  margin-right: 5px;
}

.status-received {
  background-color: #e0f7e9;
  color: #2e7d32;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  font-weight: bold;
}

.details-button {
  background-color: #e3e3e3;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #d0d0d0;
}

.dispensing-section .placeholder {
  color: #888;
  padding: 30px;
  text-align: center;
  font-style: italic;
  background-color: #f8f8f8;
  border-radius: 10px;
}

.dispense-btn {
  margin-top: 15px;
  background-color: #4caf50;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.dispense-btn:hover {
  background-color: #388e3c;
}
</style>
