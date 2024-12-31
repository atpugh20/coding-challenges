class Vector {
    /**
     * A vector is a quantity that has both a maginitude and a direction. this.x 
     * and this.y represent the point that the vector moves to from (0, 0).
     */

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Returns the magnitude of the vector
    mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }

    mult(num1, num2) {
        /**
         * Multiply the current vector by the arguments.
         *  If one argument:  multiply both x and y by num1.
         *  If two arguments: multiply x by num1, and y by num2.
         */
        this.x *= num1;

        switch(arguments.length) {
            case 1:
                this.y *= num1;
                break;
            case 2:
                this.y *= num2;
                break;
            default:
                console.log('Error: Invalid number of arguments');
                break;
        } 
    }

    div(num1, num2) {
        /**
         * Divide the current vector by the arguments.
         *  If one argument:     divide both x and y by num1.
         *  If two arguments:    divide x by num1, and y by num2.
         */
        if (num1 == 0) {
            console.log("Cannot divide by 0!");
            return;
        }

        this.x /= num1; 

        switch (arguments.length) {
            case 1: 
                this.y /= num1; 
                break;

            case 2: 
                if (num2 == 0) {
                    console.log("Cannot divide by 0!");
                    return;
                }
                this.y /= num2; 
                break;
            
        } 
    }

    add(arg1, arg2) {
        /**
         * Add the arguments to the vector.
         *  If one argument  (vector):   add the arguments x and y attributes.
         *  If two arguments (numbers):  add each argument to x and y.
         */
        switch (arguments.length) {
            case 1:
                this.x += arg1.x;
                this.y += arg1.y;
                break;
            case 2:
                this.x += arg1;
                this.y += arg2;
                break;
            default:
                console.log('Error: Invalid number of arguments');
                break;
        }
    }

    sub(arg1, arg2) {
        /**
         * Subtract the arguments from the vector.
         *  If one argument  (vector):   subtract the arguments x and y attributes.
         *  If two arguments (numbers):  subtract each argument to x and y.
         */
        switch (arguments.length) {
            case 1:
                this.x -= arg1.x;
                this.y -= arg1.y;
                break;
            case 2:
                this.x -= arg1;
                this.y -= arg2;
                break;
            default:
                console.log('Error: Invalid number of arguments');
                break;
        }
    }

    normalize() {
        /**
         * Return a normalized version of this vector while keeping this vector.
         * The x and y values are divided by the magnitude of the vector.
         */
        this.div(this.mag());
    }
}