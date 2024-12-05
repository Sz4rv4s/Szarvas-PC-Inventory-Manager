import {FC, useState} from 'react';
import {AddPartModalProps} from "../types/types.ts";
import {ADMIN_ENDPOINTS} from "../types/endpoints.ts";
import {useAuth} from "../context/UseAuth.ts";

const AddPartModal: FC<AddPartModalProps> = ({ isOpen, onClose, defaultId, refetchParts}) => {
  const {jwt} = useAuth();
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [warehouseId, setWarehouseId] = useState<number>(1);

  const clearForm = () => {
    setModel("");
    setBrand("");
    setPrice(0);
    setWarehouseId(1);
  };

  const handleSubmit = async () => {
    if (warehouseId != null) {
      try {
        const response = await fetch(`${ADMIN_ENDPOINTS.ADD_PART}${warehouseId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            id: defaultId,
            model,
            brand,
            price
          }),
        });
        if (response.ok) {
          refetchParts();
          clearForm();
          onClose();
          console.log("Part added successfully");
        } else {
          console.error("Failed to add part");
        }
      } catch (error) {
        console.error("Failed to add part: " ,error);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4">Add Part</h2>
        <div className="flex flex-col items-center gap-4">
          <label className="flex gap-2">
            Model:
            <input
              className="p-2 border border-gray-300 rounded"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
          <label className="flex gap-2">
            Brand:
            <input
              className="p-2 border border-gray-300 rounded"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label className="flex gap-2">
            Price:
            <input
              className="p-2 border border-gray-300 rounded"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
          <label className="flex gap-2">
            Warehouse ID:
            <input
              className="p-2 border border-gray-300 rounded"
              type="number"
              value={warehouseId || 1}
              onChange={(e) => setWarehouseId(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-cblue text-white rounded hover:bg-cbluehover"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-cred text-white rounded hover:bg-credhover"
            onClick={() => {
              clearForm();
              onClose();
            }
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddPartModal
