
var http     = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://bpmzsanfrohefo:54c1b0b1d14def6f50a60e3b56b05f3edae76982f52b6271e31efa4e8dbbce58@ec2-23-21-101-249.compute-1.amazonaws.com:5432/d5omaho794sa7u";

var express = require('express');
var exphbs  = require('express-handlebars');

var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');
var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.engine( 'exphbs', exphbs( { 
  extname: 'exphbs', 
  defaultLayout: 'plantilla', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );

app.set( 'view engine', 'exphbs' );
app.set('port', (process.env.PORT || 5000))


app.post('/listarCuentoPorUsuario', (req, res) => {
   
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM cuento WHERE idusuario='+ req.body.idusuario +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.post('/editarCuento', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("UPDATE cuento SET nombre='"+ req.body.cuento.nombre +"',descripcion='"+ req.body.cuento.descripcion +"',creditos='"+ req.body.cuento.credito +"' WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.post('/eliminarPagPorId', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("DELETE FROM cuento WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.post('/eliminarPregPorId', (req, res, next) => {
    var client = new pg.Client(conString);
     //console.log("miau "+util.inspect(req,false,null));
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("DELETE FROM cuento WHERE idcuento="+ req.body.idcuento +";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.post('/listarCuentoPorId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM cuento WHERE idcuento='+ req.body.idcuento +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


app.post('/listarPreguntas', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM pregunta WHERE idcuento='+req.body.idcuento+';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.post('/listarImg', (req, res) => {
    var client = new pg.Client(conString);
    //console.log("miau "+util.inspect(req,false,null));
    //console.log("chibi: "+req.body.idcuento);
    var idcuento=req.body.idcuento;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM pagina WHERE idcuento=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.post('/guardarCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("INSERT INTO  cuento  (nombre ,  descripcion ,  creditos ,  idusuario) VALUES ('"+req.body.nombre+"', '"+req.body.descripcion+"', '"+req.body.credito+"', 1);", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result);
        });
        
    });
    
    
   
   
});

app.post('/guardarPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        //console.log("nombre "+req.body.nombre+', descrip '+req.body.descripcion+', credito'+req.body.credito);
        client.query("INSERT INTO  pregunta  (img1 ,  img2 ,  audio ,  respuesta , idcuento) VALUES ('"+req.body.pregunta.img1+"', '"+req.body.pregunta.img2+"', '"+req.body.pregunta.audio+"', '"+req.body.pregunta.respuesta+"',"+req.body.id+");", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(req.body);
        });
        
    });
    
    
   
   
});
app.get('/ultimoid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        client.query('SELECT idcuento FROM cuento ORDER BY idcuento DESC ;', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            console.log("mi: "+result.rows[0].idcuento);
            client.end();
            return res.json(result.rows);
            
            
        });
        
        
    });
   
   
});

app.post('/insertarImg', (req, res) => {
    //console.log("miau "+util.inspect(req,false,null));
    //console.log("img "+req.body.paginas.length);
    var id=req.body.id;
    var client = new pg.Client(conString);
    client.connect(function(err) {
        client.query("INSERT INTO pagina(imagen ,  audio ,  idcuento ) VALUES ('"+ req.body.imagen +"', '"+ req.body.audio +"', '"+ id +"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
           
            client.end();
            return res.json(result.rows);
            
            
        });
        
        
    });

});



app.post('/eliminarPreguntasPorCuento', (req, res) => {
    var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM pregunta WHERE idcuento=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
        });
    });
});

app.post('/eliminarPaginasPorCuento', (req, res) => {
    var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM pagina WHERE idcuento=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});

app.post('/eliminarCuento',(req,res)=>{
     var client = new pg.Client(conString);
     var idcuento=req.body.idcuento;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('DELETE FROM cuento WHERE idcuento=' + idcuento + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
});


//Usuario para actualizar y eliminar
app.post('/mostrarUsuario',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.body.idusuario;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario WHERE idusuario=' + idusuario + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result.rows);
        
        });
        
    });
    
    
});

app.post('/actualizarUsuario',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.body.idusuario;
    

    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuario SET usuario ='"+req.body.usuario+"', pass='"+req.body.pass+"', nombre='"+req.body.nombre+"' WHERE idusuario='" + idusuario + "';", function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
    
    
});

app.post('/eliminarUsuario',(req,res)=>{
     var client = new pg.Client(conString);
     var idusuario=req.body.idusuario;
    
     client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('DELETE FROM usuario WHERE idusuario=' + idusuario + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
             client.end();
            return res.json(result);
        });
    });
    
    
});

app.get('/', function (req,res) {
	res.render('partials/index');
  		
});

app.get('/nosotros', function (req,res) {
	res.render('partials/nosotros');
  		
});

app.get('/listarCuentos', function (req,res) {
	res.render('partials/listarCuentos');
  		
});

app.get('/crearCuento', function (req,res) {
	res.render('partials/crearCuento');
  		
});

app.get('/editarCuento', function (req,res) {
	res.render('partials/editarCuento');
  		
});

app.get('/cuento', function (req,res) {
	res.render('partials/cuento');
  		
});

app.get('/usuarios', function (req,res) {
	res.render('partials/usuarios');
  		
});

app.get('/crearUsuario', function (req,res) {
	res.render('partials/crearUsuario');
});

app.get('/usuario', function (req,res) {
	res.render('partials/usuario');
  		
});

app.post('/GuardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (usuario ,  pass ,  nombre ) VALUES ('"+req.body.usuario+"', '"+req.body.pass+"', '"+req.body.nombre+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});


app.get('/delete/:id', function (req,res) {
	var id = req.params.id;

	connection.query('DELETE FROM donuts WHERE iddonuts = ?', [id], function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'success'});
			} else {
				response.push({'msg' : 'No Result Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});


app.get('/crear', function (req,res) {
res.render('partials/crear');
});

app.post('/subir', (req, res) => {
    req.fields; // contains non-file fields 
    req.files; // contains files 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});

    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/images/cuentos/';
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.end(file_name);
    });
    

});


console.log("Servidor iniciado");
    // escuchar
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

