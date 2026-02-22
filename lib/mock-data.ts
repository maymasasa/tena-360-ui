import React from 'react';
import { LucideIcon, Shield, Wrench, Package, Truck, Zap, Activity, Battery, AlertTriangle, FileText, CheckCircle2, Clock, FireExtinguisher, Layers, Crosshair, Flame, Cylinder, Cpu } from 'lucide-react';

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
  color: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'slate' | 'amber';
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
  category: 'תחמושת' | 'חט"כים' | 'מטפים';
}

// --- Custom Icons (Using React.createElement to stay in .ts file) ---
const AmmoIcon = ({ size = 24, ...props }: any) => (
  React.createElement('svg', {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    // Single large shell/bullet
    React.createElement('path', { d: "M12 2C10 4 9 8 9 12V20H15V12C15 8 14 4 12 2Z" }),
    React.createElement('line', { x1: "9", y1: "16", x2: "15", y2: "16" }),
    React.createElement('line', { x1: "9", y1: "18", x2: "15", y2: "18" })
  )
);

const EngineIcon = ({ size = 24, className }: any) => (
  React.createElement('img', {
    src: '/engine-icon.svg',
    width: size,
    height: size,
    className: className,
    style: { filter: 'invert(1)', display: 'block' }
  })
);

// --- Icons Mapping ---
export const ICONS: Record<string, any> = {
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
  Clock,
  FireExtinguisher,
  Layers,
  Crosshair,
  Flame,
  Cylinder,
  Cpu,
  Ammo: AmmoIcon,
  Engine: EngineIcon
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
    lastUpdated: 'היום, 10:42',
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
    lastUpdated: 'אתמול, 08:15',
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
    lastUpdated: 'היום, 11:00',
    batteryLevel: 15,
    location: 'באוויר'
  },
  '778899': {
    id: '778899',
    name: 'מוביל כבד',
    type: 'Truck',
    model: 'Oshkosh',
    status: 'Offline',
    lastUpdated: 'אתמול, 14:00',
    location: 'חניון לילה'
  },
  '556677': {
    id: '556677',
    name: 'גמל שלמה',
    type: 'APC',
    model: 'Eitan',
    status: 'Operational',
    lastUpdated: 'מעולם לא',
    fuelLevel: 100,
    batteryLevel: 100,
    location: 'ימ״ח'
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
    icon: 'Ammo',
    color: 'amber',
    requiredRole: ['Commander', 'Logistics'],
    deepLink: '/ammo'
  },
  {
    id: 'act_htak',
    label: 'בדיקת חט"כים',
    icon: 'Engine',
    color: 'blue',
    deepLink: '/htak'
  },
  {
    id: 'act_extinguisher',
    label: 'בדיקת מטפים',
    icon: 'FireExtinguisher',
    color: 'red',
    deepLink: '/extinguisher'
  },
  {
    id: 'act_refuel',
    label: 'הזמנת תדלוק',
    icon: 'Flame',
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
    action: 'הצהרת תחמושת',
    timestamp: 'היום, 09:30',
    status: 'Completed',
    category: 'תחמושת'
  },
  {
    id: 'h2',
    entityId: '90210',
    entityName: 'זאב בודד',
    action: 'בדיקת חט"כים',
    timestamp: 'אתמול, 16:45',
    status: 'Pending',
    category: 'חט"כים'
  },
  {
    id: 'h3',
    entityId: '334455',
    entityName: 'רואה נסתר',
    action: 'מילוי מטפים',
    timestamp: 'אתמול, 14:20',
    status: 'Completed',
    category: 'מטפים'
  },
  {
    id: 'h8',
    entityId: '820011',
    entityName: 'הנמר השחור',
    action: 'בדיקת מטפים תקופתית',
    timestamp: 'היום, 07:15',
    status: 'Completed',
    category: 'מטפים'
  },
  {
    id: 'h9',
    entityId: '90210',
    entityName: 'זאב בודד',
    action: 'ריענון תחמושת בטן',
    timestamp: 'היום, 06:00',
    status: 'Completed',
    category: 'תחמושת'
  },
  {
    id: 'h4',
    entityId: '778899',
    entityName: 'מוביל כבד',
    action: 'הצהרת תחמושת',
    timestamp: 'לפני יומיים, 10:00',
    status: 'Failed',
    category: 'תחמושת'
  },
  {
    id: 'h5',
    entityId: '820011',
    entityName: 'הנמר השחור',
    action: 'טיפול 1000',
    timestamp: 'לפני שבוע, 08:00',
    status: 'Completed',
    category: 'חט"כים'
  },
  {
    id: 'h6',
    entityId: '334455',
    entityName: 'רואה נסתר',
    action: 'ריענון מטפים',
    timestamp: 'לפני שבועיים, 12:30',
    status: 'Completed',
    category: 'מטפים'
  },
  {
    id: 'h7',
    entityId: '90210',
    entityName: 'זאב בודד',
    action: 'החלפת חט"כים',
    timestamp: 'לפני שבועיים, 15:00',
    status: 'Completed',
    category: 'חט"כים'
  }
];
