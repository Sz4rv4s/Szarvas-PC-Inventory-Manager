import {FC, useState} from 'react';
import {UpdatePartButtonProps} from "../types/types.ts";
import {ADMIN_ENDPOINTS} from "../types/endpoints.ts";
import {useAuth} from "../context/UseAuth.ts";

const UpdatePartButton: FC<UpdatePartButtonProps> = ({ oldData, refetchParts }) => {
  const { jwt } = useAuth();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [model, setModel] = useState(oldData.model);
  const [brand, setBrand] = useState(oldData.brand);
  const [price, setPrice] = useState(oldData.price);
  const [warehouseId, setWarehouseId] = useState(oldData.warehouseId);

  const handleUpdatePart = async () => {
    try {
      const response = await fetch(`${ADMIN_ENDPOINTS.UPDATE_PART}${oldData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          model: model,
          brand: brand,
          price: price,
          warehouseId: warehouseId,
        }),
      });
      if (response.ok) {
        console.log('Updated part:', oldData.id);
        refetchParts();
        setModalOpen(false);
      } else {
        console.error('Failed to update part:', oldData.id);
      }
    } catch (error) {
      console.error('Error updating part', error);
    }
  };

  const clearForm = () => {
    setModel(oldData.model);
    setBrand(oldData.brand);
    setPrice(oldData.price);
    setWarehouseId(oldData.warehouseId);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-cblue text-white rounded border-none cursor-pointer m-1 hover:bg-cbluehover"
      >Update Part</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl mb-4">Update Part</h2>
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
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-cblue text-white rounded hover:bg-cbluehover"
                onClick={handleUpdatePart}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-cred text-white rounded hover:bg-credhover"
                onClick={() => {
                  clearForm();
                  setModalOpen(false);
                }
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePartButton;
