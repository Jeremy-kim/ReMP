<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div style="margin: 0 auto; width: 600px;">
	<input type="hidden" name="password">
	<!-- 아이디 -->
	<div class="item_wrapper">
		<div>
			<label>아이디</label>
		</div>
		<div>
			<input class="form-control"name="id" type="email" pattern="^[a-zA-Z0-9]{4,20}@([a-z0-9]+\.)+[a-z0-9]{2,4}$" placeholder="아이디" disabled>
		</div>
	</div>
	
	<!-- 기존 비밀번호 -->
	<div class="item_wrapper">
		<div>
			<label>기존 비밀번호</label>
		</div>
		<div>
			<div class="left-w80"><input class="form-control" type="pw" pattern="[0-9a-zA-z!@#$%^&*]{8,30}$" placeholder="비밀번호" value="**********" disabled></div>
			<input class="btn btn-success left-w20" type="button" onclick="$('#newpw').slideToggle('fast')" value="변경창 열기">
		</div>
	</div>
	
	<!-- 변경될 비밀번호-->
	<form onsubmit="userChangeInvoke(); return false;">
		<div id="newpw" class="item_wrapper" style="display: none;">
			<div>
				<label>* 변경될 비밀번호</label>
			</div>
			<div>
				<div class="left-w80"><input class="form-control" name="new_pw" type="password" pattern="[0-9a-zA-z!@#$%^&*]{8,30}$" placeholder="변경할 비밀번호" maxlength="30" required></div>
				<input class="btn btn-primary left-w20" type="button" onclick="return userChangeinvoke()" value="변경하기">
			</div>
		</div>
	</form>
	
	<!-- 성명 -->
	<div class="item_wrapper">
		<div>
			<label>성명</label>
		</div>
		<div>
			<input class="form-control" name="name" disabled>
		</div>
	</div>
	
	<!-- 생년월일 -->
	<div class="item_wrapper">
		<div>
			<label>생년월일</label>
		</div>
		<div>
			<input class="form-control" type="date" name="birth" disabled>
		</div>
	</div>
	
	<!-- 기존 핸드폰 번호 -->
	<div class="item_wrapper">
		<div>
			<label>기존 핸드폰 번호</label>
		</div>
		<div>
			<div class="left-w80"><input class="form-control" name="mobile" type="tel" pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}" placeholder="010-0000-0000" disabled></div>
			<input class="btn btn-success left-w20" type="button" onclick="$('#new_mobile').slideToggle('fast')" value="변경창 열기">
		</div>
	</div>
	
	<!-- 바뀔 전화번호 -->
	<form>
		<div id="new_mobile" class="item_wrapper" style="display: none;">
			<div>
				<label>* 변경된 핸드폰 번호</label>
			</div>
			<div>
				<div class="left-w80"><input class="form-control" name="new_mobile" type="tel" pattern="^01[016789]{1}-\d{3,4}-\w{4}$" title="'-'를 포함해주세요." placeholder="010-0000-0000"></div>
				<input class="btn btn-primary left-w20" type="button" onclick="return setUserMobile($('input[name=new_mobile]'))" value="변경하기">
			</div>
		</div>
	</form>
	
	<!-- 기존 주소 -->
	<div class="item_wrapper">
		<div>
			<label>기존 주소</label>
		</div>
		<div>
			<div class="left-w20"><input class="form-control" name="post" type="text" placeholder="우편번호" disabled></div>
		</div>
		<div>
			<input class="form-control" id="tb_addr" name="addr" type="text" placeholder="주소" disabled>
		</div>
		<div>
			<input class="form-control" id="tb_addD" name="addr_d" type="text" placeholder="상세주소" disabled>
		</div>
		<input class="btn btn-success left-w20" type="button" onclick="$('#new_address').slideToggle('fast')" value="변경창 열기">
	</div>
	
	<!-- 바뀔 주소 -->
	<form>
		<div id="new_address" class="item_wrapper" style="display: none;">
			<div>
				<label>* 변경된 주소</label>
			</div>
			<div>
				<div class="left-w20"><input class="form-control" name="new_post" type="text" placeholder="우편번호" readonly></div>
				<div class="left-w20"><input style="width: 100%" class="btn btn-success" type="button" value="우편번호" onclick="getPost('#tb_post', '#tb_addr')"></div>
			</div>
			<div>
				<input class="form-control" id="tb_addr" name="new_addr" type="text" placeholder="주소" readonly>
			</div>
			<div>
				<input class="form-control" id="tb_addD" name="new_addr_d" type="text" placeholder="상세주소" onfocus="getAddressCheck()">
			</div>
			<input class="btn btn-primary left-w20" type="button" onclick="" value="변경하기">
		</div>
	</form>
	
	<!-- 기존 카드번호 -->
	<div class="item_wrapper">
		<div>
			<label>기존 카드번호</label>
		</div>
		<div>
			<div class="left-w20"><input type="text" name="c_company" class="form-control" disabled></div>
			<div class="left"><span>　　</span></div>
			<div class="left-w10"><input class="form-control" name="card1" placeholder="0000" type="text" disabled></div>
			<div class="left"><span>　-　</span></div>
			<div class="left-w10"><input class="form-control" name="card2" placeholder="0000" type="text" disabled></div>
			<div class="left"><span>　-　</span></div>
			<div class="left-w10"><input class="form-control" name="card3" placeholder="0000" type="text" disabled></div>
			<div class="left"><span>　-　</span></div>
			<div class="left-w10"><input class="form-control" name="card4" placeholder="0000" type="text" disabled></div>
			<input class="btn btn-success left-w20" type="button" onclick="$('#new_card').slideToggle('fast')" value="변경창 열기">
		</div>
	</div>
	
	<!-- 변경된 카드번호 -->
	<form>
		<div id="new_card" class="item_wrapper" style="display: none;">
			<div>
				<label>* 변경된 카드번호</label>
			</div>
			<div>
				<div class="left-w20">
					<select name="new_c_company" class="form-control">
						<option value="">=카드선택=</option>
						<option value="현대카드">현대카드</option>
						<option value="KB국민카드">KB국민카드</option>
						<option value="신한카드">신한카드</option>
						<option value="삼성카드">삼성카드</option>
						<option value="롯데카드">롯데카드</option>
						<option value="우리카드">우리카드</option>
						<option value="하나카드">하나카드</option>
						<option value="비씨카드">비씨카드</option>
						<option value="NH농협카드">NH농협카드</option>
						<option value="씨티카드">씨티카드</option>
						<option value="카카오뱅크">카카오뱅크</option>
					</select>
				</div>
				<div class="left"><span>　　</span></div>
				<div class="left-w10"><input class="form-control" name="new_card1" placeholder="0000" type="text" maxlength="4" pattern="^\d{4}$"></div>
				<div class="left"><span>　-　</span></div>
				<div class="left-w10"><input class="form-control" name="new_card2" placeholder="0000" type="text" maxlength="4" pattern="^\d{4}$"></div>
				<div class="left"><span>　-　</span></div>
				<div class="left-w10"><input class="form-control" name="new_card3" placeholder="0000" type="text" maxlength="4" pattern="^\d{4}$"></div>
				<div class="left"><span>　-　</span></div>
				<div class="left-w10"><input class="form-control" name="new_card4" placeholder="0000" type="text" maxlength="4" pattern="^\d{4}$}"></div>
				<input class="btn btn-primary left-w20" type="button" onclick="" value="변경하기">
			</div>
		</div>
	</form>
	
	<!-- 기존 계좌번호 -->
	<div class="item_wrapper">
		<div>
			<label>기존 계좌번호</label>
		</div>
		<div>
			<div class="left-w20"><input type="text" name="a_company" class="form-control" disabled></div>
			<div class="left-w60"><input class="form-control" name="account" type="text" placeholder="계좌번호" pattern="[0-9-]{11,15}" disabled></div>
			<input class="btn btn-success left-w20" type="button" onclick="$('#new_account').slideToggle('fast')" value="변경창 열기">
		</div>
	</div>
	
	<!-- 변경된 계좌번호 -->
	<div id="new_account" class="item_wrapper" style="display: none;">
		<div>
			<label>* 변경된 계좌번호</label>
		</div>
		<div>
			<div class="left-w20">
				<select name="a_company" class="form-control">
					<option value="">은행을 선택해주세요</option>
					<option value="농협">농협</option>
					<option value="우리은행">우리은행</option>
					<option value="신한은행">신한은행</option>
					<option value="국민은행">국민은행</option>
					<option value="하나은행">하나은행</option>
					<option value="외환은행">외환은행</option>
					<option value="씨티은행">씨티은행</option>
					<option value="기업은행">기업은행</option>
					<option value="우체국">우체국</option>
					<option value="부산은행">부산은행</option>
					<option value="SC은행">SC은행</option>
				</select>
			</div>
			<div class="left-w60"><input class="form-control" name="new_account" type="text" placeholder="계좌번호" pattern="[0-9-]{11,15}"></div>
			<input class="btn btn-primary left-w20" type="button" onclick="" value="변경하기">
		</div>
	</div>
</div>