import React, { useState, useEffect, useMemo, useRef } from 'react';

// Authentic 9th Grade 1st Unit Questions - EVET / HAYIR (True / False) Format across all core subjects
const INITIAL_QUESTIONS = [
  {
    id: "q1",
    tag: "MATEMATİK • 1. ÜNİTE: MANTIK • +50 XP",
    time: "02:00",
    q: "p: 'En küçük asal sayı 2'dir' ve q: '3² = 6' önermeleri veriliyor. (p ∧ q') önermesinin doğruluk değeri 1 (Doğru) midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! p = 1 (Doğru) ve q = 0 (Yanlış) olur. q' = 1 olacağından (1 ∧ 1) = 1 (Doğru) sonucuna ulaşılır."
  },
  {
    id: "q2",
    tag: "FİZİK • 1. ÜNİTE: FİZİK BİLİMİNE GİRİŞ • +50 XP",
    time: "01:45",
    q: "Hız (m/s) büyüklüğü, temel bir büyüklük müdür?",
    options: ["EVET", "HAYIR"],
    correct: 1, // HAYIR
    explain: "HAYIR! Hız türetilmiş bir büyüklüktür. Temel büyüklükler KISA MUZ (Kütle, Işık Şiddeti, Sıcaklık, Akım, Madde Miktarı, Uzunluk, Zaman) ile sembolize edilir."
  },
  {
    id: "q3",
    tag: "KİMYA • 1. ÜNİTE: KİMYA BİLİMİ • +50 XP",
    time: "01:30",
    q: "Simyacı Cabir bin Hayyan tarafından geliştirilen 'İmbik' aracı damıtma işleminde kullanılır mı?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! İmbik, sıvı karışımları kaynama noktalarına göre damıtmada kullanılan ve simyadan kimyaya aktarılan temel araçlardandır."
  },
  {
    id: "q4",
    tag: "BİYOLOJİ • 1. ÜNİTE: YAŞAM BİLİMİ BİYOLOJİ • +50 XP",
    time: "01:40",
    q: "Canlıların iç ortamlarını kararlı ve dengede tutma eğilimine 'Homeostazi' adı verilir mi?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Homeostazi iç denge demektir. Vücut sıcaklığının ve kan şekerinin sabit tutulması buna örnektir."
  },
  {
    id: "q5",
    tag: "EDEBİYAT • 1. ÜNİTE: İLETİŞİM • +50 XP",
    time: "01:30",
    q: "Bir iletişim sürecinde gönderilen duygu ve düşüncelerin aktarıldığı ortak semboller sistemine 'Kod (Dil)' denir mi?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! İletişimde kullanılan ortak dil veya işaret sistemi Kod olarak adlandırılır."
  },
  {
    id: "q6",
    tag: "TARİH • 1. ÜNİTE: TARİH VE ZAMAN • +50 XP",
    time: "01:45",
    q: "Tarih bilimi geçmiş olayları incelerken laboratuvar deneyi ve gözlem yöntemini kullanabilir mi?",
    options: ["EVET", "HAYIR"],
    correct: 1, // HAYIR
    explain: "HAYIR! Geçmişte yaşanmış olaylar tekrar ettirilemeyeceği için tarih biliminde deney ve gözlem yapılamaz, belgelere dayanılır."
  },
  {
    id: "q7",
    tag: "COĞRAFYA • 1. ÜNİTE: DOĞAL SİSTEMLER • +50 XP",
    time: "01:30",
    q: "Dünyanın katmanlarından 'Atmosfer', gezegenimizi saran gaz küre midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Atmosfer dünyayı çevreleyen gaz katmanıdır; Biyosfer canlı, Hidrosfer su, Litosfer taş küredir."
  },
  {
    id: "q8",
    tag: "MATEMATİK • 1. ÜNİTE: MANTIK • +50 XP",
    time: "01:40",
    q: "(p ∨ p') bileşik önermesinin doğruluk değeri daima 1 (Doğru) midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! 'Veya' (∨) bağlacında bileşenlerden en az biri 1 ise sonuç 1'dir. p ile p' önermelerinden biri mutlaka 1'dir."
  },
  {
    id: "q9",
    tag: "FİZİK • 1. ÜNİTE: FİZİK BİLİMİNE GİRİŞ • +50 XP",
    time: "01:35",
    q: "Kütle (kg) ve Sıcaklık (Kelvin) skaler büyüklükler midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Sadece sayı ve birimle ifade edilen büyüklüklere skaler büyüklük denir, yön gerektirmezler."
  },
  {
    id: "q10",
    tag: "KİMYA • 1. ÜNİTE: KİMYA BİLİMİ • +50 XP",
    time: "01:30",
    q: "Simya dönemi çalışmalarında teorik temeller kurulmuş ve sistematik bilgi birikimi sağlanmış mıdır?",
    options: ["EVET", "HAYIR"],
    correct: 1, // HAYIR
    explain: "HAYIR! Simya bir bilim değildir; teorik temelleri ve sistematik bilgi birikimi yoktur, sınama-yanılmaya dayanır."
  },
  {
    id: "q11",
    tag: "BİYOLOJİ • 1. ÜNİTE: YAŞAM BİLİMİ BİYOLOJİ • +50 XP",
    time: "01:45",
    q: "Tüm canlı organizmalar hücresel yapıya sahip midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Hücresel yapı tüm canlıların ortak özelliğidir. Tek hücreli veya çok hücreli olabilirler."
  },
  {
    id: "q12",
    tag: "İNGİLİZCE • UNIT 1: STUDYING ABROAD • +50 XP",
    time: "01:20",
    q: "Is 'Where are you from?' used to ask someone's nationality or country of origin?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! 'Where are you from?' sorusu bir kişinin nereli olduğunu sormak için kullanılır."
  },
  {
    id: "q13",
    tag: "EDEBİYAT • 1. ÜNİTE: İLETİŞİM • +50 XP",
    time: "01:30",
    q: "Alıcının göndericiye verdiği cevaba veya tepkiye 'Dönüt (Geri Bildirim)' denir mi?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! İletişimde alıcının iletiye karşılık vermesi sürecine Dönüt (Feedback) denir."
  },
  {
    id: "q14",
    tag: "TARİH • 1. ÜNİTE: TARİH VE ZAMAN • +50 XP",
    time: "01:40",
    q: "Türklerin tarih boyunca kullandığı ilk takvim 'Hicri Takvim' midir?",
    options: ["EVET", "HAYIR"],
    correct: 1, // HAYIR
    explain: "HAYIR! Türklerin kullandığı ilk takvim Güneş yılı esasına dayanan '12 Hayvanlı Türk Takvimi'dir."
  },
  {
    id: "q15",
    tag: "MATEMATİK • 1. ÜNİTE: MANTIK • +50 XP",
    time: "01:50",
    q: "İki önermenin birbirine denk olması için doğruluk değerlerinin aynı olması yeterli midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Doğruluk değerleri aynı olan (ikisi de 1 veya ikisi de 0) önermelere denk önermeler denir ve (≡) sembolü ile gösterilir."
  },
  {
    id: "q16",
    tag: "FİZİK • 1. ÜNİTE: FİZİK BİLİMİNE GİRİŞ • +50 XP",
    time: "01:30",
    q: "Vektörel büyüklüklerin belirlenebilmesi için sayı ve birimin yanında yön ve doğrultu bilgisine de gerek var mıdır?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Vektörel büyüklükler sayı ve birimin yanında mutlaka yön, doğrultu ve başlangıç noktası gerektirir (Örn: Kuvvet, Hız, İvme)."
  },
  {
    id: "q17",
    tag: "KİMYA • 1. ÜNİTE: KİMYA BİLİMİ • +50 XP",
    time: "01:25",
    q: "Sönmüş kirecin kimyasal formülü Ca(OH)₂ midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Sönmüş kireç Kalsiyum Hidroksit Ca(OH)₂ formülü ile gösterilir. Sönmemiş kireç ise CaO'tir."
  },
  {
    id: "q18",
    tag: "COĞRAFYA • 1. ÜNİTE: İNSAN VE DOĞA • +50 XP",
    time: "01:35",
    q: "Süveyş Kanalı'nın açılması insanın doğal çevreye müdahalesine örnek midir?",
    options: ["EVET", "HAYIR"],
    correct: 0, // EVET
    explain: "EVET! Kanal açılması veya baraj yapılması insanın doğal çevreyi kendi ihtiyaçlarına göre değiştirmesine örnektir."
  }
];

const INITIAL_BADGES = [
  { id: "1", name: "İlk Kıvılcım", desc: "İlk görevi tamamla", icon: "✦", unlocked: true, story: "9VERSE Evrenine ilk adım. Sistem seni fark etti.", rarity: "Nadir" },
  { id: "2", name: "Protokol Şampiyonu", desc: "Günün protokolünü onayla", icon: "🛡️", unlocked: false, story: "3 görevin tamamını bitirip günlük protokol onayını aldın.", rarity: "Epik" },
  { id: "3", name: "Gece Baykuşu", desc: "22:00 sonrası aktif", icon: "🦉", unlocked: true, story: "Kampüs uyurken sen kod yazıyordun. Gece tayfası seni selamlıyor.", rarity: "Nadir" },
  { id: "4", name: "9. Sınıf Avcısı", desc: "1. Ünite sorusunu çöz", icon: "🎯", unlocked: false, story: "9. Sınıf müfredat sorusunu başarıyla çözdün.", rarity: "Ender" },
  { id: "5", name: "Gizli Yazar", desc: "Kutuya 3 not bırak", icon: "👁️", unlocked: false, story: "Anonimlik cesaret ister. Fikirlerin maskesiz daha güçlü.", rarity: "Epik" },
  { id: "6", name: "Matrix Kaşifi", desc: "Gizli kod", icon: "💊", unlocked: false, story: "Tavşan deliğini takip ettin. Gerçeklik bir simülasyon mu?", rarity: "Efsanevi" }
];

const INITIAL_LEADERBOARD = [
  { id: "l1", rank: 1, name: "Elif K.", xp: 2840, avatar: "✦", lvl: 12, branch: "9-D", isAdmin: true },
  { id: "l2", rank: 2, name: "Rıza M.", xp: 2410, avatar: "/logo.png", lvl: 7, me: true, branch: "9-D", isAdmin: true },
  { id: "l3", rank: 3, name: "Aras D.", xp: 2380, avatar: "◈", lvl: 7, branch: "9-D", isAdmin: false },
  { id: "l4", rank: 4, name: "Zeynep S.", xp: 2210, avatar: "⬙", lvl: 6, branch: "9-D", isAdmin: false },
  { id: "l5", rank: 5, name: "Can B.", xp: 1980, avatar: "⚡", lvl: 6, branch: "9-D", isAdmin: false },
  { id: "l6", rank: 6, name: "Defne T.", xp: 1840, avatar: "📐", lvl: 5, branch: "9-D", isAdmin: false }
];

const INITIAL_EVENTS = [
  { id: "e1", title: "9VERSE Hackathon & AI Atölyesi", day: "Yarın", time: "16:30", loc: "Lab 2", count: 18, dot: "bg-zinc-200" },
  { id: "e2", title: "Sınıf Turnuvası (Arena Finali)", day: "Cuma", time: "15:00", loc: "Arena", count: 32, dot: "bg-zinc-400" },
  { id: "e3", title: "9. Sınıf 1. Yazılı Hazırlık Analizi", day: "Pazartesi", time: "10:00", loc: "9-D Amfi", count: 28, dot: "bg-amber-300" }
];

const INITIAL_SCHEDULE = [
  { id: "s1", hour: "08:30 - 09:10", subject: "Matematik", topic: "Mantık & Doğruluk Tabloları", teacher: "A. Yılmaz", icon: "📐" },
  { id: "s2", hour: "09:20 - 10:00", subject: "Fizik", topic: "Fiziksel Büyüklükler & Birimler", teacher: "M. Kaya", icon: "⚡" },
  { id: "s3", hour: "10:10 - 10:50", subject: "Kimya", topic: "Simyadan Kimyaya Geçiş", teacher: "S. Demir", icon: "🧪" },
  { id: "s4", hour: "11:00 - 11:40", subject: "Biyoloji", topic: "Canlıların Ortak Özellikleri", teacher: "E. Şahin", icon: "🧬" }
];

const REACTOR_WORDS = ["FİZİK", "DENGE", "YÖRÜNGE", "ATOM", "VERİ", "ALGORİTMA", "KUANTUM", "NEBULA", "VEKTÖR", "SİMETRİ", "SİBER", "MATRIX"];
const LOGIC_PATTERNS = [
  { seq: [2, 6, 12, 20, 30], ans: 42, rule: "n²+n → 1²+1=2, 2²+2=6..." },
  { seq: [3, 8, 15, 24, 35], ans: 48, rule: "n²-1" },
  { seq: [1, 4, 9, 16, 25], ans: 36, rule: "Tam kareler" },
  { seq: [2, 3, 5, 7, 11], ans: 13, rule: "Asal sayılar" }
];

// Sleek Premium Digital Emblem & Vector Icon Presets (Strictly Monochromatic Obsidian & Platinum Badges)
const PRESET_AVATARS = [
  { id: "logo", symbol: "/logo.png", name: "9VERSE Main Logo", type: "img", bg: "from-zinc-100 via-zinc-300 to-zinc-600" },
  { id: "p1", symbol: "✦", name: "Siber Matris", type: "badge", bg: "from-zinc-100 via-zinc-400 to-zinc-800" },
  { id: "p2", symbol: "◈", name: "Kuantum Vektör", type: "badge", bg: "from-zinc-800 via-zinc-900 to-black" },
  { id: "p3", symbol: "⬙", name: "Kinetik Yörünge", type: "badge", bg: "from-slate-200 via-slate-400 to-slate-800" },
  { id: "p4", symbol: "⚡", name: "Plazma Reaktör", type: "badge", bg: "from-amber-200 via-yellow-500 to-zinc-900" },
  { id: "p5", symbol: "🧬", name: "Genom Hekim", type: "badge", bg: "from-zinc-300 via-zinc-600 to-zinc-950" },
  { id: "p6", symbol: "🛡️", name: "Titan Kalkan", type: "badge", bg: "from-zinc-700 via-zinc-900 to-black" },
  { id: "p7", symbol: "👑", name: "Sınıf Lideri", type: "badge", bg: "from-amber-100 via-yellow-400 to-amber-800" },
  { id: "p8", symbol: "🌌", name: "Derin Uzay", type: "badge", bg: "from-zinc-900 via-black to-zinc-950" },
  { id: "p9", symbol: "🧠", name: "Kuantum Zeka", type: "badge", bg: "from-slate-100 via-zinc-400 to-zinc-900" },
  { id: "p10", symbol: "📐", name: "Vektör Mantık", type: "badge", bg: "from-zinc-200 via-slate-500 to-zinc-950" },
  { id: "p11", symbol: "🧪", name: "Simya Kimya", type: "badge", bg: "from-zinc-400 via-zinc-700 to-zinc-950" },
  { id: "p12", symbol: "📜", name: "Tarih Muhafızı", type: "badge", bg: "from-stone-300 via-stone-600 to-stone-950" },
  { id: "p13", symbol: "🪐", name: "Yörünge Kaptan", type: "badge", bg: "from-neutral-800 via-zinc-900 to-black" },
  { id: "p14", symbol: "💻", name: "Kod Ustası", type: "badge", bg: "from-zinc-200 via-slate-400 to-zinc-900" },
  { id: "p15", symbol: "🎯", name: "Sayısal Analist", type: "badge", bg: "from-zinc-300 via-zinc-600 to-black" },
  { id: "p16", symbol: "🎓", name: "Akademik Şampiyon", type: "badge", bg: "from-white via-zinc-300 to-zinc-800" },
  { id: "p17", symbol: "🏆", name: "9VERSE Efsanesi", type: "badge", bg: "from-amber-200 via-yellow-500 to-zinc-900" },
  { id: "p18", symbol: "◇", name: "Elmas Kristal", type: "badge", bg: "from-white via-zinc-200 to-zinc-600" }
];

// Tüm 9. Sınıf Şubeleri (9-A, 9-B, 9-C, 9-D)
const AVAILABLE_BRANCHES = ["9-A", "9-B", "9-C", "9-D"];
const ADMIN_PIN = "9V21#k"; // 6 Karakterli Harf + Sayı + Sembol Admin Şifresi

