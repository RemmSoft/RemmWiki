
//Module Instlations
var express= require('express')
 	,http = require('http')
 	,path = require('path')
 	,mongoose = require('mongoose')
 	,mongoStore = require('connect-mongo')(express)
 	,config = require('config')
 	,utils = require('./lib/utils')
 	,ENV = process.env.NODE_ENV || 'development';

/*
	Express objesi olustur
*/
var app = express();

/** 
 * Birkaç yerde kullanacağımız için bir tane mongoose objesi tanımla. Mongoose, nodejs te mongodb
 * işlemleri için gereken modül
 */
mongoose = utils.connectToDatabase(mongoose, config.db);

/**
 * Uygulama için genel ayarları yap. Bunlar;
 * -port: uygulamayı istediğiniz porttan çalıştırabilirsiniz. Bu port değerini sistem değişkeninden 
 * almak en sağlıklı yoldur.
 * -views: Kullanmak istediğin template engine tanımla. Burada jade kullandık.
 * -session: Web projesi, kullanıcı işlemleri derken bize bir session lazım oldu. Session bilgileri
 * mongodb de tutuluyor.
 * -csrf: form olayları için gerekli csrf token oluşturup bu değişkene ata. Csrf değişkenini projenin herhangi
 * bir yerinde kullanabilirsiniz.
 */
app.configure('all', function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: true });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "golb",
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        store: new mongoStore({
            url: utils.dbConnectionUrl(config.db)
        })
    }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.csrf());
    app.use(function(req, res, next) {
        res.locals.token = req.session._csrf;
        next();
    });
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });
});
 
/**
 * Aslında burayı anlatmama bile gerek yok. Ortam bazlı log ayarları yap. Devde bazı 
 * mesajları göster prodda gösterme gibi...
 */
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
 
app.configure('production', function() {
    app.use(express.errorHandler());
});
 
 
/**
 * Projede kullanılan modelleri yükle. User nesnesi için 'User', blog nesnesi için de 'help' modelini çağır.
 * Çağırırken mongoose parametre geç. Çünkü model de mondgodb işlemleri var
 */
require('./models/help')(mongoose);
require('./models/User')(mongoose);
 
/**
 * Controller tanımlamaları yap. Login, logout, new post gibi işlemleri bu controllerlarda işlevlerine 
 * göre sınıflandır
 */
['help', 'Site', 'User'].forEach(function (controller) {
    require('./controllers/' + controller + 'Controller')(app, mongoose, config);
});
 
/**
 * Sistemde hata olursa, projeyi durdurmadan hatayı konsola bas
 */
process.on('uncaughtException', function(err) {
    console.log(err);
});
 
/**
 * Uygulamaların ayar ve model tanımlamaları bitti. Yukarıda tanımlanan portta uygulamayı başlat.
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

//server configrasyonlari
//view ler icin routing 
//db islemleri
//set head,get gead, get content,set content fonksiyonlari
