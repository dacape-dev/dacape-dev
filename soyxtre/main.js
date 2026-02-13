function applySystemTheme() {
  if (!window.matchMedia) return;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  updateTheme(media.matches);
  media.addEventListener("change", (event) => updateTheme(event.matches));
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) {
    element.textContent = value;
  }
}

function renderProcessSteps(steps) {
  const container = document.getElementById("process-steps");
  if (!container || !Array.isArray(steps)) return;

  container.innerHTML = "";
  steps.forEach((step) => {
    const wrapper = document.createElement("div");
    wrapper.className = "overflow-hidden rounded-sm aspect-square relative";

    const image = document.createElement("img");
    image.className = "object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700";
    image.src = step.src || "";
    image.alt = step.alt || "Process image";

    wrapper.appendChild(image);
    container.appendChild(wrapper);
  });
}

function renderCertificate(data) {
  setText("brand-name", data.brand);
  setText("certificate-title", data.certificateTitle);

  setText("piece-name", data.piece?.name ? `"${data.piece.name}"` : "");
  setText("piece-code", data.piece?.code);
  setText("created-on", data.piece?.createdOn);
  setText("dimensions", data.piece?.dimensions);
  setText("materials", data.piece?.materials);

  setText("story", data.story);

  setText("process-title", data.process?.title);
  const featuredImage = document.getElementById("featured-image");
  if (featuredImage) {
    featuredImage.src = data.process?.featured?.src || "";
    featuredImage.alt = data.process?.featured?.alt || "Featured process image";
  }
  setText("featured-label", data.process?.featured?.label);
  renderProcessSteps(data.process?.steps);

  setText("verified-label", data.verification?.verifiedByLabel);
  setText("verified-by", data.verification?.verifiedBy);
  setText("signature", data.verification?.signature);
  setText("quote", data.verification?.quote);
  setText("copyright", data.verification?.copyright);
}

function getUuidFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const uuid = params.get("uuid");
  if (!uuid) return null;

  // Allow common UUID format and safe slug-like ids for file names.
  const safePattern = /^[a-zA-Z0-9_-]+$/;
  if (!safePattern.test(uuid)) {
    return null;
  }

  return uuid;
}

function getCertificatePath() {
  const uuid = getUuidFromQuery();
  if (!uuid) {
    return "./data/certificate.json";
  }

  return `./data/${uuid}.json`;
}

async function loadCertificate() {
  const dataPath = getCertificatePath();

  try {
    const response = await fetch(dataPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    renderCertificate(data);
  } catch (error) {
    setText("story", `No se pudo cargar el JSON: ${dataPath}`);
    console.error("Error loading certificate data:", error);
  }
}

applySystemTheme();
loadCertificate();
