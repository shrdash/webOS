const windowArea = document.getElementById('window-area');
const desktopObjectsContainer = document.getElementById('desktop-objects');
const decorationsContainer = document.getElementById('decorations');

const desktopArtifacts = [
  {
    id: 'polaroid-1',
    type: 'polaroid-object',
    title: 'Cafe evening',
    caption: 'May 2026',
    image: 'assets/photos/photo1.jpg',
    left: '10%',
    top: '18%',
    rotation: -9,
    width: '196px',
    open: 'photos'
  },
  {
    id: 'sticky-journal',
    type: 'sticky-object',
    title: 'Journal',
    text: 'Wrote down favorite lyrics and the smell of paper.',
    left: '66%',
    top: '14%',
    rotation: 7,
    width: '182px',
    open: 'journal'
  },
  {
    id: 'postcard',
    type: 'postcard-object',
    title: 'Market map',
    text: 'Ticket stub taped to this page with song snippets.',
    left: '18%',
    top: '64%',
    rotation: 4,
    width: '208px',
    open: 'adventures'
  },
  {
    id: 'mix-tape',
    type: 'mini-card',
    title: 'Memory Mix',
    text: 'Songs pinned to a rainy afternoon.',
    left: '60%',
    top: '56%',
    rotation: -7,
    width: '178px',
    open: 'playlist'
  },
  {
    id: 'project-note',
    type: 'note-object',
    title: 'Zine draft',
    text: 'Glue down sketches, stamps, and secret stories.',
    left: '74%',
    top: '74%',
    rotation: 5,
    width: '168px',
    open: 'projects'
  },
  {
    id: 'letter-tag',
    type: 'note-object',
    title: 'Letters',
    text: 'Folded notes, doodles, and midnight thoughts.',
    left: '26%',
    top: '82%',
    rotation: -5,
    width: '170px',
    open: 'letters'
  }
];

const decorationItems = [
  { type: 'sticker', left: '12%', top: '12%', rotation: -16, label: '✶' },
  { type: 'sticker', left: '44%', top: '10%', rotation: 8, label: '✉' },
  { type: 'stamp', left: '84%', top: '16%', rotation: 6, label: 'POST' },
  { type: 'tape', left: '32%', top: '40%', rotation: -22 },
  { type: 'tape', left: '70%', top: '44%', rotation: 12 },
  { type: 'stamp', left: '52%', top: '74%', rotation: -8, label: 'TRVL' }
];

const journalEntries = [
  {
    title: 'Morning collage',
    date: 'June 3, 2026',
    content: 'I taped a small travel ticket to this page and scribbled the playlist I was listening to. The day felt soft and orange, like the light pouring into my room.',
    image: 'assets/photos/photo1.jpg'
  },
  {
    title: 'Postcard thoughts',
    date: 'May 22, 2026',
    content: 'The postcard arrived from a city I still carry in my suitcase. I drew little stamps around the margins and wrote down every street name that sounded like a story.',
    image: 'assets/photos/photo2.jpg'
  },
  {
    title: 'Sticker dreams',
    date: 'April 11, 2026',
    content: 'I pretended each sticker was a secret memory. Some of them are taped upside down so the page feels more like a real scrapbook.',
    image: 'assets/photos/photo3.jpg'
  }
];

const gallery = [
  { src: 'assets/photos/photo1.jpg', caption: 'Ticket stub from a spontaneous road trip', date: 'Apr 2026' },
  { src: 'assets/photos/photo2.jpg', caption: 'Late afternoon cafe window', date: 'May 2026' },
  { src: 'assets/photos/photo3.jpg', caption: 'A collection of vintage stickers', date: 'Jun 2026' },
  { src: 'assets/photos/photo4.jpg', caption: 'The journal spread with a map piece', date: 'Mar 2026' }
];

