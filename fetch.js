const url = 'https://dog.ceo/api/breeds/image/random';
    // 短期間集中アクセスはNG 1秒〜2秒は間隔を開けながら使うようにしてください
    //urlで取得したいAPIを指定する
    const options = {
      method: 'GET'
    };

    //const fetchTest1 = fetch(url, options);//fetchは引数２個、返り値がpromise
    //console.log(fetchTest1);
    // 返り値はPromise、この状態では中身が確認できない

    // APIがJSONで取得できるなら response.json()でパースする
    const fetchTest2 = fetch(url, options)//fetchは引数２個、返り値がpromise
    .then( response => response.json() );

    //返り値promiseだから.thenが使えるthenメソッドの引数はcallback関数で書く
    //引数はpromiseの値になる、基本的にresponseと定義する
    /*console.log(fetchTest1)の様に、値がresponseオブジェクトの状態だと、中身が見れないのでresponseオブジェクトが持っている
    .json()というメソッドを使い、jsonで返ってくるAPIはresponse.json();を使いjson形式で取得*/
    /*jsonでmessageとstatusがわかる様になるが
    json形式のままではjavascriptで使えない
    responce.json()と書くことで自動的にjson形式がオブジェクトの形にパース（変換）することでjavascriptでも
    使える様になる*/

//    console.log(fetchTest2);
    
    //console.log(fetchTest2.message);//データの取得を待ってから処理をしないとpromise値がpendingのままである
 //messageにはAPIから取得したURLが入っている

// データの取得をまってから処理をする
// async/awaitを使うことでデータ取得を待って処理することができる

// 返り値 responseはPromiseオブジェクト
// 状態(ok/ng), それぞれの値
function fetchDogImage(url, options){
  return fetch(url, options)　//return記述しているから自動的にfetchが走る
  .then( response =>  {
    console.log(response.ok);
    console.log(response.status);
    //fetchの場合、エラーが起きていてもokと見做してしまうので、okやstatusで判定をかけるべき
    //status=200番台だと成功
    if(response.ok){
    return response.json()
    }
    throw new Error('エラーです');
  }).catch(e => console.log(e.message));
    }
//fetchはサーバー側でエラーが起こっていてもレスポンスをok値で返してしまう


async function fetchImage(url, options){//async functionで非同期関数になる→awaitが使える
  const response = await fetchDogImage(url, options);
  /*定数にjsonとして入るが、fetchが処理される前に入る可能性がある為
  awaitをつけてデータ取得を待ってから処理する様に書く*/
  //console.log(response.message);

  const imageDiv = document.getElementById('image');
  const imageElement = document.createElement('img');
  imageElement.src = response.message; //messageにはAPIから取得したURLが入っている
 // document.body.appendChild(imageElement);
 imageDiv.appendChild(imageElement);
}

fetchImage(url, options);