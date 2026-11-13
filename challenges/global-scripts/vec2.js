class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    copy() {
        return new vec2(this.x, this.y);
    }

    // Operations

    add(vec) {
        return new vec2(this.x + vec.x, this.y + vec.y);
    }

    subtract(vec) {
        return new vec2(this.x - vec.x, this.y - vec.y);
    }

    multiply(scalar) {
        return new vec2(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new vec2(this.x / scalar, this.y / scalar);
    }

    dot(vec) {
        // Dot Product
        return this.x * vec.x + this.y * vec.y;
    }

    normalize() {
        return this.divide(this.length());
    }
}
