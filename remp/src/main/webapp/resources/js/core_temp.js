/*
 * ReMP에서 사용될 기본 자바스크립트 태그
 * 작성자 : 김재림
 * 버전 v 1.0
 */

/* 서브메뉴 열기 */
var operationMod = "debug";

function getNavSubMenu(targetElement) {
	var targetId = "#" + $(targetElement).data("module");
	
	if ($(targetId).css("display") == "flex") {
		$(targetId).slideUp('fast');
		return;
	}
	$("#rental").hide(0);	
	$("#asset").hide(0);
	$("#EIS").hide(0);
	$("#member").hide(0);
	$(targetId).slideDown('fast');
}

/* ajax 관련 설정 */
var loading = {
	on: $('<div />', {class: 'loading'}),
}

/* head_detail에서 head 일련번호 세팅하기 */
var headSeq = null;
var selectedHeadSeq = null;

function setHeadSeqRequest(takeElement) {
	var callbackfunction = $(takeElement).data("fn-name"); //data-fn-name="?"
	headSeq = $(takeElement).data("key"); //data-key="?"
	debug(headSeq);
	$(takeElement).parents("table")
		.children()
		.children(".table-success")
		.removeClass("table-success");
	$(takeElement).addClass("table-success");
	debug(callbackfunction+"(headSeq)");
	eval(callbackfunction+"(headSeq)");
}

/* head_detail에서 head 일련번호 가져오기 */
function getHeadSeqRequest() {
	var returnValue = headSeq;
	headSeq = null;
	return returnValue;
}

/* 테스트 */
function getTestList(takeElement){
	var requestURL = "gettestlist.do";
	var sData = JSON.stringify({
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
				ihtml += "<tr data-fn-name='getassetlist' data-key='"+rData[i].reqId+"' onclick='setHeadSeqRequest(this)'>";
				ihtml += "<td>"+rData[i].reqId+"</td><td>"+rData[i].reqTransDate+"</td>";
				ihtml += "</tr>";
			}
			debug(ihtml);
			$("#rentalRequestResult tbody").html(ihtml);
			$('.loading').remove();
		},
		error : function() {
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 렌탈요청헤드 조회 */
function getTestList(key) {
	if (key == selectedHeadSeq) {
		debug("already chosen")
		return;
	}
	selectedHeadSeq = key;
	var requestURL = "gettestlist.do";
	var sData = JSON.stringify({
		key:key
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
				ihtml += "<tr data-id='"+ row.id
					+"' data-name='"+ row.name
					+"' data-date='"+ row.entrydate+"'>";
				ihtml += "<td>"+row.id+
					"</td><td>"+row.name+
					"</td><td>"+row.date+"</td></tr>";
			}
			debug(ihtml);
			$("#productList").html(ihtml);
			if ($(".table-success").data("flag") == "true") {
				$("table button").attr("disabled", true);
			}
		},
		error : function() {
			alert("검색실패!");
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 품목조회 */
function getOutWaitAssetList(id) {
	var takeData = id;
	if (takeData == selectedHeadSeq) {
		debug("already chosen")
		return;
	}
	selectedHeadSeq = takeData;
	var requestURL = "getoutwaitassetlist.do";
	var sData = JSON.stringify({
		id:takeData
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
					"</td><td><button class='btn btn-primary btn-sm' onclick='doUnstoreRequest(this)'>출고</button></td></tr>";
			}
			debug(ihtml);
			$("#productList").html(ihtml);
			if ($(".table-success").data("flag") == "true") {
				$("table button").attr("disabled", true);
			}
		},
		error : function() {
			alert("검색실패!");
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 자산관리자 출고처리 */
function doUnstoreRequest(takeElement) {
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
			alert("[System Message] 출고성공\n["+rData.id+"]가 정상적으로 렌트출고 되었습니다.");
			$("table button").attr("disabled", true);
			$(".table-success").data("flag", "true");
			$(".table-success").addClass("table-danger");
		},
		error : function() {
			alert("출고실패!");
		},
		complete : function() {
			$(".loading").remove();
		}
	});
}

/* 로그처리 */
function debug(log) {
	if (operationMod == "debug") {
		console.log("[Debug] Message : " + log);
	}
}