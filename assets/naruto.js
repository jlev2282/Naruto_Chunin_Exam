$(document).ready(function(){
    var gameVariables = {
        gameStarted: false,
        character: null,
        opponents: [],
        opponent: null,
        round: 1,
        instructions : "There are four rounds to the Chunin exam. In each round you will have to defeat your opponent by" +
                       " using your attack skills to reduce their chakra(life force) to zero, but be careful. Each time you attack," +
                       " your opponent will attack in return, reducing your chakra by the level of their attack. Choose" +
                       " your opponents wisely because your chakra will not regenerate. With each attack, your confidence and" +
                       " ability will grow making each subsequent attack stronger than the previous one.",
        start: function(){
            //clear the banner div and replace with game instructions
            info = $("#user-info");
            info_header = $("#user-info-header");
            info_body = $("#user-info-body");
            //start to fad out the banner over 1.5 seconds
            info.fadeOut(1500);
            //empty the banner completely after 1.5 seconds
            setTimeout(function(){
                info_header.empty();
                info_body.empty();
                }, 1500);
            //start to to fade back in banner to show new instructions
            info.fadeIn(3000);
            //banner should be faded out by now and fire code to fade back in banner a
            setTimeout(function(){
                info_header.text("INSTRUCTIONS");
                info_body.text(gameVariables.instructions)
                }, 2000);
            //show all the characters available to choose from
            gameVariables.show_characters();
        },
        show_characters: function(){
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
        hint: "Maybe start with a weaker opponent and increase your attack ability fighting them before moving on to a stronger foe?",
        characters: [
             {
                name: "Naruto Uzamaki",
                profile_pic: "assets/images/naruto_ready.jpeg",
                combat_pic: "assets/images/naruto_combat.jpg",
                chakra: 99,
                attack_power: 75,
                counter_attack_power:75,
                win_pic: "assets/images/naruto_win.jpg",
                // lose_pic:
                saying: "One day I WILL be the Hokage!",
            },
            {
                name: "Sakura Haruno",
                profile_pic: "assets/images/sakura_ready.jpeg",
                combat_pic: "assets/images/sakura_combat2.jpg",
                chakra: 75,
                attack_power: 90,
                counter_attack_power: 80,
                win_pic: "assets/images/sakura_win.jpg",
                // lose_pic:
                saying: "CHA!!!",
            },
            {
                name: "Sasuke Uchiha",
                profile_pic: "assets/images/sasuke_ready.jpeg",
                combat_pic: "assets/images/sasuke_profile.jpg",
                chakra: 80,
                attack_power: 80,
                counter_attack_power: 80,
                win_pic: "assets/images/sasuke_win.jpg",
                // lose_pic:
                saying: "I'll never acknowledge you.",
            },
            {
                name: "Shikamaru Nara",
                profile_pic: "assets/images/shikamaru_ready.png",
                combat_pic: "assets/images/shikamaru_combat.jpg",
                chakra: 70,
                attack_power: 75,
                counter_attack_power: 90,
                win_pic: "assets/images/shikamaru_win.jpg",
                // lose_pic:
                saying: "What a drag..",
            },
             {
                name: "Neji Hyuga",
                profile_pic: "assets/images/neji_ready.jpg",
                combat_pic: "assets/images/neji_combat.jpg",
                chakra:75,
                attack_power: 80,
                counter_attack_power: 85,
                win_pic: "assets/images/neji_ready.jpg",
                // lose_pic:
                saying: "I have no choice but to fulfill my destiny.",
             }
        ],
        //use this function to find data on a particular character by "data-name"
        getCharacter: function(value){
            character= "boo";
            for(i=0; i<gameVariables.characters.length; i++){
                if(value == gameVariables.characters[i].name){
                    character = gameVariables.characters[i];
                }
            }
            return character;
        },
        selectOpponent: function(){
            html = "<h3>SELECT YOUR OPPONENT FOR ROUND "+gameVariables.round+"!";
            $("#actions").html(html);
        }
    };


    $("#start").on("click", gameVariables.start);

    //will populate the arena with data on currently moused over character if game has not yet started
    $(document).on("mouseover", ".character-image", function(){
        if(gameVariables.gameStarted == false) {
            currentCharacter = this.dataset.name;
            character = gameVariables.getCharacter(currentCharacter);

            html = "<div class='card text-center' style='width: 18rem;'><img class='card-img-top' style='height: 23vh;' src='"+character.win_pic+"' alt='"+currentCharacter+"'>"+
                    "<div class='card-header'><h5 class='card-title'>"+character.name+"</h5></div>"+
                    "<div class='card-body><p class='card-text'>Favorite Saying: \""+character.saying+"\"</p></div><ul class='list-group list-group-flush'>"+
                    "<li class='list-group-item'>Chakra: "+character.chakra+"</li><li class='list-group-item'>Attack: "+character.attack_power+"</li>"+
                    "<li class='list-group-item'>Counter Attack: "+character.counter_attack_power+"</li></ul></div>";

            $("#actions").append(html);
            // $("#opponent").append(traitList);
        }
    });

    //will empty arena of character info after mouseout
    $(document).on("mouseout", ".character-image", function(){
        if(gameVariables.gameStarted == false) {
            $("#actions").empty();

        }
    });

    //onclick that picks character and moves them to arena
    $(document).on("click", ".character-image", function(){
        if(gameVariables.gameStarted == false) {
            //change game state to true for started
            gameVariables.gameStarted = true;

            //change background to arena field 
            // $("body").css('background-image', 'url(images/itachi_solo.jpg)');

            //get info for selected character and assign to "selected"
            selectedInfo = gameVariables.getCharacter(this.dataset.name);

            //indicate character has been selected
            $(this).css("border", "solid");
            $(this).css("border-color", "yellow");

            //make copy of chosen character and highlight the selection
            selected = $(this).clone();
            selected.attr("src", selectedInfo.combat_pic);
            selected.removeClass("character-image");
            selected.addClass("character");
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
            $("#character").empty();
            $("#character").css("text-align", "center");
            $("#opponent").empty();
            //grab selected character and append to character div
            $("#character").html(selected);

            //create element to display chakra, attack points, and counter attack points

            //append element to character div to left of character

            //prompt user to select opponent
            gameVariables.selectOpponent();
        }
    });


});


