/* =========================================================
   DHruv × Kashish — Birthday Proposal Experience
   Vanilla JavaScript
   ========================================================= */

/* =========================================================
   EASY CUSTOMIZATION
   ========================================================= */

const CONFIG = {
  girlName: "Kashish Panchwani",
  boyName: "Dhruv Chhabra",
  birthday: "13 August 2026",

  kashishPhotos: [
    "assets/1.jpeg",
    "assets/2.jpeg",
    "assets/4.jpeg",
    "assets/3.png"
  ],

  dhruvPhotos: [
    "assets/d1.png",
    "assets/2d.jpg",
    "assets/3d.jpg"
  ],

  music: "assets/music.mp3",

  captions: [
    "That smile ✨",
    "One of my favorite views.",
    "How are you this cute?",
    "Just had to save this one.",
    "A little moment worth keeping."
  ]
};


/* =========================================================
   SCENES
   ========================================================= */

const sceneNames = [
  "welcome",
  "birthday",
  "memories",
  "together",
  "questions",
  "suspense",
  "proposal",
  "celebration",
  "final"
];

const scenes = [...document.querySelectorAll(".scene")];

const progress = document.querySelector("#progress span");

const music = document.querySelector("#music");
const musicToggle = document.querySelector("#musicToggle");

const toast = document.querySelector("#toast");

let currentScene = "welcome";
let musicEnabled = false;
let toastTimer;


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);


function getScene(name) {
  return scenes.find(
    scene => scene.dataset.scene === name
  );
}


/* =========================================================
   SCENE TRANSITIONS
   ========================================================= */

function goToScene(name) {

  const target = getScene(name);

  if (!target) return;

  const previousScene = currentScene;

  scenes.forEach(scene => {
    scene.classList.toggle(
      "is-active",
      scene === target
    );
  });

  currentScene = name;

  const index = sceneNames.indexOf(name);

  if (progress) {

    progress.style.width =
      `${((index + 1) / sceneNames.length) * 100}%`;

  }

  /*
    Theme classes allow CSS to change the
    entire atmosphere as the story progresses.
  */

  document.body.classList.remove(
    "theme-blue",
    "theme-birthday",
    "theme-memories",
    "theme-together",
    "theme-questions",
    "theme-suspense",
    "theme-proposal",
    "theme-celebration",
    "theme-final"
  );

  document.body.classList.add(
    `theme-${name}`
  );

  /*
    Proposal gets special atmospheric effects.
  */

  if (name === "proposal") {

    document.body.classList.add(
      "proposal-mode"
    );

    createProposalHearts();

  } else {

    document.body.classList.remove(
      "proposal-mode"
    );

  }

  /*
    Celebration gets a fresh particle burst.
  */

  if (name === "celebration") {

    celebrate();

  }

  /*
    Add additional ambient particles
    during important scenes.
  */

  if (
    name === "birthday" ||
    name === "memories" ||
    name === "proposal"
  ) {

    pulseAmbientParticles();

  }

  /*
    Scroll reset.
  */

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

}


/* =========================================================
   NEXT BUTTONS
   ========================================================= */

function bindNextButtons() {

  document
    .querySelectorAll("[data-next]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          goToScene(
            button.dataset.next
          );

        }
      );

    });

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  if (!toast) return;

  clearTimeout(toastTimer);

  toast.textContent = message;

  toast.classList.add("show");

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 1800);

}


/* =========================================================
   BACKGROUND PARTICLES
   ========================================================= */

