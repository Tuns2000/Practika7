// Проверка состояния сети
function updateOfflineStatus() {
    const offlineStatus = document.getElementById("offline-status");
    if (navigator.onLine) {
      offlineStatus.classList.add("hidden");
    } else {
      offlineStatus.classList.remove("hidden");
    }
  }
  
  // Загрузка из localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteList = document.getElementById("note-list");
    noteList.innerHTML = "";
  
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="note-text">${note}</span>
        <button onclick="deleteNote(${index})">Удалить</button>
      `;
      noteList.appendChild(li);
    });
  }
  
  // Добавлие заметки
  function addNote() {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();
    if (noteText) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteInput.value = "";
      loadNotes();
    }
  }
  
  // Удаление заметки
  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }
  
  // Показ/Скрытие всех заметок
  function toggleNotesVisibility() {
    const noteList = document.getElementById("note-list");
    const button = document.getElementById("toggle-notes-btn");
  
    if (noteList.style.display === "none" || noteList.style.display === "") {
      noteList.style.display = "block"; 
      button.textContent = "Скрыть все заметки";  // Меняем текст на кнопке
    } else {
      noteList.style.display = "none";  // Скрываем все заметки
      button.textContent = "Показать все заметки";  // Меняем текст на кнопке
    }
  }
  
  // Инициализация приложения
  document.getElementById("add-note-btn").addEventListener("click", addNote);
  document.getElementById("toggle-notes-btn").addEventListener("click", toggleNotesVisibility);
  
  // Загрузить заметки при старте
  loadNotes();
  updateOfflineStatus();
  
  // Инициализация скрытого состояния списка заметок
  document.getElementById("note-list").style.display = "none";  
  document.getElementById("toggle-notes-btn").textContent = "Показать все заметки"; 