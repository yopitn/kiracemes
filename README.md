# Kiracemes

Kiracemes merupakan sebuah Content Management System (CMS) yang dibuat menggunakan NodeJS, Express JS, MySql, EJS, Winston dan lain sebagainya. Project ini adalah project pribadi yang saya buat dengan tujuan untuk belajar.

Mungkin kodenya berantakan karena saya masih dalam tahap belajar.

## Note

- Jujur, kodingan untuk halaman profile dan setting sudah mulai agai aneh.
- Pada API, kedua endpoint, Admin dan Content, tidak memiliki perbedaan, keduanya me-return data yang sama. Seharusnya, saya membedakan data yang bisa kita dapat dari database, namun untuk sekarang, saya hanya memfokuskan agar jadi dulu.
- Pada API, yang saya inginkan, untuk mengambil data dari endpoint /api/content seharusnya menggunakan api_key yang bisa di generate di halaman Admin oleh user yang sudah terdaftar di Blog-nya. Namun, saya tetap memfokuskan agar jadi dulu. Mungkin di-update nanti.
- Masih banyak fitur yang belum saya buat, tentunya, karena wawasan saya masih sedikit.

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
