<template>
	<div id="root">
		<!-- items-name -> el nombre de la variable que regresa el servidor, dentro de la que estaran el array de items, si no se especifica, se usa el contenido de payload -->
		<TableWithPagination
    	ref="tableX"
    	:path="path"
    	:headers="headers"
    	items-name="people"
    	:items-per-page="2"
    	>
    		<!-- mismos slots disponibles que en v-data-table de vuetify (vease, doc vuetify) -->
    		<template slot="items" slot-scope="props">
    			<tr>
    				<!-- se usan los atributos de item -->
    				<td>{{props.item.Name }}</td>
    				<td>{{props.item.BirthDate | dateFilter }}</td>
    				<td>{{props.item.Sex }}</td>
    				<td>{{props.item.Nationality }}</td>
    				<td>{{props.item.AccountBalance | mxnFilter }}</td>
    				<td>{{props.item.LastSession | dateFilter('toNow') }}</td>
    			</tr>
    		</template>
    </TableWithPagination>
	</div>
</template>
<script >
import TableWithPagination from '~/components/TableWithPagination'
export default{
	components:{
		TableWithPagination
	},
	data(){
		return{
			//debe ser un path válido
			path:`/path/de/api`,
  		headers:[
				{text:"Name",value:"Name",sortable:false},
				{text:"Birthdate",value:"Birthdate",sortable:false},
				{text:"Sex",value:"Sex",sortable:false},
				{text:"Nationality",value:"Nationality",sortable:false},
				{text:"Account Balance",value:"AccountBalance",sortable:false},
				{text:"Last Session Date",value:"LastSession",sortable:false},
  		]
		}
	}
}
</script>
<style scoped>
	
</style>