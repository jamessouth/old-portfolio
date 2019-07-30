import { Workbox } from 'workbox-window/Workbox.mjs'; // eslint-disable-line

let deferredPrompt;
const addBtnBg = document.createElement('div');
const addBtn = document.createElement('button');
const relBtnBg = document.createElement('div');
const relBtn = document.createElement('button');

addBtn.textContent = 'install me!';
addBtn.className = 'installbtn';
addBtnBg.className = 'installdiv';
relBtn.textContent = 'new content: reload!';
relBtn.className = 'reloadbtn';
relBtnBg.className = 'reloaddiv';

function handleInstall(e) {
  e.preventDefault();
  deferredPrompt = e;
  addBtn.style.display = 'block';
  addBtnBg.style.display = 'block';
  addBtn.addEventListener('click', handleInstallClick); // eslint-disable-line
}

async function handleInstallClick() {
  addBtn.style.display = 'none';
  addBtnBg.style.display = 'none';
  try {
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome !== 'accepted') window.removeEventListener('beforeinstallprompt', handleInstall);
    deferredPrompt = null;
  } catch (e) {
    console.error(e);
    window.removeEventListener('beforeinstallprompt', handleInstall);
  }
}

if ('serviceWorker' in navigator) {
  const wb = new Workbox('./service-worker.js');
  document.body.appendChild(addBtn);
  document.body.appendChild(addBtnBg);
  relBtn.addEventListener('click', () => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });
    wb.messageSW({ type: 'SKIP_WAITING' });
  });
  wb.addEventListener('waiting', () => {
    document.body.appendChild(relBtn);
    document.body.appendChild(relBtnBg);
    relBtn.style.display = 'block';
    relBtnBg.style.display = 'block';
  });
  window.addEventListener('beforeinstallprompt', handleInstall);
  window.addEventListener('appinstalled', () => {
    const hl = document.querySelector('h1');
    hl.textContent = 'Thank you!';
    setTimeout(() => { hl.textContent = 'James South'; }, 6500);
  });
  wb.register();
}
