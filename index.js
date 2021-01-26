/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
const resistanceVariables = {};
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    resistanceVariables[inputs[0]] = parseInt(inputs[1]);
}
const circuit = readline();

const connectionTypes = {
    '(': 'series',
    '[': 'parallel'
};

function calculateResistance(string) {
    const node = {
        type: connectionTypes[string[0]],
        sum: 0
    };
    for(let i = 2; i < string.length; ++i) {
        if (65 <= string.charCodeAt(i) && string.charCodeAt(i) <= 90) {
            let word = '';
            for (; string[i] !== ' '; ++i) {
                word += string[i];
            }
            if (node.type === 'series') {
                node.sum += resistanceVariables[word];
            } else {
                node.sum += 1 / resistanceVariables[word]
            }
        } else if (connectionTypes.hasOwnProperty(string[i])) {
            let endSymbol;
            if (string[i] === '(') {
                endSymbol = ')';
            } else {
                endSymbol = ']';
            }
            for (let depth = 0, k = i;; ++k) {
                if (string[k] === '(' || string[k] === '[') {
                    ++depth;
                }
                if (string[k] === ')' || string[k] === ']') {
                    --depth;
                }
                if(string[k] === endSymbol && depth === 0) {
                    if (node.type === 'series') {
                        node.sum += calculateResistance(string.slice(i, k + 1));
                    } else {
                        node.sum += 1 / calculateResistance(string.slice(i, k + 1));
                    }
                    i = k + 1;
                    break;
                }
            }
        }
    }
    if (node.type === 'parallel') {
        node.sum = 1 / node.sum;
    }
    return node.sum;
}

const totalResistance = calculateResistance(circuit);

console.log(Number.isInteger(totalResistance) ?
    totalResistance + '.0' :
    totalResistance.toFixed(1));