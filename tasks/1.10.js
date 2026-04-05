function erase(list) {
    const unwantedValues = [false, undefined, '', 0, null];

    return list.filter((item) => !unwantedValues.includes(item));
}

const test_data = [
    {
        id: 1,
        list: [0, 1, false, 2, undefined, '', 3, null],
    },
    {
        id: 2,
        list: [undefined, null],
    },
    {
        id: 3,
        list: [""],
    },
    {
        id: 4,
        list: [0],
    },
    {
        id: 5,
        list: [1, 2, 3],
    },
]

test_data.forEach((test) => {
    console.log(`Test ${test.id}`);
    console.log(erase(test.list));
    console.log();
})
