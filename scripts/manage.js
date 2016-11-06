(function(){
    const FETCH = {
      COUNT: 0,
      DICTIONARY: {},
      WORDS: null,
      collate: function () {
        const words = this.WORDS;
        const cap = 2000;
        const splits = [];
        let count = 0;
        let split = 0;
        splits[split] = [];

        for (const word in words) {
          if (count < cap) {
            count += 1;
          } else {
            count = 0;
            split += 1
            splits[split] = [];
          }
          splits[split].push(words[word]);
        }

        split = 0;

        for (split in splits) {
          let textarea = document.createElement("textarea");
          textarea.innerHTML = splits[split].join(",");
          textarea.onclick = function (event) {
            console.log(event.target.innerHTML.split(",").length)
          };

          document.querySelector("#results").appendChild(textarea);
        }
      },
      loaded: function () {
        this.collate();
      },
      init: function () {
        this.WORDS = lettert;
        this.loaded();
      }
    };

    window.FETCH = FETCH;
    FETCH.init();
}());
