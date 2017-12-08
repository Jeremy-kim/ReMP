package com.remp.work.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ExaminationDao {
	private static ExaminationDao instance;
	@Autowired
	private FactoryDao factoryDao;

	private ExaminationDao() {
	}

	private ExaminationDao(FactoryDao factoryDao) {
		this.factoryDao = factoryDao;
	}

	public static ExaminationDao getInstance() {
		return getInstance(null);
	}

	public static ExaminationDao getInstance(FactoryDao factoryDao) {
		if (instance == null) {
			instance = new ExaminationDao(factoryDao);
		}
		return instance;
	}

	public List<Map<String, String>> selectAssetList(String assetState, String itemId) {
		List<Map<String, String>> returnValue = new ArrayList<>();
		/*
		 * Connection con = null; PreparedStatement pstmt = null; ResultSet rs = null;
		 * String sql = "select * from 테이블명 where 상태값 = ? and 품목코드 = ?";
		 * 
		 * try { con = factoryDao.getConnection(); pstmt = con.prepareStatement(sql);
		 * pstmt.setString(1, assetState); pstmt.setString(2, itemId); rs =
		 * pstmt.executeQuery(); while (rs.next()) { Map<String, String> item = new
		 * HashMap<>(); item.put("id", rs.getString("id")); item.put("name",
		 * rs.getString("name")); item.put("entrydate", rs.getString("entrydate"));
		 * item.put("recentdate", rs.getString("recentdate")); item.put("unstorecount",
		 * rs.getString("unstorecount")); item.put("price", rs.getString("price"));
		 * returnValue.add(item); }
		 * 
		 * } catch (SQLException e) { e.printStackTrace(); } finally { try {
		 * factoryDao.close(pstmt, con); } catch (SQLException e) { e.printStackTrace();
		 * } }
		 */
		for (int i = 0; i < 9; i++) {
			Map<String, String> item = new HashMap<>();
			item.put("id", itemId + i);
			item.put("name", "믹서기" + i);
			item.put("entrydate", "2017-01-1" + i);
			item.put("recentdate", "2016-01-1" + i);
			item.put("unstorecount", 2 * i + "");
			item.put("price", "75000");
			returnValue.add(item);
		}
		return returnValue;
	}

	public int updateDueDiligencePlan(Map<String, String> info) {
		int returnValue = -1;
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "update EXAMINATION set EX_START = ?, EX_END = ?, EX_CONTENT = ? where EX_ID = ?";

		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, info.get("fromDate"));
			pstmt.setString(2, info.get("toDate"));
			pstmt.setString(3, info.get("misc"));
			pstmt.setString(4, info.get("planId"));
			
			System.out.println(factoryDao);
			System.out.println(con);
			System.out.println(pstmt);
			System.out.println(sql);
			
			returnValue = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt);
		}
		return returnValue;
	}

	public List<Map<String, String>> selectDueDiligencePlanList(String keyword) {
		System.out.println(keyword);
		List<Map<String, String>> returnValue = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select b.ex_id, b.ex_start, b.ex_end, b.ex_content from (select ex_id, ex_id||' '||ex_start||' '||ex_end||' '||ex_content search from examination) a, examination b where regexp_like(search, ?) and a.ex_id = b.ex_id ORDER BY b.ex_start desc, b.ex_id";

		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, keyword);
			rs = pstmt.executeQuery();
			returnValue = new ArrayList<>();
			while (rs.next()) {
				Map<String, String> map = new HashMap<>();
				map.put("planId", rs.getString(1));
				map.put("fromDate", rs.getString(2));
				map.put("toDate", rs.getString(3));
				map.put("misc", rs.getString(4));
				returnValue.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt, rs);
		}
		return returnValue;
	}

	public int insertDueDiligencePlan(Map<String, String> jsonToMap) {
		int returnValue = -1;
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "insert into examination(EX_ID, EX_START, EX_END, EX_CONTENT) values(?, ?, ?, ?)";

		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, jsonToMap.get("planId"));
			pstmt.setString(2, jsonToMap.get("fromDate"));
			pstmt.setString(3, jsonToMap.get("toDate"));
			pstmt.setString(4, jsonToMap.get("misc"));
			returnValue = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt);
		}
		return returnValue;
	}

}
