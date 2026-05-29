const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const savedTheme = localStorage.getItem("homepage-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("homepage-theme", root.classList.contains("dark") ? "dark" : "light");
});

copyEmailButton?.addEventListener("click", async () => {
  const email = "zhangchong050812@ruc.edu.cn";
  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "已复制";
    setTimeout(() => {
      copyEmailButton.textContent = "复制邮箱";
    }, 1400);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

const syncActiveNav = () => {
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 130) {
      current = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", () => {
  syncHeader();
  syncActiveNav();
});

syncHeader();
syncActiveNav();
