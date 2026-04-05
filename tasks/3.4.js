function sort(sentence) {
    return sentence.split(' ')
                         .map((item) => item.toLowerCase().split('').sort().join(''))
                         .map((item) => item[0].toUpperCase() + item.slice(1))
                         .sort()
                         .join(' ');
}

const test_data = [
    {
        id: 1,
        sentence: "ba gBa CBA",
    },
    {
        id: 2,
        sentence: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 3,
        sentence: "Non natus tempore nisi nihil",
    },
    {
        id: 4,
        sentence: "Labore dolor saepe sed voluptatem perspiciatis",
    },
]

test_data.forEach((test) => {
    console.log(`Test ${test.id}`);

    console.log(test.sentence);
    console.log(sort(test.sentence));

    console.log();
})