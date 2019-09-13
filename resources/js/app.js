"use strict";

/**
 * Load boostrap configuration
 */


require('./bootstrap.js');

require('./Event.js');

AOS.init(Config.AOS);

/**
 * importing Componenst
 */
import IntroTyping from './components/IntroTyping';
import StartArrow from './components/StartArrow';
import Portfolio from './components/Portfolio';
import PortfolioItem from './components/PortfolioItem';
import Counter from './components/Counter';
import Testimonials from './components/Testimonials';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import FormInput from './components/FormInput';
import Skill from './components/Skill';


var tej = new Vue(
{
    components:
    {
        IntroTyping,
        StartArrow,
        Portfolio,
        PortfolioItem,
        Counter,
        Testimonials,
        Testimonial,
        ContactForm,
        FormInput,
        Skill
    },

    el: '#tej',

    data:
    {
        scrolled: 0,
        cachedScroll: 0,
        firedEvents:
        {
            fireCounters: false,
            fireSkills: false
        },
        page: Config.page,
        sections: {}
    },
    methods:
    {
        handleScroll()
        {
            this.scrolled = window.scrollY;

            if (this.firedEvents.fireCounters === false && !!this.sections.counters.length)
            {
                this.fireCounters();
            }

            if (this.firedEvents.fireSkills === false && !!this.sections.about.length)
            {
                this.fireSkills();
            }

        },
        calculateSectionPosition(section)
        {
            return section.position().top - window.innerHeight;
        },
        fireCounters()
        {
            let positionFromTop = this.calculateSectionPosition(this.sections.counters);

            if (this.scrolled > positionFromTop)
            {
                Event.fire('fire-counters');
                this.firedEvents.fireCounters = true;
            }
        },
        fireSkills()
        {
            let positionFromTop = this.calculateSectionPosition(this.sections.about);
            if (this.scrolled > positionFromTop)
            {
                Event.fire('fire-skills');
                this.firedEvents.fireSkills = true;
            }
        },
        refreshScripts()
        {
            AOS.refreshHard();
        },
        changeScrolPosition(scroll)
        {
            $('html, body').stop().animate(
            {
                'scrollTop': scroll
            }, 500, 'swing');
        },

        redirectPage(link)
        {
            if (link.indexOf('\#') >= 0) return;
            $(this.$el).fadeOut(600);
            setTimeout(() =>
            {
                document.location.href = link;
            }, 610);
        }
    },
    mounted()
    {

        this.sections = {
            about: $('#About'),
            counters: $('#Counters'),
            preloader: $("#Preloader")
        };

        Event.listen('refresh-scripts', () => this.refreshScripts());

        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
        window.onload = () =>
        {
            let duration = Config.preloader.defaultDuration;
            setTimeout(() =>
            {
                this.sections.preloader.addClass('--loaded');
                setTimeout(() =>
                {
                    this.refreshScripts();
                    this.sections.preloader.remove();
                }, 510);
                
            }, duration);
        }
    },
})
