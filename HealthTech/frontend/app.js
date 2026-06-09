// app.py — Servidor Flask (WIP)
// Por ahora el frontend funciona abriendo index.html directamente.
// Este archivo es la base para cuando se integre base de datos o IA real.

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
  // Fiebre / temperatura
  {
    keys: ['fiebre', 'temperatura', 'calor', 'febril', 'escalofrio', 'escalofríos', 'sudor', 'sudoración', 'transpiración'],
    reply: 'La fiebre puede ser síntoma de infección. Si supera los 39°C o dura más de 3 días, consultá a un médico o llamá al 911.'
  },
  // Dolor de cabeza
  {
    keys: ['dolor de cabeza', 'cabeza', 'jaqueca', 'migraña', 'cefalea', 'presión en la cabeza', 'palpitaciones cabeza'],
    reply: 'El dolor de cabeza puede deberse a estrés, deshidratación o migraña. Si es muy intenso, repentino o acompaña rigidez de nuca, buscá atención médica urgente.'
  },
  // Dolor pecho / corazón
  {
    keys: ['pecho', 'corazón', 'infarto', 'opresión', 'presión en el pecho', 'taquicardia', 'palpitaciones', 'arritmia', 'angina'],
    reply: 'Dolor en el pecho puede indicar un infarto. LLAMÁ AL 911 INMEDIATAMENTE y no te muevas.'
  },
  // Respiración
  {
    keys: ['dificultad para respirar', 'respirar', 'ahogo', 'falta de aire', 'disnea', 'asfixia', 'no puedo respirar', 'me ahogo', 'broncoespasmo', 'asma'],
    reply: 'Dificultad para respirar es una emergencia. LLAMÁ AL 911 ahora mismo.'
  },
  // Mareos / desmayo
  {
    keys: ['mareo', 'desmayo', 'vértigo', 'me desmayé', 'perdí el conocimiento', 'síncope', 'inestabilidad', 'me caí', 'desequilibrio'],
    reply: 'El mareo puede deberse a presión baja, deshidratación o problemas del oído interno. Recostáte y tomá agua. Si persiste o perdiste el conocimiento, consultá un médico.'
  },
  // Sangrado
  {
    keys: ['sangre', 'hemorragia', 'herida', 'sangrado', 'corte', 'lastimadura', 'me corté', 'sangra', 'hematoma'],
    reply: 'Presioná la herida con un paño limpio. Si el sangrado no para en 10 minutos o es abundante, llamá al 911.'
  },
  // Alergia
  {
    keys: ['alergia', 'reacción', 'urticaria', 'picazón', 'ronchas', 'hinchazón', 'anafilaxia', 'anafilaxis', 'erupción', 'sarpullido'],
    reply: 'Para reacciones alérgicas leves: antihistamínico. Si hay hinchazón en garganta o dificultad para respirar, LLAMÁ AL 911.'
  },
  // Convulsión
  {
    keys: ['convulsión', 'epilepsia', 'ataque', 'convulsiones', 'espasmos', 'temblores', 'sacudidas'],
    reply: 'En caso de convulsión: alejar objetos peligrosos, no sujetar a la persona, girarla de lado. Llamá al 911.'
  },
  // Quemadura
  {
    keys: ['quemadura', 'fuego', 'me quemé', 'quemado', 'líquido caliente', 'vapor', 'escaldado'],
    reply: 'Enfriá la quemadura con agua fría (no helada) por 10-20 min. No uses cremas ni hielo. Si es grande, profunda o en cara/manos, llamá al 911.'
  },
  // Náuseas / vómitos
  {
    keys: ['náuseas', 'nauseas', 'vómito', 'vomito', 'vomitar', 'arcadas', 'estómago', 'indigestión', 'malestar estomacal', 'me duele la panza'],
    reply: 'Las náuseas pueden deberse a indigestión, infección o intoxicación. Tomá líquidos en pequeños sorbos. Si el vómito es persistente, con sangre o acompaña fiebre alta, consultá un médico.'
  },
  // Diarrea
  {
    keys: ['diarrea', 'deposiciones', 'cólico', 'colico', 'retorcijón', 'evacuaciones', 'gastroenteritis'],
    reply: 'Mantené hidratación con agua y sales de rehidratación oral. Si hay sangre en las heces, fiebre alta o dura más de 48 h, consultá un médico.'
  },
  // Dolor abdominal
  {
    keys: ['dolor de panza', 'dolor abdominal', 'abdomen', 'apéndice', 'apendicitis', 'dolor en el lado derecho', 'calambre'],
    reply: 'El dolor abdominal intenso o localizado en el lado derecho inferior puede ser apendicitis. Consultá un médico de urgencia.'
  },
  // Dolor de garganta / tos
  {
    keys: ['garganta', 'tos', 'anginas', 'amígdalas', 'ronquera', 'disfonía', 'me duele la garganta', 'carraspera'],
    reply: 'El dolor de garganta suele deberse a infecciones virales. Reposo, líquidos calientes y analgésicos comunes. Si hay dificultad para tragar o respirar, consultá un médico.'
  },
  // Gripe / resfriado
  {
    keys: ['gripe', 'resfriado', 'resfrío', 'congestión', 'mocos', 'rinitis', 'catarro', 'me resfríe'],
    reply: 'Para el resfriado: reposo, líquidos abundantes y analgésicos si hay fiebre. Si los síntomas empeoran luego de 5 días o aparece dificultad para respirar, consultá un médico.'
  },
  // Presión arterial
  {
    keys: ['presión alta', 'hipertensión', 'presión baja', 'hipotensión', 'tensión arterial', 'presión arterial'],
    reply: 'La presión alta sostenida requiere control médico. Si acompaña dolor de cabeza intenso, visión borrosa o dolor en el pecho, llamá al 911 de inmediato.'
  },
  // Diabetes / glucemia
  {
    keys: ['diabetes', 'glucosa', 'glucemia', 'insulina', 'hipoglucemia', 'hiperglucemia', 'bajón de azúcar', 'azúcar en sangre'],
    reply: 'Si sentís mareo, temblores o debilidad y sos diabético, puede ser hipoglucemia: tomá azúcar o jugo de inmediato. Si no mejorás en 15 minutos, llamá al 911.'
  },
  // Fractura / traumatismo
  {
    keys: ['fractura', 'hueso', 'golpe', 'traumatismo', 'caída', 'me caí', 'luxación', 'esguince', 'torcedura'],
    reply: 'Inmovilizá la zona afectada y aplicá frío (no directo sobre la piel). Si hay deformidad visible o no podés mover el miembro, dirigite a urgencias.'
  },
  // Intoxicación
  {
    keys: ['intoxicación', 'intoxicado', 'veneno', 'envenenamiento', 'tomé algo', 'ingerí', 'pastillas de más'],
    reply: 'En caso de intoxicación no induzcas el vómito salvo indicación médica. Llamá al 911 o al Centro de Toxicología e indicá qué sustancia fue ingerida.'
  },
  // RCP
  {
    keys: ['rcp', 'reanimación', 'cardiopulmonar', 'masaje cardíaco', 'paro cardíaco', 'paró el corazón', 'no respira'],
    reply: 'Podés ver la guía completa de RCP en la sección RCP del menú.'
  },
  // Hospitales / médico
  {
    keys: ['hospital', 'médico', 'guardia', 'clínica', 'centro de salud', 'urgencias', 'emergencias', 'turno', 'doctor'],
    reply: 'Usá el mapa en la sección Hospitales para encontrar el centro médico más cercano.'
  },
  // Saludo
  {
    keys: ['hola', 'buenos', 'buenas', 'saludos', 'buen día', 'buenas tardes', 'buenas noches'],
    reply: 'Hola! Soy tu asistente de emergencias médicas. Contame tus síntomas y te ayudo. En caso de peligro, presioná LLAMAR.'
  },
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

// ===== TRIAGE (conectado al backend) =====
async function enviarTriage(nombre, dolor, temperatura) {
  try {
    const res = await fetch('/api/triage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, dolor, temperatura }),
    });
    const data = await res.json();
    if (!res.ok) return `Error: ${data.error}`;
    return `[${data.categoria}] ${data.mensaje}`;
  } catch {
    return 'No se pudo conectar con el servidor.';
  }
}

// ===== MAP =====
let mapInstance = null;
let userMarker = null;

const hospitals = [
  { name: 'Hospital General de Agudos', lat: -34.603, lng: -58.381, tel: '0800-222-1002' },
  { name: 'Hospital Rivadavia',          lat: -34.590, lng: -58.397, tel: '011-4809-2000' },
  { name: 'Hospital Ramos Mejía',        lat: -34.614, lng: -58.405, tel: '011-5950-7000' },
  { name: 'Hospital Fernández',          lat: -34.578, lng: -58.413, tel: '011-4808-2600' },
  { name: 'Hospital Piñero',             lat: -34.643, lng: -58.460, tel: '011-4631-9026' },
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