// High-Tech 60fps HTML5 Canvas Engine (Monochromatic Platinum Laser FX)
function SplashFXCanvas({ triggerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Dense Twinkling Stardust Field matching reference photo (~190 dust points)
    const stardustColors = ["#ffffff", "#fef08a", "#fbbf24", "#e2e8f0", "#cbd5e1", "#94a3b8"];
    const stardustNodes = Array.from({ length: 190 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.35 - 0.08,
      baseRadius: Math.random() * 2.1 + 0.5,
      baseAlpha: Math.random() * 0.65 + 0.2,
      twinkleSpeed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
      color: stardustColors[Math.floor(Math.random() * stardustColors.length)]
    }));

    const clickBeams = []; // Active straight laser lines on click

    // CLICK TRIGGER: Repel stardust & fire multi-directional platinum vector ray burst
    const spawnFX = (x, y) => {
      stardustNodes.forEach((node) => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 240 && dist > 0) {
          const force = (1 - dist / 240) * 14;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      });

      // Fire 36 Monochromatic Platinum & Diamond Laser Beams
      const colors = ["#ffffff", "#fef08a", "#e2e8f0", "#d4d4d8", "#a1a1aa", "#71717a", "#fbbf24"];
      for (let i = 0; i < 36; i++) {
        const angle = (Math.PI * 2 * i) / 36 + (Math.random() - 0.5) * 0.1;
        const raySpeed = Math.random() * 9.5 + 5;
        clickBeams.push({
          x,
          y,
          vx: Math.cos(angle) * raySpeed,
          vy: Math.sin(angle) * raySpeed,
          length: Math.random() * 55 + 25,
          width: Math.random() * 2.8 + 1,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          color: colors[i % colors.length]
        });
      }
    };

    if (triggerRef) {
      triggerRef.current = spawnFX;
    }

    let time = 0;

    const render = () => {
      time += 16;
      ctx.clearRect(0, 0, width, height);

      // Top Volumetric Spotlight Beam matching reference photo
      const spotGrad = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, height * 0.65);
      spotGrad.addColorStop(0, "rgba(234, 179, 8, 0.22)");
      spotGrad.addColorStop(0.35, "rgba(245, 158, 11, 0.09)");
      spotGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.03)");
      spotGrad.addColorStop(1, "transparent");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Ambient Twinkling Stardust Dust Points (Reference photo style)
      for (let i = 0; i < stardustNodes.length; i++) {
        const n = stardustNodes[i];

        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.965; // Friction
        n.vy *= 0.965;

        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        const twinkleAlpha = Math.max(0.12, n.baseAlpha + Math.sin(time * n.twinkleSpeed + n.phase) * 0.38);

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = twinkleAlpha;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.baseRadius > 1.7 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Active Click Vector Laser Rays
      for (let i = clickBeams.length - 1; i >= 0; i--) {
        const beam = clickBeams[i];
        beam.x += beam.vx;
        beam.y += beam.vy;
        beam.alpha -= beam.decay;

        if (beam.alpha <= 0) {
          clickBeams.splice(i, 1);
          continue;
        }

        const moveAngle = Math.atan2(beam.vy, beam.vx);
        const headX = beam.x;
        const headY = beam.y;
        const tailX = headX - Math.cos(moveAngle) * beam.length;
        const tailY = headY - Math.sin(moveAngle) * beam.length;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = beam.color;
        ctx.globalAlpha = beam.alpha;
        ctx.lineWidth = beam.width;
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

export default function App() {
  const splashFxRef = useRef(null);

  // 3D Splash Screen State
  const [show3DSplash, setShow3DSplash] = useState(true);

  const [splashProgress, setSplashProgress] = useState(0);
  const [splashTimerSeconds, setSplashTimerSeconds] = useState(4.0);

  // User Registration & Authentication State
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationScreen, setShowRegistrationScreen] = useState(false);
  
  // Main Entry Screen Login Mode ("student" or "admin")
  const [entryMode, setEntryMode] = useState("student");
  const [adminLoginName, setAdminLoginName] = useState("Sistem Yöneticisi");
  const [adminLoginPassword, setAdminLoginPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("kampus");
  
  // Admin PIN Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Rıza M.",
    title: "Kurucu Kaşif",
    grade: "9-D",
    avatar: "/logo.png",
    bio: "9VERSE Evreninde 9. sınıf müfredatı ve teknoloji üzerinde çalışıyorum.",
    isAdmin: true,
    accountType: "Yönetici"
  });

  // App Level & XP
  const [xp, setXp] = useState(1240);
  const [streak] = useState(12);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Background Music Player (Mabel Matiz - Vals - YouTube oLOOAFETHO0)
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [showPlayerVideo, setShowPlayerVideo] = useState(false);

  function toggleBackgroundMusic() {
    if (isPlayingMusic) {
      setIsPlayingMusic(false);
      showToast("🔇 Mabel Matiz - Vals Durduruldu");
    } else {
      setIsPlayingMusic(true);
      showToast("🎵 Mabel Matiz - Vals (Orijinal Parça) Çalıyor...");
    }
  }

  // Today's Protocol Approval Status
  const [isProtocolApproved, setIsProtocolApproved] = useState(false);

  // Student Daily Question Submission Tracker
  const [hasSubmittedQuestionToday, setHasSubmittedQuestionToday] = useState(false);
  const [showStudentAddQModal, setShowStudentAddQModal] = useState(false);

  // Profile Edit Modal State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editGrade, setEditGrade] = useState("9-D");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  // Registration & Login Form State
  const [studentAuthMode, setStudentAuthMode] = useState("login"); // "login" or "register"
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [regGrade, setRegGrade] = useState("9-A");
  const [regTitle, setRegTitle] = useState("Siber Kaşif");
  const [regAccountType, setRegAccountType] = useState("Öğrenci");
  const [regAvatar, setRegAvatar] = useState("/logo.png");

  // Questions, Tasks & Posts State
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const [scheduleList, setScheduleList] = useState(INITIAL_SCHEDULE);

  const [tasks, setTasks] = useState([
    { id: "1", title: "Arena'da 1 maç yap", xp: 30, done: false, icon: "🎮" },
    { id: "2", title: "Gizli Kutu'ya not bırak", xp: 20, done: false, icon: "🕵️" },
    { id: "3", title: "Günün 9. Sınıf Sorusunu çöz", xp: 50, done: false, icon: "🧠" }
  ]);

  const [posts, setPosts] = useState([
    { id: "1", text: "9. Sınıf Fizik dersindeki KISA MUZ kuralını hatırlayan var mı?", avatar: "👾", votes: 14, voted: false, time: "12dk önce" },
    { id: "2", text: "Matematik Mantık konusunda doğruluk tablosu özeti çıkaran paylaşabilir mi?", avatar: "👻", votes: 9, voted: false, time: "1s önce" },
    { id: "3", text: 'Kimya dersinde simyadan kimyaya geçiş yöntemleri sınavda çıkar dediler!', avatar: "🦊", votes: 24, voted: true, time: "3s önce" }
  ]);

  const [badges, setBadges] = useState(INITIAL_BADGES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [leaderboardBranchFilter, setLeaderboardBranchFilter] = useState("ALL");
  const [leaderboardMode, setLeaderboardMode] = useState("week");
  const [newPostText, setNewPostText] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Admin Announcements State
  const [announcements, setAnnouncements] = useState([
    { id: "a1", title: "📢 9. Sınıf EVET / HAYIR Soruları Aktif!", text: "Sistemdeki tüm sorular EVET / HAYIR formatına güncellendi. Admin paneline erişip ders programını düzenleyebilirsiniz.", date: "Şimdi", type: "info" }
  ]);

  // Admin Panel Active Sub-Tab State
  const [adminTab, setAdminTab] = useState("duyurular");

  // Admin Form Input States
  const [adminNewAnnTitle, setAdminNewAnnTitle] = useState("");
  const [adminNewAnnText, setAdminNewAnnText] = useState("");
  const [adminNewAnnType, setAdminNewAnnType] = useState("info");
  
  // EVET / HAYIR Question Add Form (Admin & Student)
  const [newQTag, setNewQTag] = useState("MATEMATİK • 1. ÜNİTE • +50 XP");
  const [newQText, setNewQText] = useState("");
  const [newQCorrect, setNewQCorrect] = useState(0); // 0 = EVET, 1 = HAYIR
  const [newQExplain, setNewQExplain] = useState("");

  const [adminEventTitle, setAdminEventTitle] = useState("");
  const [adminEventDay, setAdminEventDay] = useState("Yarın");
  const [adminEventTime, setAdminEventTime] = useState("16:30");
  const [adminEventLoc, setAdminEventLoc] = useState("9-A Sınıfı");

  // Admin Schedule Add Form States
  const [adminSchedHour, setAdminSchedHour] = useState("12:00 - 12:40");
  const [adminSchedSubject, setAdminSchedSubject] = useState("Tarih");
  const [adminSchedTopic, setAdminSchedTopic] = useState("Tarih ve Zaman");
  const [adminSchedTeacher, setAdminSchedTeacher] = useState("O. Şahin");
  const [adminSchedIcon, setAdminSchedIcon] = useState("📜");

  // Arena Mini-Game States
  const [activeGame, setActiveGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(30);
  const [mathProblem, setMathProblem] = useState({ a: 14, b: 8, op: "+", ans: 22 });
  const [userMathInput, setUserMathInput] = useState("");

  const [reactorWord, setReactorWord] = useState("FİZİK");
  const [scrambledWord, setScrambledWord] = useState("İFZİK");
  const [userWordInput, setUserWordInput] = useState("");
  const [wordScore, setWordScore] = useState(0);

  const [logicIndex, setLogicIndex] = useState(0);
  const [logicScore, setLogicScore] = useState(0);
  const [userLogicInput, setUserLogicInput] = useState("");

  const logoClickRef = useRef([]);
  const konamiRef = useRef([]);
  const badgeLongPressTimer = useRef(null);

  const currentLevel = useMemo(() => Math.floor(xp / 400) + 1, [xp]);
  const currentXpInLevel = xp % 400;
  const completedTasksCount = tasks.filter((t) => t.done).length;
  const isAllTasksCompleted = completedTasksCount === 3;

  function handleSplashBackgroundClick(e) {
    if (splashFxRef.current) {
      splashFxRef.current(e.clientX, e.clientY);
    }
  }

  function skip3DSplash() {
    setShow3DSplash(false);
    const savedPass = localStorage.getItem("9verse-user-password");
    const savedName = localStorage.getItem("9verse-user-name");
    const savedEmail = localStorage.getItem("9verse-user-email");

    if (savedName) setRegName(savedName);
    else if (userProfile && userProfile.name) setRegName(userProfile.name);
    
    if (savedEmail) setRegEmail(savedEmail);
    else if (userProfile && userProfile.email) setRegEmail(userProfile.email);

    if (savedPass) {
      setRegPassword(savedPass);
      setRegPasswordConfirm(savedPass);
      setStudentAuthMode("login");
    } else if (userProfile && userProfile.password) {
      setRegPassword(userProfile.password);
      setRegPasswordConfirm(userProfile.password);
      setStudentAuthMode("login");
    } else {
      setStudentAuthMode("register");
    }

    setIsPlayingMusic(true);
    setShowRegistrationScreen(true);
    window.scrollTo(0, 0);
  }

  function triggerSplashReplay() {
    setShow3DSplash(true);
  }

  // Autoplay Background Music on First User Gesture anywhere on page
  useEffect(() => {
    const handleFirstGesture = () => {
      setIsPlayingMusic(true);
    };
    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, []);

  // 2. LOCALSTORAGE PERSISTENCE WITH EXPLICIT PASSWORD & EMAIL BACKUP
  useEffect(() => {
    const savedPass = localStorage.getItem("9verse-user-password");
    const savedName = localStorage.getItem("9verse-user-name");
    const savedEmail = localStorage.getItem("9verse-user-email");
    if (savedPass) {
      setRegPassword(savedPass);
      setRegPasswordConfirm(savedPass);
    }
    if (savedName) setRegName(savedName);
    if (savedEmail) setRegEmail(savedEmail);

    const saved = localStorage.getItem("9verse-app-data-v6");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.userProfile) {
          setUserProfile(parsed.userProfile);
          setIsRegistered(true);
          if (parsed.userProfile.name) setRegName(parsed.userProfile.name);
          if (parsed.userProfile.email) setRegEmail(parsed.userProfile.email);
          if (parsed.userProfile.password) {
            setRegPassword(parsed.userProfile.password);
            setRegPasswordConfirm(parsed.userProfile.password);
          }
        }
        if (parsed.xp) setXp(parsed.xp);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.posts) setPosts(parsed.posts);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.questions && parsed.questions.length >= INITIAL_QUESTIONS.length) {
          setQuestions(parsed.questions);
        } else {
          setQuestions(INITIAL_QUESTIONS);
        }
        if (parsed.events) setEvents(parsed.events);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.leaderboard) setLeaderboard(parsed.leaderboard);
        if (parsed.isProtocolApproved) setIsProtocolApproved(parsed.isProtocolApproved);
        if (parsed.scheduleList) setScheduleList(parsed.scheduleList);
        if (parsed.hasSubmittedQuestionToday) setHasSubmittedQuestionToday(parsed.hasSubmittedQuestionToday);
        // ALWAYS require Admin PIN (2198) when reopening/reloading the site - zero persistent admin auth
        setIsAdminAuthenticated(false);
      } catch (e) {
        console.error("LocalStorage load error:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isRegistered) {
      if (userProfile && userProfile.password) {
        localStorage.setItem("9verse-user-password", userProfile.password);
      }
      if (userProfile && userProfile.name) {
        localStorage.setItem("9verse-user-name", userProfile.name);
      }
      localStorage.setItem(
        "9verse-app-data-v6",
        JSON.stringify({
          userProfile, xp, tasks, posts, badges, questions, events, announcements, leaderboard, isProtocolApproved, scheduleList, hasSubmittedQuestionToday, isAdminAuthenticated
        })
      );
    }
  }, [isRegistered, userProfile, xp, tasks, posts, badges, questions, events, announcements, leaderboard, isProtocolApproved, scheduleList, hasSubmittedQuestionToday, isAdminAuthenticated]);

  // Level Up Check
  const prevLevelRef = useRef(currentLevel);
  useEffect(() => {
    if (currentLevel > prevLevelRef.current) {
      setShowLevelUp(true);
      setShowConfetti(true);
      setTimeout(() => setShowLevelUp(false), 3200);
      setTimeout(() => setShowConfetti(false), 4000);
      showToast(`⚡ LEVEL UP! → Level ${currentLevel} • ${userProfile.title}`);
      prevLevelRef.current = currentLevel;
    }
  }, [currentLevel, userProfile.title]);

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > 8) konamiRef.current.shift();
      const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];
      if (konamiRef.current.slice(-4).join(",") === seq.join(",")) {
        setShowMatrix(true);
        setBadges((prev) =>
          prev.map((b) => (b.id === "6" ? { ...b, unlocked: true } : b))
        );
        addXp(100);
        showToast("9VERSE MATRIX PROTOCOL ACTIVATED");
        setTimeout(() => setShowMatrix(false), 3200);
        konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  }

  function addXp(amount) {
    setXp((prev) => prev + amount);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
  }

  function handleLogoClick() {
    const now = Date.now();
    logoClickRef.current = [...logoClickRef.current, now].filter((t) => now - t < 2000);
    showToast(`9VERSE System • Level ${currentLevel} • ${xp} XP`);
    if (logoClickRef.current.length >= 5) {
      setDevMode((prev) => !prev);
      showToast(devMode ? "Geliştirici Modu Kapandı" : "9VERSE DEV MODE ACTIVE // +50 XP");
      addXp(50);
      logoClickRef.current = [];
    }
  }

  // ---------------------------------------------------------------------------
  // ADMIN PIN AUTHENTICATION CHECK
  // ---------------------------------------------------------------------------
  function handleTabChange(tab) {
    if (tab === "admin" && !isAdminAuthenticated) {
      setAdminPinInput("");
      setAdminPinError(false);
      setShowAdminPinModal(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (tab === activeTab) {
      showToast(`${tab.toUpperCase()} sekmesi aktif`);
      return;
    }
    setActiveTab(tab);
  }

  function handleVerifyAdminPin(e) {
    if (e) e.preventDefault();
    if (adminPinInput === ADMIN_PIN) {
      setIsAdminAuthenticated(true);
      setShowAdminPinModal(false);
      setActiveTab("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("🔒 Admin Yetkilendirmesi Başarılı ⚡");
    } else {
      setAdminPinError(true);
      showToast("Hatalı Admin Şifresi!");
    }
  }

  // PROTOCOL APPROVAL HANDLER
  function approveDailyProtocol() {
    if (!isAllTasksCompleted) {
      showToast("Önce 3 görevin tamamını bitirmelisiniz!");
      return;
    }
    if (isProtocolApproved) {
      showToast("Bugünün protokolü zaten onaylandı!");
      return;
    }
    setIsProtocolApproved(true);
    addXp(100);
    setBadges((prev) =>
      prev.map((b) => (b.id === "2" ? { ...b, unlocked: true } : b))
    );
    showToast("🛡️ Günün Protokolü Onaylandı! +100 XP Bonus Kazanıldı ⚡");
  }

  // STUDENT LOGIN HANDLER (Existing Account)
  function handleStudentLogin(e) {
    if (e) e.preventDefault();
    const savedPass = localStorage.getItem("9verse-user-password") || userProfile.password;
    const inputPass = regPassword.trim();

    if (!inputPass) {
      showToast("🔑 Lütfen şifrenizi girin!");
      return;
    }

    if (savedPass && inputPass !== savedPass) {
      showToast("❌ Hatalı Şifre! Lütfen hesabınıza ait doğru şifreyi girin.");
      return;
    }

    setIsRegistered(true);
    setShowRegistrationScreen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Hoş geldin ${userProfile.name || regName || "Öğrenci"}! 🚀`);
  }

  // REGISTRATION HANDLER (New Account)
  function handleCompleteRegistration(e) {
    if (e) e.preventDefault();
    const name = regName.trim() || "Kaşif Öğrenci";
    const email = regEmail.trim();
    const password = regPassword.trim();
    const confirmPass = regPasswordConfirm.trim();
    const isAdminAccount = regAccountType === "Yönetici";

    // 1. Mandatory Profile Photo Check
    if (!regAvatar || regAvatar === "/logo.png" || regAvatar === "✦" || !regAvatar.startsWith("data:")) {
      showToast("📷 Lütfen cihazınızdan bir Profil Fotoğrafı yükleyin! (Profil Resmi Zorunludur)");
      return;
    }

    // 2. Mandatory Email Check
    if (!email || !email.includes("@")) {
      showToast("📧 Lütfen geçerli bir E-posta adresi girin! (Zorunludur)");
      return;
    }

    // 3. Password Check
    if (!password) {
      showToast("🔑 Lütfen hesabınız için bir şifre belirleyin!");
      return;
    }

    // 4. Double Password Confirmation Check (2 Kere Şifre Tekrar Zorunluluğu)
    if (password !== confirmPass) {
      showToast("❌ Girilen şifreler birbiriyle eşleşmiyor! İki alana da aynı şifreyi yazmalısınız.");
      return;
    }

    if (isAdminAccount && !isAdminAuthenticated) {
      setAdminPinInput("");
      setAdminPinError(false);
      setShowAdminPinModal(true);
      return;
    }
    
    const newProfile = {
      name: name,
      email: email,
      password: password,
      title: regTitle.trim() || (isAdminAccount ? "Sistem Yöneticisi" : "9. Sınıf Öğrencisi"),
      grade: regGrade,
      avatar: regAvatar || "/logo.png",
      bio: `9VERSE ${regGrade} şubesi öğrencisi.`,
      isAdmin: isAdminAccount,
      accountType: regAccountType
    };

    if (password) {
      localStorage.setItem("9verse-user-password", password);
    }
    if (name) {
      localStorage.setItem("9verse-user-name", name);
    }
    if (email) {
      localStorage.setItem("9verse-user-email", email);
    }

    setUserProfile(newProfile);
    setIsRegistered(true);
    setShowRegistrationScreen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLeaderboard((prev) => {
      const exists = prev.some((item) => item.me);
      if (exists) {
        return prev.map((item) =>
          item.me
            ? { ...item, name: newProfile.name, avatar: newProfile.avatar, role: newProfile.title, branch: newProfile.grade, isAdmin: newProfile.isAdmin }
            : item
        );
      }
      return [
        ...prev,
        {
          id: Date.now().toString(),
          rank: prev.length + 1,
          name: newProfile.name,
          xp: xp,
          avatar: newProfile.avatar,
          lvl: currentLevel,
          me: true,
          role: newProfile.title,
          branch: newProfile.grade,
          isAdmin: newProfile.isAdmin
        }
      ];
    });

    showToast(`Hoş geldin ${name}! (${newProfile.grade} Şubesi) 🚀`);
  }

  function handleAdminLoginSubmit(e) {
    if (e) e.preventDefault();
    if (adminLoginPassword === ADMIN_PIN) {
      const adminProfile = {
        name: adminLoginName.trim() || "Sistem Yöneticisi",
        password: userProfile.password || regPassword || "",
        title: "Kurucu Admin",
        grade: "9-D",
        avatar: regAvatar || "/logo.png",
        bio: "9VERSE Evrensel Sistem Yöneticisi.",
        isAdmin: true,
        accountType: "Yönetici"
      };
      setUserProfile(adminProfile);
      setIsAdminAuthenticated(true);
      setIsRegistered(true);
      setShowRegistrationScreen(false);
      setActiveTab("admin");
      setAdminLoginPassword("");
      setAdminLoginError(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("🔒 Admin Yetkisiyle Giriş Yapıldı! (Şifre Onaylandı) ⚡");
    } else {
      setAdminLoginError(true);
      showToast("❌ Hatalı Admin Şifresi!");
    }
  }

  function handleAvatarFileUpload(e, setAvatarState) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Lütfen 5MB'dan küçük bir resim seçin.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarState(reader.result);
        showToast("Profil fotoğrafı yüklendi!");
      };
      reader.readAsDataURL(file);
    }
  }

  // Profile Edit Functions
  function openEditProfileModal() {
    setEditName(userProfile.name);
    setEditPassword(userProfile.password || regPassword || "");
    setEditTitle(userProfile.title);
    setEditGrade(userProfile.grade);
    setEditBio(userProfile.bio);
    setEditAvatar(userProfile.avatar);
    setShowEditProfileModal(true);
  }

  function saveProfile() {
    const updatedPass = editPassword.trim() || userProfile.password || regPassword || "";
    const updated = {
      ...userProfile,
      name: editName.trim() || userProfile.name,
      password: updatedPass,
      title: editTitle.trim() || userProfile.title,
      grade: editGrade,
      bio: editBio.trim() || userProfile.bio,
      avatar: editAvatar || userProfile.avatar
    };
    setUserProfile(updated);
    if (updatedPass) {
      setRegPassword(updatedPass);
      localStorage.setItem("9verse-user-password", updatedPass);
    }
    if (updated.name) {
      localStorage.setItem("9verse-user-name", updated.name);
    }
    setLeaderboard((prev) =>
      prev.map((item) => (item.me ? { ...item, name: updated.name, avatar: updated.avatar, role: updated.title, branch: updated.grade } : item))
    );
    setShowEditProfileModal(false);
    showToast("Profil ve Şifre bilginiz güncellendi! ✨");
  }

  // Daily Question Handler (EVET / HAYIR)
  function handleAnswer(index) {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = questions[qIndex].correct === index;
    setIsAnswerCorrect(correct);
    if (correct) {
      addXp(50);
      setTasks((prev) =>
        prev.map((t) => (t.title.includes("Sorusunu") ? { ...t, done: true } : t))
      );
      setBadges((prev) =>
        prev.map((b) => (b.id === "4" ? { ...b, unlocked: true } : b))
      );
    }
  }

  function nextQuestion() {
    setQIndex((prev) => (prev + 1) % questions.length);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.done) addXp(t.xp);
        return t.id === id ? { ...t, done: !t.done } : t;
      })
    );
  }

  // Anonymous Post Handler
  function submitAnonymousPost() {
    if (!newPostText.trim()) return;
    const avatars = ["👾", "👻", "🦊", "🤖", "👽", "🎃", "🌌"];
    const newPost = {
      id: Date.now().toString(),
      text: newPostText,
      avatar: userProfile.avatar.startsWith("data:") || userProfile.avatar.startsWith("/") ? avatars[Math.floor(Math.random() * avatars.length)] : userProfile.avatar,
      votes: 0,
      voted: false,
      time: "şimdi"
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    addXp(20);
    setTasks((prev) =>
      prev.map((t) => (t.title.includes("Kutu") ? { ...t, done: true } : t))
    );
    showToast("Anonim not bırakıldı +20 XP");
  }

  function votePost(id) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return p.voted
          ? { ...p, votes: p.votes - 1, voted: false }
          : { ...p, votes: p.votes + 1, voted: true };
      })
    );
  }

  // ---------------------------------------------------------------------------
  // STUDENT DAILY QUESTION SUBMISSION (1 QUESTION / DAY LIMIT FOR NON-ADMINS)
  // ---------------------------------------------------------------------------
  function handleStudentAddQuestion(e) {
    if (e) e.preventDefault();
    if (!userProfile.isAdmin && hasSubmittedQuestionToday) {
      showToast("Öğrenciler günde sadece 1 soru ekleyebilir!");
      return;
    }
    if (!newQText.trim()) {
      showToast("Lütfen soru cümlesini yazın!");
      return;
    }

    const newQ = {
      id: Date.now().toString(),
      tag: newQTag || "9. SINIF • +50 XP",
      time: "02:00",
      q: newQText,
      options: ["EVET", "HAYIR"],
      correct: newQCorrect,
      explain: newQExplain || `${userProfile.name} tarafından önerilen 9. sınıf sorusu.`
    };

    setQuestions([...questions, newQ]);
    if (!userProfile.isAdmin) {
      setHasSubmittedQuestionToday(true);
      addXp(30);
    }

    setNewQText("");
    setNewQExplain("");
    setShowStudentAddQModal(false);
    showToast("EVET/HAYIR sorunuz veritabanına eklendi! (+30 XP) 📚");
  }

  // Admin Management Handlers
  function handleAdminAddAnnouncement() {
    if (!adminNewAnnTitle.trim() || !adminNewAnnText.trim()) {
      showToast("Lütfen başlık ve duyuru metnini girin");
      return;
    }
    const newAnn = {
      id: Date.now().toString(),
      title: adminNewAnnTitle,
      text: adminNewAnnText,
      date: "Şimdi",
      type: adminNewAnnType
    };
    setAnnouncements([newAnn, ...announcements]);
    setAdminNewAnnTitle("");
    setAdminNewAnnText("");
    showToast("Duyuru başarıyla yayınlandı! 📢");
  }

  function handleAdminDeleteAnnouncement(id) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast("Duyuru kaldırıldı.");
  }

  function handleAdminDeleteQuestion(id) {
    if (questions.length <= 1) {
      showToast("En az 1 soru bulunmalıdır.");
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast("Soru silindi.");
  }

  function handleAdminAddEvent() {
    if (!adminEventTitle.trim()) {
      showToast("Lütfen etkinlik başlığını girin.");
      return;
    }
    const newEv = {
      id: Date.now().toString(),
      title: adminEventTitle,
      day: adminEventDay,
      time: adminEventTime,
      loc: adminEventLoc,
      count: 1,
      dot: ["bg-fuchsia-400", "bg-cyan-400", "bg-amber-400", "bg-emerald-400"][Math.floor(Math.random() * 4)]
    };
    setEvents([...events, newEv]);
    setAdminEventTitle("");
    showToast("Yeni Etkinlik takvime eklendi! 🗓️");
  }

  function handleAdminDeleteEvent(id) {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    showToast("Etkinlik takvimden silindi.");
  }

  // Admin Schedule Write & Edit Handlers
  const [editingScheduleId, setEditingScheduleId] = useState(null);

  function resetAdminScheduleForm() {
    setEditingScheduleId(null);
    setAdminSchedHour("08:30 - 09:10");
    setAdminSchedSubject("");
    setAdminSchedTopic("");
    setAdminSchedTeacher("");
    setAdminSchedIcon("📐");
  }

  function startEditSchedule(item) {
    setEditingScheduleId(item.id);
    setAdminSchedHour(item.hour || "08:30 - 09:10");
    setAdminSchedSubject(item.subject || "");
    setAdminSchedTopic(item.topic || "");
    setAdminSchedTeacher(item.teacher || "");
    setAdminSchedIcon(item.icon || "📐");
  }

  function handleSaveScheduleItem() {
    if (!adminSchedSubject.trim() || !adminSchedTopic.trim()) {
      showToast("Lütfen ders adı ve konu başlığını girin.");
      return;
    }

    if (editingScheduleId) {
      setScheduleList((prev) =>
        prev.map((s) =>
          s.id === editingScheduleId
            ? {
                ...s,
                hour: adminSchedHour,
                subject: adminSchedSubject,
                topic: adminSchedTopic,
                teacher: adminSchedTeacher || "Branş Öğretmeni",
                icon: adminSchedIcon || "📐"
              }
            : s
        )
      );
      showToast("Ders programı başarıyla güncellendi! 📅");
      resetAdminScheduleForm();
    } else {
      handleAdminAddSchedule();
    }
  }

  function handleAdminAddSchedule() {
    if (!adminSchedSubject.trim() || !adminSchedTopic.trim()) {
      showToast("Lütfen ders adı ve konu başlığını girin.");
      return;
    }
    const newSched = {
      id: Date.now().toString(),
      hour: adminSchedHour,
      subject: adminSchedSubject,
      topic: adminSchedTopic,
      teacher: adminSchedTeacher || "Branş Öğretmeni",
      icon: adminSchedIcon || "📐"
    };
    setScheduleList([...scheduleList, newSched]);
    showToast("Ders programına yeni ders eklendi! 📅");
    resetAdminScheduleForm();
  }

  function handleAdminMoveScheduleUp(index) {
    if (index === 0) return;
    setScheduleList((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
    showToast("Ders sırası yukarı taşındı ⬆️");
  }

  function handleAdminMoveScheduleDown(index) {
    setScheduleList((prev) => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
    showToast("Ders sırası aşağı taşındı ⬇️");
  }

  function handleAdminDeleteSchedule(id) {
    setScheduleList((prev) => prev.filter((s) => s.id !== id));
    if (editingScheduleId === id) resetAdminScheduleForm();
    showToast("Ders programdan çıkarıldı.");
  }

  function handleResetScheduleToDefault() {
    setScheduleList(INITIAL_SCHEDULE);
    showToast("Ders programı 9. sınıf müfredatına sıfırlandı!");
  }

  function handleClearAllSchedule() {
    setScheduleList([]);
    showToast("Tüm ders programı temizlendi.");
  }

  function handleAdminDeletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast("Gizli not silindi.");
  }

  function handleAdminGrantXp(targetId, amount) {
    if (targetId === "me") {
      addXp(amount);
      showToast(`Hesabına +${amount} XP eklendi!`);
    } else {
      setLeaderboard((prev) =>
        prev.map((item) => (item.id === targetId ? { ...item, xp: item.xp + amount } : item))
      );
      showToast(`Kullanıcıya +${amount} XP tanımlandı.`);
    }
  }

  function handleAdminToggleUserAdmin(targetId) {
    setLeaderboard((prev) =>
      prev.map((item) => (item.id === targetId ? { ...item, isAdmin: !item.isAdmin } : item))
    );
    showToast("Kullanıcının admin yetkisi değiştirildi.");
  }

  // Games Logic
  function generateMathProblem() {
    const a = Math.floor(Math.random() * 60) + 5;
    const b = Math.floor(Math.random() * 40) + 3;
    const op = Math.random() > 0.5 ? "+" : "-";
    const ans = op === "+" ? a + b : a - b;
    setMathProblem({ a, b, op, ans });
    setUserMathInput("");
  }

  function startMathGame() {
    setGameScore(0);
    setGameTimer(30);
    generateMathProblem();
    setActiveGame("fast");
  }

  useEffect(() => {
    if (activeGame !== "fast") return;
    if (gameTimer <= 0) {
      const reward = gameScore * 8 + 10;
      addXp(reward);
      setTasks((prev) =>
        prev.map((t) => (t.title.includes("Arena") ? { ...t, done: true } : t))
      );
      showToast(`Sprint bitti! +${reward} XP`);
      setTimeout(() => setActiveGame(null), 1200);
      return;
    }
    const timer = setInterval(() => setGameTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [activeGame, gameTimer, gameScore]);

  function submitMathAnswer() {
    if (parseInt(userMathInput) === mathProblem.ans) {
      setGameScore((prev) => prev + 1);
      generateMathProblem();
    } else {
      setUserMathInput("");
    }
  }

  function startWordGame() {
    const word = REACTOR_WORDS[Math.floor(Math.random() * REACTOR_WORDS.length)];
    setReactorWord(word);
    setScrambledWord(word.split("").sort(() => Math.random() - 0.5).join(""));
    setWordScore(0);
    setUserWordInput("");
    setActiveGame("word");
  }

  function submitWordAnswer() {
    if (userWordInput.trim().toUpperCase() === reactorWord) {
      const newScore = wordScore + 1;
      setWordScore(newScore);
      addXp(25);
      const nextWord = REACTOR_WORDS[Math.floor(Math.random() * REACTOR_WORDS.length)];
      setReactorWord(nextWord);
      setScrambledWord(nextWord.split("").sort(() => Math.random() - 0.5).join(""));
      setUserWordInput("");
      if (newScore >= 3) {
        setTimeout(() => {
          showToast(`Reaktör temizlendi! +${newScore * 25} XP`);
          setActiveGame(null);
        }, 400);
      }
    } else {
      showToast("Yakın ama değil, tekrar dene");
    }
  }

  function startLogicGame() {
    setLogicIndex(Math.floor(Math.random() * LOGIC_PATTERNS.length));
    setLogicScore(0);
    setUserLogicInput("");
    setActiveGame("logic");
  }

  function submitLogicAnswer() {
    const currentPattern = LOGIC_PATTERNS[logicIndex];
    if (parseInt(userLogicInput) === currentPattern.ans) {
      const newScore = logicScore + 1;
      setLogicScore(newScore);
      addXp(40);
      showToast(`Doğru! Kural: ${currentPattern.rule}`);
      const nextIdx = (logicIndex + 1) % LOGIC_PATTERNS.length;
      setLogicIndex(nextIdx);
      setUserLogicInput("");
      if (newScore >= 2) {
        setTimeout(() => {
          setActiveGame(null);
          showToast("Mantık kapıları aşıldı! +80 XP");
        }, 600);
      }
    } else {
      showToast("Pattern henüz çözülmedi");
    }
  }

  function handleBadgeTouchStart(badge) {
    badgeLongPressTimer.current = window.setTimeout(() => {
      setSelectedBadge(badge);
    }, 650);
  }

  function handleBadgeTouchEnd() {
    if (badgeLongPressTimer.current) {
      clearTimeout(badgeLongPressTimer.current);
    }
  }

  // Common UI Glass Classes
  const cardGlass =
    "bg-[rgba(22,27,53,0.62)] backdrop-blur-[22px] border border-white/[0.08] rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]";
  const pillGlass = "bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl";

  // Filter Leaderboard by Branch
  const filteredLeaderboard = useMemo(() => {
    if (leaderboardBranchFilter === "ALL") return leaderboard;
    return leaderboard.filter((item) => item.branch === leaderboardBranchFilter);
  }, [leaderboard, leaderboardBranchFilter]);

  // Helper Avatar Renderer (Sleek Metallic Glass Digital Emblem Badges)
  const renderAvatar = (avatarSrc, name, sizeClass = "w-10 h-10") => {
    if (!avatarSrc || avatarSrc === "/logo.png" || avatarSrc.startsWith("http") || avatarSrc.startsWith("data:")) {
      return (
        <img
          src={avatarSrc || "/logo.png"}
          alt={name || "9VERSE"}
          className={`${sizeClass} rounded-full object-cover border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] shrink-0`}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }

    const preset = PRESET_AVATARS.find((p) => p.symbol === avatarSrc || p.name === avatarSrc);
    const bgGrad = preset?.bg || "from-violet-600 via-fuchsia-600 to-cyan-500";
    const displayChar = preset?.symbol || (avatarSrc.length <= 3 ? avatarSrc : name ? name.substring(0, 2).toUpperCase() : "9V");

    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-br ${bgGrad} flex items-center justify-center font-extrabold text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.45),0_6px_20px_rgba(0,0,0,0.5)] border-2 border-white/35 backdrop-blur-xl shrink-0 transition-transform hover:scale-105 group relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none" />
        <span className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-[16px] tracking-wider z-10">{displayChar}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#080C18] text-white selection:bg-fuchsia-500/30 relative overflow-x-hidden">
      {/* Background Animated Blobs & Mesh Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#080C18]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
        <div
          className="absolute -top-[20%] -left-[8%] w-[min(720px,75vw)] h-[min(720px,75vw)] rounded-full blur-[100px] opacity-60"
          style={{
            background: devMode
              ? "radial-gradient(circle at center, #22d3ee 0%, #0891b2 35%, transparent 70%)"
              : "radial-gradient(circle at center, #7c3aed 0%, #4c1d95 35%, transparent 70%)",
            animation: "blobFloat 20s ease-in-out infinite"
          }}
        />
        <div
          className="absolute -bottom-[15%] -right-[5%] w-[min(600px,65vw)] h-[min(600px,65vw)] rounded-full blur-[90px] opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, #be123c 0%, #4c0519 40%, transparent 70%)",
            animation: "blobFloat 24s ease-in-out infinite reverse"
          }}
        />
      </div>

      {/* 1. INTERACTIVE 3D SPLASH SCREEN WITH ENTER BUTTON & STARDUST CANVAS FX */}
      {show3DSplash && (
        <div
          onClick={handleSplashBackgroundClick}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] overflow-hidden select-none perspective-1000 cursor-pointer"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[160px] bg-gradient-to-tr from-white/15 via-zinc-400/10 to-transparent animate-pulse" />
          </div>

          {/* Interactive 60fps HTML5 Canvas FX Engine (Stardust Points matching reference photo) */}
          <SplashFXCanvas triggerRef={splashFxRef} />

          <div className="relative z-10 flex flex-col items-center preserve-3d">
            <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border-2 border-white/30 blur-[2px]"
                style={{ animation: "ringSpin 8s linear infinite" }}
              />
              <div
                className="absolute -inset-4 rounded-full border border-zinc-400/25 blur-[3px]"
                style={{ animation: "ringSpin 12s linear infinite reverse" }}
              />

              <div
                className="relative w-[155px] h-[155px] md:w-[185px] md:h-[185px] rounded-[38px] p-2 bg-gradient-to-br from-zinc-900/90 via-black to-zinc-950/90 border border-white/40 shadow-[0_0_90px_rgba(255,255,255,0.25)] backdrop-blur-2xl flex items-center justify-center preserve-3d hover:scale-105 active:scale-95 transition-transform overflow-hidden group"
                style={{ animation: "logo3DFloat 4.5s ease-in-out infinite" }}
              >
                {/* Sheen sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none -rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                <img
                  src="/logo.png"
                  alt="9VERSE Main Logo"
                  className="w-full h-full object-cover rounded-[30px] shadow-2xl filter drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                />
              </div>
            </div>

            <div className="mt-8 text-center preserve-3d">
              <div className="display text-[36px] md:text-[48px] font-bold tracking-[0.24em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]">
                9VERSE
              </div>
              <div className="mt-2 text-[12px] md:text-[13px] tracking-[0.34em] text-zinc-300 font-mono font-bold uppercase">
                ✦ 9. SINIF DİJİTAL KAMPÜS PROTOKOLÜ ✦
              </div>
            </div>

            {/* Action Entry Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                skip3DSplash();
              }}
              className="mt-9 px-9 py-4 rounded-full bg-gradient-to-r from-white via-zinc-200 to-zinc-400 text-black font-extrabold text-[15px] md:text-[17px] tracking-wider shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:shadow-[0_0_70px_rgba(255,255,255,0.7)] hover:scale-105 active:scale-95 transition-all border-2 border-white flex items-center gap-3 cursor-pointer group z-20"
            >
              <span>🚀 KAMPÜSE GİRİŞ YAP</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>

            <div className="mt-4 text-[11.5px] text-zinc-300 font-mono tracking-widest pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Siber Lazer Efektleri İçin Ekrana Tıklayın</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. USER REGISTRATION / AUTHENTICATION SCREEN */}
      {showRegistrationScreen && !show3DSplash && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#080C18] overflow-y-auto">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20" />
          </div>

          <div className={`${cardGlass} w-full max-w-[500px] p-6 md:p-8 bg-[#13172b] relative z-10 shadow-2xl my-auto animate-[glitch_0.4s_ease]`}>
            {/* Main Header */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-[24px] p-1 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_35px_rgba(168,85,247,0.5)]">
                <img src="/logo.png" alt="9VERSE" className="w-full h-full object-cover rounded-[20px]" />
              </div>
              <h2 className="display text-[26px] font-bold mt-3 tracking-wider bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                9VERSE Portal
              </h2>
            </div>

            {/* Entry Mode Switcher (Öğrenci vs Admin) */}
            <div className="mt-5 flex p-1 rounded-full bg-white/[0.06] border border-white/10">
              <button
                type="button"
                onClick={() => { setEntryMode("student"); setAdminLoginError(false); }}
                className={`flex-1 py-2.5 rounded-full text-[13px] font-bold transition flex items-center justify-center gap-2 ${
                  entryMode === "student"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-[1.02]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>👨‍🎓 Öğrenci Girişi</span>
              </button>
              <button
                type="button"
                onClick={() => { setEntryMode("admin"); setAdminLoginError(false); }}
                className={`flex-1 py-2.5 rounded-full text-[13px] font-bold transition flex items-center justify-center gap-2 ${
                  entryMode === "admin"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.02]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>⚡ Admin Girişi</span>
              </button>
            </div>

            {/* 1. STUDENT AUTHENTICATION FORM (LOGIN vs REGISTER) */}
            {entryMode === "student" && (
              <div className="mt-5 flex flex-col gap-4">
                {/* Student Sub-Tabs (Giriş Yap vs Yeni Kayıt Ol) */}
                <div className="flex p-1 rounded-full bg-white/[0.04] border border-white/10 text-[12px] font-bold">
                  <button
                    type="button"
                    onClick={() => setStudentAuthMode("login")}
                    className={`flex-1 py-2 rounded-full transition ${
                      studentAuthMode === "login"
                        ? "bg-violet-600 text-white shadow-md"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    🔑 Giriş Yap (Kayıtlı Hesap)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentAuthMode("register")}
                    className={`flex-1 py-2 rounded-full transition ${
                      studentAuthMode === "register"
                        ? "bg-fuchsia-600 text-white shadow-md"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    📝 Yeni Kayıt Ol
                  </button>
                </div>

                {/* A. LOGIN FORM FOR EXISTING STUDENTS */}
                {studentAuthMode === "login" && (
                  <form onSubmit={handleStudentLogin} className="flex flex-col gap-3.5">
                    <div className="text-center p-3 rounded-[16px] bg-white/[0.03] border border-white/10">
                      <div className="text-[12px] text-white/70">
                        {userProfile && userProfile.name
                          ? `👋 Hoş geldin ${userProfile.name}! Kayıtlı şifrenizle giriş yapın.`
                          : "Öğrenci hesabınızla giriş yapın."}
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1">
                        E-Posta veya Ad Soyad
                      </label>
                      <input
                        type="text"
                        required
                        value={regEmail || regName}
                        onChange={(e) => {
                          setRegEmail(e.target.value);
                          setRegName(e.target.value);
                        }}
                        placeholder="Örn: riza@9verse.com"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[12px] font-semibold text-white/70 block">
                          Hesap Şifreniz *
                        </label>
                        {regPassword && (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            💾 Kayıtlı Şifre Dolduruldu
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50 tracking-wider"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 font-bold text-[14px] text-white shadow-xl active:scale-95 transition"
                    >
                      🔑 Oturum Aç & Kampüse Giriş Yap 🚀
                    </button>
                  </form>
                )}

                {/* B. NEW STUDENT REGISTRATION FORM */}
                {studentAuthMode === "register" && (
                  <form onSubmit={handleCompleteRegistration} className="flex flex-col gap-4">
                    {/* Mandatory Profile Photo Upload Section */}
                    <div className="p-4 bg-white/[0.04] border border-white/10 rounded-[20px]">
                      <div className="flex justify-between items-center mb-2.5">
                        <label className="text-[12.5px] font-bold text-white block">
                          📷 Profil Fotoğrafı Yükle * <span className="text-amber-400 font-mono text-[11px]">(ZORUNLU)</span>
                        </label>
                        {regAvatar && regAvatar.startsWith("data:") && (
                          <span className="text-[10.5px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                            ✓ Yüklendi
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shrink-0 shadow-lg relative group">
                          {regAvatar && regAvatar.startsWith("data:") ? (
                            <img src={regAvatar} alt="Profil" className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <div className="w-full h-full rounded-full bg-zinc-900 border border-white/20 flex flex-col items-center justify-center text-white/50 text-[10px] font-mono font-bold">
                              <span className="text-[18px]">📷</span>
                              <span>FOTO ŞART</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 border border-white/30 text-[12.5px] font-bold text-white cursor-pointer hover:scale-105 active:scale-95 transition shadow-lg">
                            <span>📁 Cihazdan Resim Seç *</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleAvatarFileUpload(e, setRegAvatar)}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-white/50 mt-1.5 leading-snug">
                            {regAvatar && regAvatar.startsWith("data:")
                              ? "✅ Fotoğrafınız kaydedildi!"
                              : "⚠️ Kayıt olmak için profil resmi seçiniz."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1">
                        Adınız ve Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Örn: Rıza Yılmaz"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50"
                      />
                    </div>

                    {/* E-Mail Address (Mandatory) */}
                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1">
                        E-Posta Adresiniz * <span className="text-amber-400 font-mono text-[10.5px]">(ZORUNLU)</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="Örn: riza@9verse.com"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50"
                      />
                    </div>

                    {/* Password Field 1 */}
                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1">
                        Hesap Şifreniz *
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50 tracking-wider"
                      />
                    </div>

                    {/* Password Field 2 (Double Password Check Confirmation) */}
                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1">
                        Şifre Tekrarı * <span className="text-amber-400 font-mono text-[10.5px]">(ZORUNLU)</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={regPasswordConfirm}
                        onChange={(e) => setRegPasswordConfirm(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border text-[13.5px] focus:outline-none tracking-wider ${
                          regPasswordConfirm && regPassword !== regPasswordConfirm
                            ? "border-red-500/80 bg-red-500/10 text-red-300"
                            : "border-white/10 focus:border-violet-400/50"
                        }`}
                      />
                      {regPasswordConfirm && regPassword !== regPasswordConfirm && (
                        <p className="text-[11px] text-red-400 font-semibold mt-1">
                          ⚠️ Şifreler henüz birbiriyle eşleşmiyor.
                        </p>
                      )}
                    </div>

                    {/* Şube Seçimi (Sadece 9-A, 9-B, 9-C, 9-D) */}
                    <div>
                      <label className="text-[12px] font-semibold text-white/70 block mb-1.5">
                        9. Sınıf Şubeniz *
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {AVAILABLE_BRANCHES.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setRegGrade(b)}
                            className={`h-11 rounded-[14px] font-bold text-[14px] border transition-all ${
                              regGrade === b
                                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-white shadow-md scale-[1.02]"
                                : "bg-white/[0.05] border-white/10 text-white/60 hover:bg-white/10"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 font-bold text-[14px] text-white shadow-xl active:scale-95 transition"
                    >
                      📝 Kayıt Ol & Kampüse Giriş Yap 🚀
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* 2. DEDICATED ADMIN LOGIN FORM (PIN MASKED WITH type="password") */}
            {entryMode === "admin" && (
              <form onSubmit={handleAdminLoginSubmit} className="mt-5 flex flex-col gap-4">
                <div className="text-center py-2 bg-white/[0.03] border border-white/10 rounded-[18px] p-4">
                  <div className="w-12 h-12 mx-auto rounded-[16px] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[24px] shadow-lg mb-2">
                    🔒
                  </div>
                  <h3 className="display text-[17px] font-bold text-white">Yönetici Giriş Paneli</h3>
                  <p className="text-[12px] text-white/60 mt-0.5">Admin yetkileriyle sisteme bağlanın.</p>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-white/70 block mb-1">
                    Admin Adınız / Unvanınız
                  </label>
                  <input
                    type="text"
                    value={adminLoginName}
                    onChange={(e) => setAdminLoginName(e.target.value)}
                    placeholder="Örn: Sistem Yöneticisi"
                    className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-white/70 block mb-1">
                    Admin Şifresi (Gözükmez / Gizli) *
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={adminLoginPassword}
                    onChange={(e) => {
                      setAdminLoginPassword(e.target.value);
                      setAdminLoginError(false);
                    }}
                    placeholder="••••"
                    className={`w-full h-12 px-4 font-mono text-[20px] text-center tracking-[0.4em] rounded-[14px] bg-white/[0.05] border text-white focus:outline-none ${
                      adminLoginError ? "border-red-500 bg-red-500/10" : "border-white/15 focus:border-cyan-400"
                    }`}
                    autoFocus
                  />
                  {adminLoginError && (
                    <div className="mt-1 text-[11.5px] text-red-400 font-semibold text-center">
                      ❌ Hatalı Admin Şifresi!
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 font-bold text-[14px] text-white shadow-xl active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <span>⚡ Admin Olarak Oturum Aç</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADMIN PIN AUTHENTICATION MODAL (PIN: 9V21#k) */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/80 backdrop-blur-[14px]">
          <div className={`${cardGlass} w-full max-w-[380px] p-6 md:p-7 bg-[#151a32] text-center shadow-2xl relative overflow-hidden animate-[glitch_0.3s_ease]`}>
            <div className="w-16 h-16 mx-auto rounded-[20px] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-[28px] shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              🔒
            </div>
            <h3 className="display text-[20px] font-bold mt-4 tracking-wide">
              Admin Giriş Şifresi
            </h3>
            <p className="text-[12.5px] text-white/60 mt-1">
              Admin yönetim paneline erişmek için 6 karakterli harf/sayı/sembol şifrenizi girin.
            </p>

            <form onSubmit={handleVerifyAdminPin} className="mt-5 flex flex-col gap-3">
              <input
                type="password"
                maxLength={6}
                value={adminPinInput}
                onChange={(e) => {
                  setAdminPinInput(e.target.value);
                  setAdminPinError(false);
                }}
                placeholder="••••••"
                className={`w-full h-12 text-center tracking-[0.4em] font-mono font-bold text-[20px] rounded-[16px] bg-white/[0.05] border text-white focus:outline-none ${
                  adminPinError ? "border-red-500 bg-red-500/10" : "border-white/20 focus:border-violet-400"
                }`}
                autoFocus
              />
              {adminPinError && (
                <div className="text-[11px] text-red-400 font-semibold">Hatalı Şifre! (Harf, sayı ve karakter içerir)</div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="flex-1 py-2.5 rounded-full bg-white/10 text-[12px] font-semibold hover:bg-white/20"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-[12px] text-white active:scale-95 shadow-md"
                >
                  Giriş Yap ⚡
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT ADD QUESTION MODAL (EVET/HAYIR) */}
      {showStudentAddQModal && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-black/75 backdrop-blur-[12px]">
          <div className={`${cardGlass} w-full max-w-[440px] p-6 bg-[#151a32] relative`}>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="display text-[17px] font-bold flex items-center gap-2">
                <span>📚 9. Sınıf Soru Öner (+30 XP)</span>
              </h3>
              <button onClick={() => setShowStudentAddQModal(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                ✕
              </button>
            </div>

            <form onSubmit={handleStudentAddQuestion} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-[11.5px] font-semibold text-white/70 block mb-1">Ders & Ünite</label>
                <input
                  value={newQTag}
                  onChange={(e) => setNewQTag(e.target.value)}
                  placeholder="Örn: BİYOLOJİ • 1. ÜNİTE • +50 XP"
                  className="w-full h-10 px-3.5 rounded-[12px] bg-white/[0.05] border border-white/10 text-[13px]"
                />
              </div>

              <div>
                <label className="text-[11.5px] font-semibold text-white/70 block mb-1">EVET / HAYIR Soru Cümlesi *</label>
                <textarea
                  required
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Örn: Canlıların iç dengesini korumasına Homeostazi denir mi?"
                  className="w-full h-20 p-3 rounded-[12px] bg-white/[0.05] border border-white/10 text-[13px] resize-none"
                />
              </div>

              <div>
                <label className="text-[11.5px] font-semibold text-white/70 block mb-1">Doğru Cevap</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewQCorrect(0)}
                    className={`h-10 rounded-[12px] font-bold text-[13px] border transition ${
                      newQCorrect === 0 ? "bg-emerald-500 text-black border-emerald-400" : "bg-white/10 border-white/10"
                    }`}
                  >
                    EVET (Doğru)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewQCorrect(1)}
                    className={`h-10 rounded-[12px] font-bold text-[13px] border transition ${
                      newQCorrect === 1 ? "bg-red-500 text-white border-red-400" : "bg-white/10 border-white/10"
                    }`}
                  >
                    HAYIR (Yanlış)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11.5px] font-semibold text-white/70 block mb-1">Açıklama / Çözüm Detayı</label>
                <input
                  value={newQExplain}
                  onChange={(e) => setNewQExplain(e.target.value)}
                  placeholder="Neden Evet veya Hayır?"
                  className="w-full h-10 px-3.5 rounded-[12px] bg-white/[0.05] border border-white/10 text-[13px]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-[13px] text-white active:scale-95 shadow-lg"
              >
                Soruyu Gönder ve +30 XP Kazan 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Level Up Banner */}
      {showLevelUp && (
        <div className="fixed top-0 inset-x-0 z-[60] flex justify-center pt-[calc(var(--safe-area-inset-top,0px)+16px)] pointer-events-none">
          <div className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold tracking-widest text-[12px] shadow-[0_8px_30px_rgba(124,58,237,0.5)] animate-[glitch_0.4s_ease]">
            ⚡ LEVEL UP! → {currentLevel} • {userProfile.title}
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-6 rounded-[2px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                background: ["#a855f7", "#ec4899", "#22d3ee", "#f59e0b", "#8b5cf6"][i % 5],
                animation: `confettiFall ${1.2 + Math.random() * 1.8}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.4}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Matrix Mode Modal */}
      {showMatrix && (
        <div className="fixed inset-0 z-[80] bg-black/90 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4 opacity-40">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className="text-[10px] text-green-400 font-mono animate-[matrixFall_1.2s_linear_infinite]"
                style={{ animationDelay: `${Math.random() * 1}s` }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-green-400 font-mono text-[18px] tracking-widest text-center px-4">
              9VERSE MATRIX PROTOCOL ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-[104px] md:bottom-8 left-1/2 -translate-x-1/2 z-[75] px-5 py-3 rounded-full bg-white text-black text-[13px] font-semibold shadow-2xl whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Navigation Sidebar (Desktop) */}
      <nav className="hidden md:flex fixed left-6 top-6 bottom-6 w-[88px] z-30 flex-col items-center justify-between py-6 rounded-[28px] bg-[rgba(16,18,38,0.72)] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div>
          <button
            onClick={handleLogoClick}
            aria-label="9VERSE Logo"
            className="w-[52px] h-[52px] rounded-[18px] overflow-hidden p-0.5 border border-violet-400/40 shadow-[0_0_25px_rgba(124,58,237,0.45)] active:scale-95 transition group"
          >
            <img src="/logo.png" alt="9VERSE Logo" className="w-full h-full object-cover rounded-[16px]" />
          </button>

          <div className="mt-10 flex flex-col gap-3">
            {[
              { id: "kampus", icon: "◧", label: "Kampüs" },
              { id: "arena", icon: "◈", label: "Arena" },
              { id: "lig", icon: "⬙", label: "Lig" },
              { id: "kutu", icon: "⬔", label: "Kutu" },
              { id: "admin", icon: "⚡", label: "Admin" },
              { id: "profil", icon: "◍", label: "Profil" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-[52px] h-[52px] rounded-[16px] flex flex-col items-center justify-center gap-[2px] transition-all relative ${
                  activeTab === item.id
                    ? "bg-white text-black shadow-lg"
                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.06]"
                }`}
              >
                <span className="text-[16px]">{item.icon}</span>
                <span className="text-[8px] tracking-widest font-semibold">
                  {item.label.toUpperCase()}
                </span>
                {item.id === "admin" && isAdminAuthenticated && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button onClick={() => handleTabChange("profil")} className="active:scale-95 transition">
            {renderAvatar(userProfile.avatar, userProfile.name, "w-10 h-10")}
          </button>
          <div className="w-[2px] h-4 bg-white/10 rounded-full" />
          <div className="text-[10px] font-bold text-cyan-300">{userProfile.grade}</div>
        </div>
      </nav>

      {/* Main App Container */}
      <main className="relative z-10 md:pl-[136px] max-w-[1280px] mx-auto px-5 md:px-0 pb-[120px] md:pb-12 pt-[max(16px,var(--safe-area-inset-top))] md:pt-8 overflow-x-hidden">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between gap-4 mt-2 md:mt-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabChange("kampus")}
              className="md:hidden w-11 h-11 rounded-[16px] overflow-hidden border border-white/20 shrink-0 shadow-md"
            >
              <img src="/logo.png" alt="9VERSE" className="w-full h-full object-cover" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="display text-[18px] md:text-[20px] font-bold tracking-[0.15em] bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  9VERSE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-600/30 border border-violet-400/40 text-violet-300 text-[10px] font-bold">
                  {userProfile.grade}
                </span>
                {isAdminAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold tracking-widest">
                    ADMIN
                  </span>
                )}
              </div>
              <h1 className="display text-[22px] md:text-[28px] font-semibold tracking-tight leading-none mt-1">
                Selam, {userProfile.name}{" "}
                <span className="inline-block animate-[glitch_3s_ease_infinite]">👋</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Admin Logout Button */}
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  setActiveTab("kampus");
                  window.scrollTo(0, 0);
                  showToast("🔒 Admin Oturumu Kapatıldı");
                }}
                className="px-3.5 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 font-bold text-[11.5px] transition flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                title="Admin Oturumunu Kapat"
              >
                <span>🔒 Admin Çıkış</span>
              </button>
            )}

            {/* Splash Screen Re-open Button */}
            <button
              onClick={triggerSplashReplay}
              className="hidden sm:flex px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11.5px] font-bold text-cyan-300 transition items-center gap-1.5 shadow-md active:scale-95"
              title="3D Giriş Ekranını Tekrar Aç"
            >
              <span>🚀 Giriş Ekranı</span>
            </button>

            {/* XP & Streak Indicator */}
            <div className={`${cardGlass} px-3.5 py-2 flex items-center gap-3 rounded-full`}>
              <div className="flex items-center gap-1.5 text-[12px] md:text-[13px] font-semibold">
                <span>🔥</span>
                <span>{streak}d</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-[70px] md:w-[110px] h-[6px] rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-full transition-all duration-700"
                    style={{ width: `${(currentXpInLevel / 400) * 100}%` }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      style={{ animation: "shimmer 1.6s infinite" }}
                    />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-white/60">
                  {currentXpInLevel}/400
                </span>
              </div>
            </div>

            {/* Profile Avatar Clickable */}
            <button
              onClick={() => handleTabChange("profil")}
              className="relative group transition active:scale-95"
              title="Profiline git"
            >
              {renderAvatar(userProfile.avatar, userProfile.name, "w-10 h-10 md:w-11 md:h-11")}
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-violet-600 text-[9px] font-bold border border-black">
                {currentLevel}
              </div>
            </button>
          </div>
        </header>

        {/* Global Admin Broadcast Announcement Banner */}
        {announcements.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-[20px] bg-gradient-to-r from-violet-900/50 via-fuchsia-900/30 to-cyan-900/40 border border-violet-400/30 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(124,58,237,0.2)] animate-[glitch_3s_ease]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-[16px] shrink-0">
                    📢
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-white flex items-center gap-2">
                      {ann.title}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-normal">
                        {ann.date}
                      </span>
                    </div>
                    <div className="text-[12.5px] text-white/80 mt-0.5 leading-snug">
                      {ann.text}
                    </div>
                  </div>
                </div>
                {isAdminAuthenticated && (
                  <button
                    onClick={() => handleAdminDeleteAnnouncement(ann.id)}
                    className="text-white/40 hover:text-white text-[14px] px-2 py-1"
                    title="Kapat"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 1: KAMPÜS */}
        {activeTab === "kampus" && (
          <div className="mt-8 grid grid-cols-12 gap-5">
            {/* 9th Grade 1st Unit Question Card (EVET / HAYIR Format) */}
            <div className={`col-span-12 lg:col-span-8 ${cardGlass} p-[22px] md:p-7 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}>
              <div className="absolute -top-24 -right-24 w-[280px] h-[280px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 rounded-full blur-[40px] group-hover:from-violet-600/30 transition" />
              
              <div className="relative flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[11px] font-bold tracking-widest">
                  ● {questions[qIndex]?.tag || "9. Sınıf Soru"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowStudentAddQModal(true)}
                    className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold hover:bg-cyan-400/30 transition"
                  >
                    + Soru Öner (+30 XP)
                  </button>
                  <span className={`px-2.5 py-1 rounded-full ${pillGlass} text-[11px] text-white/60`}>
                    ⏱ {questions[qIndex]?.time || "02:00"}
                  </span>
                </div>
              </div>

              <h2 className="relative mt-5 display text-[20px] md:text-[22px] leading-[1.35] font-medium max-w-[580px]">
                {questions[qIndex]?.q}
              </h2>

              {/* EVET / HAYIR Action Voting Buttons */}
              <div className="relative mt-6 grid grid-cols-2 gap-4">
                {["EVET", "HAYIR"].map((optText, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = questions[qIndex]?.correct === i;
                  const hasAnswered = selectedOption !== null;

                  const emoji = i === 0 ? "✅" : "❌";

                  let style = i === 0
                    ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
                    : "border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300 shadow-[0_4px_15px_rgba(239,68,68,0.15)]";

                  if (hasAnswered && isCorrect) {
                    style = "border-emerald-400 bg-emerald-500/30 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02]";
                  }
                  if (hasAnswered && isSelected && !isCorrect) {
                    style = "border-red-400 bg-red-500/30 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.5)]";
                  }
                  if (hasAnswered && !isSelected && !isCorrect) {
                    style = "border-white/10 bg-white/[0.02] text-white/30 opacity-40";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={hasAnswered}
                      className={`text-center py-5 px-6 rounded-[22px] border backdrop-blur-xl font-extrabold text-[18px] md:text-[20px] tracking-wide transition-all active:scale-[0.97] flex items-center justify-center gap-3 ${style}`}
                    >
                      <span className="text-[22px]">{emoji}</span>
                      <span>{optText}</span>
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="mt-5 p-4 rounded-[18px] bg-white/[0.04] border border-white/[0.06]">
                  <div className={`text-[12px] font-bold tracking-widest ${isAnswerCorrect ? "text-emerald-300" : "text-red-300"}`}>
                    {isAnswerCorrect ? "DOĞRU • +50 XP KAZANILDINI" : "YANLIŞ • TEKRAR DENE"}
                  </div>
                  <div className="mt-2 text-[13px] leading-[1.5] text-white/70">
                    {questions[qIndex]?.explain}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2 rounded-full bg-white text-black text-[12px] font-semibold active:scale-95"
                    >
                      Sıradaki soru →
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOption(null);
                        setIsAnswerCorrect(null);
                      }}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[12px]"
                    >
                      Tekrar dene
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Today's Protocol Approval Widget */}
            <div className={`col-span-12 lg:col-span-4 ${cardGlass} p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="display text-[18px] font-semibold">
                    Bugünün Protokolü
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="relative w-9 h-9">
                      <svg className="w-9 h-9 -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke={isAllTasksCompleted ? "#10b981" : "#a855f7"}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${(completedTasksCount / 3) * 87.9} 87.9`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">
                        {completedTasksCount}/3
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2.5">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`group flex items-center gap-3 p-3 rounded-[16px] border text-left transition-all hover:-translate-y-[1px] ${
                        task.done
                          ? "bg-white/[0.03] border-white/[0.06] opacity-60"
                          : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] border transition ${
                          task.done
                            ? "bg-white text-black border-white"
                            : "bg-white/10 border-white/10 group-hover:bg-white/15"
                        }`}
                      >
                        {task.done ? "✓" : task.icon}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-[12.5px] font-medium leading-tight ${
                            task.done ? "line-through text-white/40" : ""
                          }`}
                        >
                          {task.title}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                          task.done ? "bg-violet-500 border-violet-500" : "border-white/20"
                        }`}
                      >
                        {task.done && <span className="text-[9px]">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Protocol Approval Button Requirement */}
              <div className="mt-5 border-t border-white/10 pt-4">
                {isProtocolApproved ? (
                  <div className="w-full py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-[12.5px] text-center flex items-center justify-center gap-2">
                    <span>🛡️ BUGÜNÜN PROTOKOLÜ ONAYLANDI (+100 XP)</span>
                  </div>
                ) : (
                  <button
                    onClick={approveDailyProtocol}
                    disabled={!isAllTasksCompleted}
                    className={`w-full py-3 rounded-full font-bold text-[12.5px] transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isAllTasksCompleted
                        ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black animate-pulse active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                        : "bg-white/10 text-white/30 border border-white/10 cursor-not-allowed"
                    }`}
                  >
                    <span>{isAllTasksCompleted ? "🔓 Protokolü Onayla & +100 XP Al ⚡" : "🔒 Protokolü Onaylamak İçin Tüm Görevleri Tamamlayın"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Günün Yıldızı / Nöbetçi Lider Widget */}
            <div className={`col-span-12 lg:col-span-4 ${cardGlass} p-5 relative overflow-hidden group hover:scale-[1.01] transition-all border border-amber-400/30 bg-gradient-to-br from-amber-950/40 via-zinc-900/60 to-black shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col justify-between`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between relative z-10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="display text-[12.5px] font-bold tracking-widest text-amber-300">
                      👑 GÜNÜN YILDIZI • NÖBETÇİ LİDER
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
                    9-D
                  </span>
                </div>

                {(() => {
                  const topLeader = leaderboard[0] || { name: "Elif K.", xp: 2840, lvl: 12, avatar: "✦", role: "Sınıf Lideri" };
                  return (
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="relative shrink-0">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-500 blur-[4px] animate-pulse" />
                        {renderAvatar(topLeader.avatar, topLeader.name, "w-14 h-14 relative z-10")}
                        <span className="absolute -top-2 -right-1 text-[16px] z-20">👑</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold text-white flex items-center gap-2 truncate">
                          {topLeader.name}
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-bold">
                            Level {topLeader.lvl}
                          </span>
                        </div>
                        <div className="text-[12px] text-amber-200/80 font-mono mt-0.5">
                          ⚡ {topLeader.xp.toLocaleString()} XP • Günlük Şampiyon
                        </div>
                        <div className="text-[11px] text-white/50 italic mt-1 truncate">
                          "9VERSE Evreninin Bugünkü En Yüksek Enerjili Kaşifi!"
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center justify-between text-[11px]">
                <span className="text-white/60 font-medium">Tebrik et & enerji gönder:</span>
                <button
                  onClick={() => {
                    addXp(5);
                    showToast("👑 Nöbetçi Lidere Tebrik Gönderildi! (+5 XP)");
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold hover:scale-105 active:scale-95 transition shadow-md cursor-pointer"
                >
                  👏 Tebrik Et (+5 XP)
                </button>
              </div>
            </div>

            {/* 9. Sınıf Günlük Ders Programı Widget */}
            <div className="col-span-12 lg:col-span-4">
              <div className={`${cardGlass} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="display text-[16px] font-semibold flex items-center gap-2">
                    <span>📅 9. Sınıf Bugünkü Dersler</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-cyan-300">
                    {userProfile.grade} Şubesi
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {scheduleList.map((item, idx) => (
                    <div key={item.id || idx} className="p-2.5 rounded-[12px] bg-white/[0.04] border border-white/10 flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[16px]">{item.icon}</span>
                        <div>
                          <div className="font-bold">{item.subject} <span className="text-[10px] text-white/40 font-normal">({item.teacher})</span></div>
                          <div className="text-[10.5px] text-white/60">{item.topic}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/40 font-mono shrink-0">{item.hour}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arena Section Carousel */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="display text-[18px] font-semibold">
                  9VERSE Arena <span className="text-white/30">🎮</span>
                </h3>
                <button
                  onClick={() => setActiveTab("arena")}
                  className="text-[12px] text-white/50 hover:text-white"
                >
                  Tümünü gör →
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                {[
                  {
                    id: "fast",
                    grad: "from-violet-600 via-fuchsia-600 to-indigo-600",
                    icon: "⚡",
                    title: "HIZLI İŞLEM",
                    desc: "30sn matematik sprint",
                    meta: "Rekor: 14 • +30 XP"
                  },
                  {
                    id: "word",
                    grad: "from-rose-600 via-red-600 to-orange-600",
                    icon: "🔤",
                    title: "KELİME REAKTÖRÜ",
                    desc: "Anagram çöz",
                    meta: "Seviye 3 • +25 XP"
                  },
                  {
                    id: "logic",
                    grad: "from-slate-700 via-zinc-800 to-neutral-900",
                    icon: "🧩",
                    title: "MANTIK KAPISI",
                    desc: "Pattern bul",
                    meta: "Yeni seri • +40 XP"
                  }
                ].map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      if (game.id === "fast") startMathGame();
                      else if (game.id === "word") startWordGame();
                      else startLogicGame();
                    }}
                    className={`snap-start shrink-0 w-[280px] md:w-[320px] h-[155px] rounded-[24px] p-5 text-left relative overflow-hidden border border-white/10 group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(124,58,237,0.25)] transition-all duration-300 bg-gradient-to-br ${game.grad}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-[18px]">
                          {game.icon}
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur text-[10px] tracking-widest text-white/70">
                          {game.meta}
                        </div>
                      </div>
                      <div>
                        <div className="text-[13px] font-bold tracking-[0.18em] text-white/90">
                          {game.title}
                        </div>
                        <div className="mt-1 text-[12px] text-white/70">
                          {game.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Leaderboard with Branch Filter */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-5">
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="display text-[18px] font-semibold">
                    Sınıf Ligi
                  </h3>

                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 overflow-x-auto">
                    {["ALL", "9-A", "9-B", "9-C", "9-D"].map((b) => (
                      <button
                        key={b}
                        onClick={() => setLeaderboardBranchFilter(b)}
                        className={`px-3 py-1 rounded-full text-[10.5px] font-semibold transition ${
                          leaderboardBranchFilter === b
                            ? "bg-white text-black font-bold shadow"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {b === "ALL" ? "Tümü" : b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  {filteredLeaderboard.slice(0, 5).map((item) => (
                    <div
                      key={item.id || item.rank}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-[14px] border transition ${
                        item.me
                          ? "bg-violet-500/10 border-violet-400/30"
                          : "border-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`w-6 text-[12px] font-bold ${
                          item.rank === 1
                            ? "text-amber-300"
                            : item.rank === 2
                            ? "text-zinc-300"
                            : item.rank === 3
                            ? "text-amber-700"
                            : "text-white/40"
                        }`}
                      >
                        #{item.rank}
                      </span>
                      {renderAvatar(item.avatar, item.name, "w-8 h-8")}
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13px] truncate flex items-center gap-1.5 ${item.me ? "font-semibold text-white" : "text-white/90"}`}>
                          {item.name}
                          <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-white/10 text-white/50">{item.branch || "9-A"}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-white/40">
                        Lv {item.lvl}
                      </span>
                      <span className="text-[12px] font-semibold">
                        {item.xp} XP
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("lig")}
                  className="mt-4 w-full py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px] hover:bg-white/[0.08] transition"
                >
                  Tam sıralama tablosunu aç
                </button>
              </div>
            </div>

            {/* Right Column: Events & Secret Box */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
              {/* Events Timeline */}
              <div className={`${cardGlass} p-6`}>
                <div className="flex justify-between items-center">
                  <h3 className="display text-[18px] font-semibold">
                    Etkinlikler
                  </h3>
                  {isAdminAuthenticated && (
                    <button
                      onClick={() => {
                        setActiveTab("admin");
                        setAdminTab("etkinlikler");
                      }}
                      className="text-[11px] text-cyan-300 hover:underline"
                    >
                      + Etkinlik Ekle
                    </button>
                  )}
                </div>
                <div className="mt-5 relative pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                  {events.map((ev, i) => (
                    <div key={ev.id || i} className="relative pb-6 last:pb-0">
                      <div
                        className={`absolute left-[-24px] top-1 w-3.5 h-3.5 rounded-full ${ev.dot} shadow-[0_0_10px_currentColor] border-2 border-[#151a32]`}
                      />
                      <div className="flex justify-between">
                        <div className="text-[13px] font-medium">
                          {ev.title}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${pillGlass}`}>
                          {ev.day}
                        </span>
                      </div>
                      <div className="mt-1 flex gap-2 text-[11px] text-white/40">
                        <span>⏰ {ev.time}</span>
                        <span>•</span>
                        <span>{ev.loc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anonymous Secret Box */}
              <div className={`${cardGlass} p-6`}>
                <h3 className="display text-[16px] font-semibold flex items-center gap-2">
                  Gizli Kutu{" "}
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10">
                    anonim
                  </span>
                </h3>
                <div className="mt-3 flex gap-2">
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Sınıfa anonim bir not bırak..."
                    className="flex-1 min-h-[60px] max-h-[90px] p-3 rounded-[16px] bg-white/[0.05] border border-white/10 placeholder:text-white/30 text-[13px] focus:outline-none resize-none"
                  />
                </div>
                <div className="mt-2.5 flex justify-between items-center">
                  <span className="text-[11px] text-white/30">
                    {posts.length} not
                  </span>
                  <button
                    onClick={submitAnonymousPost}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[12px] font-semibold active:scale-95"
                  >
                    Gönder
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {posts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="p-3 rounded-[14px] bg-white/[0.04] border border-white/[0.06] flex gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[14px] shrink-0">
                        {post.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-[1.4] text-white/80 break-words">
                          {post.text}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-[10.5px] text-white/30">
                          <span>{post.time}</span>
                          <button
                            onClick={() => votePost(post.id)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition ${
                              post.voted
                                ? "bg-white text-black border-white"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            ▲ {post.votes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARENA */}
        {activeTab === "arena" && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="display text-[26px] font-semibold">9VERSE Arena</h2>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-[11px]">
                Canlı: 14 oyuncu • 3 mod aktif
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              <button
                onClick={startMathGame}
                className={`${cardGlass} group p-0 overflow-hidden text-left hover:-translate-y-1 transition-all`}
              >
                <div className="h-[200px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-700 p-6 flex flex-col justify-between relative">
                  <div className="relative flex justify-between">
                    <span className="w-12 h-12 rounded-[14px] bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-[22px]">
                      ⚡
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/30 text-[11px]">
                      30SN • REKOR 14
                    </span>
                  </div>
                  <div className="relative">
                    <div className="text-[18px] font-bold tracking-wide">
                      HIZLI İŞLEM
                    </div>
                    <div className="text-[13px] text-white/70">
                      Matematik sprint • refleks + doğruluk
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-[12px] text-white/50">
                    Son skor: {gameScore}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
                    OYNA →
                  </span>
                </div>
              </button>

              <button
                onClick={startWordGame}
                className={`${cardGlass} group p-0 overflow-hidden text-left hover:-translate-y-1 transition-all`}
              >
                <div className="h-[200px] bg-gradient-to-br from-rose-600 via-red-600 to-orange-600 p-6 flex flex-col justify-between relative">
                  <div className="relative flex justify-between">
                    <span className="w-12 h-12 rounded-[14px] bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-[22px]">
                      🔤
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/30 text-[11px]">
                      LVL 3 • KELİME
                    </span>
                  </div>
                  <div className="relative">
                    <div className="text-[18px] font-bold tracking-wide">
                      KELİME REAKTÖRÜ
                    </div>
                    <div className="text-[13px] text-white/70">
                      Anagram çöz, zinciri kırma
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-[12px] text-white/50">
                    Skor: {wordScore} • hedef 3
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
                    OYNA →
                  </span>
                </div>
              </button>

              <button
                onClick={startLogicGame}
                className={`${cardGlass} group p-0 overflow-hidden text-left hover:-translate-y-1 transition-all`}
              >
                <div className="h-[200px] bg-gradient-to-br from-slate-800 via-zinc-800 to-neutral-900 p-6 flex flex-col justify-between relative border-b border-white/10">
                  <div className="relative flex justify-between">
                    <span className="w-12 h-12 rounded-[14px] bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-[22px]">
                      🧩
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-[11px]">
                      PATTERN • LOGIC
                    </span>
                  </div>
                  <div className="relative">
                    <div className="text-[18px] font-bold tracking-wide">
                      MANTIK KAPISI
                    </div>
                    <div className="text-[13px] text-white/60">
                      Diziyi çöz, kuralı bul
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-[12px] text-white/50">
                    Skor: {logicScore} • hedef 2
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
                    OYNA →
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: LİG */}
        {activeTab === "lig" && (
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="display text-[26px] font-semibold">9VERSE Sınıf Ligi</h2>
              
              <div className="flex items-center gap-3">
                <div className="flex p-1 rounded-full bg-white/5 border border-white/10">
                  {["ALL", "9-A", "9-B", "9-C", "9-D"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setLeaderboardBranchFilter(b)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                        leaderboardBranchFilter === b ? "bg-white text-black font-bold shadow" : "text-white/50"
                      }`}
                    >
                      {b === "ALL" ? "Tüm Şubeler" : b}
                    </button>
                  ))}
                </div>

                <div className="flex p-1 rounded-full bg-white/5 border border-white/10">
                  {["week", "all"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLeaderboardMode(m)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest transition ${
                        leaderboardMode === m ? "bg-violet-600 text-white" : "text-white/50"
                      }`}
                    >
                      {m === "week" ? "BU HAFTA" : "TÜMÜ"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${cardGlass} mt-6 p-2 md:p-4`}>
              {filteredLeaderboard.map((item) => (
                <div
                  key={item.id || item.rank}
                  className={`flex items-center gap-4 py-4 px-4 rounded-[18px] border ${
                    item.me
                      ? "bg-violet-600/15 border-violet-400/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                      : "border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="w-10 text-[14px] font-bold text-white/50">
                    #{item.rank}
                  </span>
                  {renderAvatar(item.avatar, item.name, "w-11 h-11")}
                  <div className="flex-1">
                    <div className="text-[14px] font-medium flex items-center gap-2">
                      {item.name}{" "}
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/70 font-bold">{item.branch || "9-A"}</span>
                      {item.me && (
                        <span className="px-2 py-0.5 rounded-full bg-violet-500 text-[10px]">
                          SEN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-white/40">{item.role || "9. Sınıf Öğrencisi"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold">
                      {item.xp.toLocaleString()} XP
                    </div>
                    <div className="text-[11px] text-white/40">
                      Level {item.lvl}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KUTU */}
        {activeTab === "kutu" && (
          <div className="mt-8 max-w-[760px]">
            <h2 className="display text-[26px] font-semibold">Anonim Gizli Kutu</h2>
            <p className="mt-2 text-[13px] text-white/50">
              Fikirler özgürdür. Upvote vererek en çok beğenilenleri öne çıkarın.
            </p>

            <div className={`${cardGlass} mt-6 p-6`}>
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="9VERSE duvarına anonim bir not bırak..."
                className="w-full min-h-[96px] p-4 rounded-[18px] bg-white/[0.05] border border-white/10 placeholder:text-white/30 text-[14px] focus:outline-none focus:border-violet-400/40 resize-none"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={submitAnonymousPost}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-[13px] active:scale-95"
                >
                  Anonim Gönder • +20 XP
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {posts.map((post) => (
                <div key={post.id} className={`${cardGlass} p-5 flex gap-3`}>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[18px] shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] leading-[1.5] text-white/85">
                      {post.text}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => votePost(post.id)}
                        className={`px-3 py-1 rounded-full border text-[12px] flex items-center gap-1.5 transition ${
                          post.voted
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        ▲ {post.votes} Oy
                      </button>
                      <span className="text-[11px] text-white/30">
                        {post.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ADVANCED COMPREHENSIVE ADMIN PANEL (PROTECTED BY PIN 2198) */}
        {activeTab === "admin" && isAdminAuthenticated && (
          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="display text-[26px] font-semibold flex items-center gap-2">
                  <span>⚡ 9VERSE Admin Yönetim Paneli</span>
                  <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold border border-cyan-400/30">
                    YETKİLİ YÖNETİCİ ONAYLANDI
                  </span>
                </h2>
                <p className="mt-1 text-[13px] text-white/50">
                  Kampüs duyurularını, 9. Sınıf EVET/HAYIR sorularını, ders programını ve kullanıcıları yönetin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsAdminAuthenticated(false);
                    setActiveTab("kampus");
                    showToast("🔒 Admin Oturumu Kapatıldı");
                  }}
                  className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-bold text-[12px] hover:bg-red-500 hover:text-white transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>🔒 Admin Oturumunu Kapat</span>
                </button>

                <div className="flex p-1 rounded-full bg-white/5 border border-white/10 overflow-x-auto shrink-0">
                  {[
                    { id: "duyurular", label: "📢 Duyurular" },
                    { id: "sorular", label: "📚 Sorular" },
                    { id: "program", label: "📅 Ders Programı" },
                    { id: "analiz", label: "📊 İstatistik & Analiz" },
                    { id: "etkinlikler", label: "🗓️ Etkinlikler" },
                    { id: "moderasyon", label: "🛡️ Moderasyon" },
                    { id: "kullanicilar", label: "👥 Kullanıcılar" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition shrink-0 ${
                        adminTab === item.id ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`${cardGlass} p-4 text-center`}>
                <div className="text-[11px] text-white/40 font-semibold tracking-widest">TOPLAM ÖĞRENCİ</div>
                <div className="text-[24px] font-bold mt-1 text-cyan-300">{leaderboard.length}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">● Canlı Veritabanı</div>
              </div>
              <div className={`${cardGlass} p-4 text-center`}>
                <div className="text-[11px] text-white/40 font-semibold tracking-widest">EVET/HAYIR SORULARI</div>
                <div className="text-[24px] font-bold mt-1 text-fuchsia-300">{questions.length} Soru</div>
                <div className="text-[10px] text-white/50 mt-0.5">9. Sınıf Müfredatı</div>
              </div>
              <div className={`${cardGlass} p-4 text-center`}>
                <div className="text-[11px] text-white/40 font-semibold tracking-widest">DUYURULAR</div>
                <div className="text-[24px] font-bold mt-1 text-amber-300">{announcements.length} Yayın</div>
                <div className="text-[10px] text-white/50 mt-0.5">Bant Üstü</div>
              </div>
              <div className={`${cardGlass} p-4 text-center`}>
                <div className="text-[11px] text-white/40 font-semibold tracking-widest">SİSTEM KİLİDİ</div>
                <div className="text-[24px] font-bold mt-1 text-emerald-400">YÖNETİCİ AKTİF</div>
                <div className="text-[10px] text-white/50 mt-0.5">Güvenli Mod</div>
              </div>
            </div>

            {/* Dedicated Quick Action Banner: Ders Programını Ayarla & Düzenle */}
            <div className="col-span-12 p-4 md:p-5 rounded-[24px] bg-gradient-to-r from-violet-900/60 via-indigo-900/50 to-cyan-900/60 border border-cyan-400/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(34,211,238,0.15)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[18px] bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-[24px] shrink-0">
                  📅
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white flex items-center gap-2">
                    <span>9. Sınıf Ders Programı Ayarlama ve Düzenleme Paneli</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold">CANLI YAYIN</span>
                  </div>
                  <div className="text-[13px] text-white/70 mt-0.5 leading-snug">
                    Öğrencilerin gördüğü ders saatlerini, konularını ve öğretmenlerini dilediğiniz an ayarlayın.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setAdminTab("program");
                    window.scrollTo({ top: 500, behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 font-extrabold text-[13px] text-white shadow-xl hover:scale-105 active:scale-95 transition flex items-center gap-2 border border-white/20 cursor-pointer"
                >
                  <span>📅 Ders Programını Ayarla ve Düzenle</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: DUYURULAR */}
            {adminTab === "duyurular" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <h3 className="display text-[18px] font-bold flex items-center gap-2">
                  <span>📢 Sınıfa Canlı Duyuru Yayınla</span>
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    value={adminNewAnnTitle}
                    onChange={(e) => setAdminNewAnnTitle(e.target.value)}
                    placeholder="Duyuru Başlığı (Örn: 9-A Yazılı Takvimi)"
                    className="md:col-span-2 h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px] focus:outline-none"
                  />
                  <select
                    value={adminNewAnnType}
                    onChange={(e) => setAdminNewAnnType(e.target.value)}
                    className="h-11 px-4 rounded-[14px] bg-[#1a1e38] border border-white/10 text-[13px] text-white focus:outline-none"
                  >
                    <option value="info">Bilgi 🟣</option>
                    <option value="urgent">Acil 🔴</option>
                    <option value="event">Etkinlik 🔵</option>
                  </select>
                </div>
                <textarea
                  value={adminNewAnnText}
                  onChange={(e) => setAdminNewAnnText(e.target.value)}
                  placeholder="Duyuru Metni..."
                  className="mt-3 w-full h-20 p-3.5 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px] focus:outline-none resize-none"
                />
                <button
                  onClick={handleAdminAddAnnouncement}
                  className="mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-[13px] active:scale-95 shadow-md"
                >
                  Yayınla 🚀
                </button>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[12px] font-semibold text-white/40 mb-3">YAYINLANAN DUYURULAR</div>
                  <div className="flex flex-col gap-2">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-3.5 rounded-[14px] bg-white/[0.04] border border-white/10 flex justify-between items-center text-[13px]">
                        <div>
                          <span className="font-bold text-white">{ann.title}</span> - <span className="text-white/70">{ann.text}</span>
                        </div>
                        <button onClick={() => handleAdminDeleteAnnouncement(ann.id)} className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded bg-white/5 hover:bg-white/10">
                          Sil
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: SORULAR (EVET / HAYIR) */}
            {adminTab === "sorular" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <h3 className="display text-[18px] font-bold flex items-center gap-2">
                  <span>📚 EVET / HAYIR Formatında 9. Sınıf Sorusu Ekle</span>
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      value={newQTag}
                      onChange={(e) => setNewQTag(e.target.value)}
                      placeholder="Ders & Ünite (Örn: FİZİK • 1. ÜNİTE • +50 XP)"
                      className="h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                    />
                    <input
                      value={newQText}
                      onChange={(e) => setNewQText(e.target.value)}
                      placeholder="Soru Cümlesi (EVET/HAYIR soruları)..."
                      className="h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-white/70 block mb-1">Doğru Cevap Seçimi</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setNewQCorrect(0)}
                        className={`h-11 rounded-[14px] font-bold text-[14px] border transition ${
                          newQCorrect === 0 ? "bg-emerald-500 text-black border-emerald-400 scale-105 shadow-md" : "bg-white/10 border-white/10 text-white/70"
                        }`}
                      >
                        ✅ EVET (Doğru)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewQCorrect(1)}
                        className={`h-11 rounded-[14px] font-bold text-[14px] border transition ${
                          newQCorrect === 1 ? "bg-red-500 text-white border-red-400 scale-105 shadow-md" : "bg-white/10 border-white/10 text-white/70"
                        }`}
                      >
                        ❌ HAYIR (Yanlış)
                      </button>
                    </div>
                  </div>
                  <input
                    value={newQExplain}
                    onChange={(e) => setNewQExplain(e.target.value)}
                    placeholder="Çözüm & Açıklama Detayı..."
                    className="h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                  />
                  <button
                    onClick={handleAdminAddQuestion}
                    className="w-full py-2.5 rounded-full bg-emerald-500 text-black font-bold text-[13px] active:scale-95 shadow-md"
                  >
                    EVET/HAYIR Sorusunu Kaydet
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[12px] font-semibold text-white/40 mb-3">AKTİF EVET/HAYIR SORULARI ({questions.length})</div>
                  <div className="flex flex-col gap-2">
                    {questions.map((qItem, idx) => (
                      <div key={qItem.id || idx} className="p-3.5 rounded-[14px] bg-white/[0.04] border border-white/10 flex justify-between items-center text-[12.5px]">
                        <div>
                          <span className="px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300 text-[10px] font-bold mr-2">{qItem.tag}</span>
                          <span className="font-semibold">{qItem.q}</span>
                        </div>
                        <button onClick={() => handleAdminDeleteQuestion(qItem.id)} className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded bg-white/5 hover:bg-white/10">
                          Sil
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: DERS PROGRAMI YAZMA (FULL ADMIN CONTROL) */}
            {adminTab === "program" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="display text-[18px] font-bold flex items-center gap-2">
                      <span>📅 9. Sınıf Tüm Öğrencilerin Ders Programını Yönet</span>
                    </h3>
                    <p className="text-[13px] text-white/60 mt-0.5">
                      Burada yazdığınız ders programı tüm 9. sınıf öğrencilerinin ana ekranında eşzamanlı güncellenir.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetScheduleToDefault}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 text-[11px] font-semibold hover:bg-white/20 transition"
                    >
                      ↺ Müfredatı Sıfırla
                    </button>
                    <button
                      onClick={handleClearAllSchedule}
                      className="px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/30 text-[11px] font-semibold hover:bg-red-500 hover:text-white transition"
                    >
                      🗑️ Tümünü Temizle
                    </button>
                  </div>
                </div>

                {/* Quick Subject Presets Banner */}
                <div className="mt-4 p-3 rounded-[16px] bg-white/[0.02] border border-white/10">
                  <div className="text-[11px] font-bold text-white/60 mb-2">Hızlı Ders & İkon Seçimi:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Matematik", icon: "📐", teacher: "A. Yılmaz" },
                      { name: "Fizik", icon: "⚡", teacher: "M. Kaya" },
                      { name: "Kimya", icon: "🧪", teacher: "S. Demir" },
                      { name: "Biyoloji", icon: "🧬", teacher: "E. Şahin" },
                      { name: "Tarih", icon: "📜", teacher: "O. Şahin" },
                      { name: "Coğrafya", icon: "🌍", teacher: "Z. Aktaş" },
                      { name: "Edebiyat", icon: "📖", teacher: "N. Öztürk" },
                      { name: "İngilizce", icon: "🇬🇧", teacher: "C. Swift" },
                      { name: "Din Kültürü", icon: "🌙", teacher: "H. Yıldız" },
                      { name: "Beden Eğitimi", icon: "⚽", teacher: "K. Arslan" },
                      { name: "Bilişim", icon: "💻", teacher: "T. Güven" }
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setAdminSchedSubject(preset.name);
                          setAdminSchedIcon(preset.icon);
                          setAdminSchedTeacher(preset.teacher);
                        }}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11.5px] font-medium text-white/90 flex items-center gap-1.5 transition active:scale-95"
                      >
                        <span>{preset.icon}</span>
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Hour Presets */}
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  <span className="text-[11px] font-bold text-white/50 shrink-0">Hızlı Saat:</span>
                  {[
                    "08:30 - 09:10",
                    "09:20 - 10:00",
                    "10:10 - 10:50",
                    "11:00 - 11:40",
                    "12:00 - 12:40",
                    "13:30 - 14:10",
                    "14:20 - 15:00",
                    "15:10 - 15:50"
                  ].map((h, i) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setAdminSchedHour(h)}
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono shrink-0 border transition ${
                        adminSchedHour === h
                          ? "bg-cyan-500 text-black font-bold border-cyan-400"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {i + 1}. Ders ({h})
                    </button>
                  ))}
                </div>

                {/* Main Schedule Form */}
                <div className="mt-4 p-4 rounded-[18px] bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                  <div className="text-[12px] font-bold text-cyan-300 flex items-center justify-between">
                    <span>{editingScheduleId ? "✏️ Seçili Dersi Düzenle" : "➕ Yeni Ders Ekle"}</span>
                    {editingScheduleId && (
                      <button
                        onClick={resetAdminScheduleForm}
                        className="text-[11px] px-3 py-1 rounded-full bg-white/10 text-white/70 hover:text-white"
                      >
                        ✕ İptal et (Yeni Derse Dön)
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-white/50 block mb-1">Ders Saati</label>
                      <input
                        value={adminSchedHour}
                        onChange={(e) => setAdminSchedHour(e.target.value)}
                        placeholder="Örn: 08:30 - 09:10"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-white/50 block mb-1">Ders Adı *</label>
                      <input
                        value={adminSchedSubject}
                        onChange={(e) => setAdminSchedSubject(e.target.value)}
                        placeholder="Örn: Matematik"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-white/50 block mb-1">Öğretmen Adı</label>
                      <input
                        value={adminSchedTeacher}
                        onChange={(e) => setAdminSchedTeacher(e.target.value)}
                        placeholder="Örn: A. Yılmaz"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-white/50 block mb-1">Ders Konusu *</label>
                      <input
                        value={adminSchedTopic}
                        onChange={(e) => setAdminSchedTopic(e.target.value)}
                        placeholder="Örn: Mantık & Önermeler"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-white/50 block mb-1">İkon Simge</label>
                      <input
                        value={adminSchedIcon}
                        onChange={(e) => setAdminSchedIcon(e.target.value)}
                        placeholder="Örn: 📐, ⚡, 🧪, 🧬, 📜"
                        className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveScheduleItem}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold text-[13.5px] active:scale-95 shadow-md transition mt-1"
                  >
                    {editingScheduleId ? "Dersi Güncelle ve Kaydet 💾" : "Ders Programına Ekle 📅"}
                  </button>
                </div>

                {/* Schedule List with Re-order controls */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[12px] font-semibold text-white/40 mb-3 flex items-center justify-between">
                    <span>GÜNCEL DERS PROGRAMI ({scheduleList.length} Ders)</span>
                    <span className="text-[11px] text-white/30">Sıralamak için ▲ ve ▼ butonlarını kullanın</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {scheduleList.length === 0 ? (
                      <div className="text-center py-6 text-[13px] text-white/40 italic bg-white/[0.02] rounded-[14px]">
                        Henüz ders eklenmedi. Yukarıdaki formdan yeni ders yazabilirsiniz.
                      </div>
                    ) : (
                      scheduleList.map((item, idx) => {
                        const isEditingThis = editingScheduleId === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`p-3.5 rounded-[14px] border flex justify-between items-center text-[12.5px] transition ${
                              isEditingThis
                                ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Move Up/Down Controls */}
                              <div className="flex flex-col gap-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleAdminMoveScheduleUp(idx)}
                                  disabled={idx === 0}
                                  className={`w-6 h-5 rounded bg-white/10 text-[10px] flex items-center justify-center ${
                                    idx === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/20"
                                  }`}
                                  title="Yukarı Taşı"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAdminMoveScheduleDown(idx)}
                                  disabled={idx === scheduleList.length - 1}
                                  className={`w-6 h-5 rounded bg-white/10 text-[10px] flex items-center justify-center ${
                                    idx === scheduleList.length - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/20"
                                  }`}
                                  title="Aşağı Taşı"
                                >
                                  ▼
                                </button>
                              </div>

                              <span className="text-[22px]">{item.icon}</span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white text-[14px]">{item.subject}</span>
                                  {item.teacher && (
                                    <span className="text-white/50 text-[11.5px]">({item.teacher})</span>
                                  )}
                                </div>
                                <div className="text-white/80 mt-0.5">{item.topic}</div>
                                <div className="text-[10.5px] text-cyan-300 font-mono mt-0.5 font-semibold">
                                  {idx + 1}. Ders • {item.hour}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEditSchedule(item)}
                                className="text-cyan-300 font-bold px-3 py-1.5 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-[11.5px] transition"
                              >
                                {isEditingThis ? "Düzenleniyor..." : "Düzenle ✏️"}
                              </button>
                              <button
                                onClick={() => handleAdminDeleteSchedule(item.id)}
                                className="text-red-400 font-bold px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[11.5px] transition"
                              >
                                Sil 🗑️
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 7: ÖĞRENCİ İSTATİSTİK & BAŞARI ANALİZİ */}
            {adminTab === "analiz" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="display text-[20px] font-bold flex items-center gap-2">
                      <span>📊 9. Sınıf Öğrenci İstatistik ve Başarı Analiz Paneli</span>
                    </h3>
                    <p className="text-[13px] text-white/60 mt-0.5">
                      Canlı veritabanından alınan öğrenci doğruluk oranları, ders başarıları ve aktif XP dağılım istatistikleri.
                    </p>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-mono font-bold border border-cyan-400/30">
                    ● CANLI SİSTEM VERİSİ
                  </div>
                </div>

                {/* Key Metric Stat Cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[11px] text-white/40 font-semibold tracking-widest uppercase">GENEL DOĞRULUK ORANI</div>
                    <div className="text-[32px] font-extrabold text-emerald-400 mt-1">%87.4</div>
                    <div className="text-[11px] text-white/60 mt-0.5">EVET / HAYIR Soruları</div>
                  </div>
                  <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[11px] text-white/40 font-semibold tracking-widest uppercase">TOPLAM ÇÖZÜLEN SORU</div>
                    <div className="text-[32px] font-extrabold text-cyan-300 mt-1">1,482</div>
                    <div className="text-[11px] text-white/60 mt-0.5">Bu Haftalık Katılım</div>
                  </div>
                  <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[11px] text-white/40 font-semibold tracking-widest uppercase">AKTİF ŞUBE REKORU</div>
                    <div className="text-[32px] font-extrabold text-amber-300 mt-1">9-D Şubesi</div>
                    <div className="text-[11px] text-white/60 mt-0.5">13,660 Toplam XP</div>
                  </div>
                  <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[11px] text-white/40 font-semibold tracking-widest uppercase">EN BAŞARILI DERS</div>
                    <div className="text-[32px] font-extrabold text-fuchsia-300 mt-1">Matematik</div>
                    <div className="text-[11px] text-white/60 mt-0.5">%91.2 Başarı Oranı</div>
                  </div>
                </div>

                {/* Course Performance Breakdown Progress Bars */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-5 rounded-[22px] bg-white/[0.02] border border-white/10">
                    <h4 className="text-[15px] font-bold text-white mb-4 flex items-center justify-between">
                      <span>📚 Ders Bazlı Doğruluk Oranı</span>
                      <span className="text-[11px] text-white/40 font-normal">9. Sınıf Müfredatı</span>
                    </h4>
                    <div className="flex flex-col gap-3.5">
                      {[
                        { subject: "Matematik (Mantık & Önermeler)", rate: 91, color: "from-violet-500 to-fuchsia-500" },
                        { subject: "Fizik (Fizik Bilimine Giriş)", rate: 84, color: "from-cyan-500 to-blue-500" },
                        { subject: "Kimya (Kimya Bilimi & Simya)", rate: 88, color: "from-emerald-500 to-teal-500" },
                        { subject: "Biyoloji (Yaşam Bilimi Biyoloji)", rate: 93, color: "from-amber-400 to-yellow-500" },
                        { subject: "Tarih & Coğrafya", rate: 81, color: "from-rose-500 to-pink-500" },
                        { subject: "Türk Dili ve Edebiyatı", rate: 86, color: "from-indigo-500 to-violet-500" }
                      ].map((item) => (
                        <div key={item.subject}>
                          <div className="flex justify-between text-[12.5px] font-medium mb-1">
                            <span className="text-white/80">{item.subject}</span>
                            <span className="font-mono font-bold text-white">%{item.rate}</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${item.rate}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top 5 Student Leaderboard Spotlight in Admin Panel */}
                  <div className="p-5 rounded-[22px] bg-white/[0.02] border border-white/10">
                    <h4 className="text-[15px] font-bold text-white mb-4 flex items-center justify-between">
                      <span>🏆 Sınıf Puan & XP Dağılımı</span>
                      <span className="text-[11px] text-cyan-300 font-bold">Liderlik Tablosu</span>
                    </h4>
                    <div className="flex flex-col gap-3">
                      {leaderboard.slice(0, 5).map((st, i) => (
                        <div key={st.id || i} className="p-3 rounded-[16px] bg-white/[0.04] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 text-[13px] font-extrabold text-white/50">#{i + 1}</span>
                            {renderAvatar(st.avatar, st.name, "w-9 h-9")}
                            <div>
                              <div className="text-[13px] font-bold text-white">{st.name}</div>
                              <div className="text-[11px] text-white/50">Level {st.lvl} • {st.branch || "9-D"}</div>
                            </div>
                          </div>
                          <div className="text-right font-mono font-bold text-cyan-300 text-[13.5px]">
                            {st.xp.toLocaleString()} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: ETKİNLİKLER */}
            {adminTab === "etkinlikler" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <h3 className="display text-[18px] font-bold flex items-center gap-2">
                  <span>🗓️ Yeni Etkinlik Ekle & Takvim Yönetimi</span>
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <input
                    value={adminEventTitle}
                    onChange={(e) => setAdminEventTitle(e.target.value)}
                    placeholder="Etkinlik Başlığı (Örn: 9-A Sınıf Çalışması)"
                    className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13px]"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input value={adminEventDay} onChange={(e) => setAdminEventDay(e.target.value)} placeholder="Gün (Yarın)" className="h-10 px-3 rounded-[12px] bg-white/[0.05] border border-white/10 text-[12px]" />
                    <input value={adminEventTime} onChange={(e) => setAdminEventTime(e.target.value)} placeholder="Saat (16:30)" className="h-10 px-3 rounded-[12px] bg-white/[0.05] border border-white/10 text-[12px]" />
                    <input value={adminEventLoc} onChange={(e) => setAdminEventLoc(e.target.value)} placeholder="Mekan (Lab 2)" className="h-10 px-3 rounded-[12px] bg-white/[0.05] border border-white/10 text-[12px]" />
                  </div>
                  <button
                    onClick={handleAdminAddEvent}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 font-bold text-[13px] active:scale-95"
                  >
                    Etkinlik Ekle
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[12px] font-semibold text-white/40 mb-3">PLANLANAN ETKİNLİKLER ({events.length})</div>
                  <div className="flex flex-col gap-2">
                    {events.map((ev) => (
                      <div key={ev.id} className="p-3 rounded-[14px] bg-white/[0.04] border border-white/10 flex justify-between items-center text-[12.5px]">
                        <div>
                          <span className="font-bold text-white">{ev.title}</span> • <span className="text-white/60">{ev.day} - {ev.time} ({ev.loc})</span>
                        </div>
                        <button onClick={() => handleAdminDeleteEvent(ev.id)} className="text-red-400 font-bold px-3 py-1 rounded bg-white/5 hover:bg-white/10">
                          Kaldır
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: MODERASYON */}
            {adminTab === "moderasyon" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <h3 className="display text-[18px] font-bold flex items-center gap-2">
                  <span>🛡️ Anonim Gizli Kutu Moderasyonu</span>
                </h3>
                <div className="mt-4 flex flex-col gap-2.5">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 rounded-[16px] bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[20px]">{post.avatar}</span>
                        <div>
                          <div className="text-[13px] text-white">{post.text}</div>
                          <div className="text-[10px] text-white/40 mt-0.5">{post.time} • ▲ {post.votes} Oy</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdminDeletePost(post.id)}
                        className="px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/30 text-[11px] font-bold hover:bg-red-500 hover:text-white transition"
                      >
                        Notu Sil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 6: KULLANICILAR */}
            {adminTab === "kullanicilar" && (
              <div className={`col-span-12 ${cardGlass} p-6`}>
                <h3 className="display text-[18px] font-bold flex items-center gap-2">
                  <span>👥 Öğrenci Veritabanı & Şube Yönetimi</span>
                </h3>
                <div className="mt-4 flex flex-col gap-2">
                  {leaderboard.map((item) => (
                    <div key={item.id || item.rank} className="p-3.5 rounded-[16px] bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {renderAvatar(item.avatar, item.name, "w-10 h-10")}
                        <div>
                          <div className="text-[13.5px] font-bold flex items-center gap-2">
                            {item.name} <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-cyan-300">{item.branch || "9-A"}</span>
                            {item.me && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600 text-white">SEN</span>}
                            {item.isAdmin && <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">ADMIN</span>}
                          </div>
                          <div className="text-[11px] text-white/40">{item.role || "Öğrenci"} • Level {item.lvl} • {item.xp} XP</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAdminGrantXp(item.me ? "me" : item.id, 100)}
                          className="px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 border border-violet-400/30 text-[11px] font-bold hover:bg-violet-600 hover:text-white transition"
                        >
                          +100 XP
                        </button>
                        <button
                          onClick={() => handleAdminToggleUserAdmin(item.id)}
                          className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] hover:bg-white/20 transition"
                        >
                          {item.isAdmin ? "Admin Al" : "Admin Yap"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: PROFİL */}
        {activeTab === "profil" && (
          <div className="mt-8 grid grid-cols-12 gap-5">
            {/* User Profile Card */}
            <div className={`col-span-12 md:col-span-5 ${cardGlass} p-7 text-center relative overflow-hidden`}>
              <div className="absolute top-4 right-4">
                <button
                  onClick={openEditProfileModal}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[11px] font-bold tracking-wide active:scale-95 shadow-md flex items-center gap-1.5"
                >
                  <span>✏️</span> Profili Düzenle
                </button>
              </div>

              <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_35px_rgba(168,85,247,0.45)] relative">
                {renderAvatar(userProfile.avatar, userProfile.name, "w-full h-full rounded-full")}
              </div>

              <div className="mt-4 display text-[22px] font-bold flex items-center justify-center gap-2">
                {userProfile.name}
                <span className="px-2 py-0.5 rounded bg-violet-600/40 text-violet-300 text-[11px] font-bold border border-violet-400/40">
                  {userProfile.grade}
                </span>
                {isAdminAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[9px] font-bold border border-cyan-400/30">
                    ADMIN
                  </span>
                )}
              </div>
              <div className="mt-1 text-[12px] tracking-widest text-white/50 font-medium">
                LEVEL {currentLevel} • {userProfile.title.toUpperCase()}
              </div>

              <p className="mt-3 text-[13px] text-white/70 italic px-4 leading-relaxed">
                "{userProfile.bio}"
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-[16px] bg-white/[0.04] border border-white/10">
                  <div className="text-[18px] font-bold">{xp.toLocaleString()}</div>
                  <div className="text-[10px] text-white/40 font-semibold">XP</div>
                </div>
                <div className="p-3.5 rounded-[16px] bg-white/[0.04] border border-white/10">
                  <div className="text-[18px] font-bold">{streak}</div>
                  <div className="text-[10px] text-white/40 font-semibold">STREAK</div>
                </div>
                <div className="p-3.5 rounded-[16px] bg-white/[0.04] border border-white/10">
                  <div className="text-[18px] font-bold">
                    {badges.filter((b) => b.unlocked).length}
                  </div>
                  <div className="text-[10px] text-white/40 font-semibold">ROZET</div>
                </div>
              </div>

              <div className="mt-6 text-left">
                <div className="text-[11px] font-bold tracking-widest text-white/50">
                  SEVİYE İLERLEMESİ
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-full"
                    style={{ width: `${(currentXpInLevel / 400) * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/40">
                  <span>{currentXpInLevel} XP</span>
                  <span>400 XP → Level {currentLevel + 1}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Badges & Settings */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
              <div className={`${cardGlass} p-6`}>
                <h3 className="font-semibold text-[16px]">
                  Kazanılan Rozetler ({badges.filter((b) => b.unlocked).length}/{badges.length})
                </h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {badges.map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className={`p-4 rounded-[18px] border text-left transition hover:-translate-y-0.5 relative ${
                        badge.unlocked
                          ? "bg-white/[0.06] border-violet-400/20 shadow-md"
                          : "bg-white/[0.03] border-white/10 opacity-50"
                      }`}
                    >
                      <div className="text-[24px]">
                        {badge.unlocked ? badge.icon : "🔒"}
                      </div>
                      <div className="mt-2 text-[12px] font-bold tracking-wide leading-tight">
                        {badge.name}
                      </div>
                      <div className="mt-1 text-[10px] text-white/40 leading-tight">
                        {badge.desc}
                      </div>
                      <div className="mt-2.5 inline-flex px-2 py-0.5 rounded-full bg-white/10 text-[8px] tracking-widest font-semibold">
                        {badge.rarity.toUpperCase()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`${cardGlass} p-6`}>
                <h3 className="font-semibold text-[16px]">Sistem & Kullanıcı Ayarları</h3>
                <div className="mt-4 flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between items-center p-3 rounded-[12px] bg-white/[0.03] border border-white/5">
                    <span>Yeniden Kayıt Ol / Giriş Yap</span>
                    <button
                      onClick={() => setShowRegistrationScreen(true)}
                      className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold hover:bg-white/20"
                    >
                      Kayıt Ekranı
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-[12px] bg-white/[0.03] border border-white/5">
                    <span>3D Açılış Ekranı Testi</span>
                    <button
                      onClick={triggerSplashReplay}
                      className="px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 text-[11px] font-semibold hover:bg-violet-600 hover:text-white"
                    >
                      3D Splash (4s)
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-[12px] bg-white/[0.03] border border-white/5">
                    <span>Admin Oturumu</span>
                    <span className="text-cyan-300 font-mono font-bold">
                      {isAdminAuthenticated ? "YETKİLİ ONAYLI" : "KİLİTLİ"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("9verse-app-data-v6");
                    window.location.reload();
                  }}
                  className="mt-4 w-full py-2.5 rounded-full bg-white/5 border border-white/10 text-[12px] text-white/60 hover:text-white hover:bg-white/10 transition"
                >
                  Sistem verilerini ve ilerlemeyi sıfırla
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-6 inset-x-0 z-30 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[rgba(18,20,42,0.88)] backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          {[
            { id: "kampus", label: "Kampüs", icon: "◧" },
            { id: "arena", label: "Arena", icon: "◈" },
            { id: "lig", label: "Lig", icon: "⬙" },
            { id: "kutu", label: "Kutu", icon: "⬔" },
            { id: "admin", label: "Admin", icon: "⚡" },
            { id: "profil", label: "Profil", icon: "◍" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`px-3 h-10 rounded-full flex items-center gap-1.5 text-[12px] font-semibold transition shrink-0 ${
                activeTab === item.id
                  ? "bg-white text-black shadow-md"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <span>{item.icon}</span>
              <span className={activeTab === item.id ? "" : "hidden xs:inline"}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[12px]">
          <div className={`${cardGlass} w-full max-w-[460px] p-6 md:p-7 bg-[#151a32] relative overflow-hidden shadow-2xl`}>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="display text-[18px] font-bold flex items-center gap-2">
                <span>✏️ Profili ve Şubeyi Düzenle</span>
              </h3>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="text-[12px] font-bold text-white/70 block mb-2">
                  Profil Fotoğrafı Seç / Yükle
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 shrink-0">
                    {renderAvatar(editAvatar, editName, "w-full h-full rounded-full")}
                  </div>
                  <div className="flex-1">
                    <label className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[12px] font-semibold cursor-pointer hover:bg-white/20 transition">
                      📁 Fotoğraf Yükle (Cihazdan)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarFileUpload(e, setEditAvatar)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-[11.5px] font-semibold text-white/70">Hazır Avatarlar ({PRESET_AVATARS.length} Adet):</div>
                    <span className="text-[10px] text-cyan-300 font-mono">Tümü Seçilebilir</span>
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 max-h-[150px] overflow-y-auto p-2 bg-white/[0.04] border border-white/10 rounded-[18px] custom-scrollbar">
                    {PRESET_AVATARS.map((av, idx) => {
                      const avValue = av.symbol;
                      const isSelected = editAvatar === avValue;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setEditAvatar(avValue)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                            isSelected
                              ? "bg-violet-600 border-white scale-110 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                              : "bg-white/10 border-white/10 hover:bg-white/20 hover:scale-105"
                          }`}
                          title={av.name}
                        >
                          {av.type === "img" || av.symbol === "/logo.png" ? (
                            <img src="/logo.png" alt="9VERSE" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-[15px] font-bold text-white">{av.symbol}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-white/70 block mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Adınız ve Soyadınız"
                  className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-white/70 block mb-1.5">
                  9. Sınıf Şubeniz
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_BRANCHES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setEditGrade(b)}
                      className={`h-10 rounded-[12px] font-bold text-[13px] border transition-all ${
                        editGrade === b
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-white scale-105 shadow-md"
                          : "bg-white/[0.05] border-white/10 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>



              <div>
                <label className="text-[12px] font-semibold text-white/70 block mb-1">
                  Hesap Giriş Şifresi (Görüntüle / Güncelle)
                </label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Şifreniz..."
                  className="w-full h-11 px-4 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50 font-mono tracking-wider text-cyan-300"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-white/70 block mb-1">
                  Biyografi / Hakkımda
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Kendiniz hakkında kısa bir bilgi..."
                  className="w-full h-20 p-3.5 rounded-[14px] bg-white/[0.05] border border-white/10 text-[13.5px] focus:outline-none focus:border-violet-400/50 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex gap-3 justify-end">
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="px-5 py-2.5 rounded-full bg-white/10 text-[12px] font-semibold hover:bg-white/20 transition"
              >
                İptal
              </button>
              <button
                onClick={saveProfile}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[12px] font-semibold active:scale-95 shadow-lg"
              >
                Kaydet & Güncelle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Modals */}
      {/* 1. Hızlı İşlem Modal */}
      {activeGame === "fast" && (
        <div className="fixed inset-0 z-[65] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-[10px]">
          <div className={`${cardGlass} w-full max-w-[420px] p-6 md:p-7 bg-[#151a32]`}>
            <div className="flex justify-between items-center">
              <h3 className="display text-[18px] font-bold tracking-wide">
                HIZLI İŞLEM • {gameTimer}s
              </h3>
              <button
                onClick={() => setActiveGame(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="text-[11px] tracking-widest text-white/40">SORU</div>
              <div className="mt-2 text-[42px] font-bold tracking-tight">
                {mathProblem.a} {mathProblem.op} {mathProblem.b} = ?
              </div>
              <div className="mt-1 text-[12px] text-white/40">
                Skor: {gameScore} • +8 XP / doğru
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                value={userMathInput}
                onChange={(e) => setUserMathInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitMathAnswer()}
                autoFocus
                type="number"
                placeholder="Cevap"
                className="flex-1 h-[48px] px-5 rounded-full bg-white text-black font-bold text-[16px] placeholder:text-black/30 focus:outline-none"
              />
              <button
                onClick={submitMathAnswer}
                className="h-[48px] px-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-[13px] active:scale-95"
              >
                GÖNDER
              </button>
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all"
                style={{ width: `${(gameTimer / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Kelime Reaktörü Modal */}
      {activeGame === "word" && (
        <div className="fixed inset-0 z-[65] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-[10px]">
          <div className={`${cardGlass} w-full max-w-[420px] p-6 md:p-7 bg-[#1a142f]`}>
            <div className="flex justify-between items-center">
              <h3 className="display text-[18px] font-bold tracking-wide">
                KELİME REAKTÖRÜ
              </h3>
              <button
                onClick={() => setActiveGame(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] tracking-widest">
                HEDEF: {wordScore}/3 • +25 XP / kelime
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {scrambledWord.split("").map((ch, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-[10px] bg-white/10 border border-white/15 flex items-center justify-center font-bold text-[16px]"
                  >
                    {ch}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-white/40">
                Karışık: {scrambledWord} → Doğrusu?
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                value={userWordInput}
                onChange={(e) => setUserWordInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && submitWordAnswer()}
                placeholder="KELİMEYİ YAZ"
                className="flex-1 h-[48px] px-5 rounded-full bg-white text-black font-bold tracking-widest text-[14px] placeholder:text-black/30 focus:outline-none"
              />
              <button
                onClick={submitWordAnswer}
                className="h-[48px] px-6 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 font-bold text-[13px] active:scale-95"
              >
                ÇÖZ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mantık Kapısı Modal */}
      {activeGame === "logic" && (
        <div className="fixed inset-0 z-[65] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-[10px]">
          <div className={`${cardGlass} w-full max-w-[440px] p-6 md:p-7 bg-[#151a2a]`}>
            <div className="flex justify-between items-center">
              <h3 className="display text-[18px] font-bold tracking-wide">
                MANTIK KAPISI
              </h3>
              <button
                onClick={() => setActiveGame(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <div className="text-[11px] tracking-widest text-white/40">
                SIRA • Skor {logicScore}/2 • +40 XP
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {LOGIC_PATTERNS[logicIndex].seq.map((num, i) => (
                  <React.Fragment key={i}>
                    <div className="min-w-[44px] h-[44px] px-3 rounded-[12px] bg-white/[0.06] border border-white/10 flex items-center justify-center font-bold text-[16px]">
                      {num}
                    </div>
                    <span className="text-white/20">,</span>
                  </React.Fragment>
                ))}
                <div className="w-[56px] h-[44px] rounded-[12px] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center font-bold">
                  ?
                </div>
              </div>
              <div className="mt-3 text-[12px] text-white/40">
                İpucu: Kuralı bul, sıradaki sayıyı yaz.
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                value={userLogicInput}
                onChange={(e) => setUserLogicInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitLogicAnswer()}
                type="number"
                placeholder="?"
                className="flex-1 h-[48px] px-5 rounded-full bg-white text-black font-bold text-[18px] text-center focus:outline-none"
              />
              <button
                onClick={submitLogicAnswer}
                className="h-[48px] px-6 rounded-full bg-white text-black font-bold text-[13px] active:scale-95"
              >
                KONTROL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Story Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-[66] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-[12px]"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${cardGlass} w-full max-w-[360px] p-7 bg-[#18132e] text-center`}
          >
            <div className="w-16 h-16 mx-auto rounded-[18px] bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-[28px] shadow-[0_0_30px_rgba(124,58,237,0.4)]">
              {selectedBadge.icon}
            </div>
            <div className="mt-4 display text-[18px] font-bold">
              {selectedBadge.name}
            </div>
            <div className="mt-1 inline-flex px-2 py-0.5 rounded-full bg-white/10 text-[10px] tracking-widest">
              {selectedBadge.rarity.toUpperCase()} •{" "}
              {selectedBadge.unlocked ? "AÇIK" : "KİLİTLİ"}
            </div>
            <p className="mt-4 text-[13px] leading-[1.6] text-white/60">
              {selectedBadge.story}
            </p>
            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-white text-black font-semibold text-[12px]"
            >
              KAPAT
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom-Left WhatsApp Contact Support Button (0530 151 28 61) */}
      <a
        href="https://wa.me/905301512861?text=Merhaba,%209VERSE%20Dijital%20Kamp%C3%BCs%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-[150] px-4 py-2.5 rounded-full bg-[rgba(10,25,20,0.92)] border border-emerald-400/50 text-emerald-300 backdrop-blur-2xl transition-all duration-300 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.35)] hover:scale-105 hover:border-emerald-300 hover:text-white select-none group"
        title="WhatsApp İletişim Destek Hattı (0530 151 28 61)"
      >
        <div className="relative w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
          <span className="text-[16px]">💬</span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11.5px] font-bold text-white leading-tight flex items-center gap-1.5">
            <span>WhatsApp İletişim</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">7/24</span>
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono leading-tight">
            0530 151 28 61
          </span>
        </div>
      </a>

      {/* Floating Bottom-Right YouTube Music Controller Widget (z-[150] for 3D Splash Screen access) */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[150] flex items-center gap-2">
        {/* Invisible YouTube Audio Player for Mabel Matiz - Vals (oLOOAFETHO0) */}
        {isPlayingMusic && (
          <iframe
            width="1"
            height="1"
            src="https://www.youtube.com/embed/oLOOAFETHO0?autoplay=1&loop=1&playlist=oLOOAFETHO0&start=18"
            title="Mabel Matiz - Vals Audio Stream"
            frameBorder="0"
            allow="autoplay"
            className="opacity-0 pointer-events-none fixed -bottom-20 -right-20 w-1 h-1 z-0"
          />
        )}

        {/* Glass Control Bar Button */}
        <div
          onClick={toggleBackgroundMusic}
          className={`px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.8)] cursor-pointer group select-none ${
            isPlayingMusic
              ? "bg-[rgba(16,18,38,0.92)] border-cyan-400/60 shadow-[0_0_30px_rgba(34,211,238,0.4)] scale-105"
              : "bg-black/80 border-white/20 hover:bg-white/10 hover:border-white/40"
          }`}
          title={isPlayingMusic ? "Müziği Durdur" : "Mabel Matiz - Vals Müziğini Başlat"}
        >
          {/* Animated Equalizer Waves / Music Icon */}
          <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
            {isPlayingMusic ? (
              <div className="flex items-end gap-[2.5px] h-4">
                <span className="w-1 bg-cyan-400 rounded-full animate-[equalizer_0.6s_ease-in-out_infinite]" />
                <span className="w-1 bg-fuchsia-400 rounded-full animate-[equalizer_0.8s_ease-in-out_0.2s_infinite]" />
                <span className="w-1 bg-violet-400 rounded-full animate-[equalizer_0.5s_ease-in-out_0.4s_infinite]" />
                <span className="w-1 bg-amber-400 rounded-full animate-[equalizer_0.7s_ease-in-out_0.1s_infinite]" />
              </div>
            ) : (
              <span className="text-[16px] text-white/70 group-hover:text-white transition">🎵</span>
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11.5px] font-bold text-white leading-tight flex items-center gap-1.5">
              <span>Mabel Matiz - Vals</span>
              {isPlayingMusic && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              )}
            </span>
            <span className="text-[10px] text-white/60 font-mono leading-tight">
              {isPlayingMusic ? "● Çalıyor (Mabel Matiz)" : "▶ Müziği Aç / Kapat"}
            </span>
          </div>

          <button
            type="button"
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] transition ${
              isPlayingMusic
                ? "bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                : "bg-white/10 text-white group-hover:bg-white/20"
            }`}
          >
            {isPlayingMusic ? "⏸" : "▶"}
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 md:pl-[136px] max-w-[1280px] mx-auto px-6 pb-6 text-[11px] text-white/20 flex gap-4">
        <span>9VERSE PROTOCOL v3.0</span>
        <span className="hidden md:inline">
          • Admin Korumalı Panel • EVET / HAYIR Soruları • Ders Programı Yönetimi
        </span>
      </div>
    </div>
  );
}
