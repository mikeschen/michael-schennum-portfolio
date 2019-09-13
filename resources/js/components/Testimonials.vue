<template>
	<div class="Testimonials owl-carousel" v-carousel="options">
			<slot></slot>
	</div>
</template>

<script>
	import carousel from '../directives/Carousel';
	export default{
		name: 'Testimonials',
		directives: { carousel },
		data() {
			return {
				options: Config.testimonials
			}
		},
	}
</script>

<style lang="scss" scoped>
	.Testimonials{
		text-align: center;
	}
</style>