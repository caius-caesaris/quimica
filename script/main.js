import questionsJSON from "./JSON/questions.json" with { type: "json" }

const MAX_QUESTIONS = 5

function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

let selectedQuestions = shuffle(questionsJSON.questions).slice(0, MAX_QUESTIONS)

let currentIndex = 0
let corrects = 0
let correctArray = []

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
        correctArray.push(true)
    } else {
        correctArray.push(false)
    }

    currentIndex++

    if (currentIndex < selectedQuestions.length) {
        renderQuestion(currentIndex)
    } else {
        resetQuiz()
        return
    }
}

function resetQuiz() {
    questionBox.style.display = "none"
    postQuiz.style.display = "block"
    resetButton.style.display = "block"
    postQuiz.innerHTML = `<br>Você acertou ${corrects} de ${selectedQuestions.length} perguntas.<br>`

    correctArray.forEach((answer, i) => {
        if (answer) {
            postQuiz.innerHTML += `<br>A questão ${i + 1} está correta`
        } else {
            postQuiz.innerHTML += `<br>A questão ${i + 1} está incorreta`
        }
    })

    resetButton.addEventListener("click", () => {
        selectedQuestions = shuffle(questionsJSON.questions).slice(0, MAX_QUESTIONS)

        currentIndex = 0
        corrects = 0
        correctArray = []

        questionBox.style.display = "block"
        postQuiz.style.display = "none"
        resetButton.style.display = "none"

        renderQuestion(currentIndex)
    })
}

nextButton.addEventListener("click", checkAnswer)

renderQuestion(currentIndex)
