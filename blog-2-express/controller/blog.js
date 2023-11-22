const getList = (author, keyword) => {
    // return fake data, but the format is correct
    return [
        {id:1, title: "title-A", content: "content=A", createTime: 1546610491112, author: 'A'},
        {id:2, title: "title-B", content: "content=B", createTime: 1546610524373, author: ' B'}
    ]
}

module.exports = {
    getList
}