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

    add(x, y) {
        return new vec2(this.x + x, this.y + y);
    }

    subtract(x, y) {
        return new vec2(this.x - x, this.y - y);
    }

    multiply(scalar) {
        return new vec2(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new vec2(this.x / scalar, this.y / scalar);
    }

    dot(otherVec) {
        // Dot Product
        return this.x * otherVec.x + this.y * otherVec.y;
    }

    normalize() {
        return this.divide(this.length());
    }
}
