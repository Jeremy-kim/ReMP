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
public class AssetDao {
	private static AssetDao instance;
	@Autowired
	private FactoryDao factoryDao;
	
	private AssetDao() {}
	
	private AssetDao(FactoryDao factoryDao) {
		this.factoryDao = factoryDao;
	}
	
	public static AssetDao getInstance() {
		return getInstance(null);
	}
	
	public static AssetDao getInstance(FactoryDao factoryDao) {
		if (instance == null) {
			instance = new AssetDao(factoryDao);
		}
		return instance;
	}
	
	/**
	 * 자산상태 변경 탬플릿 쿼리
	 * @param assetId 렌탈출고할 자산
	 * @return 
	 */
	public int updateAssetState(String assetState, String assetId) {
		int returnValue = -1;
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql ="update product set pr_state = ? where pr_id = ?";
		
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, assetState);
			pstmt.setString(2, assetId);
			returnValue = pstmt.executeUpdate();	
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt);
		}
		return returnValue;
	}

	public List<Map<String, String>> selectAssetList(String assetState, String itemId) {
		List<Map<String, String>> returnValue = new ArrayList<>();
		/*Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select * from 테이블명 where 상태값 = ? and 품목코드 = ?";
		
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, assetState);
			pstmt.setString(2, itemId);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, String> item = new HashMap<>();
				item.put("id", rs.getString("id"));
				item.put("name", rs.getString("name"));
				item.put("entrydate", rs.getString("entrydate"));
				item.put("recentdate", rs.getString("recentdate"));
				item.put("unstorecount", rs.getString("unstorecount"));
				item.put("price", rs.getString("price"));
				returnValue.add(item);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				factoryDao.close(pstmt, con);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}*/
		for (int i = 0; i < 9; i++) {
			Map<String, String> item = new HashMap<>();
			item.put("id", itemId+i);
			item.put("name", "믹서기"+i);
			item.put("entrydate", "2017-01-1"+i);
			item.put("recentdate", "2016-01-1"+i);
			item.put("unstorecount", 2 * i + "");
			item.put("price", "75000");
			returnValue.add(item);
		}
		return returnValue;
	}

	public List<Map<String, String>> selectRequestAssetList(String assetState) {
		List<Map<String, String>> returnValue = new ArrayList<>();
		/*Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select * from 테이블명 where 상태값 = ?;
		
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, assetState);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, String> item = new HashMap<>();
				item.put("id", rs.getString("id"));
				item.put("name", rs.getString("name"));
				item.put("entrydate", rs.getString("entrydate"));
				item.put("recentdate", rs.getString("recentdate"));
				item.put("unstorecount", rs.getString("unstorecount"));
				item.put("price", rs.getString("price"));
				returnValue.add(item);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				factoryDao.close(pstmt, con);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}*/
		for (int i = 1; i < 30; i++) {
			Map<String, String> item = new HashMap<>();
			item.put("id", "A0132456"+i);
			item.put("name", assetState + i);
			if (i > 10) {
				item.put("entrydate", "2017-01-0"+i);
				item.put("recentdate", "2016-01-0"+i);
			} else if (i >= 31) {
				item.put("entrydate", "2017-01-"+i);
				item.put("recentdate", "2016-01-"+i);
			} else {
				item.put("entrydate", "2017-02-"+(i-31));
				item.put("recentdate", "2016-02-"+(i-31));
			}
			item.put("unstorecount", 2 * i + "");
			item.put("price", "2,500,000");
			returnValue.add(item);
		}
		return returnValue;
	}

	public List<Map<String, String>> selectRequestSearchAssetList(String assetState, String keyword) {
		List<Map<String, String>> returnValue = new ArrayList<>();
		/*Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		*/
		String sql = 
				"select b.자산id id, b.품목이름 name, b.구매일 entrydate, b.상태변경일 recentdate, b.출고횟수 unstorecount, b.가격 price "
				+ "from ("
					+ "select 자산 id, 자산||' '||품목이름||' '||구매일||' '||상태변경일||' '||출고횟수||' '||가격 search_field "
					+ "from 테이블 where 자산상태 = ?"
				+ ") a, 테이블 b "
				+ "where a.search_field regex_like(?) and a.id = b.id order by recentdate";
		System.out.println("sql = "+sql);
		/*
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, assetState);
			pstmt.setString(2, itemId);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, String> item = new HashMap<>();
				item.put("id", rs.getString("id"));
				item.put("name", rs.getString("name"));
				item.put("entrydate", rs.getString("entrydate"));
				item.put("recentdate", rs.getString("recentdate"));
				item.put("unstorecount", rs.getString("unstorecount"));
				item.put("price", rs.getString("price"));
				returnValue.add(item);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				factoryDao.close(pstmt, con);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}*/
		for (int i = 0; i < 80; ++i) {
			Map<String, String> item = new HashMap<>();
			item.put("id", "A0132456"+i);
			item.put("name", "정수기" + i);
			if (i > 10) {
				item.put("entrydate", "2017-01-0"+i);
				item.put("recentdate", "2016-01-0"+i);
			} else if (i >= 31) {
				item.put("entrydate", "2017-01-"+i);
				item.put("recentdate", "2016-01-"+i);
			} else {
				item.put("entrydate", "2017-02-"+(i-31));
				item.put("recentdate", "2016-02-"+(i-31));
			}
			item.put("unstorecount", 2 * i + "");
			item.put("price", "2,500,000");
			returnValue.add(item);
		}
		return returnValue;
	}
	
}