function seedBackground() {

  const stars =
    document.querySelector("#stars");

  const particles =
    document.querySelector("#particles");

  if (!stars || !particles) return;

  const rand =
    (min, max) =>
      Math.random() * (max - min) + min;


  /* -------------------------------------------------------
     STARS
     ------------------------------------------------------- */

  for (let i = 0; i < 55; i++) {

    const star =
      document.createElement("span");

    star.className = "star";

    const size =
      rand(1.5, 4.5);

    star.style.width =
      `${size}px`;

    star.style.height =
      `${size}px`;

    star.style.left =
      `${rand(2, 98)}%`;

    star.style.top =
      `${rand(3, 97)}%`;

    star.style.animationDelay =
      `${rand(-5, 0)}s`;

    star.style.animationDuration =
      `${rand(2, 5)}s`;

    stars.appendChild(star);

  }


  /* -------------------------------------------------------
     GLOWING HEARTS
     ------------------------------------------------------- */

  for (let i = 0; i < 18; i++) {

    createFloatingHeart(
      particles,
      rand(4, 96),
      rand(8, 94),
      rand(4, 8)
    );

  }


  /* -------------------------------------------------------
     GLOWING ORBS
     ------------------------------------------------------- */

  for (let i = 0; i < 10; i++) {

    const orb =
      document.createElement("span");

    orb.className =
      "ambient-orb";

    orb.style.left =
      `${rand(-5, 100)}%`;

    orb.style.top =
      `${rand(-5, 100)}%`;

    orb.style.animationDelay =
      `${rand(-10, 0)}s`;

    orb.style.animationDuration =
      `${rand(10, 22)}s`;

    const size =
      rand(25, 100);

    orb.style.width =
      `${size}px`;

    orb.style.height =
      `${size}px`;

    particles.appendChild(orb);

  }

}


/* =========================================================
   FLOATING HEART
   ========================================================= */

function createFloatingHeart(
  container,
  left,
  top,
  duration
) {

  const heart =
    document.createElement("span");

  heart.className =
    "particle heart";

  heart.innerHTML = "♥";

  heart.style.left =
    `${left}%`;

  heart.style.top =
    `${top}%`;

  heart.style.animationDuration =
    `${duration}s`;

  heart.style.animationDelay =
    `${Math.random() * -duration}s`;

  heart.style.opacity =
    `${0.15 + Math.random() * 0.45}`;

  heart.style.fontSize =
    `${10 + Math.random() * 16}px`;

  container.appendChild(heart);

}


/* =========================================================
   PROPOSAL HEARTS
   ========================================================= */

function createProposalHearts() {

  const particles =
    document.querySelector("#particles");

  if (!particles) return;

  /*
    Avoid creating too many hearts.
  */

  const old =
    particles.querySelectorAll(
      ".proposal-heart"
    );

  old.forEach(
    element => element.remove()
  );


  for (let i = 0; i < 14; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "proposal-heart";

    heart.innerHTML =
      "♥";

    heart.style.left =
      `${Math.random() * 100}%`;

    heart.style.animationDelay =
      `${Math.random() * -8}s`;

    heart.style.animationDuration =
      `${7 + Math.random() * 7}s`;

    heart.style.fontSize =
      `${12 + Math.random() * 22}px`;

    particles.appendChild(
      heart
    );

  }

}


/* =========================================================
   AMBIENT PARTICLE PULSE
   ========================================================= */

function pulseAmbientParticles() {

  const particles =
    document.querySelector("#particles");

  if (!particles) return;

  for (let i = 0; i < 8; i++) {

    const sparkle =
      document.createElement("span");

    sparkle.className =
      "scene-sparkle";

    sparkle.style.left =
      `${20 + Math.random() * 60}%`;

    sparkle.style.top =
      `${20 + Math.random() * 60}%`;

    sparkle.style.animationDelay =
      `${Math.random() * .8}s`;

    particles.appendChild(
      sparkle
    );

    setTimeout(() => {

      sparkle.remove();

    }, 3000);

  }

}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function imageExists(
  src,
  imageElement,
  fallbackContainer
) {

  imageElement.addEventListener(
    "error",
    () => {

      fallbackContainer.classList.add(
        "fallback"
      );

      imageElement.removeAttribute(
        "src"
      );

      imageElement.alt =
        "Photo placeholder";

      const label =
        document.createElement("span");

      label.className =
        "fallback-label";

      label.textContent =
        "Add a photo in the assets folder ✦";

      fallbackContainer.appendChild(
        label
      );

    },
    {
      once: true
    }
  );

}


/* =========================================================
   PHOTO CAROUSEL
   ========================================================= */

let photoIndex = 0;
let touchStartX = 0;


