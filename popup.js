function hello() {
  console.log("elem")
}

window.addEventListener('load', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.errors);
      let error_div = document.getElementById('errors');
      response.errors.forEach(error => {
        let par = document.createElement('p');
        par.id = error.id;
        par.className = 'clickable';
        par.innerHTML = error.text;
        error_div.appendChild(par);
      });
      let selection = document.getElementsByClassName('clickable');
      for (let i = 0; i < selection.length; i++) {
        selection[i].addEventListener("click", function() {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
              "code": "var id=" + i + "; var blinking; var elem;"
            }, () => {
              chrome.tabs.executeScript(tabs[0].id, {
                "code": "blinking = document.getElementsByClassName('blinking'); for (let i=0; i < blinking.length; i++) {blinking[i].classList.remove('blinking')} elem = document.getElementById(id); elem.scrollIntoView({behavior:'smooth'}); elem.classList.add('blinking');"
              })
            })
          })
        })
      }
    });
  });
});