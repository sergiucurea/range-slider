var slider=document.getElementById("theRange");
var output=document.getElementById("theValue");

output.innerHTML=slider.value;

console.log("slider= "+slider.innerHTML);
console.log("output= "+output.innerText);
console.log(output.innerHTML);

slider.oninput = function(){
    output.innerHTML=this.value;
    console.log(output.innerHTML);
}