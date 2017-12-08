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
public class BuyDao {
	private static BuyDao instance;
	@Autowired
	private FactoryDao factoryDao;
	
	private BuyDao() {}
	
	private BuyDao(FactoryDao factoryDao) {
		this.factoryDao = factoryDao;
	}
	
	public static BuyDao getInstance() {
		return getInstance(null);
	}
	
	public static BuyDao getInstance(FactoryDao factoryDao) {
		if (instance == null) {
			instance = new BuyDao(factoryDao);
		}
		return instance;
	}

	public List<Map<String, String>> selectRentalRequestList(String keyword) {
		List<Map<String, String>> returnValue = new ArrayList<>();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select OU_ID req_id, to_char(OU_OUT_DAY, 'yyyy-MM-dd') req_trans_date from OUTPUT where regexp_like(ou_id||' '||pr_id, ?) and ou_complete in('','n','N')";
		
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, keyword);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Map<String, String> item = new HashMap<>();
				item.put("reqId", rs.getString("req_id"));
				item.put("reqTransDate", rs.getString("req_trans_date"));
				returnValue.add(item);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt);
		}
		return returnValue;
	}
	
}
