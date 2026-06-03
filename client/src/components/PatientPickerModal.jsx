import React from "react";
import { listPatients } from "../api/patients.api.js";
import ListPickerModal from "./ListPickerModal.jsx";

const COLUMNS = [
  { key: "patient_code", label: "Code" },
  { key: "patient_name", label: "Patient Name" },
  { key: "gender", label: "Gender" },
  {
    key: "blood_type_full",
    label: "Blood Type",
  },
];

export default function PatientPickerModal({ isOpen, onClose, onSelect, initialSearch = "" }) {
  // useCallback: keeps the same function reference across renders (avoids unnecessary re-renders when passed to ListPickerModal)
  const fetchData = React.useCallback((params) => listPatients(params), []);

  const handleSelect = React.useCallback(
    (row) => {
      onSelect(row);
    },
    [onSelect]
  );

  return (
    <ListPickerModal
      isOpen={isOpen}
      onClose={onClose}
      onSelect={handleSelect}
      initialSearch={initialSearch}
      title="Select Patient"
      searchPlaceholder="Search code, patient name..."
      fetchData={fetchData}
      columns={COLUMNS}
      itemName="patient"
      emptySearch="No patients found."
      emptyDefault="No patients yet."
      getSelectLabel={(row) => `${row.patient_code} - ${row.patient_name}`}
    />
  );
}