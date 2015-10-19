 $(document).ready(function() {
   var URL = "https://docs.google.com/spreadsheets/d/1sTasDpO_Ay2YLFLFGgrIOQ9KYzB5SK3DU5mKBmcK6sE/pubhtml?gid=1856021763&single=true";
   var cfpbColumn = "CFPB Tags (All, FF, FS, PF, PS)";

   Tabletop.init({
     key: URL,
     callback: showData,
     simpleSheet: true
   });

   function showData(data, tabletop) {
     var tableOptions = {
      "data": data,
      "pagination": 10,
      "tableDiv": "#resources",
     };

     Sheetsee.makeTable(tableOptions);

     $("input[type=checkbox]").change(function() {
       var filtered = [];
       var checked = $("input[type=checkbox]:checked");
       if(checked) {
         data.forEach(function(d){
           var tags = d[cfpbColumn].replace(/\s+/g, "").split(',');
           var found = false;
           $.each(checked, function(index, cb){
             if(tags.indexOf(cb.id.trim()) > -1 && !found) {
               found = true
               filtered.push(d);
             }
           });
         });
         Sheetsee.makeTable(tableOptions, filtered);

       } else {
         Sheetsee.makeTable(tableOptions);
       }
     });
   }
 }) //close ready
