function specialRedirect(url) {
    if (location.href.includes("file:///")) {
        console.log("File system doesn't support fetching.")
        window.location.href = "./"+ url + ".html";
        return;
    };
    $(".__container__").load("./" + url);
    history.pushState({}, "", "./" + url);
}

$(window).bind("popstate", () => {
    $(".__container__").load(location.href); // Whenever user presses "< or >" in action bar, attempt to load the page that is in the website in order not to break itself.
});