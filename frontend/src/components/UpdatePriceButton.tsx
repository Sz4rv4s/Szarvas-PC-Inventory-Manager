import {FC, useState} from "react";

type UpdatePriceButtonProps = {
  partId: number;
  onSuccess: () => void;
};

const UpdatePriceButton: FC<UpdatePriceButtonProps> = ({partId, onSuccess}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(0);

  const handleUpdatePrice = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/updateprice`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: partId,
          newPrice: newPrice,
        }),
      });
      if (response.ok) {
        console.log(`Price updated successfully for part ${partId}`);
        onSuccess();
        setModalOpen(false);
      } else {
        console.error(`Failed to update price: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating price: ', error)
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginLeft: '1rem',
          marginBottom: '1rem'
        }}
      >
        Update Price
      </button>
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Update Price</h3>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              placeholder="Enter new price"
              style={{
                width: '80%',
                padding: '0.5rem',
                margin: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <div>
              <button
                onClick={handleUpdatePrice}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  marginRight: '1rem',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#b60303',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
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