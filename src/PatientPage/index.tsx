import React from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";
import { useStateValue, setPatient, setDiagnosisList } from "../state";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from '../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patient.id !== id) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id || '404'}`
          );
          dispatch(setPatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div>
      <h2>
        {patient.name}
        { patient.gender === 'male' && <MaleIcon /> }
        { patient.gender === 'female' && <FemaleIcon /> }
        { patient.gender === 'other' && <TransgenderIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>{entry.date} <i>{entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
              <li key={code}>{code} {diagnoses[code].name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;