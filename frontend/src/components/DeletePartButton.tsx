import {FC} from "react";

type DeletePartButtonProps = {
  partId: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

const DeletePartButton: FC<DeletePartButtonProps> = ({partId, onSuccess, onError}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/deletepart/${partId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });

      if (response.ok) {
        console.log(`Part ${partId} deleted successfully.`);
        if (onSuccess) onSuccess();
      } else {
        console.error(`Failed to delete part: ${response.statusText}`);
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

export default DeletePartButton;