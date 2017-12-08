<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<!-- findId -->
<div style="background-color: white; width: 500px; margin: 0 auto; top: 30%; border: 1px solid #eeeeee; padding: 40px; border-radius: 10px">
	<h2 class="display-5">아이디 찾기</h2>
	<hr>
	<form action="findid.do" method="post">
		<input name="name" type="text" placeholder="성명" class="form-control" pattern="^[가-힣]{2,20}$" required>
		<span>* 회원가입시 성명을 입력해주세요</span>
		<input name="phone" type="text" placeholder="핸드폰번호" class="form-control" pattern="^01[016789]{1}-\d{3,4}-\d{4}$" required>
		<span>* 회원가입시 핸드폰 번호를 입력해주세요</span><br>
		<input type="submit" class="btn btn-primary" style="float: right;" value="아이디 찾기">
	</form>
</div>