package com.remp.work.model.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.remp.work.model.dao.CustomerDao;

@Service("customerService")
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	private CustomerDao customerDao;
	
	@Override
	public String getCustomerId(HashMap<String, String> memberinfo) {
		return customerDao.selectCustomerId(memberinfo);
	}

}
