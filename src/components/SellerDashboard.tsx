import React, { useState, useRef } from "react";
import {
  TrendingUp,
  Users,
  BarChart3,
  Calendar,
  DollarSign,
  Settings,
  Camera,
  ChevronRight,
  ChevronLeft,
  Clock,
  LayoutDashboard,
  Plus,
  MapPin,
  Star,
  Upload,
  FileText,
  Building2,
  CreditCard,
  Wallet,
  Check,
  X,
  Image as ImageIcon,
  Trash2,
  Eye,
  EyeOff,
  Edit,
  Package,
  Shield,
  Save,
  AlertCircle,
  Ban,
  UserCheck,
  LogIn,
  LogOut,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type View =
  | "main"
  | "create-venue"
  | "edit-venue"
  | "bank-details"
  | "analytics"
  | "analytics-summary"
  | "venue-detail"
  | "bookings"
  | "inventory"
  | "inventory-add"
  | "inventory-edit"
  | "scheduling"
  | "scheduling-block"
  | "events"
  | "event-detail"
  | "event-form";

type EventStatus = "draft" | "published" | "cancelled";

interface VenueEvent {
  id: string;
  venueId: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  slot: string;
  capacity: number;
  participants: string[];
  status: EventStatus;
  description: string;
}

const SPORT_OPTIONS = [
  "Badminton",
  "Pickleball",
  "Pilates",
  "Table Tennis",
  "Tennis",
  "Yoga",
];
const TYPE_OPTIONS = ["court", "studio"];
const TAG_OPTIONS = [
  "Indoor",
  "Outdoor",
  "Aircon",
  "24/7",
  "Pro Store",
  "Racket Rental",
  "Equipment Provided",
  "Night Play",
  "Clay Court",
  "Reformer",
  "Small Group",
  "Robot Training",
];
const DOCUMENT_TYPES = [
  "Business Permit",
  "DTI Registration",
  "BIR Certificate",
  "Fire Safety Certificate",
  "Sanitary Permit",
  "Lease Contract",
  "Insurance Policy",
  "Other",
];

const VENUES = [
  {
    id: "1",
    name: "Apex Hub Pro",
    sport: "Pickleball",
    type: "court" as const,
    location: "Cebu IT Park",
    courts: 6,
    status: "active",
    revenue: "₱12,450",
    load: "86%",
    change: "+12%",
    loadChange: "+4%",
  },
  {
    id: "2",
    name: "Smash Zone Arena",
    sport: "Badminton",
    type: "court" as const,
    location: "Mactan",
    courts: 4,
    status: "active",
    revenue: "₱8,200",
    load: "72%",
    change: "+8%",
    loadChange: "-2%",
  },
  {
    id: "3",
    name: "Zenith Yoga Studio",
    sport: "Yoga",
    type: "studio" as const,
    location: "Cebu Business Park",
    courts: 2,
    status: "active",
    revenue: "₱15,800",
    load: "91%",
    change: "+18%",
    loadChange: "+6%",
  },
];

const INITIAL_BOOKINGS = [
  {
    id: "1",
    guest: "Alex Rivera",
    date: "May 18",
    time: "10:00 AM",
    court: "Court 1",
    status: "confirmed" as const,
    amount: "₱450",
    sport: "Pickleball",
  },
  {
    id: "2",
    guest: "Maria Santos",
    date: "May 18",
    time: "11:00 AM",
    court: "Court 2",
    status: "arrived" as const,
    amount: "₱350",
    sport: "Badminton",
  },
  {
    id: "3",
    guest: "Coach Dave",
    date: "May 18",
    time: "2:00 PM",
    court: "Studio A",
    status: "checked-out" as const,
    amount: "₱600",
    sport: "Yoga",
  },
  {
    id: "4",
    guest: "John Dela Cruz",
    date: "May 18",
    time: "3:00 PM",
    court: "Court 3",
    status: "confirmed" as const,
    amount: "₱800",
    sport: "Tennis",
  },
  {
    id: "5",
    guest: "Sarah Kim",
    date: "May 19",
    time: "9:00 AM",
    court: "Court 1",
    status: "confirmed" as const,
    amount: "₱550",
    sport: "Pickleball",
  },
];

const INITIAL_EVENTS: VenueEvent[] = [
  {
    id: "e1",
    venueId: "1",
    title: "Pickleball Ladder Open",
    sport: "Pickleball",
    location: "Cebu IT Park",
    date: "May 25",
    time: "6:00 PM",
    slot: "MON 6:00 PM",
    capacity: 12,
    participants: ["Alex Rivera", "Maria Santos", "Coach Dave"],
    status: "published",
    description: "Weekend ladder tournament for competitive players.",
  },
  {
    id: "e2",
    venueId: "2",
    title: "Badminton Open Gym",
    sport: "Badminton",
    location: "Mactan",
    date: "May 26",
    time: "9:00 AM",
    slot: "TUE 9:00 AM",
    capacity: 8,
    participants: ["John Dela Cruz", "Sarah Kim"],
    status: "draft",
    description: "Open court for drop-in badminton sessions.",
  },
];

const INITIAL_ITEMS = [
  {
    id: "1",
    name: "Pro Racket (Yonex)",
    category: "Racket",
    quantity: 12,
    pricePerUse: 150,
    condition: "Good",
  },
  {
    id: "2",
    name: "Shuttlecock Tube",
    category: "Balls",
    quantity: 30,
    pricePerUse: 80,
    condition: "New",
  },
  {
    id: "3",
    name: "Premium Mat",
    category: "Equipment",
    quantity: 8,
    pricePerUse: 100,
    condition: "Good",
  },
  {
    id: "4",
    name: "Pickleball Paddle Set",
    category: "Racket",
    quantity: 6,
    pricePerUse: 150,
    condition: "Fair",
  },
  {
    id: "5",
    name: "Cooling Towel",
    category: "Accessory",
    quantity: 20,
    pricePerUse: 30,
    condition: "New",
  },
];

const SCHEDULE_SLOTS = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type Venue = (typeof VENUES)[0];

export function SellerDashboard() {
  const [view, setView] = useState<View>("main");
  const [venues, setVenues] = useState<Venue[]>([...VENUES]);
  const [selectedVenueId, setSelectedVenueId] = useState(VENUES[0].id);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [events, setEvents] = useState<VenueEvent[]>(INITIAL_EVENTS);
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [blockedSlots, setBlockedSlots] = useState<Record<string, boolean>>({});

  const selectedVenue =
    venues.find((v) => v.id === selectedVenueId) || venues[0];

  const handleDeleteVenue = (id: string) => {
    const remaining = venues.filter((v) => v.id !== id);
    setVenues(remaining);
    if (remaining.length > 0) setSelectedVenueId(remaining[0].id);
    setView("main");
  };

  const handleCreateEvent = (event: VenueEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleUpdateEvent = (id: string, updates: Partial<VenueEvent>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updates } : event)));
  };

  const handleCancelEvent = (id: string) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, status: "cancelled" } : event)));
  };

  const handlePublishEvent = (id: string) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, status: "published" } : event)));
  };

  const handleUpdateVenue = (
    id: string,
    updates: Partial<Omit<Venue, "id" | "revenue" | "load" | "change" | "loadChange" | "status">>,
  ) => {
    setVenues((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const toggleBlockedSlot = (key: string) => {
    setBlockedSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 overflow-y-auto no-scrollbar"
        >
          {view === "create-venue" ? (
            <CreateVenueForm onBack={() => setView("main")} />
          ) : view === "edit-venue" ? (
            <EditVenueForm
              venue={selectedVenue}
              onBack={() => setView("venue-detail")}
              onSave={(updates) => {
                handleUpdateVenue(selectedVenue.id, updates);
                setView("venue-detail");
              }}
            />
          ) : view === "bank-details" ? (
            <BankDetailsView onBack={() => setView("main")} />
          ) : view === "analytics" ? (
            <AnalyticsView
              venue={selectedVenue}
              onBack={() => setView("main")}
              onViewSummary={() => setView("analytics-summary")}
            />
          ) : view === "analytics-summary" ? (
            <AnalyticsSummaryView
              venue={selectedVenue}
              onBack={() => setView("analytics")}
            />
          ) : view === "venue-detail" ? (
            <VenueDetailView
              venue={selectedVenue}
              onBack={() => setView("main")}
              onEdit={() => setView("edit-venue")}
              onDelete={() => handleDeleteVenue(selectedVenue.id)}
            />
          ) : view === "bookings" ? (
            <BookingsView
              venue={selectedVenue}
              bookings={bookings}
              setBookings={setBookings}
              onBack={() => setView("main")}
            />
          ) : view === "inventory" ? (
            <InventoryView
              venue={selectedVenue}
              items={items}
              onBack={() => setView("main")}
              onAdd={() => setView("inventory-add")}
              onEdit={(id) => {
                setEditingItemId(id);
                setView("inventory-edit");
              }}
              onDelete={(id) =>
                setItems((prev) => prev.filter((i) => i.id !== id))
              }
            />
          ) : view === "inventory-add" ? (
            <InventoryFormView
              venue={selectedVenue}
              onBack={() => setView("inventory")}
              onSave={(item) => {
                setItems((prev) => [
                  ...prev,
                  { ...item, id: Date.now().toString() },
                ]);
                setView("inventory");
              }}
            />
          ) : view === "inventory-edit" ? (
            <InventoryFormView
              venue={selectedVenue}
              onBack={() => setView("inventory")}
              existingItem={items.find((i) => i.id === editingItemId)}
              onSave={(item) => {
                setItems((prev) =>
                  prev.map((i) =>
                    i.id === editingItemId
                      ? { ...item, id: editingItemId! }
                      : i,
                  ),
                );
                setView("inventory");
              }}
            />
          ) : view === "scheduling" ? (
            <SchedulingView
              venue={selectedVenue}
              blockedSlots={blockedSlots}
              onToggleSlot={toggleBlockedSlot}
              onBack={() => setView("main")}
              onBlockSchedule={() => setView("scheduling-block")}
            />
          ) : view === "events" ? (
            <EventsView
              venue={selectedVenue}
              events={events.filter((event) => event.venueId === selectedVenue.id)}
              onBack={() => setView("main")}
              onCreate={() => {
                setSelectedEventId(null);
                setView("event-form");
              }}
              onViewEvent={(id) => {
                setSelectedEventId(id);
                setView("event-detail");
              }}
              onEditEvent={(id) => {
                setSelectedEventId(id);
                setView("event-form");
              }}
              onPublishEvent={handlePublishEvent}
              onCancelEvent={handleCancelEvent}
            />
          ) : view === "event-detail" ? (
            <EventDetailView
              event={events.find((event) => event.id === selectedEventId)!}
              onBack={() => setView("events")}
              onEdit={() => setView("event-form")}
              onPublish={() => {
                if (selectedEventId) handlePublishEvent(selectedEventId);
              }}
              onCancel={() => {
                if (selectedEventId) handleCancelEvent(selectedEventId);
              }}
            />
          ) : view === "event-form" ? (
            <EventFormView
              venue={selectedVenue}
              event={events.find((event) => event.id === selectedEventId) ?? null}
              onBack={() => setView(selectedEventId ? "event-detail" : "events")}
              onSave={(event) => {
                if (selectedEventId) {
                  handleUpdateEvent(selectedEventId, event);
                  setView("event-detail");
                } else {
                  handleCreateEvent({ ...event, id: Date.now().toString() });
                  setView("events");
                }
              }}
            />
          ) : (
            <MainDashboard
              venues={venues}
              selectedVenueId={selectedVenueId}
              onSelectVenue={setSelectedVenueId}
              onCreateVenue={() => setView("create-venue")}
              onBankDetails={() => setView("bank-details")}
              onAnalytics={() => setView("analytics")}
              onVenueDetail={() => setView("venue-detail")}
              onBookings={() => setView("bookings")}
              onInventory={() => setView("inventory")}
              onEvents={() => setView("events")}
              onScheduling={() => setView("scheduling")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── MAIN DASHBOARD ────────────────────────────────────────────────────── */

function MainDashboard({
  venues,
  selectedVenueId,
  onSelectVenue,
  onCreateVenue,
  onBankDetails,
  onAnalytics,
  onVenueDetail,
  onBookings,
  onInventory,
  onEvents,
  onScheduling,
}: {
  venues: Venue[];
  selectedVenueId: string;
  onSelectVenue: (id: string) => void;
  onCreateVenue: () => void;
  onBankDetails: () => void;
  onAnalytics: () => void;
  onVenueDetail: () => void;
  onBookings: () => void;
  onInventory: () => void;
  onEvents: () => void;
  onScheduling: () => void;
}) {
  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);

  const handleVenueTap = (venueId: string) => {
    const now = Date.now();
    const last = lastTapRef.current;
    if (last && last.id === venueId && now - last.time < 350) {
      lastTapRef.current = null;
      onSelectVenue(venueId);
      onVenueDetail();
    } else {
      lastTapRef.current = { id: venueId, time: now };
      onSelectVenue(venueId);
    }
  };

  return (
    <div className="pb-10 px-6 pt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
            Manager
          </p>
          <h1 className="text-4xl font-black italic leading-none">Apex Hub</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full accent-bg animate-pulse" />
          <span className="text-[10px] font-black uppercase accent-text">
            Live Studio
          </span>
        </div>
      </div>

      {/* Venue Switcher */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 ml-1">
          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
            My Venues
          </p>
          <p className="text-[8px] text-zinc-300 font-bold italic">Double-tap to open</p>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
          {venues.map((venue) => {
            const isSelected = selectedVenueId === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => handleVenueTap(venue.id)}
                className={`shrink-0 px-4 py-3 rounded-2xl border-2 transition-all flex items-center gap-2 active:scale-95 ${isSelected ? "bg-black text-brand-neon border-black shadow-lg" : "bg-white text-zinc-400 border-black/5"}`}
              >
                <Building2 size={14} />
                <div className="text-left">
                  <p className="text-[9px] font-black uppercase tracking-tight leading-none">
                    {venue.name}
                  </p>
                  <p className="text-[7px] font-bold uppercase tracking-widest opacity-60">
                    {venue.sport}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-neon ml-1 animate-pulse" />
                )}
              </button>
            );
          })}
          <button
            onClick={onCreateVenue}
            className="shrink-0 px-4 py-3 rounded-2xl border-2 border-dashed border-zinc-200 text-zinc-300 hover:border-brand-neon hover:text-black transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Add
            </span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          label="Revenue"
          value={selectedVenue.revenue}
          change={selectedVenue.change}
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label="Load"
          value={selectedVenue.load}
          change={selectedVenue.loadChange}
          icon={<TrendingUp size={16} />}
        />
      </div>

      <div className="space-y-6">
        {/* Operator Hub */}
        <div>
          <SectionHeader title="Operator Hub" />
          <div className="sport-card p-4 flex gap-4 items-center">
            <div
              className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer"
              onClick={onVenueDetail}
            >
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=200"
                alt="Venue"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <Camera
                size={20}
                className="relative z-10 text-white group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-tight">
                {selectedVenue.name}
              </h4>
              <p className="text-[10px] text-zinc-500 italic mb-1 uppercase font-bold tracking-widest">
                {selectedVenue.courts}{" "}
                {selectedVenue.type === "court" ? "Courts" : "Studios"} •{" "}
                {selectedVenue.location}
              </p>
              <button
                onClick={onVenueDetail}
                className="text-[10px] accent-text font-black underline"
              >
                VIEW VENUE
              </button>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div>
          <SectionHeader title="Analytics" />
          <button
            onClick={onAnalytics}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <BarChart3 size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                View Analytics
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Revenue, bookings, and performance charts
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* Bookings */}
        <div>
          <SectionHeader title="Bookings" />
          <button
            onClick={onBookings}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                View Bookings
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Confirm, arrival, and checkout management
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* Inventory */}
        <div>
          <SectionHeader title="Inventory" />
          <button
            onClick={onInventory}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                Manage Items
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Add, edit, delete, and view rental items
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* Scheduling */}
        <div>
          <SectionHeader title="Scheduling" />
          <button
            onClick={onScheduling}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                View Schedule
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Weekly schedule and block time slots
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* Events */}
        <div>
          <SectionHeader title="Events" />
          <button
            onClick={onEvents}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <Users size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                Manage Events
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Create, publish, and track participants.
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* Payouts */}
        <div>
          <SectionHeader title="Payouts" />
          <button
            onClick={onBankDetails}
            className="sport-card p-4 flex items-center gap-4 w-full text-left active:bg-zinc-50 transition-colors group"
          >
            <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 group-hover:text-black group-hover:border-black/10 transition-colors shrink-0">
              <Wallet size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-tight">
                Bank Details
              </h4>
              <p className="text-[10px] text-zinc-500 italic">
                Manage payout account and billing info
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>

        {/* ── REMOVED: Court queues & Promo Ads action rows ── */}
      </div>
    </div>
  );
}

