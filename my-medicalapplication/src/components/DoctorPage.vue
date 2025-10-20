<template>
   <sidenavPage/>
   
   <div class="containair "><topnavPage/><div class="doctor-workflow">
   <div class="welcome-card">
      <div>
        <h2 class="welcome-title">Welcome, Dr. Eleanor Vance!</h2>
        <span class="role-badge">Doctor</span>
        <p class="welcome-subtitle">You are now logged into the MedFlow system.</p>
      </div>
      <button class="notif-btn">🔔</button>
    </div>


    <section class="patient-files">
      <h3>Recent Patient Files</h3>
      <table>
        <thead>
          <tr>
            <th>File ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Arrival Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.name }}</td>
            <td>{{ patient.age }}</td>
            <td>{{ patient.time }}</td>
            <td>
              <span :class="{'status-received': patient.status === 'Received', 'status-pending': patient.status === 'Pending Diagnosis'}">
                {{ patient.status }}
              </span>
            </td>
            <td><button  href="#" @click.prevent="selectPatient(patient)" class="btn-action view">👁 View Details</button ></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="consultation" v-if="selectedPatient">
      <h3>Patient Consultation</h3>
      <div class="consultation-wrapper">
        <div class="patient-history">
          <h4>Patient Medical History</h4>
          <p><strong>Name:</strong> {{ selectedPatient.name }}</p>
          <p><strong>Age:</strong> {{ selectedPatient.age }}</p>
          <p><strong>Gender:</strong> Female</p>
          <p><strong>Date of Birth:</strong> 1993-07-22</p>
          <p><strong>Contact:</strong> +1 (555) 123-4567</p>
          <p><strong>Email:</strong> emily.white@example.com</p>
          <p><strong>Address:</strong> 789 Pine Street, Anytown, USA</p>

          <p><strong>Allergies:</strong></p>
          <ul>
            <li>Penicillin</li>
            <li>Dust mites</li>
          </ul>

          <p><strong>Past Medical History:</strong></p>
          <ul>
            <li>Childhood Asthma (controlled)</li>
            <li>Seasonal allergies</li>
          </ul>

          <p><strong>Current Medications:</strong></p>
          <ul>
            <li>Ventolin inhaler (as needed)</li>
          </ul>
        </div>

        <div class="diagnosis-form">
          <h4>Diagnosis & Prescription</h4>
          <input type="text" placeholder="Enter primary diagnosis..." v-model="diagnosis" />
          <input type="text" placeholder="e.g., Amoxicillin" v-model="medication" />
          <input type="text" placeholder="e.g., 250mg" v-model="dosage" />
          <select v-model="frequency">
            <option disabled value="">Select frequency</option>
            <option>Once a day</option>
            <option>Twice a day</option>
            <option>Every 6 hours</option>
          </select>
          <textarea placeholder="Add additional clinical notes here..." v-model="clinicalNotes"></textarea>
          <button @click="sendToPharmacist">📤 Send File to Pharmacist</button>
        </div>
      </div>
    </section>
  </div> </div>
</template>

<script>
import topnavPage from './topnavPage.vue';
import sidenavPage from './sidenavPage.vue';

export default {
  components: { topnavPage, sidenavPage },
  data() {
    return {
      diagnosis: '',
      medication: '',
      dosage: '',
      frequency: '',
      clinicalNotes: '',
      selectedPatient: null,
      patients: [
        { id: 'PF001', name: 'Alice Johnson', age: 45, time: '10:30 AM', status: 'Received' },
        { id: 'PF002', name: 'Robert Smith', age: 62, time: '11:15 AM', status: 'Received' },
        { id: 'PF003', name: 'Emily White', age: 31, time: '11:45 AM', status: 'Pending Diagnosis' },
        { id: 'PF004', name: 'David Brown', age: 58, time: '12:05 PM', status: 'Received' },
        { id: 'PF005', name: 'Sarah Green', age: 29, time: '01:00 PM', status: 'Pending Diagnosis' }
      ]
    };
  },
  methods: {
    async sendToDoctor(fileId, doctorNote) {
  await fetch("http://localhost:5000/api/sendToDoctor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileId,
      doctorName: this.doctorName,
      diagnosis: this.diagnosis,
      treatment: this.treatment
    })
  });
}
  }
};
</script>

<style scoped>
.doctor-workflow {
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
}
.containair{
  display: flex;
}
h2, h3, h4 {
  margin-bottom: 10px;
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

.status-received {
  color: green;
  font-weight: bold;
}

.status-pending {
  background-color: orange;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

a {
  color: #4a90e2;
  cursor: pointer;
}

.consultation-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.patient-history, .diagnosis-form {
  flex: 1;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

input, select, textarea {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: vertical;
}
.btn-action.view {
  background: #f3f4f6;
  color: #374151;
}
.btn-action.view:hover {
  background: #e5e7eb;
}

button {
  background-color: #7c4dff;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

button:hover {
  background-color: #5e35b1;
}
</style>
