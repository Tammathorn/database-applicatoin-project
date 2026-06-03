import React from "react";
import { listDepartments } from "../api/configuration.api.js";
import ListPickerModal from "./ListPickerModal.jsx";

const COLUMNS = [
  { key: "department_code", label: "Code" },
  { key: "department_name", label: "Department Name" },
  { key: "location_description", label: "Location" },
];

export default function DepartmentPickerModal({ isOpen, onClose, onSelect, initialSearch = "" }) {
  // useCallback: keeps the same function reference across renders (avoids unnecessary re-renders when passed to ListPickerModal)
  const fetchData = React.useCallback((params) => listDepartments(params), []);

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
      title="Select Department"
      searchPlaceholder="Search code, department name..."
      fetchData={fetchData}
      columns={COLUMNS}
      itemName="department"
      emptySearch="No departments found."
      emptyDefault="No departments yet."
      getSelectLabel={(row) => `${row.department_code} - ${row.department_name}`}
    />
  );
}