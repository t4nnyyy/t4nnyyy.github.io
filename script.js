const repositories = [
  {
    name: "PersistHawk",
    url: "https://github.com/t4nnyyy/PersistHawk",
    description: "Persistence hunting workspace for spotting suspicious autoruns, services, tasks, and startup artifacts."
  },
  {
    name: "IP-Reputo",
    url: "https://github.com/t4nnyyy/IP-Reputo",
    description: "IP reputation helper for quick investigation and enrichment during SOC triage."
  },
  {
    name: "EmailHeaderAnalyzer",
    url: "https://github.com/t4nnyyy/EmailHeaderAnalyzer",
    description: "Email header analysis utility for phishing investigations and authentication review."
  },
  {
    name: "DNS_Logger",
    url: "https://github.com/t4nnyyy/DNS_Logger",
    description: "DNS logging and monitoring project for visibility into lookup activity and suspicious patterns."
  },
  {
    name: "binary-typer",
    url: "https://github.com/t4nnyyy/binary-typer",
    description: "Binary and file typing helper for identifying file characteristics during analysis."
  },
  {
    name: "git-cloner",
    url: "https://github.com/t4nnyyy/git-cloner",
    description: "Repository cloning helper for quickly pulling project workspaces into a local environment."
  }
];

const bootLines = [
  "[    0.000000] Loading Kali Linux inspired dragon splash...",
  "[    0.041337] Booting t4nnyyy-secOS kernel...",
  "[    0.184201] Loading encrypted workspace modules",
  "[    0.331004] Detecting display manager: kali-like-desktop",
  "[    0.438917] Mounting /home/t4nnyyy",
  "[    0.552108] Loading wallpaper: assets/t4nnyyy.png",
  "[    0.687440] Starting network manager: eth0 online",
  "[    0.751702] Pulling repository inventory",
  "[    0.820491] Found PersistHawk",
  "[    0.914782] Found IP-Reputo",
  "[    1.002101] Found EmailHeaderAnalyzer",
  "[    1.084983] Found DNS_Logger",
  "[    1.164552] Found binary-typer",
  "[    1.281492] Found git-cloner",
  "[    1.394201] Starting file explorer service",
  "[    1.502012] Starting terminal service",
  "[    1.733700] Login accepted for t4nnyyy",
  "[    1.812002] Desktop ready. Welcome back."
];

const socialLinks = {
  github: "https://github.com/t4nnyyy",
  linkedin: "https://www.linkedin.com/in/t4nnyyy/",
  youtube: "https://www.youtube.com/@streamshield"
};

const bootLog = document.getElementById("bootLog");
const progressBar = document.getElementById("progressBar");
const bootScreen = document.getElementById("bootScreen");
const desktop = document.getElementById("desktop");
const skipBoot = document.getElementById("skipBoot");
const repoGrid = document.getElementById("repoGrid");
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalCommand");
const terminalOutput = document.getElementById("terminalOutput");
const clock = document.getElementById("clock");

let bootTimer;
let clockTimer;
let zIndexCounter = 30;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderRepositories() {
  repoGrid.innerHTML = repositories.map((repo, index) => `
    <article class="repo-card">
      <div class="repo-header">
        <div>
          <p class="repo-name">${escapeHtml(repo.name)}</p>
        </div>
        <span class="repo-icon">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <p class="repo-desc">${escapeHtml(repo.description)}</p>
      <a class="repo-link" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener noreferrer">open repository ↗</a>
    </article>
  `).join("");
}

function finishBoot() {
  clearTimeout(bootTimer);
  progressBar.style.width = "100%";
  setTimeout(() => {
    bootScreen.classList.add("hidden");
    desktop.classList.remove("hidden");
    openWindow("fileExplorer");
    updateClock();
    clearInterval(clockTimer);
    clockTimer = setInterval(updateClock, 1000);
  }, 220);
}

