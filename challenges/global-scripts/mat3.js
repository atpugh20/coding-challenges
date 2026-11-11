class mat3 {
    constructor(data = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
        // Ensure that the data passed in is the correct length
        if (data.length == 9) this.data = data;
    }

    identity() {
        this.data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    multiplyVec3(vec) {
        const m = this.data;
        return new vec3(
            m[0] * vec.x + m[3] * vec.y + m[6] * vec.z,
            m[1] * vec.x + m[4] * vec.y + m[7] * vec.z,
            m[2] * vec.x + m[5] * vec.y + m[8] * vec.z,
        );
    }
}
