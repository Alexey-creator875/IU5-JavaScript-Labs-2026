function isTransformationPosible(initial, final) {
    if (initial.length != final.length) {
        return false;
    }

    let initialMap = MakeMapWithElementsNumber(initial);
    let finalMap = MakeMapWithElementsNumber(final);

    return CompareMapsWithElementsNumber(initialMap, finalMap);
}

function MakeMapWithElementsNumber(list) {
    let map = new Map();

    for (let i = 0; i < list.length; ++i) {
        if (map.has(list[i])) {
            map.set(list[i], map.get(list[i]) + 1);
        } else {
            map.set(list[i], 1);
        }
    }

    return map;
}

function CompareMapsWithElementsNumber(first, second) {
    if (first.size != second.size) {
        return false;
    }

    for (let entry of first.entries()) {
        if (!second.has(entry[0])) {
            return false;
        }

        if (second.get(entry[0]) != entry[1]) {
            return false;
        }
    }

    return true;
}


const test_data = [
    {
        id: 1,
        initial: [1, 2, 3, 8, -2],
        final: [2, 3, 8, 1, -2],
        correct: true
    },
    {
        id: 2,
        initial: [1, 1, 1],
        final: [1, 1],
        correct: false
    },
    {
        id: 3,
        initial: [1, 1, 1],
        final: [1, 1, 2],
        correct: false
    },
    {
        id: 4,
        initial: [1, 1, 2],
        final: [1, 2, 2],
        correct: false
    },
]

test_data.forEach((test) => {
    console.log(`Test ${test.id}`);

    const result = isTransformationPosible(test.initial, test.final);
    const correct_result = test.correct;

    console.log("Result:");
    console.log(result);

    console.log("Correct:");
    console.log(correct_result);

    console.log();
})