addEventListener('message', (evt) => {
    /** @type {string} */
    const svgStr = evt.data.svgString;

    const xVals = svgStr
        .match(/x="\d+"/g)
        .map((x) => x.replace('x="', '').replace('"', ''))
        .map((x) => parseInt(x, 10));
    const yVals = svgStr
        .match(/y="\d+"/g)
        .map((y) => y.replace('y="', '').replace('"', ''))
        .map((y) => parseInt(y, 10));

    const size = parseInt(svgStr.match(/width="(\d+)"/)[1], 10);
    const min = Math.min(...xVals, ...yVals);
    const max = Math.max(...xVals, ...yVals);

    const range = Array((max - min) / size + 1)
        .fill(0)
        .map((_, idx) => idx * size + min);
    const rangeLength = range.length;

    /** @type {boolean[][]} */
    const qrMatrix = range.reduce((yAcc, yVal) => {
        yAcc.push(
            range.reduce((xAcc, xVal) => {
                xAcc.push(svgStr.includes(`x="${xVal}" y="${yVal}"`));
                return xAcc;
            }, [])
        );
        return yAcc;
    }, []);

    if (rangeLength % 2 !== 0) {
        qrMatrix.push(Array(rangeLength).fill(false));
    }

    const qrText = Array(qrMatrix.length / 2)
        .fill(0)
        .map((_, idx) => idx * 2)
        .map((idx) => [idx, idx + 1])
        .map(([y1, y2]) => {
            const doubleRowText = qrMatrix[y1]
                .map((val1, idx) => {
                    const val2 = qrMatrix[y2][idx];

                    if (val1 && val2) {
                        return '█';
                    } else if (val1 && !val2) {
                        return '▀';
                    } else if (!val1 && val2) {
                        return '▄';
                    }
                    return ' ';
                })
                .join('');
            return doubleRowText;
        })
        .join('\n');

    /** @type {number} */
    const timestamp = evt.data.timestamp;
    postMessage({ qrText, timestamp });
});
