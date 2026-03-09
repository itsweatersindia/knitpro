import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Box, 
  Cpu, 
  ShieldCheck, 
  Package, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  Users,
  Palette,
  ShoppingCart,
  ClipboardList,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';

// Screens
const Dashboard = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Elite Knitting Unit</h1>
        <p className="text-slate-500">Real-time floor overview and performance metrics</p>
      </div>
      <div className="flex gap-3">
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium">System Live</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Active Machines', value: '42/48', sub: '87.5% Efficiency', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Today\'s Production', value: '1,284 kg', sub: '+12% from avg', icon: Box, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Quality Score', value: '98.2%', sub: '0.8% Rejection', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Pending Orders', value: '18', sub: '4 due this week', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className={cn("p-2 rounded-lg", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <span className="text-xs font-medium text-slate-400">Live</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 stat-value">{stat.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-bottom border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Machine Status Matrix</h3>
          <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
        </div>
        <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {Array.from({ length: 32 }).map((_, i) => {
            const status = Math.random() > 0.8 ? 'idle' : Math.random() > 0.9 ? 'error' : 'running';
            return (
              <div key={i} className="group relative">
                <div className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer border",
                  status === 'running' ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" :
                  status === 'idle' ? "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100" :
                  "bg-rose-50 border-rose-200 text-rose-700 animate-pulse"
                )}>
                  M{i + 1}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                  {status.toUpperCase()} - 240 RPM
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
        <h3 className="font-bold text-slate-800">Recent Alerts</h3>
        <div className="space-y-3">
          {[
            { msg: 'Yarn break on M-08', time: '2m ago', type: 'error' },
            { msg: 'M-14 maintenance due', time: '15m ago', type: 'warning' },
            { msg: 'Batch #842 completed', time: '45m ago', type: 'success' },
            { msg: 'Low stock: Cotton 40s', time: '1h ago', type: 'warning' },
          ].map((alert, i) => (
            <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={cn(
                "w-2 h-2 mt-1.5 rounded-full shrink-0",
                alert.type === 'error' ? "bg-rose-500" :
                alert.type === 'warning' ? "bg-amber-500" : "bg-emerald-500"
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 leading-tight">{alert.msg}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 text-xs font-medium text-slate-500 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
          View Notification Center
        </button>
      </div>
    </div>
  </div>
);

const YarnIssuance = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Yarn Management</h1>
        <p className="text-slate-500">Inventory tracking and machine issuance</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Box className="w-4 h-4" />
        New Issuance
      </button>
    </div>

    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Lot No, Yarn Type..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none">
            <option>All Types</option>
            <option>Cotton</option>
            <option>Polyester</option>
            <option>Blended</option>
          </select>
          <button className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm hover:bg-slate-100">
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lot Number</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Yarn Type</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock (kg)</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issued (kg)</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { lot: 'L-2024-081', type: 'Cotton 40s Combed', stock: 1250, issued: 450, status: 'In Stock' },
              { lot: 'L-2024-082', type: 'PC 65/35 30s', stock: 800, issued: 780, status: 'Low Stock' },
              { lot: 'L-2024-083', type: 'Polyester 150D', stock: 2100, issued: 1200, status: 'In Stock' },
              { lot: 'L-2024-084', type: 'Organic Cotton 20s', stock: 450, issued: 450, status: 'Empty' },
              { lot: 'L-2024-085', type: 'Melange 30s Grey', stock: 1500, issued: 300, status: 'In Stock' },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-700">{item.lot}</td>
                <td className="p-4 text-sm text-slate-600">{item.type}</td>
                <td className="p-4 text-sm font-mono text-slate-600">{item.stock}</td>
                <td className="p-4 text-sm font-mono text-slate-600">{item.issued}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                    item.status === 'In Stock' ? "bg-emerald-100 text-emerald-700" :
                    item.status === 'Low Stock' ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Quality = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quality Inspection</h1>
        <p className="text-slate-500">Defect tracking and fabric grading</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
          Export Report
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Log Inspection
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Live Inspection Feed</h3>
          <div className="space-y-4">
            {[
              { roll: 'R-8421', machine: 'M-04', grade: 'A', defects: 0, status: 'Passed' },
              { roll: 'R-8422', machine: 'M-12', grade: 'B', defects: 2, status: 'Flagged' },
              { roll: 'R-8423', machine: 'M-08', grade: 'A', defects: 0, status: 'Passed' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-bold",
                    item.grade === 'A' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {item.grade}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Roll #{item.roll}</p>
                    <p className="text-xs text-slate-500">Machine: {item.machine} | Defects: {item.defects}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    item.status === 'Passed' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Inspected 5m ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Defect Distribution</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Holes', count: 12, trend: '+2%' },
              { label: 'Oil Spots', count: 5, trend: '-1%' },
              { label: 'Yarn Slub', count: 24, trend: '+5%' },
              { label: 'Needle Mark', count: 3, trend: '0%' },
            ].map((defect, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-medium text-slate-500">{defect.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-800">{defect.count}</span>
                  <span className={cn(
                    "text-[10px] font-bold",
                    defect.trend.startsWith('+') ? "text-rose-500" : "text-emerald-500"
                  )}>{defect.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Quality Alert</h3>
            <p className="text-slate-400 text-sm mb-4">Machine M-12 is producing consistent needle marks. Immediate inspection required.</p>
            <button className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-bold transition-colors">
              Stop Machine M-12
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <ShieldCheck className="w-32 h-32" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Shift Performance</h3>
          <div className="space-y-4">
            {[
              { shift: 'Morning', efficiency: 94, quality: 98 },
              { shift: 'Evening', efficiency: 88, quality: 96 },
              { shift: 'Night', efficiency: 82, quality: 92 },
            ].map((s, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">{s.shift} Shift</span>
                  <span className="text-blue-600">{s.quality}% Quality</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${s.quality}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Clients = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Client Directory</h1>
        <p className="text-slate-500">Manage customer profiles and partnership history</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add New Client
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Total Clients', value: '124', trend: '+4 this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Contracts', value: '42', trend: '8 pending renewal', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Revenue (MTD)', value: '$128.4k', trend: '+12% vs last month', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
      ].map((stat, i) => (
        <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className={cn("p-3 rounded-lg", stat.bg)}>
            <stat.icon className={cn("w-6 h-6", stat.color)} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">{stat.trend}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search clients by name, region..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm hover:bg-slate-100 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Name</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Region</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Orders</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Value</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: 'Nordic Apparel Group', region: 'Oslo, Norway', orders: 5, value: '$45,200', status: 'Active' },
              { name: 'Urban Threads Co.', region: 'New York, USA', orders: 2, value: '$12,800', status: 'Active' },
              { name: 'Silk Road Textiles', region: 'Istanbul, Turkey', orders: 0, value: '$84,000', status: 'Inactive' },
              { name: 'Alpine Sportswear', region: 'Zurich, Switzerland', orders: 8, value: '$112,500', status: 'Active' },
              { name: 'Pacific Knits', region: 'Sydney, Australia', orders: 1, value: '$5,400', status: 'Active' },
            ].map((client, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{client.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600">{client.region}</td>
                <td className="p-4 text-sm font-mono text-slate-600">{client.orders}</td>
                <td className="p-4 text-sm font-mono text-slate-600">{client.value}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                    client.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  )}>
                    {client.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Styles = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Style Library</h1>
        <p className="text-slate-500">Technical specifications and design catalog</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Create New Style
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[
        { id: 'ST-2024-001', name: 'Classic Crewneck', category: 'Sweater', yarn: 'Cotton 40s', image: 'https://picsum.photos/seed/sweater1/400/300' },
        { id: 'ST-2024-002', name: 'V-Neck Pullover', category: 'Knitwear', yarn: 'Merino Wool', image: 'https://picsum.photos/seed/sweater2/400/300' },
        { id: 'ST-2024-003', name: 'Ribbed Cardigan', category: 'Outerwear', yarn: 'Acrylic Blend', image: 'https://picsum.photos/seed/sweater3/400/300' },
        { id: 'ST-2024-004', name: 'Turtleneck Slim', category: 'Sweater', yarn: 'Cashmere', image: 'https://picsum.photos/seed/sweater4/400/300' },
        { id: 'ST-2024-005', name: 'Cable Knit Vest', category: 'Knitwear', yarn: 'Wool Blend', image: 'https://picsum.photos/seed/sweater5/400/300' },
        { id: 'ST-2024-006', name: 'Hooded Poncho', category: 'Outerwear', yarn: 'Cotton Blend', image: 'https://picsum.photos/seed/sweater6/400/300' },
      ].map((style, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
        >
          <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
            <img 
              src={style.image} 
              alt={style.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-slate-700 shadow-sm">
              {style.category}
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{style.id}</p>
              <h4 className="font-bold text-slate-900 truncate">{style.name}</h4>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Box className="w-3 h-3" />
                {style.yarn}
              </span>
              <button className="text-blue-600 hover:underline font-medium">Specs</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Orders = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
        <p className="text-slate-500">Track production lifecycle from order to delivery</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" />
        New Order
      </button>
    </div>

    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          {['All', 'Pending', 'Knitting', 'Quality', 'Ready'].map((tab) => (
            <button key={tab} className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              tab === 'All' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
            )}>
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Style</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 'ORD-2024-001', client: 'Nordic Apparel', style: 'ST-001', qty: '2,500 pcs', deadline: 'Mar 25', status: 'Knitting', progress: 65 },
              { id: 'ORD-2024-002', client: 'Urban Threads', style: 'ST-004', qty: '1,200 pcs', deadline: 'Apr 02', status: 'Pending', progress: 0 },
              { id: 'ORD-2024-003', client: 'Alpine Sport', style: 'ST-002', qty: '5,000 pcs', deadline: 'Mar 18', status: 'Quality', progress: 92 },
              { id: 'ORD-2024-004', client: 'Pacific Knits', style: 'ST-005', qty: '800 pcs', deadline: 'Apr 10', status: 'Ready', progress: 100 },
              { id: 'ORD-2024-005', client: 'Nordic Apparel', style: 'ST-003', qty: '3,000 pcs', deadline: 'May 05', status: 'Pending', progress: 0 },
            ].map((order, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm font-bold text-slate-800">{order.id}</td>
                <td className="p-4 text-sm text-slate-600">{order.client}</td>
                <td className="p-4 text-sm text-slate-600">{order.style}</td>
                <td className="p-4 text-sm font-mono text-slate-600">{order.qty}</td>
                <td className="p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {order.deadline}
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                    order.status === 'Knitting' ? "bg-blue-100 text-blue-700" :
                    order.status === 'Quality' ? "bg-amber-100 text-amber-700" :
                    order.status === 'Ready' ? "bg-emerald-100 text-emerald-700" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-[10px] font-bold text-slate-500">{order.progress}%</span>
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          order.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Knitting = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Machine Floor Overview</h1>
        <p className="text-slate-500">Real-time machine performance and speed tracking</p>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-4 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-600">42 Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-xs font-bold text-slate-600">4 Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs font-bold text-slate-600">2 Error</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => {
        const speed = 220 + Math.floor(Math.random() * 40);
        const efficiency = 85 + Math.floor(Math.random() * 10);
        const status = i === 5 ? 'error' : i === 8 ? 'idle' : 'running';
        
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "bg-white border rounded-xl p-4 space-y-4 transition-all hover:shadow-md",
              status === 'error' ? "border-rose-200 bg-rose-50/30" : "border-slate-200"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900">Machine M-{String(i + 1).padStart(2, '0')}</h4>
                <p className="text-[10px] text-slate-400 font-mono">ID: KNIT-2024-{100 + i}</p>
              </div>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                status === 'running' ? "bg-emerald-100 text-emerald-700" :
                status === 'idle' ? "bg-slate-100 text-slate-500" : "bg-rose-100 text-rose-700"
              )}>
                {status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Speed</p>
                <p className="text-lg font-bold text-slate-800 font-mono">{status === 'running' ? `${speed} RPM` : '0 RPM'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Efficiency</p>
                <p className="text-lg font-bold text-slate-800 font-mono">{status === 'running' ? `${efficiency}%` : '0%'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500">Target: 250kg</span>
                <span className="text-blue-600">{status === 'running' ? '184kg' : '0kg'}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    status === 'running' ? "bg-blue-500" : "bg-slate-300"
                  )}
                  style={{ width: status === 'running' ? '74%' : '0%' }}
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button className="flex-1 py-1.5 text-[10px] font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 rounded transition-colors">
                Details
              </button>
              <button className="flex-1 py-1.5 text-[10px] font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 rounded transition-colors">
                Settings
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const Packaging = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Logistics & Packaging</h1>
        <p className="text-slate-500">Warehouse management and dispatch tracking</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Package className="w-4 h-4" />
        New Dispatch
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Packed Goods</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200">
                <Search className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Carton ID</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order Ref</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Weight</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'C-9041', order: 'ORD-2024-11', weight: '24.5 kg', dest: 'New York, USA', status: 'In Warehouse' },
                  { id: 'C-9042', order: 'ORD-2024-12', weight: '22.1 kg', dest: 'London, UK', status: 'Dispatched' },
                  { id: 'C-9043', order: 'ORD-2024-11', weight: '25.0 kg', dest: 'New York, USA', status: 'In Warehouse' },
                  { id: 'C-9044', order: 'ORD-2024-15', weight: '18.4 kg', dest: 'Berlin, DE', status: 'Processing' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-mono font-bold text-slate-700">{item.id}</td>
                    <td className="p-4 text-sm text-slate-600">{item.order}</td>
                    <td className="p-4 text-sm text-slate-600">{item.weight}</td>
                    <td className="p-4 text-sm text-slate-600">{item.dest}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        item.status === 'Dispatched' ? "bg-blue-100 text-blue-700" :
                        item.status === 'In Warehouse' ? "bg-emerald-100 text-emerald-700" :
                        "bg-slate-100 text-slate-500"
                      )}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Warehouse Map (Section A-D)</h3>
          <div className="grid grid-cols-4 gap-4 h-48">
            {['A', 'B', 'C', 'D'].map((section) => (
              <div key={section} className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200">{section}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Dispatch Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '14:00', carrier: 'FedEx', items: 12, status: 'Ready' },
              { time: '16:30', carrier: 'DHL Express', items: 8, status: 'Pending' },
              { time: 'Tomorrow', carrier: 'Maersk Line', items: 45, status: 'Scheduled' },
            ].map((d, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600">{d.time}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{d.status}</span>
                </div>
                <p className="text-sm font-bold text-slate-800">{d.carrier}</p>
                <p className="text-[10px] text-slate-500">{d.items} Cartons</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-600 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold">Inventory Health</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span>Storage Capacity</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="h-2 bg-emerald-700 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[78%]" />
            </div>
            <p className="text-[10px] text-emerald-100">1,240 sq.ft available in Section D</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Reports = () => {
  const data = [
    { name: 'Mon', prod: 400, quality: 98 },
    { name: 'Tue', prod: 300, quality: 96 },
    { name: 'Wed', prod: 500, quality: 99 },
    { name: 'Thu', prod: 280, quality: 95 },
    { name: 'Fri', prod: 590, quality: 97 },
    { name: 'Sat', prod: 320, quality: 98 },
    { name: 'Sun', prod: 440, quality: 99 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Production Intelligence</h1>
          <p className="text-slate-500">Advanced analytics and performance trends</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Year to Date</option>
          </select>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Production Output (kg)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="prod" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Quality Trend (%)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Department Efficiency</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Knitting', val: 88 },
                { name: 'Dyeing', val: 92 },
                { name: 'Cutting', val: 85 },
                { name: 'Sewing', val: 94 },
                { name: 'Finishing', val: 90 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">AI Insights</h3>
            <p className="text-slate-400 text-sm mb-6">Based on last week's data, we recommend increasing maintenance frequency for Machine M-08 to prevent potential downtime.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium">Production is up 12.4% vs last month</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-medium">Yarn wastage increased by 0.8% in Shift B</span>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors mt-6">
            Generate Detailed AI Audit
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'styles', label: 'Styles', icon: Palette },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'yarn', label: 'Yarn Issuance', icon: Box },
    { id: 'knitting', label: 'Knitting', icon: Cpu },
    { id: 'quality', label: 'Quality', icon: ShieldCheck },
    { id: 'packaging', label: 'Packaging', icon: Package },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && <span className="font-bold text-white text-lg tracking-tight">KnitOps Pro</span>}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-white")} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
            <Settings className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium text-sm">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <span>Production</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">John Doe</p>
                <p className="text-[10px] text-slate-500 mt-1">Floor Manager</p>
              </div>
              <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'clients' && <Clients />}
              {activeTab === 'styles' && <Styles />}
              {activeTab === 'orders' && <Orders />}
              {activeTab === 'yarn' && <YarnIssuance />}
              {activeTab === 'knitting' && <Knitting />}
              {activeTab === 'quality' && <Quality />}
              {activeTab === 'packaging' && <Packaging />}
              {activeTab === 'reports' && <Reports />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
