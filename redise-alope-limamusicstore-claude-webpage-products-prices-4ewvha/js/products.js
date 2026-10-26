/*
 * Catálogo DEMOSTRATIVO de Casa Musical Jhonatan BM.
 * Productos, precios (S/, IGV incluido) y contenidos son referenciales para la demo:
 * reemplazarlos por el inventario real de la tienda antes de publicar.
 * Las marcas quedan "por confirmar" a propósito: no se atribuyen marcas ni stock.
 *
 * Fotos reales: `photos: [photo("nombre-descriptivo-01", ancho, alto), ...]`.
 * Cada foto se guarda en img/productos/ como WebP en dos anchos: <nombre>-320.webp y
 * <nombre>-<ancho>.webp. La primera es la principal; si hay varias, la ficha muestra galería.
 * Si un producto no tiene fotos se usa la ilustración `icon`.
 *
 * uses:  principiante · estudiante · banda · iglesia · vivo · estudio · eventos
 * level: inicial · intermedio · pro
 */
function photo(name, w, h) {
  var base = "img/productos/" + name;
  return { src: base + "-" + w + ".webp", srcset: base + "-320.webp 320w, " + base + "-" + w + ".webp " + w + "w", w: w, h: h };
}

window.CATEGORIES = [
  { id: "guitarras", icon: "guitar", es: "Guitarras y bajos", en: "Guitars & basses" },
  { id: "teclados", icon: "keyboard", es: "Teclados y pianos", en: "Keyboards & pianos" },
  { id: "percusion", icon: "drumkit", es: "Baterías y percusión", en: "Drums & percussion" },
  { id: "audio", icon: "mic", es: "Micrófonos y audio", en: "Microphones & audio" },
  { id: "amplificadores", icon: "amp", es: "Amplificadores", en: "Amplifiers" },
  { id: "accesorios", icon: "pick", es: "Accesorios musicales", en: "Music accessories" }
];

