import React from "react";
import { listDoctors } from "../api/doctors.api.js";
import ListPickerModal from "./ListPickerModal.jsx";

const COLUMNS = [
  { key: "doctor_code", label: "Code" },
  { key: "doctor_name", label: "Doctor Name" },
  { key: "gender", label: "Gender" },
  {
    key: "specialty",
    label: "Specialty",
  },
];

export default function DoctorPickerModal({ isOpen, onClose, onSelect, initialSearch = "" }) {
  // useCallback: keeps the same function reference across renders (avoids unnecessary re-renders when passed to ListPickerModal)
  const fetchData = React.useCallback((params) => listDoctors(params), []);

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
      title="Select Doctor"
      searchPlaceholder="Search code, doctor name..."
      fetchData={fetchData}
      columns={COLUMNS}
      itemName="doctor"
      emptySearch="No doctors found."
      emptyDefault="No doctors yet."
      getSelectLabel={(row) => `${row.doctor_code} - ${row.doctor_name}`}
    />
  );
}