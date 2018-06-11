enchant();


/*
    About Config

    背景画像のサイズについて
    320 * 180 で指定すること

    キャラクター画像について
    150,165で指定すること

*/


//プレイヤークラスと画像を分離させる必要がある
//というかプレイヤーは画像が必要ない・・・？

//このクラスは全てのシーンを表しますのでご注意ください
//おそらくこのファイルから操作すれば
//あらゆるenchantの関数が応用可能であるはず


class CurrentScene{

  //コンストラクタ
  constructor(){
    //特に処理なしにしています
  }


PlayBGM(args){
  core.bgm.stop();
  core.bgm = Sound.load(args);
  core.bgm.volume = 0.3;
  core.bgm.play();
  core.bgm.loop = true;
}

  //背景画像をシーンに設定する
  SetBackGroundImage(args){
      let backImage = new Sprite(320,180);
      backImage.image = core.assets[args];
      backImage.x = 0;
      backImage.y = 0;
      bgLayer.addChild(backImage);
  }

  //左側のキャラクターをシーンに設定する
  SetCharactorLeft(args){

      let charaImage = new Sprite(150,165);
      charaImage.image = core.assets[args];
      charaImage.x = 10;
      charaImage.y = 15;
      //charaImage.tl.moveTo(174, 30, 30);
      charaImage.opacity = 0;
      charaImage.tl.fadeIn(8);
      imageLayer.addChild(charaImage);


  }

  //右側のキャラクターをシーンに設定する
  SetCharactorRight(args){
    let charaImage = new Sprite(150,165);
    charaImage.image = core.assets[args];
    charaImage.x = 180;
    charaImage.y = 15;
    charaImage.opacity = 0;
    charaImage.tl.fadeIn(8);
    imageLayer.addChild(charaImage);
  }


  //テキストをシーンに設定する
  SetText(args){
    //フラグ用使いまわします。
      let i = 1;
    　  //引数例　["ねね","あっ！進！","おはよう","今日は転校生が来るんだよね！","噂だと女の子なんだって！"],
    　  //iは初期値1なのは、発言者だからです。
        //発言者がいない場合は無視する
        if(args[0] != ""){
        let whosay = new Label("「" + args[0] + "」");
        whosay.font  = "16px monospace";
        whosay.color = "rgb(0, 0, 0)";
        whosay.y     = 180;
        whosay.x = 10;
        whosay.width = 300;
        whosay.height = 120;
        whosay.opacity = 0;
        whosay.tl.fadeIn(15);

        textLayer.addChild(whosay);

      }

        //発言内容を表示する
        let text = new Label( args[i] );
        text.font  = "16px monospace";
        text.color = "rgb(0, 0, 0)";
        text.y     = 200;
        text.x = 10;
        text.width = 300;
        text.height = 120;

        text.opacity = 0;
        text.tl.fadeIn(15);

        textLayer.addChild(text);

        //次へボタン
        let nextlabel = new Label("< ▼ >");
        nextlabel.font  = "16px monospace";
        nextlabel.color = "rgb(0, 0, 0)";
        nextlabel.y     = 280;
        nextlabel.x = 270;
        nextlabel.opacity = 0;
        nextlabel.tl.fadeIn(20);
        textLayer.addChild(nextlabel);

        //戻るボタン
        let backLabel = new Label("< ▲ >");
        backLabel.font  = "16px monospace";
        backLabel.color = "rgb(0, 0, 0)";
        backLabel.y     = 280;
        backLabel.x = 0;
        backLabel.opacity = 0;
        backLabel.tl.fadeIn(20);
        textLayer.addChild(backLabel);



        //次へボタン
        //配列に要素があればラベルを書き換える
        nextlabel.addEventListener('touchstart',function(e){
            if(i != args.length -1){
                i++;
                text.text = args[i];
              }else{
                //セリフの配列が空になった時に次のシーンへ飛ばす
                executeNext(eval(getNextSceneName()));
              }
        });

        //戻るボタン
        backLabel.addEventListener('touchstart',function(e){
          if(i != 1){
              i--;
              text.text = args[i];
          }else{
            //処理なし
          }
        });


    }//end SetText



  SetNextSceneName(name){
      this.nextSceneName = name;
  }


