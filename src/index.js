const form = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
let guests = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (guests.length >= 10) {
    alert('Guest list is full (max 10 guests).');
    return;
  }
  const name = guestInput.value.trim();
  if (name) {
    const guest = {
      id: Date.now(),
      name,
      attending: true
    };
    guests.push(guest);
    renderGuests();
    guestInput.value = '';
  }
});

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = 'guest-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'guest-name';
    nameSpan.textContent = guest.name;

    const rsvpBtn = document.createElement('button');
    rsvpBtn.className = 'rsvp';
    rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
    rsvpBtn.classList.add(guest.attending ? 'attending' : 'not-attending');
    rsvpBtn.addEventListener('click', () => {
      guest.attending = !guest.attending;
      renderGuests();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    });

    li.appendChild(nameSpan);
    li.appendChild(rsvpBtn);
    li.appendChild(removeBtn);
    guestList.appendChild(li);
  });
}