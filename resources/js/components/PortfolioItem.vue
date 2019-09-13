<template>
		<div class="Portfolio-item">
			<a class="Portfolio-item__link popup-link" :href="data.href" :title="data.name">
				<span class="Portfolio-item__name">{{data.name}}</span>
			</a>
			<img :src="data.image" :alt="data.name">
		</div>
</template>

<script>
	export default{
		props: ['data']
	}
</script>
