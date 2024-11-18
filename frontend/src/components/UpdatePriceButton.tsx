import {FC} from "react";

type UpdatePriceButtonProps = {
  partId: number;
  newPrice: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const UpdatePriceButton: FC<UpdatePriceButtonProps> = ({partId, newPrice, onSuccess, onError}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/updateprice`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
                id: partId,
                newPrice: newPrice,
            }),
        });

      if (response.ok) {
        console.log(`Part ${partId}'s price updated successfully.`);
        if (onSuccess) onSuccess();
      } else {
        console.error(`Failed to update price: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      if (onError) onError(error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="delete-button"
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#b60303',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '1rem',
      }}
    >
      Delete
    </button>
  );
};

export default UpdatePriceButton;