const playlistItems = [
  { title: 'Paper Planes', artist: 'M.I.A.', note: 'Reminds me of daydreams and folded paper notes.', image: 'assets/photos/photo5.jpg' },
  { title: 'Young Hearts', artist: 'The Naked and Famous', note: 'Feels like summer sketches and sticky notes.', image: 'assets/photos/photo6.jpg' },
  { title: 'Little Things', artist: 'Misterwives', note: 'The perfect song for writing in my journal at midnight.', image: 'assets/photos/photo7.jpg' }
];

const adventures = [
  { place: 'Seaside Market', memory: 'I collected postcards and seashells while the waves hummed in the background.', image: 'assets/photos/photo8.jpg' },
  { place: 'Vintage Bookshop', memory: 'The smell of old paper and handwritten notes filled every corner.', image: 'assets/photos/photo9.jpg' },
  { place: 'Mountaintop picnic', memory: 'We taped a leaf to the page and wrote the view in tiny letters.', image: 'assets/photos/photo10.jpg' }
];

const projects = [
  { name: 'Mini Zine', description: 'A tiny handmade booklet filled with sketches, lyrics, and ticket stubs.', image: 'assets/photos/photo11.jpg' },
  { name: 'Memory Mix', description: 'A playlist of songs tied to specific adventures and secret moments.', image: 'assets/photos/photo12.jpg' },
  { name: 'Travel Patch', description: 'A collage of map snippets, stamps, and postcard fragments.', image: 'assets/photos/photo13.jpg' }
];

let zIndexCounter = 20;

function updateDateTime() {
  const dateElement = document.getElementById('current-date');
  const timeElement = document.getElementById('current-time');
  const now = new Date();
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit' };
  dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
  timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

function createWindow({ title, subtitle, content, width = 460, left, top }) {
  const win = document.createElement('article');
  win.className = 'window';
  win.style.width = `${width}px`;
  win.style.zIndex = zIndexCounter++;
  win.style.left = left || `${40 + (zIndexCounter * 4) % 320}px`;
  win.style.top = top || `${70 + (zIndexCounter * 5) % 260}px`;
  const rotation = Math.random() * 4 - 2;
  win.style.setProperty('--rotation', `${rotation}deg`);
  win.style.transform = `rotate(${rotation}deg)`;

  const header = document.createElement('div');
  header.className = 'window-header';
  header.innerHTML = `
    <div>
      <h2>${title}</h2>
      <div class="window-subtitle">${subtitle}</div>
    </div>
    <button class="close-button" aria-label="Close window">×</button>
  `;

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'window-content';
  contentWrapper.appendChild(content);

  win.appendChild(header);
  win.appendChild(contentWrapper);
  windowArea.appendChild(win);

  requestAnimationFrame(() => {
    win.style.opacity = '1';
  });

  const closeButton = header.querySelector('.close-button');
  closeButton.addEventListener('click', () => closeWindow(win));
  win.addEventListener('pointerdown', () => bringToFront(win));
  makeDraggable(win, header);
  return win;
}

function bringToFront(win) {
  win.style.zIndex = zIndexCounter++;
}

function closeWindow(win) {
  win.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
  win.style.opacity = '0';
  win.style.transform += ' scale(0.98)';
  setTimeout(() => win.remove(), 280);
}

function makeDraggable(win, handle) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  handle.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.close-button')) return;
    pointerId = event.pointerId;
    win.setPointerCapture(pointerId);
    const rect = win.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    originX = rect.left;
    originY = rect.top;
    bringToFront(win);

    const onPointerMove = (moveEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      win.style.left = `${originX + deltaX}px`;
      win.style.top = `${originY + deltaY}px`;
    };

    const onPointerUp = (upEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      win.releasePointerCapture(pointerId);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      pointerId = null;
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  });
}

