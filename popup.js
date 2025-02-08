// بارگذاری داده‌های مخاطبین از localStorage
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// تابع برای نمایش مخاطبین
function renderContacts(filteredContacts = []) {
  const ul = document.getElementById('contacts');
  ul.innerHTML = filteredContacts.map((contact, index) => `
    <li>
      <span>
        <strong>${contact.name}</strong> (${contact.group}): ${contact.phone}
      </span>
      <button class="delete-btn" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `).join('');
}

// جستجو در مخاطبین
function searchContacts() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.phone.includes(searchTerm) ||
    contact.group.toLowerCase().includes(searchTerm)
  );
  renderContacts(filteredContacts);
}

// رویداد کلیک روی دکمه جستجو
document.getElementById('search-button').addEventListener('click', searchContacts);

// رویداد تغییر در باکس جستجو (جستجوی لحظه‌ای)
document.getElementById('search').addEventListener('input', searchContacts);

// افزودن مخاطب جدید
document.getElementById('addContact').addEventListener('click', () => {
  const name = document.getElementById('newName').value;
  const phone = document.getElementById('newPhone').value;
  const group = document.getElementById('newGroup').value;

  if (name && phone && group) {
    const newContact = { name, phone, group };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    document.getElementById('newName').value = '';
    document.getElementById('newPhone').value = '';
    alert('مخاطب با موفقیت اضافه شد!');
  } else {
    alert('لطفاً تمام فیلدها را پر کنید.');
  }
});

// حذف مخاطب
document.getElementById('contacts').addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const index = e.target.closest('.delete-btn').dataset.index;
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    searchContacts(); // به‌روزرسانی لیست پس از حذف
  }
});

// اکسپورت مخاطبین
document.getElementById('export-contacts').addEventListener('click', () => {
  const dataStr = JSON.stringify(contacts, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.json';
  a.click();
  URL.revokeObjectURL(url);
});

// ایمپورت مخاطبین
document.getElementById('import-contacts').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedContacts = JSON.parse(event.target.result);
        contacts = importedContacts;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        alert('مخاطبین با موفقیت وارد شدند!');
      } catch (error) {
        alert('خطا در خواندن فایل. لطفاً یک فایل JSON معتبر انتخاب کنید.');
      }
    };
    reader.readAsText(file);
  }
});

// کنترل پخش موزیک
const music = document.getElementById('background-music');
const playButton = document.getElementById('play-music');
const pauseButton = document.getElementById('pause-music');

// پخش موزیک پس از اولین تعامل کاربر
document.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  }
}, { once: true });

playButton.addEventListener('click', () => {
  music.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
});

pauseButton.addEventListener('click', () => {
  music.pause();
  pauseButton.style.display = 'none';
  playButton.style.display = 'inline-block';
});

// مخفی کردن دکمه توقف در ابتدا
pauseButton.style.display = 'none';

// عدم نمایش مخاطبین در ابتدا
renderContacts([]);