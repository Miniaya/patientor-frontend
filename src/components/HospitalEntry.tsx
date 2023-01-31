import React from 'react';
import { Entry, Diagnosis } from '../types';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type EntryProps = {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
};

const HospitalEntry = ({ entry, diagnoses }: EntryProps) => (
  <Card variant="outlined">
    <CardContent>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
          <li key={code}>{code} {diagnoses[code].name}</li>
        ))}
      </ul>
      { "discharge" in entry && 
          <p>Discharge: {entry.discharge.date} <i>{entry.discharge.criteria}</i></p>
      }
      <p>diagnose by {entry.specialist}</p>
    </CardContent>
  </Card>
);

export default HospitalEntry;