<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<!-- 렌탈 요청조회 헤드 -->
<!-- 결과값 리스트 -->
<div style="width: 100%; height: 80%; overflow: scroll;">
	<table id="rentalRequestResult" class="table table-striped table-hover table-bordered table-sm cursor is-line">
		<thead class="thead-dark">
			<tr><th>No</th><th>자산상태</th></tr>
		<thead>
		<tbody>
			<tr data-fn-name="getRequestAssetList" data-key="re_output" onclick="setHeadSeqRequest(this)"><td>1</td><td>렌탈출고요청</td></tr>
			<tr data-fn-name="getRequestAssetList" data-key="re_exoutput" onclick="setHeadSeqRequest(this)"><td>2</td><td>방출수리출고요청</td></tr>
			<tr data-fn-name="getRequestAssetList" data-key="re_disuse" onclick="setHeadSeqRequest(this)"><td>3</td><td>폐기출고요청</td></tr>
		</tbody>
	</table>
</div>