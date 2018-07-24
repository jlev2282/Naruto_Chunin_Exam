$(document).ready(function(){
    var gameVariables = {
        instructions : "There are four rounds to the Chunin exam. In each round you will have to defeat your opponent by" +
                       " using your attack skills to reduce their health points to zero, but be careful. Each time you attack" +
                       " your opponent will attack in return, reducing your health points by the level of their attack. Choose" +
                       " your opponents wisely because your health point will not regenerate. With each attack, your confidence and" +
                       " ability will grow making each subsequent attack stronger than the previous one.",
        start: function(){
            //clear the banner div and replace with game instructions
            info = $("#user-info");
            info.fadeOut(1500);
            setTimeout(function(){info.empty()}, 1500);
            info.fadeIn(3000);
            setTimeout(function(){info.html("<p>"+gameVariables.instructions+"</p>")}, 2000);
            //show all the characters available to choose from

        },
        hint: "Maybe start with a weaker opponent and hone your attack ability on them before moving on to stronger foes?",


    };

    $("#start").on("click", gameVariables.start);


});