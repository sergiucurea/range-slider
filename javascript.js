//with input range
var slider=document.getElementById("theRange");
var output=document.getElementById("theValue");

output.innerHTML=slider.value;

//console.log("slider= "+slider.innerHTML);
//console.log("output= "+output.innerText);
//console.log(output.innerHTML);

slider.oninput = function(){
    output.innerHTML=this.value;
    //console.log(output.innerHTML);
}
//////////////////

///without input range and 2 handles
var style=getComputedStyle(document.body);
var slider_back=document.getElementById("range-back");
slider_back.addEventListener("click",getPos);

function getPos(event){

    var handle_one=style.getPropertyValue('--handle-one-pos');
    var handle_two=style.getPropertyValue('--handle-two-pos');
    handle_one=handle_one.replace('%','');
    handle_two=handle_two.replace('%','');
    var total_slider_width=window.innerWidth/4*3; //calculate the width of the div (75% precent of window)
    var relativeX=event.pageX-window.innerWidth/8; //caluclate x coordinate in range slider
    var precentage_click=(relativeX/total_slider_width)*100; //calcualte the precentage of click position in div

    //document.documentElement.style.setProperty('--handle-one-pos',precentage_click+"%");
    if (precentage_click>100) precentage_click=100;

    if (Math.abs(precentage_click - handle_two)>Math.abs(precentage_click-handle_one)){
       
        document.documentElement.style.setProperty('--handle-one-pos',precentage_click+"%");
    } else {
        document.documentElement.style.setProperty('--handle-two-pos',precentage_click+"%");
    }

    //console.log( event.pageX+" "+relativeX+" "+window.innerWidth+" "+total_slider_width+" "+precentage_click);

}
