const quizContainer = document.querySelector('.quiz-container');
const quizHeading = document.querySelector('.select-quiz-heading');
const quizSelectorul = document.querySelector('.quiz-selector-ul');
const numberOfquestions = document.querySelector('#amount');
const categoryLists = document.querySelector('#category');
const difficultyLevel = document.querySelector('#difficulty');
const selectBtn = document.querySelector(".select-btn");
const submitDiv = document.querySelector("#submit");
const submitBtn = document.querySelector("#submitBtn");

let answerList = document.getElementById('quizHeader');
let keepScore = document.querySelector('.keep-score');

let categoryListselected = "9";
let difficultyLevelselected = "easy";
let typeOfquestionselected = "multiple";
let numberOfquestionselected = "10";

let score = 0;


// Below is a function for this.
    // // Add event listeners to update selected values and URL on input change
        // numberOfquestions.addEventListener("input", () => {
        //     numberOfquestionselected = numberOfquestions.value;
        //     BASE_URL = `https://opentdb.com/api.php?amount=${numberOfquestionselected}&category=${categoryListselected}&difficulty=${difficultyLevelselected}&type=${typeOfquestionselected}`;

        // });
        // categoryLists.addEventListener("input", () => {
        //     categoryListselected = categoryLists.value;
        //     BASE_URL = `https://opentdb.com/api.php?amount=${numberOfquestionselected}&category=${categoryListselected}&difficulty=${difficultyLevelselected}&type=${typeOfquestionselected}`;
        // });

        // difficultyLevel.addEventListener("input", () => {
        //     difficultyLevelselected = difficultyLevel.value;
        //     BASE_URL = `https://opentdb.com/api.php?amount=${numberOfquestionselected}&category=${categoryListselected}&difficulty=${difficultyLevelselected}&type=${typeOfquestionselected}`;
        // });

const updateURL = () => {
    numberOfquestionselected = numberOfquestions.value;
    categoryListselected = categoryLists.value;
    difficultyLevelselected = difficultyLevel.value;

    BASE_URL = `https://opentdb.com/api.php?amount=${numberOfquestionselected}&category=${categoryListselected}&difficulty=${difficultyLevelselected}&type=${typeOfquestionselected}`;
}

numberOfquestions.addEventListener("input", updateURL);
categoryLists.addEventListener("input", updateURL);
difficultyLevel.addEventListener("input", updateURL);

const getQuestions = () => {
    
    return new Promise ((resolve, reject) => {

        // Hide submit button
        submitDiv.style.display = "none";

        const fetchData = async () => {
            BASE_URL = `https://opentdb.com/api.php?amount=${numberOfquestionselected}&category=${categoryListselected}&difficulty=${difficultyLevelselected}&type=${typeOfquestionselected}`;
          
            try {
              const response = await fetch(BASE_URL);
              if (!response.ok) {
                throw new Error('Failed to retrieve data');
              }
          
              const data = await response.json();
          
              if (data.results && data.results.length > 0) {
                resolve(data);
              } else {
                // No data retrieved, redirect to 404.html
                window.location.href = '404.html';
              }
            } catch (error) {
              console.error('An error occurred: ', error);
              reject(error);
            }
          };
          
          const handleSelectButtonClick = (e) => {
            e.preventDefault();
          
            fetchData();
          
            quizContainer.removeChild(quizHeading);
            quizContainer.removeChild(quizSelectorul);
            submitDiv.style.display = "block";
          };
          
          selectBtn.addEventListener("click", handleSelectButtonClick);
          
    }) 
    
} 
//suffle array
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
}

let currentQuestionIndex = 0; // Initialize the current question index



getQuestions()
   .then(data => {
    //    console.log(data);
       // console.log(data.results[0].question);

       // Function to update the displayed question
       function displayQuestion(index) {


           if (index >= 0 && index < data.results.length) {
               const questionData = data.results[index];

               const answerChoices = [
                   questionData.correct_answer,
                   questionData.incorrect_answers[0],
                   questionData.incorrect_answers[1],
                   questionData.incorrect_answers[2]
               ];
                   
               shuffleArray(answerChoices);

               answerList.innerHTML = `<h2 style="color: purple";>${index +1}: ${questionData.question}</h2>
                                       <ul id="answerLists">
                                           <li>
                                               <input type="radio" id="a" name="answer" class="answer" value="${answerChoices[0]}"></input>
                                               <label for="a">${answerChoices[0]}</label>
                                           </li>
                                           <li>
                                               <input type="radio" id="b" name="answer" class="answer" value="${answerChoices[1]}"></input>
                                               <label for="b">${answerChoices[1]}</label>
                                           </li>
                                           <li>
                                               <input type="radio" id="c" name="answer" class="answer" value="${answerChoices[2]}"></input>
                                               <label for="c">${answerChoices[2]}</label>
                                           </li>
                                           <li>
                                               <input type="radio" id="d" name="answer" class="answer" value="${answerChoices[3]}"></input>
                                               <label for="d">${answerChoices[3]}</label>
                                           </li>
                                       </ul>`;


                   
               // console.log(`Displaying Question ${index + 1}`);

               // console.log(questionData.correct_answer);

           }
       }
     
     

       function answerSelected() {
        const selectedAnswer = Array.from(document.querySelectorAll(".answer")).find(answer => answer.checked);
      
        return selectedAnswer ? selectedAnswer.value : undefined;
      }
      

       const handleAnswerSubmission = async () => {
        try {
          const correctAnswer = data.results[currentQuestionIndex - 1].correct_answer;
      
          const tempElement = document.createElement("div");
          tempElement.innerHTML = correctAnswer;
          const answerDecoded = tempElement.textContent;
      
          const answerValue = answerSelected();
      
          if (answerValue) {
            if (answerDecoded === answerValue) {
              score++;
              setQuizContainerStyle('#ABC270', 'white');
            } else {
              setQuizContainerStyle('#E25E3E', 'white');
            }
      
            const userScore = score;
            const maxScore = data.results.length;
            const percentage = ((userScore / maxScore) * 100).toFixed(1);
      
            if (currentQuestionIndex < data.results.length) {
              displayQuestion(currentQuestionIndex++);
            } else {
              handleQuizCompletion(percentage);
            }
          } else {
            setQuizContainerStyle('#E25E3E', 'white');
          }
        } catch (error) {
          console.error('An error occurred: ', error);
        }
      };
      
      const setQuizContainerStyle = (backgroundColor, color) => {
        quizContainer.style.backgroundColor = backgroundColor;
        quizContainer.style.color = color;
      };
      
      const handleQuizCompletion = (percentage) => {
        setQuizContainerStyle('whitesmoke', 'white');
        const passFailMsg =
          percentage < 50
            ? `<p style="text-align: center; font-weight: 700; font-size: 1.5rem; color: red"> Sorry you Failed! You scored ${percentage}%.</p>`
            : `<p style="text-align: center; font-weight: 700; font-size: 1.5rem; color: Green"> Congratulations! you passed. You scored ${percentage}%.</p>`;
      
        quizContainer.innerHTML = `
          <div>
            <h3 style="text-align: center; color: green; padding: 1rem; text-transform: uppercase">You are Done!</h3>
            ${passFailMsg}
            <a style="text-decoration:none" href="https://bajgait.com/projects/quiz-app">
              <button style="border: none; background: black; color: white;">Take a Quiz again</button>
            </a>
          </div>`;
      };
      
      submitBtn.addEventListener('click', handleAnswerSubmission);
      
       
        displayQuestion(currentQuestionIndex++);
})