function runBoot(index = 0) {
  if (index >= bootLines.length) {
    finishBoot();
    return;
  }

  bootLog.textContent += `${bootLines[index]}\n`;
  bootLog.scrollTop = bootLog.scrollHeight;
  progressBar.style.width = `${Math.round(((index + 1) / bootLines.length) * 100)}%`;
  const delay = 80 + Math.floor(Math.random() * 120);
  bootTimer = setTimeout(() => runBoot(index + 1), delay);
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.remove("hidden");
  win.style.zIndex = String(++zIndexCounter);
  document.querySelectorAll(`[data-window="${id}"]`).forEach((button) => button.classList.add("active"));
  if (id === "terminalWindow") {
    setTimeout(() => terminalInput.focus(), 80);
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.add("hidden");
  document.querySelectorAll(`[data-window="${id}"]`).forEach((button) => button.classList.remove("active"));
}

function openLinkOutside(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function printTerminal(line, className = "") {
  const p = document.createElement("p");
  p.innerHTML = className ? `<span class="${className}">${line}</span>` : line;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  printTerminal(`<span class="green">t4nnyyy@kali</span>:<span class="blue">~</span>$ ${escapeHtml(rawCommand)}`);

  if (!command) return;

  if (command === "help") {
    printTerminal("Available commands: help, whoami, repos, social, clear, open github, open linkedin, open youtube", "cyan");
    return;
  }

  if (command === "whoami") {
    printTerminal("Tanveer Ali // @t4nnyyy // GitHub Pages Kali-style portfolio", "cyan");
    return;
  }

  if (command === "repos") {
    repositories.forEach((repo) => printTerminal(`${escapeHtml(repo.name)} → ${escapeHtml(repo.url)}`, "cyan"));
    return;
  }

  if (command === "social") {
    printTerminal(`GitHub: ${escapeHtml(socialLinks.github)}`, "cyan");
    printTerminal(`LinkedIn: ${escapeHtml(socialLinks.linkedin)}`, "cyan");
    printTerminal(`YouTube: ${escapeHtml(socialLinks.youtube)}`, "cyan");
    return;
  }

  if (command === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  const openMap = {
    "open github": socialLinks.github,
    "open linkedin": socialLinks.linkedin,
    "open youtube": socialLinks.youtube
  };

  if (openMap[command]) {
    openLinkOutside(openMap[command]);
    printTerminal(`Opening ${escapeHtml(openMap[command])} in a new tab...`, "green");
    return;
  }

  printTerminal(`Command not found: ${escapeHtml(command)}. Type help.`, "pink");
}

function attachDragBehavior() {
  document.querySelectorAll(".window").forEach((win) => {
    const handle = win.querySelector(".drag-handle");
    if (!handle) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    handle.addEventListener("pointerdown", (event) => {
      if (window.matchMedia("(max-width: 860px)").matches) return;
      if (event.target.closest("button, a, input, textarea, select")) return;

      isDragging = true;
      win.style.zIndex = String(++zIndexCounter);
      startX = event.clientX;
      startY = event.clientY;
      const rect = win.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const maxLeft = window.innerWidth - win.offsetWidth - 8;
      const maxTop = window.innerHeight - win.offsetHeight - 40;
      const nextLeft = Math.max(8, Math.min(maxLeft, initialX + dx));
      const nextTop = Math.max(48, Math.min(maxTop, initialY + dy));
      win.style.left = `${nextLeft}px`;
      win.style.top = `${nextTop}px`;
      win.style.right = "auto";
      win.style.bottom = "auto";
    });

    handle.addEventListener("pointerup", () => {
      isDragging = false;
    });

    handle.addEventListener("pointercancel", () => {
      isDragging = false;
    });
  });
}

function bindEvents() {
  skipBoot.addEventListener("click", finishBoot);

  document.querySelectorAll("a[href^='http']").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-window]").forEach((trigger) => {
    trigger.addEventListener("click", () => openWindow(trigger.dataset.window));
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => event.stopPropagation());
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeWindow(button.dataset.close);
    });
  });

  document.querySelectorAll(".window").forEach((win) => {
    win.addEventListener("pointerdown", () => {
      win.style.zIndex = String(++zIndexCounter);
    });
  });

  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleCommand(terminalInput.value);
    terminalInput.value = "";
  });
}

renderRepositories();
bindEvents();
attachDragBehavior();
runBoot();
