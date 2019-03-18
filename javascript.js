
const style = getComputedStyle(document.body);
var totalSliderWidth = window.innerWidth / 4 * 3; //calculate the width of the div (75% precent of window)
let circlePrecentage = (45 / totalSliderWidth) * 100;
let handleOne = style.getPropertyValue('--handle-one-pos');
let handleTwo = style.getPropertyValue('--handle-two-pos');
const display1 = document.getElementById("pos-handler-1");
const display2 = document.getElementById("pos-handler-2");
const sliderBack = document.getElementById("range-back");
const handleOneListener = document.getElementById("handle-one");
const handleTwoListener = document.getElementById("handle-two");
const updateHandlePosition1 = updateHandlePosition(1);
const updateHandlePosition2 = updateHandlePosition(2);
const updateHandlePosition3 = updateHandlePosition(0);

display1.innerHTML = parseInt(handleOne) + parseInt(circlePrecentage);
display2.innerHTML = parseInt(handleTwo) + parseInt(circlePrecentage);
sliderBack.addEventListener("click", updateHandlePosition(0));
handleOneListener.addEventListener("mousedown", handleMouseMove(1));
handleTwoListener.addEventListener("mousedown", handleMouseMove(2));

function handleMouseMove(handleSelect) {

    switch (handleSelect) {
        case 1:
            return function (event) {
                document.addEventListener("mousemove", updateHandlePosition1);
            }
        case 2:
            return function (event) {
                document.addEventListener("mousemove", updateHandlePosition2);
            }
        default:
            return function (event) {
                document.addEventListener("mousemove", updateHandlePosition3);
            }
    }
}

document.addEventListener("mouseup", removeEventListener);

function removeEventListener(event) {

    document.removeEventListener("mousemove", updateHandlePosition1);
    document.removeEventListener("mousemove", updateHandlePosition2);
    document.removeEventListener("mousemove", updateHandlePosition3);
}

function updateHandlePosition(handleSelect) {

    return function (event) {

        handleOne = style.getPropertyValue('--handle-one-pos');
        handleTwo = style.getPropertyValue('--handle-two-pos');
        totalSliderWidth = window.innerWidth / 4 * 3; //calculate the width of the div (75% precent of window)
        let relativeX = event.pageX - window.innerWidth / 8; //caluclate x coordinate in range slider
        let precentageClick = (relativeX / totalSliderWidth) * 100; //calcualte the precentage of click position in div
        circlePrecentage = (45 / totalSliderWidth) * 100;//calculate the %width of the circle 

        handleOne = handleOne.replace('%', '');
        handleTwo = handleTwo.replace('%', '');
        precentageClick = precentageClick - circlePrecentage / 2;

        if (precentageClick > 99) precentageClick = 99;
        if (precentageClick < 0) precentageClick = 0;

        switch (handleSelect) {

            case 1:
                document.documentElement.style.setProperty('--handle-one-pos', precentageClick + "%");
                document.documentElement.style.setProperty('--z-index-1', 3);
                document.documentElement.style.setProperty('--z-index-2', 2);
                break;

            case 2:
                document.documentElement.style.setProperty('--handle-two-pos', precentageClick + "%");
                document.documentElement.style.setProperty('--z-index-1', 2);
                document.documentElement.style.setProperty('--z-index-2', 3);
                break;

            default:
                if (Math.abs(precentageClick - parseFloat(handleTwo)) > Math.abs(precentageClick - parseFloat(handleOne))) {
                    document.documentElement.style.setProperty('--handle-one-pos', precentageClick + "%");
                } else {
                    document.documentElement.style.setProperty('--handle-two-pos', precentageClick + "%");
                }
                break;
        }

        handleOne = style.getPropertyValue('--handle-one-pos');
        handleTwo = style.getPropertyValue('--handle-two-pos');
        handleOne = handleOne.replace('%', '');
        handleTwo = handleTwo.replace('%', '');

        if (parseFloat(handleOne) >= parseFloat(handleTwo)) {
            document.documentElement.style.setProperty('--right', handleOne + "%");
            document.documentElement.style.setProperty('--left', handleTwo + "%");
        } else {
            document.documentElement.style.setProperty('--left', handleOne + "%");
            document.documentElement.style.setProperty('--right', handleTwo + "%");
        }

        display1.innerHTML = parseInt(handleOne);
        display2.innerHTML = parseInt(handleTwo);
    }
}
