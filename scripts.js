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
