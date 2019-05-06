const App = (arr) => {
    let str = '';
    arr.forEach((el, index) => {
        if (index !== arr.length - 1) {
            str = str + el + ', ';
        } else {
            str = str + el;
        }
    });
    return str;
}

export default App;
