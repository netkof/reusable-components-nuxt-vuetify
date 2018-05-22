<template>
	<v-dialog v-model="show" max-width="80 vw">
    <v-card>
    	<v-card-title><div class="title">{{title}}</div></v-card-title>
    	<v-card-text>
    		<slot name="main"></slot>
    	</v-card-text>
    	<v-card-actions class="justify-center">
    		<slot name="actions"></slot>
		    <v-btn color="warning" @click="show = false">{{closeText || 'Cancelar'}}</v-btn>
	    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
	export default{
		props: ['visible','close-text','title'],
	  computed: {
	    show: {
	      get () {
	        return this.visible
	      },
	      set (value) {
	        if (!value) {
	          this.$emit('update:visible',false)
	        }
	      }
	    }
	  },
	}
</script>

<style lang="scss">
	
</style>