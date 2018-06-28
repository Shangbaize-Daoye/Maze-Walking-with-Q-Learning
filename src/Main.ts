//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

// let mazeInfo = [];
// for (let i = 0; i < 10; i++) {
//     mazeInfo[i] = [];
// }
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         mazeInfo[i][j] = -1;
//     }
// }

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
// mazeInfo[9][6] = 1;
//10x10 Maze

class Main extends egret.DisplayObjectContainer {
    private stepTimeInterval = 108;
    private stepTimer = new egret.Timer(this.stepTimeInterval, 0);
    private agent: egret.Bitmap;
    private maze: Maze;
    private paddingW;
    private paddingH;
    private squareSideLen;
    private gamma;
    private trainingTime;

    public constructor() {
        super();
        // ====== 参数设定 ======
        this.maze = new Maze(Matrix03());
        this.gamma = 0.85;
        this.trainingTime = 18;
        // =====================
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stepTimer.addEventListener(egret.TimerEvent.TIMER, this.nextStep, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json");
        //this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        this.maze.startTraining(this.gamma, this.trainingTime);
        this.nextGame();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        // 绘制迷宫
        let mazeMap = this.maze.mazeMap;
        let squareNumW = this.maze.width;
        let squareNumH = this.maze.height;
        let squareSideLen1 = Math.round(stageW / (squareNumW + 2));
        let squareSideLen2 = Math.round(stageH / (squareNumH + 2));
        this.squareSideLen = squareSideLen1 < squareSideLen2 ? squareSideLen1 : squareSideLen2;
        this.paddingW = Math.round((stageW - squareNumW * this.squareSideLen) / 2);
        this.paddingH = Math.round((stageH - squareNumH * this.squareSideLen) / 2);
        // 绘制墙壁
        for (let i = 0; i < squareNumH; i++) {
            for (let j = 0; j < squareNumW; j++) {
                if (mazeMap[i][j] === -1) {
                    let wall = this.createBitmapByName("wall_jpg");
                    wall.width = this.squareSideLen;
                    wall.height = this.squareSideLen;
                    wall.x = this.paddingW + j * this.squareSideLen;
                    wall.y = this.paddingH + i * this.squareSideLen;
                    this.addChild(wall);
                }
            }
        }

        // 创建Agent
        this.agent = this.createBitmapByName("agent_png");
        this.agent.visible = false;
        this.agent.width = this.squareSideLen;
        this.agent.height = this.squareSideLen;
        this.addChild(this.agent);

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;
    }

    // /**
    //  * 初始化Agent
    //  */
    // private initAgent(squareID: number) {
    //     // let agent = this.createBitmapByName("agent_png");
    //     // agent.width = squareSideLen;
    //     // agent.height = squareSideLen;
    //     // agent.x = paddingW + 5 * squareSideLen;
    //     // agent.y = paddingH + 5 * squareSideLen;
    //     // this.addChild(agent);
    //     // this.agent = agent;
    // }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    // private startAnimation(result: string[]) {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }

    private nextGame() {
        this.agent.visible = true;
        this.stepTimer.start();
    }

    private nextStep() {
        let result = this.maze.nextStep();
        let x = result[0];
        let y = result[1];
        let isGameEnded = result[2];
        this.agent.x = this.paddingW + y * this.squareSideLen;
        this.agent.y = this.paddingH + x * this.squareSideLen;
        if (isGameEnded) {
            this.stepTimer.stop();
            this.nextGame();
        }
    }
}
