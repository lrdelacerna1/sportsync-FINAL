import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Star, 
  Clock, 
  TrendingUp,
  Bell as BellIcon,
  Check,
  CreditCard,
  ChevronLeft,
  X,
  Plus,
  Minus,
  Settings,
  Heart,
  MessageSquare,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import badmintonImg   from '../assets/images/badminton.jpg';
import badminton1Img  from '../assets/images/badminton1.jpg';
import badminton3Img  from '../assets/images/badminton3.jpg';
import pickle1Img     from '../assets/images/pickle1.jpg';
import pickle2Img     from '../assets/images/pickle2.jpg';
import pilates1Img    from '../assets/images/pilates1.jpg';
import pilates2Img    from '../assets/images/pilates2.jpg';
import tabletennis1Img from '../assets/images/tabletennis1.jpg';
import tennis1Img     from '../assets/images/tennis1.jpg';
import tennis2Img     from '../assets/images/tennis2.jpg';
import yoga1Img       from '../assets/images/yoga1.jpg';
import yoga2Img       from '../assets/images/yoga2.jpg';

const SPORTS = ['Badminton', 'Pickleball', 'Pilates', 'Table Tennis', 'Tennis', 'Yoga'];
const LOCATIONS = ['All Locations', 'Cebu IT Park', 'Cebu Business Park', 'Mactan', 'Banilad', 'Lahug'];
const PRICE_RANGES = [
  { label: 'All Price', min: 0, max: 2000 },
  { label: '< ₱400', min: 0, max: 400 },
  { label: '₱400 - ₱600', min: 400, max: 600 },
  { label: '> ₱600', min: 600, max: 2000 },
];
const RATINGS = ['Any Rating', '4.5+', '4.8+', '5.0'];

