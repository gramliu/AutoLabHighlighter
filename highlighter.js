window.onload = () => {
    let elems = document.body.getElementsByTagName("pre");
    let content = elems[0].innerHTML;
    let lines = content.split("\n");
    let openTag = "<span style='background-color: yellow'>";
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("*** TEST FAILED!")) {
            lines[i-1] = openTag + lines[i-1] + "</span>";
        }
    }
    elems[0].innerHTML = lines.join("\n");
}