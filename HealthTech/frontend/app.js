// ===== NAVIGATION =====
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  const navBtn = document.getElementById('nav-' + page);

  if (target) target.classList.add('active');
  if (navBtn) navBtn.classList.add('active');

  if (page === 'mapa') initMap();
}

// ===== LLAMAR 911 =====
function llamar911() {
  if (confirm('Desea llamar al 911?')) {
    window.location.href = 'tel:911';
  }
}

// ===== SETTINGS =====
function openSettings() {
  document.getElementById('settings-screen').classList.remove('hidden');
}
function closeSettings() {
  document.getElementById('settings-screen').classList.add('hidden');
}

function showAdminModal() {
  document.getElementById('admin-modal').classList.remove('hidden');
}
function closeAdminModal() {
  document.getElementById('admin-modal').classList.add('hidden');
}

document.getElementById('admin-modal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.add('hidden');
});

// ===== CHATBOT =====
const responses = [
  { keys: ['fiebre', 'temperatura', 'calor'], reply: 'La fiebre puede ser síntoma de infección. Si supera los 39°C o dura más de 3 días, consultá a un médico o llamá al 911.' },
  { keys: ['dolor', 'cabeza', 'jaqueca'], reply: 'El dolor de cabeza puede deberse a estrés, deshidratación o migraña. Si es muy intenso y repentino, buscá atención médica urgente.' },
  { keys: ['pecho', 'corazón', 'infarto'], reply: 'Dolor en el pecho puede indicar un infarto. LLAMÁ AL 911 INMEDIATAMENTE y no te muevas.' },
  { keys: ['dificultad', 'respirar', 'ahogo', 'falta de aire'], reply: 'Dificultad para respirar es una emergencia. LLAMÁ AL 911 ahora mismo.' },
  { keys: ['mareo', 'desmayo', 'vértigo'], reply: 'El mareo puede deberse a presión baja, deshidratación o problemas del oído interno. Recostáte y tomá agua. Si persiste, consultá un médico.' },
  { keys: ['sangre', 'hemorragia', 'herida'], reply: 'Presioná la herida con un paño limpio. Si el sangrado no para en 10 minutos o es abundante, llamá al 911.' },
  { keys: ['alergia', 'reacción', 'urticaria'], reply: 'Para reacciones alérgicas leves: antihistamínico. Si hay hinchazón en garganta o dificultad para respirar, LLAMÁ AL 911.' },
  { keys: ['convulsión', 'epilepsia', 'ataque'], reply: 'En caso de convulsión: alejar objetos peligrosos, no sujetar a la persona, girarla de lado. Llamá al 911.' },
  { keys: ['quemadura', 'fuego'], reply: 'Enfriá la quemadura con agua fría (no helada) por 10-20 min. No uses cremas. Si es grande o profunda, llamá al 911.' },
  { keys: ['rcp', 'reanimación', 'cardiopulmonar'], reply: 'Podés ver la guía completa de RCP en la sección RCP del menú.' },
  { keys: ['hospital', 'médico', 'guardia'], reply: 'Usá el mapa en la sección Hospitales para encontrar el centro médico más cercano.' },
  { keys: ['hola', 'buenos', 'buenas', 'saludos'], reply: 'Hola! Soy tu asistente de emergencias médicas. Contame tus síntomas y te ayudo. En caso de peligro, presioná LLAMAR.' },
];

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const r of responses) {
    if (r.keys.some(k => lower.includes(k))) return r.reply;
  }
  return 'Entendido. Para una consulta más precisa, acudí a un profesional de la salud. Si es una emergencia, presioná el botón LLAMAR o llamá al 911.';
}

function addMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + sender;

  if (sender === 'bot') {
    div.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble">${text}</div>`;
  } else {
    div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-avatar">👤</div>`;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    addMessage(getBotReply(text), 'bot');
  }, 600);
}

document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ===== MAP =====
let mapInstance = null;
let userMarker = null;

const hospitals = [
  { name: 'Hospital General de Agudos', lat: -34.603, lng: -58.381, tel: '0800-222-1002' },
  { name: 'Hospital Rivadavia', lat: -34.590, lng: -58.397, tel: '011-4809-2000' },
  { name: 'Hospital Ramos Mejía', lat: -34.614, lng: -58.405, tel: '011-5950-7000' },
  { name: 'Hospital Fernández', lat: -34.578, lng: -58.413, tel: '011-4808-2600' },
  { name: 'Hospital Piñero', lat: -34.643, lng: -58.460, tel: '011-4631-9026' },
];

function initMap() {
  if (mapInstance) return;

  mapInstance = L.map('map').setView([-34.603, -58.381], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapInstance);

  hospitals.forEach(h => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:#e8000d;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">+</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([h.lat, h.lng], { icon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="text-align:center;min-width:160px">
          <b style="font-size:13px">${h.name}</b><br/>
          <a href="tel:${h.tel}" style="display:inline-block;margin-top:8px;background:#e8000d;color:white;padding:6px 14px;border-radius:6px;text-decoration:none;font-weight:700;font-size:12px">Llamar</a>
        </div>
      `);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      mapInstance.setView([lat, lng], 14);

      const userIcon = L.divIcon({
        className: '',
        html: `<div style="background:#2196f3;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">Yo</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      userMarker = L.marker([lat, lng], { icon: userIcon })
        .addTo(mapInstance)
        .bindPopup('Tu ubicación actual').openPopup();
    });
  }

  setTimeout(() => mapInstance.invalidateSize(), 200);
}

function searchLocation() {
  const query = document.getElementById('map-input').value.trim();
  if (!query || !mapInstance) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
    .then(r => r.json())
    .then(data => {
      if (data.length === 0) { alert('No se encontró la ubicación.'); return; }
      const { lat, lon, display_name } = data[0];
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      mapInstance.setView([latNum, lonNum], 14);

      if (userMarker) mapInstance.removeLayer(userMarker);

      const searchIcon = L.divIcon({
        className: '',
        html: `<div style="background:#2196f3;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white">Yo</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      userMarker = L.marker([latNum, lonNum], { icon: searchIcon })
        .addTo(mapInstance)
        .bindPopup(display_name)
        .openPopup();
    })
    .catch(() => alert('Error buscando la ubicación.'));
}
