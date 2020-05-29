import Vue from 'vue';
import App from './App.vue'; 
new Vue({
	render: function(h) {
		console.log(App)
		return h(App)
	}
}).$mount('#app');
