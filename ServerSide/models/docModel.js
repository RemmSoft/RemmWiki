function docModel(data, id) {
    this.id = id;
    this.projectId = data.projectId || 0;
    this.subject = String(data.subject) || "Başlık Tanımlanmadı";
    this.content = data.content || "<p>İçerik Tanımlanmadı<p>";
    this.parentId = data.parentId || 0;
    this.createDate = Date(date.createDate) || new Date();
    this.createBy = data.createBy || 0;
    this.updateDate = Date(date.updateDate) || new Date();
    this.updateBy = data.updateBy || 0;
    this.docVersion = String(data.docVersion) || "0";
    this.orderIndex = data.orderIndex || 0;
}
module.exports = docModel;

/*
{
// parametre olarak kullanılacak
"projectId":"1",
//
"id":"1",
"subject":"Genel", 
"content":"

selam dünya !!
", 
"parentId":"", 
"createDate":"" ,
"createBy":"0",
"updateDate":"" ,
"updateBy":"0",
"docVersion":"1", // sayısal artan bir değer
"orderIndex" : "1"
},

*/