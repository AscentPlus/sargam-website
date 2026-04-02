const DataStore = {
  /* ---- Default seed data ---- */
  _defaults: {
    gallery: [
      { id: 1, url: "assets/gallery/1.jpeg", caption: "Inaguration" },
      { id: 2, url: "assets/gallery/2.jpeg", caption: "Inaguration" },
      { id: 3, url: "assets/gallery/3.jpeg", caption: "Inaguration" },
      { id: 4, url: "assets/gallery/4.jpeg", caption: "Inaguration" },
      { id: 5, url: "assets/gallery/5.jpeg", caption: "Inaguration" },
      { id: 6, url: "assets/gallery/6.jpeg", caption: "Inaguration" },
      { id: 7, url: "assets/gallery/7.jpeg", caption: "Inaguration" },
      { id: 8, url: "assets/gallery/8.jpeg", caption: "Inaguration" },
      { id: 9, url: "assets/gallery/9.jpeg", caption: "Inaguration" },
      { id: 10, url: "assets/gallery/10.jpeg", caption: "Inaguration" },
      { id: 11, url: "assets/gallery/11.jpeg", caption: "Inaguration" },
      { id: 12, url: "assets/gallery/12.jpeg", caption: "Inaguration" },
      { id: 13, url: "assets/gallery/13.jpeg", caption: "Inaguration" },
      { id: 14, url: "assets/gallery/14.jpeg", caption: "Inaguration" },
      { id: 15, url: "assets/gallery/15.jpeg", caption: "Inaguration" },
      { id: 16, url: "assets/gallery/16.jpeg", caption: "Inaguration" },
      { id: 17, url: "assets/gallery/17.jpeg", caption: "Inaguration" },
      { id: 18, url: "assets/gallery/18.jpeg", caption: "Inaguration" },
      { id: 19, url: "assets/gallery/19.jpeg", caption: "Inaguration" },
      { id: 20, url: "assets/gallery/20.jpeg", caption: "Inaguration" },
      { id: 21, url: "assets/gallery/21.jpeg", caption: "Inaguration" },
      { id: 22, url: "assets/gallery/22.jpeg", caption: "Inaguration" },
      { id: 23, url: "assets/gallery/23.jpeg", caption: "Inaguration" },
      { id: 24, url: "assets/gallery/24.jpeg", caption: "Inaguration" },
      { id: 25, url: "assets/gallery/25.jpeg", caption: "Inaguration" },
      { id: 26, url: "assets/gallery/26.jpeg", caption: "Inaguration" },
      { id: 27, url: "assets/gallery/27.jpeg", caption: "Inaguration" },
      { id: 28, url: "assets/gallery/28.jpeg", caption: "Inaguration" },
      { id: 29, url: "assets/gallery/29.jpeg", caption: "Inaguration" },
      { id: 30, url: "assets/gallery/30.jpeg", caption: "Inaguration" }
    ],
    gallery2: [
      { id: 1, url: "assets/gallery_2/1.jpeg", caption: "Remembrance" },
      { id: 2, url: "assets/gallery_2/2.jpeg", caption: "Remembrance" },
      { id: 3, url: "assets/gallery_2/3.jpeg", caption: "Remembrance" },
      { id: 4, url: "assets/gallery_2/4.jpeg", caption: "Remembrance" },
      { id: 5, url: "assets/gallery_2/5.jpeg", caption: "Remembrance" },
      { id: 6, url: "assets/gallery_2/6.jpeg", caption: "Remembrance" },
      { id: 7, url: "assets/gallery_2/7.jpeg", caption: "Remembrance" },
      { id: 8, url: "assets/gallery_2/8.jpeg", caption: "Remembrance" },
      { id: 9, url: "assets/gallery_2/9.jpeg", caption: "Remembrance" },
      { id: 10, url: "assets/gallery_2/10.jpeg", caption: "Remembrance" },
      { id: 11, url: "assets/gallery_2/11.jpeg", caption: "Remembrance" },
      { id: 12, url: "assets/gallery_2/12.jpeg", caption: "Remembrance" },
      { id: 13, url: "assets/gallery_2/13.jpeg", caption: "Remembrance" },
      { id: 14, url: "assets/gallery_2/14.jpeg", caption: "Remembrance" },
      { id: 15, url: "assets/gallery_2/15.jpeg", caption: "Remembrance" },
      { id: 16, url: "assets/gallery_2/16.jpeg", caption: "Remembrance" },
      { id: 17, url: "assets/gallery_2/17.jpeg", caption: "Remembrance" },
      { id: 18, url: "assets/gallery_2/18.jpeg", caption: "Remembrance" },
      { id: 19, url: "assets/gallery_2/19.jpeg", caption: "Remembrance" },
      { id: 20, url: "assets/gallery_2/20.jpeg", caption: "Remembrance" },
      { id: 21, url: "assets/gallery_2/21.jpeg", caption: "Remembrance" },
      { id: 22, url: "assets/gallery_2/22.jpeg", caption: "Remembrance" },
      { id: 23, url: "assets/gallery_2/23.jpeg", caption: "Remembrance" },
      { id: 24, url: "assets/gallery_2/24.jpeg", caption: "Remembrance" },
      { id: 25, url: "assets/gallery_2/25.jpeg", caption: "Remembrance" },
      { id: 26, url: "assets/gallery_2/26.jpeg", caption: "Remembrance" },
      { id: 27, url: "assets/gallery_2/27.jpeg", caption: "Remembrance" },
      { id: 28, url: "assets/gallery_2/28.jpeg", caption: "Remembrance" },
      { id: 29, url: "assets/gallery_2/29.jpeg", caption: "Remembrance" },
      { id: 30, url: "assets/gallery_2/30.jpeg", caption: "Remembrance" },
      { id: 31, url: "assets/gallery_2/31.jpeg", caption: "Remembrance" },
      { id: 32, url: "assets/gallery_2/32.jpeg", caption: "Remembrance" },
      { id: 33, url: "assets/gallery_2/33.jpeg", caption: "Remembrance" },
      { id: 34, url: "assets/gallery_2/34.jpeg", caption: "Remembrance" },
      { id: 35, url: "assets/gallery_2/35.jpeg", caption: "Remembrance" },
      { id: 36, url: "assets/gallery_2/36.jpeg", caption: "Remembrance" },
      { id: 37, url: "assets/gallery_2/37.jpeg", caption: "Remembrance" },
      { id: 38, url: "assets/gallery_2/38.jpeg", caption: "Remembrance" },
      { id: 39, url: "assets/gallery_2/39.jpeg", caption: "Remembrance" },
      { id: 40, url: "assets/gallery_2/40.jpeg", caption: "Remembrance" }
    ],
    donations: [],
    messages: []
  },

  /* ---- Helpers ---- */
  _get(key) {
    const raw = localStorage.getItem('sargam_v2_' + key);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Bust cache if old static captions are stuck in localStorage
      if (key === 'gallery2' && parsed.length > 0 && parsed[0].caption === 'New Event') {
        this._set(key, this._defaults[key]);
        return this._defaults[key];
      }
      if (key === 'gallery' && parsed.length > 0 && parsed[0].caption === 'Sargam Foundation Gallery') {
        this._set(key, this._defaults[key]);
        return this._defaults[key];
      }
      return parsed;
    }
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
  getGallery2() { return this._get('gallery2'); },

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
