


$(() => {


    $("button.x").click(function () {
        $(this).toggleClass("open");
    })

    // Fields
    let outer = $('.wrapper'),
        layers = [];

    // Generates layers array
    outer.children().each((index, item) => {
        layers.push({
            'layer': item,
            'startposition': {
                'x': $(item).position().left,
                'y': $(item).position().top,
                'z': index * 4 + 4, // 0 - 5 - 10
            },
        });
    });

    // On mouse move
    $(document).on('mousemove', (e) => {

        // Fields
        let outerCenterX = outer.offset().left + outer.innerWidth() / 2,
            outerCenterY = outer.offset().top + outer.innerHeight() / 2,
            distanceX = e.pageX - outerCenterX,
            distanceY = e.pageY - outerCenterY,
            direction = Math.atan2(distanceY, distanceX),
            distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)),
            distanceEqualized = distance / Math.sqrt(Math.pow($(window).innerWidth() / 2, 2)
                + Math.pow($(window).innerHeight() / 2, 2));

        // Moves layers
        layers.forEach((item, index) => {
            let xMoved = Math.cos(direction) * item.startposition.z * distanceEqualized,
                yMoved = Math.sin(direction) * item.startposition.z * distanceEqualized;

            $(item.layer).css('left', 'calc( ' + item.startposition.x + 'px + ' + xMoved + '% )');
            $(item.layer).css('top', 'calc( ' + item.startposition.y + 'px + ' + yMoved + '% )');

        });

    });

});

