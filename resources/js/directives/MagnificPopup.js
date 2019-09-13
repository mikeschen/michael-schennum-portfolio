"use strict";

import 'magnific-popup';

export default {
    deep: true,
    bind(data) {
        jQuery(data).magnificPopup({
            type: 'image',
            delegate: 'a',
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below
            preloader: true,
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            },
            image: {
                titleSrc: 'title'
            },
            gallery: {
                enabled: true, // set to true to enable gallery
                preload: [0, 2], // read about this option in next Lazy-loading section
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                tPrev: Config.translations.previous,
                tNext: Config.translations.next,
                tCounter: '<span class="mfp-counter">%curr% ' + Config.translations.of + ' %total%</span>' // markup of counter
            }
        });
    }
}
