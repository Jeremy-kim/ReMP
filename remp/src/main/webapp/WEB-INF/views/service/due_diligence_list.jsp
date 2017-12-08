<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<!-- 실사계획 조회헤드 -->
<!-- 검색어 폼 -->
<div class="item_wrapper">
	<div class="left-w80">
		<input id="keyword" type="text" class="form-control">
	</div>
	<div class="left-w20">
		<button class="btn btn-primary" onclick="getDueDiligencePlanList()">조회</button>
	</div>
</div>

<!-- 결과값 리스트 -->
<div style="width: 100%; height: 80%; overflow: scroll;">
	<table id="dueDiligenceplanListResult" class="table table-striped table-hover table-bordered table-sm cursor is-line">
		<thead class="thead-dark">
			<tr><th>실사계획ID</th><th>시작일</th></tr>
		<thead>
		<tbody></tbody>
	</table>
</div>