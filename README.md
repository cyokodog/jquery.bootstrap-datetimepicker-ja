jquery.bootstrap-datetimepicker-ja
==================================

[Bootstrap Datetime Picker](http://tarruda.github.io/bootstrap-datetimepicker/) を使いやすくカスタマイズした jQuery プラグイン

### Bootstrap Datetime Picker の基本機能

[Bootstrap Datetime Picker](http://tarruda.github.io/bootstrap-datetimepicker/)  は、１つの入力フィールドに対し下記パターンで値をセットすることができます。

1. 日付と時刻（YYYY/MM/DD HH:MI:SS）
2. 日付のみ（YYYY/MM/DD）
3. 時刻のみ（HH:MI:SS）

1 のように日付と時刻を入力する場合は、ダイアログの上下部に表示されるアイコンで選択画面を切り替えます。

![Bootstrap Datetime Picker](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/img/image01.png)

以下のよう実行します。

	<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">
	<link href="bootstrap-datetimepicker.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
	<script src="bootstrap-datetimepicker.min.js"></script>
	<script>
		$('#datetimepicker1').datetimepicker({
			format : 'yyyy/MM/dd hh:mm:ss'
		});
	</script>
	<div id="datetimepicker1" class="input-append">
		<input type="text"/><span class="add-on"><i></i></span>
	</div>

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo1.html#contents0)

### 日付を選択した時にダイアログを閉じるようにする

一般的な日付ピッカーの場合、日付を選択したタイミングでダイアログが閉じますが、Bootstrap Datetime Picker の場合、選択後、ダイアログ以外の画面のどこかをクリックしないと閉じない仕様になっています。これは恐らく、日付と時刻の両方を指定する場合、日付選択後に時刻選択画面に切り替える必要があるからかと思います。

ですが純粋な日付ピッカーとして使用する場合、やはり不便ですので、以下のように記述することで、日付選択時にダイアログを閉じるようにすることができます。

	var api = $('#datetimepicker2').datetimepicker({
		format : 'yyyy/MM/dd',
		pickTime : false
	}).data('datetimepicker');
	api.widget.on('click','td.day',function(){
		api.hide();
	});

data() メソッドで API オブジェクトを取得し、日付選択時に、API で提供された hide() メソッドでダイアログを閉じるようにしてます。

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo1.html#contents1)

### 日本語表示にする

日本語表示にするには、事前に $.fn.datetimepicker.dates に日本語設定をしておき、プラグイン実行時に language パラメータを指定します。

	$.extend($.fn.datetimepicker.dates , {
		ja: {
			days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
			daysShort: ['日', '月', '火', '水', '木', '金', '土', '日'],
			daysMin: ['日', '月', '火', '水', '木', '金', '土', '日'],
			months: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
			monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
		}
	});
	$('#datetimepicker3').datetimepicker({
		format : 'yyyy/MM/dd hh:mm:ss',
		language : 'ja'
	});

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo1.html#contents2)

### 時刻ピッカーの秒を非表示にする

![Bootstrap Datetime Picker](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/img/image02.png)

時刻を入力する際、秒を指定するケースというのはあまり無いかと思われます。以下のように記述することで、時刻ピッカーの秒を非表示にすることができます。

	var api = $('#datetimepicker4').datetimepicker({
		format : 'hh:mm:ss',
		pickDate : false
	}).data('datetimepicker');
	api.widget.find('.timepicker-picker tr').each(function(){
		var td = $(this).find('td');
		td.eq(3).hide();
		td.eq(4).hide();
	});

API よりダイアログのコンテナ部（api.widget）を取得し、その中にある時刻ピッカーの秒表示の部分を非表示にしています。

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo1.html#contents3)

### 分の選択画面の時間間隔を変更する

時刻ピッカーの画面で、時間の数字部を選択すると画面が切り替わり、一定間隔の時間一覧が表示され、いずれかの時間を選択することができます。

![Bootstrap Datetime Picker](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/img/image03.png)

分を選択した場合、デフォルトでは何故か３分間隔の一覧が表示されます。アプリにもよるかと思いますが、一般的には 5分、10分、15分間隔あたりがよく使われると思います。以下のように記述することで、任意の時間間隔で表示させることができます。（以下例では５分間隔）

	$.fn.datetimepicker.Constructor.prototype.fillMinutes = function(){
		var minutesRange = 5;
		var minutesX = 4;

		function padLeft(s, l, c) {
			if (l < s.length) return s;
			else return Array(l - s.length + 1).join(c || ' ') + s;
		}
		var hour = 60;
		var minutesCol = Math.floor((hour - 1) / minutesRange);
		var minutesY = Math.ceil(minutesCol / minutesX);
		var table = this.widget.find('.timepicker .timepicker-minutes table');
		table.parent().hide();
		var html = '';
		var current = 0;
		for (var i = 0; i < minutesY; i++) {
			html += '<tr>';
			for (var j = 0; j < minutesX; j += 1) {
				if(current < hour){
					var c = current.toString();
					html += '<td class="minute">' + padLeft(c, 2, '0') + '</td>';
				}
				else{
					html += '<td/>'
				}
				current += minutesRange;
			}
			html += '</tr>';
		}
		table.html(html);
	}
	$('#datetimepicker5').datetimepicker({
		format : 'hh:mm:ss',
		pickDate : false
	});

オリジナルのソースの fillMinutes メソッドを動的に上書きしてます。変数 minutesRange に分の間隔、minutesX に一行当たりに表示する分の数を指定します。

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo1.html#contents4)

### オリジナルのソースをラップし、カスタマイズ版としてプラグイン化してみる

上記のような記述を毎回するのも面倒なので、オリジナルのソースをラップしてプラグイン化してみます。

- [bootstrap-datetimepicker-ja.js](https://github.com/cyokodog/jquery.bootstrap-datetimepicker-ja/blob/gh-pages/bootstrap-datetimepicker-ja.js)

### カスタマイズ版のデフォルトの動作は日付ピッカー

カスタマイズ版をパラメータを指定せず実行してみます。

	$('#datetimepicker1').datetimepicker_ja();

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo2.html#contents0)

以下のような挙動となります。

- 日付ピッカーとして動作
- 日付選択時にダイアログが閉じる
- 日本語表示

### カスタマイズ版を時刻ピッカーとして起動する

時刻ピッカーとして起動する場合は、以下のように記述します。

	$('#datetimepicker2').datetimepicker_ja({
		format : 'hh:mm',
		pickDate : false,
		pickTime : true
	});

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo2.html#contents1)

以下のような挙動となります。

- 時刻ピッカーのダイアログで秒が非表示
- 分の選択一覧が５分間隔

秒を表示させたい場合は、hideSeconds パラメータに false を指定します。

### 分の選択一覧の分間隔を指定する

minutesRange パラメータで分の選択一覧の分間隔を指定することができます。以下例では10分間隔にしてます。

	$('#datetimepicker3').datetimepicker_ja({
		format : 'hh:mm',
		pickDate : false,
		pickTime : true,
		minutesRange : 10,
		minutesX : 3
	});

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo2.html#contents2)

minutesX パラメータには一行当たりに表示する分の数を指定することができます。

### オリジナル版の挙動に影響なし

オリジナルのソースの動的な上書きをしてますが、挙動に影響はありません。

	$('#datetimepicker4').datetimepicker({
		format : 'yyyy/MM/dd hh:mm:ss'
	});

[Demo](http://cyokodog.github.io/jquery.bootstrap-datetimepicker-ja/demo2.html#contents3)

### ダウンロード

こちらからどうぞ。

- [jquery.bootstrap-datetime-picker-ja - GitHug](https://github.com/cyokodog/jquery.bootstrap-datetimepicker-ja)

