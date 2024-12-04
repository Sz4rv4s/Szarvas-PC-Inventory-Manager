import React, { useEffect, useState } from 'react';
import {PartWithWarehouse} from '../types/types';
import {useAuth} from "../context/UseAuth.ts";

const Parts = () => {
  const { isLoggedIn, jwt, role } = useAuth();
  const [parts, setParts] = useState<PartWithWarehouse[]>([]);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);


  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/getallpartswithwarehouse', {
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
    };

    const fetchData = async () => {
      await fetchParts();
    };

    fetchData().then(() => console.log('Parts fetched'));
  }, [jwt]);

  const toggleDropdown = (partId: number) => {
    setSelectedPart(selectedPart === partId ? null : partId);
  };

  return (
    <>
      {isLoggedIn && jwt ? (
        <div className="p-6">
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
                    <button
                      onClick={() => toggleDropdown(part.id)}
                      className="text-cblue hover:underline"
                    >
                      {part.warehouseId.name}
                    </button>
                  </td>
                  {role === "ROLE_ADMIN" && (
                      <td className="py-2 px-4 border-b w-1/5">Buttons</td>
                    )}
                </tr>
                {selectedPart === part.id && (
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
      )};
    </>
  );
};

export default Parts;
