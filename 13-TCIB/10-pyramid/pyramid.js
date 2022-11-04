"use strict";
exports.__esModule = true;
exports.pyramid = void 0;
function pyramid(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n + 2; j++) {
            array[i][j] = "#";
        }
    }
    console.log(array);
}
exports.pyramid = pyramid;
pyramid(2);
