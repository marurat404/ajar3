const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Simpan daftar user yang sudah dikirimi pesan pertama
const welcomedUsers = new Set();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Tampilkan QR code untuk login
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('✅ Scan QR code dengan WhatsApp kamu');
});

client.on('ready', () => {
    console.log('✅ Bot aktif dan siap menerima pesan!');
});

// Pesan sambutan awal
const longMessage = `
👋 Hai! Selamat datang di layanan bot WhatsApp BPS Kabupaten Tapanuli Selatan.

Berikut adalah informasi lengkap mengenai fitur bot ini:

1️⃣ *Layanan Informasi* (ketik: 1)
2️⃣ *Jam Operasional Pelayanan* (ketik: 2)
3️⃣ *Kontak dan Admin* (ketik: 3)

Kamu juga bisa menanyakan seputar *mitra* atau *magang* dengan cukup mengetikkan kata kunci.

📌 Catatan:
Pesan ini dikirim otomatis ketika kamu menghubungi bot kami untuk pertama kalinya. Terima kasih! 😊
`;
const longMessage1 = `
🕒 *Layanan Kantor BPS Tapanuli Selatan*

- Perpustakaan
- Konsultasi Data Statistik
- Pembinaan Statistik Sektoral
`;

const longMessage2 = `
🕒 *Jam Operasional Kantor BPS Tapanuli Selatan*

Senin – Jumat : 08:00 - 16:00 WIB  
Sabtu – Minggu : Libur  
Hari Libur Nasional : Kantor tutup sesuai kalender nasional.
`;

const longMessage3 = `
📍 *Alamat & Kontak BPS Tapanuli Selatan*

🏢 Alamat:  
Jl. Raja Inal Siregar Km 5.6, Batu Nadua, Padang Sidempuan Batunadua, Sumut  
📮 Kode Pos: 22733  
📞 Telepon: (0634) 25826  
📧 Email: bps1203@bps.go.id  
📌 Peta Lokasi: https://maps.app.goo.gl/UnzLq8q6HJfn2ef39
`;

client.on('message', async msg => {
    const sender = msg.from;
    const message = msg.body.toLowerCase();

    // Kirim pesan selamat datang jika belum pernah menyapa
    if (!welcomedUsers.has(sender)) {
        await msg.reply(longMessage);
        welcomedUsers.add(sender);
        return;
    }

    // Keyword numerik
    if (message.includes('1')) {
        await msg.reply(longMessage1);
    } else if (message.includes('2')) {
        await msg.reply(longMessage2);
    } else if (message.includes('3')) {
        await msg.reply(longMessage3); // Ubah jika kontak berbeda
    }

    // Kata kunci umum
    if (message.includes('mitra')) {
        await msg.reply("📢 Pengumuman mitra tahun 2006 belum dibuka. Terima kasih.");
    }

    if (message.includes('halo')) {
        await msg.reply("👋 Sama-sama! Senang bisa membantu 😊");
    }

    if (message.includes('magang')) {
        await msg.reply("📚 Untuk informasi magang, silakan kunjungi kantor kami sesuai jam pelayanan. Terima kasih.");
    }
});

client.initialize();
