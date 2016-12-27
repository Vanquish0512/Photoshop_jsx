function getLayers(){

win = new Window("dialog", "Retina&rename&PNG24",[100,100,400,400]);
okbtn1 = win.add("button", { width: 150, height: 35, x: 80, y:20 }, "カンバスサイズ変更");
okbtn2 = win.add("button", { width: 150, height: 35, x: 80, y: 75 }, "Retina用生成+拡張子付与");
okbtn3 = win.add("button", { width: 150, height: 35, x: 80, y: 130 }, "背景透明PNG24保存用");
okbtn4 = win.add("button", { width: 150, height: 35, x: 80, y: 185 }, "単発Retina+jpg");
okbtn5 = win.add("button", { width: 150, height: 35, x: 80, y: 240 }, "閉じる");

okbtn1.onClick = function () {
    Canvas();
    win.close();
}
okbtn2.onClick = function () {
    Retina_typerename();
	win.close();
}


okbtn3.onClick = function () {
    png_web();
	win.close();
}

okbtn4.onClick = function () {
	single_jpg();
	win.close();
}

okbtn5.onClick = function () {
	win.close();
}

win.show();



//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//　カンバスサイズを最大まで合わせる
//
//　2016.08.14 ver.1.0
//
//　System requirements : Adobe Photoshopcc 2015
//　Copyright(c) 2016 http://blog.hyperdash.com/121
//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function Canvas(){
var canvasWidth = activeDocument.width;
var canvasHeight = activeDocument.height;
var layer = activeDocument.activeLayer;
var layerX = layer.bounds[0];
var layerY = layer.bounds[1];
var layerWidth = layer.bounds[2] - layerX;
var layerHeight = layer.bounds[3] - layerY;
var rate;
 
if(layerHeight * (canvasWidth / layerWidth)>= canvasHeight){
    // 拡大縮小倍率を白が出ないようにするため小数点以下第4位で切り上げ（この辺は調整）
    rate = Math.ceil((canvasWidth / layerWidth) * 10000) / 100;
} else {
    // 拡大縮小倍率を白が出ないようにするため小数点以下第4位で切り上げ（この辺は調整）
    rate = Math.ceil((canvasHeight / layerHeight) * 10000) / 100;
}
 
// レイヤーをリサイズ
layer.resize(rate, rate);
 
layerX = layer.bounds[0];
layerY = layer.bounds[1];
layerWidth = layer.bounds[2] - layerX;
layerHeight = layer.bounds[3] - layerY;
 
// 中央寄せ
layer.translate(((canvasWidth - layerWidth) / 2) - layerX, ((canvasHeight - layerHeight) / 2) - layerY);
}


//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//　レイヤーを複製し、Retina用に200%をつけ、全てに拡張子を付ける。
//
//　2016.08.14 ver.1.0
//
//　System requirements : Adobe Photoshopcc 2015
//　Copyright(c) 2016 ryu
//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function Retina_typerename(){


	/*↓複製したレイヤーの先頭に200%をつける↓*/
	 firstt = activeDocument.artLayers.length;
	var layer_sum = firstt - 1;
	//alert("レイヤーの総数-1:"+layer_sum);

	for(var i=0 ; i<=layer_sum ; i++){
	xyz = i*2;
	
	if(xyz == 1){
	
	xyz=0;
	
	}
	//alert(i);
	//alert(xyz);

	activeDocument.artLayers[xyz].duplicate();
	
	now_name = activeDocument.artLayers[xyz].name;
	var retina = "200% ";
	var new_name = retina + now_name ;
	activeDocument.artLayers[xyz].name = new_name ;
	}



/*↓○○のコピーを削除↓*/
//get ActiveDocument
var document = app.activeDocument;

//set copied str
var dummyLayer = document.artLayers.add();
var copyLayer = dummyLayer.duplicate();
var deleteStr = copyLayer.name.split(dummyLayer.name)[1];
dummyLayer.remove();
copyLayer.remove();

//get layers
var allLayers = document.layers;

function rename(layers) {
	var length = layers.length;
	for(var i = 0; i < length; i++) {
		var layer = layers[i];
		var tmpVisible = layer.visible;
		layer.visible = true;
		if(layer.name.indexOf(deleteStr) != -1) {
			layer.name = layer.name.split(deleteStr)[0];
		}
		if(layer.typename == "LayerSet") rename(layer.layers);
		layer.visible = tmpVisible;
		
	}
}

