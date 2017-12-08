package com.remp.work.model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class FactoryDao {
	private static FactoryDao instance;
	
	private String driver;
	private String url;
	private String username;
	private String password;
	private Map dbserver;
	
	/** FactoryDao constructor */
	private FactoryDao(Map dbserver) {
	      this.dbserver = dbserver;      
	      driver = dbserver.get("driver").toString();
	      url = dbserver.get("url").toString();
	      username = dbserver.get("username").toString();
	      password = dbserver.get("password").toString();
	      try {         
	         Class.forName(dbserver.get("driver").toString() );   
	      } catch (ClassNotFoundException e) {      
	         e.printStackTrace();
	      }
	   }
	   
	/** FactoryDao instance 반환 */
	public static FactoryDao getInstance(Map map) {
	      if(instance == null) {
	    	  instance = new FactoryDao(map);
	      }
	      return instance;
	   }
	
	/** DBMS 연결 객체 반환 */
	public Connection getConnection() throws SQLException {
		return DriverManager.getConnection(url, username, password);
	}
	
	/**
	 * CUD 자원해제 메서드
	 * @param con Connection
	 * @param stmt Statement
	 */
	public void close(Connection con, Statement pstmt) {
		close(con, pstmt, null);
	}
	   
	/**
	 * R 자원해제 메서드
	 * @param con Connection
	 * @param stmt Statement
	 * @param rs ResultSet
	 */
	public void close(Connection con, Statement pstmt, ResultSet rs) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if (con != null) {
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("자원해제 오류");
		}
	}
}
