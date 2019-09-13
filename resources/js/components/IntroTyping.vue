<template>
	
	<div class="IntroTyping">
		<div class="IntroTyping__body">
			<span class="IntroTyping__static-text" v-text="staticText"></span>
			<span class="IntroTyping__animated-text"  v-for="text in typingTexts" v-if="text.show" v-text="text.content"></span>
		</div>
	</div>

</template>

<script>
	export default{
		data(){
			return {
				staticText: Config.introStaticText,
				currentText: 0
			}
		},

		computed: {
			typingTexts() {
				return Config.introTypingTexts.map((text, index) => ({content: text, show: (index == this.currentText)}));
			},
			numberOfTexts() {
				return this.typingTexts.length - 1;
			} 
		},


		mounted() {
			setInterval(() => {
				if( this.currentText == this.numberOfTexts ) {
					this.currentText = 0;
				} else {
					this.currentText ++;
				}
			}, 4000)
		}
	}
</script>

<style lang="scss" scoped>
	.IntroTyping{
		
		&__body{
			white-space: nowrap;
			-webkit-transition: all 0.5s ease-in-out;
			-moz-transition: all 0.5s ease-in-out;
			-ms-transition: all 0.5s ease-in-out;
			-o-transition: all 0.5s ease-in-out;
			transition: all 0.5s ease-in-out;
			color: white;
			display: flex;
			justify-content: center;
			white-space: nowrap;
		}
		
		&__animated-text{
			margin: 0px 0 0 0.3em;
			padding: 0px;
			font-weight: bold;
			overflow: hidden;
			display: inline-block;
			border-right: 0.1em solid;
			animation: typing 4s alternate, blink 0.5s infinite alternate;
			width: 0px;
			vertical-align: top;
			text-align: left;
			white-space: nowrap;
		}
	}

	@keyframes typing{
		from{
			width: 0px;
		}
		35%{
			width: 100%;
		}
		65%{
			width: 100%;
		}
		to{
			width: 0px;
		}
	}

	@keyframes blink{
		50%{
			border-color: transparent;
		}
	}
</style>