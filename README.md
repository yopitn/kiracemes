# Kiracemes

Kiracemes merupakan sebuah Content Management System (CMS) yang dibuat menggunakan NodeJS, Express JS, MySql, EJS, Winston dan lain sebagainya. Project ini adalah project pribadi yang saya buat dengan tujuan untuk belajar.

Mungkin kodenya berantakan karena saya masih dalam tahap belajar.

## Note

- Jujur, kodingan untuk halaman profile dan setting sudah mulai agai aneh.
- Pada API, kedua endpoint, Admin dan Content, tidak memiliki perbedaan, keduanya me-return data yang sama. Seharusnya, saya membedakan data yang bisa kita dapat dari database, namun untuk sekarang, saya hanya memfokuskan agar jadi dulu.
- Pada API, yang saya inginkan, untuk mengambil data dari endpoint /api/content seharusnya menggunakan api_key yang bisa di generate di halaman Admin oleh user yang sudah terdaftar di Blog-nya. Namun, saya tetap memfokuskan agar jadi dulu. Mungkin di-update nanti.
- Masih banyak fitur yang belum saya buat, tentunya, karena wawasan saya masih sedikit.
- Perbaikan lain dan fitur-fitur lain mungkin akan saya tambahkan di lain hari.

## Goal

**Blog**

- [x] Halaman home.
- [x] Halaman pagination.
- [x] Halaman postingan.
- [x] Halaman page (static).
- [x] Halaman author.
- [x] Halaman search.
- [x] Halaman kategori.
- [x] Halaman error 404.
- [x] Responsive.

**Admin**

- [x] Halaman postingan (create, findAll, findById, update, delete).
- [x] Halaman page (static) (create, findAll, findById, update, delete).
- [x] Halaman setting.
- [x] Halaman account.
- [x] Halaman signin.
- [x] Halaman setup.
- [x] Logic admin signout.
- [x] Halaman error 404.
- [x] Responsive.

**API**

- [x] Endpoint `/api/admin/session`
- [x] Endpoint `/api/admin/posts`
- [x] Endpoint `/api/admin/pages`
- [x] Endpoint `/api/admin/images`

- [x] Endpoint `/api/content/posts`
- [x] Endpoint `/api/content/pages`

## Get started

Bagi kamu yang ingin mencoba project ini, silahkan ikuti langkah-langkah berikut ini.

Silahkan `clone` repository ini dengan cara:

```
git clone https://github.com/yopitn/kiracemes.git
```

Buka folder kiracemes di terminal dengan cara:

```
cd kiracemes
```

Install dependency

```
npm install
```

Disini saya menggunakan `sqlite` sebagai database saat **development**. Untuk menggunakan MySQL, kamu bisa masuk ke folder `src/database/index.js` lalu comment bagian `sqlite`. Untuk config-nya, kamu bisa mengubah di folder `src/config/database.js`.

Buat file `.env` dengan format

```
KEY_TOKEN_SECRET=YOUR_KET_TOKEN_SECRET_CODE
SESSION_SECRET=YOUR_SESSION_SECRET_CODE

NODE_ENV=development

PORT=5215

DB_NAME=kiracemes
DB_USER=root
DB_PASS=
DB_HOST=localhost

LOG_LEVEL=info
```

Setelah itu jalankan perintah

```
npm start
```

Halaman admin

```
localhost:5215/admin
```

Halaman blog/utama

```
localhost:5215
```

API

```
localhost:5215/api/admin/:endpoint
localhost:5215/api/content/:endpoint
```
