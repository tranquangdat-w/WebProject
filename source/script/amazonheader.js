const searchBarInput = document.querySelector(".search-bar")

searchBarInput.addEventListener("focus", () => {
    searchBarInput.classList.add('search-bar-focused');
    document.querySelector(".search-button").classList.add('search-button-search-bar-focus')
})

searchBarInput.addEventListener("blur", () => {
    searchBarInput.classList.remove('search-bar-focused');
    document.querySelector(".search-button").classList.remove('search-button-search-bar-focus')
})