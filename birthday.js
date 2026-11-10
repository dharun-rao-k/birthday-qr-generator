const pages = ["home", "reasons", "wishes", "gift"];
const labels = ["Home", "Reasons", "Wishes", "Gift"];
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);

const birthdayName = params.get("name") || "Your Name";
document.title = `Happy Birthday, ${birthdayName}`;
$("title").textContent = `Happy Birthday, ${birthdayName}!`;
document.querySelector("#home p").textContent =
  params.get("intro") || "A little website made just for you.";
document.querySelector("#wishes .note").textContent =
  params.get("message") || "I hope your day is filled with happiness, laughter and wonderful memories. Happy birthday! 🎂🥳🤍";

$("giftTitle").textContent = params.get("giftTitle") || "One last thing";
$("open").textContent = params.get("giftButton") || "Open your gift";
const giftMessage = params.get("gift") ||
  "I wanted to gift you something special, and I thought, why shouldn’t I gift you a webpage? Happy birthday 🤍";

let photos = [];
try {
  const parsed = JSON.parse(params.get("photos") || "[]");
  if (Array.isArray(parsed)) photos = parsed.filter(url =>
    typeof url === "string" && /^https:\/\/res\.cloudinary\.com\//.test(url)
  ).slice(0, 8);
} catch (e) {}

let photoIndex = 0;
const photoFrame = document.querySelector(".frame");
const photo = $("ph");
const showPhoto = () => {
  if (!photos.length) {
    photoFrame.innerHTML = '<p class="note">No photos were added to this birthday slideshow.</p>';
    $("prev").hidden = true;
    $("next").hidden = true;
    return;
  }
  photo.src = photos[photoIndex];
  photo.alt = `Birthday slideshow photo ${photoIndex + 1}`;
  $("prev").hidden = photos.length < 2;
  $("next").hidden = photos.length < 2;
};
$("prev").onclick = () => { photoIndex = (photoIndex + photos.length - 1) % photos.length; showPhoto(); };
$("next").onclick = () => { photoIndex = (photoIndex + 1) % photos.length; showPhoto(); };
showPhoto();

const audio = $("au");
audio.src=new URL("./music.mp3",document.baseURI).href;
audio.load();
const musicButton = $("mus");

function startMusicFromUserAction() {
  // Call play() directly from a click/tap handler so mobile browsers allow playback.
  if (!audio || !musicButton) return;
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.then === "function") {
    playAttempt.then(() => {
      musicButton.textContent = "Pause music";
      musicButton.setAttribute("aria-pressed", "true");
    }).catch(() => {
      musicButton.textContent = "Tap to play music";
      musicButton.setAttribute("aria-pressed", "false");
    });
  }
}

musicButton.onclick = () => {
  if (audio.paused) startMusicFromUserAction();
  else {
    audio.pause();
    musicButton.textContent = "Play music";
    musicButton.setAttribute("aria-pressed", "false");
  }
};

audio.addEventListener("error", () => {
  musicButton.textContent = "Music unavailable";
  musicButton.title = "Check that assets/music.mp3 is uploaded with the project.";
});

const nav = $("nav");
pages.forEach((page, index) => {
  const button = document.createElement("button");
  button.textContent = labels[index];
  button.dataset.p = page;
  button.onclick = () => go(page);
  nav.appendChild(button);
});
function go(page) {
  pages.forEach(id => $(id).classList.toggle("on", id === page));
  nav.querySelectorAll("button").forEach(button =>
    button.classList.toggle("on", button.dataset.p === page)
  );
  $(page).scrollIntoView();
  try { history.replaceState(null, "", "#" + page); } catch (e) {}
}
$("start").onclick = () => {
  // The tap on Start the Show is a valid user gesture for starting background music.
  startMusicFromUserAction();
  go("reasons");
  burst(60);
};

const defaultReasons = [
  ["Your kindness", "You make the people around you feel special."],
  ["Your smile", "Your smile can make an ordinary day brighter."],
  ["Our memories", "Every memory with you is worth keeping."],
  ["Your uniqueness", "You are wonderful just the way you are."]
];
const reasons = defaultReasons.map((fallback, index) => [
  params.get(`r${index + 1}title`) || fallback[0],
  params.get(`r${index + 1}text`) || fallback[1]
]);
const cards = $("cards");
reasons.forEach(reason => {
  const button = document.createElement("button");
  button.className = "flip";
  button.setAttribute("aria-label", reason[0]);
  const inner = document.createElement("span");
  inner.className = "in";
  const front = document.createElement("span");
  front.className = "face front";
  front.textContent = `${reason[0]} 🤍`;
  const back = document.createElement("span");
  back.className = "face back";
  back.textContent = reason[1];
  inner.append(front, back);
  button.appendChild(inner);
  button.onclick = () => {
    button.classList.toggle("open");
    if (button.classList.contains("open")) setTimeout(() => burst(14), 400);
    $("all").hidden = document.querySelectorAll(".flip.open").length < reasons.length;
  };
  cards.appendChild(button);
});

for (let i = 0; i < 5; i++) {
  const flame = document.createElement("div");
  flame.className = "flame";
  flame.style.animationDelay = `${i * .1}s`;
  $("cake").appendChild(flame);
}
$("blow").onclick = () => {
  const flames = [...document.querySelectorAll(".flame")];
  flames.forEach((flame, index) => setTimeout(() => flame.classList.add("out"), index * 180));
  setTimeout(() => {
    burst(90);
    setTimeout(() => flames.forEach(flame => flame.classList.remove("out")), 2500);
  }, flames.length * 180);
};

$("open").onclick = () => {
  $("msg").textContent = giftMessage;
  $("msg").classList.add("reveal");
  $("open").style.display = "none";
  burst(220);
};

const cv = $("cv"), cx = cv.getContext("2d");
let particles = [], running = false;
function size() { cv.width = innerWidth; cv.height = innerHeight; }
size();
addEventListener("resize", size);
function burst(count) {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const colors = ["#ff4f8b", "#ffc24b", "#8fd3ff", "#ff8a3d", "#b58cff"];
  for (let i = 0; i < count; i++) particles.push({
    x: innerWidth / 2, y: innerHeight / 2,
    vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 2,
    r: Math.random() * 6 + 3, c: colors[i % colors.length],
    l: 120 + Math.random() * 60
  });
  if (!running) { running = true; tick(); }
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  particles = particles.filter(p => p.l-- > 0);
  particles.forEach(p => {
    p.vy += .35; p.x += p.vx; p.y += p.vy;
    cx.fillStyle = p.c; cx.fillRect(p.x, p.y, p.r, p.r * 1.6);
  });
  if (particles.length) requestAnimationFrame(tick);
  else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
}
const requestedPage = location.hash.slice(1);
go(pages.includes(requestedPage) ? requestedPage : "home");
