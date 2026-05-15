const fs = require('fs');
const path = 'src/components/layout/Footer/Footer.jsx';
let content = fs.readFileSync(path, 'utf8');

// fix Jelajahi keys
content = content.replace('{ label: "Tentang Kami", href: "/tentang" }', '{ labelKey: "about", href: "/tentang" }');
content = content.replace('{ label: "Event & Kejuaraan", href: "/events" }', '{ labelKey: "events", href: "/events" }');
content = content.replace('{ label: "Galeri Kegiatan", href: "/galeri" }', '{ labelKey: "gallery", href: "/galeri" }');
content = content.replace('{ label: "Berita Terkini", href: "/berita" }', '{ labelKey: "news", href: "/berita" }');

// fix Layanan keys
content = content.replace('{ label: "Donasi", href: "/donasi" }', '{ labelKey: "donate", href: "/donasi" }');
content = content.replace('{ label: "Katalog Merchandise", href: "/katalog" }', '{ labelKey: "catalog", href: "/katalog" }');
content = content.replace('{ label: "Pendaftaran Anggota", href: "/daftar" }', '{ labelKey: "register", href: "/daftar" }');
content = content.replace('{ label: "Verifikasi Sertifikat", href: "/verify" }', '{ labelKey: "verify", href: "/verify" }');

// fix rendering
content = content.replace(/\{link.label\}/g, '{t(`links.${link.labelKey}`)}');

fs.writeFileSync(path, content, 'utf8');
