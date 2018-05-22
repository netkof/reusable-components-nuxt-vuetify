<template >
  <div >
    <h3>Test de componente para forms</h3>
    <FormTest
      :containerProps="{fluid:true, 'grid-list-md':true}"
      :layoutProps="{row:true, wrap:true}"
      @inputsChange="updateForm($event)"
      :loading.sync="loading"
      ref="formTest"
      path="/admin/signin"
      method="post"
      :hide-submit="true"
      :schema="schema"
      :valid.sync="valid"
      @success="success($event)"
      @error="error($event)"
      @finish="finish($event)" >
      <!-- slot opcional para meter custom inputs al final del formulario, recibe el objeto que se envia al server (ots), 
        junto con el array de inputs de schema (se deben filtrar los inputs usando una propiedad propia ej. type == 'custom')
       -->
      <template slot="customInputs" slot-scope="props">
        <v-flex xs12 v-for="i in props.obj.inputs" :key="i.name + '_custom'" >
          <v-select v-if="i.type == 'custom' && i.subtype == 'myselect'"
            :items="i.items" 
            v-model="props.obj.ots[i.name]"
            :label="i.label"
            :item-value="i.value"
            :item-text="i.text"></v-select>
        </v-flex>
      </template>  
    </FormTest>
    <v-btn color="primary" 
      :disabled="!valid"
      :loading="loading" 
      @click="$refs.formTest.submit()">enviar</v-btn>  
  </div>
</template>

</v-data-table>
<script>
import rules from '~/assets/js/rules'
import FormTest from '~/components/FormVuetify'
export default {
  layout:'admn',
  components:{
    FormTest
  },
  data () {
    return {
      valid: '',
      loading: false,
      schema:{
        payloadName: '',
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
    }
  },
  methods: {
    finish(data){
      console.log(data)
    },
    error(data){
      console.log("ocurrió un problema al enviar formulario",data)
    },
    success(data){
      console.log("success al enviar formulario, respuesta:",data)
    },
    //cada vez que un input cambie de valor, util para mostrar, ocultar, o cambiar los valores de schema, dependendido
    //de lo que el usuario vaya introduciendo
    //event-> { name: 'nombredevariableinput', value:'valor'}
    updateForm(event){
      console.log(event)
    }
  },
}
</script>

<style lang="css">
</style>