function buildMemoryCarousel() {

  const stage =
    $("#memoryStage");

  const dots =
    $("#photoDots");

  if (!stage || !dots) return;

  stage.innerHTML = "";

  dots.innerHTML = "";


  const photos =
    CONFIG.kashishPhotos.length
      ? CONFIG.kashishPhotos
      : [null];


  photos.forEach(
    (src, index) => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "memory-card";


      const img =
        document.createElement(
          "img"
        );

      img.loading =
        index < 2
          ? "eager"
          : "lazy";

      img.alt =
        `${CONFIG.girlName} — memory ${index + 1}`;


      if (src) {

        img.src = src;

      }


      imageExists(
        src,
        img,
        card
      );


      const caption =
        document.createElement(
          "span"
        );

      caption.className =
        "memory-caption";

      caption.textContent =
        CONFIG.captions[index]
        ||
        "A little memory ✨";


      card.append(
        img,
        caption
      );

      stage.appendChild(
        card
      );


      const dot =
        document.createElement(
          "span"
        );

      dot.className =
        "dot";

      dots.appendChild(
        dot
      );

    }
  );


  renderMemoryCards();


  /*
    Mobile swipe
  */

  stage.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0]
          .clientX;

    },
    {
      passive: true
    }
  );


  stage.addEventListener(
    "touchend",
    event => {

      const delta =
        event.changedTouches[0]
          .clientX -
        touchStartX;


      if (
        Math.abs(delta) > 45
      ) {

        if (delta < 0) {

          nextPhoto();

        } else {

          previousPhoto();

        }

      }

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   RENDER CAROUSEL
   ========================================================= */

function renderMemoryCards() {

  const cards =
    [
      ...document.querySelectorAll(
        ".memory-card"
      )
    ];


  cards.forEach(
    (card, index) => {

      const offset =
        index - photoIndex;

      const normalized =
        Math.max(
          -2,
          Math.min(
            2,
            offset
          )
        );

      const abs =
        Math.abs(
          normalized
        );


      card.style.zIndex =
        String(
          10 - abs
        );


      card.style.opacity =
        abs > 2
          ? "0"
          : String(
              1 - abs * .16
            );


      card.style.pointerEvents =
        normalized === 0
          ? "auto"
          : "none";


      card.style.transform =
        `
        translateX(${normalized * 52}%)
        translateY(${abs * 7}px)
        rotate(${normalized * 4}deg)
        scale(${1 - abs * .07})
        `;

    }
  );


  document
    .querySelectorAll(".dot")
    .forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === photoIndex
        );

      }
    );

}


/* =========================================================
   NEXT PHOTO
   ========================================================= */

function nextPhoto() {

  const count =
    CONFIG.kashishPhotos.length
    || 1;

  photoIndex =
    (photoIndex + 1)
    % count;

  renderMemoryCards();

}


/* =========================================================
   PREVIOUS PHOTO
   ========================================================= */

function previousPhoto() {

  const count =
    CONFIG.kashishPhotos.length
    || 1;

  photoIndex =
    (
      photoIndex - 1 + count
    ) % count;

  renderMemoryCards();

}


/* =========================================================
   PERSON PHOTO
   ========================================================= */

function setPersonPhoto(
  elementId,
  src,
  alt
) {

  const element =
    document.getElementById(
      elementId
    );

  if (!element || !src)
    return;


  const img =
    new Image();


  img.onload = () => {

    element.style.backgroundImage =
      `url("${CSS.escape(src)}")`;

    element.setAttribute(
      "role",
      "img"
    );

    element.setAttribute(
      "aria-label",
      alt
    );

  };


  img.onerror = () => {

    element.style.backgroundImage =
      `
      linear-gradient(
        135deg,
        #bcecff,
        #ffd7ec
      )
      `;

  };


  img.src = src;

}


/* =========================================================
   FINAL PHOTO
   ========================================================= */

