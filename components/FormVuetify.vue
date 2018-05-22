
<template>
	<div>
		<v-form v-model="validAux" ref="form">
			<v-container v-bind="containerProps">
				<v-layout v-bind="layoutProps" >
					<v-flex
						v-for="i in schema.inputs" :key="i.name"
						v-bind="i.breakpoints ? i.breakpoints : {xs12: true}" >
	     
	     			<v-text-field v-if="i.type == 'text' && !i.hidden"
	     				v-model="ots[i.name]"
	     				:label="i.label"
	     				:prepend-icon="i.prependIcon"
	     				:append-icon="i.appendIcon"
	     				v-bind="i.props"
	     				:rules="i.rules"
	     				:required="i.required"
	     				@input="$emit('inputsChange',{name:i.name,value:$event})"
	     				></v-text-field>

						<v-select v-if="i.type == 'select' && !i.hidden "
							:items="i.items" 
       				v-model="ots[i.name]"
       				:rules="i.rules"
       				:label="i.label"
       				:prepend-icon="i.prependIcon"
       				:append-icon="i.appendIcon"
       				v-bind="i.props"
       				:item-value="i.value"
       				:item-text="i.text"
       				:required="i.required"
       				@input="$emit('inputsChange',{name:i.name,value:$event})"
       				></v-select>

       			<v-checkbox v-if="i.type == 'checkbox' && !i.hidden " 
       				v-model="ots[i.name]"
       				:true-value="i.trueValue != null ? i.trueValue : true"
       				:false-value="i.falseValue != null ? i.falseValue : false"
       				:rules="i.rules"
       				:label="i.label"
       				:prepend-icon="i.prependIcon"
       				:append-icon="i.appendIcon"
       				v-bind="i.props"
       				:required="i.required"
       				@change="$emit('inputsChange',{name:i.name,value:$event})"
       				></v-checkbox>

       			<v-radio-group v-if="i.type == 'radiogroup' && !i.hidden " 
       				v-model="ots[i.name]"
       				:rules="i.rules"
       				:label="i.label"
       				:prepend-icon="i.prependIcon"
       				:append-icon="i.appendIcon"
       				v-bind="i.props"
       				:required="i.required"
       				@change="$emit('inputsChange',{name:i.name,value:$event})"
       				>
       					<v-radio v-for="r in i.items" :key="r.text + r.value" :label="r.text" :value="r.value"></v-radio>
       				</v-radio-group>
						
						<v-switch v-if="i.type == 'switch' && !i.hidden " 
       				v-model="ots[i.name]"
       				:true-value="i.trueValue != null ? i.trueValue : true"
       				:false-value="i.falseValue != null ? i.falseValue : false"
       				:rules="i.rules"
       				:label="i.label"
       				:prepend-icon="i.prependIcon"
       				:append-icon="i.appendIcon"
       				v-bind="i.props"
       				:required="i.required"
       				@change="$emit('inputsChange',{name:i.name,value:$event})"
       				></v-switch>

       			<div v-if="i.type == 'custom'" v-html="i.template" >
       			</div>

       			<div class="input-error error--text">{{errors[i.name]}}</div>
	     		</v-flex>
	     		<!-- bind de inputs y ots, para poder introducir custom inputs u otro contenido, ots para agregar los valores
	     		de los custom inputs al objeto que se envia al server (ots) -->
	     		<slot v-bind:obj="{inputs:schema.inputs,ots:ots}" name="customInputs">
			    </slot>
					<v-btn :loading="loadingAux" v-if="!hideSubmit" color="primary" @click="submit()" :disabled="!validAux">Enviar</v-btn>
	    	</v-layout>
			</v-container>
		</v-form>
	</div>
</template>

