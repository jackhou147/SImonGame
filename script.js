$(document).ready(function(){
    //variables
    var $btn1 = $("#btn1");
    var $btn2 = $("#btn2");
    var $btn3 = $("#btn3");
    var $btn4 = $("#btn4");
    var btnArr = [$btn1,$btn2,$btn3,$btn4];
    var $startBtn = $("#startBtn");
    var $powerBtn = $("#power");
    var $strictBtn = $("#strictBtn");
    var $screen = $("#screen");
    var userArr = [];
    var compArr = [];
    var count = 0;
    var on = false;
    var strict = false;
    var userTurn = false;
    //functions
    function newRound(){
        $(".btn").css("cursor","default");
        userTurn = false;
        $(".btn").removeClass("clicked");
        alert("newRound");
        if(count+1 > 20){
            console.log("win"); // win
        }else {
            userArr = [];
            compArr = [];
            count++;
            $screen.html(count);
            randNumbers(count);
            autoPress(compArr);
            
        }
    }
    
    function randNumbers(num){
        for(var i=0; i<num; i++){
            compArr.push(Math.floor(Math.random() * 4) + 1);
        }
    }
    var userTimeOut;
    function autoPress(arr){
        var intervalId;
        var i = 0;
        function pressNext(){
            if(i+1 == arr.length){
                clearInterval(intervalId);
                userTimeOut = setTimeout(function(){
                    alert(arr);
                    $(".btn").css("cursor","pointer");
                    userTurn = true;
                },300);
            }
            press(arr[i]);
            i++;
        }
        intervalId = window.setInterval(pressNext, 600);
    }
    
    function press(num){
        $(".btn").removeClass("clicked");
        var index = num - 1;
        btnArr[index].addClass("clicked");
        //play the audio that matches the number
    }
    
    function checkResult(){
        var check = true;
        for(var i =0; i<userArr.length; i++){
            if(userArr[i] !== compArr[i]){
                check = false;
            }
        }
        if(check){
            alert("answer is correct and time for newRound");
            newRound();
        }else {
            //if strict mode, count reset to 0, newRound()
            //if not strict mode, count -= 1, newRound();
            if(!strict){
                count = 0;
                newRound();
            }else {
                count -= 1;
                newRound();
            }
        }
    }
   
    
    
    

    //clicks

    $("#startBtn").click(function(){
        if(on){
            newRound();
        }
    })

    $powerBtn.click(function(){
        on = !on;
        if(!on){ //if off
            count = 0;
            $(".btn").removeClass("clicked");
        }
        $("#togglePower").toggleClass("on");
    })



    $strictBtn.click(function(){
        strict = !strict;
    });
    
    $(".btn")
    .mousedown(function(){
        if(userTurn){
            clearTimeout(userTimeOut);
            $(this).addClass("clicked");
            var thisId = this.id;
            var thisNum = Number(thisId.charAt(3));
            userArr.push(thisNum);
        }
    })
    .mouseup(function(){
        if(userTurn){
            $(this).removeClass("clicked");
            if(userArr.length == compArr.length){
                checkResult();
            }
        }
    })

})