function setFinalPhoto() {

  const final =
    $("#finalPhoto");

  if (!final)
    return;


  const src =
    CONFIG.kashishPhotos[0]
    ||
    CONFIG.dhruvPhotos[0];


  if (!src)
    return;


  const img =
    new Image();


  img.onload = () => {

    final.style.backgroundImage =
      `url("${CSS.escape(src)}")`;

  };


  img.onerror = () => {

    final.style.backgroundImage =
      `
      linear-gradient(
        135deg,
        #c9efff,
        #f9d7e9
      )
      `;

  };


  img.src = src;

}


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [

  [
    "Do you think birthdays should come with surprises?",
    [
      "Interesting answer... 👀",
      "Okay okay... one more."
    ]
  ],

  [
    "Do you think someone has been planning something special for you?",
    [
      "I knew you'd say that 😌",
      "Hmm. Very convincing."
    ]
  ],

  [
    "Do you think someone might have something important to tell you?",
    [
      "You might be onto something...",
      "Okay, now I'm curious too. 👀"
    ]
  ]

];


let questionIndex = 0;


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

  const count =
    $("#questionCount");

  const text =
    $("#questionText");

  const reaction =
    $("#answerReaction");


  if (!count || !text)
    return;


  count.textContent =
    `${String(
      questionIndex + 1
    ).padStart(2, "0")} / 03`;


  text.textContent =
    questions[
      questionIndex
    ][0];


  if (reaction) {

    reaction.textContent =
      "";

  }

}


/* =========================================================
   ANSWER QUESTION
   ========================================================= */

function answerQuestion(
  answer
) {

  const reaction =
    $("#answerReaction");


  const responses =
    questions[
      questionIndex
    ][1];


  if (reaction) {

    reaction.textContent =
      answer === "yes"
        ? responses[0]
        : responses[1];

  }


  /*
    Animate card before switching.
  */

  const card =
    $("#questionCard");


  if (card) {

    card.classList.add(
      "answering"
    );

  }


  setTimeout(
    () => {

      if (
        questionIndex <
        questions.length - 1
      ) {

        questionIndex++;

        renderQuestion();

        if (card) {

          card.classList.remove(
            "answering"
          );

        }

      } else {

        setTimeout(
          () => {

            goToScene(
              "suspense"
            );

          },
          400
        );

      }

    },
    850
  );

}


/* =========================================================
   PLAYFUL NO BUTTON
   ========================================================= */

let noAttempts = 0;


const noMessages = [

  "Nice try 👀",

  "Are you really sure? 🙈",

  "This button is getting nervous 😂",

  "Okay... think carefully.",

  "You almost caught it 😭",

  "The NO button says: nope 💨",

  "Still trying? 😭💜"

];


/* =========================================================
   MOVE NO BUTTON
   ========================================================= */

function moveNoButton() {
  const button = $("#noButton");

  if (!button) return;

  noAttempts++;

  /*
    Get the button's actual size.
    This is important on mobile because the button
    may have a different width/height.
  */
  const rect = button.getBoundingClientRect();

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /*
    Keep a safe margin from the edges.
  */
  const padding = 16;

  /*
    Calculate the maximum movement allowed from
    the button's CURRENT position.

    This ensures the transformed button never
    leaves the viewport.
  */
  const minX = padding - rect.left;
  const maxX = vw - padding - rect.right;

  const minY = padding - rect.top;
  const maxY = vh - padding - rect.bottom;

  /*
    Pick a random position within the safe area.
  */
  let x =
    minX + Math.random() * (maxX - minX);

  let y =
    minY + Math.random() * (maxY - minY);

  /*
    Prevent the button from barely moving.
  */
  const currentX = 0;
  const currentY = 0;

  if (Math.abs(x - currentX) < 60) {
    x += x < 0 ? -70 : 70;
  }

  if (Math.abs(y - currentY) < 50) {
    y += y < 0 ? -60 : 60;
  }

  /*
    Re-clamp after forcing the minimum movement.
  */
  x = Math.max(minX, Math.min(maxX, x));
  y = Math.max(minY, Math.min(maxY, y));

  /*
    Smaller rotation on mobile so the corners
    don't visually stick outside the viewport.
  */
  const isMobile = window.innerWidth <= 600;

  const rotation =
    (Math.random() - 0.5) *
    (isMobile ? 14 : 25);

  button.style.transform = `
    translate(${x}px, ${y}px)
    rotate(${rotation}deg)
  `;

  const tease = $("#noTease");

  if (tease) {
    tease.textContent =
      noMessages[
        Math.min(
          noAttempts - 1,
          noMessages.length - 1
        )
      ];
  }

  /*
    Heart burst around button.
  */
  createButtonHeartBurst(button);
}

