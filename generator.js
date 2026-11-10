const form = document.getElementById('birthdayForm');
const result = document.getElementById('result');
const qrBox = document.getElementById('qrcode');
const photoInput = document.getElementById('photos');
const preview = document.getElementById('photoPreview');
const statusText = document.getElementById('status');
const createButton = document.getElementById('createButton');
let generatedUrl = '';
let selectedFiles = [];

photoInput.addEventListener('change', () => {
  selectedFiles = Array.from(photoInput.files || []);
  preview.innerHTML = '';
  if (selectedFiles.length > 8) {
    statusText.textContent = 'Please choose no more than 8 photos.';
    photoInput.value = '';
    selectedFiles = [];
    return;
  }
  selectedFiles.forEach(file => {
    const img = document.createElement('img');
    img.alt = file.name;
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
  statusText.textContent = `${selectedFiles.length} photo(s) selected.`;
});

async function uploadPhoto(file, cloudName, preset) {
  const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`;
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', preset);
  const response = await fetch(endpoint, { method: 'POST', body });
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || `Could not upload ${file.name}`);
  }
  return result.secure_url;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!window.QRCode) {
    alert('QR generator could not load. Check your internet connection and try again.');
    return;
  }
  if (!selectedFiles.length) {
    alert('Please select at least one photo for the slideshow.');
    return;
  }
  if (selectedFiles.length > 8) {
    alert('Please select no more than 8 photos.');
    return;
  }
  const cloudName = document.getElementById('cloudName').value.trim();
  const preset = document.getElementById('uploadPreset').value.trim();
  if (!cloudName || !preset) {
    alert('Enter your Cloudinary cloud name and unsigned upload preset.');
    return;
  }

  createButton.disabled = true;
  createButton.textContent = 'Uploading photos…';
  statusText.textContent = 'Uploading your selected photos. Please keep this page open.';
  try {
    const photoUrls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      statusText.textContent = `Uploading photo ${i + 1} of ${selectedFiles.length}…`;
      photoUrls.push(await uploadPhoto(selectedFiles[i], cloudName, preset));
    }

    const data = new FormData(form);
    const params = new URLSearchParams();
    const keys = ['name','intro','message','gift','giftTitle','giftButton',
      'r1title','r1text','r2title','r2text','r3title','r3text','r4title','r4text'];
    for (const key of keys) {
      const value = String(data.get(key) || '').trim();
      if (value) params.set(key, value);
    }
    params.set('photos', JSON.stringify(photoUrls));

    const base = new URL('birthday.html', window.location.href);
    base.search = params.toString();
    base.hash = 'home';
    generatedUrl = base.href;

    qrBox.innerHTML = '';
    new QRCode(qrBox, { text: generatedUrl, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
    const link = document.getElementById('pageLink');
    link.href = generatedUrl;
    link.textContent = generatedUrl;
    result.classList.add('show');
    statusText.textContent = 'All selected photos uploaded successfully!';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (error) {
    statusText.textContent = `Upload failed: ${error.message}. Check your Cloudinary cloud name, unsigned preset and internet connection.`;
  } finally {
    createButton.disabled = false;
    createButton.textContent = 'Upload photos & create birthday QR ✨';
  }
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
