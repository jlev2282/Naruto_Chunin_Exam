$(document).ready(function(){
    var gameVariables = {
        character: null,
        characters: [
            {
                name: "Naruto Uzamaki",
                profile_pic: "assets/images/naruto_ready.jpeg",
                combat_pic: "assets/images/naruto_combat.jpg",
                chakra: 99,
                attack_power: 25,
                counter_attack_power:25,
                win_pic: "assets/images/naruto_win.jpg",
                // lose_pic:
                saying: "One day I WILL be the Hokage!",
            },
            {
                name: "Sakura Haruno",
                profile_pic: "assets/images/sakura_ready.jpeg",
                combat_pic: "assets/images/sakura_combat2.jpg",
                chakra: 75,
                attack_power: 30,
                counter_attack_power: 15,
                win_pic: "assets/images/sakura_win.jpg",
                // lose_pic:
                saying: "CHA!!!",
            },
            {
                name: "Sasuke Uchiha",
                profile_pic: "assets/images/sasuke_ready.jpeg",
                combat_pic: "assets/images/sasuke_profile.jpg",
                chakra: 80,
                attack_power: 25,
                counter_attack_power: 20,
                win_pic: "assets/images/sasuke_win.jpg",
                // lose_pic:
                saying: "I'll never acknowledge you.",
            },
            {
                name: "Shikamaru Nara",
                profile_pic: "assets/images/shikamaru_ready.png",
                combat_pic: "assets/images/shikamaru_combat.jpg",
                chakra: 70,
                attack_power: 20,
                counter_attack_power: 10,
                win_pic: "assets/images/shikamaru_win.jpg",
                // lose_pic:
                saying: "What a drag..",
            },
            {
                name: "Neji Hyuga",
                profile_pic: "assets/images/neji_ready.jpg",
                combat_pic: "assets/images/neji_combat.jpg",
                chakra:75,
                attack_power: 20,
                counter_attack_power: 20,
                win_pic: "assets/images/neji_ready.jpg",
                // lose_pic:
                saying: "I have no choice but to fulfill my destiny.",
            }
        ],
        characterStats: null,
        defeated: [],
        gameStarted: false,
        fighting: false,
        opponent: null,
        opponents: [],
        opponentStats: null,
        rate: 1.5,
        ready2fight: false,
        round: 1,
        stats : ["chakra", "attack_power", "counter_attack_power"],
        instructions : "This year's Chunin exams are hosted by the Village Hidden in the Leaves. There are four rounds to the exam. In each round you will have to defeat your opponent by" +
                       " using your attack skills to reduce their chakra(life force) to zero, but be careful. Each time you attack," +
                       " your opponent will attack in return, reducing your chakra by the level of their attack. Choose" +
                       " your opponents wisely because your chakra will not regenerate. With each attack, your confidence and" +
                       " ability will grow making each subsequent attack stronger than the previous one. Mouse over each character to learn their strengths"+
                       " and when ready, click your choice to begin.",
        hint: "Maybe start with a weaker opponent and increase your attack ability fighting them before moving on to a stronger foe?",
        checkHealth: function(character, opponent, characterHealth, opponentHealth){
          if (characterHealth > 0 && opponentHealth > 0) {
              //refresh character stats
              gameVariables.updateGameStats(character, opponent);
          } else if (characterHealth > 0 && opponentHealth <= 0 ) {
              gameVariables.updateGameStats(character, opponent);
              alert("YOU WIN THE ROUND! Click ok to continue");
              gameVariables.endRound();

          } else {
              gameVariables.updateGameStats(character, opponent);
              alert("You failed the Chunin Exam!");
              replay = confirm("Would you like to play again?");
              if(replay === true){
                  //restart game
                  gameVariables.resetStage();
                  gameVariables.start();
              }
          }
        },
        fadeOutInInfo: function(header, body){
            //use to quickly do a fadeOut/FadeIn of banner with info change
            //make sure to pass header and body in a way that are usable by the .text()
            $("#user-info-header, #user-info-body").fadeOut(1500).promise().done(function(){
                $("#user-info-body, #user-info-header").fadeIn(2000);
            });

            //empty the banner completely after 1 seconds
            setTimeout(function(){
                $("#user-info-header, #user-info-body").empty();
            }, 1000);

            //replace info section with instructions header and game instructions
            setTimeout(function(){
                $("#user-info-header").text(header);
                $("#user-info-body").text(body);
            }, 2000);
        },
        endRound: function(){
            if(gameVariables.round < 4){
                gameVariables.round++;
                //set state of fighting to false
                gameVariables.fighting = false; 

                //clear actions and opponents div
                $('#opponent, #actions').empty();

                character= gameVariables.character;

                opponent = gameVariables.opponent;
                var opponentArray = gameVariables.opponents

                //remove defeated opponent from opponents and add to defeated array
                gameVariables.defeated.push(opponent);
                index = opponentArray.indexOf(opponent);
                if (index > -1) {
                opponentArray.splice(index, 1);
                }

                gameVariables.opponent = null;

                //allow user to select opponent for next round
                gameVariables.selectOpponent(character);

            
            } else {
                //clear actions and opponents div
                $('#actions, #opponent').empty();
                alert('You win! You have passed the Chunin exam!');
                replay = confirm("Would you like to play again?");
                if(replay === true){
                    //restart game
                    gameVariables.resetStage();
                    gameVariables.start();
                }
            }
        },
        isAnOpponent: function(character){
            location = gameVariables.opponents.indexOf(character);
            if( location >= 0) {
                return true;
            }
        },
        getCharacter: function(value){
            //use this function to find data on a particular character by "data-name"
            character= "boo";
            for(i=0; i<gameVariables.characters.length; i++){
                if(value == gameVariables.characters[i].name){
                    character = gameVariables.characters[i];
                }
            }
            return character;
        },
        judgeRound: function(){
            //set fighting to true
            gameVariables.fighting = true;
            if(gameVariables.round ===1){
                 Fighter = gameVariables.getCharacter(gameVariables.character);
            } else {
                Fighter = gameVariables.characterStats;
            }
            Opponent= gameVariables.getCharacter(gameVariables.opponent);

            myFighter = Object.create(Fighter);
            myOpponent = Object.create(Opponent);

            gameVariables.characterStats = myFighter;
            gameVariables.opponentStats = myOpponent;

            gameVariables.updateGameStats(Fighter, Opponent);

        },
        resetStage: function(){
            $("#user-info-header, #user-info-body, #characters, .arena-div").empty();
            gameVariables.character = null;
            gameVariables.characterStats = null;
            gameVariables.gameStarted = false;
            gameVariables.fighting = false;
            gameVariables.opponent = null;
            gameVariables.opponents = [];
            gameVariables.opponentStats = null;
            gameVariables.ready2fight = false;
            gameVariables.round = 1;
            },
        showCharacters: function(){
            //supposed to flash gold on background of character div then fade and switch back to black as it comes
            //back in to focus but the flash part isn't working yet
            // $("#characters").css("background-color", "yellow");
            $("#characters").fadeOut("fast");
            $("#characters").fadeIn(2500);
            setTimeout(function(){
                $("#characters").css("background-color", "black");
                character_object = gameVariables.characters;
                for(i=0;i<character_object.length;i++){
                    html = "<div class='col-md'><img src='"+character_object[i].profile_pic+"' class='character-image' data-name='"+
                        character_object[i].name+"'></div>";
                    $("#characters").append(html);
                }
            }, 500);
        },
        selectOpponent: function(character){
            //creat html for banner
            html = "<h2>SELECT YOUR OPPONENT FOR ROUND "+gameVariables.round+"!</h2>";

            $("#user-info-header, #user-info-body").fadeOut(1500).promise().done(function(){
                $("#user-info-body, #user-info-header").fadeIn(2000);
            });

            //empty the banner completely after 1 seconds
            setTimeout(function(){
                $("#user-info-header, #user-info-body").empty();
            }, 1000);

            //replace info section with instructions header and game instructions
            setTimeout(function(){
                $("#user-info-header").text(character.toUpperCase());
                $("#user-info-body").html(html);
            }, 2000);

            //change state to ready2fight true
            gameVariables.ready2fight = true;

        },
        start: function(){
            //clear the banner div and replace with game instructions

            $("#user-info-header, #user-info-body").fadeOut(1500).promise().done(function(){
                $("#user-info-body, #user-info-header").fadeIn(2000);
            });

            //empty the banner completely after 1 seconds
            setTimeout(function(){
                $("#user-info-header, #user-info-body").empty();
            }, 1000);

            //replace info section with instructions header and game instructions
            setTimeout(function(){
                $("#user-info-header").text("INSTRUCTIONS");
                $("#user-info-body").text(gameVariables.instructions);
            }, 2000);

            //show all the characters available to choose from
            gameVariables.showCharacters();

        },
        startRound: function(){
            //change background to arena field 
            // $('body').css('background-image', 'url(/images/arena_field_grass.jpg)');

            $("#user-info-header, #user-info-body").fadeOut(1500).promise().done(function(){
                $("#user-info-body, #user-info-header").fadeIn(2000);
            });

            //empty the banner completely after 1.5 seconds
            setTimeout(function(){
                $("#user-info-header, #user-info-body").empty();
            }, 1000);

            //replace info section with current round and matchup
            setTimeout(function(){
                $("#user-info-header").text("ROUND "+gameVariables.round);
                $("#user-info-body").html("<h3>"+gameVariables.character+" VS "+gameVariables.opponent+"</h3>");
            }, 2000);

            //call judgeRound to determine hits and winner
            gameVariables.judgeRound();

        },
        updateGameStats: function(myFighter, myOpponent){
            if(gameVariables.fighting){
                $('#actions').empty();
            }
            fightPanel = "<div class='row' style='margin-top: 25px;'><div class='col'><button class='btn btn-warning btn-block' id='attack'>ATTACK</button></div></div>";
            fightPanel2 = "<div class='row' id='stats'><div class='col' id='characterStats'></div><div class='col' id='opponentStats'></div></div>";
            $('#actions').append(fightPanel2, fightPanel);
            for(i=0;i<gameVariables.stats.length;i++) {
                mystat = myFighter[gameVariables.stats[i]];
                html1 = "<p style='background: white; margin-top: 5px;'>" + gameVariables.stats[i] + ": " + mystat + "</p><br>";
                $('#characterStats').append(html1);

                opponentstat = myOpponent[gameVariables.stats[i]];
                html2 = "<p style='background: white; margin-top: 5px;'>" + gameVariables.stats[i] + ": " + opponentstat + "</p><br>";
                $('#opponentStats').append(html2);
            }
        }
    };

    //start of events outside of gameVariables 

    $("#start").on("click", gameVariables.start);

    //will populate the arena with data on currently moused over character if game has not yet started
    $(document).on("mouseover", ".character-image", function(){
        currentCharacter = this.dataset.name;
        character = gameVariables.getCharacter(currentCharacter);
        // found = gameVariables.isAnOpponent(currentCharacter);

        if(gameVariables.gameStarted == false) {

            html = "<div class='card text-center' style='width: 18rem; max-height: 100%;'><img class='card-img-top' style='height: 22vh;' src='"+character.win_pic+"' alt='"+currentCharacter+"'>"+
                    "<div class='card-header card-styling'><h5 class='card-title'>"+character.name+"</h5></div>"+
                    "<div class='card-body><p class='card-text card-styling'>Favorite Saying: \""+character.saying+"\"</p></div><ul class='list-group list-group-flush'>"+
                    "<li class='list-group-item card-styling'>Chakra: "+character.chakra+"</li><li class='list-group-item'>Attack: "+character.attack_power+"</li>"+
                    "<li class='list-group-item card-styling'>Counter Attack: "+character.counter_attack_power+"</li></ul></div>";

            $("#actions").append(html);
            // $("#opponent").append(traitList);
        }

        if(gameVariables.ready2fight === true) {
            //get index of character, if not in opponents, don't allow
            validOpponent = gameVariables.opponents.indexOf(currentCharacter);

            if( currentCharacter == gameVariables.character || validOpponent === -1){
                $(this).css("border", "solid");
                $(this).css("border-color", "red");
            } else if (gameVariables.opponent != null && currentCharacter != gameVariables.character) {
                return false;
            } else if (currentCharacter != gameVariables.character && gameVariables.opponent == null){
                $(this).css("border", "solid");
                $(this).css("border-color", "blue");
            } else {
                return false;
            }

        }
    });

    //will empty arena of character info after mouseout
    $(document).on("mouseout", ".character-image", function(){
        if(gameVariables.gameStarted == false && gameVariables.ready2fight == false) {
            $("#actions").empty();

        }

        if(gameVariables.ready2fight == true) {
            if( currentCharacter == gameVariables.character){
                $(this).css("border", "solid");
                $(this).css("border-color", "yellow");
            } else if (currentCharacter == gameVariables.opponent || currentCharacter == gameVariables.character){
                return false;
            } else {
                $(this).css("border", "solid");
                $(this).css("border-color", "");
            }

        }
    });

    //onclick that picks characters and moves them to arena
    $(document).on("click", ".character-image", function(){
        if(gameVariables.gameStarted == false) {
            //change game state to true for started
            gameVariables.gameStarted = true;

            //change background to arena field 
            // $("body").css('background-image', 'url(images/arena_field_grass.jpg)');

            //get info for selected character and assign to "selected"
            selectedInfo = gameVariables.getCharacter(this.dataset.name);

            //indicate character has been selected
            $(this).css("border", "solid");
            $(this).css("border-color", "yellow");

            //make copy of chosen character and highlight the selection
            selected = $(this).clone();
            selected.attr("src", selectedInfo.combat_pic);
            selected.removeClass("character-image");
            selected.addClass("fighter");
            selected.css("max-height", "100%");


            //assign chosen character to character variable
            gameVariables.character = this.dataset.name;

            //assign remaining characters to opponents by pushing into opponents array
            for(i=0;i<gameVariables.characters.length; i++){
                if(gameVariables.character != gameVariables.characters[i].name){
                    gameVariables.opponents.push(gameVariables.characters[i].name);
                }
            }

            //clear arena of any info from mouseovers
            $("#character").css("text-align", "center");
            $("#actions").empty();
            //grab selected character and append to character div
            $("#character").html(selected);

            //create element to display chakra, attack points, and counter attack points

            //append element to character div to left of character

            //prompt user to select opponent
            gameVariables.selectOpponent(gameVariables.character);
        }

        //for when character is chosen and now it's time to pick an opponent
        if(gameVariables.ready2fight == true) {
            //get index of character, if not in opponents, don't allow
            validOpponent = gameVariables.opponents.indexOf(currentCharacter);

            if( currentCharacter == gameVariables.character || validOpponent === -1){
                return false;
            } else {
                if(gameVariables.opponent == null){
                    gameVariables.opponent = this.dataset.name;

                    //get info for selected opponent and assign to "selected"
                    selectedInfo = gameVariables.getCharacter(this.dataset.name);

                    //indicate character has been selected
                    $(this).css("border", "solid");
                    $(this).css("border-color", "blue");

                    //make copy of chosen character and highlight the selection
                    selected = $(this).clone();
                    selected.attr("src", selectedInfo.combat_pic);
                    selected.removeClass("character-image");
                    selected.addClass("fighter");
                    selected.css("max-height", "100%");

                    //grab selected character and append to character div
                    $("#opponent").html(selected);
                }
                
            }

            if(gameVariables.fighting == true) {
                return false;
            }

            opponent = gameVariables.opponent;
            character = gameVariables.character;


            //call to start the round
            gameVariables.startRound();


        }
    });

    $(document).on("click", "#attack", function(){
        character = gameVariables.characterStats;
        opponent = gameVariables.opponentStats;

        characterHealth = character.chakra;
        opponentHealth = opponent.chakra;

        characterAttack = character.attack_power;
        opponentCounterAttack = opponent.counter_attack_power;

        //check to make sure opponent has not died, and if not, calculate new stats and evaluate round
        if(opponentHealth > 0){
            alert("You dealt "+characterAttack+" damage!");
            //decrease opponents health by characters attack points
            opponentHealth -= characterAttack;
            gameVariables.opponentStats.chakra = opponentHealth;

            //decrease characters health by opponents count-attack-points
            characterHealth -= opponentCounterAttack;
            gameVariables.characterStats.chakra = characterHealth;

            //increase characters attack points by rate
            characterAttack = Math.floor(characterAttack * gameVariables.rate);
            gameVariables.characterStats.attack_power = characterAttack;

            //call checkHealth function
            gameVariables.checkHealth(character, opponent, characterHealth, opponentHealth)
        } else {
            return false;
        }
    });


});


