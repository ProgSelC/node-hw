function* filterGenerator(array, condition, maxSize) {
    if (!maxSize || maxSize > array.length) {
        maxSize = array.length;
    }

    let count = 0;
    let i = 0;

    while (count < maxSize && i < array.length) {
        if (condition(array[i])) {
            yield array[i];
            count++;
        }

        i++;
    }
}

const filterWithLimit = (array, condition, maxSize) => Array.from(filterGenerator(array, condition, maxSize));

module.exports = { filterWithLimit };