window.PRODUCTS = [
  /* ---------- Guitarras y bajos ---------- */
  {
    id: "gc-39-estudio", cat: "guitarras", icon: "guitar", price: 290, popular: true,
    photos: [photo("guitarra-clasica-estudio-01", 512, 382)],
    uses: ["principiante", "estudiante"], level: "inicial",
    es: { name: "Guitarra clásica 39\" de estudio", desc: "Cuerdas de nylon y mástil cómodo para quienes recién empiezan.", inc: ["Funda acolchada", "Juego de cuerdas extra", "Afinador de clip"] },
    en: { name: "39\" classical study guitar", desc: "Nylon strings and a comfortable neck for beginners.", inc: ["Padded gig bag", "Spare string set", "Clip-on tuner"] }
  },
  {
    id: "ga-abeto", cat: "guitarras", icon: "guitar", price: 520,
    photos: [photo("guitarra-acustica-tapa-abeto-01", 512, 382)],
    uses: ["principiante", "vivo", "iglesia"], level: "intermedio",
    es: { name: "Guitarra acústica tapa de abeto", desc: "Cuerdas de metal y cuerpo dreadnought de sonido brillante.", inc: ["Funda", "Púas surtidas"] },
    en: { name: "Spruce-top acoustic guitar", desc: "Steel strings and a bright-sounding dreadnought body.", inc: ["Gig bag", "Assorted picks"] }
  },
  {
    id: "gea-cutaway", cat: "guitarras", icon: "guitar", price: 890, popular: true,
    photos: [photo("guitarra-electroacustica-cutaway-negra-01", 512, 382)],
    uses: ["vivo", "iglesia", "eventos"], level: "intermedio",
    es: { name: "Guitarra electroacústica cutaway", desc: "Ecualizador con afinador integrado, lista para tocar en vivo.", inc: ["Funda", "Cable 3 m", "Correa"] },
    en: { name: "Cutaway electro-acoustic guitar", desc: "Built-in EQ and tuner, ready to play live.", inc: ["Gig bag", "3 m cable", "Strap"] }
  },
  {
    id: "ge-pack", cat: "guitarras", icon: "electric", price: 1150,
    photos: [photo("pack-guitarra-electrica-amplificador-01", 512, 382)],
    uses: ["principiante", "vivo"], level: "inicial",
    es: { name: "Pack guitarra eléctrica + amplificador", desc: "Guitarra tipo stratocaster con amplificador de práctica de 10 W.", inc: ["Amplificador 10 W", "Cable", "Correa", "Funda", "Púas"] },
    en: { name: "Electric guitar + amp pack", desc: "Strat-style guitar with a 10 W practice amplifier.", inc: ["10 W amplifier", "Cable", "Strap", "Gig bag", "Picks"] }
  },
  {
    id: "bajo-4", cat: "guitarras", icon: "electric", price: 1290,
    photos: [photo("bajo-electrico-4-cuerdas-negro-01", 512, 382)],
    uses: ["vivo", "iglesia"], level: "intermedio",
    es: { name: "Bajo eléctrico 4 cuerdas", desc: "Cuerpo sólido y micrófonos P/J para rock, cumbia y alabanza.", inc: ["Funda", "Cable 3 m"] },
    en: { name: "4-string electric bass", desc: "Solid body with P/J pickups for rock, cumbia and worship.", inc: ["Gig bag", "3 m cable"] }
  },
  {
    id: "charango", cat: "guitarras", icon: "charango", price: 450,
    photos: [photo("charango-naranjillo-tallado-01", 512, 382)],
    uses: ["estudiante", "vivo"], level: "intermedio",
    es: { name: "Charango de naranjillo", desc: "10 cuerdas y caja tallada a mano para música andina.", inc: ["Estuche", "Juego de cuerdas extra"] },
    en: { name: "Naranjillo wood charango", desc: "10 strings and a hand-carved body for Andean music.", inc: ["Case", "Spare string set"] }
  },
  {
    id: "ukelele-soprano", cat: "guitarras", icon: "charango", price: 180,
    photos: [photo("ukelele-soprano-01", 512, 382)],
    uses: ["principiante", "estudiante"], level: "inicial",
    es: { name: "Ukelele soprano", desc: "Compacto, liviano y fácil de aprender a cualquier edad.", inc: ["Funda", "Púa de fieltro"] },
    en: { name: "Soprano ukulele", desc: "Compact, light and easy to learn at any age.", inc: ["Gig bag", "Felt pick"] }
  },

  /* ---------- Teclados y pianos ---------- */
  {
    id: "teclado-61", cat: "teclados", icon: "keyboard", price: 690, popular: true,
    photos: [photo("teclado-61-teclas-negro-01", 512, 382)],
    uses: ["principiante", "estudiante", "iglesia"], level: "inicial",
    es: { name: "Teclado 61 teclas sensitivas", desc: "Cientos de sonidos y ritmos, modo aprendizaje y salida de audífonos.", inc: ["Adaptador de corriente", "Atril"] },
    en: { name: "61-key touch-sensitive keyboard", desc: "Hundreds of sounds and rhythms, lesson mode and headphone out.", inc: ["Power adapter", "Music rest"] }
  },
  {
    id: "piano-88", cat: "teclados", icon: "piano", price: 2490, popular: true,
    photos: [photo("piano-digital-88-teclas-mueble-01", 512, 382)],
    uses: ["estudiante", "iglesia", "estudio"], level: "intermedio",
    es: { name: "Piano digital 88 teclas contrapesadas", desc: "Acción martillo, pedal sustain y conexión USB-MIDI.", inc: ["Pedal sustain", "Adaptador", "Atril"] },
    en: { name: "88-key weighted digital piano", desc: "Hammer action, sustain pedal and USB-MIDI.", inc: ["Sustain pedal", "Adapter", "Music rest"] }
  },
  {
    id: "controlador-49", cat: "teclados", icon: "keyboard", price: 590,
    photos: [photo("teclado-controlador-midi-pads-01", 512, 382)],
    uses: ["estudio", "eventos"], level: "intermedio",
    es: { name: "Teclado controlador MIDI 49 teclas", desc: "Pads, perillas asignables y conexión USB para producir música.", inc: ["Cable USB"] },
    en: { name: "49-key MIDI controller", desc: "Pads, assignable knobs and USB for music production.", inc: ["USB cable"] }
  },
  {
    id: "soporte-teclado", cat: "teclados", icon: "stand", price: 110,
    photos: [photo("soporte-teclado-x-doble-tijera-01", 512, 382)],
    uses: ["principiante", "iglesia", "vivo"], level: "inicial",
    es: { name: "Soporte en X para teclado", desc: "Doble tijera, altura regulable y seguro de bloqueo.", inc: [] },
    en: { name: "X-style keyboard stand", desc: "Double-braced, height adjustable with locking pin.", inc: [] }
  },

  /* ---------- Baterías y percusión ---------- */
  {
    id: "bateria-5", cat: "percusion", icon: "drumkit", price: 2390, popular: true,
    photos: [photo("bateria-acustica-5-cuerpos-negra-01", 512, 382)],
    uses: ["vivo", "iglesia", "principiante"], level: "inicial",
    es: { name: "Batería acústica 5 cuerpos", desc: "Bombo 22\", tarola, 3 toms, platillos y hardware completo.", inc: ["Hi-hat y crash/ride", "Banco", "Baquetas"] },
    en: { name: "5-piece acoustic drum kit", desc: "22\" kick, snare, 3 toms, cymbals and full hardware.", inc: ["Hi-hat and crash/ride", "Throne", "Sticks"] }
  },
  {
    id: "bateria-e", cat: "percusion", icon: "drumkit", price: 2190,
    photos: [photo("bateria-electronica-pads-malla-01", 512, 382)],
    uses: ["principiante", "estudio", "iglesia"], level: "intermedio",
    es: { name: "Batería electrónica compacta", desc: "Pads de malla silenciosos y salida de audífonos para practicar en casa.", inc: ["Módulo de sonidos", "Baquetas", "Adaptador"] },
    en: { name: "Compact electronic drum kit", desc: "Quiet mesh pads and headphone out for home practice.", inc: ["Sound module", "Sticks", "Adapter"] }
  },
  {
    id: "cajon-afinable", cat: "percusion", icon: "cajon", price: 380, popular: true,
    photos: [photo("cajon-peruano-afinable-nogal-01", 512, 382)],
    uses: ["vivo", "principiante", "estudiante"], level: "intermedio",
    es: { name: "Cajón peruano afinable", desc: "Tapa con tornillos de ajuste para controlar el golpe seco.", inc: ["Funda acolchada"] },
    en: { name: "Tunable Peruvian cajón", desc: "Front plate with adjustment screws to shape the slap.", inc: ["Padded bag"] }
  },
  {
    id: "cajon-estudio", cat: "percusion", icon: "cajon", price: 220,
    photos: [photo("cajon-peruano-estudio-madera-clara-01", 512, 382)],
    uses: ["principiante", "estudiante"], level: "inicial",
    es: { name: "Cajón peruano de estudio", desc: "Liviano y resistente, ideal para clases y talleres.", inc: [] },
    en: { name: "Study Peruvian cajón", desc: "Light and sturdy, ideal for lessons and workshops.", inc: [] }
  },
  {
    id: "congas", cat: "percusion", icon: "conga", price: 1450,
    photos: [photo("par-congas-madera-soporte-01", 512, 382)],
    uses: ["vivo", "eventos"], level: "intermedio",
    es: { name: "Par de congas 11\" y 12\"", desc: "Cuerpo de madera y soporte doble para salsa y cumbia.", inc: ["Soporte doble", "Llave de afinación"] },
    en: { name: "11\" & 12\" conga pair", desc: "Wooden shells and double stand for salsa and cumbia.", inc: ["Double stand", "Tuning key"] }
  },
  {
    id: "bongos", cat: "percusion", icon: "conga", price: 260,
    photos: [photo("bongos-madera-01", 512, 382)],
    uses: ["principiante", "vivo"], level: "inicial",
    es: { name: "Bongós de madera 7\" y 8\"", desc: "Afinables y livianos, para empezar en percusión latina.", inc: ["Llave de afinación"] },
    en: { name: "7\" & 8\" wooden bongos", desc: "Tunable and light, to start in Latin percussion.", inc: ["Tuning key"] }
  },
  {
    id: "timbales", cat: "percusion", icon: "drum", price: 1390,
    photos: [photo("timbales-cromados-cencerro-01", 512, 382)],
    uses: ["vivo", "eventos"], level: "pro",
    es: { name: "Timbales 13\" y 14\" con cencerro", desc: "Cascos de acero, soporte y cencerro para orquesta.", inc: ["Soporte", "Cencerro", "Palos"] },
    en: { name: "13\" & 14\" timbales with cowbell", desc: "Steel shells, stand and cowbell for bands.", inc: ["Stand", "Cowbell", "Sticks"] }
  },
  {
    id: "tarola", cat: "percusion", icon: "snare", price: 230,
    photos: [photo("tarola-escolar-blanca-correa-01", 512, 382)],
    uses: ["banda", "estudiante"], level: "inicial",
    es: { name: "Tarola escolar 14\"", desc: "Bordonero ajustable y correa, para bandas de colegio.", inc: ["Correa", "Baquetas"] },
    en: { name: "14\" school snare drum", desc: "Adjustable snares and strap, for school bands.", inc: ["Strap", "Sticks"] }
  },
  {
    id: "bombo-desfile", cat: "percusion", icon: "drum", price: 420,
    photos: [photo("bombo-desfile-blanco-arnes-01", 512, 382)],
    uses: ["banda"], level: "inicial",
    es: { name: "Bombo de desfile 22\"", desc: "Liviano y con arnés, para desfiles y actuaciones.", inc: ["Arnés", "Par de mazos"] },
    en: { name: "22\" marching bass drum", desc: "Lightweight with harness, for parades and events.", inc: ["Harness", "Pair of mallets"] }
  },

  /* ---------- Micrófonos y audio ---------- */
  {
    id: "mic-dinamico", cat: "audio", icon: "mic", price: 120, popular: true,
    photos: [photo("microfono-dinamico-vocal-negro-01", 512, 382)],
    uses: ["iglesia", "vivo", "principiante"], level: "inicial",
    es: { name: "Micrófono dinámico vocal", desc: "Patrón cardioide que reduce el acople, para uso diario.", inc: ["Cable XLR 5 m", "Pinza"] },
    en: { name: "Dynamic vocal microphone", desc: "Cardioid pattern that reduces feedback, for daily use.", inc: ["5 m XLR cable", "Clip"] }
  },
  {
    id: "mic-inalambrico", cat: "audio", icon: "mic", price: 590,
    photos: [photo("kit-microfonos-inalambricos-uhf-receptor-01", 512, 382)],
    uses: ["iglesia", "eventos"], level: "intermedio",
    es: { name: "Kit 2 micrófonos inalámbricos UHF", desc: "Receptor doble para predicación, animación y eventos.", inc: ["Receptor", "2 micrófonos de mano"] },
    en: { name: "2× UHF wireless microphone kit", desc: "Dual receiver for preaching, hosting and events.", inc: ["Receiver", "2 handheld mics"] }
  },
  {
    id: "mic-condensador", cat: "audio", icon: "mic", price: 390,
    photos: [photo("microfono-condensador-estudio-arana-01", 512, 382)],
    uses: ["estudio"], level: "inicial",
    es: { name: "Micrófono condensador de estudio", desc: "Diafragma grande para voz, podcast y contenido.", inc: ["Araña antivibración", "Filtro antipop"] },
    en: { name: "Studio condenser microphone", desc: "Large diaphragm for vocals, podcasts and content.", inc: ["Shock mount", "Pop filter"] }
  },
  {
    id: "interfaz-2x2", cat: "audio", icon: "interface", price: 690, popular: true,
    photos: [photo("interfaz-audio-usb-2x2-01", 512, 382)],
    uses: ["estudio"], level: "inicial",
    es: { name: "Interfaz de audio USB 2×2", desc: "Dos entradas con phantom 48 V para grabar en casa.", inc: ["Cable USB", "Software de grabación"] },
    en: { name: "2×2 USB audio interface", desc: "Two inputs with 48 V phantom to record at home.", inc: ["USB cable", "Recording software"] }
  },
  {
    id: "consola-8", cat: "audio", icon: "mixer", price: 850,
    photos: [photo("consola-mezcladora-8-canales-01", 512, 382)],
    uses: ["iglesia", "eventos", "estudio"], level: "intermedio",
    es: { name: "Consola 8 canales con USB y efectos", desc: "Preamplificadores de micrófono, efectos y grabación USB.", inc: ["Fuente de poder"] },
    en: { name: "8-channel mixer with USB & FX", desc: "Mic preamps, effects and USB recording.", inc: ["Power supply"] }
  },
  {
    id: "parlante-15", cat: "audio", icon: "speaker", price: 1390,
    photos: [photo("parlante-activo-15-negro-01", 512, 382)],
    uses: ["iglesia", "eventos", "vivo"], level: "intermedio",
    es: { name: "Parlante activo 15\"", desc: "Bluetooth, mezclador de 3 canales y entrada de micrófono.", inc: ["Cable de poder"] },
    en: { name: "15\" powered speaker", desc: "Bluetooth, 3-channel mixer and mic input.", inc: ["Power cable"] }
  },
  {
    id: "monitores-5", cat: "audio", icon: "monitor", price: 1290,
    photos: [photo("par-monitores-estudio-5-01", 512, 382)],
    uses: ["estudio"], level: "intermedio",
    es: { name: "Par de monitores de estudio 5\"", desc: "Biamplificados, con ajuste según tu habitación.", inc: ["Cables de poder"] },
    en: { name: "Pair of 5\" studio monitors", desc: "Bi-amped, with room adjustment controls.", inc: ["Power cables"] }
  },
  {
    id: "audifonos-estudio", cat: "audio", icon: "headphones", price: 290,
    photos: [photo("audifonos-estudio-cerrados-negros-01", 512, 382)],
    uses: ["estudio", "eventos"], level: "inicial",
    es: { name: "Audífonos de estudio cerrados", desc: "Respuesta plana para mezclar y buen aislamiento.", inc: ["Adaptador 6,3 mm"] },
    en: { name: "Closed-back studio headphones", desc: "Flat response for mixing and good isolation.", inc: ["6.3 mm adapter"] }
  },
  {
    id: "controladora-dj", cat: "audio", icon: "dj", price: 1190,
    photos: [photo("controladora-dj-2-canales-01", 512, 382)],
    uses: ["eventos", "estudio"], level: "inicial",
    es: { name: "Controladora DJ 2 canales", desc: "Jog wheels, pads de performance y tarjeta de sonido.", inc: ["Cable USB", "Software de DJ"] },
    en: { name: "2-channel DJ controller", desc: "Jog wheels, performance pads and sound card.", inc: ["USB cable", "DJ software"] }
  },

  /* ---------- Amplificadores ---------- */
  {
    id: "amp-20", cat: "amplificadores", icon: "amp", price: 490, popular: true,
    photos: [photo("amplificador-guitarra-20w-reverb-01", 512, 382)],
    uses: ["principiante", "vivo"], level: "inicial",
    es: { name: "Amplificador de guitarra 20 W", desc: "Canal limpio y distorsión, ideal para practicar.", inc: [] },
    en: { name: "20 W guitar amplifier", desc: "Clean and overdrive channels, ideal for practice.", inc: [] }
  },
  {
    id: "amp-50", cat: "amplificadores", icon: "amp", price: 1490,
    photos: [photo("amplificador-guitarra-combo-1x12-reverb-01", 512, 382)],
    uses: ["vivo", "iglesia"], level: "pro",
    es: { name: "Amplificador de guitarra 50 W 1×12\"", desc: "Dos canales, reverb y salida de línea para escenario.", inc: ["Pedal de cambio de canal"] },
    en: { name: "50 W 1×12\" guitar amplifier", desc: "Two channels, reverb and line out for the stage.", inc: ["Channel footswitch"] }
  },
  {
    id: "amp-bajo", cat: "amplificadores", icon: "amp", price: 690,
    photos: [photo("amplificador-bajo-30w-01", 512, 382)],
    uses: ["principiante", "vivo"], level: "inicial",
    es: { name: "Amplificador de bajo 30 W", desc: "Parlante de 10\" y ecualizador de 3 bandas.", inc: [] },
    en: { name: "30 W bass amplifier", desc: "10\" speaker and 3-band EQ.", inc: [] }
  },
  {
    id: "amp-acustica", cat: "amplificadores", icon: "amp", price: 890,
    photos: [photo("amplificador-acustico-madera-01", 512, 382)],
    uses: ["vivo", "iglesia", "eventos"], level: "intermedio",
    es: { name: "Amplificador acústico 40 W", desc: "Entradas para guitarra y micrófono, con reverb.", inc: [] },
    en: { name: "40 W acoustic amplifier", desc: "Guitar and mic inputs, with reverb.", inc: [] }
  },
  {
    id: "amp-teclado", cat: "amplificadores", icon: "speaker", price: 1190,
    photos: [photo("amplificador-teclado-3-canales-01", 512, 382)],
    uses: ["iglesia", "vivo"], level: "intermedio",
    es: { name: "Amplificador de teclado 60 W", desc: "Tres canales para teclado, micrófono y reproductor.", inc: [] },
    en: { name: "60 W keyboard amplifier", desc: "Three channels for keyboard, mic and player.", inc: [] }
  },

  /* ---------- Accesorios musicales ---------- */
  {
    id: "afinador", cat: "accesorios", icon: "tuner", price: 45, popular: true,
    photos: [photo("afinador-cromatico-clip-01", 512, 382)],
    uses: ["principiante", "estudiante", "vivo"], level: "inicial",
    es: { name: "Afinador cromático de clip", desc: "Para guitarra, bajo, charango y ukelele.", inc: [] },
    en: { name: "Clip-on chromatic tuner", desc: "For guitar, bass, charango and ukulele.", inc: [] }
  },
  {
    id: "cuerdas-nylon", cat: "accesorios", icon: "strings", price: 35,
    photos: [photo("juego-cuerdas-nylon-guitarra-clasica-01", 512, 382)],
    uses: ["principiante", "estudiante", "vivo"], level: "inicial",
    es: { name: "Juego de cuerdas de nylon", desc: "Tensión normal para guitarra clásica.", inc: [] },
    en: { name: "Nylon string set", desc: "Normal tension for classical guitar.", inc: [] }
  },
  {
    id: "cuerdas-metal", cat: "accesorios", icon: "strings", price: 45,
    photos: [photo("juego-cuerdas-bronce-guitarra-acustica-01", 512, 382)],
    uses: ["vivo", "iglesia"], level: "inicial",
    es: { name: "Juego de cuerdas para acústica", desc: "Calibre 0.12 de bronce para guitarra de metal.", inc: [] },
    en: { name: "Acoustic guitar string set", desc: "Bronze .012 gauge for steel-string guitar.", inc: [] }
  },
  {
    id: "cable-6", cat: "accesorios", icon: "cable", price: 35,
    photos: [photo("cable-instrumento-6m-negro-01", 512, 382)],
    uses: ["vivo", "iglesia", "eventos"], level: "inicial",
    es: { name: "Cable de instrumento 6 m", desc: "Plug 6,3 mm con malla trenzada anti ruido.", inc: [] },
    en: { name: "6 m instrument cable", desc: "6.3 mm plugs with braided low-noise shielding.", inc: [] }
  },
  {
    id: "pedestal-mic", cat: "accesorios", icon: "micstand", price: 95,
    photos: [photo("pedestal-microfono-boom-tripode-01", 512, 382)],
    uses: ["vivo", "iglesia", "eventos"], level: "inicial",
    es: { name: "Pedestal de micrófono con boom", desc: "Base trípode plegable y brazo regulable.", inc: ["Pinza"] },
    en: { name: "Boom microphone stand", desc: "Folding tripod base and adjustable arm.", inc: ["Clip"] }
  },
  {
    id: "baquetas-5a", cat: "accesorios", icon: "sticks", price: 30,
    uses: ["principiante", "vivo", "banda"], level: "inicial",
    es: { name: "Baquetas 5A de nogal (par)", desc: "Balance clásico para batería y tarola.", inc: [] },
    en: { name: "Hickory 5A drumsticks (pair)", desc: "Classic balance for drum kit and snare.", inc: [] }
  },
  {
    id: "estuche-guitarra", cat: "accesorios", icon: "case", price: 120,
    photos: [photo("estuche-acolchado-guitarra-negro-01", 512, 382)],
    uses: ["estudiante", "vivo"], level: "inicial",
    es: { name: "Estuche acolchado para guitarra", desc: "Espuma de 10 mm, bolsillos y tiras tipo mochila.", inc: [] },
    en: { name: "Padded guitar gig bag", desc: "10 mm foam, pockets and backpack straps.", inc: [] }
  },
  {
    id: "correa", cat: "accesorios", icon: "pick", price: 40,
    photos: [photo("correa-guitarra-negra-cuero-01", 512, 382)],
    uses: ["vivo", "principiante"], level: "inicial",
    es: { name: "Correa ajustable para guitarra", desc: "Tejido resistente con extremos de cuero.", inc: [] },
    en: { name: "Adjustable guitar strap", desc: "Durable webbing with leather ends.", inc: [] }
  }
];
