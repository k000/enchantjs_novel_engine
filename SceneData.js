//実際のゲームのシナリオが見えてしまうので
//必要部分のみ掲載

titlescene = {
  'DeleteCharactor':"",
  'SetBackGroundImage' : 'yeki.jpg',
  'SetChoiceScene': [" ▶︎ もう一度プレイする","scene1"," ▶︎ すごいヒントを見る","sugoihinto"],
}

scene4A = {
  'AddPlayerStatusPlane' : ['nenepoint',1],
  'SetText': ['ねね','ふーん　ってあんまり興味ないの？','彼女いないくせに（笑）'],
  'SetNextSceneName':'scene5'
}


scene7 = {
  'DeleteCharactor':"",
  'SetBackGroundImage' : 'kyositu.jpg',
  'SetCharactorLeft': 'nene.png',
  'SetText': ["ねね","あの子が転校生かな","もうちょっとしたら自己紹介タイムだね","なんて名前なんだろ〜？"],
  'SetNextSceneName' : 'scene8'
}

scene21 = {
  'DeleteCharactor':"",
  'SetBackGroundImage' : 'akoen.jpg',
  'SetCharactorRight': 'miya.png',
  'SetCharactorLeft': 'nene.png',
  'SetText': ["","むむっ！ねねとみやちゃんがいる！どっちに話しかけようかな・・・？"],
  'SetNextSceneName' : 'scene22'
}

scene35B3 = {
  'AddPlayerStatusPlane' : ['nenepoint',1],
  'SetText': ["ねね","・・・・・・・・・","あんたらしいわね・・・・・"],
  'SetNextSceneName' : 'scene35B4'
}

scene32 = {
  'SelectMethod': ['nenepoint >=4','scene33A','scene33B'],
}

scene37 = {
  'SelectMethodHasTrue': ['みやがスパイの話を聞いた ==true','scene38A','scene38B'],
}

scene76A = {
    'AddPlayerStatusFlag' : ["ねねに会いたい",true],
    'SetText': ["","ねねだ！","とりあえず今日は寝るか・・・"],
    'SetNextSceneName' : 'scene80'
}
