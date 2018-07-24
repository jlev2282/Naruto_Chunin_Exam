$(document).ready(function(){
    var gameVariables = {
        instructions : "There are four rounds to the Chunin exam. In each round you will have to defeat your opponent by" +
                       " using your attack skills to reduce their health points to zero, but be careful. Each time you attack," +
                       " your opponent will attack in return, reducing your health points by the level of their attack. Choose" +
                       " your opponents wisely because your health point will not regenerate. With each attack, your confidence and" +
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
            $("#characters").css("background-color", "yellow");
            $("#characters").fadeOut("fast");
            $("#characters").css("background-color", "black");
            $("#characters").fadeIn(2500);
            character_array = gameVariables.characters;
            for(i=0;i<character_array.length;i++){
                html = "<div class='col-md'><img src='"+character_array[i]+"' class='character-image'></div>";
                $("#characters").append(html);
            }
        },
        hint: "Maybe start with a weaker opponent and hone your attack ability on them before moving on to stronger foes?",
        characters: ["assets/images/naruto_ready.jpeg","assets/images/sakura_ready.jpeg","assets/images/sasuke_ready.jpeg","assets/images/shikamaru_ready.png","assets/images/neji_ready.jpg"],


    };

    $("#start").on("click", gameVariables.start);


});