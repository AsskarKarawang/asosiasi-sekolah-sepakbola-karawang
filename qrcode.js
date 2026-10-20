<!DOCTYPE html>
<html lang="id" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASSKAR KARAWANG - Official System</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- QR Code Library (QRCode.js) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body class="h-full bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">

    <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl text-center space-y-6">
        <div class="w-16 h-16 bg-brand-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            <i class="fa-solid fa-shield-halved"></i>
        </div>
        
        <div>
            <h1 class="text-xl font-extrabold text-white">ASSKAR KARAWANG</h1>
            <p id="info-status" class="text-xs text-slate-400 mt-1">Memuat data verifikasi...</p>
        </div>

        <!-- Kartu Detail Data dari URL -->
        <div id="detail-card" class="hidden bg-slate-900 border border-slate-700 rounded-2xl p-4 text-left space-y-2 text-xs">
            <p><strong class="text-slate-400">NIK / ID:</strong> <span id="val-nik" class="text-white font-semibold">-</span></p>
            <p><strong class="text-slate-400">Nama:</strong> <span id="val-nama" class="text-white font-semibold">-</span></p>
            <p><strong class="text-slate-400">Tim / SSB:</strong> <span id="val-ssb" class="text-white font-semibold">-</span></p>
            <p><strong class="text-slate-400">Status:</strong> <span id="val-status" class="text-brand-400 font-bold">-</span></p>
        </div>

        <!-- Container QR Code -->
        <div class="flex justify-center">
            <div id="qrcode" class="bg-white p-3 rounded-2xl shadow-inner"></div>
        </div>

        <p class="text-[10px] text-slate-500">Sistem Resmi Asosiasi Sekolah Sepakbola Karawang</p>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Membaca parameter dari URL (Contoh: ?nik=123&nama=Budi&ssb=Garuda&status=Pemain)
            const params = new URLSearchParams(window.location.search);
            const nik = params.get('nik');
            const nama = params.get('nama');
            const ssb = params.get('ssb');
            const status = params.get('status');

            const qrcodeContainer = document.getElementById("qrcode");
            
            // Format URL tujuan QR
            const currentUrl = window.location.href;

            if (nik || nama) {
                // Jika URL membawa parameter data (hasil scan ID Card)
                document.getElementById("info-status").innerText = "Data Verifikasi Resmi Terdeteksi";
                document.getElementById("detail-card").classList.remove("hidden");
                
                document.getElementById("val-nik").innerText = nik || '-';
                document.getElementById("val-nama").innerText = decodeURIComponent(nama || '-');
                document.getElementById("val-ssb").innerText = decodeURIComponent(ssb || '-');
                document.getElementById("val-status").innerText = status || 'Resmi';
            } else {
                // Jika dibuka di halaman utama tanpa parameter
                document.getElementById("info-status").innerText = "Scan QR Code pada ID Card untuk verifikasi.";
            }

            // Generate QR Code otomatis
            if (qrcodeContainer) {
                qrcodeContainer.innerHTML = "";
                new QRCode(qrcodeContainer, {
                    text: currentUrl,
                    width: 140,
                    height: 140,
                    colorDark: "#0f172a",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        });
    </script>
</body>
</html>