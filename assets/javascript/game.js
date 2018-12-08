


$(document).ready(function () {
    console.log("ready")


    function chooseFighter() {
        $(this).detach().appendTo(".yourFighter");
        $(".fighter")
            .not(this)
            .removeClass("fighter")
            .addClass("enemy");

        $("#word").text("Enemy");
        $(".card").off("click", chooseFighter);
        $(".card.enemy").on("click", chooseEnemy);
    }
    


    function chooseEnemy() {
        $(this).detach().appendTo(".enemyFighter");
        $(".enemy")
            .not(this)
            .removeClass("enemy");
        
    }
    
    
    
    
    $(".card.fighter").on("click", chooseFighter);
    
});