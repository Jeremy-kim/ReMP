/*
 * ReMP에서 사용될 기본 자바스크립트 태그
 * 작성자 : 김재림
 * 버전 v 1.0
 */

/* 서브메뉴 열기 */
/* 로그처리 */
var operationMod = "debug";

function debug(log) {
	if (operationMod == "debug") {
		console.log("[Debug] Message : " + log);
	}
}
/* ------------------------- 네비게이션 컨트롤 ------------------------- */
function getNavSubMenu(targetElement) {
	var targetId = "#" + $(targetElement).data("module");
	
	if ($(targetId).css("display") == "block") {
		$(targetId).slideUp('fast');
		return;
	}
	
	$("#rental").slideUp('fast');	
	$("#asset").slideUp('fast');
	$("#EIS").slideUp('fast');
	$("#member").slideUp('fast');
	$(targetId).slideDown('fast');
}

function setNavSubMenu(takeElement) {
	$(takeElement).slideUp('fast')
}

/* ------------------------- UI 관련 ------------------------- */
/* 메시지창
 * 작성자 : 김재림
 * 버  전 : v 1.2
 */
const MsgWindow = class MsgWindow {
	/* 전역변수
	 * windowType - 창타입
	 * msgWindow - 메시지창 객체
	 * msgWindowHead - 헤드영역
	 * msgWindowDetail - 디테일영역
	 * msgWindowAction - 액션영역
	 */
	//생성자
	constructor(windowType) {
		if (windowType == null) {
			this.windowType == 'plain';
		}
		this.windowType = windowType.toLowerCase();
	}
	//창속성 기본 메시지창, violated : 정책위반창, Error : 에러창, Invalid : 무효창
	setWindowType(windowType) {
		if (windowType == null) {
			this.windowType == 'plain';
		}
		this.windowType = windowType.toLowerCase();
		this.msgWindowHead.removeAttr('class');
		this.msgWindowHead.attr('class', 'msgWindowHead '+this.windowType);
	}
	//현재설정된 메시지창 타입
	getWindowType() {
		return this.windowType;
	}
	//타이틀 및 메시지내용 설정
	setMessage(msgWindowHeadText, msgWindowDetialText) {
		if (msgWindowHeadText == null) {
			msgWindowHeadText == "정보"
		}
		if (this.windowType == null) {
			this.windowType = "plain";
		} else {
			switch (this.windowType) {
			case "violated":
				msgWindowHeadText = "[정책위반] "+msgWindowHeadText;
				break;
			case "error":
				msgWindowHeadText = "[오류] "+msgWindowHeadText;
				break;
			case "invalid":
				msgWindowHeadText = "[무효] "+msgWindowHeadText;
				break;
			default:
				msgWindowHeadText = "[메세지] "+msgWindowHeadText;
				break;
			}
		}
		if (msgWindowDetialText == null || msgWindowDetialText == "") {
			this.msgWindowDetialText = "---------------------------------------메시지 영역---------------------------------------";
		}
		this.msgWindowHead = $('<div />', {class: 'msgWindowHead '+this.windowType, onclick: 'MsgWindow.onTop(this)'});
		this.msgWindowDetail = $('<div />', {class: 'msgWindowDetail'});
		$(this.msgWindowHead).append($('<span />', {class: 'msgWindowHead-text', text: msgWindowHeadText}));
		$(this.msgWindowDetail).append($('<div />', {class: 'msgWindowDetail-text', text: msgWindowDetialText}));
	}
	//타이틀 및 메시지내용 출력
	getMessage() {
		return "제목 : "+this.msgWindowHeadText+", 내용 : "+this.msgWindowDetialText;
	}
	//버튼 설정
	setButton(buttonText, callbackFn) {
		if (this.msgWindowAction == null) {
			this.msgWindowAction = $('<div />', {class: 'msgWindowAction'});
		}
		if (buttonText == null) {
			buttonText == '확인';
		}
		if (callbackFn == null) {
			callbackFn = this.remove();
		}
		$(this.msgWindowAction).append($('<input />', {class: 'btn btn-primary btn-sm msgBtn', type: 'button', value: buttonText, onclick: callbackFn}));
	}
	//화면에 창 설정하기
	show() {
		if (this.msgWindowHead == null || this.msgWindowDetail == null) {
			this.setMessage(null, null);
		}
		$("body").append(this.createMsgWindow(this.windowType, this.msgWindowHead, this.msgWindowDetail));
		$(this.msgWindowAction).children()[0].focus();
	}
	//화면에서 숨기기
	static hide(takeElement) {
		debug(takeElement);
		$(takeElement).parents('div.msgWindow').fadeOut('fast');
		setTimeout(function() {
			$(takeElement).parents('div.msgWindow').remove();
		}, '3000', takeElement);
	}
	//객체삭제
	static remove(takeElement) {
		$(takeElement).parents('div.msgWindow').remove();
	}
	//상단으로 가져오기
	static onTop(takeElement) {
		$('.msgWindow').css('z-index', 'auto');
		$(takeElement).parents('.msgWindow').css('z-index', 1);
	}
	//메시지 객체 생성
	createMsgWindow() {
		this.msgWindow = $('<div />', {class: 'msgWindow'});
		$(this.msgWindow).append(this.msgWindowHead);
		$(this.msgWindow).append(this.msgWindowDetail);
		$(this.msgWindow).append(this.msgWindowAction);
		$(this.msgWindow).draggable();
		return this.msgWindow;
	}
	
	toString() {
		return 'windowType : '+ this.windowType +
			', msgWindowHead : '+ this.msgWindowHead +
			', msgWindowDetail : '+ this.msgWindowDetail +
			', msgWindowAction : '+ this.msgWindowAction;
	}
	//객체초기화
	initialize() {
		 this.windowType = null;
		 this.msgWindow = null;
		 this.msgWindowHead = null;
		 this.msgWindowDetail = null;
		 this.msgWindowAction = null;
	}
}

