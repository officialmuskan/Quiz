var quiz = [{
    "question": "What is the full form of IP?",
    "choices": ["Internet Provider", "Internet Port", "Internet Protocol", "Interested Picture"],
    "correct": "Internet Protocol"
  }, {
    "question": "Who is the founder of Microsoft?",
    "choices": ["Bill Gates", "Steve Jobs", "Steve Wozniak","Robert Downey"],
    "correct": "Bill Gates"
  }, {
    "question": "1 byte = ?",
    "choices": ["8 bits", "64 bits", "1024 bits", "0 bits"],
    "correct": "8 bits"
  }, {
    "question": "The C programming language was developed by?",
    "choices": ["Brendan Eich", "Dennis Ritchie", "Guido van Rossum", "Author Nifht"],
    "correct": "Dennis Ritchie"
  }, {
    "question": "What does CC mean in emails?",
    "choices": ["Carbon Copy", "Creative Commons", "other" ,"Copy Cat"],
    "correct": "Carbon Copy"
  }];


const question = document.querySelector("h1")
const ansBtns = document.querySelector(".ans-btn")
const topbtn = document.querySelector(".top-btn")
const bottombtn = document.querySelector(".bottom-btn")
const nextbtn = document.querySelector("#next")

let currentQuesIndex = 0;
let score = 0;

function Start(){
    currentQuesIndex = 0;
    score = 0;
    nextbtn.style.display = "none"
    nextbtn.innerHTML = "NEXT"
    showQuestion();
}
function resetState(){
    nextbtn.style.display = "none";
    while(topbtn.firstChild){
        topbtn.removeChild(topbtn.firstChild);
    }
    while(bottombtn.firstChild){
        bottombtn.removeChild(bottombtn.firstChild);
    }
}
function showQuestion(){
    resetState();
    let currentQues = quiz[currentQuesIndex];
    let Quesno = currentQuesIndex + 1;
    question.innerHTML = Quesno +". "+ currentQues.question;
    const choices = currentQues.choices;
    
    for (let i = 0; i < choices.length; i++) {
        const button = document.createElement("button");
        button.innerHTML = choices[i];
        button.classList.add("btn");

        if (i < 2) {
            topbtn.appendChild(button);
        } else {
            bottombtn.appendChild(button);
        }
        
        button.addEventListener("click", checkans);
    }
    
    
}
function checkans(e){
    const selectedbtn = e.target;
    if(selectedbtn.textContent === quiz[currentQuesIndex].correct){
        
        selectedbtn.classList.add("correct")
        score++;
        disable(selectedbtn);
    }
    else{
        selectedbtn.classList.add("incorrect")
        highlightcorrectans();
    }
    nextbtn.style.display = "block";
}
    
function disable(selectedbtn){
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        if (button !== selectedbtn) {
            button.disabled = true;
        }
    });
}
function highlightcorrectans() {
    const correctAnswer = quiz[currentQuesIndex].correct;
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
}
    
function showScore(){
    resetState();
    question.innerHTML = `You Scored ${score} out of ${quiz.length} !`
    nextbtn.innerHTML = "Play Again"
    nextbtn.style.display = "block";
}
function handlenextbnt(){
    currentQuesIndex ++;
    if(currentQuesIndex < quiz.length){
        showQuestion()
    }
    else{
        showScore()
    }
}
nextbtn.addEventListener("click", () =>{
    if(currentQuesIndex < quiz.length){
        handlenextbnt();
    }
    else{
        Start();
    }
})
Start()