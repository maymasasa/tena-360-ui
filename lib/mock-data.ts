import { LucideIcon, Shield, Wrench, Package, Truck, Zap, Activity, Battery, AlertTriangle, FileText, CheckCircle2, Clock } from 'lucide-react';

// --- Interfaces ---

export type UserRole = 'Technician' | 'Commander' | 'Logistics';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  unit: string;
}

export type EntityStatus = 'Operational' | 'Maintenance' | 'Critical' | 'Offline';

export interface Entity {
  id: string; // The numeric ID used for search
  name: string;
  type: 'Tank' | 'Truck' | 'APC' | 'UAV';
  model: string;
  status: EntityStatus;
  lastUpdated: string;
  batteryLevel?: number; // percentage
  fuelLevel?: number; // percentage
  location?: string;
}

export interface Action {
  id: string;
  label: string;
  icon: keyof typeof ICONS; // Store icon name as string for serializability if needed, mapped below
  color: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'slate';
  requiredRole?: UserRole[]; // If undefined, available to all
  deepLink?: string; // URL scheme or path
}

export interface HistoryItem {
  id: string;
  entityId: string;
  entityName: string;
  action: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// --- Icons Mapping ---
// This allows us to store icon names in data and map them to components
export const ICONS = {
  Shield,
  Wrench,
  Package,
  Truck,
  Zap,
  Activity,
  Battery,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock
};

export type IconName = keyof typeof ICONS;

// --- Mock Data ---

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'סמ״ר דניאל',
  role: 'Technician',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel', // consistent avatar
  unit: 'גדוד 77'
};

// Entities Database (The "Local DB")
export const VEHICLES: Record<string, Entity> = {
  '820011': {
    id: '820011',
    name: 'הנמר השחור',
    type: 'Tank',
    model: 'Merkava Mk4',
    status: 'Operational',
    lastUpdated: '10:42',
    fuelLevel: 85,
    batteryLevel: 92,
    location: 'שטח כינוס צפון'
  },
  '90210': {
    id: '90210',
    name: 'זאב בודד',
    type: 'APC',
    model: 'Namer',
    status: 'Maintenance',
    lastUpdated: '08:15',
    fuelLevel: 40,
    batteryLevel: 100,
    location: 'סדנא 3'
  },
  '334455': {
    id: '334455',
    name: 'רואה נסתר',
    type: 'UAV',
    model: 'Skylark',
    status: 'Critical',
    lastUpdated: '11:00',
    batteryLevel: 15,
    location: 'באוויר'
  },
  '778899': {
    id: '778899',
    name: 'מוביל כבד',
    type: 'Truck',
    model: 'Oshkosh',
    status: 'Offline',
    lastUpdated: 'Yesterday',
    location: 'חניון לילה'
  }
};

// Action Catalog
export const ACTIONS_CATALOG: Action[] = [
  {
    id: 'act_report_fault',
    label: 'דיווח תקלה',
    icon: 'AlertTriangle',
    color: 'red',
    deepLink: '/report-fault'
  },
  {
    id: 'act_tech_log',
    label: 'יומן טיפולים',
    icon: 'Wrench',
    color: 'blue',
    deepLink: '/tech-log'
  },
  {
    id: 'act_ammo_declare',
    label: 'הצהרת תחמושת',
    icon: 'Shield',
    color: 'orange',
    requiredRole: ['Commander', 'Logistics'],
    deepLink: '/ammo'
  },
  {
    id: 'act_refuel',
    label: 'הזמנת תדלוק',
    icon: 'Zap',
    color: 'purple',
    deepLink: '/refuel'
  },
  {
    id: 'act_order_parts',
    label: 'הזמנת חלפים',
    icon: 'Package',
    color: 'green',
    requiredRole: ['Logistics', 'Technician'],
    deepLink: '/parts'
  }
];

// User History (Local Audit Log)
export const USER_HISTORY: HistoryItem[] = [
  {
    id: 'h1',
    entityId: '820011',
    entityName: 'הנמר השחור',
    action: 'בדיקת תקינות',
    timestamp: 'היום, 09:30',
    status: 'Completed'
  },
  {
    id: 'h2',
    entityId: '90210',
    entityName: 'זאב בודד',
    action: 'הזמנת חלפים',
    timestamp: 'אתמול, 16:45',
    status: 'Pending'
  },
  {
    id: 'h3',
    entityId: '334455',
    entityName: 'רואה נסתר',
    action: 'דיווח תקלה',
    timestamp: 'אתמול, 14:20',
    status: 'Completed'
  },
  {
    id: 'h4',
    entityId: '778899',
    entityName: 'מוביל כבד',
    action: 'בדיקת כשירות',
    timestamp: 'לפני יומיים, 10:00',
    status: 'Failed'
  },
  {
    id: 'h5',
    entityId: '820011',
    entityName: 'הנמר השחור',
    action: 'טיפול 1000',
    timestamp: 'לפני שבוע, 08:00',
    status: 'Completed'
  },
  {
    id: 'h6',
    entityId: '334455',
    entityName: 'רואה נסתר',
    action: 'החלפת סוללה',
    timestamp: 'לפני שבועיים, 12:30',
    status: 'Completed'
  }
];