import questionsJSON from "./JSON/questions.json" with { type: "json" };

const MAX_QUESTIONS = 5

function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

const selectedQuestions = shuffle(questionsJSON.questions).slice(0, MAX_QUESTIONS)

let currentIndex = 0
let corrects = 0

const description = document.querySelector("#question-description")
const labels = [1, 2, 3, 4].map(i => document.querySelector(`#label${i}`))
const radios = [1, 2, 3, 4].map(i => document.querySelector(`#alt${i}`))
const nextButton = document.querySelector("#next-button")
const postQuiz = document.querySelector("#post-quiz")
const resetButton = document.querySelector("#reset-button")
const questionBox = document.querySelector("#question")

function renderQuestion(index) {
    const question = selectedQuestions[index]

    description.innerHTML = question.description

    question.options.forEach((option, i) => {
        labels[i].innerHTML = option
        radios[i].checked = false
    })
}

function checkAnswer() {
    const question = selectedQuestions[currentIndex]
    const selectedIndex = radios.findIndex(radio => radio.checked)

    if (selectedIndex == -1) {
        alert("Selecione uma alternativa antes de continuar.") // Alterar depois para HTML
        return
    }

    if (selectedIndex == question.correct) {
        corrects++
    }

    currentIndex++

    if (currentIndex < selectedQuestions.length) {
        renderQuestion(currentIndex)
    } else {
        questionBox.style.display = "none"
        postQuiz.style.display = "block"
        resetButton.style.display = "block"
        postQuiz.innerHTML = `Você acertou ${corrects} de ${selectedQuestions.length} perguntas.`

        resetButton.addEventListener("click", () => {
            currentIndex = 0
            corrects = 0
            questionBox.style.display = "block"
            postQuiz.style.display = "none"
            resetButton.style.display = "none"
            renderQuestion(currentIndex)
        })
    }
}

nextButton.addEventListener("click", checkAnswer)

renderQuestion(currentIndex)
