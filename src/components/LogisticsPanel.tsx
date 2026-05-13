import React, { useState } from 'react';
import { useLogistics } from '@/context/LogisticsContext';
import {
  Shipment, InventoryItem, InventoryStatus, RouteStop,
  Supplier, SupplierRequestType, RoutePriority, ShipmentStatus,
} from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Package, BarChart3, MapPin, Users2, AlertTriangle,
  CheckCircle2, XCircle, Trash2, Plus, FileText, RotateCcw,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

const inventoryStatus = (qty: number, reorder: number): InventoryStatus => {
  if (qty === 0) return 'Critical';
  if (qty <= reorder) return 'Low';
  return 'OK';
};

const statusColor = (status: InventoryStatus) => ({
  OK: 'text-green-600',
  Low: 'text-yellow-600',
  Critical: 'text-red-600',
}[status]);

const shipmentStatusColor = (status: ShipmentStatus) => ({
  'In Transit': 'text-blue-600',
  'On Time': 'text-green-600',
  'Delayed': 'text-yellow-600',
  'Delivered': 'text-green-700',
  'Exception': 'text-red-600',
}[status]);

const priorityColor = (p: RoutePriority) => ({
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-green-600',
}[p]);

const supplierStatusColor = (s: string) => ({
  Active: 'text-green-600',
  Pending: 'text-blue-600',
  Issue: 'text-red-600',
  Inactive: 'text-gray-400',
}[s] ?? 'text-gray-500');

const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── Shipment Tracking ───────────────────────────────────────────────────────

