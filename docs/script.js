function specialRedirect(url) {
    if (location.href.includes("file:///")) return console.log("File system doesn't support fetching.");
    
}