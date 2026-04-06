export function concatenate(list, separator) {
    if (list.length == 0) {
        return "";
    }

    let result = list[0];

    for (let i = 1; i < list.length; ++i) {
        result += separator;
        result += list[i];
    }

    return result;
}


const test_data = [
    {
        id: 1,
        list: ['Я','Учусь','на','лучшей','кафедре'],
        separator: " "
    },
    {
        id: 2,
        list: ["aa", "bb", "cc", "dd"],
        separator: ":"
    },
    {
        id: 3,
        list: ["aa", "bb", "cc", "dd"],
        separator: ":/:"
    },
    {
        id: 4,
        list: ["aa"],
        separator: ":/:"
    },
    {
        id: 5,
        list: [],
        separator: ":/:"
    },
    {
        id: 6,
        list: ["aa", "bb", "cc", "dd"],
        separator: ""
    },
]

test_data.forEach((test) => {
    console.log(`Test ${test.id}`);
    console.log(concatenate(test.list, test.separator));
    console.log();
})
