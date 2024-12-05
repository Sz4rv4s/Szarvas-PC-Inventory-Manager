import {FC} from 'react';
import {DeleteButtonProps} from "../types/types.ts";
import {ADMIN_ENDPOINTS} from "../types/endpoints.ts";
import {useAuth} from "../context/UseAuth.ts";

const DeleteButton: FC<DeleteButtonProps> = ({ partId, refetchParts }) => {
  const { jwt } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${ADMIN_ENDPOINTS.DELETE_PART}${partId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`,
        }
      });
      if (response.ok) {
        refetchParts();
        console.log(`Part ${partId} deleted successfully`);
      } else {
        console.error(`Failed to delete part ${partId}`);
      }
    } catch (error) {
      console.error("Failed to delete part", error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-cred text-white rounded m-1 cursor-pointer border-none hover:bg-credhover"
      onClick={handleDelete}>Delete</button>
  );
};

export default DeleteButton;
