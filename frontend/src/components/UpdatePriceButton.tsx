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
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
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
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <div>
              <button
                onClick={handleUpdatePrice}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
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