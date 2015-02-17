function projectModel(data,id){
	this.id=id;
	this.name=String(data.name) || "-";	
	this.lang=String(data.lang) || "EN-us";	
	this.isDeleted=Boolean(data.isDeleted) || false;	
	this.icon=String(data.icon) || "";
}
module.exports=projectModel;


/*
{
"id": "1",

"name":"RS-LEAN (TR)", 
"lang":"TR-tr", 
"isDeleted":"false",
"icon":"TR-tr"

},
*/

/*
db.projectDoc.insert()
*/