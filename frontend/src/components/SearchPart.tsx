import {FC, useState} from 'react'
import {PartForWarehouse, SearchPartProps} from "../types/types.ts";
import {USER_ENDPOINTS} from "../types/endpoints.ts";
import {useAuth} from "../context/UseAuth.ts";
import Modal from "./Modal.tsx";

const SearchPart: FC<SearchPartProps> = ({ onPartFound, onClear}) => {
  const { jwt } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchSearchedPart = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = searchType === 'id' ? `getpart/${query}` : `search/${query}`;
      const response = await fetch(`${USER_ENDPOINTS.SEARCH_PART}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${jwt}`,
        }
      });
      const data: PartForWarehouse | PartForWarehouse[] = await response.json();
      onPartFound(data);
    } catch (error) {
      setError(searchType === 'id' ? 'Part not found' : 'No parts found with this name');
      console.error(error);
      onPartFound(null);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async () => {
    if (query) {
      await fetchSearchedPart().then(() => console.log('Part found'));
    }
  };

  const handleClear = () => {
    onClear();
    setQuery('');
    setError(null);
  };

  const handleToggleSearchType = () => {
    setSearchType((prev) => (prev === 'name' ? 'id' : 'name'));
  };

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="flex flex-col items-start w-full p-4">
      <button className="py-2 px-4 bg-cblue text-white border-none cursor-pointer mb-4 rounded hover:bg-cbluehover"
              onClick={() => setShowInput(!showInput)}>
        {showInput ? 'Hide Search' : 'Show Search'}
      </button>
      {showInput && (
        <div className="flex items-center gap-5 w-full">
          <div className="flex items-center gap-5">
            <span
              className="w-24 text-center flex items-center justify-center">{searchType === 'name' ? 'Search Name' : 'Search ID'}</span>
            <div
              className={`relative w-10 h-5 bg-gray-300 rounded-full cursor-pointer ${searchType === 'id' ? 'bg-cblue' : ''}`}
              onClick={handleToggleSearchType}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-cblue rounded-full transition-transform ${searchType === 'id' ? 'transform translate-x-5' : ''}`}></div>
            </div>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter Part ${searchType === 'id' ? 'ID' : 'Name'}`}
            className="border p-2 rounded w-96"
          />
          <button
            className="py-2 px-4 bg-cgreen text-white border-none cursor-pointer rounded mr-2 hover:bg-cgreenhover"
            onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
          <button className="py-2 px-4 bg-cred text-white border-none cursor-pointer rounded hover:bg-credhover"
                  onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
      {showModal && error && (
        <Modal
          message={error}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SearchPart;
