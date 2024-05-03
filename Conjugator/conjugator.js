var consonants = ['b', 'c', 'd', 'f', 'h', 
                        'k', 'l', 'ɬ', 'm', 'n',
                        'p', 's', 't', 'w', 'y']
    var vowels = ['a', 'e', 'i', 'o']
    function syllabify(string) {
        var sylls = [];
        var curr_syll = "";
        var len = string.length
        for (var i = 0; i < len; i++) {
            if (consonants.includes(string[i])) {
                if (curr_syll == "") {curr_syll = string[i]; }
                else if (i == len - 1) {curr_syll = curr_syll.concat(string[i]); sylls = sylls.concat(curr_syll); }
                else if (vowels.includes(string[i + 1])){ sylls = sylls.concat(curr_syll); curr_syll = string[i]; }
                else if (consonants.includes(string[i + 1 ])) { curr_syll = curr_syll.concat(string[i]); sylls = sylls.concat(curr_syll); curr_syll = ""}
            }
            if (vowels.includes(string[i])) {
                curr_syll = curr_syll.concat(string[i]);
            }
        }
        sylls = sylls.concat(curr_syll);
        return sylls;
    }
    function coallesce(string) {
        var prev = ""
        for (var i = 0; i < string.length; i++) {
          if (vowels.includes(string[i]) && prev !== "") {
            string = string.slice(0,prev) + string.slice(prev + 1);
            prev = "";
          }
          else if (vowels.includes(string[i]) && prev === "") {
            prev = i;
          }
          else if (consonants.includes(string[i])) {
            prev = "";
          }
        }
        return string
    }
    function isAlabamaFrame(string) {
        var syllables = syllabify(string);
        if (syllables.length < 2) { return false; }
        var reversed = syllables.reverse();
        if (reversed[0].length == 2 && reversed[1].length == 3) { return true; }
        else { return false; }
    }
    function conjugate(string, person, plurality) {
        if (person == 3) { if (plurality == 1) {return 'ho' + string} else {return string}}
        if (person == 2) {
            if (plurality == 0) { var plsuff = "" }
            else if (plurality == 1) {var plsuff = "ha" }
            var syllables = syllabify(string).reverse();
            if (syllables.length == 1 || (syllables.length == 2 && syllables[1].length == 1)) {
                    if (plurality == 0) { return "is" + syllables[0] }
                    else {return "has" + syllables[0]}
                }
            if (isAlabamaFrame(string)) {
                if (syllables[0] == "li" || syllables[0] == syllables[1][syllables[1].length - 1] + "i") {
                    return string.slice(0,string.length - 2) + plsuff + 'ci';
                }
                if (consonants.includes(syllables[0].slice(0,1)) && consonants.includes(syllables[1].slice(-1))) { syllables[1] = syllables[1].slice(0,-1) + plsuff + 'ci' + syllables[1].slice(-1)}
                else {syllables[1] = syllables[1].concat(plsuff + 's')}
                return(syllables.reverse().join(''))
            }
            else {
                if (syllables[0].length != 2) {
                    return string + plsuff + 'ci'
                }
                else {
                    syllables[0] = syllables[0].slice(0,1) + plsuff + 'ci'; 
                    return syllables.reverse().join('')
                }
            }
        }
        if (person == 1) {
            if (plurality == 0) { var plsuff = "" }
            else if (plurality == 1) {var plsuff = "hi" }
            if (plurality == 0) { return string + "li" }
            else {
                var syllables = syllabify(string).reverse();
                if (syllables.length == 1 || (syllables.length == 2 && syllables[1].length == 1)) {
                    return "il" + syllables[0]
                }
                else if (isAlabamaFrame(string)) {
                    if (syllables[0] == "li" || syllables[0] == syllables[1][syllables.length - 1] + 'i') {
                        return string.slice(0,string.length - 2) + plsuff + 'li';
                    }
                    if (consonants.includes(syllables[0].slice(0,1)) && consonants.includes(syllables[1].slice(-1))) { syllables[1] = syllables[1].slice(0,-1) + 'li' + syllables[1].slice(-1)}
                    else {syllables[1] = syllables[1].concat('l')}
                    return(syllables.reverse().join(''))
                }
                else {
                    if (syllables[0].length != 2) {
                        return string + plsuff + 'li'
                    }
                    else {syllables[0] = syllables[0].slice(0,1) + plsuff + 'li'; return syllables.reverse().join('')}
                }
            }
        }
        else {string}
    }

function dativeConjugate(string, person, plurality) {
    if (person == 1 && plurality == 0) {
        return 'am' + string;
    }
    else if (person == 1 && plurality == 1) {
        return 'pom' + string;
    }
    else if (person == 2 && plurality == 0) {
        return 'cim' + string;
    }
    else if (person == 2 && plurality == 1) {
        return 'hacim' + string;
    }
    else if (person == 3 && plurality == 0) {
        return 'im' + string;
    }
    else {return 'aatim' + string;}
}

function negateConjugate(string, person, plurality) {
    var syllables = syllabify(string).reverse();
    if (syllables.length === 1 || (syllables.length === 2 && syllables[1].length === 1)) {
        string = string.slice(1)
        if (person === 1 && plurality === 0) {
            return 'ák' + coallesce(string +'o');
        }
        else if (person === 2 && plurality === 0) {
            return 'chík' + coallesce(string + 'o')
        }
        else if (person === 3 && plurality === 0) {
            return 'ík' + coallesce(string + 'o')
        }
        else if (person === 1 && plurality === 1) {
            return 'kíl' + coallesce(string + 'o')
        }
        else if (person === 2 && plurality === 1) {
            return 'hachík' + coallesce(string + 'o')
        }
        else {
            return 'ohík' + coallesce(string + 'o')
        }
    }
    else {return string;}
}