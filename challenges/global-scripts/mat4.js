class mat4 {
    constructor(data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
        this.data = data;
    }

    idendity() {
        this.data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    multiplyVec4(vec) {
        const m = this.data;
        return new vec4(
            m[0] * vec.x + m[4] * vec.y + m[8] * vec.z + m[12] * vec.w,
            m[1] * vec.x + m[5] * vec.y + m[9] * vec.z + m[13] * vec.w,
            m[2] * vec.x + m[6] * vec.y + m[10] * vec.z + m[14] * vec.w,
            m[3] * vec.x + m[7] * vec.y + m[11] * vec.z + m[15] * vec.w,
        );
    }
}
