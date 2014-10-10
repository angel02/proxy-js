function css_urls(texto, domain){
   var exp_css = /(url\(("|')([\w@:%_+.,~#?&;áéíóúÁÉÍÓÚ\-\/\=]+)('|")\))/g;
   var tmp_array = texto.match(exp_css);
   console.log(tmp_array);
   if (tmp_array !== null){
      // Retiramos las comillas ------------------------------------------------
      for (var i = 0; i < tmp_array.length; i++){
         tmp_array[i] = tmp_array[i].substring(5, tmp_array[i].length-2);
      }
      console.log(tmp_array[0]);
      //------------------------------------------------------------------------
      var url_array = tmp_array.slice()
        , path;
      
      for (var i = 0; i < tmp_array.length; i++){
         url_array[i] = "/p?d="+domain+"&p="+url_array[i];
      }
      
      for (var i = 0; i < tmp_array.length; i++){
         texto = texto.replace(tmp_array[i], url_array[i]);
      }
      return texto;
   }else{
      return texto;
   }
}

var texto = "url('../css/style.css'); Lo otro es código de css url(\"../css/style.css\")";

console.log(css_urls(texto, "alt1040.com"));
