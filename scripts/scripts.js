(function(){
    const TTT = {
      search: function () {
        if (window.location.search) {
          var search = window.location.search.substring(1);
          search = search.replace("\&amp;\gi", "&");
          var queries = search.split("&");

          for (var query in queries) {
            var keyvalue = queries[query].split("=");
            var key = keyvalue[0];
            var value = keyvalue[1];

            if (TTRL[key] && value) {
              TTRL[key](value);
            } else if(TTRL[key]) {
              TTRL[key];
            }
          }
        } else {
          TTRL.set(0);
        }
      },
      loaded: function () {
        this.listen();
        this.search();
      },
      init: function () {
        this.loaded();
      }
    };

    window.TTT = TTT;
    TTT.init();
}());
