/* ============================================
   ADMIN.JS — Admin panel CRUD logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const loginGate = document.getElementById('loginGate');
    const dashboard = document.getElementById('dashboard');

    // Check if already logged in
    if (sessionStorage.getItem('sargam_admin') === 'true') {
        showDashboard();
    }

    /* ---- Login ---- */
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;

        if (user === 'admin' && pass === 'admin123') {
            sessionStorage.setItem('sargam_admin', 'true');
            showDashboard();
        } else {
            document.getElementById('loginError').textContent = 'Invalid username or password.';
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('sargam_admin');
        loginGate.style.display = '';
        dashboard.style.display = 'none';
    });

    function showDashboard() {
        loginGate.style.display = 'none';
        dashboard.style.display = 'flex';
        loadEvents();
        loadGallery();
        loadDonations();
        loadMessages();
    }

    /* ---- Tab Switching ---- */
    const tabs = {
        events: 'Manage Events',
        gallery: 'Manage Gallery',
        donations: 'Donation Records',
        messages: 'Contact Messages'
    };

    document.querySelectorAll('.sidebar-link[data-tab]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;

            // Active link
            document.querySelectorAll('.sidebar-link[data-tab]').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show tab
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');

            // Title
            document.getElementById('tabTitle').textContent = tabs[tab];

            // Close mobile sidebar
            document.querySelector('.admin-sidebar').classList.remove('open');
        });
    });

    /* ---- Mobile Sidebar Toggle ---- */
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.admin-sidebar').classList.toggle('open');
        });
    }

    /* ============ EVENTS CRUD ============ */
    const eventModal = document.getElementById('eventModal');
    const eventForm = document.getElementById('eventForm');
    let editingEventId = null;

    document.getElementById('addEventBtn').addEventListener('click', () => {
        editingEventId = null;
        document.getElementById('eventModalTitle').textContent = 'Add New Event';
        eventForm.reset();
        document.getElementById('eventId').value = '';
        eventModal.classList.add('active');
    });

    document.getElementById('eventModalClose').addEventListener('click', () => {
        eventModal.classList.remove('active');
    });

    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) eventModal.classList.remove('active');
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDesc').value,
            image: document.getElementById('eventImage').value
        };

        if (editingEventId) {
            DataStore.updateEvent(editingEventId, eventData);
        } else {
            DataStore.addEvent(eventData);
        }

        eventModal.classList.remove('active');
        loadEvents();
    });

    function loadEvents() {
        const tbody = document.getElementById('eventsTableBody');
        const events = DataStore.getEvents();

        if (!events.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No events yet. Click "Add Event" to create one.</td></tr>';
            return;
        }

        tbody.innerHTML = events.map(ev => `
      <tr>
        <td><img src="${ev.image}" alt="${ev.title}"></td>
        <td><strong>${ev.title}</strong></td>
        <td>${formatDate(ev.date)}</td>
        <td><span class="type-badge type-${ev.type}">${ev.type}</span></td>
        <td>
          <div class="table-actions">
            <button class="table-btn table-btn-edit" data-id="${ev.id}" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="table-btn table-btn-delete" data-id="${ev.id}" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

        // Edit buttons
        tbody.querySelectorAll('.table-btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const ev = events.find(e => e.id === id);
                if (!ev) return;

                editingEventId = id;
                document.getElementById('eventModalTitle').textContent = 'Edit Event';
                document.getElementById('eventTitle').value = ev.title;
                document.getElementById('eventDate').value = ev.date;
                document.getElementById('eventType').value = ev.type;
                document.getElementById('eventDesc').value = ev.description;
                document.getElementById('eventImage').value = ev.image;
                eventModal.classList.add('active');
            });
        });

        // Delete buttons
        tbody.querySelectorAll('.table-btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this event?')) {
                    DataStore.deleteEvent(parseInt(btn.dataset.id));
                    loadEvents();
                }
            });
        });
    }

    /* ============ GALLERY MANAGEMENT ============ */
    const photoModal = document.getElementById('photoModal');
    const photoForm = document.getElementById('photoForm');

    document.getElementById('addPhotoBtn').addEventListener('click', () => {
        photoForm.reset();
        photoModal.classList.add('active');
    });

    document.getElementById('photoModalClose').addEventListener('click', () => {
        photoModal.classList.remove('active');
    });

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) photoModal.classList.remove('active');
    });

    photoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        DataStore.addPhoto({
            url: document.getElementById('photoUrl').value,
            caption: document.getElementById('photoCaption').value
        });
        photoModal.classList.remove('active');
        loadGallery();
    });

    function loadGallery() {
        const grid = document.getElementById('adminGalleryGrid');
        const photos = DataStore.getGallery();

        grid.innerHTML = photos.map(photo => `
      <div class="admin-photo-card">
        <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
        <div class="photo-overlay">
          <span>${photo.caption}</span>
          <button class="photo-delete-btn" data-id="${photo.id}"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
    `).join('');

        grid.querySelectorAll('.photo-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Delete this photo?')) {
                    DataStore.deletePhoto(parseInt(btn.dataset.id));
                    loadGallery();
                }
            });
        });
    }

    /* ============ DONATIONS ============ */
    function loadDonations() {
        const tbody = document.getElementById('donationsTableBody');
        const donations = DataStore.getDonations();

        if (!donations.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No donation records yet. Records will appear here after Razorpay integration.</td></tr>';
            return;
        }

        tbody.innerHTML = donations.map((d, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${d.name || 'Anonymous'}</td>
        <td>₹${parseInt(d.amount).toLocaleString()}</td>
        <td>${formatDate(d.date)}</td>
        <td><span class="type-badge type-past">${d.status || 'Completed'}</span></td>
      </tr>
    `).join('');
    }

    /* ============ MESSAGES ============ */
    function loadMessages() {
        const tbody = document.getElementById('messagesTableBody');
        const messages = DataStore.getMessages();

        if (!messages.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No messages yet. Messages sent via the contact form will appear here.</td></tr>';
            return;
        }

        tbody.innerHTML = messages.map(msg => `
      <tr>
        <td>${formatDate(msg.date)}</td>
        <td><strong>${msg.name}</strong></td>
        <td><a href="mailto:${msg.email}">${msg.email}</a><br><small>${msg.phone || ''}</small></td>
        <td><div style="max-width:300px; white-space: normal;">${msg.message}</div></td>
        <td>
          <button class="table-btn table-btn-delete" data-id="${msg.id}" title="Delete"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

        tbody.querySelectorAll('.table-btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Delete this message?')) {
                    DataStore.deleteMessage(parseInt(btn.dataset.id));
                    loadMessages();
                }
            });
        });
    }
});
