var App = {
    changeMenuBehavior: function() {
        $('.dropdown').on({
            "click": function (event) {
                if ($(event.target).closest('.dropdown-toggle').length) {
                    $(this).data('closable', true);
                } else {
                    $(this).data('closable', false);
                }
            },
            "hide.bs.dropdown": function (event) {
                hide = $(this).data('closable');
                $(this).data('closable', true);
                return hide;
            }
        });
    },
    
    handleFancyBox: function (elem) {
        elem.find('.fancybox-data-img').click(function (event) {
            $.fancybox.open([
                {
                    href: $(event.target).attr('src')
                }
            ]);
        });
    }

};