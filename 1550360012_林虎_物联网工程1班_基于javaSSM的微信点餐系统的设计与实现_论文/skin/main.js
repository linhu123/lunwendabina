function MsgBox(config) {
	var defaultOpts = {
		title : '温馨提示',
		modalid : 'modal',
		msg : '',
		btns : []
	};
	this.opts = $.extend(true, {}, defaultOpts, config);
	this.modalid = this.opts.modalid;
	this.$elem = $('#' + this.opts.modalid);
	this.title = this.opts.title;
	this.msg = this.opts.msg;
	this.btns = this.opts.btns;
};
$.extend(
				MsgBox.prototype,
				{
					alert : function() {
						var oThis = this;
						oThis._init();
						oThis._bindEvent('alert');
					},
					confirm : function(callback) {
						var oThis = this;
						oThis._init();
						oThis._bindEvent('confirm', callback);
					},
					modalshow : function(callback) {
						var oThis = this;
						oThis.$elem = $('#' + oThis.modalid);
						oThis._GenerateCss();
						oThis._bindEvent('confirm', callback);
					},
					modalhide : function() {
						var oThis = this;
						oThis._modalhide();
					},
					_GenerateHtml : function() {
						// debugger;
						var oThis = this;
						// 弹框HTML
						if (oThis.$elem.length < 1) {
							// 弹框是否存在
							var _html = "";
							_html = '<div id="'
									+ oThis.modalid
									+ '" class="modal fade"  role="diamodallog" "><div class="modal-dialog"><div class="modal-content">';
							_html += '<div class="modal-header"><button type="button" class="close">&times;</button><h4 class="modal-title" id=""><span>'
									+ oThis.title + '</span></h4></div>';
							_html += '<div class="modal-body">' + oThis.msg
									+ '</div>';
							_html += '<div class="modal-footer">';
							if (oThis.btns.length > 0) {
								for ( var i in oThis.btns) {
									_html += oThis.btns[i]; // ok、no、confirm、cancel
								}
							} else {
								_html += '<a class="btn btn-primary confirm">确 定</a>';
								_html += '<a class="btn btn-default cancel">取 消</a>';
								// _html += '<button type="button" class="btn
								// btn-primary confirm">确 定</button>';
								// _html += '<button type="button" class="btn
								// btn-default cancel">取 消</button>';
							}
							_html += '</div>';
							_html += '</div></div></div>';
							$('body').append(_html);
							oThis.$elem = $('#' + oThis.modalid);
						}
					},
					_GenerateCss : function() {
						var oThis = this;
						// 添加蒙板
						var _mask = '<div class="modal-backdrop fade"></div>';
						$('body').append(_mask);
						// 添加样式
						oThis.$elem.show().addClass('in');
						$('.modal-backdrop').addClass('in');
						if (!$('body').hasClass('modal-open')) {
							$('body').addClass('modal-open');
						}
						var mt = parseInt(oThis.$elem.find('.modal-dialog')
								.css('margin-top'));
						if (mt <= 0) {
							var top = ($(window).height()
									- oThis.$elem.find('.modal-dialog')
											.height() - 80) / 2;
							oThis.$elem.find('.modal-dialog').css('margin-top',
									top > 0 ? top : 20);
						}
					},
					_init : function() {
						var oThis = this;
						oThis._GenerateHtml();
						oThis._GenerateCss();
					},
					_bindEvent : function(type, callback) {
						var oThis = this, $elem = oThis.$elem;
						var btnOk = function(callback) {
							$elem.find('.confirm,.ok').click(function() {
								oThis._modalhide();
								if (typeof callback === 'function') {
									callback();
								}
							});
						};
						var btnNo = function() {
							$elem.find('.cancel,.no').click(function() {
								oThis._modalhide();
							});
						};

						var modalclose = function() {
							$elem.find('.close').click(function() {
								oThis._modalhide();
							});
							$($elem)
									.click(
											function(e) {
												var target = $(e.target);
												if (target
														.closest(".modal-content").length == 0) {
													oThis._modalhide();
												}
											});
						};
						if (type === "alert") {
							btnNo();
							modalclose();
						} else if (type === "confirm") {
							btnOk(callback);
							btnNo();
							modalclose();
						}
					},
					_modalhide : function() {
						$('.modal').removeClass('in').fadeOut(300);
						$('.modal-backdrop').fadeOut(300);
						setTimeout(function() {
							$('.modal-backdrop').removeClass('in').remove();
						}, 300);
						$('body').removeClass('modal-open');
					}
				});

var initMethod = {
	state : false,
	setiframeH : function() {
		$('#iframe-content').height('auto');
		var H = $(window).height() - $('.header').height() - 40;
		$('#iframe-content').height(H);
	},
	iframesrc : function() {
		$('#sidebar li a').click(function(e) {
			e.preventDefault();
			$('#iframe-content').attr('src', $(this).attr('href'));
			$('#sidebar li').removeClass('active');
			$(this).parent('li').addClass('active');
		});
	},
	sidebarbar : function() {
		$('#sidebar li').mouseover(function() {
			var _off = $(this).position();
			$('.sidebar-menu-bar').animate({
				top : _off.top,
				height : 40,
				opacity : 1
			}, {
				duration : 20,
				queue : false
			});
		});
		$('#sidebar').mouseleave(function() {
			$('.sidebar-menu-bar').animate({
				height : 0,
				opacity : 0
			}, {
				duration : 200,
				queue : false
			});
		});
	},
	tabToggle : function(id) {
		$(id).click(function(e) {
			e.preventDefault();
			var target = $(this).attr('href');
			$(id).parent().removeClass('active');
			$(this).parent().addClass('active');
			$('.tab-pane').removeClass('active in');
			// console.log(target);
			$(target).addClass('in active');
		});
	},
	checkbox : function() {
		$('.checkbox').click(function() {
			$(this).children('span').toggleClass('checked');
			if ($(this).children('span').hasClass('checked')) {
				$(this).find('input').attr('checked', true);
			} else {
				$(this).find('input').attr('checked', false);
			}
		});
	},
	radio : function() {
		$('.radio').click(function() {
			var name = $(this).find('input').attr('name');
			name = 'input[name="' + name + '"]';
			// console.log(name);
			$('.radio').find(name).parent().removeClass('checked');
			$('.radio').find(name).attr('checked', false);
			if (!$(this).children('span').hasClass('checked')) {
				$(this).children('span').addClass('checked');
				$(this).find(name).attr('checked', true);
			}
		});
	},
	init : function() {
		initMethod.setiframeH();
		initMethod.iframesrc();
		initMethod.sidebarbar();
		initMethod.checkbox();
		initMethod.radio();
		// if ($('.tab-pane').length > 0 && !$('.tab-pane').hasClass('active'))
		// {
		// $('.tab-pane:first').addClass('active in');
		// }
	}
};
$(function(){
	initMethod.init();	
});

