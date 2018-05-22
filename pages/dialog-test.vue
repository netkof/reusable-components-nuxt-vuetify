<template>
	<div id="root">
		<!-- title y close-text opcionales -->
		<Dialog
			title="Título del dialog"
			:visible.sync="visible"
			close-text="Cerrar"
			>
			<template slot="main">
				Este es el contenido del dialog
			</template>
			<template slot="actions">
				<v-btn color="primary">Otro boton</v-btn>
			</template>
		</Dialog>
		<v-btn
			@click="visible = true" 
			color="success">Abrir</v-btn>
	</div>
</template>
<script >
import Dialog from '~/components/Dialog'
export default{
	components:{
		Dialog
	},
	data(){
		return{
			visible: false
		}
	}
}
</script>
<style scoped>
	
</style>