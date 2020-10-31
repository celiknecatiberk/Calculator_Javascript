function getHistory() {
    return document.getElementById("historyValue").innerText;
}

function printHistory(num) {
    document.getElementById("historyValue").innerText = num;
}

function getOutput() {
    return document.getElementById("outputValue").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("outputValue").innerText = num;
    }
    else {
        document.getElementById("outputValue").innerText = getFormatted(num);
    }
}

function getFormatted(num) {
    if (num == "-") {
        return "";
    }
    var number = Number(num);
    var value = number.toLocaleString("en");
    return value;
}

function reverseNumber(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");
for (var k = 0; k < operator.length; k++) {
    operator[k].addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var outputValue = reverseNumber(getOutput()).toString();
            if (outputValue) {
                outputValue = outputValue.substr(0, outputValue.length - 1);
                printOutput(outputValue);
            }
        }
        else {
            var outputNumber = getOutput();
            var history = getHistory();
            if (outputNumber == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (history != "" || outputNumber != "" ) {
                outputNumber = outputNumber == "" ? outputNumber : reverseNumber(outputNumber);
                history = history + outputNumber;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
}

var number = document.getElementsByClassName("number");
for (var c = 0; c < number.length; c++) {
    number[c].addEventListener('click', function () {
        var output = reverseNumber(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    });
}