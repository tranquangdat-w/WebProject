const searchBarInput = document.querySelector(".search-bar")

searchBarInput.addEventListener("focus", () => {
    searchBarInput.classList.add('search-bar-focused');
    document.querySelector(".search-button").classList.add('search-button-search-bar-focus')
    document.querySelector(".selector-header").classList.add('selector-header-focused')
})

searchBarInput.addEventListener("blur", () => {
    searchBarInput.classList.remove('search-bar-focused');
    document.querySelector(".search-button").classList.remove('search-button-search-bar-focus')
    document.querySelector(".selector-header").classList.remove('selector-header-focused')
})

/* SIDEBAR */
const sideBarNavigationEl = document.getElementById("sidebar-container-navigation-id")
const sidebarOPenNavigationEl = document.getElementById("open-nav-sidebar")
const sidebarCloseNavigationEl = document.getElementById("sidebar-navigation-close");

sidebarOPenNavigationEl.addEventListener("click", () => {
    sideBarNavigationEl.classList.toggle("sidebar-show")
    document.querySelector(".sidebar-background").style.display = "block"
});

sidebarCloseNavigationEl.addEventListener("click", () => {
    sideBarNavigationEl.classList.remove("sidebar-show")
    document.querySelector(".sidebar-background").style.display = "none"
});

