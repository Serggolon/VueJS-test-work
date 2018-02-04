Vue.component('menu-item', {
    props: ['menu'],
    template: '<div class="menu-item btn btn-success"><a  :href="menu.link">{{ menu.text }}</a></div>' 
})

Vue.component('tree', {
    props: ['disease'],
    template: '<div class="btn btn-success disease" data-rout="dis_inf" :data-prof="disease.consult_prof" :data-url="disease.link">{{disease.disease}}</div>' 
})
Vue.component('professional', {
    props: ['specialist'],
    template: '<div class="foto btn btn-success"><img class="foto_frame" :src="specialist.foto" data-rout="biography" :data-url="specialist.link"><p class="foto_name" data-rout="biography" :data-url="specialist.link">{{specialist.specialist}}</p></div>' 
})

Vue.component('anchored-item', {
    props: ['anchor'],
    template: '<a :id="anchor.id" :href="anchor.link"></a>' 
})
    
var app1 = new Vue({
  el: '#main',
  data: {
    alert: [
     'privet'
      ],
    
    menus: [
        {
        text: 'Главная страница',
        link: 'http://yandex.com'
            },
        { 
        text: 'Патологии',
        link: 'http://google.com'
            },
        { 
        text: 'Наши специалисты',
        link: 'http://google.com'
            },
        { 
        text: 'Методики лечений',
        link: 'http://google.com'
            },
        { 
        text: 'Контакты и обратная связь',
        link: 'http://google.com'
            },
        ],
      
    specialists: [
        {
        specialist: 'Серега',
        foto: 'http://placehold.it/50x50',
        link: 'text/bio_1.json',
            },
        { 
        specialist: 'Леха',
        foto: 'http://placehold.it/50x50',
        link: 'text/bio_2.json',
            },
        { 
        specialist: 'Кирилл',
        foto: 'http://placehold.it/50x50',
        link: 'text/bio_3.json',
            },
        { 
        specialist: 'Олег',
        foto: 'http://placehold.it/50x50',
        link: 'text/bio_4.json',
            },
        { 
        specialist: 'Максим',
        foto: 'http://placehold.it/50x50',
        link: 'text/bio_5.json',
            },
        ],
      
      diseases: [
        {
        disease: 'бол 1',
        link: 'text/dis_1.json',
        consult_prof: '1, 3',
            },
        { 
        disease: 'бол 2',
        link: 'text/dis_2.json',
        consult_prof: '1, 2, 4',
            },
        { 
        disease: 'бол 3',
        link: 'text/dis_3.json',
        consult_prof: '2, 3, 5',
            },
        { 
        disease: 'бол 4',
        link: 'text/dis_4.json',
        consult_prof: '1, 4',
            },
        { 
        disease: 'бол 5',
        link: 'text/dis_5.json',
        consult_prof: '4, 5',
            },
        ],
       
      anchors: [
        {
        link: '#c_m',
        id: 'c_main',
       
            },
        { 
        link: '#dis',
        id: 'disease',
            },
        { 
        link: '#bio',
        id: 'biograph',
            },
        { 
        link: '#cont',
        id: 'contact',
            },
        ],
    
      footer: 'Привет от What do you want?! 2017',
    },
    methods:{
        // промис для скачивания контента по ссылке указанной в атрибуте data-url
        uploaddis: function (url){
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
        },
        //функция вывода нужных специалистов
        profselect: function (target){
            var profs=target.getAttribute('data-prof');
            var prom=profs.split(', ');
            var spec=[];
            var domspec=document.getElementById('prof');
            var speclist=domspec.children;
            for(i=0; i<speclist.length; i++){
                speclist[i].style.display="";
            };
            for(i=0; i<prom.length; i++){
                spec[i]=Number(prom[i]);
                speclist[spec[i]-1].style.display="inline-block";
            };
        
        },
        
        
        
        //функция отключения отображения блоков и их очистки
        docclearandoutput: function (data, datarout, target){
            var contacts=document.getElementById('contacts');
            var output_block=document.getElementById(datarout);
            var dataobj=JSON.parse(data);
     
            switch (datarout){
                
                case 'dis_inf':
                    var dis_inf=document.getElementById('dis_inf');
                    var disandprof=document.getElementById('disandprof');
                    var biography=document.getElementById('biography');
                    //clear
                    dis_inf.innerHTML="";
                    biography.style.display="";
                    contacts.style.display="";
                    //fill
                    disandprof.style.display="block";
                    app1.profselect(target);
                    output_block.innerHTML="<h1 class=\"title\">Возможное заболевание: "+dataobj.Name+"</h1></br><p class=\"inf comtxt\">"+dataobj.Describe+"</p>";
                    break;

                case 'biography':
                    var biography=document.getElementById('biography');
                    //clear
                    biography.innerHTML="";
                    contacts.style.display="";
                    //fill
                    biography.style.display="block";
                    output_block.innerHTML="<h1 class=\"title\">"+dataobj.Name+"</h1></br><h2 class=\"inf\"> Должность: "+dataobj.Position+"</h2></br><p class=\"inf comtxt\">"+dataobj.Biography+"</p>";
                    break;
                
                case 'contacts':
                    //clear
                    contacts.innerHTML="";
                    //fill
                    contacts.style.display="block";   
                    output_block.innerHTML=dataobj.Name+dataobj.Describe+dataobj.Biography;
                    break;
                default:
                    alert( 'Я таких значений не знаю' );
                    }
          },
        
        //click processing function
        clickall: function(event){
            var target=event.target;
            if(!target.classList.contains('foto_frame') && !target.classList.contains('disease') && !target.classList.contains('foto_name')) {return;}
            var datarout=target.getAttribute('data-rout');
            var dataurl=target.getAttribute('data-url');
            app1.uploaddis(dataurl).then( function(data){

                // обработка скаченого контента в then (выбор блока для контента и его размещение внутри этого блока, перемещение на странице по якорной ссылке)

                switch (datarout) {
                  case 'dis_inf':
                    var anchor_block=document.querySelector('#disease');
                    break;
                  case 'biography':
                    var anchor_block=document.querySelector('#biograph');
                    break;
                  case 'contacts':
                    var anchor_block=document.querySelector('#contact');
                    break;
                  default:
                    alert( 'Я таких значений не знаю' );
            }

            
            app1.docclearandoutput(data, datarout, target);
            
            //генерируемый клик
            var evnt = new Event("click");
            anchor_block.dispatchEvent(evnt);

        // обработка ошибок
            }, function(error){console.log(error)} ).catch(function(){console.log('нестанд ошиб');});
       },
        
    },
    
});











