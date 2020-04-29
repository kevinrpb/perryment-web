function Tabs(elements = [], root = false) {
  /* Helpers to hide all tabs & show one */
  function hideAll($tabs) {
    $tabs.forEach(({ $tab, $target }) => {
      $tab.removeAttribute("active");
      $target.removeAttribute("tab-active");
    });
  }

  function show({ $tab, $target }) {
    $tab.setAttribute("active", "active");
    $target.setAttribute("tab-active", "tab-active");
  }

  /* Capture all tab elements */
  const $tabs = elements.map((element) => {
    const target = element["data-target"],
      $tab = document.querySelector(`[data-target=${target}]`),
      $target = document.getElementById(target);

    return { $tab, $target };
  });

  /* Listen to clic on tab triggers */
  $tabs.forEach(({ $tab, $target }) => {
    $tab.addEventListener("click", () => {
      hideAll($tabs);
      show({ $tab, $target });

      setTimeout(() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      }), 100);
    });
  });

  /* Finally check if we should already change tabs (only for "root" tabs) */
  if (root) {
    const hash = window.location.hash;

    // theres hash? use it, otherwise just first item
    const $tab = hash
      ? $tabs.filter(
          ({ $tab, $target }) => $tab.getAttribute("href") === hash
        )[0].$tab
      : $tabs[0].$tab;

    $tab.click();
  }
}
