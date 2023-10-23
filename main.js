
const jsData = [
  {
    question: "What is the result of the expression: '5' + 3?",
    a: '"53"',
    b: '"8"',
    c: 8,
    d: "error",
    answer: "a",
  },
  {
    question:
    "How do you add an event listener to an HTML element in JavaScript?",
    a: 'addEventListener("click", myFunction)',
    b: 'element.on("click", myFunction)',
    c: "element.on('click', myFunction);",
    d: " addEvent('click', myFunction, element)",
    answer: "c",
  },
  {
    question: "What will the following code output: console.log(2 + '2');?",
    a: '"4"',
    b: "4",
    c: "22",
    d: "'22'",
    answer: "b",
  },
];


const htmlData = [];
const cssData = [];

const start = document.querySelector(".start");
const next = document.querySelector(".next");
const trueAnswer = document.querySelector(".trueAnswer");
const question = document.querySelector(".question");
const variant = document.querySelectorAll(".variant");
const numb = document.querySelector(".numb");
const final = document.querySelector(".final");
const seconds = document.querySelector(".seconds");
const arrow = document.querySelector(".arrow");
const headerSection = document.querySelector(".headerSection");
const mainSection = document.querySelector(".mainSection");
const resultPercent = document.querySelector(".result__percent");
const greeting = document.querySelector(".greeting");
const langBtn = document.querySelectorAll(".langugage-btn");

//! -------------------- Language Button ------------------

let lang = "";

langBtn.forEach((item)=>{

  
  let hover =() =>{
    item.style.backgroundColor = "#735869";
  }
  
  let nothover = () => {
    item.style.backgroundColor = "#c3a8ba";
  }
  item.addEventListener("mouseenter" ,  hover, false);
  item.addEventListener("mouseleave" , nothover, false);
  
  item.addEventListener("click" , (e)=>{
    langBtn.forEach(elem =>{
      elem.setAttribute("disabled","");
      elem.removeEventListener("mouseenter", hover, false);
      elem.removeEventListener("mouseleave", nothover, false);
      console.log(elem);
    })
    switch(e.target.classList[1]) {
      case "html" :
        lang = htmlData;
        start.removeAttribute("disabled");
        e.target.removeEventListener("mouseleave", nothover, false);
        e.target.style.backgroundColor = "#735869";
        break;
        case "css" :
          lang = cssData;
          start.removeAttribute("disabled");
          e.target.style.backgroundColor = "#735869";
          e.target.removeEventListener("mouseleave", nothover, false);
        break;
        case "javascript" :
          start.removeAttribute("disabled"); 
          start.classList.add("active");
          e.target.style.backgroundColor = "#735869 !important";
          e.target.removeEventListener("mouseleave", nothover , false);
          lang = jsData;
        break;
      default:
        break;
    };
  })
})

//! ------------------- Start Quiz -------------------------

let firstQuestionTimeOut = null;

start.addEventListener("click" , ()=>{
  greeting.style.opacity = "0";
  greeting.style.zIndex = "-4";
  mainSection.style.opacity = "1";
  headerSection.style.opacity = "1";
  firstQuestionTimeOut = setTimeout (questionFunc , 2000);
})

// ! ------------------------- Click ---------------------------------

let sec = 11;
let result = 0;
let quest = 0;
let questionNumb = 0;
let customInterval = null;

next.addEventListener("click", questionFunc) ;

function questionFunc() {
  seconds.innerHTML = "";
  seconds.style.color = "green";
  sec = 11;
  startTimer();
  
  seconds.classList.remove("d-none");
  
  variant.forEach((dis) => {
    dis.style.pointerEvents = "auto";
    dis.classList.remove("active");
    dis.classList.remove("uncorrect");
  });

  questionNumb++;
  question.innerHTML = lang[quest].question;
  numb.innerHTML = "QUESTION : " + questionNumb;
  
  variant[0].innerHTML = lang[quest].a;
  variant[1].innerHTML = lang[quest].b;
  variant[2].innerHTML = lang[quest].c;
  variant[3].innerHTML = lang[quest].d;
};


// ! ---------------- Timer Function -------------------------


function timer() {
  sec--;
  if (sec != 0) {
    if(sec < 10){
      seconds.style.color = "rgb(194, 33, 33)";
      seconds.innerHTML = "0 : 0" + sec;
    }else{
      seconds.innerHTML = "0 : " + sec;
    }
  } else {

    if(quest < lang.length - 1){
      firstQuestionTimeOut = setTimeout ( questionFunc , 2000);
      seconds.innerHTML = "0 : 0" + sec;
      stopTimer();
      variant.forEach((item) => {
        item.style.pointerEvents = "none";
        // console.log(item);
      })
      
      if (quest < lang.length - 1) {
        quest++;
      } else {
        final.style.left = "0px";
        speedOmeter();
      }
    }else{
      final.style.zIndex = "2";
      final.style.opacity = "1";
      mainSection.style.opacity = "0";
      headerSection.style.opacity = "0";
      next.setAttribute("disabled", "");
      seconds.innerHTML = "0 : 0"+sec;
      stopTimer();
      speedOmeter();
      percentTimeOut = setTimeout(()=>{
      percent = (result/lang.length)*100;
        if (!counterInterval) {
          counterInterval = setInterval(()=>{
            
            if(count < Math.floor(percent)){
              count++;
              resultPercent.innerHTML = count + "%";
            }
          }, 20.5);
        }
      }, 4000)
    }
  }
}

// ! ---------------- Start and Stop Timer  -------------------------

function startTimer() {
  if (!customInterval) {
    customInterval = setInterval(timer, 200);
  }
}

function stopTimer() {
    if(customInterval){
        clearInterval(customInterval);
        customInterval = null;
    }
}

//! ----------------------- Variants ---------------------------------

let percentTimeOut = null;
let counterInterval = null;
let percent;
let count = 0;

variant.forEach((item) => {
  item.style.pointerEvents = "none";

  item.addEventListener("click", () => {
    stopTimer();

    variant.forEach((dis) => {
      dis.style.pointerEvents = "none";

      if (dis.id == lang[quest].answer) {
        dis.classList.add("active");
      }
    });

    if (item.id == lang[quest].answer) {
      result++;
      firstQuestionTimeOut = setTimeout ( questionFunc , 2000);
    } else {
        item.classList.add("uncorrect");
    }

    if (quest < lang.length - 1) {
      quest++;
    } else {
      final.style.zIndex = "2";
      final.style.opacity = "1";
      mainSection.style.opacity = "0";
      headerSection.style.opacity = "0";
      next.setAttribute("disabled", "");
      speedOmeter();
      percentTimeOut = setTimeout(()=>{
        percent = (result/lang.length)*100;
        // percentSpeed = Math.floor(percent) * 0.2;
        if (!counterInterval) {
          counterInterval = setInterval(()=>{
            
            if(count < Math.floor(percent)){
              count++;
              resultPercent.innerHTML = count + "%";
            }
          }, 20.5);
        }
      }, 4000)
    }
  });
});

//! ---------------------- Speedometer ------------------------

let speed = document.getElementById("speed");
let updatedSpeed ;

function speedOmeter (){
  updatedSpeed = Math.round(145 * result/lang.length);
  let arrowStart = updatedSpeed +17;
  let scoreStart = updatedSpeed + 332;
  // console.log(updatedSpeed)
  document.getElementById("speedbox-score").style.transform = "rotate("+scoreStart+"deg)";
  arrow.style.transform = "rotate("+arrowStart +"deg)";
}




