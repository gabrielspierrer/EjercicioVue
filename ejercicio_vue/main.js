new Vue({
    created() {
       fetch('https://randomuser.me/api/?results=10')
           .then(respuesta => respuesta.json())
           .then(respuesta => this.usuarios = respuesta.results.map(usuario => {
               return {
                   name: usuario.name,
               }
           }));
    },
    el: "#app",
    data: {
         usuarios: [],
         usuariosDesordenados: [],
         usuariosOrdenados: [],
         usuariosComparados: [],
         comenzar: false,
         i: 0,
    },
    methods: {
     reiniciarJuego() {
       this.comenzar = !this.comenzar;
       this.usuariosDesordenados.splice(0, this.usuariosDesordenados.length);
       this.usuariosComparados.splice(0, this.usuariosComparados.length);
       this.i = 0;
       this.usuarios = this.usuariosOrdenados;
       this.usuarios.sort(function() {
         return (Math.random() -0.5);
       });
     },
     comenzarJuego() {
       this.comenzar = !this.comenzar;
       this.usuariosDesordenados = this.usuarios;
       this.usuariosDesordenados.sort(function() {
         return (Math.random() -0.5);
       }),
       this.usuariosOrdenados = this.usuarios.slice();
       this.usuariosOrdenados.sort(function(a, b) {
         if(a.name.first > b.name.first) {
           return 1;
         }
         if(a.name.first < b.name.first) {
           return -1;
         }
         if(a.name.first == b.name.first) {
           return 0;
         }
       });
     },
     compararUsuarios(usuario, index) {
       if(this.usuariosOrdenados[this.i] == usuario) {
         this.usuariosComparados.push(usuario);
         this.usuariosDesordenados.splice(index, 1);
         this.i = this.i+1;
       }
       if(this.usuarios.length == 0) {
         setTimeout(() => {  alert("¡Juego Finalizado!"); }, 200);
       }
     }
    }
   });