const PwWindow = class PwWindow {
	/* 전역변수
	 * callbackFn - 콜백함수
	 * passwordWindow - 모달윈도우
	 * pwWindowBody - 모달 내용
	 */
	//생성자
	constructor(callbackFn) {
		this.callbackFn = callbackFn;
		
		this.passwordWindow = $('<div />', {class: 'passwordWindow'});
		this.pwWindowBody = $('<div />', {class: 'pwWindowBody'});
		var title = $('<div />', {});
			$(title).append($('<h3 />', {text: '변경 전 비밀번호 확인'}));
		var form = $('<div />', {});
			$(form).append($('<input />', {name: 'check', class: 'form-control form-control-lg', type: 'text', placeholder: '비밀번호 입력'}))
		var action = $('<div />', {class: 'pwAction'});
			$(action).append($('<input />', {class: 'btn btn-primary btn-lg', type: 'button', style:'float: right;', onclick: '$(this).parents("div.passwordWindow").remove()', value:'취소하기'}));
			$(action).append($('<input />', {class: 'btn btn-primary btn-lg', type: 'button', style:'float: right;', onclick: '$("input[name=password]").val($("input[name=check]").val()); $(this).parents("div.passwordWindow").remove();'+callbackFn+';', value:'확인하기'}));
			
		$(this.pwWindowBody).append(title);
		$(this.pwWindowBody).append($('<hr>',{}));
		$(this.pwWindowBody).append(form);
		$(this.pwWindowBody).append($('<hr>',{}));
		$(this.pwWindowBody).append(action);
		$(this.passwordWindow).append(this.pwWindowBody);
	}
	
	show() {
		$('body').append(this.passwordWindow);
	}
}
/* ------------------------- 일반기능 ------------------------- */
function setToDate(fromDateValue) {
	$('#toDate').attr('min', fromDateValue);
}

function addToDate(takeElement) {
	var fromDate = $('#fromDate').val().split('-');
	debug(fromDate);
	if (fromDate.length <= 1) {
		var today = new Date();
		var todayYear = today.getFullYear();
		var todayMonth = today.getMonth() + 1;
		todayMonth = (todayMonth < 10)? '0' + todayMonth: todayMonth;
		var todayDay = today.getDate();
		todayDay = (todayDay < 10)? '0' + todayDay: todayDay;
		$('#fromDate').val(todayYear+'-'+todayMonth+'-'+todayDay);
		fromDate = $('#fromDate').val().split('-');
	}
	
	var addDate = $(takeElement).data('add-date').split('-');
	var year = parseInt(fromDate[0]) + parseInt(addDate[0]);
	var month = parseInt(fromDate[1]) + parseInt(addDate[1]) - 1;
	var day = parseInt(fromDate[2]) + parseInt(addDate[2]);
	var toDate = new Date(year, month, day, 0, 0, 0, 0);
	year = toDate.getFullYear();
	month = toDate.getMonth() + 1;
	month = (month < 10)? '0' + month : month;
	day = toDate.getDate();
	day = (day < 10)? '0' + day : day;
	debug(year+'-'+month+'-'+day);
	$('#toDate').val(year+'-'+month+'-'+day);
}

