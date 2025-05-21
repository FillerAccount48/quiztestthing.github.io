// Initialize data storage
// [] - list
// {} - dictionary (unordered map) - key value pairs
const Data = [
    {
        question : "What is the capital of Japan?",
        options : ["Nagoya", "Tokyo", "Kyoto", "Osaka"],
        answer : "Tokyo"
    },

    {
        question : "Which year did Singapore gain independence?",
        options : ["1945", "1959", "1965", "1971"],
        answer : "1965"
    },

    {
        question : "When is the General Election 2025 in Singapore scheduled to be held?",
        options : ["April-2025", "May-2025", "June-2025", "July-2025"],
        answer : "May-2025"
    },

    {
        question : "How many parliamentary seats are being contested in 2025 Singpore GE?",
        options : ["89", "91", "97", "100"],
        answer : "97"
    },

    {
        question : "Which political party is proposing tax exemption on essential goods?",
        options : ["PAP", "WP", "PSP", "SDP"],
        answer : "WP"
    },
];




const Timer = document.getElementById("timer");
const TimerText = document.getElementById("timerText");
const StartButton = document.getElementById("start-btn");
const QuestionLabel = document.getElementById("question");
const ProgressBarFill = document.getElementById("progress-bar-fill");
const ProgressBarContainer = document.getElementById("progress-bar-container"); 
const OptionsContainer = document.getElementById("option-container");
const ResultLabel = document.getElementById("result");



StartButton.addEventListener('click', StartQuiz);


let current_index = 0;
let score = 0;


function StartQuiz()
{
    // to hide the start button
    StartButton.style.display = 'none';
    LoadQuestion();
}


function LoadQuestion()
{
    if(current_index < Data.length)
    {
        clearInterval(timer);
        TimerText.textContent = 15;

        ProgressBarFill.style.width = `${((current_index + 1) / Data.length) * 100}%`;

        const CurrentQuestionSet = Data[current_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;

        // removal of previous button clones
        OptionsContainer.innerHTML = '';

        // Clone a HTML button for each option
        CurrentQuestionSet.options.forEach((option) => {
            const buttonClone = document.createElement('button');
            OptionsContainer.append(buttonClone);
            buttonClone.textContent = option;
            buttonClone.classList.add('option-btn');

            buttonClone.addEventListener('click', () => {
                DisableOptionButtons();
                CheckAnswer(option);
            });
        });


        // create a timer object with the setInterval function
        timer = setInterval(() => {
            TimerText.textContent = parseInt(TimerText.textContent) - 1;
            if(parseInt(TimerText.textContent) === 0)
            {
                clearInterval(timer);
                current_index++;
                LoadQuestion();
            }
        }, 1000);

    } else 
    {
        EndQuiz();
    }
}





function DisableOptionButtons()
{
    const Buttons = document.querySelectorAll('.option-btn');
    Buttons.forEach(b => {
        b.disabled = true;
    });
}

function CheckAnswer(option)
{
    const ANSWER = Data[current_index].answer;

    if(option === ANSWER)
    {
        score++;
    }

    ResultLabel.textContent = `You scored ${score} point(s).`;

    setTimeout(() => {
        current_index++;
        LoadQuestion();
    }, 1000);
}


function EndQuiz()
{
    clearInterval(timer);
    ProgressBarContainer.style.display = 'none';
    OptionsContainer.style.display = 'none';
    Timer.style.display = 'none';
    QuestionLabel.textContent = "Hooray! Quiz has ended :)";
}