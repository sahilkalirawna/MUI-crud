// Patients
export const patientListURL = {
  url: 'masters/patientModule/find',
  method: 'POST',
}

export const addPatientURL = {
  url: 'masters/patientModule',
  method: 'POST',
}

export const updatePatientURL = (id) => ({
  url: `masters/patientModule/${id}`,
  method: 'PUT',
})

export const getPatientURL = (id) => ({
  url: `masters/patientModule/getByID/${id}`,
  method: 'POST',
})

export const deletePatientURL = (id) => ({
  url: `masters/patientModule/${id}`,
  method: 'DELETE',
})
