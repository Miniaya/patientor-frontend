import React from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";
import { useStateValue, setPatient, setDiagnosisList, addEntry } from "../state";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Button } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from '../types';
import { EntryFormValues } from '../AddModal/AddEntryForm';

import EntryDetails from '../components/EntryDetails';
import { AddEntryModal } from '../AddModal';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id || '404'}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;