class TwoDIntervalMap {
    constructor() {
        this.intervalMapX = new Map();
        this.intervalMapY = new Map();
    }

    put(xStart, xEnd, yStart, yEnd, value) {
        this.intervalMapX.set(xStart, { value, xEnd, yStart, yEnd });
        this.intervalMapX.set(xEnd, { value, xStart, yStart, yEnd });
        this.intervalMapY.set(yStart, { value, xStart, xEnd, yEnd });
        this.intervalMapY.set(yEnd, { value, xStart, xEnd, yStart });
    }

    get(x, y) {
        let maxX = null;
        let maxY = null;

        for (const intervalXStart of this.intervalMapX.keys()) {
            if (intervalXStart <= x) {
                maxX = intervalXStart;
            } else {
                break;
            }
        }

        for (const intervalYStart of this.intervalMapY.keys()) {
            if (intervalYStart <= y) {
                maxY = intervalYStart;
            } else {
                break;
            }
        }

        if (maxX !== null && maxY !== null) {
            const intervalX = this.intervalMapX.get(maxX);
            const intervalY = this.intervalMapY.get(maxY);

            if (
                intervalX.xStart <= x &&
                x <= intervalX.xEnd &&
                intervalY.yStart <= y &&
                y <= intervalY.yEnd
            ) {
                return intervalX.value;
            }
        }

        return null;
    }

    remove(x, y) {
        this.intervalMapX.delete(x);
        this.intervalMapY.delete(y);
    }

    containsKey(x, y) {
        return this.intervalMapX.has(x) && this.intervalMapY.has(y);
    }

    clear() {
        this.intervalMapX.clear();
        this.intervalMapY.clear();
    }

    values() {
        return Array.from(this.intervalMapX.values(), ({ value }) => value);
    }
}
