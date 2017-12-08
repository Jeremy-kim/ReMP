package com.remp.work.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDao {
	private static CustomerDao instance;
	@Autowired
	private FactoryDao factoryDao;
	
	private CustomerDao() {}
	
	private CustomerDao(FactoryDao factoryDao) {
		this.factoryDao = factoryDao;
	}
	
	public static CustomerDao getInstance() {
		return getInstance(null);
	}
	
	public static CustomerDao getInstance(FactoryDao factoryDao) {
		if (instance == null) {
			instance = new CustomerDao(factoryDao);
		}
		return instance;
	}

	public String selectCustomerId(HashMap<String, String> memberinfo) {
		StringBuilder returnValue = new StringBuilder();
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql ="select cu_id from customer where cu_name = ? and cu_mobile = ?";
		
		try {
			con = factoryDao.getConnection();
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, memberinfo.get("name"));
			pstmt.setString(2, memberinfo.get("phone"));
			rs = pstmt.executeQuery();
			rs.next();
			returnValue.append(rs.getString("cu_id"));
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			factoryDao.close(con, pstmt);
		}
		return returnValue.toString();
	}
	
}
