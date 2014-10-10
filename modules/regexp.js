var exp_relative = /("|')((\/)[a-zA-Z0-9@:%_+.,~#?&;áéíóúÁÉÍÓÚ\-\/\=]+)("|')/g
  , exp_absolute = /("|')(((f|ht){1}t(p|ps):\/\/)[a-zA-Z0-9@:%_+.,~#?&;áéíóúÁÉÍÓÚ\-\/\=]+)("|')/g
  , exp_css = /(url\(("|')[\w@:%_+.,~#?&;áéíóúÁÉÍÓÚ\-\/\=]('|")\))/g;

exports.absolute = function(texto){
    var tmp_array = texto.match(exp_absolute);
    if (tmp_array !== null){
      for (var i = 0; i < tmp_array.length; i++){
        tmp_array[i] = tmp_array[i].substring(1, tmp_array[i].length-1);
      }
      
      var url_array = tmp_array.slice()
        , tmp
        , domain
        , path;
      
      for (var i = 0; i < tmp_array.length; i++){
        tmp = url_array[i].substr(url_array[i].indexOf('//')+2);
        domain = tmp.substr(0, tmp.indexOf('/'));
        path = tmp.substr(tmp.indexOf('/'));
        url_array[i] = '/p?d='+domain+'&p='+path;
      }
      console.log(url_array[1]);
      for (var i = 0; i < tmp_array.length; i++){
        texto = texto.replace(tmp_array[i], url_array[i]);
      }
      //console.log(url_array);
      return texto;
    }else{
      return texto;
    }
};




exports.relative = function(texto, domain){
    var tmp_array = texto.match(exp_relative);
    if (tmp_array !== null){
      // Retiramos las comillas ------------------------------------------------
      for (var i = 0; i < tmp_array.length; i++){
         tmp_array[i] = tmp_array[i].substring(1, tmp_array[i].length-1);
      }
      //------------------------------------------------------------------------
      var url_array = tmp_array.slice();
        //, path;
      
      for (var i = 0; i < tmp_array.length; i++){
         url_array[i] = "/p?d="+domain+"&p="+tmp_array[i];
      }
      
      for (var i = 0; i < tmp_array.length; i++){
         texto = texto.replace(tmp_array[i], url_array[i]);
      }
      return texto;
    }else{
      return texto;
    }
};

exports.cssUlrs = function(texto, domain){
   var tmp_array = texto.match(exp_css);
   if (tmp_array !== null){
      // Retiramos las comillas ------------------------------------------------
      for (var i = 0; i < tmp_array.length; i++){
         tmp_array[i] = tmp_array[i].substring(5, tmp_array[i].length-1);
      }
      //------------------------------------------------------------------------
      var url_array = texto.match(exp_css)
        , path;
      
      for (var i = 0; i < tmp_array.length; i++){
         url_array[i] = "/p?d="+domain+"&p="+path;
      }
      
      for (var i = 0; i < tmp_array.length; i++){
         texto = texto.replace(tmp_array[i], url_array[i]);
      }
      return texto;
   }else{
      return texto;
   }
}
