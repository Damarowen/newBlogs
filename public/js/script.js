const img = document.querySelector("img");


//This event is triggered each time a file is created, modified, or deleted on a given storage area.
inputBtn.addEventListener("change", function () {
  // ini mengambil file yang dipiluh, file yang dipilih akan return dalam bentuk array
  // maka dikasi [0]
  const file = this.files[0];

  //memangil reader
  const reader = new FileReader();

  //memanggil property onload
  reader.onload = function () {
    const result = reader.result;
    img.src = result;
  }

  //memanggil property readAsDataUrl
  reader.readAsDataURL(file);

});