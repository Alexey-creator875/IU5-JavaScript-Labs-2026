function isTransformationPosible(initial, final) {
    if (initial.length != final.length) {
        return false;
    }

    let initialMap = new Map();
    let finalMap = new Map();

    for (let i = 0; i < initial.length; ++i) {
        if (initialMap.has(initial[i])) {
            initialMap.set(initial[i], initialMap.get(initial[i]) + 1);
        } else {
            initialMap.set(initial[i], 1);
        }

        if (finalMap.has(final[i])) {
            finalMap.set(final[i], finalMap.get(final[i]) + 1);
        } else {
            finalMap.set(final[i], 1);
        }
    }

    for (let entry of initialMap.entries()) {
        if (!finalMap.has(entry[0])) {
            return false;
        }

        if (finalMap.get(entry[0]) != entry[1]) {
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