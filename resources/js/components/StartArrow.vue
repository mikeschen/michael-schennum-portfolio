<template>
	
	<div class="StartArrow">
		<div class="StartArrow__body">
			{{text}}
		</div>
		<div class="StartArrow__arrow"></div>
		<div class="StartArrow__arrow"></div>
		<div class="StartArrow__arrow"></div>
	</div>

</template>

<script>
	export default{
		props: ['text']
	}
</script>

<style lang="scss" scoped>
	.StartArrow{
		display: flex;
		flex-direction: column;
		animation: shake 0.5s alternate infinite;
		animation-timing-function: ease-in-out;
		&__body{
			text-transform: uppercase;
			font-size: 10px;
			position: relative;
			padding: 10px 10px;
			&:before{
				position: absolute;
				content: '';
				top: -60px;
				left: 50%;
				margin-left: 0px;
				width: 2px;
				height: 50px;
				background-color: white;
			}
		}
		&__arrow{
			border-left: 2px solid white;
			border-bottom: 2px solid white;
			width: 15px;
			height: 15px;
			-moz-transform: rotate(-45deg);
			-webkit-transform: rotate(-45deg);
			-o-transform: rotate(-45deg);
			-ms-transform: rotate(-45deg);
			transform: rotate(-45deg);
			margin-bottom: -8px;
		}
	}

	@keyframes shake{
		from{
			-moz-transform: translateY(0px);
			-webkit-transform: translateY(0px);
			-o-transform: translateY(0px);
			-ms-transform: translateY(0px);
			transform: translateY(0px);
		}
		to{
			-moz-transform: translateY(10px);
			-webkit-transform: translateY(10px);
			-o-transform: translateY(10px);
			-ms-transform: translateY(10px);
			transform: translateY(10px);
		}
	}
</style>