import {FC, useState} from 'react';
import {UpdatePriceButtonProps} from "../types/types.ts";
import {ADMIN_ENDPOINTS} from "../types/endpoints.ts";
import {useAuth} from "../context/UseAuth.ts";

const UpdatePriceButton: FC<UpdatePriceButtonProps> = ({ partId, oldPrice, refetchParts }) => {
  const { jwt } = useAuth();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(oldPrice);

  const handleUpdatePrice = async () => {
    try {
      const response = await fetch(ADMIN_ENDPOINTS.UPDATE_PART_PRICE, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          id: partId,
          newPrice: newPrice,
        }),
      });
      if (response.ok) {
        console.log('Price updated for part:', partId);
        refetchParts();
        setModalOpen(false);
      } else {
        console.error('Failed to update price for part:', partId);
      }
    } catch (error) {
      console.error('Error updating price for part', error);
    }
  };

  const clearForm = () => {
    setNewPrice(oldPrice);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-cgreen text-white rounded border-none cursor-pointer m-1 hover:bg-cgreenhover"
      >Update Price</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl mb-4">Update Price</h2>
            <div className="flex flex-col items-center gap-4">
              <label className="flex gap-2">
                Price:
                <input
                  className="p-2 border border-gray-300 rounded"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-cblue text-white rounded hover:bg-cbluehover"
                onClick={handleUpdatePrice}
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

export default UpdatePriceButton;
