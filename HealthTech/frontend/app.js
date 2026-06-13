// app.js — Versión local (sin servidor).
// El frontend funciona abriendo index.html directamente en el navegador.
// En la entrega final se integrará un backend (Flask) para triage y fichas médicas.

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
    keys: ['mareo', 'desmayo', 'vértigo', 'me desmayé', 'perdí el conocimiento', 'síncope', 'inestabilidad', 'me caí', 'desequilibrio', 'se me va la vista', 'presión baja al levantarme'],
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
    keys: ['dolor de panza', 'dolor abdominal', 'abdomen', 'apéndice', 'apendicitis', 'dolor en el lado derecho', 'calambre abdominal'],
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
  // Intoxicación (alimentos/sustancias)
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

  // ===== NUEVAS CATEGORÍAS =====

  // Oído
  {
    keys: ['dolor de oido', 'dolor de oído', 'oido', 'oído', 'otitis', 'oreja', 'oido tapado', 'oído tapado', 'zumbido en el oido', 'zumbido en el oído'],
    reply: 'El dolor de oído puede deberse a una infección (otitis). Evitá introducir objetos en el oído. Si el dolor es muy intenso, hay fiebre o supuración, consultá a un médico.'
  },
  // Dental
  {
    keys: ['dolor de muela', 'muela', 'diente', 'dolor dental', 'encia', 'encía', 'encías', 'flemón', 'flemon', 'absceso dental'],
    reply: 'El dolor dental puede calmarse con un analgésico común y enjuagues con agua tibia y sal. Si hay hinchazón en la cara o fiebre, acudí a un odontólogo o guardia urgente.'
  },
  // Golpe de calor
  {
    keys: ['golpe de calor', 'insolación', 'insolacion', 'agotamiento por calor', 'mucho calor', 'me deshidraté', 'me deshidrate', 'deshidratación', 'deshidratacion'],
    reply: 'Ante un golpe de calor: trasladá a la persona a la sombra, aflojá su ropa y refrescala con agua y abanico. Si presenta confusión, piel muy caliente y seca o pérdida de conciencia, llamá al 911.'
  },
  // Hipotermia / frío extremo
  {
    keys: ['hipotermia', 'mucho frio', 'mucho frío', 'frío extremo', 'frio extremo', 'congelamiento', 'me congelé', 'me congele'],
    reply: 'En caso de hipotermia: retirá ropa húmeda, cubrí a la persona con mantas secas y dale líquidos calientes (sin alcohol). Si tiembla incontrolablemente o pierde el conocimiento, llamá al 911.'
  },
  // Picaduras de insectos
  {
    keys: ['picadura', 'me picó', 'me pico', 'mosquito', 'abeja', 'avispa', 'araña', 'arana', 'avispón', 'avispon', 'me picó una abeja'],
    reply: 'Ante una picadura: lavá la zona con agua y jabón y aplicá frío local. Si aparece hinchazón importante, dificultad para respirar o mareos, podría ser una reacción alérgica grave: LLAMÁ AL 911.'
  },
  // Mordeduras de animales
  {
    keys: ['mordida', 'me mordió', 'me mordio', 'mordedura', 'perro me mordió', 'perro me mordio', 'gato me mordió', 'gato me mordio', 'rabia'],
    reply: 'Ante una mordedura de animal: lavá la herida con agua y jabón abundante durante varios minutos y consultá a un médico, ya que puede requerir vacuna antirrábica y antitetánica.'
  },
  // Ojos
  {
    keys: ['ojo', 'me entró algo en el ojo', 'me entro algo en el ojo', 'ojo irritado', 'conjuntivitis', 'visión borrosa', 'vision borrosa', 'ojo rojo'],
    reply: 'Si te entró algo en el ojo, enjuagá con agua limpia abundante sin frotar. Si la irritación persiste, hay dolor intenso o pérdida de visión, consultá a un oftalmólogo o guardia.'
  },
  // Espalda
  {
    keys: ['dolor de espalda', 'lumbago', 'columna', 'dolor lumbar', 'contractura', 'me duele la espalda'],
    reply: 'El dolor de espalda suele mejorar con reposo relativo, calor local y analgésicos. Si el dolor se irradia a las piernas, hay pérdida de fuerza o de control de esfínteres, consultá de urgencia.'
  },
  // Menstrual
  {
    keys: ['dolor menstrual', 'cólicos menstruales', 'colicos menstruales', 'menstruación', 'menstruacion', 'periodo', 'período', 'la regla'],
    reply: 'Los cólicos menstruales pueden aliviarse con calor local y analgésicos comunes. Si el dolor es incapacitante o el sangrado es muy abundante, consultá a un ginecólogo.'
  },
  // Embarazo / parto
  {
    keys: ['embarazo', 'embarazada', 'contracciones', 'parto', 'rotura de bolsa', 'estoy de parto', 'trabajo de parto'],
    reply: 'Si las contracciones son regulares y cada vez más seguidas, o se rompió la bolsa, dirigite a la maternidad o llamá al 911 para que te trasladen.'
  },
  // Ansiedad / pánico
  {
    keys: ['ansiedad', 'ataque de pánico', 'ataque de panico', 'angustia', 'crisis de ansiedad', 'me agité', 'me agite', 'palpitaciones por nervios'],
    reply: 'Durante una crisis de ansiedad: sentate, respirá lento (4 segundos inhalando, 6 exhalando) y enfocate en objetos a tu alrededor. Si los síntomas no mejoran o aparece dolor en el pecho, consultá un médico.'
  },
  // Salud mental general
  {
    keys: ['depresión', 'depresion', 'tristeza', 'no tengo ganas de nada', 'salud mental', 'me siento mal emocionalmente', 'estoy mal anímicamente', 'estoy mal animicamente'],
    reply: 'No estás solo/a. Hablar con un profesional de salud mental puede ayudar mucho. Te recomendamos contactar a un psicólogo o al centro de salud más cercano.'
  },
  // Crisis / pensamientos de autolesión
  {
    keys: ['quiero morir', 'no quiero vivir', 'autolesión', 'autolesion', 'lastimarme', 'pensamientos suicidas', 'suicidio'],
    reply: 'Lo que sentís es importante y merece ayuda. Comunicate con el Centro de Asistencia al Suicida (línea 135 en CABA, o 011-5275-1135) o con alguien de confianza. Si hay riesgo inmediato, llamá al 911.'
  },
  // Insomnio
  {
    keys: ['insomnio', 'no puedo dormir', 'no duermo', 'desvelado', 'desvelo'],
    reply: 'Para mejorar el sueño: evitá pantallas y cafeína antes de dormir y mantené horarios regulares. Si el insomnio persiste varias semanas, consultá a un médico.'
  },
  // Atragantamiento
  {
    keys: ['atragantamiento', 'me atraganté', 'me atragante', 'se atoró', 'se atoro', 'algo en la garganta', 'heimlich'],
    reply: 'Si alguien se atraganta y no puede hablar ni respirar: dale 5 golpes firmes entre los hombros y luego realizá la maniobra de Heimlich (compresiones abdominales). Si no se resuelve, llamá al 911.'
  },
  // Electrocución
  {
    keys: ['electrocución', 'electrocucion', 'electrocutado', 'descarga eléctrica', 'descarga electrica', 'shock eléctrico', 'shock electrico'],
    reply: 'Ante una electrocución: NO toques a la persona hasta cortar la corriente. Llamá al 911 de inmediato, ya que puede haber quemaduras internas y alteraciones cardíacas.'
  },
  // Ahogamiento (en agua)
  {
    keys: ['ahogamiento', 'se está ahogando', 'se esta ahogando', 'casi se ahoga', 'tragó agua', 'trago agua'],
    reply: 'Ante un ahogamiento, sacá a la persona del agua con cuidado, llamá al 911 y, si no respira, iniciá RCP (ver sección RCP).'
  },
  // Estreñimiento
  {
    keys: ['estreñimiento', 'estrenimiento', 'constipación', 'constipacion', 'no puedo ir al baño', 'no defeco'],
    reply: 'Para el estreñimiento: aumentá el consumo de agua, fibra (frutas, verduras) y actividad física. Si dura más de una semana o hay dolor intenso, consultá a un médico.'
  },
  // Calambres / dolores musculares
  {
    keys: ['calambre', 'calambres', 'contractura muscular', 'me tiró el músculo', 'me tiro el musculo', 'tirón muscular', 'tiron muscular'],
    reply: 'Los calambres musculares suelen aliviarse estirando suavemente el músculo, masajeando la zona e hidratándote bien. Si son frecuentes, consultá a un médico.'
  },
  // Piel / dermatitis
  {
    keys: ['picazón en la piel', 'picazon en la piel', 'dermatitis', 'piel irritada', 'ronchas en la piel', 'eccema'],
    reply: 'La picazón en la piel puede deberse a alergias, irritación o dermatitis. Evitá rascarte y aplicá cremas hidratantes o antihistamínicos. Si se extiende rápido o hay ampollas, consultá un médico.'
  },
  // Infección urinaria
  {
    keys: ['infección urinaria', 'infeccion urinaria', 'ardor al orinar', 'me arde al orinar', 'cistitis', 'ganas frecuentes de orinar'],
    reply: 'El ardor al orinar y las ganas frecuentes pueden indicar una infección urinaria. Tomá mucha agua y consultá a un médico, especialmente si hay fiebre o dolor lumbar.'
  },
  // Dolor renal / cálculos
  {
    keys: ['dolor de riñón', 'dolor de rinon', 'cálculos renales', 'calculos renales', 'piedra en el riñón', 'piedra en el rinon', 'cólico renal', 'colico renal'],
    reply: 'El dolor renal intenso que va y viene, irradiado hacia la ingle, puede ser un cálculo renal. Tomá líquidos y consultá de urgencia si el dolor es muy intenso o hay sangre en la orina.'
  },
  // Cansancio / anemia
  {
    keys: ['cansancio extremo', 'mucho cansancio', 'anemia', 'palidez', 'debilidad general', 'fatiga'],
    reply: 'El cansancio extremo y la palidez pueden estar relacionados con anemia u otras causas. Si es persistente, consultá a un médico para un análisis de sangre.'
  },
  // COVID / respiratorias
  {
    keys: ['covid', 'coronavirus', 'pérdida del olfato', 'perdida del olfato', 'pérdida del gusto', 'perdida del gusto'],
    reply: 'Los síntomas como pérdida de olfato/gusto, fiebre y tos pueden indicar COVID-19 u otra infección respiratoria. Aislate, usá barbijo y consultá a un médico para indicaciones.'
  },
  // Varicela / sarampión
  {
    keys: ['varicela', 'sarampión', 'sarampion', 'erupción con fiebre', 'erupcion con fiebre', 'manchas en la piel con fiebre'],
    reply: 'Erupciones en la piel acompañadas de fiebre pueden ser enfermedades como varicela o sarampión, muy contagiosas. Aislá a la persona y consultá a un médico.'
  },
  // Piojos
  {
    keys: ['piojos', 'liendres', 'picazón en la cabeza', 'picazon en la cabeza'],
    reply: 'Para los piojos: usá un tratamiento específico (loción o champú pediculicida) y peine fino. No es una emergencia, pero conviene tratarlo pronto para evitar contagios.'
  },
  // Hongos
  {
    keys: ['hongos en los pies', 'pie de atleta', 'hongos en las uñas', 'hongos en las unas', 'micosis'],
    reply: 'Los hongos en la piel o uñas se tratan con antimicóticos de venta libre. Mantené la zona seca y limpia. Si no mejora, consultá a un dermatólogo.'
  },
  // Reflujo / acidez
  {
    keys: ['reflujo', 'acidez', 'ardor de estómago', 'ardor de estomago', 'agruras'],
    reply: 'La acidez o reflujo puede aliviarse evitando comidas pesadas o picantes, y no acostándote justo después de comer. Si es frecuente o hay dolor intenso, consultá a un médico.'
  },
  // Sangrado nasal
  {
    keys: ['sangrado nasal', 'me sangra la nariz', 'epistaxis', 'hemorragia nasal'],
    reply: 'Para el sangrado nasal: sentate, inclinate levemente hacia adelante y presioná las fosas nasales por 10 minutos. Si no para o es muy frecuente, consultá a un médico.'
  },
  // Tos con sangre
  {
    keys: ['tos con sangre', 'toser sangre', 'esputo con sangre'],
    reply: 'Toser con sangre es un signo de alarma. Consultá a un médico lo antes posible o dirigite a una guardia.'
  },
  // Bebés
  {
    keys: ['bebé con fiebre', 'bebe con fiebre', 'mi bebé', 'mi bebe', 'recién nacido', 'recien nacido', 'llanto del bebé', 'llanto del bebe'],
    reply: 'En bebés menores de 3 meses, cualquier fiebre (más de 38°C) es motivo de consulta médica urgente. En bebés mayores, controlá la temperatura y consultá si el llanto es inconsolable o hay otros síntomas.'
  },
  // Vacunas
  {
    keys: ['vacunas', 'vacuna', 'calendario de vacunación', 'calendario de vacunacion'],
    reply: 'Las vacunas son clave para prevenir enfermedades. Consultá el calendario de vacunación con tu centro de salud para mantenerlo actualizado.'
  },
  // Botiquín / primeros auxilios
  {
    keys: ['botiquín', 'botiquin', 'primeros auxilios', 'qué necesito en casa', 'que necesito en casa'],
    reply: 'Un botiquín básico debería incluir: gasas, vendas, antiséptico, guantes, analgésicos, termómetro y tijeras. Revisá las fechas de vencimiento periódicamente.'
  },
  // Medicamentos / dosis
  {
    keys: ['paracetamol', 'ibuprofeno', 'dosis de medicamento', 'cuánto tomar', 'cuanto tomar', 'qué medicamento tomo', 'que medicamento tomo'],
    reply: 'No podemos indicar dosis exactas de medicamentos por este medio. Consultá el prospecto o a un farmacéutico/médico antes de tomar cualquier medicamento.'
  },
  // Alcohol
  {
    keys: ['borracho', 'intoxicación con alcohol', 'intoxicacion con alcohol', 'tomó mucho alcohol', 'tomo mucho alcohol', 'coma alcohólico', 'coma alcoholico'],
    reply: 'Ante una intoxicación severa por alcohol (vómitos, confusión, pérdida de conocimiento), colocá a la persona de costado para evitar que se ahogue y llamá al 911.'
  },
  // Drogas / sobredosis
  {
    keys: ['sobredosis', 'consumo de sustancias', 'tomó pastillas de más', 'tomo pastillas de mas'],
    reply: 'Ante una sospecha de sobredosis, llamá al 911 inmediatamente y, si es posible, indicá qué sustancia consumió la persona y en qué cantidad.'
  },
  // Accidente de tránsito
  {
    keys: ['accidente de auto', 'accidente de tránsito', 'accidente de transito', 'choque', 'atropellado', 'volcó el auto', 'volco el auto'],
    reply: 'Ante un accidente de tránsito: asegurá la zona, no muevas a los heridos salvo riesgo inminente, y llamá al 911 indicando ubicación y cantidad de heridos.'
  },
  // Caída de altura
  {
    keys: ['caída de altura', 'caida de altura', 'se cayó de', 'se cayo de', 'cayó desde', 'cayo desde'],
    reply: 'Ante una caída de altura, no muevas a la persona (posible lesión en columna) y llamá al 911 de inmediato.'
  },
  // Quemadura solar
  {
    keys: ['quemadura solar', 'me quemé con el sol', 'me queme con el sol', 'piel quemada por el sol'],
    reply: 'Para la quemadura solar: aplicá compresas frías, hidratación con cremas after-sun y mucha agua. Si hay ampollas extensas o fiebre, consultá a un médico.'
  },
  // ETS
  {
    keys: ['ets', 'enfermedad de transmisión sexual', 'enfermedad de transmision sexual', 'flujo anormal'],
    reply: 'Si sospechás una infección de transmisión sexual, consultá a un médico para diagnóstico y tratamiento adecuado. Es importante no autotratarse.'
  },
  // Anticoncepción
  {
    keys: ['anticonceptivo', 'pastilla del día después', 'pastilla del dia despues', 'anticoncepción de emergencia', 'anticoncepcion de emergencia'],
    reply: 'Para consultas sobre anticoncepción, incluida la de emergencia, acercate a un centro de salud lo antes posible para recibir orientación.'
  },
  // Violencia / abuso
  {
    keys: ['violencia doméstica', 'violencia domestica', 'me pegan', 'abuso', 'maltrato'],
    reply: 'Si estás en una situación de violencia, tu seguridad es lo primero. En Argentina podés llamar a la línea 144 (atención a víctimas de violencia de género) o al 911 si hay peligro inmediato.'
  },
  // Hipo
  {
    keys: ['hipo', 'no se me va el hipo'],
    reply: 'El hipo persistente suele resolverse solo. Probá contener la respiración unos segundos o tomar agua despacio. Si dura más de 48 horas, consultá a un médico.'
  },
  // Despedidas / agradecimientos
  {
    keys: ['chau', 'adiós', 'adios', 'gracias', 'nos vemos', 'hasta luego'],
    reply: '¡Cuidate mucho! Si necesitás algo más, estoy acá.'
  },
  // Ayuda general / cómo funciona
  {
    keys: ['cómo funciona', 'como funciona', 'qué puedes hacer', 'que puedes hacer', 'ayuda', 'qué hace esta app', 'que hace esta app'],
    reply: 'Puedo orientarte sobre síntomas comunes, ayudarte a encontrar hospitales cercanos en el mapa y guiarte en una RCP. Contame qué te pasa.'
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

// ===== MAP =====
// Los hospitales ya NO están hardcodeados: se buscan en tiempo real
// cerca de la ubicación del usuario (geolocalización o búsqueda) usando
// la API pública de Overpass (OpenStreetMap), sin necesidad de servidor propio.

let mapInstance = null;
let userMarker = null;
let hospitalMarkers = [];

function initMap() {
  if (mapInstance) return;

  mapInstance = L.map('map').setView([-34.603, -58.381], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapInstance);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      mapInstance.setView([lat, lng], 14);
      mostrarUbicacionUsuario(lat, lng, 'Tu ubicación actual');
      buscarHospitalesCercanos(lat, lng);
    }, () => {
      // Si el usuario no da permiso de ubicación, buscamos hospitales
      // alrededor del centro del mapa por defecto.
      buscarHospitalesCercanos(-34.603, -58.381);
    });
  } else {
    buscarHospitalesCercanos(-34.603, -58.381);
  }

  setTimeout(() => mapInstance.invalidateSize(), 200);
}

