class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    Sub(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    Mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    Div(scalar) {
        if (scalar === 0) {
            console.log("Cannot divide by 0...");
            scalar = 1;
        }

        this.x /= scalar;
        this.y /= scalar;
    }

    GetMag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Normalize() {
        const mag = this.GetMag();

        if (mag === 0) return new Vector(0, 0);

        return new Vector(this.x / mag, this.y / mag);
    }

    Randomize() {
        // Get a random unit direction

        this.x = Math.random() - 0.5;
        this.y = Math.random() - 0.5;
        this.Normalize();
    }

    Limit(maxMag) {
        // Limits the vector to a magnitude of maxMag
        if (this.GetMag() > maxMag) {
            this.Normalize();
            this.Mult(maxMag);
        }
    }

    DistanceBetween(otherVector) {
        const xDelta = otherVector.x - this.x;
        const yDelta = otherVector.y - this.y;
        const dist = Math.sqrt(xDelta * xDelta + yDelta * yDelta);

        return dist;
    }
}
