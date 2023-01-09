let res = [];
let numero = [];
let cadena = [];
let ventana = document.getElementById("inputout");
let oper = false;
let num = false;
let zero = true;

function inputIn(symbol) {
    console.log(cadena);
    if (cadena.length < 12) {
        if (symbol === '.') {
            if (numero.length !== 0 && !numero.includes('.')) {
                ventana.value += symbol;
                cadena.push(symbol);
                numero.push(symbol);
                num = false;
                zero = true;
            }
        }

        if (symbol === '/' || symbol === '*' || symbol === '-' || symbol === '+') {
            if (oper === false && num === true) {
                ventana.value += symbol;
                if (numero.length !== 0) {
                    res.push(numero.reduce((sum, current) => sum + current));
                }
                res.push(symbol);
                cadena.push(symbol);
                numero.splice(0, numero.length);
                num = false;
                oper = true;
                zero = true;
            }
        }

        if (parseInt(symbol) > 0 && parseInt(symbol) <= 9) {
            if (cadena.length == 0) {
                ventana.value = '';
            }
            ventana.value += symbol;
            numero.push(symbol);
            cadena.push(symbol);
            num = true;
            oper = false;
            zero = true;
        }

        if (symbol === '0') {
            if (zero == true) {
                numero.push(symbol);
                cadena.push(symbol);
                if (ventana.value == '0') {
                    zero = false;
                }
                else {
                    zero = true;
                    ventana.value += symbol;
                }
                num = true;
                oper = false;
            }
        }
    }
    if (symbol === '=') {
        if (num == true && !res.length == 0) {
            res.push(numero.reduce((sum, current) => sum + current));
            calculate();
        }
    }
}

function calculate() {
    let index;
    let sum;
    while (res.includes('*')) {
        index = res.indexOf('*');
        sum = parseFloat(res[index - 1]) * parseFloat(res[index + 1]);
        res.splice(index - 1, 3, sum);
    }
    while (res.includes('/')) {
        index = res.indexOf('/');
        sum = parseFloat(res[index - 1]) / parseFloat(res[index + 1]);
        res.splice(index - 1, 3, sum);
    }
    while (res.includes('+')) {
        index = res.indexOf('+');
        sum = parseFloat(res[index - 1]) + parseFloat(res[index + 1]);
        res.splice(index - 1, 3, sum);
    }
    while (res.includes('-')) {
        index = res.indexOf('-');
        sum = parseFloat(res[index - 1]) - parseFloat(res[index + 1]);
        res.splice(index - 1, 3, sum);
    }
    ventana.value = res[0].toFixed(2);
    numero.splice(0, numero.length, res[0]);
    res.splice(0, res.length);
    num = true;
    oper = false;
}

function cleanAll() {
    ventana.value = "0";
    numero.splice(0, numero.length);
    cadena.splice(0, cadena.length);
    res.splice(0, res.length);
    oper = false;
    num = false;
    zero = true;
}

function cleanOneSymbol() {
    let cleanSymbol = ventana.value;
    ventana.value = cleanSymbol.substring(0, cleanSymbol.length - 1);
    if (numero.length == 0) {
        res.pop();
    }
    cadena.pop();
    numero.pop();
    if (cleanSymbol.length === 1) {
        ventana.value = 0;
    }
}
console.log(ventana.value);
