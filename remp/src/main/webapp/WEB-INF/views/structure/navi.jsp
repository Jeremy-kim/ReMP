<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page session="false" %>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<a class="navbar-brand" href="main.do">ReMP</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse"
		data-target="#navbarColor02" aria-controls="navbarColor02"
		aria-expanded="false" aria-label="Toggle navigation" style="">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarColor02">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<a class="nav-link" href="#">Home
					<span class="sr-only">(current)</span>
				</a>
			</li>
			<li class="nav-item"><a class="nav-link" data-module="member" href="javascript:void(0)" onclick="getNavSubMenu(this)">회원관리</a></li>
			<li class="nav-item"><a class="nav-link" data-module="rental" href="javascript:void(0)" onclick="getNavSubMenu(this)">렌탈관리</a></li>
			<li class="nav-item"><a class="nav-link" data-module="asset" href="javascript:void(0)" onclick="getNavSubMenu(this)">자산괸리</a></li>
			<li class="nav-item"><a class="nav-link" data-module="EIS" href="javascript:void(0)" onclick="getNavSubMenu(this)">EIS</a></li>
		</ul>
	</div>
</nav>

<!-- 회원관리 -->
<div id="member" class="sub-navi" style="display: none;" onmouseleave="setNavSubMenu(this)">
	<ul class="navi-type">
		<li class="left"><a class="sub-navi-link" href="#">item1</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item2</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item3</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item4</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item5</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item6</a></li>
	</ul>
</div>

<!-- 렌탈관리 -->
<div id="rental" class="sub-navi" style="display: none;" onmouseleave="setNavSubMenu(this)">
	<ul class="navi-type">
		<li class="left"><a class="sub-navi-link" href="#">item1</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item2</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item3</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item4</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item5</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item6</a></li>
	</ul>
</div>

<!-- 자산관리 -->
<div id="asset" class="sub-navi" style="display: none;" onmouseleave="setNavSubMenu(this)">
	<ul class="navi-type">
		<li class="left"><a class="sub-navi-link" href="gorentalasset.do">렌탈자산확정</a></li>
		<li class="left"><a class="sub-navi-link" href="gounstoreconfirm.do">출고관리</a></li>
		<li class="left"><a class="sub-navi-link" href="goduediligence.do">실사계획등록</a></li>
		<li class="left"><a class="sub-navi-link" href="gochangeduediligence.do">실사계획조회·변경</a></li>
		<li class="left"><a class="sub-navi-link" href="goduediligenceresult.do">실사계획결과등록</a></li>
		<li class="left"><a class="sub-navi-link" href="gochangeduediligenceresult.do">실사계획결과조회·변경</a></li>
	</ul>
</div>

<!-- EIS -->
<div id="EIS" class="sub-navi" style="display: none;" onmouseleave="setNavSubMenu(this)">
	<ul class="navi-type">
		<li class="left"><a class="sub-navi-link" href="#">item1</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item2</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item3</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item4</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item5</a></li>
		<li class="left"><a class="sub-navi-link" href="#">item6</a></li>
	</ul>
</div>

<!-- 고객 메뉴 -->
<div id="EIS" class="sub-navi" style="display: none;" onmouseleave="setNavSubMenu(this)">
	<ul class="navi-type">
		<li class="left"><a class="sub-navi-link" href="gofindid.do">아이디 찾기</a></li>
		<li class="left"><a class="sub-navi-link" href="gouserchange.do">회원정보변경</a></li>
	</ul>
</div>