$(document).ready(function(){
    //variables
    var $btn1 = $("#btn1");
    var $btn2 = $("#btn2");
    var $btn3 = $("#btn3");
    var $btn4 = $("#btn4");
    var audio1 = $("#aud1");
    var audio2 = $("#aud2");
    var audio3 = $("#aud3");
    var audio4 = $("#aud4");
    var btnArr = [$btn1,$btn2,$btn3,$btn4];
    var audArr = [audio1,audio2,audio3,audio4];
    var $startBtn = $("#startBtn");
    var $powerBtn = $("#power");
    var $strictBtn = $("#strictBtn");
    var $strIndi = $("#strictIndicator");
    var $screen = $("#screen");
    var userArr = [];
    var compArr = [];
    var count = 0;
    var startBtnClick = 0;
    var on = false;
    var off = true;
    var strict = false;
    var userTurn = false;
    var userTimeOut;
    var compTimeOut;
    var intervalId;

    //functions
    function newRound(){
        if(on){
            $(".btn").css("cursor","default");
            userTurn = false;
            $(".btn").removeClass("clicked");
            if(count+1 > 20){
                console.log("win"); // win
            }else {
                userArr = [];
                count++;
                if(count<10){
                    $screen.html("0"+String(count));
                }else{
                    $screen.html(count);
                }
                randNumbers(count);
                autoPress(compArr);
            }
        }
    }
    
    function randNumbers(num){
        if(on){
            compArr.push(Math.floor(Math.random() * 4) + 1);
        }
    }
    
    function autoPress(arr){
        if(on){
            var i = 0;
            function pressNext(){
                if(i+1 == arr.length){
                    clearInterval(intervalId);
                    userTimeOut = setTimeout(function(){
                        console.log(arr);
                        $(".btn").css("cursor","pointer");
                        userTurn = true;
                    },300);
                }
                press(arr[i]);
                i++;
            }
            intervalId = window.setInterval(pressNext, 600);
        }
    }
    
    function press(num){
        if(on){
            var index = num - 1;
            btnArr[index].addClass("clicked");
            //play the audio that matches the number
            audArr[index].get(0).play();
            compTimeOut = setTimeout(function(){
                $(".btn").removeClass("clicked");
            },400)
        }
    }
    
    function checkResult(){
        if(on){
            var check = true;
            for(var i =0; i<userArr.length; i++){
                if(userArr[i] !== compArr[i]){
                    check = false;
                }
            }
            if(check){
                setTimeout(function(){
                    newRound();
                },800)
            }else {
                    (function(){
                        $screen.html("!!");
                        setTimeout(function(){
                            $screen.html(" ");
                            setTimeout(function(){
                                $screen.html("!!");
                                setTimeout(function(){
                                    wrongAnswer();
                                },500)
                            },300)
                        },300)
                    })()

                //if strict mode, count reset to 0, newRound()
                //if not strict mode, count -= 1, newRound();
                function wrongAnswer(){
                        if(strict){
                            count = 0;
                            userArr = [];
                            compArr = [];
                            newRound();
                        }else {
                            $screen.html("0"+count);
                            userArr = [];
                            autoPress(compArr);
                        }
                }
            }
        }
    }
   
    
    
    

    //clicks

    $("#startBtn").click(function(){
        if(on){
            startBtnClick ++;
            if(startBtnClick < 2){
                (function(){
                    $screen.html(" ");
                    setTimeout(function(){
                        $screen.html("- -");
                        setTimeout(function(){
                            $screen.html(" ");
                            setTimeout(function(){
                                $screen.html("- -");
                                setTimeout(function(){
                                    newRound();
                                },800)
                            },300)
                        },300)
                    },300)
                })()
            }
            
        }
    })

    $powerBtn.click(function(){
        on = !on;
        off = !off;
        
        if(off){ //if off
            count = 0;
            userArr = [];
            compArr = [];
            startBtnClick = 0;
            $screen.html(" ");
            userTurn = false;
            $(".btn").css("cursor","default");
            clearTimeout(compTimeOut);
            clearTimeout(userTimeOut);
            clearInterval(intervalId);
            $(".btn").removeClass("clicked");
        }else{
            $screen.html("- -");
        }
        
        $("#togglePower").toggleClass("on");
        
    })
    
    $strictBtn.click(function(){
        if(on){
            strict = !strict;
            $strIndi.toggleClass("onStrict");
        }
    });
    
    $(".btn")
    .mousedown(function(){
        clearTimeout(userTimeOut);
        if(on){
            $(this).addClass("clicked");
            var thisId = this.id;
            var thisNum = Number(thisId.charAt(3));
            userArr.push(thisNum);
        }
    })
    .mouseup(function(){
        $(this).removeClass("clicked");
            if(userArr.length == compArr.length){
                checkResult();
        }
    })
    
    $btn1.mousedown(function(){
        if($(this).hasClass("clicked")){
            audio1.get(0).play();
        }
    })
    $btn2.mousedown(function(){
        if($(this).hasClass("clicked")){
            audio2.get(0).play();
        }
    })
    $btn3.mousedown(function(){
        if($(this).hasClass("clicked")){
            audio3.get(0).play();
        }
    })
    $btn4.mousedown(function(){
        if($(this).hasClass("clicked")){
            audio4.get(0).play();
        }
    })
    
})
