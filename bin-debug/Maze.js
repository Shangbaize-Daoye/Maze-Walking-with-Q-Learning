// let mazeInfo = [];
// for (let i = 0; i < 10; i++) {
//     mazeInfo[i] = [];
// }
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         mazeInfo[i][j] = -1;
//     }
// }
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// mazeInfo[0][3] = 1;
// mazeInfo[1][1] = 0;
// mazeInfo[1][2] = 0;
// mazeInfo[1][3] = 0;
// mazeInfo[1][4] = 0;
// mazeInfo[1][5] = 0;
// mazeInfo[1][7] = 0;
// mazeInfo[1][8] = 0;
// mazeInfo[2][1] = 0;
// mazeInfo[2][5] = 0;
// mazeInfo[2][6] = 0;
// mazeInfo[2][7] = 0;
// mazeInfo[2][8] = 0;
// mazeInfo[3][1] = 0;
// mazeInfo[3][3] = 0;
// mazeInfo[3][8] = 0;
// mazeInfo[4][1] = 0;
// mazeInfo[4][3] = 0;
// mazeInfo[4][4] = 0;
// mazeInfo[4][5] = 0;
// mazeInfo[4][6] = 0;
// mazeInfo[4][7] = 0;
// mazeInfo[4][8] = 0;
// mazeInfo[5][3] = 0;
// mazeInfo[6][1] = 0;
// mazeInfo[6][2] = 0;
// mazeInfo[6][3] = 0;
// mazeInfo[6][5] = 0;
// mazeInfo[6][6] = 0;
// mazeInfo[6][7] = 0;
// mazeInfo[6][8] = 0;
// mazeInfo[7][1] = 0;
// mazeInfo[7][8] = 0;
// mazeInfo[8][1] = 0;
// mazeInfo[8][2] = 0;
// mazeInfo[8][3] = 0;
// mazeInfo[8][4] = 0;
// mazeInfo[8][5] = 0;
// mazeInfo[8][6] = 0;
// mazeInfo[8][7] = 0;
// mazeInfo[8][8] = 0;
// mazeInfo[8][9] = 0;
// mazeInfo[9][6] = 1;
// class Square {
//     id;
//     x;
//     y;
//     adjacentSquares: [Square, number][];
//     constructor(id, x, y, value, adjacentSquares) {
//         this.id = id;
//         this.x = x;
//         this.y = y;
//         this.adjacentSquares = adjacentSquares;
//     }
// }
var Maze = (function () {
    function Maze(mazeMap) {
        this.rMatrix = {};
        this.qMatrix = {};
        this.squareNum = 0;
        this.isGameStarted = false;
        this.width = mazeMap[0].length;
        this.height = mazeMap.length;
        this.mazeMap = mazeMap;
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                if (mazeMap[i][j] !== -1) {
                    this.squareNum++;
                    this.rMatrix["(" + i + ", " + j + ")"] = [];
                    this.rMatrix["(" + i + ", " + j + ")"].push(mazeMap[i][j]);
                    this.qMatrix["(" + i + ", " + j + ")"] = [];
                    this.qMatrix["(" + i + ", " + j + ")"].push(mazeMap[i][j]);
                }
            }
        }
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.rMatrix["(" + i + ", " + j + ")"] === undefined)
                    continue;
                if (i - 1 > -1 && this.rMatrix["(" + (i - 1) + ", " + j + ")"] !== undefined) {
                    var action = [];
                    action.push(i - 1);
                    action.push(j);
                    if (this.rMatrix["(" + (i - 1) + ", " + j + ")"][0] === 1)
                        action.push(100);
                    else
                        action.push(0);
                    this.rMatrix["(" + i + ", " + j + ")"].push(action);
                    var qAction = action.concat();
                    qAction[2] = 0;
                    this.qMatrix["(" + i + ", " + j + ")"].push(qAction);
                }
                else {
                    this.rMatrix["(" + i + ", " + j + ")"].push(null);
                    this.qMatrix["(" + i + ", " + j + ")"].push(null);
                }
                if (j + 1 < this.width && this.rMatrix["(" + i + ", " + (j + 1) + ")"] !== undefined) {
                    var action = [];
                    action.push(i);
                    action.push(j + 1);
                    if (this.rMatrix["(" + i + ", " + (j + 1) + ")"][0] === 1)
                        action.push(100);
                    else
                        action.push(0);
                    this.rMatrix["(" + i + ", " + j + ")"].push(action);
                    var qAction = action.concat();
                    qAction[2] = 0;
                    this.qMatrix["(" + i + ", " + j + ")"].push(qAction);
                }
                else {
                    this.rMatrix["(" + i + ", " + j + ")"].push(null);
                    this.qMatrix["(" + i + ", " + j + ")"].push(null);
                }
                if (i + 1 < this.height && this.rMatrix["(" + (i + 1) + ", " + j + ")"] !== undefined) {
                    var action = [];
                    action.push(i + 1);
                    action.push(j);
                    if (this.rMatrix["(" + (i + 1) + ", " + j + ")"][0] === 1)
                        action.push(100);
                    else
                        action.push(0);
                    this.rMatrix["(" + i + ", " + j + ")"].push(action);
                    var qAction = action.concat();
                    qAction[2] = 0;
                    this.qMatrix["(" + i + ", " + j + ")"].push(qAction);
                }
                else {
                    this.rMatrix["(" + i + ", " + j + ")"].push(null);
                    this.qMatrix["(" + i + ", " + j + ")"].push(null);
                }
                if (j - 1 > -1 && this.rMatrix["(" + i + ", " + (j - 1) + ")"] !== undefined) {
                    var action = [];
                    action.push(i);
                    action.push(j - 1);
                    if (this.rMatrix["(" + i + ", " + (j - 1) + ")"][0] === 1)
                        action.push(100);
                    else
                        action.push(0);
                    this.rMatrix["(" + i + ", " + j + ")"].push(action);
                    var qAction = action.concat();
                    qAction[2] = 0;
                    this.qMatrix["(" + i + ", " + j + ")"].push(qAction);
                }
                else {
                    this.rMatrix["(" + i + ", " + j + ")"].push(null);
                    this.qMatrix["(" + i + ", " + j + ")"].push(null);
                }
            }
        }
    }
    Maze.prototype.startTraining = function (gamma, trainingTime) {
        this.resetQMatrix();
        var maxQValue = 0;
        for (var i = 0; i < trainingTime; i++) {
            var count = 0;
            var randomNum = Math.floor(Math.random() * this.squareNum);
            var currentStateKey = void 0;
            for (var key in this.rMatrix) {
                if (count === randomNum) {
                    currentStateKey = key;
                    break;
                }
                count++;
            }
            var actionListTempMap = {};
            var valueActionListTempMap = {};
            while (this.rMatrix[currentStateKey][0] !== 1) {
                if (actionListTempMap[currentStateKey] === undefined) {
                    var actionList_1 = [];
                    for (var i_1 = 1; i_1 < 5; i_1++) {
                        if (this.rMatrix[currentStateKey][i_1] !== null) {
                            actionList_1.push([this.rMatrix[currentStateKey][i_1], i_1]);
                        }
                    }
                    actionListTempMap[currentStateKey] = actionList_1;
                }
                var actionList = actionListTempMap[currentStateKey];
                var randomNum_1 = Math.floor(Math.random() * actionList.length);
                var nextStateKey = "(" + actionList[randomNum_1][0][0] + ", " + actionList[randomNum_1][0][1] + ")";
                if (valueActionListTempMap[nextStateKey] === undefined) {
                    var valueActionList_1 = [];
                    for (var i_2 = 1; i_2 < 5; i_2++) {
                        if (this.qMatrix[nextStateKey][i_2] !== null) {
                            valueActionList_1.push(this.qMatrix[nextStateKey][i_2]);
                        }
                    }
                    valueActionListTempMap[nextStateKey] = valueActionList_1;
                }
                var valueActionList = valueActionListTempMap[nextStateKey];
                var valueList = [];
                for (var _i = 0, valueActionList_2 = valueActionList; _i < valueActionList_2.length; _i++) {
                    var action = valueActionList_2[_i];
                    valueList.push(action[2]);
                }
                valueList.sort(function (x, y) { return y - x; });
                var qValue = this.rMatrix[currentStateKey][actionList[randomNum_1][1]][2] + gamma * valueList[0];
                this.qMatrix[currentStateKey][actionList[randomNum_1][1]][2] = qValue;
                if (qValue > maxQValue)
                    maxQValue = qValue;
                currentStateKey = nextStateKey;
            }
            console.log("第" + (i + 1) + "次训练结束。");
        }
        if (maxQValue !== 0) {
            for (var key in this.qMatrix) {
                for (var i = 1; i < 5; i++) {
                    if (this.qMatrix[key][i] !== null) {
                        this.qMatrix[key][i][2] = this.qMatrix[key][i][2] / maxQValue;
                    }
                }
            }
        }
        this.showQMatrix();
    };
    Maze.prototype.resetQMatrix = function () {
        for (var key in this.qMatrix) {
            for (var i = 1; i < 5; i++) {
                if (this.qMatrix[key][i] !== null) {
                    this.qMatrix[key][i][2] = 0;
                }
            }
        }
    };
    Maze.prototype.showQMatrix = function () {
        for (var key in this.qMatrix) {
            var string = "状态" + key + ": ";
            for (var i = 1; i < 5; i++) {
                if (this.qMatrix[key][i] !== null) {
                    string += "《动作: 到(" + this.qMatrix[key][i][0] + ", " + this.qMatrix[key][i][1] + "), Q值: " + this.qMatrix[key][i][2].toFixed(3) + "》; ";
                }
            }
            console.log(string);
        }
    };
    Maze.prototype.nextStep = function () {
        if (this.isGameStarted === false) {
            this.isGameStarted = true;
            var count_1 = 0;
            var randomNum_2 = Math.floor(Math.random() * this.squareNum);
            for (var key in this.qMatrix) {
                if (count_1 === randomNum_2) {
                    this.currentStateKey = key;
                    var string = key.slice(1, key.length - 1);
                    var array = string.split(", ");
                    return [parseInt(array[0]), parseInt(array[1]), false];
                }
                count_1++;
            }
        }
        // Agent正在根据Q矩阵的值，决定走迷宫的路线
        var actionList = [];
        for (var i = 1; i < 5; i++) {
            if (this.qMatrix[this.currentStateKey][i] !== null) {
                actionList.push(this.qMatrix[this.currentStateKey][i]);
            }
        }
        actionList.sort(function (x, y) { return y[2] - x[2]; });
        var actionMax = actionList[0];
        var count = 1;
        for (var i = 1; i < actionList.length; i++) {
            if (actionList[i][2] === actionMax[2])
                count++;
            else
                break;
        }
        var randomNum = Math.floor(Math.random() * count);
        var nextStateKey = "(" + actionList[randomNum][0] + ", " + actionList[randomNum][1] + ")";
        if (this.rMatrix[nextStateKey][0] === 1) {
            this.isGameStarted = false;
            this.currentStateKey = undefined;
            return [actionList[randomNum][0], actionList[randomNum][1], true];
        }
        else {
            this.currentStateKey = nextStateKey;
            return [actionList[randomNum][0], actionList[randomNum][1], false];
        }
    };
    return Maze;
}());
__reflect(Maze.prototype, "Maze");
// class Point {       //迷宫格点类，x为列数，y为行数，value为（1：出口，0：可走，-1：墙）
//     private x: number;
//     private y: number;
//     private value: number;
//     constructor(x, y, value) {
//         this.x = x;
//         this.y = y;
//         this.value = value;
//     }
//     getX(): number { return this.x; }
//     getY(): number { return this.y; }
//     getValue(): number { return this.value; }
// }
// class Maze {        //迷宫类
//     private pointList: Point[] = [];    //pointList可行点坐标记录表，数组索引为可行点编号，对应值为该点value
//     private Rmatrix: number[] = [];     //R矩阵：一维数组
//     private Qmatrix: number[] = [];     //Q矩阵：一维数组
//     private maze_scale;                 //迷宫尺寸：（正方形版本）迷宫边长
//     constructor(maze_matrix) {      //构造迷宫类，输入参数：迷宫矩阵是一维数组，记录从上到下从左到右的所有迷宫点的value
//         this.maze_scale = Math.sqrt(maze_matrix.length);    //获得迷宫尺寸
//         for (let i = 0; i < this.maze_scale; i++) {         //从上往下从左往右，找到所有可行点，将这些迷宫点push进pointList
//             for (let j = 0; j < this.maze_scale; j++) {
//                 if (maze_matrix[i * this.maze_scale + j] >= 0) {     //block(i,j) is not wall
//                     let p = new Point(i, j, maze_matrix[i * this.maze_scale + j]);
//                     this.pointList.push(p);
//                 }
//             }
//         }
//         let R_scale = this.pointList.length;        //R矩阵尺寸
//         for (let i = 0; i < R_scale; i++) {         //给R矩阵赋值，一共R_scale^2步填满之
//             for (let j = 0; j < R_scale; j++) {
//                 if (i == j) this.Rmatrix.push(-1);  //同一点无法互达
//                 else {
//                     if (this.pointList[i].getX() == this.pointList[j].getX()) {     //两点X相同
//                         if (Math.abs(this.pointList[i].getY() - this.pointList[j].getY()) == 1) {   //Y差1则可达，若到达点是出口赋值100，否则0
//                             if (this.pointList[j].getValue() == 1) this.Rmatrix.push(100);
//                             else this.Rmatrix.push(0);
//                         } else this.Rmatrix.push(-1);       //否则是斜对角线点也不可达
//                     }
//                     else if (this.pointList[i].getY() == this.pointList[j].getY()) {        //两点Y相同
//                         if (Math.abs(this.pointList[i].getX() - this.pointList[j].getX()) == 1) {   //X差1则可达，若到达点是出口赋值100，否则0
//                             if (this.pointList[j].getValue() == 1) this.Rmatrix.push(100);
//                             else this.Rmatrix.push(0);
//                         } else this.Rmatrix.push(-1);       //否则是斜对角线点也不可达
//                     } else {
//                         this.Rmatrix.push(-1);      //若X或Y的差值都不是1则必定不可达
//                     }
//                 }
//             }
//         }
//     }
//     getRmatrix(point1, point2): number { return this.Rmatrix[point1 * Math.sqrt(this.Rmatrix.length) + point2] };       //getRmatrix是获取R[i][j]的方法
// }
// //Sample
// let maze = [-1, 1, -1, -1, -1, 0, -1, -1, -1, 0, 0, -1, -1, -1, 1, -1];
// let M = new Maze(maze);
// console.log(M.getRmatrix(1, 1));
//# sourceMappingURL=Maze.js.map