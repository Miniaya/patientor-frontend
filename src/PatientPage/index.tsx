import React from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";
import { useStateValue, setPatient } from "../state";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { apiBaseUrl } from "../constants";
import { Patient } from '../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
    </div>
  );
};

export default PatientPage;