function createDesktopArtifacts() {
  desktopArtifacts.forEach((artifact) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `desktop-object ${artifact.type}`;
    item.style.left = artifact.left;
    item.style.top = artifact.top;
    item.style.width = artifact.width;
    item.style.setProperty('--rotation', `${artifact.rotation}deg`);
    item.style.transform = `rotate(${artifact.rotation}deg)`;

    const content = [];
    if (artifact.image) {
      content.push(`<img class="polaroid-image" src="${artifact.image}" alt="${artifact.title}" />`);
    }
    content.push(`<div class="object-meta"><span class="object-tag">${artifact.caption || artifact.title}</span></div>`);
    content.push(`<strong class="object-title">${artifact.title}</strong>`);
    if (artifact.text) {
      content.push(`<div class="object-text">${artifact.text}</div>`);
    }
    content.push(`<span class="object-caption">Tap to open</span>`);

    item.innerHTML = content.join('');

    if (artifact.open) {
      item.addEventListener('click', () => openApp(artifact.open));
    }

    desktopObjectsContainer.appendChild(item);
  });
}

function createDecorations() {
  decorationItems.forEach((item) => {
    const piece = document.createElement('div');
    piece.className = `decoration-piece ${item.type}`;
    piece.style.left = item.left;
    piece.style.top = item.top;
    piece.style.transform = `rotate(${item.rotation}deg)`;
    piece.textContent = item.label || '';
    decorationsContainer.appendChild(piece);

    if (item.type === 'tape') {
      piece.style.opacity = '0.95';
    }
  });
}

function openApp(id) {
  switch (id) {
    case 'journal':
      openJournal();
      break;
    case 'photos':
      openPhotos();
      break;
    case 'playlist':
      openPlaylist();
      break;
    case 'adventures':
      openAdventures();
      break;
    case 'projects':
      openProjects();
      break;
    case 'letters':
      openLetters();
      break;
    default:
      break;
  }
}

function openWelcome(opts = {}) {
  const content = document.createElement('div');
  content.className = 'welcome-grid';
  content.innerHTML = `
    <img class="profile-photo" src="assets/photos/photo1.jpg" alt="Profile" />
    <div class="welcome-copy">
      <p>Hello! I am the curator of this cozy scrapbook world. Every card, sticker, and note here is meant to feel like a secret page on my desk.</p>
      <div class="quote-box">"Small moments are the best souvenirs."</div>
      <div class="sticker-cluster">
        <span class="sticker">⭐</span>
        <span class="sticker">✉️</span>
        <span class="sticker">🎵</span>
        <span class="sticker">✈️</span>
      </div>
    </div>
  `;
  createWindow({
    title: 'Welcome to My Scrapbook',
    subtitle: 'MemoryOS home page',
    content,
    width: opts.width || 520,
    left: opts.left || '86px',
    top: opts.top || '86px'
  });
}

function openJournal(opts = {}) {
  const content = document.createElement('div');
  content.className = 'journal-app';
  const listColumn = document.createElement('div');
  listColumn.className = 'journal-list';
  const detailColumn = document.createElement('div');
  detailColumn.className = 'entry-panel';

  journalEntries.forEach((entry, index) => {
    const item = document.createElement('button');
    item.className = 'journal-item';
    item.type = 'button';
    item.innerHTML = `<h3>${entry.title}</h3><div>${entry.date}</div>`;
    item.addEventListener('click', () => showEntry(index));
    listColumn.appendChild(item);
  });

  const title = document.createElement('h3');
  const date = document.createElement('div');
  const body = document.createElement('p');
  const image = document.createElement('img');
  image.alt = 'Journal image';
  image.style.display = 'block';
  detailColumn.append(title, date, body, image);
  content.append(listColumn, detailColumn);

  const journalWindow = createWindow({
    title: 'Journal',
    subtitle: 'Open your daily entries',
    content,
    width: opts.width || 540,
    left: opts.left || '432px',
    top: opts.top || '86px'
  });
  const listItems = listColumn.querySelectorAll('.journal-item');

  function showEntry(index) {
    listItems.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
    const entry = journalEntries[index];
    title.textContent = entry.title;
    date.textContent = entry.date;
    body.textContent = entry.content;
    image.src = entry.image;
  }

  showEntry(0);
  return journalWindow;
}

