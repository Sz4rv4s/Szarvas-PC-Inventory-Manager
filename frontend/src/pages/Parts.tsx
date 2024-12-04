import React, { useEffect, useState, useCallback } from 'react';
import { PartForWarehouse, PartWithWarehouse } from '../types/types';
import { useAuth } from "../context/UseAuth.ts";
import { USER_ENDPOINTS } from "../types/endpoints.ts";
import PartsPanel from "../components/PartsPanel.tsx";

const Parts = () => {
  const { isLoggedIn, jwt, role } = useAuth();
  const [parts, setParts] = useState<(PartWithWarehouse | PartForWarehouse)[]>([]);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);

  const handlePartFound = (part: PartForWarehouse | null | PartForWarehouse[]) => {
    if (Array.isArray(part)) {
      setParts(part);
    } else if (part) {
      setParts([part]);
    } else {
      setParts([]);
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
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  }, [jwt]);

  useEffect(() => {
    fetchParts().then(() => console.log('Parts fetched'));
  }, [fetchParts, jwt]);

  const toggleDropdown = (partId: number) => {
    setSelectedPart(selectedPart === partId ? null : partId);
  };

  const handleClear = () => {
    fetchParts().then(() => console.log('Parts fetched'));
  };

  return (
    <>
      {isLoggedIn && jwt ? (
        <div className="p-6">
          <PartsPanel onPartFound={handlePartFound} onClear={handleClear} />
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Part ID</th>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Brand</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Warehouse</th>
                {role === "ROLE_ADMIN" && (
                  <th className="py-2 px-4 border-b">Settings</th>
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
                    <td className="py-2 px-4 border-b">{part.price}</td>
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
                    {role === "ROLE_ADMIN" && (
                      <td className="py-2 px-4 border-b w-1/5">Buttons</td>
                    )}
                  </tr>
                  {'warehouseId' in part && selectedPart === part.id && (
                    <tr>
                      <td colSpan={(role === "ROLE_ADMIN" ? 6 : 5)} className="py-2 px-4 border-b bg-gray-100">
                        <div>
                          <p><strong>City:</strong> {part.warehouseId.city}</p>
                          <p><strong>Address:</strong> {part.warehouseId.address}</p>
                          <p><strong>Capacity:</strong> {part.warehouseId.capacity}</p>
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
