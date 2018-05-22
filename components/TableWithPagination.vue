<template>
<div>
	<v-card>
	  <v-card-title v-if="searchable" >
	    <v-layout row>
	    	<v-flex xs12 md6>
	    		<slot name="search">
						<v-text-field
					    append-icon="search"
					    label="Buscar"
					    single-line
					    hide-details
					    v-model="searchFilter"
					  ></v-text-field>
					</slot>
	    	</v-flex>
	    </v-layout>
	  </v-card-title>
		<v-data-table
		  :headers="headers"
		  :items="items"
		  class="elevation-1"
		  :item-key="itemKey"
		  :loading="loading"
	    :rows-per-page-items="[itemsPerPage]"
	    :pagination.sync="pagination"
	    :total-items="totalItems"
	    v-bind="tableProps"
		>
		  <template slot="items" slot-scope="props">
	      <slot v-bind="props" name="items"></slot>
	    </template>
	    <template slot="expand" slot-scope="props">
				<slot v-bind="props" name="expand"></slot> 	
			</template>
			<template slot="no-data">
	      <slot name="no-data"></slot>
	    </template>
	    <template slot="footer">
	      <slot name="footer"></slot>
	    </template>
		</v-data-table>
	</v-card>
</div>	
</template>
<script>
import _ from 'lodash'
export default{
	props: {
		//ingresar opciones extra al component v-data-table
		'table-props':{
			default: function(){
				return {}
			}
		},
		'search-filter':{
			default: ''
		},
		headers:{
			default: function(){
				return []
			}
		},
		//en caso de que no se requiera hacer el primer request
		'initial-items':{
			default: function(){
				return []
			}
		},
		'item-key':{
			default: 'id'	
		},
		'items-name':{
			type: String,
			required: false
		},
		'items-per-page':{
			type: Number,
			default: 50,
		},
		'path':{
			type: String,
			required: true
		},
		'filter-name':{
			type: String,
			default: 'query',
		},
		'searchable':{
			default: false
		},
	},
	data(){
		return{
			pagination:{page:1},
			totalItems: 0,
			loading: false,
			items: this.initialItems.length > 0 ? this.initialItems : [],
		}
	},
  mounted(){
    //primer pagina al inicio
    //si se pasan los items por props, no se realiza el primer request
    if(this.items.length == 0){
    	this.fetchData(1,this.itemsPerPage,'')
    }
  },
	methods:{
    fetchData(page,rowsPerPage,query){
      let path = query != '' ? 
      `${this.path}?Page=${page}&Limit=${rowsPerPage}&${this.filterName}=${query}` : 
      `${this.path}?Page=${page}&Limit=${rowsPerPage}`
			//para conectar con una api real
      //return this.getDataFromApi(path)
      //funcion con datos dummy para ejemplo
      this.getFakeData(page,rowsPerPage)
    },
    getSearch(){
      this.fetchData(this.pagination.page,this.itemsPerPage,this.searchFilter)
    },
    //usado para actualizar los datos externamente (ej. desde el padre al eliminar o agregar un item)
    refetchData(){
			this.fetchData(this.pagination.page,this.itemsPerPage,this.searchFilter)
    },
    getDataFromApi(path){
    	this.loading = true
    	return this.$axios.$get(path)
      .then((data) => {
        console.log(data)
        //manejo de datos y de errors propio de la api
        if(data.errors || !data.ok){
          console.log("Error al recuperar lista de clientes",data.errors)
        }else{
          this.items = this.itemsName ? data.payload[this.itemsName] : data.payload
          this.totalItems = data.payload.total
        }
        this.loading = false
      })
      .catch((e)=>{
        console.log(e)
        this.loading = false
      })
    },
    //funcion para fines ilustrativos
    getFakeData(page,rowsPerPage){
    	this.loading= true
  		let items = [
				{Name:"Pedro",BirthDate:new Date("1992-01-28"),Sex:'Male',Nationality:'Mexican',AccountBalance:10000,LastSession:new Date("2018-05-22T12:07:00")},
				{Name:"Marcela",BirthDate:new Date("1888-01-28"),Sex:'Female',Nationality:'Mexican',AccountBalance:100000,LastSession:new Date("2018-05-22T11:07:00")},
				{Name:"Juan",BirthDate:new Date("1999-01-05"),Sex:'Male',Nationality:'Mexican',AccountBalance:88000,LastSession:new Date("2018-05-22T10:07:00")},
				{Name:"John",BirthDate:new Date("2010-03-15"),Sex:'Male',Nationality:'British',AccountBalance:18900,LastSession:new Date("2018-05-22T09:07:00")},
				{Name:"Mashur",BirthDate:new Date("1978-06-15"),Sex:'Male',Nationality:'Mexican',AccountBalance:12000,LastSession:new Date("2018-05-22T08:07:00")},
				{Name:"Julia",BirthDate:new Date("2005-08-03"),Sex:'Female',Nationality:'Spanish',AccountBalance:465000,LastSession:new Date("2018-05-22T07:07:00")}
    	]
    	let total = items.length
    	if(rowsPerPage > 0){
    		items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    	}
    	setTimeout(() => {
        this.loading = false
        this.items = items
      	this.totalItems = total
      }, 1000)
    }
  },
  created(){
    this.debouncedGetSearch = _.debounce(this.getSearch,1000)
  },
  watch: {
    'pagination.page': function(newValue,oldValue){
      this.fetchData(newValue,this.itemsPerPage,this.searchFilter)
    },
    searchFilter(newValue,oldValue){
      this.debouncedGetSearch()
    }
  },
}
</script>
<style lang="scss">

</style>