/* ── ANALYTICS VIEW ─────────────────────────────────────────────────────── */

function AnalyticsView({
  venue,
  onBack,
  onViewSummary,
}: {
  venue: (typeof VENUES)[0];
  onBack: () => void;
  onViewSummary: () => void;
}) {
  const weeklyData = [40, 70, 45, 90, 65, 80, 55];
  const revenueData = [3200, 5800, 4100, 8900, 6200, 7500, 4800];

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Analytics
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard
          label="Revenue"
          value={venue.revenue}
          change={venue.change}
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label="Load"
          value={venue.load}
          change={venue.loadChange}
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Bookings"
          value="48"
          change="+6%"
          icon={<Calendar size={16} />}
        />
        <StatCard
          label="Avg Rating"
          value="4.8"
          change="+0.2"
          icon={<Star size={16} />}
        />
      </div>

      {/* Weekly Bookings Bar Chart — FIXED: inline style instead of motion */}
      <div className="sport-card p-5 mb-6">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
          Weekly Bookings
        </p>
        <div
          className="flex justify-between items-end gap-2 mb-4"
          style={{ height: "128px" }}
        >
          {weeklyData.map((h, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
            >
              <div
                className={`w-full rounded-t-sm ${i === 3 ? "accent-bg" : "bg-zinc-200"}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-[8px] text-zinc-500 font-bold uppercase">
                {DAYS[i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-zinc-500">
          <span>Peak: Thursday</span>
          <span className="accent-text font-black">Trend: UP</span>
        </div>
      </div>

      {/* Weekly Revenue Bar Chart — FIXED: inline style instead of motion */}
      <div className="sport-card p-5 mb-6">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
          Weekly Revenue
        </p>
        <div
          className="flex justify-between items-end gap-2 mb-4"
          style={{ height: "128px" }}
        >
          {revenueData.map((h, i) => {
            const maxVal = Math.max(...revenueData);
            const pct = (h / maxVal) * 100;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <div
                  className={`w-full rounded-t-sm ${i === 3 ? "bg-black" : "bg-zinc-300"}`}
                  style={{ height: `${pct}%` }}
                />
                <span className="text-[8px] text-zinc-500 font-bold uppercase">
                  {DAYS[i]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-zinc-500">
          <span>Peak: ₱8,900</span>
          <span className="accent-text font-black">Total: ₱40,300</span>
        </div>
      </div>

      <button
        onClick={onViewSummary}
        className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2"
      >
        <Eye size={18} /> View Summary
      </button>
    </div>
  );
}

/* ── ANALYTICS SUMMARY ──────────────────────────────────────────────────── */

function AnalyticsSummaryView({
  venue,
  onBack,
}: {
  venue: (typeof VENUES)[0];
  onBack: () => void;
}) {
  const summaryItems = [
    {
      label: "Total Revenue (This Month)",
      value: venue.revenue,
      icon: <DollarSign size={16} />,
    },
    { label: "Total Bookings", value: "192", icon: <Calendar size={16} /> },
    {
      label: "Average Load",
      value: venue.load,
      icon: <TrendingUp size={16} />,
    },
    { label: "Customer Rating", value: "4.8 / 5.0", icon: <Star size={16} /> },
    { label: "Repeat Customers", value: "67%", icon: <Users size={16} /> },
    { label: "Peak Hour", value: "6:00 PM", icon: <Clock size={16} /> },
    {
      label: "Most Popular Sport",
      value: venue.sport,
      icon: <BarChart3 size={16} />,
    },
    {
      label: "Active Courts",
      value: venue.courts.toString(),
      icon: <Building2 size={16} />,
    },
  ];

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Summary
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {summaryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="sport-card p-4 flex items-center gap-4"
          >
            <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg text-black shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-lg font-black italic leading-none mt-1">
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── VENUE DETAIL ───────────────────────────────────────────────────────── */

function VenueDetailView({
  venue,
  onBack,
  onEdit,
  onDelete,
}: {
  venue: Venue;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Venue Details
          </h1>
        </div>
        <button
          onClick={onEdit}
          className="p-2 bg-zinc-100 rounded-full text-zinc-400 hover:text-black transition-colors"
        >
          <Edit size={18} />
        </button>
      </div>
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="text-[10px] font-black uppercase text-brand-neon mb-1 tracking-widest">
            {venue.sport}
          </p>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
            {venue.name}
          </h2>
        </div>
      </div>
      <div className="space-y-4">
        <div className="sport-card p-4 flex items-center gap-4">
          <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
            <MapPin size={16} className="text-brand-neon" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
              Location
            </p>
            <p className="text-xs font-black uppercase text-black">
              {venue.location}
            </p>
          </div>
        </div>
        <div className="sport-card p-4 flex items-center gap-4">
          <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
            <Building2 size={16} className="text-brand-neon" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
              Type
            </p>
            <p className="text-xs font-black uppercase text-black">
              {venue.type} • {venue.courts}{" "}
              {venue.type === "court" ? "Courts" : "Studios"}
            </p>
          </div>
        </div>
        <div className="sport-card p-4 flex items-center gap-4">
          <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
            <DollarSign size={16} className="text-brand-neon" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
              Revenue
            </p>
            <p className="text-xs font-black uppercase text-black">
              {venue.revenue}{" "}
              <span className="text-green-600 text-[10px]">{venue.change}</span>
            </p>
          </div>
        </div>
        <div className="sport-card p-4 flex items-center gap-4">
          <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
            <TrendingUp size={16} className="text-brand-neon" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
              Load
            </p>
            <p className="text-xs font-black uppercase text-black">
              {venue.load}{" "}
              <span
                className={`${venue.loadChange.startsWith("+") ? "text-green-600" : "text-red-500"} text-[10px]`}
              >
                {venue.loadChange}
              </span>
            </p>
          </div>
        </div>
        <div className="sport-card p-4 flex items-center gap-4">
          <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
            <Star size={16} className="text-brand-neon" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">
              Rating
            </p>
            <p className="text-xs font-black uppercase text-black">4.8 / 5.0</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 py-4 accent-bg rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-brand-neon/20"
        >
          <Edit size={16} /> Edit Details
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="py-4 px-5 bg-red-50 border border-red-100 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Delete Confirmation Bottom Sheet */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-[2.5rem] p-8 pb-12"
            >
              <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-8" />
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded-2xl">
                  <Trash2 size={22} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter leading-none">
                    Delete Venue?
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
                    {venue.name}
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 italic mb-8 leading-relaxed">
                This will permanently remove this venue and all its data. This
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-4 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete();
                  }}
                  className="flex-[2] py-4 bg-red-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete Venue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── BOOKINGS VIEW ──────────────────────────────────────────────────────── */

function BookingsView({
  venue,
  bookings,
  setBookings,
  onBack,
}: {
  venue: (typeof VENUES)[0];
  bookings: typeof INITIAL_BOOKINGS;
  setBookings: React.Dispatch<React.SetStateAction<typeof INITIAL_BOOKINGS>>;
  onBack: () => void;
}) {
  const [filter, setFilter] = useState<
    "all" | "confirmed" | "arrived" | "checked-out"
  >("all");

  const updateStatus = (
    id: string,
    newStatus: "confirmed" | "arrived" | "checked-out",
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusConfig: Record<
    string,
    {
      label: string;
      color: string;
      nextAction?: {
        label: string;
        status: "confirmed" | "arrived" | "checked-out";
        icon: React.ReactNode;
      };
    }
  > = {
    confirmed: {
      label: "Confirmed",
      color: "bg-blue-100 text-blue-600",
      nextAction: {
        label: "Confirm Arrival",
        status: "arrived",
        icon: <LogIn size={12} />,
      },
    },
    arrived: {
      label: "Arrived",
      color: "bg-brand-neon text-black",
      nextAction: {
        label: "Checkout",
        status: "checked-out",
        icon: <LogOut size={12} />,
      },
    },
    "checked-out": { label: "Checked Out", color: "bg-zinc-100 text-zinc-500" },
  };

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Bookings
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>
      <div className="flex bg-zinc-100 p-1 rounded-xl mb-6">
        {(["all", "confirmed", "arrived", "checked-out"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-white text-black shadow-sm" : "text-zinc-500"}`}
          >
            {f === "checked-out" ? "Done" : f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((booking) => {
          const config = statusConfig[booking.status];
          return (
            <div key={booking.id} className="sport-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-[10px] uppercase shrink-0">
                    {booking.guest[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase italic text-black leading-none mb-1">
                      {booking.guest}
                    </h4>
                    <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                      {booking.sport} • {booking.court}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${config.color}`}
                >
                  {config.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-500 font-bold mb-3">
                <span>
                  {booking.date} • {booking.time}
                </span>
                <span className="font-black text-black">{booking.amount}</span>
              </div>
              {config.nextAction && (
                <button
                  onClick={() =>
                    updateStatus(booking.id, config.nextAction!.status)
                  }
                  className="w-full py-3 accent-bg rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm"
                >
                  {config.nextAction.icon} {config.nextAction.label}
                </button>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Calendar size={32} className="mx-auto text-zinc-200 mb-4" />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
              No bookings found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── EVENTS VIEW ───────────────────────────────────────────────────────── */

function EventsView({
  venue,
  events,
  onBack,
  onCreate,
  onViewEvent,
  onEditEvent,
  onPublishEvent,
  onCancelEvent,
}: {
  venue: (typeof VENUES)[0];
  events: VenueEvent[];
  onBack: () => void;
  onCreate: () => void;
  onViewEvent: (id: string) => void;
  onEditEvent: (id: string) => void;
  onPublishEvent: (id: string) => void;
  onCancelEvent: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | EventStatus>("all");

  const filtered =
    filter === "all" ? events : events.filter((event) => event.status === filter);

  const statusMeta: Record<EventStatus, { label: string; color: string }> = {
    draft: { label: "Draft", color: "bg-zinc-100 text-zinc-500" },
    published: { label: "Published", color: "bg-brand-neon text-black" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600" },
  };

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Events
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>

      <div className="sport-card p-4 mb-6 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
            Manage events for your venue
          </p>
          <h2 className="text-xl font-black uppercase tracking-tight">
            Scheduled events
          </h2>
        </div>
        <button
          onClick={onCreate}
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-2xl bg-brand-neon px-3 py-2 text-[9px] font-black uppercase tracking-widest text-black shadow-sm shadow-brand-neon/20"
        >
          <Plus size={12} /> Create Event
        </button>
      </div>

      <div className="flex bg-zinc-100 p-1 rounded-xl mb-6">
        {(["all", "draft", "published", "cancelled"] as const).map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex-1 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === value ? "bg-white text-black shadow-sm" : "text-zinc-500"}`}
          >
            {value === "all" ? "All" : value}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((event) => {
          const status = statusMeta[event.status];
          return (
            <div key={event.id} className="sport-card p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h4 className="text-xs font-black uppercase italic text-black leading-none mb-1">
                    {event.title}
                  </h4>
                  <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                    {event.sport} • {event.date} • {event.time}
                  </p>
                </div>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-4">
                <span>{event.slot}</span>
                <span>
                  {event.participants.length}/{event.capacity} registered
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onViewEvent(event.id)}
                  className="py-3 px-4 rounded-2xl bg-zinc-100 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:bg-zinc-200 transition-all"
                >
                  View
                </button>
                <button
                  onClick={() => onEditEvent(event.id)}
                  className="py-3 px-4 rounded-2xl bg-white border border-black/5 text-[9px] font-black uppercase tracking-widest text-black hover:bg-zinc-50 transition-all"
                >
                  Edit
                </button>
                {event.status === "draft" && (
                  <button
                    onClick={() => onPublishEvent(event.id)}
                    className="py-3 px-4 rounded-2xl accent-bg text-[9px] font-black uppercase tracking-widest shadow-sm"
                  >
                    Publish
                  </button>
                )}
                {event.status !== "cancelled" && (
                  <button
                    onClick={() => onCancelEvent(event.id)}
                    className="py-3 px-4 rounded-2xl bg-red-50 border border-red-100 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Calendar size={32} className="mx-auto text-zinc-200 mb-4" />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
              No events found for this venue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventDetailView({
  event,
  onBack,
  onEdit,
  onPublish,
  onCancel,
}: {
  event: VenueEvent;
  onBack: () => void;
  onEdit: () => void;
  onPublish: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Event Details
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {event.venueId} • {event.date}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="sport-card p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                {event.sport}
              </p>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
                {event.title}
              </h2>
            </div>
            <span className={`text-[10px] font-black uppercase px-3 py-2 rounded-full ${event.status === "published" ? "accent-bg text-black" : event.status === "draft" ? "bg-zinc-100 text-zinc-500" : "bg-red-100 text-red-600"}`}>
              {event.status}
            </span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed mb-4">
            {event.description}
          </p>
          <div className="grid grid-cols-2 gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500">
            <div className="space-y-1 bg-zinc-50 p-3 rounded-2xl">
              <p className="text-[8px] text-zinc-400">Slot</p>
              <p className="text-black">{event.slot}</p>
            </div>
            <div className="space-y-1 bg-zinc-50 p-3 rounded-2xl">
              <p className="text-[8px] text-zinc-400">Capacity</p>
              <p className="text-black">{event.capacity}</p>
            </div>
            <div className="space-y-1 bg-zinc-50 p-3 rounded-2xl">
              <p className="text-[8px] text-zinc-400">Registered</p>
              <p className="text-black">{event.participants.length}</p>
            </div>
            <div className="space-y-1 bg-zinc-50 p-3 rounded-2xl">
              <p className="text-[8px] text-zinc-400">Location</p>
              <p className="text-black">{event.location}</p>
            </div>
          </div>
        </div>

        <div className="sport-card p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
            Registered Participants ({event.participants.length}/{event.capacity})
          </p>
          <div className="space-y-2">
            {event.participants.length > 0 ? (
              event.participants.map((participant) => (
                <div key={participant} className="flex items-center justify-between gap-3 p-3 bg-zinc-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-black uppercase text-black">
                      {participant[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tight">
                        {participant}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                    Confirmed
                  </span>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <Users size={32} className="mx-auto text-zinc-200 mb-4" />
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                  No participants registered yet.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onEdit}
            className="w-full py-3 rounded-2xl bg-zinc-100 text-[9px] font-black uppercase tracking-widest text-black hover:bg-zinc-200 transition-all inline-flex items-center justify-center gap-1"
          >
            <Edit size={12} /> Edit Event
          </button>
          {event.status === "draft" ? (
            <button
              onClick={onPublish}
              className="w-full py-3 rounded-2xl accent-bg text-[9px] font-black uppercase tracking-widest shadow-sm shadow-brand-neon/20 inline-flex items-center justify-center gap-1"
            >
              <Check size={12} /> Publish Event
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="w-full py-3 rounded-2xl bg-red-50 border border-red-100 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all inline-flex items-center justify-center gap-1"
            >
              <Ban size={12} /> Cancel Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EventFormView({
  venue,
  event,
  onBack,
  onSave,
}: {
  venue: (typeof VENUES)[0];
  event: VenueEvent | null;
  onBack: () => void;
  onSave: (event: Omit<VenueEvent, "id">) => void;
}) {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [slot, setSlot] = useState(event?.slot || `MON ${SCHEDULE_SLOTS[0]}`);
  const [capacity, setCapacity] = useState(event?.capacity.toString() || "8");
  const [status, setStatus] = useState<EventStatus>(event?.status || "draft");

  const slotOptions = DAYS.flatMap((day) =>
    SCHEDULE_SLOTS.map((slotTime) => `${day} ${slotTime}`),
  );

  const canSave = title.trim() && date.trim() && time.trim() && capacity.trim();

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            {event ? "Edit Event" : "Create Event"}
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Pickleball Ladder Open"
            className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Add a short summary for the event"
            className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. May 25"
              className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 6:00 PM"
              className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
            Booking Slot
          </label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40"
          >
            {slotOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
            Capacity
          </label>
          <input
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="10"
            className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStatus(status === "published" ? "draft" : "published")}
            className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${status === "published" ? "bg-black text-brand-neon" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}
          >
            {status === "published" ? "Published" : "Save as Draft"}
          </button>
          <div className="rounded-2xl bg-zinc-50 p-4">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
              Venue
            </p>
            <p className="text-xs font-black uppercase text-black">{venue.name}</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (!canSave) return;
            onSave({
              venueId: venue.id,
              title: title.trim(),
              sport: venue.sport,
              location: venue.location,
              date: date.trim(),
              time: time.trim(),
              slot,
              capacity: parseInt(capacity, 10) || 1,
              participants: event?.participants ?? [],
              status,
              description: description.trim(),
            });
          }}
          disabled={!canSave}
          className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canSave ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
        >
          <Save size={18} /> {event ? "Save Changes" : "Create Event"}
        </button>
      </div>
    </div>
  );
}

/* ── INVENTORY VIEW ─────────────────────────────────────────────────────── */

function InventoryView({
  venue,
  items,
  onBack,
  onAdd,
  onEdit,
  onDelete,
}: {
  venue: (typeof VENUES)[0];
  items: typeof INITIAL_ITEMS;
  onBack: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Inventory
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name} • {items.length} items
          </p>
        </div>
        <button
          onClick={onAdd}
          className="accent-bg p-2 rounded-xl shadow-lg shadow-brand-neon/20"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="relative mb-6">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          size={14}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full bg-zinc-50 border border-black/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-black text-black focus:outline-none focus:ring-1 focus:ring-black/10 placeholder:text-zinc-300"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="sport-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg shrink-0">
                <Package size={16} className="text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black uppercase italic tracking-tight text-black leading-none mb-1 truncate">
                  {item.name}
                </h4>
                <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                  {item.category} • {item.condition}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] font-black mb-3">
              <span className="text-zinc-500">
                Qty: <span className="text-black">{item.quantity}</span>
              </span>
              <span className="text-zinc-500">₱{item.pricePerUse}/use</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item.id)}
                className="flex-1 py-2 bg-zinc-50 border border-black/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-zinc-500 hover:text-black hover:border-black/10 transition-all flex items-center justify-center gap-1"
              >
                <Edit size={10} /> Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="py-2 px-3 bg-red-50 border border-red-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 transition-all flex items-center justify-center gap-1"
              >
                <Trash2 size={10} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package size={32} className="mx-auto text-zinc-200 mb-4" />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
              No items found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── INVENTORY FORM ─────────────────────────────────────────────────────── */

function InventoryFormView({
  venue,
  onBack,
  existingItem,
  onSave,
}: {
  venue: (typeof VENUES)[0];
  onBack: () => void;
  existingItem?: (typeof INITIAL_ITEMS)[0];
  onSave: (item: Omit<(typeof INITIAL_ITEMS)[0], "id">) => void;
}) {
  const [name, setName] = useState(existingItem?.name || "");
  const [category, setCategory] = useState(existingItem?.category || "");
  const [quantity, setQuantity] = useState(
    existingItem?.quantity.toString() || "",
  );
  const [pricePerUse, setPricePerUse] = useState(
    existingItem?.pricePerUse.toString() || "",
  );
  const [condition, setCondition] = useState(existingItem?.condition || "New");

  const conditions = ["New", "Good", "Fair", "Needs Repair"];
  const categories = [
    "Racket",
    "Balls",
    "Equipment",
    "Accessory",
    "Apparel",
    "Other",
  ];
  const canSave = name.trim() && category && quantity && pricePerUse;

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
          {existingItem ? "Edit Item" : "Add Item"}
        </h1>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Pro Racket (Yonex)"
            className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-tight border transition-all ${category === c ? "accent-bg border-brand-neon" : "bg-white text-zinc-400 border-black/5"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
              Price / Use (₱)
            </label>
            <input
              type="number"
              value={pricePerUse}
              onChange={(e) => setPricePerUse(e.target.value)}
              placeholder="150"
              className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
            Condition
          </label>
          <div className="flex gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${condition === c ? "bg-black text-brand-neon border-black" : "bg-white text-zinc-400 border-black/5"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() =>
            canSave &&
            onSave({
              name,
              category,
              quantity: parseInt(quantity) || 0,
              pricePerUse: parseInt(pricePerUse) || 0,
              condition,
            })
          }
          disabled={!canSave}
          className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canSave ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
        >
          <Save size={18} /> {existingItem ? "Save Changes" : "Add Item"}
        </button>
      </div>
    </div>
  );
}

/* ── SCHEDULING VIEW ────────────────────────────────────────────────────── */

function SchedulingView({
  venue,
  blockedSlots,
  onToggleSlot,
  onBack,
  onBlockSchedule,
}: {
  venue: (typeof VENUES)[0];
  blockedSlots: Record<string, boolean>;
  onToggleSlot: (key: string) => void;
  onBack: () => void;
  onBlockSchedule: () => void;
}) {
  const today = new Date().getDay();
  const startDay = today === 0 ? 6 : today - 1;

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Schedule
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name} • This Week
          </p>
        </div>
        <button
          onClick={onBlockSchedule}
          className="accent-bg px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-brand-neon/20"
        >
          <Ban size={12} /> Block
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="min-w-[600px]">
          <div className="flex gap-0 mb-2">
            <div className="w-16 shrink-0" />
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`flex-1 text-center text-[8px] font-black uppercase tracking-widest py-2 ${i === startDay ? "text-brand-neon" : "text-zinc-400"}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-0.5">
            {SCHEDULE_SLOTS.map((slot) => (
              <div key={slot} className="flex gap-0">
                <div className="w-16 shrink-0 text-[7px] font-black text-zinc-400 uppercase tracking-wider py-1.5 pr-2 text-right">
                  {slot}
                </div>
                {DAYS.map((day, di) => {
                  const key = `${day}-${slot}`;
                  const isBlocked = blockedSlots[key];
                  const isToday = di === startDay;
                  return (
                    <div
                      key={key}
                      className={`flex-1 h-6 border border-black/[0.03] mx-0.5 rounded-sm ${isBlocked ? "bg-red-100 border-red-200" : isToday ? "bg-brand-neon/5 border-brand-neon/10" : "bg-zinc-50"}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-zinc-50 border border-black/5" />
          <span className="text-[8px] font-black text-zinc-400 uppercase">
            Available
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-100 border border-red-200" />
          <span className="text-[8px] font-black text-zinc-400 uppercase">
            Blocked
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-brand-neon/5 border border-brand-neon/10" />
          <span className="text-[8px] font-black text-zinc-400 uppercase">
            Today
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── BLOCK SCHEDULE VIEW ────────────────────────────────────────────────── */

function BlockScheduleView({
  venue,
  blockedSlots,
  onToggleSlot,
  onBack,
}: {
  venue: (typeof VENUES)[0];
  blockedSlots: Record<string, boolean>;
  onToggleSlot: (key: string) => void;
  onBack: () => void;
}) {
  const today = new Date().getDay();
  const startDay = today === 0 ? 6 : today - 1;
  const blockedCount = Object.values(blockedSlots).filter(Boolean).length;

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Block Schedule
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name} • Tap to toggle
          </p>
        </div>
      </div>
      <div className="sport-card p-4 bg-zinc-50 border-black/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg shrink-0">
            <AlertCircle size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-black leading-none mb-1">
              Block Time Slots
            </p>
            <p className="text-[9px] text-zinc-500 italic">
              Tap any cell to block/unblock. {blockedCount} slot(s) blocked.
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="min-w-[600px]">
          <div className="flex gap-0 mb-2">
            <div className="w-16 shrink-0" />
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`flex-1 text-center text-[8px] font-black uppercase tracking-widest py-2 ${i === startDay ? "text-brand-neon" : "text-zinc-400"}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-0.5">
            {SCHEDULE_SLOTS.map((slot) => (
              <div key={slot} className="flex gap-0">
                <div className="w-16 shrink-0 text-[7px] font-black text-zinc-400 uppercase tracking-wider py-1.5 pr-2 text-right">
                  {slot}
                </div>
                {DAYS.map((day, di) => {
                  const key = `${day}-${slot}`;
                  const isBlocked = blockedSlots[key];
                  const isToday = di === startDay;
                  return (
                    <button
                      key={key}
                      onClick={() => onToggleSlot(key)}
                      className={`flex-1 h-7 border mx-0.5 rounded-sm transition-all active:scale-95 ${isBlocked ? "bg-red-500 border-red-600" : isToday ? "bg-brand-neon/10 border-brand-neon/20 hover:bg-brand-neon/20" : "bg-zinc-50 border-black/[0.03] hover:bg-zinc-100"}`}
                    >
                      {isBlocked && (
                        <X size={8} className="mx-auto text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={onBack}
        className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2 mt-6"
      >
        <Check size={18} /> Save Blocked Slots
      </button>
    </div>
  );
}

/* ── EDIT VENUE FORM ────────────────────────────────────────────────────── */

function EditVenueForm({
  venue,
  onBack,
  onSave,
}: {
  venue: Venue;
  onBack: () => void;
  onSave: (updates: Partial<Omit<Venue, "id" | "revenue" | "load" | "change" | "loadChange" | "status">>) => void;
}) {
  const [name, setName] = useState(venue.name);
  const [sport, setSport] = useState(venue.sport);
  const [type, setType] = useState<"court" | "studio">(venue.type);
  const [location, setLocation] = useState(venue.location);
  const [courtCount, setCourtCount] = useState(venue.courts);
  const [saved, setSaved] = useState(false);

  const canSave = name.trim() && location.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({ name, sport, type, location, courts: courtCount });
    setSaved(true);
    setTimeout(() => onBack(), 900);
  };

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Edit Venue
          </h1>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            {venue.name}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {saved ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-16"
          >
            <div className="w-20 h-20 accent-bg rounded-full flex items-center justify-center mb-6">
              <Check size={36} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2">
              Saved!
            </h3>
            <p className="text-zinc-500 text-sm italic font-medium">
              Venue details updated successfully.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Venue Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cebu Pickleball Hub"
                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                  Sport
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SPORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSport(s)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight border transition-all ${sport === s ? "accent-bg border-brand-neon" : "bg-white text-zinc-400 border-black/5"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                  Type
                </label>
                <div className="flex gap-2">
                  {TYPE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t as "court" | "studio")}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${type === t ? "bg-black text-brand-neon border-black" : "bg-white text-zinc-400 border-black/5"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Location
              </label>
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Cebu IT Park"
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl pl-10 pr-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                {type === "court" ? "Courts" : "Studios"}
              </label>
              <div className="flex items-center gap-3 bg-zinc-50 border border-black/5 rounded-xl px-4 py-2">
                <button
                  onClick={() => setCourtCount(Math.max(1, courtCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-black active:scale-95"
                >
                  <span className="text-sm font-black">-</span>
                </button>
                <span className="text-lg font-black italic flex-1 text-center">
                  {courtCount}
                </span>
                <button
                  onClick={() => setCourtCount(courtCount + 1)}
                  className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center active:scale-95"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="sport-card p-4 bg-zinc-50 border-black/5 shadow-none">
              <div className="flex items-start gap-3">
                <div className="p-2 accent-bg rounded-lg shrink-0">
                  <AlertCircle size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-black leading-none mb-1">
                    Note
                  </p>
                  <p className="text-[9px] text-zinc-500 italic leading-relaxed">
                    Revenue, load, and rating data are managed by the system and
                    are not editable here.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canSave ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
            >
              <Save size={18} /> Save Changes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── CREATE VENUE FORM ──────────────────────────────────────────────────── */

function CreateVenueForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"details" | "documents" | "review">(
    "details",
  );
  const [name, setName] = useState("");
  const [sport, setSport] = useState("Badminton");
  const [type, setType] = useState<"court" | "studio">("court");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [courtCount, setCourtCount] = useState(1);
  const [venueImage, setVenueImage] = useState<string | null>(null);
  const [documents, setDocuments] = useState<
    { id: string; name: string; status: string }[]
  >([]);
  const [docType, setDocType] = useState("");

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  const addDocument = () => {
    if (!docType) return;
    setDocuments((prev) => [
      ...prev,
      { id: Date.now().toString(), name: docType, status: "Uploaded" },
    ]);
    setDocType("");
  };
  const removeDocument = (id: string) =>
    setDocuments((prev) => prev.filter((d) => d.id !== id));

  const canProceedDetails = name.trim() && location.trim() && price.trim();
  const canProceedDocuments = documents.length > 0;

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={
            step === "details"
              ? onBack
              : () => setStep(step === "review" ? "documents" : "details")
          }
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
          {step === "details" && "Create Venue"}
          {step === "documents" && "Legal Documents"}
          {step === "review" && "Review & Submit"}
        </h1>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {["details", "documents", "review"].map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`flex items-center gap-2 ${(step === "documents" && i === 0) || (step === "review" && i < 2) ? "opacity-100" : step === s ? "opacity-100" : "opacity-30"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black ${step === s ? "accent-bg" : (step === "documents" && i === 0) || (step === "review" && i < 2) ? "bg-black text-brand-neon" : "bg-zinc-100 text-zinc-400"}`}
              >
                {(step === "documents" && i === 0) ||
                (step === "review" && i < 2) ? (
                  <Check size={12} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest">
                {s}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`flex-1 h-px ${(step === "documents" && i === 0) || (step === "review" && i < 2) ? "bg-black" : "bg-zinc-200"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                Venue Photo
              </label>
              <div className="sport-card border-dashed border-zinc-300 bg-zinc-50/50 p-6">
                {venueImage ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={venueImage}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setVenueImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setVenueImage(
                        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
                      )
                    }
                    className="w-full flex flex-col items-center justify-center gap-3 py-8"
                  >
                    <div className="p-4 bg-white rounded-2xl border border-black/5">
                      <Camera size={24} className="text-zinc-300" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Upload Venue Photo
                    </p>
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Venue Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cebu Pickleball Hub"
                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                  Sport
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SPORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSport(s)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight border transition-all ${sport === s ? "accent-bg border-brand-neon" : "bg-white text-zinc-400 border-black/5"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                  Type
                </label>
                <div className="flex gap-2">
                  {TYPE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t as "court" | "studio")}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${type === t ? "bg-black text-brand-neon border-black" : "bg-white text-zinc-400 border-black/5"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Location
              </label>
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Cebu IT Park"
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl pl-10 pr-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                  Price (₱)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceLabel(
                      `₱${e.target.value}/${type === "studio" ? "class" : "hr"}`,
                    );
                  }}
                  placeholder="450"
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                  {type === "court" ? "Courts" : "Studios"}
                </label>
                <div className="flex items-center gap-3 bg-zinc-50 border border-black/5 rounded-xl px-4 py-2">
                  <button
                    onClick={() => setCourtCount(Math.max(1, courtCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-black active:scale-95"
                  >
                    <span className="text-sm font-black">-</span>
                  </button>
                  <span className="text-lg font-black italic flex-1 text-center">
                    {courtCount}
                  </span>
                  <button
                    onClick={() => setCourtCount(courtCount + 1)}
                    className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your venue..."
                className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 min-h-[100px] resize-none placeholder:text-zinc-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight border transition-all ${selectedTags.includes(tag) ? "accent-bg border-brand-neon" : "bg-white text-zinc-400 border-black/5"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep("documents")}
              disabled={!canProceedDetails}
              className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canProceedDetails ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
            >
              Continue to Documents <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === "documents" && (
          <motion.div
            key="documents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="sport-card p-4 bg-zinc-50 border-black/5">
              <div className="flex items-start gap-3">
                <div className="p-2 accent-bg rounded-lg shrink-0">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-black leading-none mb-1">
                    Legal Requirements
                  </p>
                  <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                    Upload required business documents for verification.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                Select Document Type
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {DOCUMENT_TYPES.map((dt) => (
                  <button
                    key={dt}
                    onClick={() => setDocType(dt)}
                    className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-tight border transition-all ${docType === dt ? "bg-black text-brand-neon border-black" : "bg-white text-zinc-400 border-black/5"}`}
                  >
                    {dt}
                  </button>
                ))}
              </div>
            </div>
            {docType && (
              <button
                onClick={addDocument}
                className="w-full sport-card p-4 border-dashed border-brand-neon bg-brand-neon/5 flex items-center justify-center gap-3 text-black hover:bg-brand-neon/10 transition-colors"
              >
                <div className="p-2 accent-bg rounded-lg">
                  <Upload size={16} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-tight">
                    Upload {docType}
                  </p>
                  <p className="text-[8px] text-zinc-500 italic">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </button>
            )}
            {documents.length > 0 && (
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block ml-1">
                  Uploaded ({documents.length})
                </label>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="sport-card p-4 flex items-center gap-3 bg-zinc-50 border-black/5"
                    >
                      <div className="p-2 bg-white rounded-lg border border-black/5 shrink-0">
                        <FileText size={18} className="text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black uppercase tracking-tight text-black leading-none mb-1 truncate">
                          {doc.name}
                        </p>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                          Pending Verification
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-600">
                          Pending
                        </span>
                        <button
                          onClick={() => removeDocument(doc.id)}
                          className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {documents.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mx-auto mb-4">
                  <Upload size={24} className="text-zinc-200" />
                </div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">
                  No Documents Uploaded
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 py-5 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep("review")}
                disabled={!canProceedDocuments}
                className={`flex-[2] py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canProceedDocuments ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
              >
                Review & Submit <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="sport-card p-6 bg-zinc-50 border-black/5 shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/5 rounded-full -mr-12 -mt-12" />
              <div className="relative">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                  Venue Summary
                </p>
                {venueImage && (
                  <div className="rounded-xl overflow-hidden aspect-video mb-4 border border-black/5">
                    <img
                      src={venueImage}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-black/5">
                    <div>
                      <h4 className="text-sm font-black uppercase italic tracking-tight text-black">
                        {name || "Untitled Venue"}
                      </h4>
                      <p className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase mt-1">
                        {sport} • {type} • {location || "No location"}
                      </p>
                    </div>
                    <span className="text-sm font-black italic text-black">
                      {priceLabel || `₱${price}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-black uppercase">
                    <span className="text-zinc-500">
                      {courtCount} {type === "court" ? "Court(s)" : "Studio(s)"}
                    </span>
                  </div>
                  {description && (
                    <div className="pt-2 border-t border-black/5">
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                        Description
                      </p>
                      <p className="text-[10px] text-zinc-600 italic leading-relaxed">
                        "{description}"
                      </p>
                    </div>
                  )}
                  {selectedTags.length > 0 && (
                    <div className="pt-2 border-t border-black/5">
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-black bg-white px-2 py-0.5 border border-black/5 rounded uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="sport-card p-6 bg-zinc-50 border-black/5 shadow-none">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                Documents ({documents.length})
              </p>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0"
                  >
                    <FileText size={14} className="text-zinc-400 shrink-0" />
                    <span className="text-[10px] font-black uppercase text-black">
                      {doc.name}
                    </span>
                    <span className="ml-auto text-[8px] font-black uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-600">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("documents")}
                className="flex-1 py-5 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400"
              >
                Back
              </button>
              <button
                onClick={() => setTimeout(onBack, 500)}
                className="flex-[2] accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2"
              >
                <Check size={18} /> Submit Venue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── BANK DETAILS VIEW ──────────────────────────────────────────────────── */

function BankDetailsView({ onBack }: { onBack: () => void }) {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountType, setAccountType] = useState<"savings" | "checking">(
    "savings",
  );
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!bankName || !accountName || !accountNumber) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
    }, 1200);
  };

  return (
    <div className="pb-10 px-6 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-100 rounded-full text-black shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
            Bank Details
          </h1>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
            Payout account for revenue
          </p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {saved ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
              <Check size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2 text-black">
              Saved!
            </h3>
            <p className="text-zinc-500 text-sm mb-8 italic font-medium">
              Your bank details have been updated.
            </p>
            <button
              onClick={onBack}
              className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20"
            >
              Back to Dashboard
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Bank Name
              </label>
              <div className="relative">
                <Building2
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
                />
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. BPI, BDO, Metrobank"
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl pl-10 pr-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Account Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Full name as shown on account"
                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Account Number
              </label>
              <div className="relative">
                <input
                  type={showAccountNumber ? "text" : "password"}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 pr-12 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
                />
                <button
                  onClick={() => setShowAccountNumber(!showAccountNumber)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">
                Account Type
              </label>
              <div className="flex gap-2">
                {(["savings", "checking"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setAccountType(t)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${accountType === t ? "bg-black text-brand-neon border-black" : "bg-white text-zinc-400 border-black/5"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block ml-1">
                Routing Number{" "}
                <span className="text-zinc-300 normal-case">(Optional)</span>
              </label>
              <input
                type="text"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                placeholder="Bank routing number"
                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3.5 text-xs font-black text-black focus:outline-none focus:ring-1 focus:ring-brand-neon/40 placeholder:text-zinc-300"
              />
            </div>
            <div className="sport-card p-4 bg-zinc-50 border-black/5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black rounded-lg shrink-0">
                  <CreditCard size={14} className="text-brand-neon" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-black leading-none mb-1">
                    Secure Storage
                  </p>
                  <p className="text-[9px] text-zinc-500 italic leading-relaxed">
                    Your banking details are encrypted and stored securely.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={!bankName || !accountName || !accountNumber || isSaving}
              className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${bankName && accountName && accountNumber ? "accent-bg shadow-xl shadow-brand-neon/20" : "bg-zinc-100 text-zinc-300"}`}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check size={18} /> Save Bank Details
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SHARED COMPONENTS ──────────────────────────────────────────────────── */

export function StatCard({
  label,
  value,
  change,
  icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="sport-card p-4">
      <div className="flex justify-between items-start mb-2">
        <div
          className={`p-2 rounded-lg bg-zinc-50 border border-black/5 ${color || "text-black"}`}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] font-black italic ${change.startsWith("+") ? "text-green-600" : "text-red-500"}`}
        >
          {change}
        </span>
      </div>
      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h3 className="text-2xl font-black italic leading-none">{value}</h3>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
        {title}
      </h3>
      <button className="text-[10px] text-zinc-400 hover:text-black transition-colors">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
