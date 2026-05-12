let daftarTugas = JSON.parse(localStorage.getItem("daftarTugas")) || [];

function simpanKeLocalStorage() {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function tampilkanTugas() {
    const elemenDaftar = document.getElementById("daftarTugas");
    const totalTugas = document.getElementById("totalTugas");
    const tugasSelesai = document.getElementById("tugasSelesai");

    elemenDaftar.innerHTML = "";

    daftarTugas.forEach((tugas, index) => {
        const li = document.createElement("li");

        if (tugas.selesai) {
            li.classList.add("selesai");
        }

        li.innerHTML = `
      <span>${tugas.nama}</span>
      <div class="aksi">
        <button class="btn-selesai" onclick="ubahStatus(${index})">
          ${tugas.selesai ? "Batal" : "Selesai"}
        </button>
        <button class="btn-hapus" onclick="hapusTugas(${index})">
          Hapus
        </button>
      </div>
    `;

        elemenDaftar.appendChild(li);
    });

    totalTugas.textContent = daftarTugas.length;
    tugasSelesai.textContent = daftarTugas.filter(tugas => tugas.selesai).length;
}

function tambahTugas() {
    const inputTugas = document.getElementById("inputTugas");
    const namaTugas = inputTugas.value.trim();

    if (namaTugas === "") {
        alert("Nama tugas tidak boleh kosong.");
        return;
    }

    const tugasBaru = {
        nama: namaTugas,
        selesai: false
    };

    daftarTugas.push(tugasBaru);
    simpanKeLocalStorage();
    tampilkanTugas();

    inputTugas.value = "";
}

function ubahStatus(index) {
    daftarTugas[index].selesai = !daftarTugas[index].selesai;
    simpanKeLocalStorage();
    tampilkanTugas();
}

function hapusTugas(index) {
    daftarTugas.splice(index, 1);
    simpanKeLocalStorage();
    tampilkanTugas();
}

function hapusSemuaTugas() {
    const konfirmasi = confirm("Yakin ingin menghapus semua data tugas?");

    if (konfirmasi) {
        daftarTugas = [];
        localStorage.removeItem("daftarTugas");
        tampilkanTugas();
    }
}

tampilkanTugas();