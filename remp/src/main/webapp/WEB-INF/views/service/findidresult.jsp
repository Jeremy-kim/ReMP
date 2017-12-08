<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!-- findId -->
<div class="jumbotron" style="width: 80%; margin: 0 auto;">
	<h1 class="display-3">아이디 찾기 결과</h1>
	<br>
	<%
		String id = request.getAttribute("customerId").toString();
		if (id == null || id.trim().isEmpty()) {
	%>
		<p class="lead">고객님의 정보를 확인할 수 없습니다. 다시 확인 후 시도해주세요</p>
	<%	} else { %>
		<p class="lead">요청하신 고객님의 아이디는 <%= id %> 입니다</p>
	<%	} %>
	<hr class="my-4">
	<br>
	<p class="lead">
		<% if (id == null || id.trim().isEmpty()) { %>
		<a class="btn btn-primary btn-lg" href="gofindid.do">아이디 찾기</a>
		<% } %>
		<a class="btn btn-primary btn-lg" href="gologin.do">로그인 하기</a>
		<a class="btn btn-primary btn-lg" href="gofindpw.do">비밀번호 찾기</a>
	</p>
</div>