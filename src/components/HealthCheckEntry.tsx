import React from 'react';
import { Entry, Diagnosis } from '../types';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type EntryProps = {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
};

const HealthCheckEntry = ({ entry, diagnoses }: EntryProps) => (
  <Card variant="outlined">
    {console.log(entry)}
    <CardContent>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
          <li key={code}>{code} {diagnoses[code].name}</li>
        ))}
      </ul>
      { "healthCheckRating" in entry &&
        entry.healthCheckRating < 3
          ? <FavoriteIcon color={entry.healthCheckRating == 0 ? 'success' : ( entry.healthCheckRating == 1 ? 'warning' : 'error') }/>
          : <HeartBrokenIcon/>
      }
      <p>diagnose by {entry.specialist}</p>
    </CardContent>
  </Card>
);

export default HealthCheckEntry;