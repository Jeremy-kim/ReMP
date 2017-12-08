package com.remp.work.control;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class DefaultControl extends ControllerAdapter {
	
	@Override
	public ModelAndView home() {
		return new ModelAndView("home");
	}

	@RequestMapping("gofindid.do")
	public ModelAndView gofindId() {
		return  getPlainRedPage("findid.jsp");
	}

	@RequestMapping(value="findid.do", method=RequestMethod.POST)
	public ModelAndView findId(@RequestParam HashMap<String, String> memberinfo) {
		ModelAndView returnValue = new ModelAndView();
		String customerId = customerService.getCustomerId(memberinfo);
		returnValue.addObject("customerId", customerId);
		return getPlainRedPage(returnValue, "findidresult.jsp");
	}
	
	@RequestMapping("gouserchange.do")
	public ModelAndView goUserChange() {
		return getPlainRedPage("user_change.jsp");
	}

	@RequestMapping("gologin.do")
	public ModelAndView goLogin(String customerId) {
		ModelAndView returnValue = new ModelAndView();
		returnValue.addObject("customerId", customerId);
		return getPlainPage(returnValue, "login.jsp");
	}
	
	@RequestMapping("gorentalasset.do")
	public ModelAndView goRentalAsset() {
		return getHeadDetailPage("rental_request.jsp", "rental_asset_info.jsp");
	}
	
	@RequestMapping(value="getrentalrequest.do", method=RequestMethod.POST)
	public @ResponseBody List<Map<String, String>> getRentalRequestList(@RequestBody String jsonObjectString) {
		return assetService.getRentalRequestList(jsonToMap(jsonObjectString).get("keyword"));
	}
	
	@RequestMapping(value="getassetlist.do", method=RequestMethod.POST)
	public @ResponseBody List<Map<String, String>> getAssetList(@RequestBody String jsonObjectString) {
		return assetService.getAssetList(jsonToMap(jsonObjectString).get("productId"));
	}
	
	@RequestMapping("gounstoreconfirm.do")
	public ModelAndView goUnstoreConfirm() {
		return getHeadDetailPage("out_request.jsp", "out_asset_info.jsp");
	}

	@RequestMapping(value="getrequestassetlist.do", method=RequestMethod.POST)
	public @ResponseBody List<Map<String, String>> getRequestAssetList(@RequestBody String jsonObjectString) {
		return assetService.getRequestAssetList(jsonToMap(jsonObjectString).get("assetState"));
	}
	
	@RequestMapping(value="rentalassetconfirm.do", method=RequestMethod.POST)
	public @ResponseBody Map<String, String> rentalAssetConfirm(@RequestBody String jsonObjectString) {
		int result = assetService.setAssetRentalOut(jsonToMap(jsonObjectString).get("id"));
		Map<String, String> returnValue = isUpdatedToMap(result);
		returnValue.put("id", jsonToMap(jsonObjectString).get("id"));
		return returnValue;
	}
	
	@RequestMapping(value="setunstore.do", method=RequestMethod.POST)
	public @ResponseBody Map<String, String> setUnstore(@RequestBody String jsonObjectString) {
		String id = jsonToMap(jsonObjectString).get("id");
		Map<String, String> returnValue = isUpdatedToMap(assetService.setAssetRentalOut(id));
		returnValue.put("id", id);
		return returnValue;
	}
	
	@RequestMapping(value="getrequestsearchassetlist.do", method=RequestMethod.POST)
	public @ResponseBody List<Map<String, String>> getRequestSearchAssetList(@RequestBody String jsonObjectString) {
		Map<String, String> json = jsonToMap(jsonObjectString);
		return assetService.getRequestSearchAssetList(json.get("assetState"), json.get("keyword"));
	}
	
	@RequestMapping("goduediligence.do")
	public ModelAndView goDueDiligence() {
		return getPlainPage("due_diligence_inputform.jsp");
	}
	
	@RequestMapping("gochangeduediligence.do")
	public ModelAndView goChangeDueDiligence() {
		return getHeadDetailPage("due_diligence_list.jsp", "due_diligence_form.jsp");
	}
	
	@RequestMapping("goduediligenceresult.do")
	public ModelAndView goDueDiligenceResult() {
		return getHeadDetailPage("due_diligence_list.jsp", "detail.jsp");
	}
	
	@RequestMapping("gochangeduediligenceresult.do")
	public ModelAndView goChangeDueDiligenceResult() {
		return getHeadDetailPage("due_diligence_list.jsp", "detail.jsp");
	}
	
	@RequestMapping("newduediligenceplan.do")
	public @ResponseBody Map<String, String> newDueDiligencePlan(@RequestBody String jsonObjectString) {
		int result = assetService.newDueDiligencePlan(jsonToMap(jsonObjectString));
		return isUpdatedToMap(result);
	}
	
	@RequestMapping("setduediligenceplan.do")
	public @ResponseBody Map<String, String> setDueDiligencePlan(@RequestBody String jsonObjectString) {
		int result = assetService.setDueDiligencePlan(jsonToMap(jsonObjectString));
		return isUpdatedToMap(result);
	}
	
	@RequestMapping("getduediligenceplanlist.do")
	public @ResponseBody List<Map<String, String>> getDueDiligencePlanList(@RequestBody String jsonObjectString) {
		System.out.println(jsonObjectString);
		return assetService.getDueDiligencePlanList(jsonToMap(jsonObjectString).get("keyword").replaceAll(" ", "|"));
	}
	
	public Map<String, String> jsonToMap(String jsonObjectString) {
		Map<String, String> returnValue = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			returnValue = om.readValue(jsonObjectString.getBytes(), HashMap.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return returnValue;
	}
	
	public Map<String, Object> jsonToOMap(String jsonObjectString) {
		Map<String, Object> returnValue = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			returnValue = om.readValue(jsonObjectString.getBytes(), HashMap.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return returnValue;
	}
}
