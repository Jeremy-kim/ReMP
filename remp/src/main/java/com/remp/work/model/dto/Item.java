package com.remp.work.model.dto;

import java.io.Serializable;

public class Item implements Serializable {
	private String id;
	private String name;
	private int price;
	private int acquisition;
	private String image;
	
	/**
	 * 
	 */
	public Item() {
		super();
	}

	/**
	 * @param id
	 * @param name
	 * @param price
	 * @param acquisition
	 * @param image
	 */
	public Item(String id, String name, int price, int acquisition, String image) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.acquisition = acquisition;
		this.image = image;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the price
	 */
	public int getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(int price) {
		this.price = price;
	}

	/**
	 * @return the acquisition
	 */
	public int getAcquisition() {
		return acquisition;
	}

	/**
	 * @param acquisition the acquisition to set
	 */
	public void setAcquisition(int acquisition) {
		this.acquisition = acquisition;
	}

	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * @param image the image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}
	
}
