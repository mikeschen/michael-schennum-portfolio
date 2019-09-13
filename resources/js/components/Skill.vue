<template>
	
	<div class="Skill">
		<div class="Skill__head">
			<span class="Skill__title flex"><slot></slot></span>
			<span class="Skill__percent">{{percent}}%</span>
		</div>
		<div class="Skill__bar">
			<div class="Skill__bar-filling"></div>
		</div>
	</div>

</template>

<script>
	export default{
		props: ['percent'],
		data(){
			return {
				filled: 0
			}
		},
		computed: {
			progress(){
				return this.percent + '%';
			}
		},
		mounted(){
			
			Event.listen('fire-skills', () => this.fireSkills());
		},

		methods: {
			fireSkills(){
				$(this.$el).find('.Skill__bar-filling').animate({
					width: this.progress
				}, 3000);
			}
		}


	}
</script>

<style lang="scss" scoped>
	.Skill{
		margin-top: 20px;
		&__head{
			display: flex;
			margin-bottom: 5px;
			text-transform: uppercase;
			font-size: 12px;
		}
		&__bar{
			height: 10px;
			width: 100%;
			background: rgba(0,0,0,.15);
			position: relative;
		}
		&__bar-filling{
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 0%;
			background: black;
		}

	}

	.flex{
		flex: 1;
	}
</style>