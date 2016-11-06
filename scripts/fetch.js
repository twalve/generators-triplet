(function(){
    const FETCH = {
      DONE: false,
      DICTIONARY: {},
      GRAMMAR: {
        all: [],
        adjective: [],
        adverb: [],
        noun: [],
        verb: []
      },
      INITIAL: 0,
      PARTS:["adjective", "adverb", "noun", "verb"],
      SEED: 0,
      SETS: ["t_0", "t_1", "t_2", "t_3", "t_4"],
      WORDS: null,
      collate: function () {
        FETCH.WORDS = subset.split(",");
        FETCH.INITIAL = FETCH.WORDS.length + "";
        document.querySelector("#initial").value = FETCH.INITIAL;

        while (FETCH.SEED) {
          FETCH.SEED -= 1;

          setTimeout(function() {
            FETCH.next();
          }, (FETCH.SEED * 100));
        }
      },
      done: function () {

        console.log(FETCH.INITIAL, FETCH.GRAMMAR.all.length, FETCH.GRAMMAR.all);

        if (FETCH.INITIAL === FETCH.GRAMMAR.all.length) {
          for (const part in FETCH.PARTS) {
            if (FETCH.GRAMMAR[FETCH.PARTS[part]]) {
              console.log(FETCH.PARTS[part]);
            }
          }
        } else {
          console.log("Need to get the diff, set it to WORDS, and start anew");
        }
      },
      fetch: function (term) {
        const http = new XMLHttpRequest();
        const url = "https://wordsapiv1.p.mashape.com/words/";
        const format = "?format=json";

        http.open("GET", url + term + format, true);
        http.setRequestHeader("X-Mashape-Authorization", "ukaqkIhjuFmshMP1PrghSBR41Ti3p1FiSjzjsnKDX3CeBWpt2C");
        http.onreadystatechange = function() {
            if (http.readyState === 4) {
                FETCH.success(http.responseText);
            }
        }
        http.send(null);
      },
      next: function () {
        if (FETCH.WORDS.length) {
          const word = FETCH.WORDS.pop();

          FETCH.fetch(word);
        }

        FETCH.progress();
      },
      progress: function () {
        document.querySelector("#remaining").value = FETCH.WORDS.length;

        if (!FETCH.WORDS.length && !FETCH.DONE) { // have all words been sourced
          FETCH.DONE = true;
          FETCH.done();
        }
      },
      read: function (term) {
        const script = document.createElement("script");
        script.src = "words/" + this.SETS[this.SET] + ".js";
        script.onload = FETCH.collate;

        document.head.appendChild(script);
      },
      success: function (response) {
        response = JSON.parse(response);

        if (response.word) {
          const word = response.word;
          const index = FETCH.WORDS.indexOf(word);

          FETCH.WORDS.splice(index, 1);
          FETCH.GRAMMAR.all.push(word);

          for (const result in response.results ) {
            const partOfSpeech = response.results[result].partOfSpeech;

            if (FETCH.GRAMMAR[partOfSpeech]) {
              if (FETCH.GRAMMAR[partOfSpeech].indexOf(word) === -1) {
                FETCH.GRAMMAR[partOfSpeech].push(word);
              }
            }
          }
        }

        FETCH.next();
      },
      loaded: function () {
        this.read();
      },
      init: function () {
        this.SEED = 5;
        this.SET = 4;
        this.loaded();
      }
    };

    window.FETCH = FETCH;
    FETCH.init();
}());
