function scrollSmooth() {
  // Find the height of the viewport
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  // Calculate the position to scroll to (one viewport height down)
  const scrollToY = window.scrollY + viewportHeight;

  // Scroll smoothly to the calculated position
  window.scrollTo({
    top: scrollToY,
    behavior: "smooth", // Add smooth scrolling behavior
  });
}
function DoAnimation() {
  var targetElement = document.getElementById("target");
  targetElement.classList.toggle("animate");
}

// selectors
const themeToggleBtn = document.querySelector(".theme-toggle");

// state
const theme = localStorage.getItem("theme");
const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

// on mount
theme && document.body.classList.add(theme);
isDark && document.body.classList.add("dark-mode");

// handlers
const handleThemeToggle = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.removeItem("theme");
  }
};

// events
themeToggleBtn.addEventListener("click", handleThemeToggle);