const VENUES = [
  {
    id: 1,
    name: "Cebu Pickleball Hub",
    location: "Cebu IT Park",
    rating: 4.8,
    price: 450,
    priceLabel: "₱450/class",
    sport: 'Pickleball',
    image: pickle1Img,           // ← your pickle1.jpg
    tags: ["Available Now", "Indoor"],
    availableNow: true,
    slots: 3,
    type: 'court'
  },
  {
    id: 2,
    name: "Sugbo Yoga Center",
    location: "Cebu Business Park",
    rating: 4.9,
    price: 600,
    priceLabel: "₱600/class",
    sport: 'Yoga',
    image: yoga1Img,             // ← your yoga1.jpg
    tags: ["Class", "Equipment Provided"],
    availableNow: false,
    slots: 12,
    type: 'studio'
  },
  {
    id: 3,
    name: "Mactan Smash Arena",
    location: "Mactan",
    rating: 4.7,
    price: 350,
    priceLabel: "₱350/hr",
    sport: 'Badminton',
    image: badmintonImg,         // ← your badminton.jpg
    tags: ["Court", "Racket Rental"],
    availableNow: true,
    slots: 2,
    type: 'court'
  },
  {
    id: 4,
    name: "Lahug Tennis Club",
    location: "Lahug",
    rating: 4.5,
    price: 800,
    priceLabel: "₱800/hr",
    sport: 'Tennis',
    image: tennis1Img,           // ← your tennis1.jpg
    tags: ["Outdoor", "Clay Court"],
    availableNow: true,
    slots: 1,
    type: 'court'
  },
  {
    id: 5,
    name: "Metro Cebu Pickleball",
    location: "Cebu IT Park",
    rating: 4.9,
    price: 550,
    priceLabel: "₱550/hr",
    sport: 'Pickleball',
    image: pickle2Img,           // ← your pickle2.jpg
    tags: ["Elite", "Pro Store"],
    availableNow: true,
    slots: 4,
    type: 'court'
  },
  {
    id: 6,
    name: "Banilad Ping Pong",
    location: "Banilad",
    rating: 4.6,
    price: 300,
    priceLabel: "₱300/hr",
    sport: 'Table Tennis',
    image: tabletennis1Img,      // ← your tabletennis1.jpg
    tags: ["Indoor", "Robot Training"],
    availableNow: true,
    slots: 5,
    type: 'court'
  },
  {
    id: 7,
    name: "Cebu Balance Pilates",
    location: "Cebu IT Park",
    rating: 4.8,
    price: 750,
    priceLabel: "₱750/class",
    sport: 'Pilates',
    image: pilates1Img,          // ← your pilates1.jpg
    tags: ["Reformer", "Small Group"],
    availableNow: true,
    slots: 6,
    type: 'studio'
  },
  {
    id: 8,
    name: "Banilad Racket Zone",
    location: "Banilad",
    rating: 4.6,
    price: 400,
    priceLabel: "₱400/hr",
    sport: 'Badminton',
    image: badminton1Img,        // ← your badminton1.jpg
    tags: ["Modern", "Pro Flooring"],
    availableNow: true,
    slots: 4,
    type: 'court'
  },
  {
    id: 9,
    name: "Mactan Zen Garden",
    location: "Mactan",
    rating: 4.9,
    price: 500,
    priceLabel: "₱500/class",
    sport: 'Yoga',
    image: yoga2Img,             // ← your yoga2.jpg
    tags: ["Outdoor", "Meditation"],
    availableNow: false,
    slots: 15,
    type: 'studio'
  },
  {
    id: 10,
    name: "IT Park Smashers",
    location: "Cebu IT Park",
    rating: 4.7,
    price: 380,
    priceLabel: "₱380/hr",
    sport: 'Badminton',
    image: badminton3Img,        // ← your badminton3.jpg
    tags: ["24/7", "Aircon"],
    availableNow: true,
    slots: 8,
    type: 'court'
  },
  {
    id: 11,
    name: "Sugbo Pilates Collective",
    location: "Cebu Business Park",
    rating: 4.8,
    price: 850,
    priceLabel: "₱850/class",
    sport: 'Pilates',
    image: pilates2Img,          // ← your pilates2.jpg
    tags: ["Expert", "Luxury"],
    availableNow: true,
    slots: 5,
    type: 'studio'
  },
  {
    id: 12,
    name: "Lahug Court Masters",
    location: "Lahug",
    rating: 4.4,
    price: 700,
    priceLabel: "₱700/hr",
    sport: 'Tennis',
    image: tennis2Img,           // ← your tennis2.jpg
    tags: ["Night Play", "Training"],
    availableNow: true,
    slots: 2,
    type: 'court'
  }
];

