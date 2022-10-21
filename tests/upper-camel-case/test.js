// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
function AddSquares(a, b) {
    function square(x) {
        return x * x;
    }
    return square(a) + square(b);
}
const a = AddSquares(2, 3); // returns 13
const b = AddSquares(3, 4); // returns 25
const c = AddSquares(4, 5); // returns 41

// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
