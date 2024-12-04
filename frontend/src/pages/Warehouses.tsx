import React, { useEffect, useState } from 'react';
import { WarehouseWithParts } from '../types/types';
import { useAuth } from "../context/UseAuth.ts";
import {USER_ENDPOINTS} from "../types/endpoints.ts";

const Warehouses = () => {
  const { isLoggedIn, jwt, role } = useAuth();
  const [warehouses, setWarehouses] = useState<WarehouseWithParts[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(USER_ENDPOINTS.GET_ALL_WAREHOUSES_WITH_PARTS, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          }
        });
        if (!response.ok) {
          console.error('Network response was not ok');
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    const fetchData = async () => {
      await fetchWarehouses();
    };

    fetchData().then(() => console.log('Warehouses fetched'));
  }, [jwt]);

  const toggleDropdown = (warehouseId: number) => {
    setSelectedWarehouse(selectedWarehouse === warehouseId ? null : warehouseId);
  };

  return (
    <>
      {isLoggedIn && jwt ? (
        <div className="p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Warehouse ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Parts</th>
                {role === "ROLE_ADMIN" && (
                  <th className="py-2 px-4 border-b">Settings</th>
                )}
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <React.Fragment key={warehouse.id}>
                  <tr className="text-center">
                    <td className="py-2 px-4 border-b">{warehouse.id}</td>
                    <td className="py-2 px-4 border-b">{warehouse.name}</td>
                    <td className="py-2 px-4 border-b">{warehouse.city}</td>
                    <td className="py-2 px-4 border-b">{warehouse.address}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => toggleDropdown(warehouse.id)}
                        className="text-cblue hover:underline"
                      >
                        {warehouse.parts.length} parts
                      </button>
                    </td>
                    {role === "ROLE_ADMIN" && (
                      <td className="py-2 px-4 border-b">Buttons</td>
                    )}
                  </tr>
                  {selectedWarehouse === warehouse.id && (
                    <tr>
                      <td colSpan={role === "ROLE_ADMIN" ? 6 : 5} className="py-2 px-4 border-b bg-gray-100">
                        <div>
                          {warehouse.parts.map((part) => (
                            <div key={part.id} className="mb-2">
                              <p><strong>Model:</strong> {part.model}</p>
                              <p><strong>Brand:</strong> {part.brand}</p>
                              <p><strong>Price:</strong> {part.price}</p>
                            </div>
                          ))}
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

export default Warehouses;
