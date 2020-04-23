function Tabs(elements = [], root = false) {
  /* Helpers to hide all tabs & show one */
  function hideAll($tabs) {
    $tabs.forEach(({ $tab, $target }) => {
      $target.removeAttribute("tab-active");
    })
  }

  function show($target) {
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
      show($target)
    })
  })

  /* Finally check if we should already change tabs (only for "root" tabs) */
  const hash = window.location.hash;
  if (root && hash) {
    console.log(hash)
    const $tab = $tabs.filter(({ $tab, $target }) => $tab.getAttribute("href") === hash)[0].$tab;

    $tab.click();
  }
}
