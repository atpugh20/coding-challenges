class vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    copy() {
        return new vec3(this.x, this.y, this.z);
    }

    // Operations

    add(x, y, z) {
        return new vec3(this.x + x, this.y + y, this.z + z);
    }

    subtract(x, y, z) {
        return new vec3(this.x - x, this.y - y, this.z - z);
    }

    multiply(scalar) {
        return new vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    divide(scalar) {
        return new vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    dot(otherVec) {
        // Dot Product
        return this.x * otherVec.x + this.y * otherVec.y + this.z * otherVec.z;
    }

    cross(otherVec) {
        // Cross Product
        const newX = this.y * otherVec.z - this.z * otherVec.y;
        const newY = this.z * otherVec.x - this.x * otherVec.z;
        const newZ = this.x * otherVec.y - this.y * otherVec.x;

        return new vec3(newX, newY, newZ);
    }

    normalize() {
        return this.divide(this.length());
    }
}
