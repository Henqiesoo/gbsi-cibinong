// Data renungan (masih statis).
// Nanti bila pindah ke Supabase: ganti isi getSemuaRenungan() dan
// getRenunganBySlug() dengan query — tipe Renungan dipertahankan.
//
// Sumber renungan: Khotbah Pdt Kim Ki Dong — bahasa disesuaikan untuk
// pembaca web umum, isi teologis dijaga sesuai sumber asli.

export type Renungan = {
  slug: string;
  judul: string;
  tanggal: string; // ISO date, contoh: "2026-07-05"
  ayat?: string; // referensi ayat singkat untuk meta card
  kutipanAyat?: string; // kutipan ayat pembuka (ditampilkan italic)
  cuplikan: string;
  thumbnail: string;
  isi: string[]; // paragraf-paragraf
  atribusi?: string; // atribusi sumber — jangan dihapus
};

const daftarRenungan: Renungan[] = [
  {
    slug: "apa-itu-berkat-yang-sesungguhnya",
    judul: "Apa Itu Berkat yang Sesungguhnya?",
    tanggal: "2026-07-12",
    cuplikan:
      "Banyak dari kita membayangkan berkat sebagai kesuksesan duniawi: pekerjaan lancar, usaha maju, hidup berkecukupan. Namun makna berkat yang sesungguhnya jauh lebih dalam dari itu — berkat berarti menjadi milik Allah.",
    thumbnail: "/images/renungan/renungan-01.jpg",
    isi: [
      "Kita sering mendengar ucapan “Tuhan Yesus memberkatimu” — tapi pernahkah kita berhenti sejenak dan bertanya, apa sebenarnya arti berkat itu?",
      "Banyak dari kita membayangkan berkat sebagai kesuksesan duniawi: pekerjaan lancar, usaha maju, hidup berkecukupan. Namun makna berkat yang sesungguhnya jauh lebih dalam dari itu. Berkat berarti menjadi milik Allah. Ketika kita meminta berkat bagi seseorang, kita sesungguhnya sedang mendoakan agar orang itu sepenuhnya menjadi kepunyaan Allah.",
      "Ketika seseorang benar-benar menjadi milik Allah, ia menerima sukacita-Nya, kemuliaan-Nya, dan kuasa-Nya. Dan karena ia sudah menjadi milik-Nya, apa pun yang ia minta dalam nama Tuhan, Allah akan mengerjakannya.",
      "Pertanyaannya bagi kita: sudahkah kita benar-benar menerima berkat itu? Jika sudah, apa bentuknya dalam hidup kita sehari-hari?",
      "Berkat yang sejati berwujud inspirasi dari Allah. Ketika seseorang menerima inspirasi ini, ia mampu berdoa dengan sungguh, mampu memberitakan firman dengan berani, mampu menjadi saksi Kristus di tengah pergumulan hidupnya. Orang yang menerima berkat sejati akan tahu dengan pasti — bukan sekadar merasa — bahwa dirinya adalah milik Allah.",
      "Berkat bukan tentang seberapa banyak yang kita miliki, tetapi seberapa utuh kita menjadi kepunyaan Allah. Mari kita periksa hati kita: apakah kita mengejar berkat sebagai kesuksesan tubuh, atau kita rindu sungguh menjadi milik Allah seutuhnya?",
    ],
    atribusi: "Diringkas dari Khotbah Pdt Kim Ki Dong, Seri Berkat",
  },
  {
    slug: "ibadah-yang-penuh-roh-kudus",
    judul: "Ibadah yang Sungguh-Sungguh Penuh Roh Kudus",
    tanggal: "2026-06-28",
    ayat: "Kisah Para Rasul 2:38",
    kutipanAyat:
      "“Bertobatlah kalian masing-masing, dan berilah dirimu dibaptis dalam nama Yesus... kamu akan menerima Roh Kudus.” (Kisah Para Rasul 2:38)",
    cuplikan:
      "Ibadah kita sejatinya bukan sekadar rutinitas mingguan. Ibadah yang benar adalah ibadah yang penuh dengan kehadiran Roh Kudus — bukan hanya saat berkumpul di gereja, tetapi dalam seluruh hidup kita sepanjang minggu.",
    thumbnail: "/images/renungan/renungan-02.jpg",
    isi: [
      "Ibadah kita sejatinya bukan sekadar rutinitas mingguan. Alkitab menunjukkan bahwa ibadah yang benar adalah ibadah yang penuh dengan kehadiran Roh Kudus — bukan hanya pada saat kita berkumpul di gereja, tetapi dalam seluruh hidup kita sepanjang minggu.",
      "Roh Kudus masuk ke dalam hati yang bertobat, hati yang menerima firman, dan hati yang taat. Ia bukan hiasan atau pelengkap dalam hidup rohani kita — Ia adalah Roh Allah sendiri yang ingin berdiam dengan nyaman di dalam diri kita, sama seperti Ia berdiam di sorga.",
      "Ada sebuah kebenaran yang perlu kita renungkan dalam-dalam: banyak orang Kristen tampak kudus pada hari Minggu, memuji dengan sepenuh hati, lalu mulai Senin hidup dengan pikiran dan keinginannya sendiri — meninggalkan firman, menikmati dunia tanpa mengingat Tuhan. Padahal, kita adalah Bait Allah bukan hanya sehari dalam seminggu, melainkan setiap hari.",
      "Ibadah yang sungguh-sungguh sukses bukan diukur dari satu jam kita duduk di bangku gereja, melainkan dari kemenangan iman kita sepanjang minggu. Orang yang menang dalam kehidupan sehari-harinya, itulah yang benar-benar mampu mensukseskan ibadahnya pada hari Tuhan.",
      "Mari kita undang Roh Kudus memenuhi bukan hanya ibadah kita di gereja, tetapi seluruh hari-hari kita — pekerjaan kita, rumah tangga kita, dan setiap keputusan yang kita ambil.",
    ],
    atribusi:
      "Diringkas dari Khotbah “Ibadah yang Penuh dengan Roh Kudus”, Kisah Para Rasul 10:44-48",
  },
  {
    slug: "menjaga-pemimpin-rohani",
    judul: "Menjaga dan Menghormati Pemimpin Rohani",
    tanggal: "2026-06-14",
    ayat: "Kisah Para Rasul 20:28",
    kutipanAyat:
      "“Karena itu jagalah dirimu dan jagalah seluruh kawanan, karena Roh Kudus telah menetapkan kamu menjadi penilik jemaat Allah.” (Kisah Para Rasul 20:28)",
    cuplikan:
      "Allah mendirikan dan memelihara gereja-Nya melalui pemimpin rohani yang diangkat bukan oleh manusia, melainkan oleh Roh Kudus sendiri. Bagaimana seharusnya kita memandang dan menjaga mereka?",
    thumbnail: "/images/renungan/renungan-03.jpg",
    isi: [
      "Alkitab mengajarkan sesuatu yang mendalam tentang bagaimana Allah mendirikan dan memelihara gereja-Nya: melalui pemimpin rohani yang diangkat bukan oleh manusia, melainkan oleh Roh Kudus sendiri.",
      "Ketika kita memandang seorang gembala atau pemimpin gereja, mudah bagi kita untuk hanya melihatnya sebagai manusia biasa — dengan segala kekurangan dan kesalahannya. Namun Alkitab mengajak kita memandang dengan mata rohani: di balik kemanusiaannya, ia dipercayakan Allah tugas menjaga jiwa-jiwa yang telah ditebus dengan darah Kristus.",
      "Firman Tuhan mengingatkan dengan tegas: jangan menyusahkan pemimpin yang menuntun kita, sebab jika demikian, roh jiwa kita sendiri yang tidak mendapat keuntungan. Ini bukan soal membuat pemimpin gereja kebal kritik, melainkan soal menjaga hati kita sendiri agar tidak jatuh dalam sikap meremehkan apa yang telah Allah tetapkan.",
      "Ada gambaran yang indah dalam Alkitab: ketika gembala terpukul atau diabaikan, kawanan domba akan tercerai-berai. Sebaliknya, ketika jemaat menjaga dan menghormati pemimpinnya, gereja bertumbuh kuat dan bersatu.",
      "Mari kita mendoakan para pemimpin rohani kita — bukan dengan sikap menuntut kesempurnaan, tetapi dengan hati yang mendukung mereka menjalankan tugas yang Allah percayakan.",
    ],
    atribusi:
      "Diringkas dari Khotbah “Penilik yang Diangkat Roh Kudus”, Kisah Para Rasul 20:23-35",
  },
];

export async function getSemuaRenungan(): Promise<Renungan[]> {
  return [...daftarRenungan].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export async function getRenunganTerbaru(jumlah = 3): Promise<Renungan[]> {
  const semua = await getSemuaRenungan();
  return semua.slice(0, jumlah);
}

export async function getRenunganBySlug(
  slug: string
): Promise<Renungan | undefined> {
  return daftarRenungan.find((r) => r.slug === slug);
}

export function formatTanggal(iso: string): string {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
