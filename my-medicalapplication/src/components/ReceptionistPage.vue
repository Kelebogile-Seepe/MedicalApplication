<template>
  <sidenavPage/>
  <div class="containair ">          <topnavPage/>  <div class="dashboard">

    <div class="welcome-card">
      <div>
        <h2 class="welcome-title">Welcome, Receptionist!</h2>
        <span class="role-badge">Receptionist</span>
        <p class="welcome-subtitle">You are now logged into the MedFlow system.</p>
      </div>
      <button class="notif-btn">🔔</button>
    </div>
    <div class="card">
      <h3 class="section-title">Quick Actions</h3>
      <div class="quick-actions">
        <button @click="showForm = true" class="btn-primary">+ Create New Patient File</button>
        <button @click="viewAll" class="btn-secondary">📂 View All Patient Files</button>
        <button @click="manageAppointments" class="btn-secondary">👥 Manage Appointments</button>
        <button @click="updateSystem" class="btn-secondary">📚 Update Medical Library</button>
      </div>
    </div>
    <div class="card">
      <h3 class="section-title">Recent Patient Files</h3>
      <p class="section-subtitle">Manage and send patient files to doctors.</p>

      <div class="table-controls">
        <button class="btn-filter">Filter</button>
        <button class="btn-filter">Sort</button>
      </div>

      <table class="patient-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in files" :key="index" :class="{ archived: file.status === 'Archived' }">
            <td>{{ file.id }}</td>
            <td>{{ file.name }}</td>
            <td>{{ file.dob }}</td>
            <td>
              <span v-if="file.status === 'Pending Doctor'" class="status-badge pending">Pending Doctor</span>
              <span v-else-if="file.status === 'Ready for Doctor'" class="status-badge ready">Ready for Doctor</span>
              <span v-else-if="file.status === 'Archived'" class="status-badge archived">Archived</span>
            </td>
            <td class="actions">
              <button v-if="file.status !== 'Archived'" @click="sendToDoctor(file)" class="btn-action send">📤 Send to Doctor</button>
              <button @click="viewDetails(file)" class="btn-action view">👁 View Details</button>
              <button @click="deleteFile(index)" class="btn-action delete">🗑 Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-box">
        <h3 class="section-title">Enter Patient Details</h3>
        <input v-model="patient.id" type="text" placeholder="Patient ID" class="form-input" />
        <input v-model="patient.name" type="text" placeholder="Patient Name" class="form-input" />
        <input v-model="patient.dob" type="date" class="form-input" />
        <select v-model="patient.status" class="form-input">
          <option disabled value="">Select Status</option>
          <option>Pending Doctor</option>
          <option>Ready for Doctor</option>
          <option>Archived</option>
        </select>
        <button @click="saveFile" class="btn-primary">Save File</button>
        <button @click="cancelForm" class="btn-cancel">Cancel</button>
      </div>
    </div>
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
      showForm: false,
      patient: { id: "", name: "", dob: "", status: "" },
      files: [
        { id: "PF001", name: "Alice Johnson", dob: "1990-05-15", status: "Pending Doctor" },
        { id: "PF002", name: "Robert Smith", dob: "1982-11-23", status: "Ready for Doctor" },
        { id: "PF003", name: "Emily White", dob: "2001-02-01", status: "Pending Doctor" },
        { id: "PF004", name: "Michael Brown", dob: "1975-08-10", status: "Archived" },
        { id: "PF005", name: "Jessica Green", dob: "1998-04-20", status: "Pending Doctor" }
      ]
    };
  },
  methods: {
    methods: {
    async saveFile() {
      await fetch("http://localhost:5000/api/saveFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.newPatient)
      });
      alert("Patient file created & sent to doctor!");
    }
  }}
  
};

</script>

<style scoped>
.dashboard {
  background-color: #f9fafb;
  min-height: 100vh;
  width: 80%;
  justify-content: flex-end;
  padding: 1.5rem;
  font-family: Arial, sans-serif;
}
.containair{
  display: flex;
}
/* Welcome Header */
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
.notif-btn {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

/* Cards */
.card {
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.section-subtitle {
  color: #6b7280;
  margin-bottom: 1rem;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-primary {
  background: #9333ea;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.btn-primary:hover {
  background: #7e22ce;
}
.btn-secondary {
  background: #f3f4f6;
  color: #111827;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.btn-secondary:hover {
  background: #e5e7eb;
}
.btn-filter {
  background: #f3f4f6;
  color: #374151;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.btn-filter:hover {
  background: #e5e7eb;
}

.patient-table {
   width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.patient-table th {
padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
.patient-table td {
padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.patient-table tr.archived {
  background: #f3f4f6;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}
.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}
.status-badge.ready {
  background: #d1fae5;
  color: #065f46;
}
.status-badge.archived {
  background: #e5e7eb;
  color: #374151;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
.btn-action {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}
.btn-action.send {
  background: #dbeafe;
  color: #1e40af;
}
.btn-action.send:hover {
  background: #bfdbfe;
}
.btn-action.view {
  background: #f3f4f6;
  color: #374151;
}
.btn-action.view:hover {
  background: #e5e7eb;
}
.btn-action.delete {
  background: #ef4444;
  color: #fff;
}
.btn-action.delete:hover {
  background: #dc2626;
}
.btn-cancel {
  background: #e5e7eb;
  color: #111827;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #d1d5db;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 24rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),
              0 4px 6px -4px rgba(0,0,0,0.1);
}
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}
.form-input:focus {
  border-color: #9333ea;
  box-shadow: 0 0 0 1px #9333ea;
  outline: none;
}
</style>