function mostrarUbicacionUsuario(lat, lng, popupText) {
  if (userMarker) mapInstance.removeLayer(userMarker);

  const userIcon = L.divIcon({
    className: '',
    html: `<div style="background:#2196f3;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">Yo</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  userMarker = L.marker([lat, lng], { icon: userIcon })
    .addTo(mapInstance)
    .bindPopup(popupText)
    .openPopup();
}

function limpiarMarcadoresHospitales() {
  hospitalMarkers.forEach(m => mapInstance.removeLayer(m));
  hospitalMarkers = [];
}

// Busca hospitales y centros de salud reales cerca de (lat, lng) usando
// la API pública de Overpass (datos de OpenStreetMap).
function buscarHospitalesCercanos(lat, lng, radio = 5000) {
  limpiarMarcadoresHospitales();

  const query = `[out:json][timeout:25];(
    node["amenity"="hospital"](around:${radio},${lat},${lng});
    way["amenity"="hospital"](around:${radio},${lat},${lng});
    node["amenity"="clinic"](around:${radio},${lat},${lng});
  );out center;`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data.elements || data.elements.length === 0) return;

      const icon = L.divIcon({
        className: '',
        html: `<div style="background:#e8000d;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">+</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      data.elements.forEach(el => {
        const elLat = el.lat || (el.center && el.center.lat);
        const elLng = el.lon || (el.center && el.center.lon);
        if (!elLat || !elLng) return;

        const tags = el.tags || {};
        const nombre = tags.name || 'Hospital / Centro de salud';
        const telefono = tags.phone || tags['contact:phone'] || null;

        const popupHtml = `
          <div style="text-align:center;min-width:160px">
            <b style="font-size:13px">${nombre}</b><br/>
            ${telefono ? `<a href="tel:${telefono}" style="display:inline-block;margin-top:8px;background:#e8000d;color:white;padding:6px 14px;border-radius:6px;text-decoration:none;font-weight:700;font-size:12px">Llamar</a>` : ''}
          </div>
        `;

        const marker = L.marker([elLat, elLng], { icon })
          .addTo(mapInstance)
          .bindPopup(popupHtml);

        hospitalMarkers.push(marker);
      });
    })
    .catch(() => {
      // Si falla la búsqueda de hospitales, el mapa sigue funcionando igual.
    });
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
      mostrarUbicacionUsuario(latNum, lonNum, display_name);
      buscarHospitalesCercanos(latNum, lonNum);
    })
    .catch(() => alert('Error buscando la ubicación.'));
}
