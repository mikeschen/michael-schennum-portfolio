<template>
	<div class="Testimonial">
		<div class="Testimonial__body">
				<slot></slot>
		</div>
		<div class="Testimonial__author">{{author}}</div>
	</div>
</template>

<script>
	export default{
		props: ['author'],
	}
</script>

<style lang="scss" scoped>
	.Testimonial{
		width: 75%;
		max-width: 900px;
		margin: 0 auto;
	}
	.Testimonial__author{
		margin-top: 30px;
		&:before{
			content: '';
			width: 30px;
			height: 1px;
			margin-right: 10px;
			vertical-align: middle;
			display: inline-block;
		}
	}
</style>