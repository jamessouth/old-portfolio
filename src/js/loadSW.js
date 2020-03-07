import { Workbox } from 'workbox-window/Workbox.mjs'; // eslint-disable-line

let deferredPrompt;
const main = document.querySelector('main');
const installBtnBG = document.createElement('div');
const installBtn = document.createElement('button');
const reloadBtnBG = document.createElement('div');
const reloadBtn = document.createElement('button');

installBtn.textContent = 'install me!';
installBtn.className = 'installbtn';
installBtnBG.className = 'installdiv';
reloadBtn.textContent = 'new content: reload!';
reloadBtn.className = 'reloadbtn';
reloadBtnBG.className = 'reloaddiv';

function handleInstall(e) {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
  installBtnBG.style.display = 'block';
  installBtn.addEventListener('click', handleInstallClick); // eslint-disable-line
}

async function handleInstallClick() {
  installBtn.style.display = 'none';
  installBtnBG.style.display = 'none';
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
  document.body.insertBefore(installBtn, main);
  document.body.insertBefore(installBtnBG, main);
  reloadBtn.addEventListener('click', () => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });
    wb.messageSW({ type: 'SKIP_WAITING' });
  });
  wb.addEventListener('waiting', () => {
    document.body.insertBefore(reloadBtn, main);
    document.body.insertBefore(reloadBtnBG, main);
    reloadBtn.style.display = 'block';
    reloadBtnBG.style.display = 'block';
  });
  window.addEventListener('beforeinstallprompt', handleInstall);
  window.addEventListener('appinstalled', () => {
    const hl = document.querySelector('h1');
    hl.textContent = 'Thank you!';
    setTimeout(() => { hl.textContent = 'James South'; }, 6500);
  });
  wb.register();
}