function openPhotos(opts = {}) {
  const content = document.createElement('div');
  content.className = 'photo-grid';

  gallery.forEach((photo, index) => {
    const frame = document.createElement('button');
    frame.type = 'button';
    frame.className = 'polaroid';
    frame.style.setProperty('--rotation', `${index % 2 === 0 ? -4 : 4}deg`);
    frame.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" />
      <div class="caption"><strong>${photo.date}</strong><br>${photo.caption}</div>
    `;
    frame.addEventListener('click', () => openPhotoModal(photo));
    content.appendChild(frame);
  });

  createWindow({
    title: 'Photo Album',
    subtitle: 'Memories in Polaroid',
    content,
    width: opts.width || 560,
    left: opts.left || '142px',
    top: opts.top || '248px'
  });
}

function openPlaylist(opts = {}) {
  const content = document.createElement('div');
  content.className = 'music-grid';

  playlistItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'music-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="music-info">
        <p class="music-title">${item.title}</p>
        <p class="music-artist">${item.artist}</p>
        <p class="memory-note">${item.note}</p>
      </div>
    `;
    content.appendChild(card);
  });

  createWindow({
    title: 'Playlist',
    subtitle: 'Songs with memories',
    content,
    width: opts.width || 520,
    left: opts.left || '546px',
    top: opts.top || '330px'
  });
}

function openAdventures(opts = {}) {
  const content = document.createElement('div');
  content.className = 'postcard-grid';

  adventures.forEach((trip) => {
    const card = document.createElement('div');
    card.className = 'postcard';
    card.innerHTML = `
      <div class="card-body">
        <p class="card-title">${trip.place}</p>
        <p class="memory-note">${trip.memory}</p>
      </div>
      <img src="${trip.image}" alt="${trip.place}" />
    `;
    content.appendChild(card);
  });

  createWindow({
    title: 'Adventures',
    subtitle: 'Places I remember',
    content,
    width: opts.width || 520,
    left: opts.left || '80px',
    top: opts.top || '522px'
  });
}

function openProjects(opts = {}) {
  const content = document.createElement('div');
  content.className = 'project-grid';

  projects.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <span class="project-badge">${project.name}</span>
      <img src="${project.image}" alt="${project.name}" />
      <p class="memory-note">${project.description}</p>
    `;
    content.appendChild(card);
  });

  createWindow({
    title: 'Projects',
    subtitle: 'Creative scrapbook experiments',
    content,
    width: opts.width || 500,
    left: opts.left || '534px',
    top: opts.top || '92px'
  });
}

function openLetters(opts = {}) {
  const content = document.createElement('div');
  content.innerHTML = `
    <p>Dear friend,</p>
    <p>Every letter in this archive is a handcrafted memory. Some pages are scribbled with ideas, others are decorated with doodles that felt too special to keep hidden.</p>
    <p>Pull a note from the stack and make this desk feel more like a shared journal.</p>
    <p style="margin-top: 16px; font-style: italic;">- The MemoryOS curator</p>
  `;

  createWindow({
    title: 'Letters',
    subtitle: 'Secret notes and messages',
    content,
    width: opts.width || 480,
    left: opts.left || '42px',
    top: opts.top || '418px'
  });
}

function openPhotoModal(photo) {
  let modal = document.querySelector('.photo-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
      <div class="modal-card">
        <button class="close-modal" aria-label="Close">×</button>
        <img alt="Enlarged photo" />
        <p class="modal-caption"></p>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.remove('active');
    });
  }
  const image = modal.querySelector('img');
  const caption = modal.querySelector('.modal-caption');
  image.src = photo.src;
  caption.textContent = `${photo.caption} • ${photo.date}`;
  modal.classList.add('active');
}

function openInitialWindows() {
  openWelcome({ left: '82px', top: '86px' });
  openPhotos({ left: '142px', top: '248px' });
  openJournal({ left: '432px', top: '92px' });
  openPlaylist({ left: '546px', top: '330px' });
}

document.addEventListener('DOMContentLoaded', () => {
  createDecorations();
  createDesktopArtifacts();
  openInitialWindows();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});