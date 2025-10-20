<template>
  <sidenavPage/>
   
   <div class="containair "><topnavPage/><div class="patient-journey">
    <h2>Patient Journey Overview</h2>
    
    <div class="journey-grid">
      <div class="journey-step">
        <div class="icon">👤</div>
        <h4>Patient Registration</h4>
        <p class="role">Receptionist</p>
        <p class="desc">
          Patient arrives, checks in, and a new medical file is created or updated in the system.
        </p>
      </div>

      <div class="arrow">➝</div>

      <div class="journey-step">
        <div class="icon">🩺</div>
        <h4>Doctor Consultation</h4>
        <p class="role">Doctor</p>
        <p class="desc">
          Patient’s file is reviewed, consultation takes place, diagnosis is made, and prescriptions are written.
        </p>
      </div>
    </div>

    <div class="journey-grid">
      <div class="journey-step">
        <div class="icon">💊</div>
        <h4>Medication Dispensing</h4>
        <p class="role">Pharmacist</p>
        <p class="desc">
          Prescription is received, medications are prepared and dispensed, patient receives instructions.
        </p>
      </div>

      <div class="arrow">➝</div>

      <div class="journey-step highlighted">
        <div class="icon">✅</div>
        <h4>Administrative Closure</h4>
        <p class="role">Receptionist</p>
        <p class="desc">
          Patient file is updated with dispensed medication, billing processed, and follow-up scheduled.
        </p>
      </div>
    </div>
  </div></div>
</template>

<script>
import topnavPage from './topnavPage.vue';
import sidenavPage from './sidenavPage.vue';

export default {
  components: { topnavPage, sidenavPage },
  name: "PatientJourney"
};
</script>

<style scoped>
.patient-journey {
  padding: 30px;
  font-family: Arial, sans-serif;
  width: 100%;
}
.containair{
  display: flex;
}
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.journey-grid {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.journey-step {
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20px;
  width: 300px;
  min-height: 200px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  position: relative;
  transition: 0.3s ease-in-out;
}

.journey-step:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.highlighted {
  border: 2px solid #b39ddb;
}

.icon {
  font-size: 32px;
  color: #9c27b0;
  margin-bottom: 10px;
}

.role {
  font-weight: bold;
  color: #666;
  margin-top: -5px;
}

.desc {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}

.arrow {
  font-size: 30px;
  color: #aaa;
  align-self: center;
}
</style>