//run
rename(allLayers);


	/*ここで拡張子をつける*/
	last_count = activeDocument.artLayers.length;
	var last_count_sum = last_count - 1;
	
	for(var i=0 ; i<=last_count_sum ; i++){
	
	
	if(i % 2 == 0){
	var layer_last_name = activeDocument.artLayers[i].name;
	var jpg = "@2x.jpg8 ";
	var last_new_name = layer_last_name + jpg ;
	activeDocument.artLayers[i].name = last_new_name ;
	}
	
	else{
	var layer_last_name = activeDocument.artLayers[i].name;
	var jpg = ".jpg8 ";
	var last_new_name = layer_last_name + jpg ;
	activeDocument.artLayers[i].name = last_new_name ;
	
			}
	
		}

	}
	
//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//　レイヤーをレイヤー名のPNG形式でWeb用に保存する
//
//　2016.08.14 ver.1.0
//
//　System requirements : Adobe Photoshopcc 2015
//　Copyright(c) 2016 ryu
//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function png_web() {

	// 現在のドキュメント
	var doc = app.activeDocument;

  	//レイヤーの総数を求める
	var layer_count = activeDocument.artLayers.length;
	var layer_sum = layer_count - 1;

	//レイヤーを一旦全て非表示にする。	
 	for(var i=0 ; i<=layer_sum ; i++){
	//レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}
	
    // 保存先フォルダの選択
    var folder = Folder.selectDialog("保存先フォルダの選択");
    if (folder == null) {
        return;
    }

/**
 * ドキュメントをPNG画像として保存します(Web用に保存相当)。
 *
 * @param {Document} doc
 * @param {Folder}   folder
 * @param {string}   name
 *
 */

for(var i=0 ; i<=layer_sum ; i++){
	 //レイヤーの表示
	 var layer_visible = activeDocument.artLayers[i].visible =true ;
	 
	 //レイヤー名と拡張子を結合する。
	 var layer_name = activeDocument.artLayers[i].name;
	 var type       = ".png";
	 var layer_type = layer_name + type;
	 //activeDocument.artLayers[i].name = layer_type ;
	 
	 
	 // exportDocumentで保存
     exportAsPng(doc, folder, layer_type);
	 
function exportAsPng(doc, folder, name) {
    // フォルダが存在しない場合作成
    if (!folder.exists) {
        folder.create();
    }


 var file = new File(folder.fsName + "/" + name);
    // 「Web用に保存」のためのオプション
    var options = new ExportOptionsSaveForWeb();
    // PNGで保存
    options.format = SaveDocumentType.PNG;
    
    // PNG24で保存
    options.PNG8 = false;
    
    //パレットのカラー数 デフォルトは256
    options.colors = 256;
    
    // 最適化有効
    options.optimized = true;
    // インターレース無効
    options.interlaced = false;
    // エクスポート
    doc.exportDocument(file, ExportType.SAVEFORWEB, options);
    
     //レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}
		
		
		
	}
	
//Retina用にカンバスサイズを倍にする。
preferences.rulerUnits = Units.PIXELS;
var canvasWidth = activeDocument.width;
var canvasHeight = activeDocument.height;
var canvas_w   = canvasWidth/2;
var canvas_h   = canvasHeight/2;
activeDocument.resizeImage(canvas_w,canvas_h);


//Retina用に保存する。
for(var i=0 ; i<=layer_sum ; i++){

	//レイヤーの表示
	 var layer_visible = activeDocument.artLayers[i].visible =true ;
	 var layer_name = activeDocument.artLayers[i].name;
	 var type       = "@2x.png";
	 var layer_type = layer_name + type;
	 
	 // exportDocumentで保存
     exportAsPng(doc, folder, layer_type);
	 
function exportAsPng(doc, folder, name) {
    // フォルダが存在しない場合作成
    if (!folder.exists) {
        folder.create();
    }


 var file = new File(folder.fsName + "/" + name);
    // 「Web用に保存」のためのオプション
    var options = new ExportOptionsSaveForWeb();
    // PNGで保存
    options.format = SaveDocumentType.PNG;
    
    // PNG24で保存
    options.PNG8 = false;
    
    //パレットのカラー数 デフォルトは256
    options.colors = 256;
    
    // 最適化有効
    options.optimized = true;
    // インターレース無効
    options.interlaced = false;
    // エクスポート
    doc.exportDocument(file, ExportType.SAVEFORWEB, options);
    
     //レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}

	}	

//レイヤーのカンバスサイズを元に戻す。
activeDocument.resizeImage(canvasWidth,canvasHeight);

}


//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//　レイヤーをレイヤー名のJPG形式でWeb用に保存する
//
//　2016.08.14 ver.1.0
//
//　System requirements : Adobe Photoshopcc 2015
//　Copyright(c) 2016 ryu
//　++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function single_jpg(){

	// 現在のドキュメント
	var doc = app.activeDocument;

  	//レイヤーの総数を求める
	var layer_count = activeDocument.artLayers.length;
	var layer_sum = layer_count - 1;

	//レイヤーを一旦全て非表示にする。	
 	for(var i=0 ; i<=layer_sum ; i++){
	//レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}
	
    // 保存先フォルダの選択
    var folder = Folder.selectDialog("保存先フォルダの選択");
    if (folder == null) {
        return;
    }

/**
 * ドキュメントをJPG画像として保存します(Web用に保存相当)。
 *
 * @param {Document} doc
 * @param {Folder}   folder
 * @param {string}   name
 *
 */

for(var i=0 ; i<=layer_sum ; i++){
	 //レイヤーの表示
	 var layer_visible = activeDocument.artLayers[i].visible =true ;
	 
	 //レイヤー名と拡張子を結合する。
	 var layer_name = activeDocument.artLayers[i].name;
	 var type       = ".jpg";
	 var layer_type = layer_name + type;
	 //activeDocument.artLayers[i].name = layer_type ;
	 
	 
	 // exportDocumentで保存
     exportAsPng(doc, folder, layer_type);
	 
function exportAsPng(doc, folder, name) {
    // フォルダが存在しない場合作成
    if (!folder.exists) {
        folder.create();
    }


 var file = new File(folder.fsName + "/" + name);
    // 「Web用に保存」のためのオプション
    var options = new ExportOptionsSaveForWeb();
    
    // JPGで保存
    options.format = SaveDocumentType.JPEG;
    
    //カラープロファイルの埋め込みの有無
    options.includeProfile = false;

    //パレットのカラー数 デフォルトは256
    options.colors = 256;
    
    //画質の圧縮率
	options.quality = 80;//100%の画質
    
    //ぼかし
    options.blur = 0;   
     
    //マットカラーを白に
    options.matteColor = new RGBColor();
    options.matteColor.red = 255;
	options.matteColor.green = 255;
	options.matteColor.blue = 255; 
    
    // 最適化有効
    options.optimized = true;
    // インターレース無効
    options.interlaced = false;
    // エクスポート
    doc.exportDocument(file, ExportType.SAVEFORWEB, options);
    
     //レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}
		
		
		
	}
	
//Retina用にカンバスサイズを倍にする。
preferences.rulerUnits = Units.PIXELS;
var canvasWidth = activeDocument.width;
var canvasHeight = activeDocument.height;
var canvas_w   = canvasWidth/2;
var canvas_h   = canvasHeigh/2;
activeDocument.resizeImage(canvas_w,canvas_h);


//Retina用に保存する。
for(var i=0 ; i<=layer_sum ; i++){

	//レイヤーの表示
	 var layer_visible = activeDocument.artLayers[i].visible =true ;
	 var layer_name = activeDocument.artLayers[i].name;
	 var type       = "@2x.jpg";
	 var layer_type = layer_name + type;
	 
	 // exportDocumentで保存
     exportAsPng(doc, folder, layer_type);
	 
function exportAsPng(doc, folder, name) {
    // フォルダが存在しない場合作成
    if (!folder.exists) {
        folder.create();
    }


 var file = new File(folder.fsName + "/" + name);
        // 「Web用に保存」のためのオプション
    var options = new ExportOptionsSaveForWeb();
    
    // JPGで保存
    options.format = SaveDocumentType.JPEG;
    
    //カラープロファイルの埋め込みの有無
    options.includeProfile = false;

    //パレットのカラー数 デフォルトは256
    options.colors = 256;
    
    //画質の圧縮率
	options.quality = 80;//100%の画質
    
    //ぼかし
    options.blur = 0;   
     
    //マットカラーを白に
    options.matteColor = new RGBColor();
    options.matteColor.red = 255;
	options.matteColor.green = 255;
	options.matteColor.blue = 255; 
    
    // 最適化有効
    options.optimized = true;
    // インターレース無効
    options.interlaced = false;
    // エクスポート
    doc.exportDocument(file, ExportType.SAVEFORWEB, options);
    
     //レイヤーの非表示
	 var layer_visible = activeDocument.artLayers[i].visible =false ;
		}

	}	

//レイヤーのカンバスサイズを元に戻す。
activeDocument.resizeImage(canvasWidth,canvasHeight);

}


}
//スクリプトを実行
getLayers();
