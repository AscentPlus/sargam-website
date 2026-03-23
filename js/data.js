/* ============================================
   DATA STORE — localStorage-based CMS data
   ============================================ */

const DataStore = {
  /* ---- Default seed data ---- */
  _defaults: {
    events: [
      {
        id: 1,
        title: "Community Health Camp",
        date: "2026-03-20",
        description: "Free medical check-up and health awareness drive for underprivileged families in Alappuzha district.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
        type: "upcoming"
      },
      {
        id: 2,
        title: "Children's Education Workshop",
        date: "2026-04-05",
        description: "Interactive learning sessions, creative arts, and career guidance for school students from rural areas.",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
        type: "upcoming"
      },
      {
        id: 3,
        title: "Annual Food Distribution Drive",
        date: "2026-04-15",
        description: "Yearly initiative to provide grocery kits and essential supplies to 500+ families in need across Kerala.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
        type: "upcoming"
      },
      {
        id: 4,
        title: "Women Empowerment Summit",
        date: "2025-12-10",
        description: "Skill development and self-employment training program for women in rural communities.",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop",
        type: "past"
      },
      {
        id: 5,
        title: "Clean Alappuzha Campaign",
        date: "2025-11-05",
        description: "Environmental awareness and waterway cleaning drive with 200+ volunteers participating.",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop",
        type: "past"
      },
      {
        id: 6,
        title: "Flood Relief Distribution",
        date: "2025-09-18",
        description: "Emergency relief materials and rehabilitation support for flood-affected families in Kerala.",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
        type: "past"
      }
    ],
    gallery: [
      { id: 1, url: "assets/gallery/1.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 2, url: "assets/gallery/2.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 3, url: "assets/gallery/3.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 4, url: "assets/gallery/4.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 5, url: "assets/gallery/5.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 6, url: "assets/gallery/6.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 7, url: "assets/gallery/7.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 8, url: "assets/gallery/8.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 9, url: "assets/gallery/9.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 10, url: "assets/gallery/10.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 11, url: "assets/gallery/11.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 12, url: "assets/gallery/12.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 13, url: "assets/gallery/13.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 14, url: "assets/gallery/14.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 15, url: "assets/gallery/15.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 16, url: "assets/gallery/16.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 17, url: "assets/gallery/17.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 18, url: "assets/gallery/18.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 19, url: "assets/gallery/19.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 20, url: "assets/gallery/20.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 21, url: "assets/gallery/21.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 22, url: "assets/gallery/22.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 23, url: "assets/gallery/23.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 24, url: "assets/gallery/24.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 25, url: "assets/gallery/25.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 26, url: "assets/gallery/26.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 27, url: "assets/gallery/27.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 28, url: "assets/gallery/28.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 29, url: "assets/gallery/29.jpeg", caption: "Sargam Foundation Gallery" },
      { id: 30, url: "assets/gallery/30.jpeg", caption: "Sargam Foundation Gallery" }
    ],
    donations: [],
    messages: []
  },

  /* ---- Helpers ---- */
  _get(key) {
    const raw = localStorage.getItem('sargam_v2_' + key);
    if (raw) return JSON.parse(raw);
    // Seed defaults on first load
    this._set(key, this._defaults[key]);
    return this._defaults[key];
  },

  _set(key, data) {
    localStorage.setItem('sargam_v2_' + key, JSON.stringify(data));
  },

  _nextId(list) {
    return list.length ? Math.max(...list.map(i => i.id)) + 1 : 1;
  },

  /* ---- Events ---- */
  getEvents() { return this._get('events'); },
  getUpcoming() { return this.getEvents().filter(e => e.type === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date)); },
  getOngoing() { return this.getEvents().filter(e => e.type === 'ongoing').sort((a, b) => new Date(a.date) - new Date(b.date)); },
  getPast() { return this.getEvents().filter(e => e.type === 'past').sort((a, b) => new Date(b.date) - new Date(a.date)); },

  addEvent(ev) {
    const list = this.getEvents();
    ev.id = this._nextId(list);
    list.push(ev);
    this._set('events', list);
    return ev;
  },

  updateEvent(id, updates) {
    let list = this.getEvents();
    list = list.map(e => e.id === id ? { ...e, ...updates } : e);
    this._set('events', list);
  },

  deleteEvent(id) {
    this._set('events', this.getEvents().filter(e => e.id !== id));
  },

  /* ---- Gallery ---- */
  getGallery() { return this._get('gallery'); },

  addPhoto(photo) {
    const list = this.getGallery();
    photo.id = this._nextId(list);
    list.unshift(photo);
    this._set('gallery', list);
    return photo;
  },

  deletePhoto(id) {
    this._set('gallery', this.getGallery().filter(p => p.id !== id));
  },

  /* ---- Donations ---- */
  getDonations() { return this._get('donations'); },

  addDonation(d) {
    const list = this.getDonations();
    d.id = this._nextId(list);
    d.date = new Date().toISOString();
    list.unshift(d);
    this._set('donations', list);
    return d;
  },

  /* ---- Messages ---- */
  getMessages() { return this._get('messages'); },

  addMessage(msg) {
    const list = this.getMessages();
    msg.id = this._nextId(list);
    msg.date = new Date().toISOString();
    list.unshift(msg); // Latest first
    this._set('messages', list);
    return msg;
  },

  deleteMessage(id) {
    this._set('messages', this.getMessages().filter(m => m.id !== id));
  }
};
