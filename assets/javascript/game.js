


$(document).ready(function () {
    console.log("ready")

    //choose your fighter, then choose your enemy
    function chooseFighter() {
        $(this).detach().appendTo(".yourFighter");      //moves the card you clicked from current location to the your fighter location
        $(".fighter")
            .not(this)
            .removeClass("fighter")
            .addClass("enemy");                         //remove the fighter class, add enemy class to remaining cards

        $("#word").text("Enemy");                       //changes the word "Fighter" to the word "Enemy"
        $(".card").off("click", chooseFighter);         //stops the chooseFigher funtion
        $(".card.enemy").on("click", chooseEnemy);      //runs the chooseEnemy function on the next click
    }
    
    function chooseEnemy() {                            
        $(this).detach().appendTo(".enemyFighter");     //moves card from current location to enemyFighter location
        $(".enemy")                                     
            .not(this)
            .removeClass("enemy");                      //removes the enemy class from the remaining cards, but leaves it on this card
        
    }
    
    $(".card.fighter").on("click", chooseFighter);      //call the chooseFigher fuction


    
});