import React from 'react';
import { Entry, Diagnosis } from '../types';

import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type EntryProps = {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
};

const OccupationalHealthcareEntry = ({ entry, diagnoses }: EntryProps) => (
  <Card variant="outlined">
    <CardContent>
      <p>{entry.date} <WorkIcon /></p>
      { "employerName" in entry && 
          <p>Employer: <i>{entry.employerName}</i></p>
      }
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
          <li key={code}>{code} {diagnoses[code].name}</li>
        ))}
      </ul>
      { "sickLeave" in entry && 
          <p>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
      }
      <p>diagnose by {entry.specialist}</p>
    </CardContent>
  </Card>
);

export default OccupationalHealthcareEntry;