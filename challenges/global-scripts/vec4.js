class vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    length() {
        return Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w,
        );
    }

    copy() {
        return new vec4(this.x, this.y, this.z, this.w);
    }

    // Operations

    add(x, y, z, w) {
        return new vec4(this.x + x, this.y + y, this.z + z, this.w + w);
    }

    subtract(x, y, z) {
        return new vec4(this.x - x, this.y - y, this.z - z, this.w - w);
    }

    multiply(scalar) {
        return new vec4(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar,
        );
    }

    divide(scalar) {
        return new vec4(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar,
            this.w / scalar,
        );
    }

    dot(otherVec) {
        // Dot Product
        return (
            this.x * otherVec.x +
            this.y * otherVec.y +
            this.z * otherVec.z +
            this.w * otherVec.w
        );
    }

    normalize() {
        return this.divide(this.length());
    }
}
