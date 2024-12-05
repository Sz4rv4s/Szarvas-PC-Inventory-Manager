import { useAuth } from "../context/UseAuth.ts";
import { PartsPanelProps } from "../types/types.ts";
import SearchPart from "./SearchPart.tsx";
import AddPartModal from "./AddPartModal.tsx";
import { FC, useState } from "react";

const PartsPanel: FC<PartsPanelProps> = ({ onPartFound, onClear, partsDataLength, refetchParts }) => {
  const { role } = useAuth();
  const [isAddPartModalOpen, setAddPartModalOpen] = useState<boolean>(false);

  const handleAddPart = () => {
    setAddPartModalOpen(true);
  };

  const handleCloseAddPartModal = () => {
    setAddPartModalOpen(false);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4 h-48">
      <div className="flex justify-between items-center">
        <SearchPart onPartFound={onPartFound} onClear={onClear} />
        {role === "ROLE_ADMIN" && (
          <button
            className="bg-cgreen px-4 py-2 rounded text-white mb-4 border-none cursor-pointer hover:bg-cgreenhover whitespace-nowrap"
            onClick={handleAddPart}
          >
            Add Part
          </button>
        )}
      </div>
      <AddPartModal isOpen={isAddPartModalOpen} onClose={handleCloseAddPartModal} defaultId={partsDataLength} refetchParts={refetchParts}/>
    </div>
  );
};

export default PartsPanel;
