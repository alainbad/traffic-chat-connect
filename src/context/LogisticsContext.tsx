import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Shipment, InventoryItem, RouteStop, Supplier } from '@/types';

interface LogisticsContextType {
  shipments: Shipment[];
  inventory: InventoryItem[];
  routeStops: RouteStop[];
  suppliers: Supplier[];
  addShipment: (shipment: Shipment) => void;
  removeShipment: (id: string) => void;
  addInventoryItem: (item: InventoryItem) => void;
  removeInventoryItem: (sku: string) => void;
  addRouteStop: (stop: RouteStop) => void;
  removeRouteStop: (id: string) => void;
  clearRoute: () => void;
  addSupplier: (supplier: Supplier) => void;
  removeSupplier: (id: string) => void;
}

const LogisticsContext = createContext<LogisticsContextType>({
  shipments: [],
  inventory: [],
  routeStops: [],
  suppliers: [],
  addShipment: () => {},
  removeShipment: () => {},
  addInventoryItem: () => {},
  removeInventoryItem: () => {},
  addRouteStop: () => {},
  removeRouteStop: () => {},
  clearRoute: () => {},
  addSupplier: () => {},
  removeSupplier: () => {},
});

export const useLogistics = () => useContext(LogisticsContext);

export const LogisticsProvider = ({ children }: { children: ReactNode }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const addShipment = (shipment: Shipment) =>
    setShipments(prev => [shipment, ...prev]);

  const removeShipment = (id: string) =>
    setShipments(prev => prev.filter(s => s.id !== id));

  const addInventoryItem = (item: InventoryItem) =>
    setInventory(prev => {
      const exists = prev.findIndex(i => i.sku === item.sku);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = item;
        return updated;
      }
      return [...prev, item];
    });

  const removeInventoryItem = (sku: string) =>
    setInventory(prev => prev.filter(i => i.sku !== sku));

  const addRouteStop = (stop: RouteStop) =>
    setRouteStops(prev => [...prev, stop]);

  const removeRouteStop = (id: string) =>
    setRouteStops(prev => prev.filter(s => s.id !== id));

  const clearRoute = () => setRouteStops([]);

  const addSupplier = (supplier: Supplier) =>
    setSuppliers(prev => [...prev, supplier]);

  const removeSupplier = (id: string) =>
    setSuppliers(prev => prev.filter(s => s.id !== id));

  return (
    <LogisticsContext.Provider
      value={{
        shipments,
        inventory,
        routeStops,
        suppliers,
        addShipment,
        removeShipment,
        addInventoryItem,
        removeInventoryItem,
        addRouteStop,
        removeRouteStop,
        clearRoute,
        addSupplier,
        removeSupplier,
      }}
    >
      {children}
    </LogisticsContext.Provider>
  );
};
