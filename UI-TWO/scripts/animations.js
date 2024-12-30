//Card Button click animation
function rotateAnim(element, degreesIncrement, active) {
    var degrees = parseInt(element.css("--degrees")) || 0;

    degrees += degreesIncrement;

    element.animate(
        { deg: degrees },
        {
            duration: 600,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );

    element.css({
        '--active': `${active}`,
        '--degrees': `${degrees}`
    });
}

$(document).on('click', '.vehButton', function() {

    var buttonIcon = $(this).find(".cardButtonIcon");

    if (parseInt(buttonIcon.css("--degrees")) >= 360){
        buttonIcon.css({
            '--degrees' : `${0}`
        });
    } // Resets button --degrees var to 0 once it reaches 360

    if (buttonIcon.css("--active") == "true") {
        rotateAnim(buttonIcon, 45, false);
    }
    else {
        rotateAnim(buttonIcon, 45, true);
    }
});