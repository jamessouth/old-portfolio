import { Workbox } from 'workbox-window/Workbox.mjs';

let deferredPrompt;
const btnBg = document.createElement('div');
const btnAdd = document.createElement('button');
const relBtnBg = document.createElement('div');
const relBtn = document.createElement('button');

btnAdd.textContent = 'install me!';
btnAdd.className = 'installbtn';
btnBg.className = 'installdiv';
relBtn.textContent = 'new content - reload!';
relBtn.className = 'reloadbtn';
relBtnBg.className = 'reloaddiv';

function handleInstall(e) {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    btnAdd.style.display = 'block';
    btnBg.style.display = 'block';
    btnAdd.addEventListener('click', handleInstallClick);
  }, 9732);
}
async function handleInstallClick(e) {
  btnAdd.style.display = 'none';
  btnBg.style.display = 'none';
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
  document.body.appendChild(btnAdd);
  document.body.appendChild(btnBg);
  relBtn.addEventListener('click', e => {
    wb.addEventListener('controlling', e => {
      window.location.reload();
    });
    wb.messageSW({type: 'SKIP_WAITING'});
  });
  wb.addEventListener('waiting', e => {
    document.body.appendChild(relBtn);
    document.body.appendChild(relBtnBg);
    setTimeout(() => {
      relBtn.style.display = 'block';
      relBtnBg.style.display = 'block';
    }, 7132);
  });
  window.addEventListener('beforeinstallprompt', handleInstall);
  window.addEventListener('appinstalled', e => {
    const hl = document.querySelector('h1:first-of-type');
    hl.textContent = 'Thank you!';
    setTimeout(() => hl.textContent = 'James South Portfolio', 6500);
  });
  wb.register();
}
