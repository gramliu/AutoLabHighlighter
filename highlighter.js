let getOpenTag = (color, colorText) => {
    if (colorText == undefined) {
        colorText = "black";
    }
    return `<span style='background-color: ${color}; color: ${colorText};'>`;
}

window.onload = () => {
    let elems = document.body.getElementsByTagName("pre");
    let content = elems[0].innerHTML;
    let lines = content.split("\n");
    let closeTag = "</span>";
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("*** TEST FAILED!")) {
            lines[i-1] = getOpenTag("#f44336", "white") + lines[i-1] + closeTag;
        } else if (lines[i].startsWith("Task")) {
            let tokens = lines[i].split(" ");
            let exp = tokens[tokens.length - 1];
            if (exp.includes("/")) {
                let nums = exp.split("/");
                if (nums.length == 2) {
                    let a = parseFloat(nums[0]);
                    let b = parseFloat(nums[1]);
                    if (a !== b && a !== NaN && b !== NaN) {
                        lines[i] = getOpenTag("yellow") + lines[i] + closeTag;
                    }
                }
            }
        }
    }
    elems[0].innerHTML = lines.join("\n");
}