function specialRedirect(url) {
    if (location.href.includes("file:///")) {
        console.log("File system doesn't support fetching.")
        window.location.href = "./"+ url + ".html";
        return;
    };
    $(".__container__").load("./" + url);
    history.pushState({}, "", "./" + url);
}