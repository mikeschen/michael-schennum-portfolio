"use strict";
require('./scripts/navigation.js')

/**
 * Importing Vue.js framework
 */
import Vue from 'vue';
import axios from 'axios';
import AOS from 'aos';
//import VueAxios from 'vue-axios';
//Vue.use(VueAxios, axios);

window.Vue = Vue;
window.axios = axios;
window.AOS = AOS;



Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};



String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
