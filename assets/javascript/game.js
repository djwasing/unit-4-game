


$(document).ready(function () {
    console.log("ready")

    var yourHealth = 0;
    var enemyHealth = 0;
    var yourDamage = 0;
    var enemyDamage = 0;
    var randomDamage = [8, 10, 15, 18];              //random damages the enemys can deal to the user card
    var wins = 0;
    var alertDiv = $("#alert");
    var alertTitle = $("#messageTitle");
    var alertMessage = $("#message");

    $(".attackBtn").hide();
    //$("#continue").hide();


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
            .text();                                      //selects the health of the fighter you chose and assigns it to the fghterHealth var
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
        enemyDamage = randomDamage[Math.floor(Math.random() * randomDamage.length)];        //randomly selects a damage for the enemy damage from the randomDamage array
        console.log("enemy damage " + enemyDamage);
        $(document).off("click", ".card.enemy", chooseEnemy);       //stops the chooseEnemy func so the user can't keep picking enemys until current is defeated        
        if (yourHealth <= 0) {                                      //if you health is <= 0 you cannot choose a new enemy
            $(document).off("click", ".card.enemy", chooseEnemy);
        }
        $(".attackBtn").show();
        $("#continue").hide();
        alertDiv.addClass("d-none");
    }
    
    $(document).on("click", ".card.enemy", chooseEnemy);        //runs the chooseEnemy func on click following the chooseFighter func
    

    //now that cards are in correct locations, begin battle func

    
    
    $(".attackBtn").on("click", function battle() {            //runs the battle func when the attackBtn is clicked
        //console.log("battle!!!");
        enemyHealth = enemyHealth - yourDamage;                 //subtracts the damage the user gives enemy from the enemyHealth and print it to the page
        if (enemyHealth >= 0) {
            $(".enemyHp").text(enemyHealth);
        }  
        //console.log("enemy " + enemyHealth);
        yourHealth = yourHealth - enemyDamage;              //subtract the damage the user receives from the enemy and prints it to the page
        if (yourHealth >= 0) {
            $(".yourHp").text(yourHealth);
        }
        //console.log("you " + yourHealth);
        yourDamage = yourDamage + 8;                        //adds 8 damage points to grow the user damage
        //console.log("your damage " + yourDamage);
        $("#heroDamage").text(yourDamage);                  //tells the user how much damage they are dealing the enemy
        $("#villanDamage").text(enemyDamage);               //tells the user how much damage they are receiving
        checkHealth();                                      //runs checkHealth func
    });

    function checkHealth() {    
        if (enemyHealth <= 0) {
            alertDiv.removeClass("d-none alert-warning")
                .addClass("alert-success show"); 
            alertTitle.text("You won the duel!");
            alertMessage.text("Choose a new enemy to continue");                                
            $(".card.enemy").hide();                        //once and enemy is defeated, their card disapears
            $(".attackBtn").hide();
            $(".card").addClass("enemy");                   //adds the enemy class to the remaining cards so they can be clicked
            //$("#continue").show();                          //shows a message requesting the user to select a new enemy
            wins = wins + 1;                                //increases wins var by 1
        }
        
        $(document).on("click", ".card.enemy", chooseEnemy);        //runs the choose enemy func when enemy card is clicked. 

        if (yourHealth <= 0 && enemyHealth >= 0) {                          //if user health is under 0 and enemy still has health, game over
            //alert("You lost the battle! Hit RESET to play again!");         //prompt user to click resetBtn
            alertDiv.removeClass("d-none alert-warning")
                .addClass("alert-danger show");
            alertTitle.text("You lost the battle!");
            alertMessage.text("Hit RESET to play again!");
            $(".attackBtn").off("click");
            $(".attackBtn").hide();
            $(".card.fighter").hide();                                      //hide the user card
        }
    
        if (wins === 3) {                                                 //when user reaches 3 wins
        //alert("Congratulations! You won the battle! Press RESET to play again!");          //prompt user to hit resetBtn for new game 
            alertDiv.removeClass("d-none alert-success alert-warning alert-danger")
                .addClass("alert-primary show");
            alertTitle.text("Congratulations! You won the battle!");
            alertMessage.text("Press RESET to play again!");
            $(".attackBtn").hide();
            $("#continue").hide();
        }
    }
    
    
    $(".resetBtn").on("click", function reset() {               //when resetBtn clicked, game resets to default settings. 
        location.reload();
        alertDiv.removeClass("alert-success alert-warning alert-danger alert-primary");
    });

});

//TO DO LIST::
//1. check the health after each click of the attack button, not instantly when clicked
    //so the health of the hero changes, then the score is checked, so te hero doesnt have negative health and still able to fight. 
