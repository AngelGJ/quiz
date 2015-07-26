var path = require('path');
var Sequelize = require('sequelize');   // Carga Modelo ORM
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});
var Quiz = sequelize.import(path.join(__dirname,'quiz'));   // Importa la definicion de la tabla Quiz en quiz.js
exports.Quiz = Quiz; // Exporta definición de tabla Quiz
                                   
// sequelize.sync() crea e inicializa tabla de preguntas en DB:
sequelize.sync().success(function() {              // success(..) ejecuta el manejador una vez creada la tabla
   Quiz.count().success(function (count){
     if(count === 0) {                             //  Inicializa la tabla si está vacía
          Quiz.create({ pregunta: 'Capital de Italia',
                      respuesta: 'Roma'
                      })
         .success(function(){console.log('Base de datos inicializada')});
     };
  });
});
