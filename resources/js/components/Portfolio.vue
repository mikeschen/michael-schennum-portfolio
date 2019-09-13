<template>
	<div class="Portfolio" :class="portfolioClass">
		<nav class="Portfolio__nav">
			<ul>
				<li @click="activateFilter(tag)" v-for="tag in tags" v-text="tag" :class="(tag == currentActiveButton) ? 'active' : ''"></li>
			</ul>
		</nav>
		
		

				<transition-group  v-if="enablePopup" v-popup name="Portfolio-item" tag="div" class="Portfolio__items">
					<portfolio-item v-for="item in portfolio" :data="item" :key="item.id"></portfolio-item>
				</transition-group>

			

				<transition-group v-else name="Portfolio-item" tag="div" class="Portfolio__items">
					<portfolio-item v-for="item in portfolio" :data="item" :key="item.id"></portfolio-item>
				</transition-group>

		
	
	</div>
</template>

<script>
	import popup from '../directives/MagnificPopup';
	import PortfolioItem from './PortfolioItem';
	export default{
		name: 'Portfolio',
		components: {
			PortfolioItem
		},
		directives: {
        	popup
    	},
		props:{
			data: false,
			limit: false,
		    lightbox:{
		        type:Boolean,
		        default: false
			},
			type: {
				type: String,
				default: 'nospacing'
			}
		},
		computed: {
			portfolioClass(){
				return 'Portfolio--' + this.type;
			},
			portfolio() {

				let portfolio = this.data.map( (item, index) => {
					item.id = index + 1;
					return item;
				})

				portfolio = portfolio.filter( item =>  {
					if( this.currentActive == Config.translations.all.capitalizeFirstLetter()){
						return true
					} 
					return item.tags.includes(this.currentActive);
				});

				return this.limit ? portfolio.slice(0, this.limit) : portfolio;


			}
		},
		data() {
			return {
				tags: [Config.translations.all.capitalizeFirstLetter()],
				currentActive: Config.translations.all.capitalizeFirstLetter(),
				currentActiveButton: Config.translations.all.capitalizeFirstLetter(),
				enablePopup: this.lightbox,
			}
		},
		created(){
			this.data.forEach( item =>  this.collectTags(item.tags) );
		},

		methods: {
			collectTags(tags){
				this.tags = this.tags.concat(tags).unique();
			},

			activateFilter(tag){
				this.preventHeightNull();
				this.currentActive = null;
				this.currentActiveButton = tag;
				setTimeout(() => this.currentActive = tag, 300);
				setTimeout(() => Event.fire('refresh-scripts'), 400);
			},

			preventHeightNull(){
				let currentHeight = $(this.$el).find('.Portfolio-item').outerHeight(true) + $(this.$el).find('.Portfolio__nav').outerHeight(true) + 30;
				$(this.$el).css('min-height', currentHeight);
			},
		}
	}
</script>
<style>
	

	.Portfolio-item{
		transition: all 0.6s ease-in-out;
	}

	.Portfolio-item-enter, .Portfolio-item-leave-to
	/* .list-complete-leave-active for <2.1.8 */ {
	    opacity: 0;
	}
	.Portfolio-item-leave-active {
		transition: all 300ms ease-in-out;
	}

</style>

