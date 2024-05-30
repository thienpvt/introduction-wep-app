package isd.group6.hanu.common;



public class ResponseFrontendDefine {

	public static final int GENERAL = 999;
	// thành công
	public static final int CODE_SUCCESS = 0;

	public static final String CODE_SUCCESS_1 = "1";
	public static final String CODE_FAIL_1 = "0";

	// exception không có quyền truy cập tài nguyên
	public static final int CODE_PERMISSION = 1;

	// exception không tìm thấy entity
	public static final int CODE_NOT_FOUND = 2;

	// exception name/code/mail đã tồn tại
	public static final int CODE_ALREADY_EXIST = 3;
	
	public static final int BAD_REQUEST_PARAMS=8;
	
	public static final int ACTIVE=1;

	public static final int INACTIVE=2;

	public static final int DELETE=0;

}
