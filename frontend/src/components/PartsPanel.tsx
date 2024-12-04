import { useAuth } from "../context/UseAuth.ts";
import {PartsPanelProps} from "../types/types.ts";
import SearchPart from "./SearchPart.tsx";
import {FC} from "react";

const PartsPanel: FC<PartsPanelProps> = ({ onPartFound, onClear }) => {
  const { role } = useAuth();

  return (
    <div className="bg-gray-200 rounded-lg p-4 h-48">
      {role === "ROLE_ADMIN" && (
        <div>
          <h1>Admin Panel</h1>
        </div>
      )}
      <div>
        <SearchPart onPartFound={onPartFound} onClear={onClear}/>
      </div>
    </div>
  );
};

export default PartsPanel;
