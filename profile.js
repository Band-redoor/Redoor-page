const profileIntro = document.getElementById("profileIntro");
const introSeenKey = "redoorProfileIntroSeen";
const skipIntroFromNavigation = new URLSearchParams(window.location.search).has("skipIntro");

function hideProfileIntro() {
  if (!profileIntro || profileIntro.classList.contains("is-hidden")) return;

  profileIntro.classList.add("is-hidden");
}

let hasSeenIntro = false;

try {
  hasSeenIntro = sessionStorage.getItem(introSeenKey) === "true";
  sessionStorage.setItem(introSeenKey, "true");
} catch {
  // 내부 메뉴 이동은 URL 표시로도 인트로를 건너뜁니다.
}

if (profileIntro && (hasSeenIntro || skipIntroFromNavigation)) {
  profileIntro.classList.add("is-hidden");
} else if (profileIntro) {
  window.setTimeout(hideProfileIntro, 1200);
  profileIntro.addEventListener("click", hideProfileIntro, { once: true });
  window.addEventListener("touchstart", hideProfileIntro, { once: true, passive: true });
  window.addEventListener("wheel", hideProfileIntro, { once: true, passive: true });
}

if (skipIntroFromNavigation) {
  window.history.replaceState({}, "", window.location.pathname);
}

document.querySelectorAll(".member-photo-frame[data-images]").forEach((frame) => {
  const photo = frame.querySelector(".member-photo");
  const previousButton = frame.querySelector(".photo-prev");
  const nextButton = frame.querySelector(".photo-next");
  const memberName = frame.dataset.member || "멤버";
  const images = frame.dataset.images.split("|").filter(Boolean);
  let currentIndex = 0;
  let touchStartX = null;

  if (!photo || images.length < 2) {
    previousButton?.remove();
    nextButton?.remove();
    return;
  }

  function showPhoto(index) {
    currentIndex = (index + images.length) % images.length;
    photo.src = images[currentIndex];
    photo.alt = `${memberName} 사진 ${currentIndex + 1}`;
  }

  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));

  frame.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  frame.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;

      const distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;

      if (Math.abs(distance) < 35) return;
      showPhoto(currentIndex + (distance < 0 ? 1 : -1));
    },
    { passive: true }
  );
});
