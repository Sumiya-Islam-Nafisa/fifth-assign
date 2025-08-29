
// Navbar elements
const heartCount = document.querySelector('.right_div div:first-child span'); 
const coinCount = document.querySelector('.right_div div:nth-child(2) span');
const copyCounter = document.querySelector('.right_div div:nth-child(3) button'); 
const callHistoryContainer = document.querySelector('.call-history'); 

// Initialize counts 
let hearts = 0;
let coins = 100;
let copyCount = 0;

// Update coins display
function updateCoins() {
  coinCount.textContent = coins;
}

// Update copy count display
function updateCopyCount() {
  copyCounter.textContent = `${copyCount} copy`;
}

//  Heart click
const heartsIcons = document.querySelectorAll('.fa-regular.fa-heart');
heartsIcons.forEach(icon => {
  icon.style.cursor = 'pointer';
  icon.addEventListener('click', () => {
    hearts += 1;
    heartCount.textContent = hearts;
  });
});

// Call button click 
const callButtons = document.querySelectorAll('button .fa-phone');
callButtons.forEach(phoneIcon => {
  const button = phoneIcon.closest('button');
  button.style.cursor = 'pointer';
  button.addEventListener('click', () => {
    const card = button.closest('.border-2');
    const serviceName = card.querySelector('h2').textContent;
    const serviceNumber = card.querySelector('p.text-3xl').textContent;

    if (coins < 20) {
      alert('Not enough coins to make a call!');
      return;
    }

    coins -= 20;
    updateCoins();

    alert(`Calling ${serviceName} at ${serviceNumber}`);

    const historyItem = document.createElement('div');
    historyItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg m-2';
    historyItem.innerHTML = `
      <div>
        <p class="font-medium text-sm">${serviceName}</p>
        <p class="text-xs text-gray-500">${serviceNumber}</p>
      </div>
      <div class="text-xs text-gray-400">${new Date().toLocaleTimeString()}</div>
    `;
    callHistoryContainer.appendChild(historyItem);
  });
});

// Copy Buttons 
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(button => {
  button.style.cursor = 'pointer';
  button.addEventListener('click', () => {
    const card = button.closest('.border-2');
    if (!card) return;
    const serviceNumberEl = card.querySelector('p.text-3xl');
    if (!serviceNumberEl) return;

    const serviceNumber = serviceNumberEl.textContent;

    navigator.clipboard.writeText(serviceNumber)
      .then(() => {
        copyCount += 1;
        updateCopyCount();
        alert(`Copied: ${serviceNumber}`);
      })
      .catch(() => alert('Copy failed!'));
  });
});

// Clear History 
const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', () => {
  callHistoryContainer.innerHTML = '';
});
