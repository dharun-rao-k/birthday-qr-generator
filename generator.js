const form = document.getElementById('birthdayForm');
const result = document.getElementById('result');
const qrBox = document.getElementById('qrcode');
let generatedUrl = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!window.QRCode) {
    alert('QR generator could not load. Check your internet connection and try again.');
    return;
  }
  const data = new FormData(form);
  const params = new URLSearchParams();
  for (const key of ['name', 'intro', 'message', 'gift']) {
    const value = String(data.get(key) || '').trim();
    if (value) params.set(key, value);
  }
  // Build a public URL to birthday.html in this same hosted folder.
  const base = new URL('birthday.html', window.location.href);
  base.search = params.toString();
  base.hash = 'home';
  generatedUrl = base.href;

  qrBox.innerHTML = '';
  new QRCode(qrBox, { text: generatedUrl, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.H });
  const link = document.getElementById('pageLink');
  link.href = generatedUrl;
  link.textContent = generatedUrl;
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('copyLink').addEventListener('click', async () => {
  if (!generatedUrl) return;
  try {
    await navigator.clipboard.writeText(generatedUrl);
    document.getElementById('copyLink').textContent = 'Copied!';
  } catch {
    window.prompt('Copy this birthday page link:', generatedUrl);
  }
});

document.getElementById('downloadQr').addEventListener('click', () => {
  const canvas = qrBox.querySelector('canvas');
  const image = qrBox.querySelector('img');
  const source = canvas ? canvas.toDataURL('image/png') : image?.src;
  if (!source) return;
  const a = document.createElement('a');
  a.href = source;
  a.download = 'birthday-qr.png';
  a.click();
});
