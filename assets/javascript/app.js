'use strict';

$(document).ready(function() {

    $("#messageSection").hide();
    
   
    


    

    $("#questionSpace").hide()
    let correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


 

    function randomNum(x) {
        const roll = Math.floor(Math.random() * x);
        return roll;
    }

    

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 5
                }, 1000 * 1);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        
        {
            "q": "'The Sun Also Rises' was written by:",
            "c": ["Ernest Hemingway", "George Eliot", "F Scott Fitzgerald", "Stephen Hawking"],
            "answer": 0
        },
        
        {
            "q": "Mary Shelley is best-known for which of the following novels?",
            "c": ["'The Awakening'", "'A Wrinkle In Time'", "'Frankenstein'", "'Little Women'"],
            "answer": 2
        },
        
        {
            "q": "This author wrote 'Brave New World'.",
            "c": ["George Orwell", "Aldous Huxley", "Joseph Conrad", "Margaret Mitchell"],
            "answer": 1
        },
        
        {
            "q": '"Call me Ishmael" is the famous opening line from which classic novel?',
            "c": ["'On the Road' by Jack Kerouac", "'As I Lay Dying' by William Faulkner", "'Ulysses' by James Joyce'", "'Moby-Dick' by Herman Melville"],
            "answer": 3
        },
        
        {
            "q": "Which Brontë sister was the author of 'Wuthering Heights'?",
            "c": ["Charlotte Brontë", "Emily Brontë", "Anne Brontë", "Elizabeth Brontë"],
            "answer": 1
        },
        
        {
            "q": "This author wrote 'One Hundred Years of Solitude.",
            "c": ["Gabriel García Márquez", "Paulo Coelho", "Carlos Fuentes", "Miguel de Cervantes"],
            "answer": 0
        },

        {
            "q": "'The Stranger' was written by this French writer:",
            "c": ["Louis-Ferdinand Céline", "Jean-Paul Sartre", "Albert Camus", "Marcel Proust"],
            "answer": 2
        },
        
    ]; // ADD MORE QUESTIONS


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
            resetGame(); // loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct
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

        setTimeout(startTrivia, 1000 * 15);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
