'use strict';

//initialize .js
$(document).ready(function () {
    $("#gameScreen").hide();
    //initialize button to start game
    $('.startGame').on("click", function () {

        $(this).hide();
        $('#startScreen').hide();
        $('#questionSpace').show();
        console.log('start button disappearssssss');
    });






    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function countDown() {
        $('.pickAnswer').click(function () {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function () {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }



    //create object to hold all questions and answers
    const game = [{
            question: "'The Sun Also Rises' was written by:",
            possibleAnswers: ["Ernest Hemingway", "George Eliot", "F Scott Fitzgerald", "Stephen Hawking"],
            answer: 0
        },

        {
            question: "Mary Shelley is best-known for which of the following novels?",
            possibleAnswers: ["'The Awakening'", "'A Wrinkle In Time'", "'Frankenstein'", "'Little Women'"],
            answer: 2
        },

        {
            question: "This author wrote 'Brave New World'.",
            possibleAnswers: ["George Orwell", "Aldous Huxley", "Joseph Conrad", "Margaret Mitchell"],
            answer: 1
        },

        {
            question: '"Call me Ishmael" is the famous opening line from which classic novel?',
            possibleAnswers: ["'On the Road' by Jack Kerouac", "'As I Lay Dying' by William Faulkner", "'Ulysses' by James Joyce'", "'Moby-Dick' by Herman Melville"],
            answer: 3
        },

        {
            question: "Which Brontë sister was the author of 'Wuthering Heights'?",
            possibleAnswers: ["Charlotte Brontë", "Emily Brontë", "Anne Brontë", "Elizabeth Brontë"],
            answer: 1
        },

        {
            question: "This author wrote 'One Hundred Years of Solitude.",
            possibleAnswers: ["Gabriel García Márquez", "Paulo Coelho", "Carlos Fuentes", "Miguel de Cervantes"],
            answer: 0
        },

        // ADD MORE QUESTIONS
    ]

    //event to start timer
    // let number = 30;
    // $('#timeLeft').on('click', run);

    // function decrement() {
    //     number--;
    //     $('#timeLeft').html('<h2>' + number + "seconds" +'</h2>');
    //     if (number === 0) {
    //         stop();   
    //     }
    // }

    // function run() {
    //     counter = setInterval(decrement, 1000);
    // }

    // function stop() {
    //     clearInterval(counter);
    // }

    // run();

    //create form for questions

    // function formTemplate(data) {
    //     var questionString = "<form id = 'questionOne'>" + data.question + "<br>";
    //     var possibleAnswers = data.possibleAnswers;
    //     for (var i = 0; i < possibleAnswers.length; i++) {
    //         var possible = possibleAnswers[i];
    //         console.log(possible);
    //         questionString = questionString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;

    //     }
    //     return questionString + "</form>";
    // }
    // window.formTemplate = formTemplate;

    // function buildQuestions() {
    //     var questionHTML = ''
    //     for (var i = 0; i < game.questions.length; i++) {
    //         questionHTML = questionHTML + formTemplate(game.questions[i]);
    //     }
    //     $('#question-box').append(questionHTML);

    // }

    // function isCorrect(question) {
    //     var answers = $('[name=' + question.id + ']');
    //     var correct = answers.eq(question.answer);
    //     var checked = correct.is(':checked');
    //     return checked;
    // }

    // buildQuestions();


    //for loop for answers array


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function () {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }











});