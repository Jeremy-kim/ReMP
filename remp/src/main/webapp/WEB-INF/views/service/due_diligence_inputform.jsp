<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!-- detail -->
<div>
	<!-- 실사계획등록 화면 -->
	<form name="due_diligence">
		<div class="item_wrapper">
			<div class="left-w20 nameTag"><span>실사아이디</span></div>
			<div class="left-w80 "><input type="text" placeholder="ex) p2017-01" name="planId" class="inputBox"></div>
		</div>
		<div class="item_wrapper">
			<div class="left-w20 nameTag"><span>실사기간</span></div>
			<div><span> </span></div>
			<div class="left-w80">
				<input type="date" id="fromDate" name="fromDate" class="inputBox" onchange="setToDate(this.value)">
				<span > - </span>
				<input type="date" id="toDate" name="toDate" class="inputBox">
				<input type="button" data-add-date="0000-00-01" value="1일 추가" class="btn btn-info btn-sm" onclick="addToDate(this)">
				<input type="button" data-add-date="0000-00-06" value="1주일 추가" class="btn btn-info btn-sm" onclick="addToDate(this)">
				<input type="button" value="초기화" onclick="initDate()" class="btn btn-info btn-sm">
			</div>
		</div>
		<div class="item_wrapper">
			<div class="left-w20 nameTag"><span>특이사항</span></div>
			<div class="left-w80"><textarea rows="10" name="misc" style="width: 100%;"></textarea></div>
		</div>
	</form>
	<div class="item_wrapper">
		<button class="btn btn-primary right" onclick="return newDueDiligencePlan(this)">등록</button>
	</div>
</div>