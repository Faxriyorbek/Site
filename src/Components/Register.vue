<template>
  <body class="h-screen w-full flex items-center justify-center">
    <section
      class="w-100 h-150 rounded-3xl shadow-2xl hover:shadow-slate-600 duration-300 flex flex-col px-13 py-10 items-center justify-center gap-10"
    >
      <h1 class="text-4xl font-bold">Ro'yhatdan o'tish</h1>

      <!-- O'quvchi / O'qituvchi -->
      <div class="flex gap-10">
        <div class="w-0 h-7 border border-black"></div>

        <button
          @click="StuFun"
          :class="isStu ? 'hidden' : 'flex'"
          class="text-lg text-slate-400 hover:text-slate-700 duration-300 font-semibold cursor-pointer"
        >
          O'quvchi
        </button>

        <button
          @click="StuFun"
          :class="isStu ? 'flex' : 'hidden'"
          class="text-lg text-slate-400 hover:text-slate-700 duration-300 font-semibold cursor-pointer"
        >
          O'qituvchi
        </button>

        <div class="w-0 h-7 border border-black"></div>
      </div>

      <!-- Filial tanlash -->
      <select
        v-model="filial"
        @change="filialChanged"
        class="border px-2 py-1 w-full rounded-full cursor-pointer"
      >
        <option disabled value="">Filialni tanlang</option>
        <option value="Furqat">Turon-odob-ilm Furqat tumani</option>
        <option value="Qo'qon">Turon-odob-ilm Qo'qon shahri</option>
        <option value="Oltiariq">Turon-odob-ilm Oltiariq tumani</option>
        <option value="Yaypan">Turon-odob-ilm Yaypan shahri</option>
      </select>

      <!-- O'qituvchi tanlash -->
      <select
        v-if="isStu"
        v-model="selectedTeacher"
        class="border px-2 py-1 w-full rounded-full cursor-pointer"
      >
        <option disabled value="">O'qituvchini tanlang</option>

        <option
          v-for="(teacher, index) in filteredTeachers"
          :key="teacher.ism + teacher.fan + index"
          :value="String(index)"
        >
          {{ teacher.ism }} ({{ teacher.fan }})
        </option>
      </select>

      <!-- O'quvchi tanlash -->
      <select
        v-else
        v-model="selectedStudent"
        class="border px-2 py-1 w-full rounded-full cursor-pointer"
      >
        <option disabled value="">O'quvchini tanlang</option>

        <option
          v-for="(student, index) in filteredStudents"
          :key="student.ism + student.sinf + index"
          :value="String(index)"
        >
          {{ student.ism }} ({{ student.sinf }})
        </option>
      </select>

      <!-- Parol -->
      <input
        v-model="password"
        type="password"
        placeholder="Parol kiriting"
        class="outline-0 w-full bg-slate-200 px-5 py-2 rounded-full focus:shadow-2xl focus:shadow-black focus:bg-slate-400 duration-300"
      />

      <!-- Kirish -->
      <button
        @click="login"
        class="bg-slate-400 w-full py-3 text-slate-200 text-xl font-semibold rounded-full hover:bg-slate-600 hover:text-white cursor-pointer duration-300"
      >
        Kirish
      </button>
    </section>
  </body>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// O'qituvchilar ro'yxati
const teachers = [
  {
    ism: "Kimdir",
    fan: "Informatika",
    parol: "68786809",
    maktab: "Qo'qon",
  },
  {
    ism: "Kimdir",
    fan: "Tarix",
    parol: "68786809",
    maktab: "Furqat",
  },
  {
    ism: "Kimdir",
    fan: "Ingliz tili",
    parol: "68786809",
    maktab: "Yaypan",
  },
  {
    ism: "Kimdir",
    fan: "Matematika",
    parol: "68786809",
    maktab: "Oltiariq",
  },
  {
    ism: "Kimdir",
    fan: "Ona tili",
    parol: "68786809",
    maktab: "Qo'qon",
  },
];

// O'quvchilar ro'yxati
const students = [
  {
    ism: "Kimdir",
    sinf: "Ijtimoiy 1",
    parol: "57567567",
    maktab: "Furqat",
  },
  {
    ism: "Kimdir",
    sinf: "Aniq 2",
    parol: "2544534",
    maktab: "Yaypan",
  },
  {
    ism: "Kimdir",
    sinf: "Tabiiy",
    parol: "754646",
    maktab: "Oltiariq",
  },
  {
    ism: "Kimdir",
    sinf: "Ijtimoiy 2",
    parol: "3543534",
    maktab: "Qo'qon",
  },
  {
    ism: "Kimdir",
    sinf: "Aniq 1",
    parol: "55555",
    maktab: "Furqat",
  },
];

// false = O'quvchi, true = O'qituvchi
const isStu = ref(false);

const filial = ref("");
const selectedTeacher = ref("");
const selectedStudent = ref("");
const password = ref("");

// Tanlangan filialdagi o'qituvchilar
const filteredTeachers = computed(() => {
  return teachers.filter((teacher) => teacher.maktab === filial.value);
});

// Tanlangan filialdagi o'quvchilar
const filteredStudents = computed(() => {
  return students.filter((student) => student.maktab === filial.value);
});

// Filial o'zgarganda tanlovlarni tozalash
function filialChanged() {
  selectedTeacher.value = "";
  selectedStudent.value = "";
  password.value = "";
}

// O'quvchi va o'qituvchi rejimini almashtirish
function StuFun() {
  isStu.value = !isStu.value;
  selectedTeacher.value = "";
  selectedStudent.value = "";
  password.value = "";
}

// Kirish
function login() {
  if (!filial.value) {
    alert("Avval filialni tanlang!");
    return;
  }

  if (isStu.value) {
    // O'qituvchi sifatida kirish
    if (selectedTeacher.value === "") {
      alert("O'qituvchini tanlang!");
      return;
    }

    const teacher = filteredTeachers.value[Number(selectedTeacher.value)];

    if (!teacher) {
      alert("O'qituvchi topilmadi!");
      return;
    }

    if (teacher.parol === password.value) {
      router.push("/teacher");
    } else {
      alert("O'qituvchi paroli noto'g'ri!");
    }
  } else {
    // O'quvchi sifatida kirish
    if (selectedStudent.value === "") {
      alert("O'quvchini tanlang!");
      return;
    }

    const student = filteredStudents.value[Number(selectedStudent.value)];

    if (!student) {
      alert("O'quvchi topilmadi!");
      return;
    }

    if (student.parol === password.value) {
      router.push("/student");
    } else {
      alert("O'quvchi paroli noto'g'ri!");
    }
  }
}
</script>
