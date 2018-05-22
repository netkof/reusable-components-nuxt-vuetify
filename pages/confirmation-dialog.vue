<template>
	<div id="root">
		<ConfirmationDialog></ConfirmationDialog>
		<v-btn color="success" @click="confirmVote()">Votar por el pri</v-btn>
		<v-card>
		  <v-card-text>
		    {{ aux }}
		  </v-card-text>
		</v-card>
	</div>
</template>
<script >
import ConfirmationDialog from '~/components/ConfirmationDialog'
export default{
	components:{
		ConfirmationDialog
	},
	data(){
		return{
			aux: ''
		}
	},
	methods:{
		confirmVote(){
			this.$store.dispatch('confirmer/ask',{
				confirmBtn: "Dale, no me importa",
				cancelBtn: "Mejor no",
				title:"¿Estás seguro?",
				body:"¿En realidad estas conciente de lo que podría ocasionar? O_O"
			})
			.then(confirmation => {
				if (confirmation) {
					this.vote()
				}
			})
		},
		vote(){
			this.aux = ":("
		}
	}
}
</script>
<style scoped>
	
</style>