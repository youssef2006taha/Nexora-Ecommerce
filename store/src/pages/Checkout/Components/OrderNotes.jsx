import React from "react";

import { FileText } from "lucide-react";

import TextArea from "../../../components/UI/TextArea";

const OrderNotes = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-5 p-6 rounded-3xl bg-bg-card border border-border shadow">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <FileText className="size-4.5 xs:size-5.5 text-primary" />
        <span className="font-semibold text-text-primary text-[14px] xs:text-[16px]">
          Order Notes (Optional)
        </span>
      </div>

      <TextArea
        placeholder="Any special instructions for your order..."
        rows={3}
        value={formData.customerNote}
        onChange={(e) => {
          setFormData({ ...formData, customerNote: e.target.value });
        }}
      />
    </div>
  );
};

export default React.memo(OrderNotes);
