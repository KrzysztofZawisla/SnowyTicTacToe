const dragbar = document.getElementById("dragbar");

function dragbarChange() {
  dragbar.innerHTML = "Przytrzyjmaj tą belkę aby przesunąć program";
  setTimeout(() => {
    dragbar.innerHTML = "Ctrl+Q - wyjście";
  }, 5000);
  setTimeout(() => {
    dragbar.innerHTML = "Ctrl+R - restart";
  }, 10000);
  setTimeout(dragbarChange, 15000);
}

dragbarChange();