<script type="text/javascript">
import parser from '~/assets/js/parsers'
//import rules from '~/assets/js/rules'
export default {
	props:{
		//en caso de que se edite un objeto existente, se toman sus valores para inicializar ots
		'edited-object':{
			type: Object,
			default: () => { return { } }
		},
		schema:{
			type: Object,
			default: function(){
				return {
					inputs: [],					
						//default se envian los inputs en la raiz de la request
					payloadName: ''
				}
			}
		},
		valid: {
			default: false
		},
		loading: {
			default: false
		},
		'container-props':{
			type: Object,
			default: function(){
				return {
					fluid: true,
					'grid-list-md': true,
				}
			}
		},
		'layout-props':{
			type: Object,
			default: function(){
				return {
					row: true,
					wrap: true,
				}
			}
		},
		//path para el request
		path:{required:true},
		method:{default: 'post'},
		'hide-submit':Boolean
	},
	data(){
		return{
			errors:{},
			//object to send
			//checar si se esta editando y recuperar los valores del objeto (las keys deben coincidir con los inputs de schema)
			ots: Object.keys(this.editedObject).length === 0 ? {} : {...this.editedObject},
		}
	},
	computed:{
		validAux:{
			set(value){
				this.$emit('update:valid',value)
				return value
			},
			get(){
				return this.valid
			}
		},
		loadingAux:{
			set(value){
				this.$emit('update:loading',value)
				return value
			},
			get(){
				return this.loading
			}
		}
	},
	methods:{
		submit(){
			this.loadingAux = true
			//default
			let otsAux = this.ots
			let axios = this.setAxiosInstance()
			//meter inputs dentro de un objeto
			if(this.schema.payloadName !== ''){
				otsAux = {}
				otsAux[this.schema.payloadName] = this.ots
			}
			if (!this.$refs.form.validate()) return
			//enviar formulario ocupando estandares propios de respuesta y manejo de errores propio
			this.errors = parser.clearInputErrors(this.errors)
			axios(this.path,otsAux)
			.then(data =>{

				this.loadingAux = false
				if(data.errors || !data.ok){
					this.$emit('error',data)
					this.$emit('finish',data)
					//concatenar los errores en un solo string
					let errorsString = parser.errors(data.errors)
					//mostrar los errores de cada input
					this.errors = parser.inputErrors(data.errors,this.errors)
					return 
				}
				this.$emit('success',data)
				this.$refs.form.reset()
				this.$emit('finish',data)
			})
			.catch(error => {
				this.loadingAux = false
				this.$emit('error',data)
				this.$emit('finish',data)
				console.log(error)
			})

		},
		setAxiosInstance(){
			let axios = this.$axios.$post
			if(this.method == 'put')
				axios = this.$axios.$put
			if(this.method == 'update')
				axios = this.$axios.$update
			return axios
		}
	}
	/*
	*******************EVENTOS*************************
	@success -> cuando la request se efectua correctamente
	@error
	@finish -> finaliza el request, correcto o con errores
	@inputsChange -> cuando cambia el valor de un input (excepto los del customInputs slot), regresa un objeto con el nombre del input que cambió y su valor
	******************TIPOS DE INPUT************************
	['text','select','date', 'checbox', 'radiogroup', 'switch']
	*****************EJEMPLO DE UN OBJETO SCHEMA******************
	schema:{
		//introduce todos los campos dentro de un objeto llamado payloadName, o en la raiz del request si se pone en blanco ''
    payloadName: 'user',
    inputs:[
      {
        type: 'text',
        name: 'Mail',
        label: 'Email',
        prependIcon: 'map',
        appendIcon: 'map',
        rules: [rules.required,rules.email],
        required: true,
        //opcional para todos los tipos
        hidden: false,
        //opcional para todos los tipos, default {xs12:true}
        breakpoints: {xs12:true, md6:true} ,
        //props adicionales, propios de cada tipo de input
        props:{color:'green',clearable:true}
      },{
        type: 'text',
        name: 'Password',
        label: 'Contraseña',
        breakpoints: {xs12:true, md6:true},
        props:{type:'password'}
      },{
        type: 'text',
        name: 'descripcion',
        label: 'Descripción',
        props:{textarea:true}
      },{
        type: 'select',
        name: 'colonia',
        label: 'Colonia',
        value: 'value',
        text: 'text',
        items:[
          {value: "CENTRO",text: "Centro"},
          {value: "ANZURES",text: "Anzures"}
        ]
      },{
        type: 'checkbox',
        trueValue: 'checado',//opcional, default true y false
        falseValue: 'sinchecar',//opcional
        name: 'verificado',
        label: 'Verificado',
        breakpoints: {xs12:true, md6:true},
      },{
        type: 'radiogroup',
        name: 'color',
        label: 'Color',
        items:[
          {value: "negro",text: "Negro"},
          {value: "azul",text: "Azul"},
          {value: "morado",text: "Morado"}
        ],
        breakpoints: {xs12:true, md6:true},
        props:{row: true}
      },{
        type: 'switch',
        trueValue: 'encendido',//opcional
        falseValue: 'apagado',//opcional
        name: 'estado',
        label: 'Estado',
        breakpoints: {xs12:true, md6:true},
      },{
        type: 'custom',
        //variables a la medida, que usaremos en el slot de de customInputs
        //variable para identificar el tipo de input
        subtype: 'myselect',
        name: 'sabor',
        value: 'value',
        text: 'text',
        items:[
          {value: "salado",text: "Salado"},
          {value: "dulce",text: "Dulce"},
        ]
      }
    ]
  }
	*/
}

</script>

<style lang="scss">

</style>

