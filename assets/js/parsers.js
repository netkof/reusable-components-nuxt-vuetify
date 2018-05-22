export default{
	//convierte el array de errores regresados por el server en un solo string
	//usado en alerts
	errors(errorsArray){
		let auxString = ''
		let first = true
		errorsArray.forEach((e)=>{
			if (first) auxString +=  e['name'] ? `${e['name']}:${e['message']}`:`${e['message']}` 
			else auxString += e['name'] ? `, ${e['name']}:${e['message']}`:`, ${e['message']}` 
			first = false
		})
		return auxString
	},
	//regresa un objeto de strings, usadas para mostrar los errores en los inputs 
	inputErrors(errorsArray,errorsObj){
		let errors = errorsObj
		//let errorAux = null
		// for (var key in errorsObj) {
		//    if (errorsObj.hasOwnProperty(key)) {
		//    		errorAux = errorsArray.find((e)=>e.name == key)
		//       if(typeof errorAux != 'undefined'){
		//    			console.log("error:",errorAux)
		//        	errors[key] = errorAux.message
		//       }
		//    }
		// }
		errorsArray.forEach((e)=>{
			errorsObj[e.name] = e.message
		})
		return errors
	},
	clearInputErrors(errorsObj){
		let errors = errorsObj
		let errorAux = null
		for (var key in errorsObj) {
		   if (errorsObj.hasOwnProperty(key)) {
		   		errors[key] = ""
		   }
		}
		return errors
	}
}