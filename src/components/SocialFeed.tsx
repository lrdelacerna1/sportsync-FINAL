import React, { useState, useRef } from 'react';
import { Users, MessageSquare, Heart, Share2, PlusCircle, TrendingUp, Search, Trophy, Activity, Award, Zap, Clock, Image as ImageIcon, Send, X, Bell, ChevronRight, ChevronLeft, Settings, Trash2, CreditCard as Edit, CheckCircle, UserPlus, LogOut, Shield, Flag, Calendar, MoreVertical, Paperclip, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OPEN_PLAYS = [
  { 
    id: 1, 
    sport: "Pickleball", 
    level: "Intermediate", 
    location: "Cebu Hub - IT Park", 
    slots: "3/4", 
    maxSlots: 4,
    date: "May 20, 2024", 
    time: "2:00 PM", 
    venue: "IT Park Main Court", 
    participants: [
        { name: "Dave C.", avatar: "https://i.pravatar.cc/150?u=dave" },
        { name: "John D.", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Maria S.", avatar: "https://i.pravatar.cc/150?u=maria" }
    ],
    description: "Casual semi-competitive doubles session in IT Park. Come and join the fun!"
  },
  { 
    id: 2, 
    sport: "Badminton", 
    level: "Beginner", 
    location: "Smash Arena - Mandaue", 
    slots: "2/6", 
    maxSlots: 6,
    date: "May 21, 2024", 
    time: "5:00 PM", 
    venue: "Court 4", 
    participants: [
        { name: "Alex K.", avatar: "https://i.pravatar.cc/150?u=alex" },
        { name: "Sarah J.", avatar: "https://i.pravatar.cc/150?u=sarah" }
    ],
    description: "Friendly drills and light games. Great for those new to the sport in Cebu."
  },
  { 
    id: 3, 
    sport: "Tennis", 
    level: "Advanced", 
    location: "Racket Club - Busay", 
    slots: "1/2", 
    maxSlots: 2,
    date: "May 22, 2024", 
    time: "8:00 AM", 
    venue: "Clay Court 1", 
    participants: [
        { name: "Mario P.", avatar: "https://i.pravatar.cc/150?u=mario" }
    ],
    description: "High intensity singles match with a view of Cebu. Looking for a challenging rally partner."
  },
  { 
    id: 4, 
    sport: "Pickleball", 
    level: "Pro", 
    location: "Metro Cebu - IT Park", 
    slots: "1/4", 
    maxSlots: 4,
    date: "May 23, 2024", 
    time: "6:00 PM", 
    venue: "Elite Court A", 
    participants: [
        { name: "Coach Mike", avatar: "https://i.pravatar.cc/150?u=mike" }
    ],
    description: "Advanced pickleball drills and high-level play. Invitation only."
  },
  { 
    id: 5, 
    sport: "Table Tennis", 
    level: "Intermediate", 
    location: "Banilad Sports", 
    slots: "3/8", 
    maxSlots: 8,
    date: "May 24, 2024", 
    time: "3:00 PM", 
    venue: "Table 2 & 3", 
    participants: [
        { name: "Leo T.", avatar: "https://i.pravatar.cc/150?u=leo" },
        { name: "Anna W.", avatar: "https://i.pravatar.cc/150?u=anna" },
        { name: "Ping P.", avatar: "https://i.pravatar.cc/150?u=ping" }
    ],
    description: "Open play session for table tennis enthusiasts. All ages welcome!"
  },
  { 
    id: 6, 
    sport: "Badminton", 
    level: "Intermediate", 
    location: "Mactan Arena", 
    slots: "8/12", 
    maxSlots: 12,
    date: "May 25, 2024", 
    time: "7:00 AM", 
    venue: "Main Hall", 
    participants: [
        { name: "Ken S.", avatar: "https://i.pravatar.cc/150?u=ken" },
        { name: "Yuki M.", avatar: "https://i.pravatar.cc/150?u=yuki" },
        { name: "Ryu K.", avatar: "https://i.pravatar.cc/150?u=ryu" },
        { name: "Sora L.", avatar: "https://i.pravatar.cc/150?u=sora" },
        { name: "Hina T.", avatar: "https://i.pravatar.cc/150?u=hina" },
        { name: "Ren O.", avatar: "https://i.pravatar.cc/150?u=ren" },
        { name: "Kaito B.", avatar: "https://i.pravatar.cc/150?u=kaito" },
        { name: "Mei F.", avatar: "https://i.pravatar.cc/150?u=mei" }
    ],
    description: "Morning queue play. Fast-paced doubles games."
  },
  { 
    id: 7, 
    sport: "Tennis", 
    level: "Intermediate", 
    location: "Lahug Club", 
    slots: "3/4", 
    maxSlots: 4,
    date: "May 26, 2024", 
    time: "4:00 PM", 
    venue: "Court 2", 
    participants: [
        { name: "Mark G.", avatar: "https://i.pravatar.cc/150?u=mark" },
        { name: "Luz R.", avatar: "https://i.pravatar.cc/150?u=luz" },
        { name: "Jun P.", avatar: "https://i.pravatar.cc/150?u=jun" }
    ],
    description: "Mixed doubles social play. Bring your own balls!"
  }
];


const INITIAL_MY_EVENTS = [
    {
        id: 1,
        title: "Saturday Smash Session",
        sport: "Badminton",
        date: "May 25, 2024",
        time: "4:00 PM",
        venue: "Mandaue Smash Arena",
        location: "Mandaue",
        status: "upcoming",
        players: 12,
        maxPlayers: 16
    },
    {
        id: 2,
        title: "Pro Singles Ladder",
        sport: "Tennis",
        date: "May 28, 2024",
        time: "8:00 AM",
        venue: "Busay Racket Club",
        location: "Busay",
        status: "upcoming",
        players: 2,
        maxPlayers: 2
    },
    {
        id: 3,
        title: "Community Open Play",
        sport: "Pickleball",
        date: "May 10, 2024",
        time: "2:00 PM",
        venue: "IT Park Hub",
        location: "Cebu City",
        status: "past",
        players: 16,
        maxPlayers: 16
    }
];

function MyEventsView({ events, setEvents }: { events: any[], setEvents: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [subTab, setSubTab] = useState<'schedule' | 'history'>('schedule');
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const filteredEvents = events.filter(e => 
        subTab === 'schedule' ? e.status === 'upcoming' : e.status === 'past'
    );

    const selectedEvent = events.find(e => e.id === selectedEventId);

    const handleWithdraw = (id: number) => {
        if (confirm("Are you sure you want to withdraw from this event?")) {
            setEvents(prev => prev.filter(e => e.id !== id));
            setSelectedEventId(null);
        }
    };

    return (
        <div className="space-y-6">
            {!selectedEventId ? (
                <>
                    <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner">
                        <button 
                            onClick={() => setSubTab('schedule')}
                            className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${subTab === 'schedule' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                        >
                            Schedule
                        </button>
                        <button 
                            onClick={() => setSubTab('history')}
                            className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${subTab === 'history' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                        >
                            History
                        </button>
                    </div>

                    <div className="space-y-3">
                        {filteredEvents.length === 0 ? (
                            <div className="py-20 text-center">
                                <Activity size={40} className="mx-auto text-zinc-200 mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">No events found</p>
                            </div>
                        ) : (
                            filteredEvents.map(event => (
                                <div 
                                    key={event.id}
                                    onClick={() => setSelectedEventId(event.id)}
                                    className="sport-card p-3 flex items-center justify-between bg-white border-black/5 hover:border-brand-neon transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-brand-neon transition-colors">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase italic leading-none mb-1">{event.title}</h4>
                                            <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">{event.sport} • {event.date}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-zinc-300" />
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="space-y-5">
                    <button 
                        onClick={() => setSelectedEventId(null)}
                        className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-black transition-colors"
                    >
                        <ChevronLeft size={14} /> Back to List
                    </button>

                    <div className="sport-card p-6 border-black/5 bg-white relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-2 text-[8px] font-black uppercase tracking-widest italic rounded-bl-xl shadow-lg ${selectedEvent?.status === 'upcoming' ? 'bg-brand-neon text-black' : 'bg-zinc-200 text-zinc-500'}`}>
                            {selectedEvent?.status}
                        </div>
                        
                        <div className="mb-6">
                            <p className="text-[10px] font-black text-brand-neon uppercase tracking-widest mb-1">{selectedEvent?.sport}</p>
                            <h3 className="text-xl font-black italic uppercase leading-none">{selectedEvent?.title}</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                                    <Calendar size={16} className="text-brand-neon" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Date & Time</p>
                                    <p className="text-xs font-bold">{selectedEvent?.date} • {selectedEvent?.time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                                    <TrendingUp size={16} className="text-brand-neon" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Venue</p>
                                    <p className="text-xs font-bold leading-tight">{selectedEvent?.venue}, {selectedEvent?.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                                    <Users size={16} className="text-brand-neon" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Attendance</p>
                                    <p className="text-xs font-bold">{selectedEvent?.players}/{selectedEvent?.maxPlayers} Players Confirmed</p>
                                </div>
                            </div>
                        </div>

                        {selectedEvent?.status === 'upcoming' && (
                            <button 
                                onClick={() => handleWithdraw(selectedEvent!.id)}
                                className="w-full py-4 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14} /> Withdraw from Event
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function SocialFeed({ forceNotifications = false, ownerNewsfeed = false }: { forceNotifications?: boolean; ownerNewsfeed?: boolean }) {
  const [view, setView] = useState<'feed' | 'matchmaker' | 'clubs' | 'notifications' | 'report' | 'myEvents'>('feed');
  const [reportEntity, setReportEntity] = useState<any>(null);
  const [myEvents, setMyEvents] = useState(INITIAL_MY_EVENTS);
  const [reports, setReports] = useState<any[]>([
    { id: 101, target: 'Post by Maria S.', category: 'Harassment', status: 'Pending', date: 'Today', narrative: 'Inappropriate language in post.' }
  ]);

  // Sync view with forceNotifications prop
  React.useEffect(() => {
    if (ownerNewsfeed) {
      setView('feed');
      return;
    }

        if (forceNotifications) {
            setView('myEvents');
        }
  }, [forceNotifications, ownerNewsfeed]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [notifications, setNotifications] = useState([
    { id: 0, type: 'booking', user: 'System', detail: 'Your court at Cebu IT Park is ready!', time: '1m ago', read: false },
    { id: 1, type: 'join_request', user: 'Alex K.', detail: 'requested to join Cebu Smashers', time: '2m ago', read: false },
    { id: 2, type: 'like', user: 'Maria S.', detail: 'liked your thought', time: '1h ago', read: true },
    { id: 3, type: 'comment', user: 'Coach Dave', detail: 'commented on your post', time: '3h ago', read: true }
  ]);

  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Cebu Smashers",
      description: "Premier badminton club for competitive players in Cebu City.",
      owner: "Dave C.",
      members: [
        { id: 1, name: "Maria S.", status: 'approved' },
        { id: 2, name: "John D.", status: 'approved' },
        { id: 3, name: "Alex K.", status: 'pending' }
      ],
      memberCount: 24,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
      tag: "Badminton"
    },
    {
      id: 2,
      name: "Yoga Warriors",
      description: "Mindfulness and power yoga collective.",
      owner: "You",
      members: [
        { id: 4, name: "Lee M.", status: 'approved' },
        { id: 5, name: "Sarah J.", status: 'pending' }
      ],
      memberCount: 15,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      tag: "Yoga"
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Maria S.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      content: "Epic pickleball match today at Smash Arena! That final volley was insane. 🏓",
      image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=800",
      likes: 24,
      comments: [
        { id: 1, user: "Coach Dave", text: "Nice work! positioning was perfect.", time: "1h ago" }
      ],
      tag: "Pickleball",
      liked: false
    },
    {
      id: 2,
      user: "Coach Dave",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      content: "New coaching slots available for the weekends. Focus on tactical positioning for doubles.",
      likes: 12,
      comments: [],
      tag: "Training",
      liked: false
    }
  ]);

  const handlePost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number, commentText: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { 
            id: Date.now(), 
            user: "You", 
            text: commentText, 
            time: "Just now" 
          }]
        };
      }
      return post;
    }));
  };

  const handleReportSubmit = (report: any) => {
    setReports(prev => [report, ...prev]);
    setView('feed');
  };

  const handleJoinEvent = (event: any) => {
    setMyEvents(prev => [...prev, event]);
    setNotifications(prev => [
      { 
        id: Date.now(), 
        type: 'booking', 
        user: 'System', 
        detail: `Confirmation: You joined ${event.title}!`, 
        time: 'Just now', 
        read: false 
      },
      ...prev
    ]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="p-6 pt-10 pb-2">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-black italic leading-none">Community</h1>
            <div className="flex gap-1.5">
                <button onClick={() => setView('myEvents')} className={`glass p-1.5 relative ${view === 'myEvents' ? 'accent-text' : ''}`}>
                    <Calendar size={16} />
                </button>
            </div>
        </div>

        {/* View Switcher */}
        {view !== 'notifications' && view !== 'report' && !ownerNewsfeed && (
          <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner mb-6">
            <button 
              onClick={() => setView('feed')}
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${view === 'feed' ? 'accent-bg shadow-lg shadow-brand-neon/20' : 'text-zinc-500'}`}
            >
              Feed
            </button>
            <button 
              onClick={() => setView('clubs')}
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${view === 'clubs' ? 'accent-bg shadow-lg shadow-brand-neon/20' : 'text-zinc-500'}`}
            >
              Clubs
            </button>
            <button 
              onClick={() => setView('matchmaker')}
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${view === 'matchmaker' ? 'accent-bg shadow-lg shadow-brand-neon/20' : 'text-zinc-500'}`}
            >
              Matches
            </button>
                        <button 
                            onClick={() => setView('myEvents')}
                            className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${view === 'myEvents' ? 'accent-bg shadow-lg shadow-brand-neon/20' : 'text-zinc-500'}`}
                        >
                            Bookings
                        </button>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {view === 'matchmaker' ? (
            <MatchmakerView myEvents={myEvents} onJoinEvent={handleJoinEvent} />
        ) : view === 'myEvents' ? (
            <MyEventsView events={myEvents} setEvents={setMyEvents} />
        ) : view === 'clubs' ? (
            <ClubsTab 
                clubs={clubs} 
                setClubs={setClubs} 
                onReport={(type, data) => {
                    setReportEntity({ type, data });
                    setView('report');
                }}
            />
        ) : view === 'notifications' ? (
            <NotificationsView notifications={notifications} setNotifications={setNotifications} reports={reports} />
        ) : view === 'report' ? (
            <ReportFormView 
                entity={reportEntity} 
                onBack={() => setView('feed')} 
                onSubmit={handleReportSubmit} 
            />
        ) : (
            <FeedView 
                textareaRef={textareaRef} 
                posts={posts} 
                onPost={handlePost} 
                onLike={handleLike} 
                onAddComment={handleAddComment} 
                onReport={(type, data) => {
                    setReportEntity({ type, data });
                    setView('report');
                }}
                clubs={clubs}
                setClubs={setClubs}
            />
        )}
      </div>
    </div>
  );
}

function FeedView({ textareaRef, posts, onPost, onLike, onAddComment, onReport }: any) {
  const [thought, setThought] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = () => {
    if (!thought.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
        onPost({
            id: Math.random(),
            user: "You",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
            content: thought,
            image: selectedImage,
            likes: 0,
            comments: [],
            tag: "General",
            liked: false
        });
        setThought('');
        setSelectedImage(null);
        setIsPosting(false);
    }, 800);
  };

  return (
    <div className="pb-24">
       {/* Post Creation */}
       <div className="sport-card p-4 bg-zinc-50 border-black/5 shadow-none mb-8">
            <div className="flex gap-4 mb-4">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1">
                    <textarea 
                        ref={textareaRef}
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder="Share your session highlights..."
                        className="w-full bg-transparent border-none text-sm font-semibold focus:outline-none resize-none pt-2 placeholder:text-zinc-300"
                        rows={2}
                    />
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative mb-4 rounded-xl overflow-hidden border border-black/5 aspect-video"
                    >
                        <img src={selectedImage} className="w-full h-full object-cover" />
                        <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black transition-colors">
                            <X size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <button onClick={() => setSelectedImage('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800')} className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors">
                    <ImageIcon size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Photo</span>
                </button>
                <button 
                    onClick={handlePostSubmit}
                    disabled={!thought.trim() || isPosting}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${thought.trim() ? 'accent-bg' : 'bg-zinc-100 text-zinc-300'}`}
                >
                    {isPosting ? 'POSTING...' : <>POST <Send size={12} /></>}
                </button>
            </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
            {posts.map((post: any) => (
                <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => onLike(post.id)} 
                    onAddComment={(text: string) => onAddComment(post.id, text)} 
                    onReport={() => onReport('post', post)}
                />
            ))}
        </div>
    </div>
  );
}

function ClubsTab({ clubs, setClubs, onReport }: any) {
  const [subView, setSubView] = useState<'list' | 'club-detail' | 'create-club'>('list');
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

  const selectedClub = clubs.find((c: any) => c.id === selectedClubId);

  if (subView === 'create-club') {
    return <CreateClubForm onBack={() => setSubView('list')} onSubmit={(n: string, d: string) => {
        const newClub = {
            id: Date.now(),
            name: n,
            description: d,
            owner: "You",
            members: [{ id: Date.now(), name: "You", status: 'approved' }],
            memberCount: 1,
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200",
            tag: "New Club"
        };
        setClubs([...clubs, newClub]);
        setSubView('list');
    }} />;
  }

  if (subView === 'club-detail' && selectedClub) {
    return <ClubDetailView 
        club={selectedClub} 
        onBack={() => setSubView('list')} 
        onReport={(c: any) => onReport('club', c)}
        onUserReport={(u: any) => onReport('user', u)}
        onDelete={() => {
            setClubs(clubs.filter((c: any) => c.id !== selectedClub.id));
            setSubView('list');
        }}
        onJoin={() => {
            setClubs(clubs.map((c: any) => c.id === selectedClub.id ? { ...c, members: [...c.members, { id: Date.now(), name: "You", status: 'pending' }] } : c));
        }}
        onMemberStatus={(mid: number, stat: any) => {
            setClubs(clubs.map((c: any) => {
                if (c.id === selectedClub.id) {
                    if (stat === 'removed') return { ...c, members: c.members.filter((m: any) => m.id !== mid) };
                    return { ...c, members: c.members.map((m: any) => m.id === mid ? { ...m, status: 'approved' } : m), memberCount: c.memberCount + 1 };
                }
                return c;
            }));
        }}
    />;
  }

  return (
    <div className="pb-24">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none">Clubs</h2>
            <button 
                onClick={() => setSubView('create-club')}
                className="accent-bg px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-neon/20 flex items-center gap-2"
            >
                <PlusCircle size={14} /> NEW CLUB
            </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {clubs.map((club: any) => {
                const isOwner = club.owner === 'You';
                const membership = club.members.find((m: any) => m.name === 'You');
                const isMember = !!membership && membership.status === 'approved';
                const isPending = !!membership && membership.status === 'pending';

                return (
                    <div 
                        key={club.id} 
                        onClick={() => { setSelectedClubId(club.id); setSubView('club-detail'); }}
                        className="sport-card p-3 flex gap-3 cursor-pointer hover:border-brand-neon/40 transition-all group relative overflow-hidden"
                    >
                        {/* Status Stripe */}
                        {(isOwner || isMember || isPending) && (
                            <div className={`absolute top-0 left-0 w-1 h-full ${isOwner ? 'bg-brand-neon' : isPending ? 'bg-zinc-200' : 'bg-black'}`} />
                        )}

                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                            <img src={club.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-sm font-black uppercase italic tracking-tight text-black">{club.name}</h3>
                                <div className="flex items-center gap-1 text-zinc-400">
                                    <Users size={12} />
                                    <span className="text-[10px] font-black">{club.members.length}</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-zinc-500 line-clamp-2 mb-2 italic font-medium leading-relaxed">{club.description}</p>
                            
                            <div className="flex items-center gap-2">
                                <span className="inline-block px-2 py-0.5 bg-zinc-100 rounded text-[8px] font-black uppercase tracking-widest text-zinc-500">{club.tag}</span>
                                
                                {isOwner && <span className="text-[8px] font-black uppercase tracking-widest accent-bg px-1.5 py-0.5 rounded italic">Owner</span>}
                                {isMember && !isOwner && <span className="text-[8px] font-black uppercase tracking-widest bg-black text-white px-1.5 py-0.5 rounded italic">Member</span>}
                                {isPending && <span className="text-[8px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-400 px-1.5 py-0.5 rounded italic whitespace-nowrap">Pending Approval</span>}
                                {!isOwner && !isMember && !isPending && (
                                    <span className="text-[8px] font-black uppercase tracking-widest text-brand-neon italic underline-offset-2 underline decoration-brand-neon/30">+ Join Community</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
}

const PostCard: React.FC<{ post: any, onLike: () => void, onAddComment: (text: string) => void, onReport: () => void }> = ({ post, onLike, onAddComment, onReport }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    return (
        <div className="sport-card p-3 mb-3">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full object-cover border border-black/5" referrerPolicy="no-referrer" />
                    <div>
                        <h5 className="text-[11px] font-black uppercase tracking-tight leading-none mb-0.5">{post.user}</h5>
                        <p className="text-[7px] text-zinc-400 uppercase font-black tracking-widest leading-none">{post.tag}</p>
                    </div>
                </div>
                <button onClick={onReport} className="p-1 text-zinc-300 hover:text-red-500 transition-colors">
                    <Flag size={12} />
                </button>
            </div>
            <p className="text-xs font-medium mb-3">{post.content}</p>
            {post.image && (
                <div className="mb-3 rounded-xl overflow-hidden border border-black/5">
                    <img src={post.image} className="w-full object-cover max-h-52" referrerPolicy="no-referrer" />
                </div>
            )}
            <div className="flex items-center gap-4 pt-3 border-t border-black/5">
                <button onClick={onLike} className={`flex items-center gap-2 group transition-colors ${post.liked ? 'text-red-500' : 'text-zinc-400 hover:text-black'}`}>
                    <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} className="transition-transform group-active:scale-125" />
                    <span className="text-[9px] font-black uppercase">{post.likes}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors">
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-black uppercase">{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors ml-auto">
                    <Share2 size={16} />
                </button>
            </div>

            <AnimatePresence>
                {showComments && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-6 space-y-4">
                            {post.comments.map((c: any) => (
                                <div key={c.id} className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] uppercase font-black">{c.user[0]}</div>
                                    <div className="flex-1 bg-zinc-50 p-3 rounded-2xl border border-black/5">
                                        <p className="text-[10px] font-black uppercase mb-1">{c.user} <span className="text-zinc-400 ml-1 font-bold text-[8px]">{c.time}</span></p>
                                        <p className="text-[10px] font-medium leading-relaxed">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                            <form 
                                onSubmit={(e) => { e.preventDefault(); if (commentText.trim()) { onAddComment(commentText); setCommentText(''); } }}
                                className="flex gap-2"
                            >
                                <input 
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add comment..."
                                    className="flex-1 bg-zinc-50 border border-black/5 rounded-xl px-4 py-2 text-[10px] font-semibold focus:outline-none"
                                />
                                <button type="submit" className="p-2 accent-bg rounded-xl"><Send size={14} /></button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function ClubDetailView({ club, onBack, onReport, onUserReport, onDelete, onJoin, onMemberStatus }: any) {
  const isOwner = club.owner === 'You';
  const membership = club.members.find((m: any) => m.name === 'You');
  const isMember = !!membership && membership.status === 'approved';
  const isPending = !!membership && membership.status === 'pending';
  const [activeTab, setActiveTab] = useState<'info' | 'members'>('info');

  return (
    <div>
        <header className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full"><ChevronLeft size={18} /></button>
            <div className="flex gap-2">
                <button onClick={() => onReport(club)} className="px-3 py-1.5 bg-zinc-50 border border-black/5 rounded-full text-[8px] font-black uppercase flex items-center gap-1 text-zinc-400 hover:text-black"><Flag size={10} /> Report</button>
                {isOwner && <button onClick={onDelete} className="p-2 bg-red-50 text-red-500 rounded-full"><Trash2 size={18} /></button>}
            </div>
        </header>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-6">
            <img src={club.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-black uppercase text-brand-neon mb-1 tracking-widest">{club.tag}</p>
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{club.name}</h2>
            </div>
        </div>

        <div className="flex p-1 bg-zinc-100 rounded-xl mb-6">
            <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'info' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}>About</button>
            <button onClick={() => setActiveTab('members')} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'members' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}>Members ({club.members.length})</button>
        </div>

        {activeTab === 'info' ? (
            <div className="space-y-6">
                <div className="sport-card bg-zinc-50 p-4 border-l-4 border-l-brand-neon">
                    <p className="text-sm font-medium italic text-zinc-700">"{club.description}"</p>
                </div>
                
                {/* Unified Action Banner */}
                {isOwner ? (
                    <div className="w-full py-5 accent-bg border border-black/5 rounded-2xl text-[10px] font-black uppercase text-black italic text-center flex items-center justify-center gap-2 shadow-xl shadow-brand-neon/10">
                        <Shield size={16} /> You are the owner of this club
                    </div>
                ) : isMember ? (
                    <div className="w-full py-5 bg-black rounded-2xl text-[10px] font-black uppercase text-brand-neon italic text-center flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> You are a member
                    </div>
                ) : isPending ? (
                    <div className="w-full py-5 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase text-zinc-400 italic text-center flex items-center justify-center gap-2">
                        <Clock size={16} /> Request Pending Approval
                    </div>
                ) : (
                    <button 
                        onClick={onJoin} 
                        className="w-full py-5 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-95"
                    >
                        <UserPlus size={16} /> Join Club
                    </button>
                )}
            </div>
        ) : (
            <div className="space-y-3">
                {club.members.map((m: any) => (
                    <div key={m.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-black/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-black text-[10px] uppercase">{m.name[0]}</div>
                            <div>
                                <p className="text-xs font-black uppercase text-black italic leading-none mb-1">{m.name} {m.name === club.owner && <span className="text-[8px] accent-text ml-1">(Owner)</span>}</p>
                                <p className={`text-[8px] font-black uppercase tracking-widest ${m.status === 'approved' ? 'text-zinc-400' : 'text-red-500 animate-pulse'}`}>
                                    {m.status === 'approved' ? 'Member' : 'Waiting for Approval'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                             {m.name !== 'You' && <button onClick={() => onUserReport(m)} className="p-2 text-zinc-300 hover:text-black transition-colors" title="Report"><Flag size={14} /></button>}
                             {isOwner && m.name !== 'You' && (
                                <>
                                    {m.status === 'pending' ? (
                                        <button 
                                            onClick={() => onMemberStatus(m.id, 'approved')} 
                                            className="px-3 py-1.5 bg-brand-neon rounded-lg text-black text-[8px] font-black uppercase hover:scale-105 transition-transform"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => onMemberStatus(m.id, 'removed')} 
                                            className="p-2 text-zinc-300 hover:text-red-500 transition-colors" 
                                            title="Remove Member"
                                        >
                                            <LogOut size={14} />
                                        </button>
                                    )}
                                </>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}

function ReportFormView({ entity, onBack, onSubmit }: { entity: any, onBack: () => void, onSubmit: (report: any) => void }) {
  const [category, setCategory] = useState('');
  const [narrative, setNarrative] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  const categories = ['Harassment', 'Spam', 'Misleading', 'Safety', 'Inappropriate', 'Other'];

  const handleSubmit = () => {
    if (!category || !narrative) return;
    setIsSubmitting(true);
    setTimeout(() => {
        onSubmit({
            id: Date.now(),
            target: `${entity.type === 'post' ? 'Post' : entity.type === 'user' ? 'User' : 'Club'}: ${entity.data.user || entity.data.name}`,
            category,
            narrative,
            status: 'Pending',
            date: 'Today',
            attachment
        });
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Report {entity.type}</h2>
      </header>

      <div className="space-y-6">
        <div className="sport-card bg-zinc-50 p-4 border-black/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-200 overflow-hidden flex items-center justify-center">
                {entity.data.avatar ? <img src={entity.data.avatar} className="w-full h-full object-cover" /> : entity.data.image ? <img src={entity.data.image} className="w-full h-full object-cover" /> : <Shield size={24} className="text-zinc-400" />}
            </div>
            <div>
                <h3 className="text-xs font-black uppercase text-black leading-none mb-1">{entity.data.user || entity.data.name}</h3>
                <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-widest shrink-0">Entity type: {entity.type}</p>
            </div>
        </div>

        <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block">Reason</label>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight border transition-all ${
                            category === cat ? 'bg-black text-brand-neon border-black' : 'bg-white text-zinc-400 border-black/5'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Tell us more</label>
            <textarea 
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Briefly describe the violation..."
                className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-4 text-sm font-medium focus:outline-none min-h-[120px] resize-none"
            />
        </div>

        <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Upload Evidence</label>
            <div className="flex items-center gap-4">
                {attachment ? (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-black/5">
                        <img src={attachment} className="w-full h-full object-cover" />
                        <button onClick={() => setAttachment(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"><X size={10} /></button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setAttachment('https://images.unsplash.com/photo-1593787424264-e93921a305f1?auto=format&fit=crop&q=80&w=200')}
                        className="w-20 h-20 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:border-black/20 hover:text-black transition-all"
                    >
                        <Paperclip size={20} />
                        <span className="text-[8px] font-black uppercase">Attach</span>
                    </button>
                )}
                <p className="text-[9px] text-zinc-400 italic">Add screenshot or image as proof.</p>
            </div>
        </div>

        <button 
            onClick={handleSubmit}
            disabled={!category || !narrative || isSubmitting}
            className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${category && narrative ? 'accent-bg shadow-xl shadow-brand-neon/20' : 'bg-zinc-100 text-zinc-300'}`}
        >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REPORT'}
        </button>
      </div>
    </div>
  );
}

function NotificationsView({ notifications, setNotifications, reports }: { notifications: any[], setNotifications: any, reports: any[] }) {
    const [activeTab, setActiveTab] = useState<'notifs' | 'reports'>('notifs');

    return (
        <div className="pb-24">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none mb-8">Alerts</h2>
            
            <div className="flex p-1 bg-zinc-100 rounded-xl mb-8">
                <button 
                    onClick={() => setActiveTab('notifs')}
                    className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'notifs' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                >
                    Activity
                </button>
                <button 
                    onClick={() => setActiveTab('reports')}
                    className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                >
                    My Reports ({reports.length})
                </button>
            </div>

            {activeTab === 'notifs' ? (
                <div className="space-y-4">
                    {notifications.map(notif => (
                        <div 
                            key={notif.id}
                            className={`sport-card p-4 flex items-start gap-4 transition-all ${notif.read ? 'bg-zinc-50 border-black/5 opacity-60' : 'bg-white border-brand-neon ring-1 ring-brand-neon/10'}`}
                        >
                            <div className={`p-2 rounded-xl shrink-0 ${
                                notif.type === 'join_request' ? 'bg-blue-50 text-blue-500' :
                                notif.type === 'like' ? 'bg-red-50 text-red-500' :
                                notif.type === 'booking' ? 'bg-black text-brand-neon' :
                                'bg-green-50 text-green-500'
                            }`}>
                                {notif.type === 'join_request' ? <UserPlus size={18} /> :
                                 notif.type === 'like' ? <Heart size={18} /> :
                                 notif.type === 'booking' ? <Calendar size={18} /> :
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
            ) : (
                <div className="space-y-4">
                    {reports.map(report => (
                        <div key={report.id} className="sport-card p-4 bg-zinc-50 border-black/5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{report.category}</p>
                                    <h4 className="text-xs font-black uppercase text-black leading-none">{report.target}</h4>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${report.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{report.status}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 italic mb-3">"{report.narrative}"</p>
                            <div className="flex items-center justify-between border-t border-black/5 pt-3">
                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tight">{report.date}</span>
                                {report.attachment && <Paperclip size={12} className="text-zinc-400" />}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function CreateClubForm({ onBack, onSubmit }: { onBack: () => void, onSubmit: (n: string, d: string) => void }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-8 hover:text-black transition-colors"><ChevronLeft size={14} /> Back</button>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black mb-8 leading-none">New Club</h2>
            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Club Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Quezon Smashers" className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-5 px-6 font-black uppercase italic text-black focus:outline-none" />
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What's your club about?" className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-5 px-6 font-semibold text-zinc-600 focus:outline-none min-h-[120px] resize-none" />
                </div>
                <button onClick={() => onSubmit(name, description)} disabled={!name || !description} className={`w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${name && description ? 'accent-bg shadow-brand-neon/20' : 'bg-zinc-100 text-zinc-300'}`}>Create Club</button>
            </div>
        </div>
    );
}

function MatchmakerView({ myEvents, onJoinEvent }: { myEvents: any[], onJoinEvent: (event: any) => void }) {
    const [mode, setMode] = useState<'browse' | 'openPlay' | 'tournaments'>('browse');
    const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [tournamentView, setTournamentView] = useState<'info' | 'bracket' | 'schedule'>('info');
    const [registeredTournaments, setRegisteredTournaments] = useState<number[]>([]);
    const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Pro'>('Intermediate');
    const [selectedSport, setSelectedSport] = useState('Badminton');
    const [searchLocation, setSearchLocation] = useState('');
    const [sportFilter, setSportFilter] = useState('All');
    const [isSearching, setIsSearching] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];
    const sports = ['Badminton', 'Pickleball', 'Table Tennis', 'Tennis'];
    const filterOptions = ['All', ...sports];

    const tournaments = [
        { id: 1, name: "Summer Smash 2024", sport: "Badminton", date: "June 15-20", status: "Open", prize: "₱25,000", location: "Smash Arena", description: "The biggest amateur badminton tournament of the summer." },
        { id: 2, name: "Pickleball Masters", sport: "Pickleball", date: "July 02", status: "Closing Soon", prize: "₱50,000", location: "Apex Hub", description: "Elite-level pickleball competition for the community." }
    ];

    const selectedTournament = tournaments.find(t => t.id === selectedTournamentId);
    const selectedEvent = OPEN_PLAYS.find(e => e.id === selectedEventId);

    const isAlreadyJoined = selectedEventId && myEvents.some(e => e.id === selectedEventId && e.type === 'openPlay');

    const filteredEvents = OPEN_PLAYS.filter(e => {
        const matchesSport = sportFilter === 'All' || e.sport === sportFilter;
        const matchesLocation = e.location.toLowerCase().includes(searchLocation.toLowerCase());
        return matchesSport && matchesLocation;
    });

    const bracketData = [
        { round: "Quarter-Finals", matches: [
            { id: 1, p1: "Dave C.", p2: "John D.", score: "21-18", winner: "Dave C." },
            { id: 2, p1: "Maria S.", p2: "Alex K.", score: "Pending", winner: null }
        ]},
        { round: "Semi-Finals", matches: [
            { id: 3, p1: "Dave C.", p2: "TBD", score: "Upcoming", winner: null }
        ]}
    ];

    const scheduleData = [
        { id: 1, time: "10:00 AM", court: "Court 1", sport: "Badminton", match: "Dave C. vs John D." },
        { id: 2, time: "11:30 AM", court: "Court 3", sport: "Pickleball", match: "Open Play Finals" }
    ];

    const handleRegister = (id: number) => {
        setRegisteredTournaments(prev => [...prev, id]);
        alert("Registration Successful for " + tournaments.find(t => t.id === id)?.name);
    };

    const handleStartMatching = (customType?: string) => {
        setIsSearching(true);
        setSuggestion(null);
        setTimeout(() => {
            setIsSearching(false);
            setSuggestion({
                id: Date.now(),
                title: `${selectedSport} ${customType || 'Open Play'}`,
                players: Math.floor(Math.random() * 8) + 4,
                maxPlayers: 16,
                sport: selectedSport,
                level: skillLevel,
                location: "Apex Hub - Quezon City",
                time: "In 15 minutes",
                date: "Today",
                venue: "Apex Hub Main Court",
                description: "AI-suggested match based on your skill level and availability.",
                type: customType || "Social Mix-in"
            });
        }, 2000);
    };

    const confirmJoin = (event: any) => {
        const eventToJoin = {
            id: event.id || Date.now(),
            title: event.title || `${event.sport} Session`,
            sport: event.sport,
            date: event.date || "Today",
            time: event.time || "TBD",
            venue: event.venue || "TBD",
            location: event.location || "TBD",
            status: "upcoming",
            players: (event.players || 0) + 1,
            maxPlayers: event.maxPlayers || event.maxSlots || 4,
            type: 'openPlay'
        };
        onJoinEvent(eventToJoin);
        setShowConfirm(false);
        setSuggestion(null);
        setSelectedEventId(null);
    };

    return (
        <div className="pb-24">
            {/* Mode Switcher */}
            <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner mb-6">
                <button 
                    onClick={() => { setMode('browse'); setSuggestion(null); setSelectedTournamentId(null); }}
                    className={`flex-1 py-3 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${mode === 'browse' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                >
                    Browse
                </button>
                <button 
                    onClick={() => { setMode('openPlay'); setSuggestion(null); setSelectedTournamentId(null); setSelectedEventId(null); }}
                    className={`flex-1 py-3 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${mode === 'openPlay' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                >
                    Matchmaker
                </button>
                <button 
                    onClick={() => { setMode('tournaments'); setSuggestion(null); }}
                    className={`flex-1 py-3 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${mode === 'tournaments' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
                >
                    Tournaments
                </button>
            </div>

            {mode === 'browse' ? (
                <div className="space-y-6">
                    {!selectedEventId ? (
                        <>
                            {/* Search & Filter */}
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Search by location..." 
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        className="w-full bg-zinc-50 border border-black/5 rounded-xl py-2 pl-10 pr-4 text-[11px] font-semibold focus:outline-none focus:ring-1 ring-brand-neon/20 transition-all"
                                    />
                                </div>
                                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                                    {filterOptions.map(opt => (
                                        <button 
                                            key={opt}
                                            onClick={() => setSportFilter(opt)}
                                            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${sportFilter === opt ? 'bg-black text-brand-neon border-black' : 'bg-white text-zinc-400 border-black/5'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {filteredEvents.map(event => (
                                    <div 
                                        key={event.id} 
                                        onClick={() => setSelectedEventId(event.id)}
                                        className="sport-card p-2 flex items-center justify-between border-black/5 bg-white cursor-pointer hover:border-brand-neon group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-black group-hover:bg-brand-neon transition-colors">
                                                <Activity size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase italic text-black leading-none mb-1">{event.sport} Session</h4>
                                                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{event.location}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-black leading-none mb-1">{event.time}</p>
                                            <p className="text-[8px] font-black text-brand-neon uppercase tracking-widest">{event.slots} slots</p>
                                        </div>
                                    </div>
                                ))}
                                {filteredEvents.length === 0 && (
                                    <div className="py-12 text-center">
                                        <p className="text-sm font-black uppercase text-zinc-300 italic">No events found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <button onClick={() => setSelectedEventId(null)} className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-black transition-colors">
                                <ChevronLeft size={16} /> Back to List
                            </button>

                            <div className="p-6 bg-white border border-brand-neon/40 rounded-[1.5rem] relative overflow-hidden shadow-xl shadow-brand-neon/10">
                                <div className="absolute top-0 right-0 p-2 bg-brand-neon text-black text-[8px] font-black uppercase tracking-widest italic rounded-bl-xl shadow-lg">
                                    {selectedEvent?.level} Recommended
                                </div>
                                <h3 className="text-2xl font-black italic text-black uppercase tracking-tighter leading-none mb-2">{selectedEvent?.sport} Open Play</h3>
                                <div className="flex items-center gap-4 text-zinc-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-neon" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{selectedEvent?.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-brand-neon" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{selectedEvent?.time}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0 border border-black/5">
                                            <TrendingUp size={16} className="text-brand-neon" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Venue</p>
                                            <p className="text-sm font-bold text-black uppercase italic leading-none mb-1">{selectedEvent?.venue}</p>
                                            <p className="text-[10px] text-zinc-500 font-medium">{selectedEvent?.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0 border border-black/5">
                                            <MessageSquare size={16} className="text-brand-neon" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">About</p>
                                            <p className="text-xs font-medium text-zinc-600 italic leading-relaxed">"{selectedEvent?.description}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[10px] font-black text-black uppercase tracking-widest">Participants ({selectedEvent?.participants.length}/{selectedEvent?.maxSlots})</h4>
                                    <div className="flex -space-x-2">
                                        {selectedEvent?.participants.map((p, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                                                <img src={p.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {selectedEvent?.participants.map((p, i) => (
                                        <div key={i} className="sport-card p-3 flex items-center gap-3 bg-zinc-50 border-black/5">
                                            <img src={p.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                                            <span className="text-xs font-black uppercase italic">{p.name}</span>
                                            <span className="ml-auto text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">Joined</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    if (isAlreadyJoined) return;
                                    setShowConfirm(true);
                                }}
                                disabled={isAlreadyJoined}
                                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 transition-all ${isAlreadyJoined ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'accent-bg shadow-brand-neon/20 hover:scale-[1.01] active:scale-95'}`}
                            >
                                {isAlreadyJoined ? (
                                    <><Check size={16} /> Already Joined</>
                                ) : (
                                    <><Zap size={16} /> Join This Session</>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            ) : mode === 'tournaments' ? (
                <div>
                    {!selectedTournamentId ? (
                        <div className="space-y-4">
                            <div className="sport-card bg-zinc-50 shadow-none p-4 mb-2 border-black/5">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Upcoming Events</h4>
                                <p className="text-xs font-black italic">Major championships and community cups.</p>
                            </div>
                            {tournaments.map(t => (
                                <div key={t.id} onClick={() => { setSelectedTournamentId(t.id); setTournamentView('info'); }} className="sport-card p-4 bg-white flex items-center justify-between border-black/10 cursor-pointer hover:border-brand-neon group transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-black/5 text-black group-hover:bg-brand-neon transition-colors"><Award size={24} /></div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase italic text-black leading-none mb-1">{t.name}</h4>
                                            <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-widest">{t.sport} • {t.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <ChevronRight size={18} className="text-zinc-300 group-hover:text-black transition-colors" />
                                        {registeredTournaments.includes(t.id) && (
                                            <span className="text-[7px] font-black text-brand-neon uppercase tracking-tight mt-1 bg-black px-1 rounded">Registered</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <button onClick={() => setSelectedTournamentId(null)} className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-black transition-colors">
                                <ChevronLeft size={16} /> All Tournaments
                            </button>

                            <div className="sport-card p-5 bg-black border-brand-neon/20">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-black italic text-brand-neon uppercase tracking-tighter leading-none mb-1">{selectedTournament?.name}</h3>
                                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{selectedTournament?.sport} • {selectedTournament?.location}</p>
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Prize Pool</p>
                                        <p className="text-xs font-black text-white italic">{selectedTournament?.prize}</p>
                                    </div>
                                </div>

                                <div className="flex p-0.5 bg-white/5 rounded-xl border border-white/5">
                                    <button onClick={() => setTournamentView('info')} className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${tournamentView === 'info' ? 'bg-brand-neon text-black' : 'text-zinc-500'}`}>Details</button>
                                    <button onClick={() => setTournamentView('bracket')} className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${tournamentView === 'bracket' ? 'bg-brand-neon text-black' : 'text-zinc-500'}`}>Bracket</button>
                                    <button onClick={() => setTournamentView('schedule')} className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${tournamentView === 'schedule' ? 'bg-brand-neon text-black' : 'text-zinc-500'}`}>Schedule</button>
                                </div>
                            </div>

                            {tournamentView === 'info' && (
                                <div className="space-y-6">
                                    <div className="sport-card bg-zinc-50 p-4 border-black/5">
                                        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">About Tournament</h4>
                                        <p className="text-sm font-medium italic text-zinc-700 leading-relaxed">"{selectedTournament?.description}"</p>
                                    </div>
                                    
                                    {registeredTournaments.includes(selectedTournamentId) ? (
                                        <div className="w-full py-5 bg-black rounded-2xl text-[10px] font-black uppercase text-brand-neon italic text-center flex items-center justify-center gap-2 border border-brand-neon/30">
                                            <CheckCircle size={16} /> Registration Confirmed
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleRegister(selectedTournamentId!)}
                                            className="w-full py-5 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-95"
                                        >
                                            <Award size={16} /> Register Now
                                        </button>
                                    )}
                                </div>
                            )}

                            {tournamentView === 'bracket' && (
                                <div className="space-y-6">
                                    {bracketData.map((round, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{round.round}</h4>
                                            {round.matches.map(m => (
                                                <div key={m.id} className="sport-card p-3 bg-zinc-900 border-zinc-800">
                                                    <div className={`flex justify-between items-center mb-2 pb-2 border-b border-white/5 ${m.winner === m.p1 ? 'text-brand-neon' : 'text-zinc-400'}`}>
                                                        <span className="text-[10px] font-black uppercase italic">{m.p1}</span>
                                                        <span className="text-[10px] font-black">{m.score === 'Pending' ? '-' : m.score.split('-')[0]}</span>
                                                    </div>
                                                    <div className={`flex justify-between items-center ${m.winner === m.p2 ? 'text-brand-neon' : 'text-zinc-400'}`}>
                                                        <span className="text-[10px] font-black uppercase italic">{m.p2}</span>
                                                        <span className="text-[10px] font-black">{m.score === 'Pending' ? '-' : m.score.split('-')[1]}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tournamentView === 'schedule' && (
                                <div className="space-y-4">
                                    {scheduleData.map(s => (
                                        <div key={s.id} className="sport-card p-4 flex items-center gap-4 border-black/5 bg-zinc-50">
                                            <div className="w-16 h-12 bg-white rounded-xl flex flex-col items-center justify-center border border-black/5 shrink-0">
                                                <span className="text-[10px] font-black text-black leading-none">{s.time.split(' ')[0]}</span>
                                                <span className="text-[8px] font-black text-zinc-400 uppercase">{s.time.split(' ')[1]}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="text-xs font-black uppercase italic text-black leading-none mb-1">{s.match}</h5>
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{s.sport} • {s.court}</p>
                                            </div>
                                            <div className="p-2 bg-white rounded-lg text-zinc-300"><Clock size={16} /></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-5">
                    {!suggestion && !isSearching && (
                        <div className="space-y-4">
                            <div className="sport-card bg-black border-brand-neon/40 p-4 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 text-brand-neon opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap size={32} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase italic text-brand-neon tracking-widest mb-0.5">Unified Matchmaker</h4>
                                <p className="text-[9px] text-zinc-400 italic">Finding games based on your profile.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">1. Preferred Sport</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {sports.map(s => (
                                            <button 
                                                key={s}
                                                onClick={() => setSelectedSport(s)}
                                                className={`py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${selectedSport === s ? 'accent-bg border-black' : 'bg-white text-zinc-400 border-black/5'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">2. Skill Level</label>
                                    <div className="grid grid-cols-1 gap-1.5">
                                        {levels.map(l => (
                                            <button 
                                                key={l}
                                                onClick={() => setSkillLevel(l as any)}
                                                className={`px-3 py-2 rounded-xl text-left flex items-center justify-between border transition-all ${skillLevel === l ? 'bg-black text-brand-neon border-black' : 'bg-white text-zinc-500 border-black/5'}`}
                                            >
                                                <span className="text-[9px] font-black uppercase">{l}</span>
                                                {skillLevel === l && <Zap size={12} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleStartMatching()}
                                    className="w-full py-4 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-neon/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-95 group mt-2"
                                >
                                    <Zap size={14} className="group-hover:animate-pulse" /> Find Matches
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Searching State */}
                    {isSearching && (
                        <div className="flex flex-col items-center justify-center py-16 space-y-5">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-brand-neon/10 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-neon rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap size={28} className="text-brand-neon animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-black uppercase italic text-black mb-1">Scanning Sessions...</p>
                                <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Matching {selectedSport} • {skillLevel}</p>
                            </div>
                        </div>
                    )}

                    {/* Suggestion Card */}
                    <AnimatePresence>
                        {suggestion && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="sport-card p-6 border-brand-neon/40 relative overflow-hidden bg-white shadow-2xl shadow-brand-neon/10"
                            >
                                <div className="absolute top-0 right-0 p-2 bg-brand-neon text-black text-[8px] font-black uppercase tracking-widest italic rounded-bl-xl shadow-lg">
                                    {suggestion.level} Recommended
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-neon flex items-center justify-center text-black shrink-0">
                                        <Users size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-brand-neon uppercase tracking-widest mb-1">Match Suggested!</p>
                                        <h4 className="text-xl font-black italic uppercase text-black tracking-tighter leading-none">{suggestion.title}</h4>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8 bg-zinc-50 p-4 rounded-xl border border-black/5">
                                    <div className="flex items-center gap-3 text-zinc-600">
                                        <Clock size={14} className="text-brand-neon" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{suggestion.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-600">
                                        <Trophy size={14} className="text-brand-neon" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{suggestion.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-600">
                                        <Activity size={14} className="text-brand-neon" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{suggestion.players} Players Waiting</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { setSuggestion(null); }}
                                        className="flex-1 py-4 bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-zinc-400 rounded-2xl hover:bg-black transition-colors"
                                    >
                                        Decline
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setShowConfirm(true);
                                        }}
                                        className="flex-[2] py-4 accent-bg text-[10px] font-black uppercase tracking-widest text-black rounded-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-brand-neon/20"
                                    >
                                        Accept Match
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="sport-card p-8 bg-white max-w-[340px] w-full shadow-2xl relative border-brand-neon/20"
                        >
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="absolute top-4 right-4 text-zinc-300 hover:text-black transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-brand-neon rounded-2xl flex items-center justify-center text-black mx-auto mb-6 shadow-lg shadow-brand-neon/40">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-2xl font-black italic uppercase text-black leading-none mb-2">Confirm Participation</h3>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-relaxed">
                                    Are you ready to join the {selectedEvent?.sport || suggestion?.sport} session?
                                </p>
                            </div>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => confirmJoin(selectedEvent || suggestion)}
                                    className="w-full py-5 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-neon/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Yes, Count Me In!
                                </button>
                                <button 
                                    onClick={() => setShowConfirm(false)}
                                    className="w-full py-5 bg-zinc-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-100 transition-all font-black"
                                >
                                    Decide Later
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