const ShipmentTracker: React.FC = () => {
  const { shipments, addShipment, removeShipment } = useLogistics();
  const [form, setForm] = useState({
    id: '', carrier: '', origin: '', destination: '',
    dispatchDate: '', eta: '', status: 'In Transit' as ShipmentStatus,
    lastUpdate: '', alertText: '',
  });

  const handleAdd = () => {
    if (!form.id || !form.origin || !form.destination) return;
    const shipment: Shipment = {
      id: form.id,
      carrier: form.carrier,
      origin: form.origin,
      destination: form.destination,
      dispatchDate: form.dispatchDate,
      eta: form.eta,
      status: form.status,
      lastUpdate: form.lastUpdate || new Date().toLocaleString(),
      alerts: form.alertText ? [form.alertText] : [],
    };
    addShipment(shipment);
    setForm({ id: '', carrier: '', origin: '', destination: '', dispatchDate: '', eta: '', status: 'In Transit', lastUpdate: '', alertText: '' });
  };

  const recommendedAction = (s: Shipment): string => {
    if (s.status === 'Exception' || s.alerts.length > 0) return 'Escalate — contact carrier immediately';
    if (s.status === 'Delayed') return 'Notify recipient of delay; request updated ETA from carrier';
    if (s.status === 'Delivered') return 'Confirm delivery receipt with recipient';
    return 'Monitor shipment progress';
  };

  return (
    <div className="space-y-4">
      {/* Form */}
      <div className="bg-secondary/40 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add Shipment</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Shipment ID *" value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} />
          <Input placeholder="Carrier" value={form.carrier} onChange={e => setForm(f => ({ ...f, carrier: e.target.value }))} />
          <Input placeholder="Origin *" value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} />
          <Input placeholder="Destination *" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
          <Input placeholder="Dispatch Date" value={form.dispatchDate} onChange={e => setForm(f => ({ ...f, dispatchDate: e.target.value }))} />
          <Input placeholder="ETA" value={form.eta} onChange={e => setForm(f => ({ ...f, eta: e.target.value }))} />
          <select
            className="col-span-2 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as ShipmentStatus }))}
          >
            {(['In Transit', 'On Time', 'Delayed', 'Delivered', 'Exception'] as ShipmentStatus[]).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <Input className="col-span-2" placeholder="Alert / issue (optional)" value={form.alertText} onChange={e => setForm(f => ({ ...f, alertText: e.target.value }))} />
        </div>
        <Button size="sm" onClick={handleAdd} className="w-full gap-1">
          <Plus className="w-4 h-4" /> Track Shipment
        </Button>
      </div>

      {/* Results */}
      {shipments.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-6">No shipments tracked yet</p>
      ) : (
        <div className="space-y-3">
          {shipments.map(s => (
            <div key={s.id} className="border rounded-xl p-4 space-y-3 bg-background">
              {/* Status table */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{s.id}</span>
                <span className={`text-xs font-bold ${shipmentStatusColor(s.status)}`}>{s.status}</span>
              </div>
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['Carrier', s.carrier || '—'],
                    ['Origin', s.origin],
                    ['Destination', s.destination],
                    ['Dispatch', s.dispatchDate || '—'],
                    ['ETA', s.eta || '—'],
                    ['Last Update', s.lastUpdate],
                  ].map(([field, val]) => (
                    <tr key={field} className="border-b last:border-0">
                      <td className="py-1 pr-3 font-medium text-muted-foreground w-24">{field}</td>
                      <td className="py-1">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Alerts */}
              {s.alerts.length > 0 && (
                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-yellow-800 space-y-0.5">
                    {s.alerts.map((a, i) => <p key={i}>{a}</p>)}
                  </div>
                </div>
              )}
              {/* Action */}
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-800">{recommendedAction(s)}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive w-full gap-1" onClick={() => removeShipment(s.id)}>
                <Trash2 className="w-3 h-3" /> Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Inventory Management ────────────────────────────────────────────────────

const InventoryManager: React.FC = () => {
  const { inventory, addInventoryItem, removeInventoryItem } = useLogistics();
  const [form, setForm] = useState({ sku: '', name: '', qtyOnHand: '', reorderPoint: '', warehouse: '' });

  const handleAdd = () => {
    if (!form.sku || !form.name) return;
    addInventoryItem({
      sku: form.sku,
      name: form.name,
      qtyOnHand: Number(form.qtyOnHand) || 0,
      reorderPoint: Number(form.reorderPoint) || 0,
      warehouse: form.warehouse,
    });
    setForm({ sku: '', name: '', qtyOnHand: '', reorderPoint: '', warehouse: '' });
  };

  const belowReorder = inventory.filter(i => i.qtyOnHand <= i.reorderPoint && i.qtyOnHand > 0);
  const outOfStock = inventory.filter(i => i.qtyOnHand === 0);

  return (
    <div className="space-y-4">
      {/* Form */}
      <div className="bg-secondary/40 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add / Update Item</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="SKU *" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
          <Input placeholder="Item Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input type="number" placeholder="Qty On Hand" value={form.qtyOnHand} onChange={e => setForm(f => ({ ...f, qtyOnHand: e.target.value }))} />
          <Input type="number" placeholder="Reorder Point" value={form.reorderPoint} onChange={e => setForm(f => ({ ...f, reorderPoint: e.target.value }))} />
          <Input className="col-span-2" placeholder="Warehouse / Location" value={form.warehouse} onChange={e => setForm(f => ({ ...f, warehouse: e.target.value }))} />
        </div>
        <Button size="sm" onClick={handleAdd} className="w-full gap-1">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {/* Summary report */}
      {inventory.length > 0 && (
        <div className="bg-secondary/40 rounded-xl p-4 space-y-1 text-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Inventory Summary</p>
          <p>Total SKUs: <span className="font-semibold">{inventory.length}</span></p>
          <p>Below reorder point: <span className="font-semibold text-yellow-600">{belowReorder.length}</span></p>
          <p>Out of stock: <span className="font-semibold text-red-600">{outOfStock.length}</span></p>
        </div>
      )}

      {/* Inventory table */}
      {inventory.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-6">No inventory items yet</p>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-secondary/60">
              <tr>
                {['SKU', 'Name', 'Qty', 'Reorder', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-2 py-2 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => {
                const st = inventoryStatus(item.qtyOnHand, item.reorderPoint);
                return (
                  <tr key={item.sku} className="border-t">
                    <td className="px-2 py-2 font-mono">{item.sku}</td>
                    <td className="px-2 py-2">{item.name}</td>
                    <td className="px-2 py-2">{item.qtyOnHand}</td>
                    <td className="px-2 py-2">{item.reorderPoint}</td>
                    <td className={`px-2 py-2 font-bold ${statusColor(st)}`}>{st}</td>
                    <td className="px-2 py-2">
                      <button onClick={() => removeInventoryItem(item.sku)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Reorder action plan */}
      {(belowReorder.length > 0 || outOfStock.length > 0) && (
        <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <p className="text-xs font-semibold text-yellow-800 uppercase tracking-wider">Reorder Action Plan</p>
          </div>
          {[...outOfStock, ...belowReorder.filter(i => i.qtyOnHand > 0)].map(item => (
            <div key={item.sku} className="flex items-center justify-between text-xs text-yellow-900 border-t border-yellow-200 pt-2">
              <span className="font-medium">{item.name} ({item.sku})</span>
              <span className={item.qtyOnHand === 0 ? 'font-bold text-red-700' : 'text-yellow-700'}>
                {item.qtyOnHand === 0 ? 'URGENT — Out of stock' : `Low — reorder to ≥ ${item.reorderPoint}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Route Planning ──────────────────────────────────────────────────────────

const RoutePlanner: React.FC = () => {
  const { routeStops, addRouteStop, removeRouteStop, clearRoute } = useLogistics();
  const [form, setForm] = useState({ destination: '', address: '', priority: 'Medium' as RoutePriority, eta: '', notes: '' });
  const [startingPoint, setStartingPoint] = useState('');

  const handleAdd = () => {
    if (!form.destination) return;
    addRouteStop({ id: uid(), ...form });
    setForm({ destination: '', address: '', priority: 'Medium', eta: '', notes: '' });
  };

  // Sort by priority for optimized display
  const sorted = [...routeStops].sort((a, b) => {
    const order: Record<RoutePriority, number> = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  });

  const checklist = [
    'Confirm vehicle fuel / charge level',
    'Verify all packages are loaded and manifests match',
    'Check for traffic / road closures on route',
    'Notify time-sensitive recipients of ETA',
    'Ensure delivery documentation is on hand',
  ];

  return (
    <div className="space-y-4">
      {/* Form */}
      <div className="bg-secondary/40 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add Stop</p>
        <Input placeholder="Starting point" value={startingPoint} onChange={e => setStartingPoint(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Destination *" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
          <Input placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as RoutePriority }))}
          >
            {(['High', 'Medium', 'Low'] as RoutePriority[]).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <Input placeholder="ETA" value={form.eta} onChange={e => setForm(f => ({ ...f, eta: e.target.value }))} />
          <Input className="col-span-2" placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAdd} className="flex-1 gap-1">
            <Plus className="w-4 h-4" /> Add Stop
          </Button>
          {routeStops.length > 0 && (
            <Button size="sm" variant="outline" onClick={clearRoute} className="gap-1">
              <RotateCcw className="w-3 h-3" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Route table */}
      {sorted.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-6">No stops added yet</p>
      ) : (
        <>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-secondary/60">
                <tr>
                  {['#', 'Destination', 'Priority', 'ETA', 'Notes', ''].map(h => (
                    <th key={h} className="text-left px-2 py-2 font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((stop, i) => (
                  <tr key={stop.id} className="border-t">
                    <td className="px-2 py-2 font-bold text-muted-foreground">{i + 1}</td>
                    <td className="px-2 py-2 font-medium">{stop.destination}</td>
                    <td className={`px-2 py-2 font-bold ${priorityColor(stop.priority)}`}>{stop.priority}</td>
                    <td className="px-2 py-2">{stop.eta || '—'}</td>
                    <td className="px-2 py-2 text-muted-foreground">{stop.notes || '—'}</td>
                    <td className="px-2 py-2">
                      <button onClick={() => removeRouteStop(stop.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Route summary */}
          <div className="bg-secondary/40 rounded-xl p-4 text-sm space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Route Summary</p>
            {startingPoint && <p>Starting point: <span className="font-medium">{startingPoint}</span></p>}
            <p>Total stops: <span className="font-semibold">{routeStops.length}</span></p>
            <p>High-priority stops: <span className="font-semibold text-red-600">{routeStops.filter(s => s.priority === 'High').length}</span></p>
          </div>

          {/* Pre-departure checklist */}
          <div className="border rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pre-Departure Checklist</p>
            </div>
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="rounded" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Supplier Coordination ───────────────────────────────────────────────────

const SupplierCoordinator: React.FC = () => {
  const { suppliers, addSupplier, removeSupplier } = useLogistics();
  const [form, setForm] = useState({
    name: '', productService: '', leadTime: '', lastOrder: '',
    status: 'Active' as Supplier['status'], notes: '',
    requestType: 'order' as SupplierRequestType, issue: '',
  });
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    if (!form.name) return;
    addSupplier({ id: uid(), name: form.name, productService: form.productService, leadTime: form.leadTime, lastOrder: form.lastOrder, status: form.status, notes: form.notes });
    setForm(f => ({ ...f, name: '', productService: '', leadTime: '', lastOrder: '', notes: '' }));
  };

  const generateDraft = () => {
    if (!form.name || !form.issue) return;
    const subjectMap: Record<SupplierRequestType, string> = {
      order: 'Purchase Order Request',
      complaint: 'Formal Complaint — Delivery Issue',
      negotiation: 'Contract / Pricing Discussion',
      'follow-up': 'Follow-Up on Outstanding Order',
    };
    const bodyMap: Record<SupplierRequestType, string> = {
      order: `We would like to place a purchase order for ${form.productService || '[product/service]'}. Please confirm availability and lead time at your earliest convenience.`,
      complaint: `We are writing to formally report an issue with our recent order: ${form.issue}. We request your immediate attention and a resolution plan within 48 hours.`,
      negotiation: `We would like to open a discussion regarding ${form.issue}. Please advise on available options and schedule a call at your convenience.`,
      'follow-up': `This is a follow-up regarding our outstanding order for ${form.productService || '[product/service]'}. Issue noted: ${form.issue}. Please provide a status update and revised ETA.`,
    };
    setDraft(
      `Subject: ${subjectMap[form.requestType]}\n\nDear ${form.name} Team,\n\n${bodyMap[form.requestType]}\n\nPlease reference any relevant order numbers and respond with an updated status.\n\nWe look forward to your prompt response.\n\nBest regards,\n[Your Name]\n[Your Organisation]`
    );
  };

  return (
    <div className="space-y-4">
      {/* Add supplier */}
      <div className="bg-secondary/40 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add Supplier</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Supplier Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input placeholder="Product / Service" value={form.productService} onChange={e => setForm(f => ({ ...f, productService: e.target.value }))} />
          <Input placeholder="Lead Time" value={form.leadTime} onChange={e => setForm(f => ({ ...f, leadTime: e.target.value }))} />
          <Input placeholder="Last Order Date" value={form.lastOrder} onChange={e => setForm(f => ({ ...f, lastOrder: e.target.value }))} />
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as Supplier['status'] }))}
          >
            {(['Active', 'Pending', 'Issue', 'Inactive'] as Supplier['status'][]).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Input placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
        </div>
        <Button size="sm" onClick={handleAdd} className="w-full gap-1">
          <Plus className="w-4 h-4" /> Add Supplier
        </Button>
      </div>

      {/* Supplier table */}
      {suppliers.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-secondary/60">
              <tr>
                {['Supplier', 'Product/Service', 'Lead Time', 'Last Order', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-2 py-2 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="px-2 py-2 font-medium">{s.name}</td>
                  <td className="px-2 py-2">{s.productService || '—'}</td>
                  <td className="px-2 py-2">{s.leadTime || '—'}</td>
                  <td className="px-2 py-2">{s.lastOrder || '—'}</td>
                  <td className={`px-2 py-2 font-bold ${supplierStatusColor(s.status)}`}>{s.status}</td>
                  <td className="px-2 py-2">
                    <button onClick={() => removeSupplier(s.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Draft message */}
      <div className="bg-secondary/40 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Draft Message</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Supplier Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={form.requestType}
            onChange={e => setForm(f => ({ ...f, requestType: e.target.value as SupplierRequestType }))}
          >
            <option value="order">Purchase Order</option>
            <option value="complaint">Complaint</option>
            <option value="negotiation">Negotiation</option>
            <option value="follow-up">Follow-Up</option>
          </select>
          <Input className="col-span-2" placeholder="Describe issue / request details" value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))} />
        </div>
        <Button size="sm" onClick={generateDraft} className="w-full gap-1" variant="outline">
          <FileText className="w-4 h-4" /> Generate Draft
        </Button>
        {draft && (
          <textarea
            readOnly
            value={draft}
            rows={10}
            className="w-full text-xs font-mono border rounded-lg p-3 bg-background resize-none"
          />
        )}
      </div>
    </div>
  );
};

// ─── Main Panel ──────────────────────────────────────────────────────────────

const LogisticsPanel: React.FC = () => {
  return (
    <div className="glass h-full flex flex-col rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b p-4 flex items-center gap-3">
        <Package className="w-5 h-5 text-primary" />
        <h2 className="font-semibold">Logistics Manager</h2>
      </div>

      <Tabs defaultValue="shipments" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 px-4 py-2 bg-transparent shrink-0">
          <TabsTrigger value="shipments" className="rounded-lg text-xs flex flex-col gap-0.5 h-auto py-1.5">
            <Package className="w-3.5 h-3.5" />
            <span>Shipments</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-lg text-xs flex flex-col gap-0.5 h-auto py-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="routes" className="rounded-lg text-xs flex flex-col gap-0.5 h-auto py-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Routes</span>
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="rounded-lg text-xs flex flex-col gap-0.5 h-auto py-1.5">
            <Users2 className="w-3.5 h-3.5" />
            <span>Suppliers</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="shipments" className="mt-0 data-[state=inactive]:hidden">
              <ShipmentTracker />
            </TabsContent>
            <TabsContent value="inventory" className="mt-0 data-[state=inactive]:hidden">
              <InventoryManager />
            </TabsContent>
            <TabsContent value="routes" className="mt-0 data-[state=inactive]:hidden">
              <RoutePlanner />
            </TabsContent>
            <TabsContent value="suppliers" className="mt-0 data-[state=inactive]:hidden">
              <SupplierCoordinator />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default LogisticsPanel;
