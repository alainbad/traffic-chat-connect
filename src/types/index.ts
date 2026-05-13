
export interface User {
  id: string;
  name: string;
  avatar?: string;
  location: GeoLocation;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
}

export interface MapSettings {
  zoom: number;
  center: [number, number];
  radius: number;
  style: string;
}

// Logistics types

export type ShipmentStatus = 'In Transit' | 'On Time' | 'Delayed' | 'Delivered' | 'Exception';

export interface Shipment {
  id: string;
  carrier: string;
  origin: string;
  destination: string;
  dispatchDate: string;
  eta: string;
  status: ShipmentStatus;
  lastUpdate: string;
  alerts: string[];
}

export type InventoryStatus = 'OK' | 'Low' | 'Critical';

export interface InventoryItem {
  sku: string;
  name: string;
  qtyOnHand: number;
  reorderPoint: number;
  warehouse: string;
}

export type RoutePriority = 'High' | 'Medium' | 'Low';

export interface RouteStop {
  id: string;
  destination: string;
  address: string;
  priority: RoutePriority;
  eta: string;
  notes: string;
}

export type SupplierStatus = 'Active' | 'Pending' | 'Issue' | 'Inactive';
export type SupplierRequestType = 'order' | 'complaint' | 'negotiation' | 'follow-up';

export interface Supplier {
  id: string;
  name: string;
  productService: string;
  leadTime: string;
  lastOrder: string;
  status: SupplierStatus;
  notes: string;
}
