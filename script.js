const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const buttons = document.getElementById("buttons");
const input = document.getElementById("userInput");
const overlay = document.getElementById("overlay");
const loveBomb = document.getElementById("loveBomb");
const finalButton = document.getElementById("finalButton");
const easterEgg = document.getElementById("easterEgg");
const voiceNote = document.getElementById("voiceNote");
const bgMusic = document.getElementById("bgMusic");
const eggImages = [
  "img/easteregg.png",
  "img/easteregg1.png",
  "img/easteregg2.png",
  "img/easteregg3.png",
  "img/easteregg4.png",
  "img/easteregg5.png",
  "img/easteregg6.png",
  "img/easteregg7.png",
  "img/easteregg8.png",
  "img/easteregg9.png",
  "img/easteregg10.png",
  "img/easteregg11.png",
  "img/easteregg12.png",
  "img/easteregg13.png",
  "img/easteregg14.png",
  "img/easteregg15.png",
  "img/easteregg16.png",
  "img/easteregg17.png",
];

let step = 0;

function showPopup(text, withInput=false, buttonList=[]) {
  popup.classList.remove("hide");
  popup.classList.add("show");
  popupText.innerHTML = text;
  buttons.innerHTML = "";

  input.value = "";      // <-- FORCE CLEAR EVERY TIME
  input.classList.add("hidden");

  if (withInput) input.classList.remove("hidden");

  buttonList.forEach(btn => {
    const b = document.createElement("button");
    b.innerText = btn.text;
    b.onclick = btn.action;
    buttons.appendChild(b);
  });
}

function hidePopup(callback) {
  popup.classList.remove("show");
  popup.classList.add("hide");
  setTimeout(callback, 300);
}

function moveNo(button) {
  const x = Math.random() * 200;
  const y = Math.random() * 200;
  button.style.position = "absolute";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function start() {
  showPopup("h... hey...", false, [
    { text: "yuh uh", action: identity1 },
    { text: "nuh uh", action: function(e){ moveNo(e.target);} }
  ]);
}

function identity1() {
  showPopup("SECURITY CHECK! your name?", true, [
    { text: ":3", action: function(){
        let val = input.value.trim().toLowerCase();
        if(["shuuzai","zai","zhuu"].includes(val)){
          identity2();
        } else {
          alert("youre not my sweetheart aren't you.");
          showPopup("get out.");
        }
    }}
  ]);
}

function identity2() {
  showPopup("what do i usually call you other than your name?", true, [
    { text: ":3", action: function(){
        let val = input.value.trim().toLowerCase();
        if(["sweetheart","sweetie","kitten","dear"].includes(val)){
          messages();
        } else {
          alert("youre not my sweetheart aren't you.");
          showPopup("get out.");
        }
    }}
  ]);
}

let messageSteps = [
"hehe, its really you.",
"happy valentines day, my love.",
"and happy early 8th monthssary.",
"i love you so much."
];

let msgIndex = 0;

function messages(){
  if(msgIndex < messageSteps.length){
    showPopup(messageSteps[msgIndex], false, [
      { text:"press here, dear", action: function(){ msgIndex++; messages(); } }
    ]);
  } else {
    hidePopup(startLoveBomb);
  }
}

function startLoveBomb(){
  overlay.classList.add("hidden");
  loveBomb.classList.remove("hidden");

  loveBomb.innerText = "";

  const screenArea = window.innerWidth * window.innerHeight;
  const densityFactor = 0.0008; // increase if still not enough
  const repetitions = Math.floor(screenArea * densityFactor);

  let count = 0;

  let interval = setInterval(()=>{
    loveBomb.innerText += "i love you. ";
    count++;
    if(count >= repetitions * 2){ // 2x as requested
        clearInterval(interval);
    }
  },20);

  setTimeout(()=>{
    finalButton.classList.remove("hidden");
  },18000);
}


finalButton.onclick = function(){
  overlay.classList.remove("hidden");
  loveBomb.classList.add("hidden");
  finalButton.classList.add("hidden");

  longLetter();
}

function longLetter(){

  const fullText = document.getElementById("letterContent").textContent;
  let index = 0;

  popup.classList.add("wide");

  popupText.innerHTML = "";
  buttons.innerHTML = "";

  showPopup("", false, []);

  function typeEffect(){
    if(index < fullText.length){
      popupText.innerHTML += fullText.charAt(index);
      index++;
      setTimeout(typeEffect, 58);
    } else {

      const btn = document.createElement("button");
      btn.innerText = "continue";
      btn.onclick = function(){

        popup.classList.remove("wide");   // shrink back if needed
        popupText.innerHTML = "";
        finalIndex = 0;
        finalMessages();

      };

      buttons.appendChild(btn);
    }
  }

  typeEffect();
}


function finalMessages(){
  if(finalIndex < finalSteps.length){
    let btn = finalIndex < 3 ? [{text:"continue", action:function(){finalIndex++; finalMessages();}}] : [];
    showPopup(finalSteps[finalIndex], false, btn);
    if(finalIndex===3){
      easterEgg.classList.remove("hidden");
    }
  }
}

let finalSteps = [
"once again,",
"happy valentines day, sweetie.",
"i love you,",
"forever."
];

let finalIndex = 0;


easterEgg.onclick = function(){

  for(let i=0;i<60;i++){

    setTimeout(()=>{

      let img = document.createElement("img");

      img.src = eggImages[Math.floor(Math.random() * eggImages.length)];
      img.classList.add("ball");

      let x = Math.random() * window.innerWidth;
      img.style.left = x + "px";

      document.body.appendChild(img);

      dropBall(img);

    }, Math.random() * 3000);
  }
}


function dropBall(ball){

  let velocity = 0;
  let gravity = 0.25;
  let bounce = 0.6;
  let posY = -120;
  let floor = window.innerHeight - 90;

  function animate(){

    velocity += gravity;
    posY += velocity;

    if(posY >= floor){
      posY = floor;
      velocity *= -bounce;

      if(Math.abs(velocity) < 2){
        velocity = 0;
        roll(ball);
        return;
      }
    }

    ball.style.top = posY + "px";
    requestAnimationFrame(animate);
  }

  animate();
}


function roll(ball){

  let rollDirection = Math.random() > 0.5 ? 1 : -1;
  let rollSpeed = Math.random() * 2 + 1;

  let posX = parseFloat(ball.style.left);

  function rolling(){

    posX += rollSpeed * rollDirection;

    if(posX <= 0 || posX >= window.innerWidth - 80){
      rollDirection *= -1;
    }

    ball.style.left = posX + "px";
    requestAnimationFrame(rolling);
  }

  rolling();
}


window.addEventListener("click", () => {
  bgMusic.play();
  bgMusic.volume = 0.5;
}, { once: true });


function playLetterAudio() {
  bgMusic.volume = 0.2;   // lower music
  voiceNote.play();       // play voice

  voiceNote.onended = () => {
    bgMusic.volume = 0.5;   // restore music volume
  };
}


finalButton.addEventListener("click", () => {

  // lower music
  bgMusic.volume = 0.1;

  // reset voice
  voiceNote.currentTime = 0;

  // play voice
  voiceNote.play().catch(err => console.log(err));

  // restore music when done
  voiceNote.onended = () => {
    bgMusic.volume = 1;
  };

  // show ONLY the long letter first
  long();

});




start();
