import React from "react";
import { listFees } from "../api/configuration.api.js";
import ListPickerModal from "./ListPickerModal.jsx";

const COLUMNS = [
  { key: "fee_code", label: "Code" },
  { key: "fee_name", label: "Fee Name" },
  { key: "description", label: "Description" },
];

export default function FeePickerModal({ isOpen, onClose, onSelect, initialSearch = "" }) {
  // useCallback: keeps the same function reference across renders (avoids unnecessary re-renders when passed to ListPickerModal)
  const fetchData = React.useCallback((params) => listFees(params), []);

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
      title="Select Fee"
      searchPlaceholder="Search code, fee name..."
      fetchData={fetchData}
      columns={COLUMNS}
      itemName="fee"
      emptySearch="No fees found."
      emptyDefault="No fees yet."
      getSelectLabel={(row) => `${row.fee_code} - ${row.fee_name}`}
    />
  );
}