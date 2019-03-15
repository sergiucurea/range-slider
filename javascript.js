//with input range
var slider = document.getElementById("theRange");
var output = document.getElementById("theValue");

output.innerHTML=slider.value;

//console.log("slider= "+slider.innerHTML);
//console.log("output= "+output.innerText);
//console.log(output.innerHTML);

slider.oninput = function(){
    output.innerHTML=this.value;
    //console.log(output.innerHTML);
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///without input range and 2 handles//////////////////////////////////////
const style = getComputedStyle(document.body);
var total_slider_width=window.innerWidth/4*3; //calculate the width of the div (75% precent of window)
var circle_precentage=(45/total_slider_width)*100;
var handle_one=style.getPropertyValue('--handle-one-pos');
var handle_two=style.getPropertyValue('--handle-two-pos');
const display_1=document.getElementById("pos_handler_1");
const display_2=document.getElementById("pos_handler_2");
const slider_back = document.getElementById("range-back");
const handle_one_listener=document.getElementById("handle-one");
const handle_two_listener=document.getElementById("handle-two");
const getPos1=getPos(1); 
const getPos2=getPos(2);
const getPos3=getPos(0);

display_1.innerHTML=parseInt(handle_one)+parseInt(circle_precentage);
display_2.innerHTML=parseInt(handle_two)+parseInt(circle_precentage);
slider_back.addEventListener("click",getPos(0));
handle_one_listener.addEventListener("mousedown",handle_move(1));
handle_two_listener.addEventListener("mousedown",handle_move(2));

function handle_move(handle_select){
    
    switch(handle_select){
        case 1:
    return function(event){
        document.addEventListener("mousemove",getPos1);
        }
        break;
    case 2:
    return function(event){
        document.addEventListener("mousemove",getPos2);
        }
        break;
    default:
    return function(event){
        document.addEventListener("mousemove",getPos3);
        }
        break;
    }
}

document.addEventListener("mouseup",remove_func);

function remove_func(event){

    document.removeEventListener("mousemove",getPos1);
    document.removeEventListener("mousemove",getPos2);
    document.removeEventListener("mousemove",getPos3);
}

function getPos(handle_select){

    return  function(event){

        handle_one=style.getPropertyValue('--handle-one-pos');
        handle_two=style.getPropertyValue('--handle-two-pos');
        total_slider_width=window.innerWidth/4*3; //calculate the width of the div (75% precent of window)
        let relativeX=event.pageX-window.innerWidth/8; //caluclate x coordinate in range slider
        let precentage_click=(relativeX/total_slider_width)*100; //calcualte the precentage of click position in div
        circle_precentage=(45/total_slider_width)*100;//calculate the %width of the circle 

        handle_one=handle_one.replace('%','');
        handle_two=handle_two.replace('%','');
        precentage_click=precentage_click-circle_precentage/2;

        //document.documentElement.style.setProperty('--handle-one-pos',precentage_click+"%");
        if (precentage_click>100-circle_precentage) precentage_click=100-circle_precentage;
        if (precentage_click<0-circle_precentage) precentage_click=0-circle_precentage;

        switch(handle_select){

            case 1:
                document.documentElement.style.setProperty('--handle-one-pos',precentage_click+"%");
                document.documentElement.style.setProperty('--z-index-1',3);
                document.documentElement.style.setProperty('--z-index-2',2);
            //console.log("I am in case 1");
            break;
            
            case 2:
                document.documentElement.style.setProperty('--handle-two-pos',precentage_click+"%");
                document.documentElement.style.setProperty('--z-index-1',2);
                document.documentElement.style.setProperty('--z-index-2',3);
            //console.log("I am in case 2");
            break;

            default:
                if (Math.abs(precentage_click - parseFloat(handle_two))>Math.abs(precentage_click-parseFloat(handle_one))){
                    document.documentElement.style.setProperty('--handle-one-pos',precentage_click+"%");
                } else {
                    document.documentElement.style.setProperty('--handle-two-pos',precentage_click+"%");
                    }
            //console.log("I am in case default");
            break;
        }   

        handle_one=style.getPropertyValue('--handle-one-pos');
        handle_two=style.getPropertyValue('--handle-two-pos');
        handle_one=handle_one.replace('%','');
        handle_two=handle_two.replace('%','');
        //console.log("handle1="+handle_one+" handle2="+handle_two);

        if (parseFloat(handle_one)>=parseFloat(handle_two)){
            document.documentElement.style.setProperty('--right',handle_one+"%");
            document.documentElement.style.setProperty('--left',handle_two+"%");
        } else {
            document.documentElement.style.setProperty('--left',handle_one+"%");
            document.documentElement.style.setProperty('--right',handle_two+"%");
        }

       
        display_1.innerHTML=parseInt(handle_one)+parseInt(circle_precentage);
        display_2.innerHTML=parseInt(handle_two)+parseInt(circle_precentage);
    }
   // console.log( circle_precentage+" "+relativeX+" "+window.innerWidth+" "+total_slider_width+" "+precentage_click);
}
