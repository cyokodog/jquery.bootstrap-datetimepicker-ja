;(function($){
	$.extend($.fn.datetimepicker.dates , {
		ja: {
			days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
			daysShort: ['日', '月', '火', '水', '木', '金', '土', '日'],
			daysMin: ['日', '月', '火', '水', '木', '金', '土', '日'],
			months: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
			monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
		}
	});
	var plugin = $.fn.datetimepicker_ja = function(option){
		this.each(function(){
			var target = $(this);
			var c = $.extend({}, plugin.defaults, option);
			var api = target.datetimepicker(c).data('datetimepicker');
			!c.datePickerAutoClose || api.pickTime || api.widget.on('click','td.day',function(){
				api.hide();
			});
			!c.hideSeconds || api.widget.find('.timepicker-picker tr').each(function(){
				var td = $(this).find('td');
				td.eq(3).hide();
				td.eq(4).hide();
			});

		});
	}

	function padLeft(s, l, c) {
		if (l < s.length) return s;
		else return Array(l - s.length + 1).join(c || ' ') + s;
	}
	var proto = $.fn.datetimepicker.Constructor.prototype;
	var prop = {};
	for(var i in proto){
		prop[i] = proto[i];
	}
	proto.init = function(element, options){
		this.options = options;
		prop['init'].apply(this, arguments);
	}
	proto.fillMinutes = function(){
		var minutesX = this.options.minutesX;
		if(!minutesX){
			prop['fillMinutes'].apply(this, arguments);
			return;
		}
		var minutesRange = this.options.minutesRange;
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

	$.fn.datetimepicker_ja.defaults = {
		format : 'yyyy/MM/dd',
		pickTime: false,
		language : 'ja',
		datePickerAutoClose : true,
		hideSeconds : true,
		minutesX : 4,
		minutesRange : 5
	}
})(jQuery);
