var names = [{'name': 'Jared', 'team': 1}, {'name': 'Andrea', 'team': 2}, {'name': 'Jacob', 'team': 2}, {'name': 'Delainee', 'team': 1}];
// Version 1be: assume all is included
// 18 to buy in.
var tot = 18 * names.length;
var aloha = false;
function calculateSkins(wonSkins, indSums, names, winners) {
    var sum = wonSkins.reduce((a,b) => a + b);
    var totalSkins = tot / sum;
    var skinsvalues = [];
    for (var skin = 0; skin < names.length; skin++) {
        skinsvalues = skinsvalues.concat(totalSkins * wonSkins[skin]);
        if (names[skin]['team'] != winners && totalSkins % 2 != 0) {
            skinsvalues[skin] = Math.floor(skinsvalues[skin] + 1);
        }
        else {
            skinsvalues[skin] = Math.floor(skinsvalues[skin]);
        }
    }
    for (var i = 0; i < indSums.length; i++) {
        indSums[i] += skinsvalues[i];
    }
    console.log("Skins Values: " + skinsvalues);
    return indSums;
}
function calculateDots(dotsCounts, indSums, names, winners) {
    var dotsSum = dotsCounts.reduce((a,b) => a + b);
    var dotsVals = [];
    for (var i = 0; i < indSums.length; i++) {
        console.log(( dotsCounts[i] * names.length ) - dotsSum);
        indSums[i] += ( dotsCounts[i] * names.length ) - dotsSum;
        dotsVals = dotsVals.concat(( dotsCounts[i] * names.length ) - dotsSum);
    }
    console.log("Dots Values: " + dotsVals);
    return indSums;
}

function calculate(skins, dots, names, winners, teamPrize) {
    indSums = Array.from({length: names.length}, () => -18);
    indSums = calculateSkins(skins, indSums, names, winners);
    indSums = calculateDots(dots, indSums, names, winners);
    teamPrize = names.length * 5;
    for (var i = 0; i < indSums.length; i++) {
        if (winners == names[i]['team']) {
            indSums[i] += teamPrize;
        }
        else {
            indSums[i] -= teamPrize;
        }
    }
    return indSums;
}