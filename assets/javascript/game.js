


$(document).ready(function () {
    console.log("ready")

    var yourHealth = 0;
    var enemyHealth = 0;
    var yourDamage = 8;
    var enemyDamage = 0;
    var randomDamage = [5, 10, 12];
    //choose your fighter, then choose your enemy
    $(".card.fighter").on("click", function chooseFighter() {
        $(this).detach().appendTo(".yourFighter");      //moves the card you clicked from current location to the your fighter location
        $(".fighter")
            .not(this)
            .removeClass("fighter")
            .addClass("enemy");                         //remove the fighter class, add enemy class to remaining cards
        $("#word").text("Enemy");                       //changes the word "Fighter" to the word "Enemy"
        yourHealth = $(this).children(".card-body").find("#health").text();
        console.log("your health " + yourHealth);
        console.log("your damage " + yourDamage);
        $(".card").off("click", chooseFighter);         //stops the chooseFigher funtion
        //$(".card.enemy").on("click", chooseEnemy);      //runs the chooseEnemy function on the next click
    });
    
    function chooseEnemy() {                            
        $(this).detach().appendTo(".enemyFighter");     //moves card from current location to enemyFighter location
        $(".enemy")                                     
            .not(this)
            .removeClass("enemy");                      //removes the enemy class from the remaining cards, but leaves it on this card
        enemyHealth = $(this).children(".card-body").find("#health").text();
        console.log("enemy health " + enemyHealth);
        enemyDamage = randomDamage[Math.floor(Math.random() * randomDamage.length)];
        console.log("enemy damage " + enemyDamage);
        $(document).off("click", ".card.enemy", chooseEnemy);
    }
    
    $(document).on("click", ".card.enemy", chooseEnemy);
   

    //now that cards are in correct locations, begin attack sequence
    //first, 
});