import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const customActions = {
	pdf: {
		method: 'GET',
		url: 'pdf/spring-boot-reference.pdf'
	}
};

export default Vue.resource('pdf', {}, customActions, { responseType: 'blob' });
