let getOpenTag = (backgroundColor, colorText, id) => {
  backgroundColor = `background-color: ${backgroundColor}`;
  colorText = colorText === undefined ? "" : `color: ${colorText}`;
  id = `id=${id}`;
  return `<span style='${backgroundColor}; ${colorText};' ${id}>`;
};

window.onload = () => {
  let elems = document.body.getElementsByTagName("pre");
  let content = elems[0].innerHTML;
  let lines = content.split("\n");
  let closeTag = "</span>";
  
  let errors = [];
  let id = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("*** TEST FAILED!")) {
      lines[i - 1] = getOpenTag("#f44336", "white", id++) + lines[i - 1] + closeTag;
      let tokens = lines[i-1].split(" ");
      let text = tokens[1] + " " + tokens[2];
      errors.push({
          id: `task-${id}`,
          text: text
      });
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

  chrome.runtime.sendMessage({
      data: errors
    }, (response) => {});
};