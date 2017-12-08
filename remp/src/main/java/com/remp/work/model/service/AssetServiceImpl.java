package com.remp.work.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remp.work.model.dao.AssetDao;
import com.remp.work.model.dao.BuyDao;
import com.remp.work.model.dao.ExaminationDao;

@Service("assetService")
public class AssetServiceImpl implements AssetService {
	@Autowired
	private AssetDao assetDao; 
	@Autowired
	private BuyDao buyDao;
	@Autowired
	private ExaminationDao examinationDao;
	
	public AssetServiceImpl() {
		System.out.println("AssetServiceImpl Loaded");
	}
	
	@Override
	public int setAssetRentalOut(String assetId) {
		return assetDao.updateAssetState("re_output", assetId);
	}

	@Override
	public List<Map<String, String>> getAssetList(String itemId) {
		return assetDao.selectAssetList("do_product", itemId);
	}

	@Override
	public List<Map<String, String>> getRentalRequestList(String keyword) {
		//렌탈요청 미완료건 조회
		System.out.println("자산상태값 추가 필요");
		return buyDao.selectRentalRequestList(keyword);
	}

	@Override
	public List<Map<String, String>> getRequestAssetList(String assetState) {
		return assetDao.selectRequestAssetList(assetState);
	}

	@Override
	public List<Map<String, String>> getRequestSearchAssetList(String assetState, String keyword) {
		return assetDao.selectRequestSearchAssetList(assetState, keyword);
	}

	@Override
	public int setDueDiligencePlan(Map<String, String> info) {
		return examinationDao.updateDueDiligencePlan(info);
	}

	@Override
	public List<Map<String, String>> getDueDiligencePlanList(String keyword) {
		return examinationDao.selectDueDiligencePlanList(keyword);
	}

	@Override
	public int newDueDiligencePlan(Map<String, String> jsonToMap) {
		return examinationDao.insertDueDiligencePlan(jsonToMap);
	}

}
