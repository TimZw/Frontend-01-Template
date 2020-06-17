let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let color = 1;

function show() {
    let board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText = 
                pattern[i][j] == 2 ? "❌" :
                pattern[i][j] == 1 ? "⭕️" : "";
            cell.addEventListener("click", () => move(j, i));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}

// 落子函数
function move(x, y) {
    if (pattern[y][x] !== 0) {
        return; 
    }
    pattern[y][x] = color;
    if (check(pattern, color)) {
        alert(color == 2 ? "❌ is winner!" : "⭕️ is winner!");
    }
    color = 3 - color;
    show();

    computerMove()
}

function computerMove() {
    let choice = bestChoice(pattern, color);
    if (choice.point) {
        pattern[choice.point[1]][choice.point[0]] = color;
    }
    if(check(pattern, color)) {
        alert(color == 2 ? "❌ is winner" : "⭕️ is winner");
    }
    color = 3 - color;
    show();
}

// 判断输赢 加上x, y简化
function check(pattern, color) {
    // 判断横坐标输赢
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== color) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    // 判断纵坐标输赢
    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (pattern[j][i] !== color) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    // 斜坐标 加代码块是为了不让 let win 影响别的变量
    {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (pattern[j][j] !== color) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (pattern[j][2-j] !== color) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function clone(pattern) {
    return JSON.parse(JSON.stringify(pattern));
}

// 判断何时赢
function willWin(pattern, color) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== 0) {
                continue;
            }
            // 为什么要clone
            // 拿到最新的实际落子结果，模拟下一次落子，去检查结果
            let tmp = clone(pattern);
            tmp[i][j] = color;
            if (check(tmp, color)) {
                // x y
                return [j, i];
            }
        }
    }
    return null;
}

function bestChoice(pattern, color) {
    // 赢了 直接返回坐标
    let point = willWin(pattern, color);
    if (point) {
        return {
            point: point,
            result: 1
        }
    }

    let result = -1;

    outer: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== 0) {
                continue;
            }
            let tmp = clone(pattern);
            tmp[i][j] = color;

            // 判断对手的bestChoice
            let opp = bestChoice(tmp, 3 - color);
            // 对手最差的结果
            if (-opp.result >= result) {
                // point 是 x y 坐标
                point = [j, i];
                result = -opp.result;
            }
            if (result == 1) {
                break outer;
            }
        }
    }

    return {
        point: point,
        result: point ? result : 0 // -1 输 0 平 1赢
    }
}

show(pattern);