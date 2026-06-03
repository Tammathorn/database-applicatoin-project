import React from "react";
import { listMedicalConditions } from "../api/configuration.api.js";
import ListPickerModal from "./ListPickerModal.jsx";

const COLUMNS = [
  { key: "condition_code", label: "Code" },
  { key: "condition_name", label: "Condition Name" },
  { key: "description", label: "Description" },
];

export default function DiagnosisPickerModal({ isOpen, onClose, onSelect, initialSearch = "" }) {
  // useCallback: keeps the same function reference across renders (avoids unnecessary re-renders when passed to ListPickerModal)
  const fetchData = React.useCallback((params) => listMedicalConditions(params), []);

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
      title="Select Diagnosis"
      searchPlaceholder="Search code, diagnosis name..."
      fetchData={fetchData}
      columns={COLUMNS}
      itemName="diagnosis"
      emptySearch="No diagnoses found."
      emptyDefault="No diagnoses yet."
      getSelectLabel={(row) => `${row.condition_code} - ${row.condition_name}`}
    />
  );
}