/* =========================================================
   HEART BURST AROUND NO BUTTON
   ========================================================= */

function createButtonHeartBurst(
  button
) {

  const rect =
    button.getBoundingClientRect();


  const container =
    document.querySelector(
      "#particles"
    );


  if (!container)
    return;


  for (let i = 0; i < 5; i++) {

    const heart =
      document.createElement(
        "span"
      );

    heart.className =
      "button-heart";

    heart.innerHTML =
      "♥";


    heart.style.left =
      `${rect.left + rect.width / 2}px`;


    heart.style.top =
      `${rect.top + rect.height / 2}px`;


    heart.style.setProperty(
      "--x",
      `${(Math.random() - .5) * 100}px`
    );


    heart.style.setProperty(
      "--y",
      `${(Math.random() - .5) * 80}px`
    );


    container.appendChild(
      heart
    );


    setTimeout(
      () => heart.remove(),
      1000
    );

  }

}


/* =========================================================
   RESET NO BUTTON
   ========================================================= */

function resetNoButton() {

  const button =
    $("#noButton");


  if (button) {

    button.style.transform =
      "translate(0,0) rotate(0deg)";

  }


  noAttempts = 0;


  const tease =
    $("#noTease");


  if (tease) {

    tease.textContent =
      "";

  }

}


/* =========================================================
   CELEBRATION
   ========================================================= */

function celebrate() {

  const container =
    $("#celebrationParticles");


  if (!container)
    return;


  container.innerHTML = "";


  const symbols = [
    "♥",
    "✦",
    "✧",
    "♡",
    "✨"
  ];


  for (let i = 0; i < 90; i++) {

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "confetti";


    piece.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    piece.style.left =
      `${Math.random() * 100}%`;


    piece.style.top =
      `${Math.random() * 15}%`;


    piece.style.setProperty(
      "--dx",
      `${(Math.random() - .5) * 90}vw`
    );


    piece.style.setProperty(
      "--rotation",
      `${Math.random() * 720 - 360}deg`
    );


    piece.style.animationDelay =
      `${Math.random() * .8}s`;


    piece.style.fontSize =
      `${10 + Math.random() * 18}px`;


    container.appendChild(
      piece
    );

  }


  /*
    Additional celebration hearts.
  */

  const particles =
    document.querySelector(
      "#particles"
    );


  if (particles) {

    for (let i = 0; i < 12; i++) {

      createFloatingHeart(
        particles,
        Math.random() * 100,
        100,
        8 + Math.random() * 5
      );

    }

  }

}


/* =========================================================
   MUSIC
   ========================================================= */

async function toggleMusic() {

  if (!CONFIG.music) {

    showToast(
      "Add assets/music.mp3 to enable music."
    );

    return;

  }


  if (!music.src) {

    music.src =
      CONFIG.music;

  }


  if (musicEnabled) {

    music.pause();

    musicEnabled =
      false;


    musicToggle.setAttribute(
      "aria-pressed",
      "false"
    );


    const icon =
      $(".music-icon");

    if (icon)
      icon.textContent =
        "♪";


  } else {

    try {

      await music.play();

      musicEnabled =
        true;


      musicToggle.setAttribute(
        "aria-pressed",
        "true"
      );


      const icon =
        $(".music-icon");

      if (icon)
        icon.textContent =
          "Ⅱ";


    } catch {

      showToast(
        "Tap Music again after adding a valid audio file."
      );

    }

  }

}


/* =========================================================
   REPLAY
   ========================================================= */

function resetExperience() {

  questionIndex =
    0;


  photoIndex =
    0;


  resetNoButton();


  renderQuestion();


  renderMemoryCards();


  document.body.classList.remove(
    "proposal-mode"
  );


  goToScene(
    "welcome"
  );

}


