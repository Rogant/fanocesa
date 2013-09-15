var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var participanetesSchema = new Schema({
	Nombre: String,
	Apellido : String,
	Mail: String,
	fechaN: Date,
	boleta: String,
	tUser: String,
	Telefono: String
});

var participanetes = mongoose.model('participanetes', participanetesSchema);


exports.guardar = function(req, res){

	var guardar = new participanetes({ 
		Nombre: req.body.Nombre,
		Apellido : req.body.Apellido,
		Mail: req.body.Mail,
		fechaN: req.body.fechaN,
		boleta: req.body.boleta,
		tUser: req.body.tUser,
		Telefono: req.body.Telefono
	});

	guardar.save(function(err){
		console.log(err);
	});

	res.render('guardar', { 
		docs: 'intitTweets'
	});
};