export function UnifiedBooking() {
  const [activeSport, setActiveSport] = useState('Badminton');
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [activePrice, setActivePrice] = useState(PRICE_RANGES[0]);
  const [activeRating, setActiveRating] = useState('Any Rating');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [showRefill, setShowRefill] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [step, setStep] = useState<'details' | 'payment' | 'transaction' | 'success'>('details');
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'gcash', label: 'GCash', detail: '0917 •••• 5678' },
    { id: '2', type: 'maya', label: 'Maya', detail: '0918 •••• 1234' },
    { id: '3', type: 'card', label: 'Credit Card', detail: 'VISA •••• 8888' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 0, type: 'refill', user: 'Apex Hub', detail: 'Court slot just opened up! Book now.', time: 'Just now', read: false },
    { id: 1, type: 'booking', user: 'System', detail: 'Booking confirmed at Zenith Studio', time: '10m ago', read: false },
    { id: 2, type: 'join_request', user: 'Alex K.', detail: 'requested to join Quezon Smashers', time: '2m ago', read: false },
    { id: 3, type: 'like', user: 'Maria S.', detail: 'liked your thought', time: '1h ago', read: true },
    { id: 4, type: 'comment', user: 'Coach Dave', detail: 'commented on your post', time: '3h ago', read: true }
  ]);

  const filteredVenues = VENUES.filter(venue => {
    const matchSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       venue.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSport = venue.sport === activeSport;
    const matchLocation = activeLocation === 'All Locations' || venue.location === activeLocation;
    const matchPrice = venue.price >= activePrice.min && venue.price <= activePrice.max;
    const ratingThreshold = activeRating === 'Any Rating' ? 0 : parseFloat(activeRating.replace('+', ''));
    const matchRating = venue.rating >= ratingThreshold;
    const matchAvailability = !availableOnly || venue.availableNow;

    return matchSearch && matchSport && matchLocation && matchPrice && matchRating && matchAvailability;
  });

  const handleBooking = (venue: any) => {
    setSelectedVenue(venue);
    setStep('details');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header & Search */}
      <header className="p-6 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Discover</p>
            <h1 className="text-5xl font-black italic underline-offset-4 leading-[0.8]">Book Your<br /><span className="accent-text">{activeSport === 'Yoga' || activeSport === 'Pilates' ? 'Class' : 'Court'}</span></h1>
          </div>
          <button 
            onClick={() => setShowNotifications(true)}
            className="sport-card p-2 bg-zinc-50 border-black/5 relative"
          >
            <BellIcon size={20} className="text-black" />
            {notifications.some(n => !n.read) && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input 
              type="text"
              placeholder="Search venue or sport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-black/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-black text-black focus:outline-none focus:ring-1 focus:ring-black/10 placeholder:text-zinc-300 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 rounded-xl border transition-all flex items-center gap-2 ${showFilters ? 'bg-black text-brand-neon border-black shadow-lg shadow-brand-neon/10' : 'bg-white border-black/5 text-black'}`}
          >
            <Settings size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">Filter</span>
          </button>
        </div>

        {/* Sport Categories - Always Visible */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
          {SPORTS.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeSport === sport ? 'accent-bg shadow-lg shadow-brand-neon/20' : 'sport-card bg-transparent text-zinc-500'}`}
            >
              {sport}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden space-y-4"
            >
              {/* Location Filters */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setActiveLocation(loc)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all shrink-0 border ${activeLocation === loc ? 'bg-black text-brand-neon border-black' : 'bg-transparent text-zinc-400 border-zinc-200'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              {/* Price & Rating Quick Select */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
                <div className="flex gap-2 shrink-0">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setActivePrice(range)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all border ${activePrice.label === range.label ? 'bg-black text-brand-neon border-black' : 'bg-transparent text-zinc-400 border-zinc-200'}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-4 bg-zinc-200 shrink-0" />
                <div className="flex gap-2 shrink-0">
                  {RATINGS.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setActiveRating(rate)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all border ${activeRating === rate ? 'bg-black text-brand-neon border-black' : 'bg-transparent text-zinc-400 border-zinc-200'}`}
                    >
                      <Star size={10} fill={activeRating === rate ? 'currentColor' : 'none'} />
                      {rate}
                    </button>
                  ))}
                </div>
                <div className="w-px h-4 bg-zinc-200 shrink-0" />
                <button
                  onClick={() => setAvailableOnly(!availableOnly)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all border shrink-0 ${availableOnly ? 'bg-brand-neon/10 text-black border-brand-neon' : 'bg-transparent text-zinc-400 border-zinc-200'}`}
                >
                  <Clock size={10} />
                  Available Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dynamic Slot Refill Notification */}
      <AnimatePresence>
        {showRefill && VENUES.find(v => v.id === 1)?.sport === activeSport && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="px-6 pb-4"
          >
            <div className="sport-card bg-black border-brand-neon/40 p-3 flex items-center justify-between shadow-xl shadow-brand-neon/10">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="accent-bg p-2 rounded-lg relative z-10">
                          <BellIcon size={14} className="text-black" />
                      </div>
                      <div className="absolute inset-0 accent-bg rounded-lg animate-ping opacity-40"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[9px] font-black text-brand-neon uppercase tracking-widest truncate">Flash Slot Refill!</p>
                          <span className="flex h-1 w-1 rounded-full bg-brand-neon animate-pulse shrink-0"></span>
                        </div>
                        <p className="text-[9px] text-zinc-400 italic font-medium truncate">Cebu Hub • 2m ago</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                      const apex = VENUES.find(v => v.id === 1);
                      if (apex) handleBooking(apex);
                      setShowRefill(false);
                    }}
                    className="accent-bg px-3 py-1 rounded-lg text-[9px] font-black text-black uppercase tracking-widest hover:scale-105 transition-transform shrink-0 ml-2"
                >
                    SECURE SPOT
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Venue List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {filteredVenues.length} Results Found
            </h3>
            <button 
              onClick={() => {
                setActiveSport('Pickleball');
                setActiveLocation('All Locations');
                setActivePrice(PRICE_RANGES[0]);
                setActiveRating('Any Rating');
                setAvailableOnly(false);
                setSearchQuery('');
              }}
              className="text-[10px] text-black font-black underline italic cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>
          
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} onBook={() => handleBooking(venue)} />
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="bg-zinc-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-zinc-300" />
              </div>
              <p className="text-sm font-black italic uppercase italic tracking-tighter text-black">No Matches Found</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2 px-10">Try adjusting your filters or location to find more courts</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <BookingModal 
            venue={selectedVenue} 
            step={step}
            setStep={setStep}
            onClose={() => setSelectedVenue(null)} 
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotifications && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
            >
                <motion.div 
                    initial={{ y: 500 }}
                    animate={{ y: 0 }}
                    exit={{ y: 500 }}
                    className="w-full bg-white rounded-t-[2.5rem] p-8 pb-10 max-h-[90vh] overflow-y-auto no-scrollbar"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-black italic uppercase tracking-widest text-black">Notifications</h2>
                        <button onClick={() => setShowNotifications(false)} className="p-2 -mr-2 text-zinc-400">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {notifications.map(notif => (
                            <div 
                                key={notif.id}
                                className={`sport-card p-4 flex items-start gap-4 transition-all ${notif.read ? 'bg-zinc-50 border-black/5 opacity-60' : 'bg-white border-brand-neon ring-1 ring-brand-neon/10'}`}
                            >
                                <div className={`p-2 rounded-xl shrink-0 ${
                                    notif.type === 'join_request' ? 'bg-blue-50 text-blue-500' :
                                    notif.type === 'like' ? 'bg-red-50 text-red-500' :
                                    notif.type === 'refill' ? 'bg-brand-neon text-black' :
                                    notif.type === 'booking' ? 'bg-zinc-100 text-black' :
                                    'bg-green-50 text-green-500'
                                }`}>
                                    {notif.type === 'join_request' ? <UserPlus size={18} /> :
                                     notif.type === 'like' ? <Heart size={18} /> :
                                     notif.type === 'refill' ? <Clock size={18} /> :
                                     notif.type === 'booking' ? <Check size={18} /> :
                                     <MessageSquare size={18} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-black leading-tight mb-1">
                                        <span className="font-black italic uppercase mr-1">{notif.user}</span>
                                        {notif.detail}
                                    </p>
                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-tight">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const VenueCard: React.FC<{ venue: any, onBook: () => void }> = ({ venue, onBook }) => {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="sport-card group cursor-pointer"
      onClick={onBook}
    >
      <div className="relative h-44">
        <img 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {venue.tags.map((tag: string) => (
            <span key={tag} className="bg-white/90 backdrop-blur-md px-2 py-1 text-[8px] font-black uppercase tracking-widest text-black border border-black/5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-4 right-4 accent-bg px-2 py-1 text-[10px] font-black italic shadow-sm">
          {venue.priceLabel}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-black italic tracking-tighter uppercase">{venue.name}</h4>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-zinc-400" fill="currentColor" />
            <span className="text-[10px] font-black text-black">{venue.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-4">
          <MapPin size={12} />
          <span className="font-bold uppercase tracking-widest">{venue.location}</span>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={onBook}
                className="flex-1 accent-bg py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-transform group-hover:scale-[1.02] shadow-sm"
            >
                {venue.sport === 'Yoga' || venue.sport === 'Pilates' ? 'Book Class' : 'Book Court'}
            </button>
            <button 
                onClick={onBook}
                className="px-4 py-3 border border-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black hover:border-black/20 transition-all"
            >
                Details
            </button>
        </div>
      </div>
    </motion.div>
  );
}

function BookingModal({ venue, onClose, step, setStep, paymentMethods, setPaymentMethods }: { venue: any, onClose: () => void, step: any, setStep: any, paymentMethods: any[], setPaymentMethods: any }) {
  const [selectedDate, setSelectedDate] = useState(0); 
  const [selectedSlots, setSelectedSlots] = useState<string[]>(['10:00 AM']);
  const [rentals, setRentals] = useState<Record<string, number>>({});
  const [selectedPaymentId, setSelectedPaymentId] = useState(paymentMethods[0]?.id || '');
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState<any>('gcash');
  const [newPaymentDetail, setNewPaymentDetail] = useState('');

  const rentalItems = (venue.sport === 'Yoga' || venue.sport === 'Pilates')
    ? []
    : venue.name.toLowerCase().includes('pickleball')
      ? [
          { id: 'paddle', label: 'Pro Paddle (₱150 / unit per use)', price: 150, multiple: true },
          { id: 'ball', label: 'Ball', price: 40, multiple: true }
        ]
      : venue.type === 'studio' 
        ? [
            { id: 'mat', label: 'Premium Mat', price: 100, multiple: false },
            { id: 'block', label: 'Yoga Blocks', price: 50, multiple: true },
            { id: 'towel', label: 'Cooling Towel', price: 30, multiple: true }
          ]
        : [
            { id: 'racket', label: 'Pro Racket', price: 150, multiple: true },
            { id: 'balls', label: 'Ball Set', price: 80, multiple: false }
          ];

  const updateRental = (id: string, price: number, delta: number, multiple: boolean) => {
    setRentals(prev => {
      const next = { ...prev };
      const currentQty = next[id] ? Math.round(next[id] / price) : 0;
      const newQty = multiple ? Math.max(0, currentQty + delta) : (currentQty > 0 && delta < 0 ? 0 : 1);
      
      if (newQty === 0) delete next[id];
      else next[id] = newQty * price;
      return next;
    });
  };

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  const toggleSlot = (slot: string) => {
    if (venue.type === 'studio') {
      setSelectedSlots([slot]);
      return;
    }

    setSelectedSlots(prev => {
      if (prev.length === 0 || prev.length >= 2) return [slot];
      
      const startIdx = timeSlots.indexOf(prev[0]);
      const endIdx = timeSlots.indexOf(slot);
      
      const start = Math.min(startIdx, endIdx);
      const end = Math.max(startIdx, endIdx);
      
      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(timeSlots[i]);
      }
      return range;
    });
  };

  const totalRentals = Object.values(rentals).reduce((a: number, b: number) => a + b, 0) as number;
  const totalVenueFee = venue.price * selectedSlots.length;
  const totalPrice = totalVenueFee + totalRentals;

  const DATES = [
    { day: 'MON', date: '18', label: 'Today' },
    { day: 'TUE', date: '19', label: 'Tomorrow' },
    { day: 'WED', date: '20', label: 'Wednesday' },
    { day: 'THU', date: '21', label: 'Thursday' },
    { day: 'FRI', date: '22', label: 'Friday' },
  ];

  const CLASS_SCHEDULE = [
    { time: '08:00 AM', name: 'Morning Vinyasa', instructor: 'Coach Sarah', capacity: '12/15', level: 'All Levels' },
    { time: '10:00 AM', name: 'Power Flow', instructor: 'Coach Mike', capacity: '8/12', level: 'Intermediate' },
    { time: '05:00 PM', name: 'Sunset Yin', instructor: 'Coach Anna', capacity: '15/15', full: true, level: 'Beginner' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
    >
      <motion.div 
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        className="w-full bg-white rounded-t-[2.5rem] p-8 pb-10 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        <div className="flex justify-between items-center mb-6">
          {step === 'payment' || step === 'transaction' ? (
            <button onClick={() => setStep(step === 'transaction' ? 'payment' : 'details')} className="p-2 -ml-2 text-zinc-400 hover:text-black">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <h2 className="text-sm font-black italic uppercase tracking-widest text-black text-center flex-1">
            {step === 'details' && 'Booking Details'}
            {step === 'payment' && 'Select Payment'}
            {step === 'transaction' && 'Transaction Details'}
            {step === 'success' && 'Match Confirmed'}
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {step === 'details' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={venue.image} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-black/5" />
              <div>
                <h3 className="text-lg font-black italic uppercase italic tracking-tighter leading-none mb-1 text-black">{venue.name}</h3>
                <p className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">{venue.location}</p>
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Date</h4>
                <span className="text-[10px] font-black accent-text">MAY 2026</span>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
                {DATES.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`flex flex-col items-center min-w-[56px] py-3 rounded-2xl border transition-all ${selectedDate === i ? 'accent-bg border-brand-neon' : 'bg-zinc-50 border-black/5 text-zinc-400'}`}
                  >
                    <span className="text-[8px] font-black uppercase tracking-tighter mb-1">{date.day}</span>
                    <span className="text-lg font-black italic leading-none">{date.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slots / Classes */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  {venue.type === 'studio' ? 'Available Classes' : 'Select Time Range'}
                </h4>
                {venue.type !== 'studio' && <span className="text-[8px] font-black text-zinc-400 uppercase italic">Select start & end</span>}
              </div>
              
              {venue.type === 'studio' ? (
                <div className="space-y-3">
                  {CLASS_SCHEDULE.map((item, i) => (
                    <button
                      key={i}
                      disabled={item.full}
                      onClick={() => setSelectedSlots([item.time])}
                      className={`w-full sport-card p-4 flex items-center justify-between transition-all text-left shadow-none ${selectedSlots.includes(item.time) ? 'border-brand-neon bg-brand-neon/5 ring-1 ring-brand-neon/20' : 'bg-zinc-50 border-black/5 opacity-80'} ${item.full ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${selectedSlots.includes(item.time) ? 'accent-bg' : 'bg-white'}`}>
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight text-black">{item.name}</p>
                          <p className="text-[8px] text-zinc-500 italic font-medium">{item.time} • {item.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-black mb-1">{item.capacity}</p>
                        <p className="text-[8px] text-zinc-400 uppercase font-bold tracking-widest">{item.level}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`py-3 rounded-xl text-[10px] font-black transition-all ${selectedSlots.includes(slot) ? 'accent-bg shadow-sm' : 'bg-zinc-100 text-zinc-500'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resource Rentals */}
            {rentalItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Required Gear?</h4>
                <div className="grid grid-cols-1 gap-2">
                  {rentalItems.map(item => {
                    const qty = rentals[item.id] ? Math.round(rentals[item.id] / item.price) : 0;
                    return (
                      <div 
                        key={item.id}
                        className={`sport-card p-3 flex items-center justify-between transition-all shadow-none ${qty > 0 ? 'border-brand-neon bg-brand-neon/5' : 'bg-zinc-50 border-black/5'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg border border-black/5 ${qty > 0 ? 'accent-bg' : 'bg-white'}`}>
                            {item.multiple ? <Plus size={14} /> : <Check size={14} />}
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-tight text-black">{item.label}</span>
                            <p className="text-[8px] text-zinc-400 font-bold">₱{item.price}{item.multiple ? ' / unit' : ''}</p>
                          </div>
                        </div>
                        
                        {item.multiple ? (
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateRental(item.id, item.price, -1, true)}
                              className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-black active:scale-95"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-black italic w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateRental(item.id, item.price, 1, true)}
                              className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center active:scale-95"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => updateRental(item.id, item.price, 1, false)}
                            className={`w-10 h-6 bg-zinc-200 rounded-full p-1 relative transition-colors ${qty > 0 ? 'accent-bg' : ''}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-all ${qty > 0 ? 'translate-x-4' : ''}`} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="border-t border-black/5 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Transaction</span>
                  {selectedSlots.length > 1 && <span className="text-[8px] font-bold text-zinc-500 italic">{selectedSlots.length} slots selected</span>}
                </div>
                <span className="text-2xl font-black italic text-black">
                  {totalPrice === 0 ? 'FREE' : `₱${totalPrice}`}
                </span>
              </div>
              <button 
                onClick={() => setStep('payment')}
                disabled={selectedSlots.length === 0}
                className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
              >
                Continue to Payment <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Select Payment Method</h3>
              <button 
                onClick={() => setShowAddPayment(true)}
                className="text-[10px] font-black text-brand-neon underline italic italic-none"
              >
                + ADD NEW
              </button>
            </div>

            <AnimatePresence>
              {showAddPayment && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="sport-card p-4 bg-zinc-50 border-brand-neon/20 mb-4">
                    <div className="flex gap-2 mb-4">
                      {['gcash', 'maya', 'card'].map(type => (
                        <button 
                          key={type}
                          onClick={() => setNewPaymentType(type)}
                          className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${newPaymentType === type ? 'accent-bg' : 'bg-white text-zinc-400 border border-black/5'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder={newPaymentType === 'card' ? 'XXXX-XXXX-XXXX-8888' : '09XX •••• XXXX'}
                      value={newPaymentDetail}
                      onChange={(e) => setNewPaymentDetail(e.target.value)}
                      className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-xs font-black focus:outline-none mb-3"
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (newPaymentDetail.trim()) {
                            const newMethod = {
                              id: Date.now().toString(),
                              type: newPaymentType,
                              label: newPaymentType === 'card' ? 'Credit Card' : newPaymentType.charAt(0).toUpperCase() + newPaymentType.slice(1),
                              detail: newPaymentDetail
                            };
                            setPaymentMethods([...paymentMethods, newMethod]);
                            setNewPaymentDetail('');
                            setShowAddPayment(false);
                            setSelectedPaymentId(newMethod.id);
                          }
                        }}
                        className="flex-1 accent-bg py-2 rounded-xl text-[10px] font-black uppercase"
                      >
                        SAVE
                      </button>
                      <button 
                        onClick={() => setShowAddPayment(false)}
                        className="px-4 py-2 bg-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-500"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={method.id} className="relative group">
                  <PaymentOption 
                    id={method.id}
                    label={`${index + 1}. ${method.label}`} 
                    detail={method.detail}
                    active={selectedPaymentId === method.id} 
                    onClick={() => setSelectedPaymentId(method.id)} 
                    icon={
                      method.type === 'gcash' ? <CreditCard className="text-blue-500" /> :
                      method.type === 'maya' ? <CreditCard className="text-green-600" /> :
                      <CreditCard className="text-orange-500" />
                    }
                  />
                  {paymentMethods.length > 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                        if (selectedPaymentId === method.id) setSelectedPaymentId(paymentMethods.find(m => m.id !== method.id)?.id || '');
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -right-2 p-2 text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
                onClick={() => setStep('transaction')}
                className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2"
              >
                Review Transaction <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 'transaction' && (
          <div className="space-y-6">
            <div className="sport-card bg-zinc-50 p-6 border-black/5 shadow-none overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/5 rounded-full -mr-12 -mt-12" />
               <div className="relative">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Summary Breakdown</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start pb-4 border-b border-black/5">
                      <div>
                        <h4 className="text-sm font-black uppercase italic tracking-tight text-black">{venue.name}</h4>
                        <p className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase mt-1">{venue.location} • {selectedSlots.length} Hr(s)</p>
                      </div>
                      <span className="text-sm font-black italic text-black">₱{totalVenueFee}</span>
                    </div>

                    {Object.entries(rentals).map(([id, total]) => {
                      const item = rentalItems.find(i => i.id === id);
                      const qty = Math.round((total as number) / (item?.price || 1));
                      return (
                        <div key={id} className="flex justify-between items-center text-[10px] font-black text-black uppercase">
                          <span className="text-zinc-500">{item?.label} {qty > 1 ? `(x${qty})` : ''}</span>
                          <span>₱{total}</span>
                        </div>
                      );
                    })}

                    <div className="pt-2 flex justify-between items-center text-xs font-black text-black border-t border-black/5 mt-4">
                      <span className="uppercase tracking-widest">Grand Total</span>
                      <span className="text-xl italic text-brand-neon bg-black px-2 py-1 rounded">₱{totalPrice}</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="sport-card p-4 border-brand-neon/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 accent-bg rounded-lg">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tight text-black">
                    {paymentMethods.find(m => m.id === selectedPaymentId)?.label}
                  </p>
                  <p className="text-[8px] text-zinc-400 font-bold italic">{paymentMethods.find(m => m.id === selectedPaymentId)?.detail}</p>
                </div>
              </div>
              <button onClick={() => setStep('payment')} className="text-[9px] font-black text-zinc-400 underline uppercase italic">Change</button>
            </div>

            <div className="flex gap-4">
              <button 
                  onClick={() => setStep('payment')}
                  className="flex-1 py-5 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400"
                >
                  Return to Booking
              </button>
              <button 
                  onClick={() => setStep('success')}
                  className="flex-[2] accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20"
                >
                  {totalPrice === 0 ? 'Confirm Booking' : `Confirm & Pay ₱${totalPrice}`}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center text-center py-4">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <Check size={40} />
             </div>
             <h3 className="text-2xl font-black italic uppercase italic tracking-tighter leading-none mb-2 text-black">Match Confirmed!</h3>
             <p className="text-zinc-500 text-sm mb-8 italic font-medium">Your e-receipt has been generated and sent to your wallet.</p>
             
             <div className="w-full sport-card bg-zinc-50 p-6 mb-8 text-left border-black/5 shadow-none">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                    <span className="text-[10px] font-black text-zinc-400 uppercase">Receipt #SS-8821</span>
                    <BellIcon size={14} className="text-black" />
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-tight text-black">{venue.name}</p>
                        <p className="text-[8px] text-zinc-500 italic uppercase font-black tracking-widest mb-1">
                          {selectedSlots.join(', ')} • Today
                        </p>
                    </div>
                    {Object.keys(rentals).length > 0 && (
                        <div className="pt-2 border-t border-black/5">
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Equipment</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(rentals).map(([id, total]) => {
                                  const item = rentalItems.find(i => i.id === id);
                                  const qty = Math.round((total as number) / (item?.price || 1));
                                  return (
                                    <span key={id} className="text-[9px] font-black bg-white px-2 py-0.5 border border-black/5 rounded uppercase">
                                        {qty}x {item?.label}
                                    </span>
                                  );
                                })}
                            </div>
                        </div>
                    )}
                </div>
             </div>

             <button 
                onClick={onClose}
                className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20"
              >
                Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function PaymentOption({ id, label, active, onClick, icon, detail }: { id: string, label: string, active: boolean, onClick: () => void, icon: any, detail?: string }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full sport-card p-4 flex items-center justify-between transition-all shadow-none ${active ? 'border-brand-neon bg-brand-neon/5 ring-1 ring-brand-neon/20' : 'bg-zinc-50 border-black/5'}`}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-black/5">
                    {icon}
                </div>
                <div className="text-left">
                  <span className="text-xs font-black uppercase tracking-tight text-black block leading-none mb-1">{label}</span>
                  {detail && <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{detail}</span>}
                </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-brand-neon bg-brand-neon' : 'border-zinc-200'}`}>
                {active && <Check size={12} className="text-black" />}
            </div>
        </button>
    );
}
