'use strict';

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

if (modalContainer && modalCloseBtn && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (modalImg && avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
      if (modalText && text) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all" || selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn[0] || null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const user = "rajskashikar";
const domain = "gmail";
const tld = "com";
const email = `${user}@${domain}.${tld}`;
const phoneCountry = "+1";
const phoneArea = "925";
const phonePrefix = "436";
const phoneLine = "9249";
const phone = `${phoneCountry} (${phoneArea}) ${phonePrefix}-${phoneLine}`;

const pageLoadedAt = Date.now();
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");
const honeypot = document.querySelector("[data-honeypot]");
const emailCopyBtns = document.querySelectorAll("[data-email-copy]");
const emailRevealBtns = document.querySelectorAll("[data-email-reveal]");
const phoneRevealBtns = document.querySelectorAll("[data-phone-reveal]");

const setFormStatus = function (message, tone = "") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.dataset.tone = tone;
};

const updateFormButton = function () {
  if (!form || !formBtn) return;
  if (form.checkValidity()) {
    formBtn.removeAttribute("disabled");
  } else {
    formBtn.setAttribute("disabled", "");
  }
};

const encodeMailto = function ({ fullname, senderEmail, subject, message }) {
  const mailSubject = subject.trim();
  const body = [
    `Name: ${fullname.trim()}`,
    `Email: ${senderEmail.trim()}`,
    "",
    message.trim(),
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
};

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      setFormStatus("");
      updateFormButton();
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (honeypot?.value) {
      setFormStatus("");
      return;
    }

    if (Date.now() - pageLoadedAt < 2000) {
      setFormStatus("Please wait a moment before sending.", "error");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setFormStatus("Please complete the required fields.", "error");
      return;
    }

    const formData = new FormData(form);
    const mailtoUrl = encodeMailto({
      fullname: formData.get("fullname") || "",
      senderEmail: formData.get("email") || "",
      subject: formData.get("subject") || "",
      message: formData.get("message") || "",
    });

    window.location.href = mailtoUrl;
    setFormStatus("Opening your email client with a draft.", "success");
  });

  updateFormButton();
}

const copyEmail = async function () {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setFormStatus("Email copied.", "success");
  } catch {
    setFormStatus(email, "success");
  }
};

emailCopyBtns.forEach((button) => {
  button.addEventListener("click", copyEmail);
});

emailRevealBtns.forEach((button) => {
  button.addEventListener("click", function () {
    this.textContent = email;
    this.setAttribute("aria-label", `Email address ${email}`);
  });
});

phoneRevealBtns.forEach((button) => {
  button.addEventListener("click", function () {
    this.textContent = phone;
    this.setAttribute("aria-label", `Phone number ${phone}`);
  });
});

const githubUser = "raj200501";
const githubRepoEls = document.querySelectorAll("[data-github-public-repos]");

const hydrateGitHubStats = async function () {
  if (!githubRepoEls.length) return;

  try {
    const profileResponse = await fetch(`https://api.github.com/users/${githubUser}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!profileResponse.ok) return;

    const profile = await profileResponse.json();
    const repoCount = Number(profile.public_repos);

    if (Number.isFinite(repoCount)) {
      githubRepoEls.forEach((element) => {
        element.textContent = repoCount.toLocaleString();
      });
    }
  } catch {
    // Keep static fallback copy if the unauthenticated GitHub API is rate-limited.
  }
};

hydrateGitHubStats();

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = this.dataset.target || this.innerHTML.toLowerCase();

    navigationLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    pages.forEach((page) => {
      page.classList.toggle("active", target === page.dataset.page);
    });

    window.scrollTo(0, 0);
  });
}