function initDate() {
	$('#toDate').val('');
	$('#fromDate').val('');
}

function setDueDiligenceForm() {
	$('input[name=planId]').val($(headElement).data('planId'))
	$('input[name=fromDate]').val($(headElement).data('fromDate'));
	$('input[name=toDate]').val($(headElement).data('toDate'));
	$('input[name=misc]').val($(headElement).data('misc'));
}

/* 우편번호 */
function getPost(takeElement, takeElement2) {
	new daum.Postcode({
        oncomplete: function(data) {
            var fullAddr = '';
            var extraAddr = '';

            if (data.userSelectedType === 'R') {
                fullAddr = data.roadAddress;
            } else {
                fullAddr = data.jibunAddress;
            }

            if(data.userSelectedType === 'R'){
                if(data.bname !== '') {
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }
            $(takeElement).val(data.zonecode);
            $(takeElement2).val(fullAddr);
        }
    }).open();
}

function userChangeInvoke() {
	debug('됐나?');
	return false;
}

/* ------------------------- 비동기 통신 ------------------------- */
/* ajax 공통 */
var loading = {
	on: $('<div />', {class: 'loading'}),
}

/* 비밀번호 변경 */
function setCustomerPassword() {
	var requestURL = "asdf";
	var takeData = $('input[name=new_pw]').val()
	if (takeData.trim() == '') {
		var msg = new MsgWindow('invalid');
		msg.setMessage('입력오류','입력하신 정보가 올바르지 않아 정보변경을 할 수 없습니다.');
		msg.setButton('확인','MsgWindow.hide(this)');
		msg.show();
		return false;
	}
	new PwWindow().show();
	var sData = {
		password:'a',
		toData:$('input[name=new_pw]').val()
	}
	debug(sData);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			setTimeout(3000);
			$(".loading").remove();
		}
	});
	
}

/* head_detail에서 head 일련번호 세팅하기 */
var headSeq = null;
var selectedHeadSeq = null;
var headElement = null;

function setHeadSeqRequest(takeElement) {
	headElement = takeElement;
	var callbackfunction = $(takeElement).data("fn-name"); //data-fn-name=?
	if (callbackfunction.substr(callbackfunction.length - 1) != ')') {
		callbackfunction += "(headSeq)";
	}
	headSeq = $(takeElement).data("key"); // data-key=?
	debug(headSeq);
	$(takeElement).parents("table")
		.children()
		.children(".table-success")
		.removeClass("table-success");
	$(takeElement).addClass("table-success");
	debug(callbackfunction);
	eval(callbackfunction);
}

/* head_detail에서 head 일련번호 가져오기 */
function getHeadSeqRequest() {
	return headSeq;
}

/* 렌탈요청헤드 조회 
 * success - 헤드부분 테이블 생성
 * error - 에러 메시지 알림창
 */
function getRentalRequest(takeElement){
	var requestURL = "getrentalrequest.do";
	var keyword = $("#keyword").val();
	if (keyword == null || keyword == "") {
		keyword = "2017";
	}
	var sData = JSON.stringify({
		keyword:keyword
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			var ihtml = "";
			debug(rData.length);
			debug(rData);
			//테이블데이터 생성부분
			for (var i = 0; i < rData.length; i++) {
				ihtml += "<tr data-fn-name='getassetlist' data-key='"+rData[i].reqId+"' onclick='setHeadSeqRequest(this)'>";
				ihtml += "<td>"+rData[i].reqId+"</td><td>"+rData[i].reqTransDate+"</td>";
				ihtml += "</tr>";
			}
			debug(ihtml);
			$("#rentalRequestResult tbody").html(ihtml);
			$('.loading').remove();
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			setTimeout(3000);
			$(".loading").remove();
		}
	});
}

