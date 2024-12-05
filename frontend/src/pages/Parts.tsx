import React, { useEffect, useState, useCallback } from 'react';
import {PartForUpdate, PartForWarehouse, PartWithWarehouse} from '../types/types';
import { useAuth } from "../context/UseAuth.ts";
import { USER_ENDPOINTS } from "../types/endpoints.ts";
import PartsPanel from "../components/PartsPanel.tsx";
import {data} from "react-router-dom";
import DeleteButton from "../components/DeleteButton.tsx";
import UpdatePriceButton from "../components/UpdatePriceButton.tsx";
import UpdatePartButton from "../components/UpdatePartButton.tsx";

const Parts = () => {
  const { isLoggedIn, jwt, role } = useAuth();
  const [parts, setParts] = useState<(PartWithWarehouse | PartForWarehouse)[]>([]);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [defaultId, setDefaultId] = useState<number>(1);


  const handlePartFound = (part: PartForWarehouse | null | PartForWarehouse[]) => {
    if (Array.isArray(part)) {
      setParts(part);
      setIsSearched(true);
    } else if (part) {
      setParts([part]);
      setIsSearched(true);
    } else {
      setParts([]);
      setIsSearched(false);
    }
  };

  const fetchParts = useCallback(async () => {
    try {
      const response = await fetch(USER_ENDPOINTS.GET_ALL_PARTS_WITH_WAREHOUSE, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        }
      });
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const data = await response.json();
      setParts(data);
      setDefaultId(findDefaultId(data));
      console.log(defaultId);
    } catch (error) {
      console.error('Error fetching parts:', error);
      console.error(data)
    }
  }, [defaultId, jwt]);

  useEffect(() => {
    fetchParts().then(() => console.log('Parts fetched'));
  }, [fetchParts, jwt]);

  const toggleDropdown = (partId: number) => {
    setSelectedPart(selectedPart === partId ? null : partId);
  };

  const handleClear = () => {
    fetchParts().then(() => console.log('Parts fetched'));
    setIsSearched(false);
  };

  const findDefaultId = (parts: (PartWithWarehouse | PartForWarehouse)[]) => {
    const ids = parts.map(part => part.id).sort((a, b) => a - b);
    for (let i = 1; i <= ids.length; i++) {
      if (ids[i - 1] !== i) {
        return i;
      }
    }
    return ids.length + 1;
  };

  const convertToPartForUpdate = (part: PartWithWarehouse | PartForWarehouse): PartForUpdate => {
    return {
      id: part.id,
      model: part.model,
      brand: part.brand,
      price: part.price,
      warehouseId: "warehouseId" in part ? part.warehouseId.id : 1,
    };
  };

  return (
    <>
      {isLoggedIn && jwt ? (
        <div className="p-6">
          <PartsPanel onPartFound={handlePartFound} onClear={handleClear} partsDataLength={defaultId} refetchParts={fetchParts}/>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Part ID</th>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Brand</th>
                <th className="py-2 px-4 border-b">Price</th>
                {!isSearched && <th className="py-2 px-4 border-b">Warehouse</th>}
                {role === "ROLE_ADMIN" && (
                  <th className="py-2 px-4 border-b">Options</th>
                )}
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                <React.Fragment key={part.id}>
                  <tr className="text-center">
                    <td className="py-2 px-4 border-b">{part.id}</td>
                    <td className="py-2 px-4 border-b">{part.model}</td>
                    <td className="py-2 px-4 border-b">{part.brand}</td>
                    <td className="py-2 px-4 border-b">{part.price} €</td>
                    {!isSearched && (
                      <td className="py-2 px-4 border-b">
                        {'warehouseId' in part ? (
                          <button
                            onClick={() => toggleDropdown(part.id)}
                            className="text-cblue hover:underline"
                          >
                            {part.warehouseId.name}
                          </button>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    )}
                    {role === "ROLE_ADMIN" && (
                      <td className="py-2 px-4 border-b w-1/5">
                        <DeleteButton partId={part.id} refetchParts={fetchParts} />
                        <UpdatePriceButton partId={part.id} oldPrice={part.price} refetchParts={fetchParts} />
                        <UpdatePartButton oldData={convertToPartForUpdate(part)} refetchParts={fetchParts} />
                      </td>
                    )}
                  </tr>
                  {!isSearched && 'warehouseId' in part && selectedPart === part.id && (
                    <tr>
                      <td colSpan={(role === "ROLE_ADMIN" ? 6 : 5)} className="py-2 px-4 border-b bg-gray-100">
                        <div>
                          <p><strong>Warehouse ID:</strong> {part.warehouseId.id}</p>
                          <p><strong>City:</strong> {part.warehouseId.city}</p>
                          <p><strong>Address:</strong> {part.warehouseId.address}</p>
                          <p><strong>Capacity:</strong> {part.warehouseId.capacity} Pallets</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6">
          <p>You need to be logged in to see this page.</p>
        </div>
      )}
    </>
  );
};

export default Parts;
