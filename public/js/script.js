// **material Box from Materialize css

document.addEventListener('DOMContentLoaded', function() {
  var paralax = document.querySelectorAll('.parallax');
  var tab = document.querySelectorAll('.tabs');

 M.Parallax.init(paralax);
 M.Tabs.init(tab, {
  duration: 100
 });

});



// **image preview upload

const img = document.querySelector("img");
const wrapper = document.querySelector(".wrapper");
const cancel = document.querySelector(".cancel")
const inputText = document.querySelector("#inputBtn")


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

  //memasang class untuk wrapper
  wrapper.classList.add("actives")

cancel.addEventListener('click', function() {
  img.src = "";
  wrapper.classList.remove("actives")
  inputBtn.value = "";
})

  //memanggil property readAsDataUrl
  reader.readAsDataURL(file);

});