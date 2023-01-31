import React from "react";

import { useStateValue } from "../state";
import { Entry } from '../types';

import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(`${JSON.stringify(value)} not handled correctly`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;