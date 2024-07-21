const cookieCount = document.getElementById("cookiecount");
const cookieCountps = document.getElementById("cpsdisplay");
const buttonClick = document.getElementById("clickimg");

/*if (localStorage.getItem("cookies")) {
  cookies = parseInt(localStorage.getItem("cookies"));
} else {
  cookies = 0;
}*/

let cookies = localStorage.getItem("cookies")
  ? parseInt(localStorage.getItem("cookies"))
  : 0;
let cps = 1;
function cookieIncrease() {
  cookies = cookies + cps;
  cookieCount.textContent = cookies;
  localStorage.setItem("cookies", cookies);
}
setInterval(cookieIncrease, 1000);

function clickCookie() {
  cookies++;
  cookieCount.textContent = cookies;
}
buttonClick.addEventListener("click", clickCookie);

// From fetch api //

let div = "";
let records = 0;
fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
  .then((response) => response.json())
  .then((jsonResp) => {
    console.log(jsonResp);

    jsonResp.forEach((eachRecord) => {
      if (records <= 2) {
        let divContent = `<div class="cookie-container"> 
        <p id="${eachRecord.id}">0</p>
        <p>${eachRecord.name}</p> 
        <p>${eachRecord.cost}</p>
         <p>${eachRecord.increase}</p>
        <button id ="btn" onclick="buyCookie(${eachRecord.id},${eachRecord.cost},${eachRecord.increase})">Buy</button>
        </div>`;
        console.log(divContent);
        div = div + divContent;
        records++;
        console.log(div);
      }
    });
    let container = document.getElementById("buyfeature");
    container.innerHTML = div;
  });

function buyCookie(id, count, increase) {
  if (cookies > count) {
    const idValue = document.getElementById(id);
    idValue.textContent = parseInt(idValue.textContent) + 1;
    cps = cps + increase;
    cookies = cookies - count;
    cookieCount.textContent = cookies;
    cookieCountps.textContent = cps;
  } else {
    const warningInterval = setInterval(function () {
      document.getElementById("textdisplay").textContent = "Not enough cookies";
    }, 100);

    setTimeout(function () {
      clearInterval(warningInterval);
      document.getElementById("textdisplay").textContent = "";
    }, 2000);
  }
}
const resetBtn = document.getElementById("resetbtn");
resetBtn.addEventListener("click", function () {
  cookies = 0;
  cps = 1;
  cookieCountps.textContent = cps;
});
