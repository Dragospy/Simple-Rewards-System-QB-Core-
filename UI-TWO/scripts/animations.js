//Card Button click animation
export function rotateAnim(element, degreesIncrement) {
    let degrees = parseInt(element.css("--degrees")) || 0;
    
    if (degrees >= 360){
        buttonIcon.css({
            '--degrees' : `${0}`
        });

        degrees = 0;
    } // Resets button --degrees var to 0 once it reaches 360

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
        '--degrees': `${degrees}`
    });
}
