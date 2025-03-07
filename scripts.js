// Sticky Navbar
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('#navbar').addClass('scrolled');
    } else {
        $('#navbar').removeClass('scrolled');
    }
});

// Load on Scroll Animation
$(window).on('scroll', function() {
    $('.section').each(function() {
        if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
            $(this).addClass('visible');
        }
    });
});

$.fn.commentCards = function() {
    return this.each(function() {
        var $this = $(this),
            $cards = $this.find('.card'),
            $current = $cards.filter('.card--current'),
            $next;

        $cards.on('click', function() {
            if (!$current.is(this)) {
                $cards.removeClass('card--current card--out card--next');
                $current.addClass('card--out');
                $current = $(this).addClass('card--current');
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass('card--next');
            }
        });

        if (!$current.length) {
            $current = $cards.last();
            $cards.first().trigger('click');
        }

        $this.addClass('cards--active');
    });
};

$('.cards').commentCards();

// Swirl Cursor Effect
$(document).ready(function() {
    const cursor = $('<div class="cursor"></div>');
    $('body').append(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.1; // Adjust speed for the swirl effect

    $(document).on('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.css({
            left: cursorX + 'px',
            top: cursorY + 'px',
            transform: `translate(-50%, -50%) rotate(${cursorX + cursorY}deg)`
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
});
