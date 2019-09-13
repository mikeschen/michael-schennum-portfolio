<template>
	
	<div class="Counter">
		<div class="Counter__icon">
			<i :class="icon"></i>
		</div>
		<div class="Counter__number">{{counted}}</div> 
		<h5 class="Counter__text">{{text}}</h5> 
	</div>

</template>

<script>
	export default{
		props: {
			number: Number,
			text: String,
			icon: String
		},

		data() {
			return {
				counted: 0,
			}
		},
		mounted(){
			let interval = this.calculateInterval();
			this.number = parseInt(this.number);

			Event.listen('fire-counters', () => {
				setInterval(() => this.incrementing(), interval);
			});
		},

		methods: {
			incrementing(){
				if( this.counted < this.number )
					this.counted = this.counted + 1;
			},
			calculateInterval() {
				return Config.counters.duration / this.number;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>