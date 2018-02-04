Vue.component('menu-item', {
    props: ['menu'],
    template: '<div class="menu-item"><a :href="menu.link">{{ menu.text }}</a></div>' 
})

Vue.component('tree', {
    props: ['disease'],
    template: '<div class="btn btn-success">{{disease.disease}}</div>' 
})
Vue.component('professional', {
    props: ['specialist'],
    template: '<div class="foto_frame"><img :src="specialist.foto"><p>{{specialist.specialist}}</p></div>' 
})
    
var app = new Vue({
  el: '#menu',
  data: {
    
    menus: [
        {
        text: '������� ��������',
        link: 'http://yandex.com'
            },
        { 
        text: '���������',
        link: 'http://google.com'
            },
        { 
        text: '���� �����������',
        link: 'http://google.com'
            },
        { 
        text: '�������� �������',
        link: 'http://google.com'
            },
        { 
        text: '�������� � �������� �����',
        link: 'http://google.com'
            },
        ]
    }
})

var app = new Vue({
  el: '#cont_main',
  data: {
    
    diseases: [
        {
        disease: '��� 1',
        
            },
        { 
        disease: '��� 2',
        
            },
        { 
        disease: '��� 3',
        
            },
        { 
        disease: '��� 4',
        
            },
        { 
        disease: '��� 5',
        
            },
        ]
    }
})

var app = new Vue({
  el: '#cont_1',
  data: {
    
    specialists: [
        {
        specialist: '���',
        foto: 'http://placehold.it/50x50',
            },
        { 
        specialist: '���',
        foto: 'http://placehold.it/50x50',
            },
        { 
        specialist: '���',
        foto: 'http://placehold.it/50x50',
            },
        { 
        specialist: '���',
        foto: 'http://placehold.it/50x50',
            },
        { 
        specialist: '���',
        foto: 'http://placehold.it/50x50',
            },
        ]
    }
})

function uploaddes(url){
 return new Promise(function (resolve,reject){
     var text=$.ajax(url,{
         success: function(data){
             resolve(data);
         },
         error: function(e, t, tt){
             reject(tt);
         },
         cache: false
     });
 });   
}
    