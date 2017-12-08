package com.remp.work.model.service;

import java.util.List;
import java.util.Map;

public interface AssetService {

	int setAssetRentalOut(String productId);
	List<Map<String, String>> getAssetList(String itemId);
	List<Map<String, String>> getRentalRequestList(String keyword);
	List<Map<String, String>> getRequestAssetList(String assetState);
	List<Map<String, String>> getRequestSearchAssetList(String assetState, String keyword);
	int setDueDiligencePlan(Map<String, String> jsonToMap);
	List<Map<String, String>> getDueDiligencePlanList(String keyword);
	int newDueDiligencePlan(Map<String, String> jsonToMap);

}
