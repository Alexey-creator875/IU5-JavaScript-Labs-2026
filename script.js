window.onload = function() { 
    let a = '0'
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                if (a === '0' && digit != '.') {
                    a = digit
                }
                else {
                    a += digit;
                }

                outputElement.innerHTML = a;
            }   
        }
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                if (b === '0' && digit != '.') {
                    b = digit
                }
                else {
                    b += digit;
                }

                outputElement.innerHTML = b;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = '0';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            let numberWithOppositeSign = (-a);
            a = numberWithOppositeSign.toString();
            outputElement.innerHTML = a;
        }
        else {
            let numberWithOppositeSign = (-b);
            b = numberWithOppositeSign.toString();
            outputElement.innerHTML = b;
        }
    }

    this.document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            a = DoOperationPercent(a);
            outputElement.innerHTML = a;
        }
        else {
            b = DoOperationPercent(b)
            outputElement.innerHTML = b;
        }
    }

    function DoOperationPercent(number) {
        if (number[number.length - 1] == '.') {
            number = number.substring(0, number.length - 1);
        }

        if (number === '0') {
            return number;
        }

        const sign = (number.startsWith('-')) ? '-' : '';
        number = Math.abs(+number).toString();
        
        if (number.includes('.')) {
            number = MovePoint(number);
        }
        else {
            number = AddPoint(number);
        }

        return sign + RemoveExtraEndZero(number);
    }

    function MovePoint(number) {
        const indexOfPoint = number.indexOf('.');
        const beforePointPart = number.substring(0, indexOfPoint);
        const afterPointPart = number.substring(indexOfPoint + 1, number.length);

        if (number.indexOf('.') == 1) {
            return '0.0' + beforePointPart + afterPointPart;
        }

        if (number.indexOf('.') == 2) {
            return '0.' + beforePointPart + afterPointPart;
        }

        if (number.indexOf('.') > 2) {   
            const afterPointFuturePart = beforePointPart.substring(beforePointPart.length - 2, beforePointPart.length) + afterPointPart;
            const beforePointFuturePart = beforePointPart.substring(0, number.length - 2);

            return beforePointFuturePart + '.' + afterPointFuturePart
        }
    }

    function AddPoint(number) {
        if (number.length == 1) {
            return '0.0' + number;
        }

        if (number.length == 2) {
            return '0.' + number;
        }

        if (number.length > 2) {
            const indexOfSegmentation = number.length - 2;
            const beforePointFuturePart = number.substring(0, indexOfSegmentation);
            const afterPointFuturePart = number.substring(indexOfSegmentation, number.length);
            return beforePointFuturePart + '.' + afterPointFuturePart;
        }
    }

    function RemoveExtraEndZero(number) {
        return (+number).toString();
    }

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            default:
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};
