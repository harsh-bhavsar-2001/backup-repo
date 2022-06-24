jQuery(document).ready(function($) {
    $(document).on('click', 'button.main-nav-trigger.js-trigger', function(e) {
        e.preventDefault();
        $(this).closest('header.main-header').toggleClass('main-header-nav-visible');
    });
    $(document).on('click', 'header.main-header .main-nav-list a', function(e) {
        if ($(this).closest('header.main-header').is('.main-header-nav-visible'))
            $(this).closest('header.main-header').removeClass('main-header-nav-visible');
    });
    $('.main-header a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - ($('header.main-header').height() + 10)
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
            window.location.hash = this.hash;
        }
    });
    Prism.highlightAll();
    $(document).on('click', '.show-example', function(e) {
        e.preventDefault();
        $(this).find('>span').toggleClass('d-none').closest('.settings').find('>.settings-example').slideToggle();
    });
});