  //次のシーンへ遷移する
  GoNextScene(args){


    //テキストと次へボタンを削除する
    textLayer.removeChild(textLayer.firstChild);
    textLayer.removeChild(textLayer.firstChild);
    textLayer.removeChild(textLayer.lastChild);
    textLayer.removeChild(textLayer.lastChild);
    textLayer.removeChild(textLayer.firstChild);


    //ここで関数名と引数のセットを持ってきています
      for(let val in args){
          _currentScene[val](args[val]);
      }

  }






/*       選択肢のある画面です             */

SetChoiceScene(args){
  //選択肢１
  let text = new Label(args[0]);
  text.font  = "16px monospace";
  text.color = "rgb(0, 0, 0)";
  text.y     = 180;
  text.x = 10;
  text.width = 300;
  text.height = 120;

  textLayer.addChild(text);

  //シーン名が渡されます
  text.addEventListener('touchstart',function(e){
        executeNext(eval(args[1]));
  });

  //選択肢２
  let text2 = new Label(args[2]);
  text2.font  = "16px monospace";
  text2.color = "rgb(0, 0, 0)";
  text2.y     = 230;
  text2.x = 10;
  text2.width = 300;
  text2.height = 120;

  textLayer.addChild(text2);

  //シーン名が渡されます
  text2.addEventListener('touchstart',function(e){
      executeNext(eval(args[3]));
  });


}


//関数名おかしいですが・・・
//スコアポイント系に使えます
AddPlayerStatusPlane(args){
    //ただポイントを付与するだけです。
    player.status[args[0]] += args[1];
}

//フラグ系に使います
AddPlayerStatusFlag(args){
    player.status[args[0]] = args[1];
}




DeleteCharactor(){
  //背景を削除する
  bgLayer.removeChild(bgLayer.firstChild);
  //キャラクターを削除する
  imageLayer.removeChild(imageLayer.firstChild);
  imageLayer.removeChild(imageLayer.lastChild);
}



//条件(int)によって処理を変えるメソッド
//主にプレイヤーのポイントによって処理を変えるメソッドをここに追加します
//引数例　 ['miyapoint >=7','kokihinto3','scene74a']
SelectMethod(args){

      var prop = args[0].split(' ');
      var siki = player.status[prop[0]] + prop[1];

    if(eval(siki)){
      this.GoNextScene(eval(args[1]));
    }else{
      this.GoNextScene(eval(args[2]));
    }
}


//条件式(bool)によって遷移先のシーンを変えることができます
//引数例　['みやがスパイの話を聞いた ==true','scene38A','scene38B']
SelectMethodHasTrue(args){

      var prop = args[0].split(' ');
      var siki = player.status[prop[0]] + prop[1];

      if(eval(siki)){
        this.GoNextScene(eval(args[1]));
      }else{
        this.GoNextScene(eval(args[2]));
    }

}



} //End Class






// シナリオを実行する関数
//あくまでも、インスタンス化された後ならば
//ここでこの変数名を使用することができる
//じゃあなんでコールバックで使えねんだ？^^;
function executeNext(args) {
  _currentScene.GoNextScene(args);
}

function getNextSceneName(){
  return _currentScene.nextSceneName;
}










//////////////////////////////////////
// 各種設定等
//////////////////////////////////////
imglist = ["title.jpg","yeki.jpg","ymiti.jpg","yokujo.jpg","ynakaniwa.jpg","tosho.jpg","kaidan.jpg","yekimae.jpg","ymati.jpg","koki.png","akoen.jpg","yhome.jpg","ykoen.jpg","nakaniwa.jpg","kyositu.jpg","nene.png","gako.jpg","home.jpg","shuzinko.png","miya.png"]
bgmlist = ["やばいシーン.mp3","家.mp3","ホップ.mp3","明るい街.mp3","バッドエンド.mp3","可愛い.mp3","ノーマルエンドに最適.mp3","op.mp3"]

// シーンを生成する
let _currentScene = new CurrentScene();
//プレイヤーを作成する
var player = new MainPlayer();



//////////////////////////////////////
// 初期化処理
//////////////////////////////////////
window.onload = function() {


  core = new Core(330, 320);
  core.fps = 16;
  //使用する画像をプリロードする(配列を渡せばOK)
  core.preload(imglist);
  core.preload(bgmlist);

  core.bgm = Sound.load('op.mp3');

  //ここで初期化処理が始まる
  core.onload = function() {


      core.bgm.volume = 0.3;
      core.bgm.play();
      core.bgm.loop = true;

      //レイヤーで管理する
      bgLayer = new Group();
      core.rootScene.addChild(bgLayer);

      imageLayer = new Group();
      core.rootScene.addChild(imageLayer);

      textLayer = new Group();
      core.rootScene.addChild(textLayer);


      /*これが最初のシーンです */
      _currentScene.SetBackGroundImage("title.jpg");
      //引数リスト
      //選択肢１　遷移先１　選択肢２　遷移先２
      //最初は選択肢のあるシーンを作成しています。
      _currentScene.SetChoiceScene(["▶︎ ゲームスタート",scene1,"▶︎ このゲームについて",aboutscene]);


  }

  core.start();

}