/* 품목조회(콜백함수)
 * success - 품목별 테이블 생성
 * error - 에러 알림창
 */
function getassetlist(productId) {
	if (productId == selectedHeadSeq) {
		debug("already chosen")
		return;
	}
	selectedHeadSeq = productId;
	var requestURL = "getassetlist.do";
	var sData = JSON.stringify({
		productId:productId
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			var ihtml = "";
			debug(rData.length);
			debug(rData);
			//테이블데이터 생성부분
			for (var i = 0; i < rData.length; i++) {
				var row = rData[i];
				ihtml += "<tr data-item-id='"+ row.id
					+"' data-item-name='"+ row.name
					+"' data-item-entrydate='"+ row.entrydate
					+"' data-item-recentdate='"+ row.recentdate
					+"' data-item-unstorecount='"+ row.unstorecount
					+"' data-item-price='"+ row.price+"'>";
				ihtml += "<td>"+row.id+
					"</td><td>"+row.name+
					"</td><td>"+row.entrydate+
					"</td><td>"+row.recentdate+
					"</td><td>"+row.unstorecount+
					"</td><td>"+row.price+
					"</td><td><button class='btn btn-primary btn-sm' onclick='setUnstoreRequest(this)'>출고요청</button></td></tr>";
			}
			debug(ihtml);
			$("#productList").html(ihtml);
			if ($(".table-success").data("flag") == "true") {
				$("table button").attr("disabled", true);
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 자산관리자 출고처리
 * success - 해당자산 영업 출고
 * error - 에러 메시지 알림창
 */
function setUnstoreRequest(takeElement) {
	var requestURL = "rentalassetconfirm.do";
	var sData = JSON.stringify({
		id:$(takeElement).parents("tr").data("item-id"),
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			switch (rData.result) {
			case "success":
				msgBox = new MsgWindow('plain');
				msgBox.setMessage('출고성공!','['+rData.id+']가 정상적으로 렌트출고요청 되었습니다.');
				msgBox.setButton('확인','MsgWindow.hide(this)');
				msgBox.show();
				$("table button").attr("disabled", true);
				$(".table-success").data("flag", "true");
				$(".table-success").addClass("table-danger");
				break;
			case "invalid":
				var msg = new MsgWindow('invalid');
				msg.setMessage('자산상태오류',rData.id+' 가 존재하지 않거나, 변경할 수 없는 상태입니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "violated":
				var msg = new MsgWindow('violated');
				msg.setMessage('정책위반','정책위반이 발생하였습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "network":
				var msg = new MsgWindow('error');
				msg.setMessage('네트워크 오류','네트워크에 문제가 있습니다. 관리자에게 문의하십시오.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 요청별 자산조회
 * success - 요청내용별 자산리스트 생성
 * error - 에러 메시지 알림창
 */
function getRequestAssetList(takeData) {
	if (takeData == selectedHeadSeq) {
		debug("already chosen")
		return;
	}
	selectedHeadSeq = takeData;
	var requestURL = "getrequestassetlist.do";
	var sData = JSON.stringify({
		assetState:takeData
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			var ihtml = "";
			debug(rData.length);
			debug(rData);
			//테이블데이터 생성부분
			for (var i = 0; i < rData.length; i++) {
				var row = rData[i];
				ihtml += "<tr data-item-id='"+ row.id
					+"' data-item-name='"+ row.name
					+"' data-item-entrydate='"+ row.entrydate
					+"' data-item-recentdate='"+ row.recentdate
					+"' data-item-unstorecount='"+ row.unstorecount
					+"' data-item-price='"+ row.price+"'>";
				ihtml += "<td>"+row.id+
					"</td><td>"+row.name+
					"</td><td>"+row.entrydate+
					"</td><td>"+row.recentdate+
					"</td><td>"+row.unstorecount+
					"</td><td>"+row.price+
					"</td><td><button class='btn btn-primary btn-sm' onclick='setUnstore(this)'>출고</button></td></tr>"
			}
			debug(ihtml);
			$("#productList").html(ihtml);
			if ($(".table-success").data("flag") == "true") {
				$("table button").attr("disabled", true);
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 요청별 검색 자산조회
 * success - 요청내용별 자산리스트 생성
 * error - 에러 메시지 알림창
 */
function getrequestsearchassetlist() {
	var requestURL = "getrequestsearchassetlist.do";
	var sData = JSON.stringify({
		assetState:headSeq,
		keyword:$("#keyword").val()
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			var ihtml = "";
			debug(rData.length);
			debug(rData);
			//테이블데이터 생성부분
			for (var i = 0; i < rData.length; i++) {
				var row = rData[i];
				ihtml += "<tr data-item-id='"+ row.id
					+"' data-item-name='"+ row.name
					+"' data-item-entrydate='"+ row.entrydate
					+"' data-item-recentdate='"+ row.recentdate
					+"' data-item-unstorecount='"+ row.unstorecount
					+"' data-item-price='"+ row.price+"'>";
				ihtml += "<td>"+row.id+
					"</td><td>"+row.name+
					"</td><td>"+row.entrydate+
					"</td><td>"+row.recentdate+
					"</td><td>"+row.unstorecount+
					"</td><td>"+row.price+
					"</td><td><button class='btn btn-primary btn-sm' onclick='setUnstore(this)'>출고</button></td></tr>"
			}
			debug(ihtml);
			$("#productList").html(ihtml);
			if ($(".table-success").data("flag") == "true") {
				$("table button").attr("disabled", true);
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 출고관리자 출고처리
 * success - 해당자산 출고처리
 * error - 에러 메시지 알림창
 */
function setUnstore(takeElement) {
	var requestURL = "setunstore.do";
	var sData = JSON.stringify({
		id:$(takeElement).parents("tr").data("item-id"),
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			switch (rData.result) {
			case "success":
				var msg = new MsgWindow('plain');
				msg.setMessage('출고성공',rData.id+' 가 정상적으로 출고 되었습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				$(takeElement).attr("disabled", true);
				$(".table-success").data("flag", "true");
				break;
			case "invalid":
				var msg = new MsgWindow('invalid');
				msg.setMessage('자산상태오류',rData.id+' 가 존재하지 않거나, 변경할 수 없는 상태입니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "violated":
				var msg = new MsgWindow('violated');
				msg.setMessage('정책위반','정책위반이 발생하였습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "network":
				var msg = new MsgWindow('error');
				msg.setMessage('네트워크 오류','네트워크에 문제가 있습니다. 관리자에게 문의하십시오.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 실사계획 불러오기
 * success - 요청 리스트 조회
 * error - 에러 메시지
 */
function getDueDiligencePlanList() {
	var requestURL = "getduediligenceplanlist.do";
	var keyword = $("#keyword").val();
	if (keyword == null || keyword == "") {
		var msg = new MsgWindow('violated');
		msg.setMessage('검색어 정책위반','검색어를 입력하지 않아 조회할 수 없습니다. 확인 후 다시 시도해주십시요.');
		msg.setButton('확인','MsgWindow.hide(this)');
		msg.show();
		return;
	}
	$('#dueDiligenceplanListResult tbody tr').remove();
	var sData = JSON.stringify({
		keyword:keyword
	});
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			for (var index = 0; index < rData.length; index++) {
				var tr = $('<tr />', {onclick: 'setHeadSeqRequest(this)'});
				$(tr).data('key', rData[index].planId);
				$(tr).data('plan-id', rData[index].planId);
				$(tr).data('from-date', rData[index].fromDate);
				$(tr).data('to-date', rData[index].toDate);
				$(tr).data('misc', rData[index].misc);
				$(tr).data('fn-name', 'setDueDiligenceForm()');
				$(tr).append($('<td />', {text: rData[index].planId}));
				$(tr).append($('<td />', {text: rData[index].fromDate}));
				$('#dueDiligenceplanListResult tbody').append(tr);
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 실사계획 등록하기
 * success - 실사계획 등록 후 결과 메시지
 * error - 에러메시지
 */
function newDueDiligencePlan(takeElement) {
	var requestURL = "newduediligenceplan.do";
	var sData = "{";
	$($('form[name=due_diligence]').serializeArray()).each(function(i){
		sData += (i != 0)? ',' : '';
		sData += '"'+this.name+'":"'+this.value+'"';
	})
	sData += "}";
	var errorField = "";
	var jsonObj = JSON.parse(sData);
	
	if (jsonObj.planId == '') {
		errorField = "실사아이디";
	} else if (jsonObj.fromDate == '') {
		errorField = "시작날짜";
	} else if (jsonObj.toDate == '') {
		errorField = "종료날짜";
	} else if (jsonObj.fromDate > jsonObj.toDate) {
		errorField = "올바른 날짜정보"
	}
	
	if (errorField != '') {
		var msg = new MsgWindow('invalid');
		msg.setMessage('데이터 오류',errorField+'가 입력되지 않았습니다. 확인해주세요.');
		msg.setButton('확인','MsgWindow.hide(this)');
		msg.show();
		return;
	}
	
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			switch (rData.result) {
			case "success":
				var msg = new MsgWindow('plain');
				msg.setMessage('실사계획 저장완료','실사계획이 저장 되었습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				$('form[name=due_diligence]').each(function(){
					this.reset();
				})
				break;
			case "invalid":
				var msg = new MsgWindow('invalid');
				msg.setMessage('실사계획 상태오류','실사계획이 존재하지 않거나, 변경할 수 없는 상태입니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "violated":
				var msg = new MsgWindow('violated');
				msg.setMessage('정책위반','정책위반이 발생하였습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "network":
				var msg = new MsgWindow('error');
				msg.setMessage('네트워크 오류','네트워크에 문제가 있습니다. 관리자에게 문의하십시오.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 실사계획 변경하기
 * success - 실사계획 변경 후 결과 메시지
 * error - 에러메시지
 */
function setDueDiligencePlan(takeElement) {
	var requestURL = "setduediligenceplan.do";
	var sData = "{";
	$($('form[name=due_diligence]').serializeArray()).each(function(i){
		sData += (i != 0)? ',' : '';
		sData += '"'+this.name+'":"'+this.value+'"';
	})
	sData += "}";
	var errorField = "";
	var jsonObj = JSON.parse(sData);
	
	if (jsonObj.planId == '') {
		errorField = "실사아이디";
		$('input[name=planId]').focus();
	} else if (jsonObj.fromDate == '') {
		errorField = "시작날짜";
		$('input[name=fromDate]').focus();
	} else if (jsonObj.toDate == '') {
		errorField = "종료날짜";
		$('input[name=toDate]').focus();
	} else if (jsonObj.fromDate > jsonObj.toDate) {
		errorField = "올바른 날짜정보"
		$('input[name=toDate]').focus();
	}
	
	if (errorField != '') {
		var msg = new MsgWindow('invalid');
		msg.setMessage('데이터 오류',errorField+'가 입력되지 않았습니다. 확인해주세요.');
		msg.setButton('확인','MsgWindow.hide(this)');
		msg.show();
		return;
	}
	
	debug(sData);
	debug(requestURL);
	$.ajax({
		type : "POST",
		url : requestURL,
		data : sData,
		dataType : "JSON",
		async: true,
		contentType:'application/json;charset=UTF-8',
		beforeSend: function() {
			$("#content").append(loading.on);
		},
		success : function(rData) {
			switch (rData.result) {
			case "success":
				var msg = new MsgWindow('plain');
				msg.setMessage('실사계획 저장완료','실사계획이 저장 되었습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				$(takeElement).attr('disabled', true);
				$('form[name=due_diligence] input').attr('disabled', true);
				break;
			case "invalid":
				var msg = new MsgWindow('invalid');
				msg.setMessage('실사계획 상태오류','실사계획이 존재하지 않거나, 변경할 수 없는 상태입니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "violated":
				var msg = new MsgWindow('violated');
				msg.setMessage('정책위반','정책위반이 발생하였습니다.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			case "network":
				var msg = new MsgWindow('error');
				msg.setMessage('네트워크 오류','네트워크에 문제가 있습니다. 관리자에게 문의하십시오.');
				msg.setButton('확인','MsgWindow.hide(this)');
				msg.show();
				break;
			}
		},
		error : function() {
			var msg = new MsgWindow('error');
			msg.setMessage('AJax 통신 오류','현재 서버와 연결이 원활하지 않아, 요청한 기능을 수행할 수 없습니다. 잠시후 다시 시도하여 주십시요.');
			msg.setButton('확인','MsgWindow.hide(this)');
			msg.show();
		},
		complete : function() {
			debug('comlete');
			$(".loading").remove();
		}
	});
}