/* =========================================================
   BUTTON EVENT LISTENERS
   ========================================================= */

bindNextButtons();


/* =========================================================
   INITIALIZE BACKGROUND
   ========================================================= */

seedBackground();


/* =========================================================
   INITIALIZE CAROUSEL
   ========================================================= */

buildMemoryCarousel();


/* =========================================================
   INITIALIZE QUESTIONS
   ========================================================= */

renderQuestion();


/* =========================================================
   INITIALIZE PEOPLE PHOTOS
   ========================================================= */

setPersonPhoto(
  "dhruvPhoto",
  CONFIG.dhruvPhotos[0],
  `${CONFIG.boyName} photo`
);


setPersonPhoto(
  "kashishPhoto",
  CONFIG.kashishPhotos[0],
  `${CONFIG.girlName} photo`
);


/* =========================================================
   INITIALIZE FINAL PHOTO
   ========================================================= */

setFinalPhoto();


/* =========================================================
   CAROUSEL CONTROLS
   ========================================================= */

const prevPhotoButton =
  $("#prevPhoto");

if (prevPhotoButton) {

  prevPhotoButton.addEventListener(
    "click",
    previousPhoto
  );

}


const nextPhotoButton =
  $("#nextPhoto");

if (nextPhotoButton) {

  nextPhotoButton.addEventListener(
    "click",
    nextPhoto
  );

}


/* =========================================================
   MUSIC BUTTON
   ========================================================= */

if (musicToggle) {

  musicToggle.addEventListener(
    "click",
    toggleMusic
  );

}


/* =========================================================
   REPLAY
   ========================================================= */

const replayButton =
  $("#replayButton");

if (replayButton) {

  replayButton.addEventListener(
    "click",
    resetExperience
  );

}


/* =========================================================
   GENUINE DECLINE
   ========================================================= */

const declineButton =
  $("#declineButton");


if (declineButton) {

  declineButton.addEventListener(
    "click",
    () => {

      resetNoButton();

      goToScene(
        "final"
      );


      showToast(
        "Thank you for being honest. 💜"
      );

    }
  );

}


/* =========================================================
   YES BUTTON
   ========================================================= */

const yesButton =
  $("#yesButton");


if (yesButton) {

  yesButton.addEventListener(
    "click",
    () => {

      celebrate();

      goToScene(
        "celebration"
      );

    }
  );

}


/* =========================================================
   PLAYFUL NO BUTTON
   ========================================================= */

const noButton =
  $("#noButton");


if (noButton) {

  /*
    Desktop:
    Move when the mouse approaches. (Ignored by touch devices).
  */

  noButton.addEventListener(
    "pointerenter",
    event => {

      if (
        event.pointerType === "mouse"
      ) {

        moveNoButton();

      }

    }
  );


  /*
    Mobile & Desktop Click:
    Move instead of selecting when tapped/clicked.
  */

  noButton.addEventListener(
    "click",
    event => {

      event.preventDefault();

      moveNoButton();

    }
  );

}


/* =========================================================
   QUESTION BUTTONS
   ========================================================= */

document
  .querySelectorAll(
    ".choice-button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          answerQuestion(
            button.dataset.answer
          );

        }
      );

    }
  );


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "ArrowRight" &&
      currentScene === "memories"
    ) {

      nextPhoto();

    }


    if (
      event.key === "ArrowLeft" &&
      currentScene === "memories"
    ) {

      previousPhoto();

    }


    /*
      Escape can return from proposal.
    */

    if (
      event.key === "Escape" &&
      currentScene === "proposal"
    ) {

      resetNoButton();

    }

  }
);


/* =========================================================
   KEEP EXPERIENCE AT TOP
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    window.scrollTo(
      0,
      0
    );

  }
);


/* =========================================================
   VISIBILITY CHANGE
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    /*
      Don't unexpectedly keep playing
      music when the tab becomes hidden.
    */

    if (
      document.hidden &&
      musicEnabled
    ) {

      music.pause();

    }

  }
);


/* =========================================================
   INITIAL THEME
   ========================================================= */

document.body.classList.add(
  "theme-welcome"
);

