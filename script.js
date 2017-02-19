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
    //functions
    function newRound(){
        if(count+1 > 20){
            alert("win"); // win
        }else {
            userArr = [];
            compArr = [];
            count++;
            $screen.html(count);
            randNumbers(count);
            autoPress(compArr);
            
        }
    }
    
    function autoPress(arr){
        for(var i=0; i<arr.length; i++){
            if(arr.indexOf(i) == arr.length-1){
                alert("here i am");
                setTimeout(userClick, 80);
            }
            //setTimeout(press(arr[i]),40);
            press(arr[i]);
        }
    }
    
    function press(num){
        $(".btn").removeClass("clicked");
        var index = num - 1;
        btnArr[index].addClass("clicked");
        //play the audio that matches the number
    }

    

    function userClick(){
        $(".btn").css("cursor","pointer");
        $(".btn").mousedown(function(){
            $(this).addClass("clicked");
            var thisId = this.id;
            var thisNum = Number(thisId.charAt(3));
            userArr.push(thisNum);
        });
        $(".btn").mouseup(function(){
            if(userArr.length == compArr.length){
                checkResult();
            }
        })
    }

    function randNumbers(num){
        for(var i=0; i<num; i++){
            compArr.push(Math.floor(Math.random() * 4) + 1);
        }
    }

    function checkResult(){
        if(userArr == compArr){
            newRound();
        }else {
            //if strict mode, count reset to 0, newRound()
            //if not strict mode, count -= 1, newRound();
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
    })








})
