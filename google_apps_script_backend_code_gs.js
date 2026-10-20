/**
 * =====================================================================
 * ASSKAR KARAWANG - OFFICIAL CLOUD SYSTEM BACKEND (Google Apps Script)
 * =====================================================================
 * Backend ini berfungsi sebagai server penyimpanan cloud menggunakan 
 * Google Sheets sebagai database utama, serta mendukung pengiriman email.
 */

var SHEET_NAME = "DatabaseAsskarCloud";

/**
 * Endpoint utama (GET) untuk memuat aplikasi web (index.html)
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('ASSKAR KARAWANG - Official System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * Mengambil database JSON dari Google Spreadsheet aktif
 */
function getCloudData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return getDefaultData();
    }
    
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var defaultData = getDefaultData();
      sheet.getRange(1, 1).setValue(JSON.stringify(defaultData));
      return defaultData;
    }
    
    var jsonString = sheet.getRange(1, 1).getValue();
    if (!jsonString || jsonString.trim() === "") {
      var defaultData = getDefaultData();
      sheet.getRange(1, 1).setValue(JSON.stringify(defaultData));
      return defaultData;
    }
    
    return JSON.parse(jsonString);
  } catch(err) {
    return getDefaultData();
  }
}

/**
 * Menyimpan seluruh state database JSON ke Google Spreadsheet
 */
function saveCloudData(jsonDataString) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return { status: 'error', message: 'Spreadsheet aktif tidak ditemukan.' };
    }
    
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    sheet.getRange(1, 1).setValue(jsonDataString);
    return { status: 'success', message: 'Data berhasil disimpan ke Google Sheet Server.' };
  } catch(err) {
    return { status: 'error', message: 'Gagal menyimpan ke cloud: ' + err.toString() };
  }
}

/**
 * Mengirim kredensial akses akun via Gmail
 */
function sendCredentialEmail(recipientEmail, teamName, password) {
  var subject = "Akses Resmi Sistem ASSKAR Karawang 2026";
  var body = "Halo Manajer " + teamName + ",\n\n" +
             "Berikut adalah kredensial akses resmi untuk masuk ke Sistem Manajemen ASSKAR Karawang 2026:\n\n" +
             "Username / Nama Tim: " + teamName + "\n" +
             "Kata Sandi: " + password + "\n\n" +
             "Silakan login melalui tautan web aplikasi resmi yang telah dibagikan.\n\n" +
             "Salam Olahraga,\nAdmin Asskar Karawang";
  try {
    MailApp.sendEmail(recipientEmail, subject, body);
    return { status: 'success', message: 'Email akses berhasil dikirim ke ' + recipientEmail };
  } catch(e) {
    return { status: 'error', message: 'Gagal mengirim email: ' + e.toString() };
  }
}

/**
 * Data awal default jika spreadsheet masih kosong
 */
function getDefaultData() {
  return {
    teams: ["Garuda Karawang", "Persika Junior", "Bintang Karawang", "Putra Pajajaran"],
    passwords: { "ASSKAR KRW": "Admin123", "Garuda Karawang": "123456", "Persika Junior": "123456", "Bintang Karawang": "123456", "Putra Pajajaran": "123456" },
    profil: {},
    pemain: [],
    official: [],
    masterKompetisi: [],
    kompetisi: [],
    stages: {},
    headToHead: {},
    jadwal: [],
    summary: {}
  };
}
```