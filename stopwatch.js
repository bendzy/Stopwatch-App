$(function(){
    
    
    var mode = 0; // mapp mode
    var timeCounter = 0; //miliseconds
    var lapCounter = 0; //lap counter
    
    var action; //set interval
    var lapNumber = 0; //lap numbers
    
    var timeMinutes, timeSeconds, timeMiliseconds;
    var lapMinutes, lapSeconds, lapMiliseconds;
    
    
    //load APP
    hideShowButtons("#startButton","#lapButton");
   
    $("#startButton").click(function(){
        //mode on 
        mode = 1;
        
        //showing stop and lap buttons
        hideShowButtons("#stopButton","#lapButton");
        
        startAction();
        
    });
    
    
     //stop button
        $("#stopButton").click(function(){
           //show resume and reset buttons
            hideShowButtons("#resumeButton","#resetButton");
            //stop counter
            clearInterval(action);
        });
    
    
    //resume button 
    $("#resumeButton").click(function(){
        hideShowButtons("#stopButton","#lapButton");
        startAction();
    });
    
    
    
    //reset button 
    $("#resetButton").click(function(){
       location.reload();
    });
    
    
    // lap button
    
     $("#lapButton").click(function(){
       if (mode) {
           //stop action
           clearInterval(action);
           //reset lap counter
           lapCounter = 0;
           
           addLap();
           //start acton again
           startAction();
       }
    });
    
    
    
    
    
    
    
    
    
    
    /************functions ****************/
    
    //show and hide buttons
    function hideShowButtons(x,y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    
    //start the counter
    function startAction() {
        action = setInterval(function(){
            timeCounter++;
            lapCounter++;
            
                if ( timeCounter == 100*60*100) {
                    timeCounter = 0;
                }
                if ( lapCounter == 100*60*100) {
                    lapCounter = 0;
                }
            updateTime();
        },10);
    }
    
    //update time to convert counters minutes sec and milicesonds
    function updateTime() {
        //1min = 60min*100 mili = 6000 milisekund
        timeMinutes = Math.floor(timeCounter/6000);
        //1 sec = 100 milisecs
        timeSeconds = Math.floor(timeCounter%6000/100);
        //miliseconds
        timeMiliseconds = (timeCounter%6000)%100;
        
            $("#timeminute").text(format(timeMinutes));
            $("#timesecond").text(format(timeSeconds));
            $("#timemiliseconds").text(timeMiliseconds);
        
        
         //1min = 60min*100 mili = 6000 milisekund
        lapMinutes = Math.floor(lapCounter/6000);
        //1 sec = 100 milisecs
        lapSeconds = Math.floor(lapCounter%6000/100);
        //miliseconds
        lapMiliseconds= (lapCounter%6000)%100;
        
         $("#lapminute").text(format(lapMinutes));
         $("#lapsecond").text(format(lapSeconds));
         $("#lapmiliseconds").text(lapMiliseconds);
        
        
        
    }
    
    //format time
    function format(number) {
        if ( number < 10) {
            return "0"+number;
        }else {
            return number;
        }
        
    }
    
    
    //add lap details to div
    function addLap() {
        lapNumber++;
        var myLapDetails = "<div class='lap'>"+
            '<div class="laptimetitle">Lap'+lapNumber+'</div>'+
            '<div class="laptime"><span>'+format(lapMinutes)+'</span>:<span>'+format(lapSeconds)+'</span>:<span>'+format(lapMiliseconds)+'</span></div>'
            
            
            +"</div>";
        $(myLapDetails).prependTo("#laps");
    }
    
});