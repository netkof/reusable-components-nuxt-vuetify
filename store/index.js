import Vuex from 'vuex'
import Confirmer from './confirmer'
const createStore = () => {
	return new Vuex.Store({
		modules:{
			confirmer: Confirmer
		},
		state:{
			
		},
		mutations:{
 			
		},
		actions:{
			
		},
		getters:{
			
		}
	})
}

export default createStore