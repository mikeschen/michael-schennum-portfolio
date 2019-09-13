"use strict";
import 'owl.carousel';

export default {
    bind(item, options) {
        jQuery(item).owlCarousel(options.value);
    }
}
