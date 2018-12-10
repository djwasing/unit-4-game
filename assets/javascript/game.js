


$(document).ready(function () {
    console.log("ready")

    var yourHealth = 0;
    var enemyHealth = 0;
    var yourDamage = 8;
    var enemyDamage = 0;
    var randomDamage = [5, 15, 20];

    //choose your fighter, then choose your enemy
    $(".card.fighter").on("click", function chooseFighter() {
        $(this).detach().appendTo(".yourFighter");        //moves the card you clicked from current location to the your fighter location
        $(".fighter")
            .not(this)
            .removeClass("fighter")
            .addClass("enemy");                           //remove the fighter class, add enemy class to remaining cards
        $("#word").text("Enemy");                         //changes the word "Fighter" to the word "Enemy"
        yourHealth = $(this)
            .children(".card-body")
            .find("#health")
            .text();     //selects the health of the fighter you chose and assigns it to the fghterHealth var
        $(this)
            .children(".card-body")
            .find("#health")
            .addClass("yourHp");                         //locates the #health text of the card the user chose and adds the .yourHp class
        console.log("your health " + yourHealth);
        console.log("your damage " + yourDamage);
        $(".card").off("click", chooseFighter);           //stops the chooseFigher funtion
        
    });
    
    function chooseEnemy() {                            
        $(this).detach().appendTo(".enemyFighter");     //moves card from current location to enemyFighter location
        $(".enemy")                                     
            .not(this)
            .removeClass("enemy");                      //removes the enemy class from the remaining cards, but leaves it on this card
        enemyHealth = $(this)
            .children(".card-body")
            .find("#health")
            .text();                                    //selects the health of the fighter you chose and assigns it to the enemyHealth var
        $(this)                         
            .children(".card-body") 
            .find("#health")
            .addClass("enemyHp");                       //locates the #health text of the card the user chose and adds the .enemyHp class
        console.log("enemy health " + enemyHealth);
        enemyDamage = randomDamage[Math.floor(Math.random() * randomDamage.length)];        //randomly selects a damage for the enemy damage fromt he randomDamage array
        console.log("enemy damage " + enemyDamage);
        $(document).off("click", ".card.enemy", chooseEnemy);       //stops the chooseFighter func so the user can't keep picking enemys until current is defeated
    }
    
    $(document).on("click", ".card.enemy", chooseEnemy);        //runs the chooseEnemy func on click following the chooseFighter func
   

    //now that cards are in correct locations, begin battle func
    

        
        //$(".hpText").text(enemyHealth);
        
    
    $(".attackBtn").on("click", function battle() {
        //console.log("battle!!!");
        enemyHealth = enemyHealth - yourDamage;
        $(".enemyHp").text(enemyHealth);
        //console.log("enemy " + enemyHealth);
        yourHealth = yourHealth - enemyDamage;
        $(".yourHp").text(yourHealth);
        //console.log("you " + yourHealth);
        yourDamage = yourDamage + 8;
        //console.log("your damage " + yourDamage);
        if (enemyHealth <= 0) {
            alert("You won the duel! Choose a new enemy!");
            $(".card.enemy").hide();
            $(".card").addClass("enemy");
        }
        $(document).on("click", ".card.enemy", chooseEnemy);

        

    });

    

      

    //enemyHealth - yourDamage = enemyHealth
    //yourHealth - enemyDamage = yourHealth
    //yourDamage + 8 = yourDamage
    //no change to enemyDamage

    //run on.("click") until enemyHealth <= 0. 
    //then prompt user with alert to choose new enemy and run chooseEnemy func on click of enemy character

});