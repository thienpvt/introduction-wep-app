package isd.group6.hanu.common;


public class ErrorMessageDefine {

	// Common
	public static final String ZUUL_PROXY = "com.netflix.zuul.exception.zuulexception";

	// Account
//	public static final String ACC_CREATE = "exception.business.account.do_create";
//	public static final String ACC_RETRIEVE = "exception.business.account.do_retrieve";
//	public static final String ACC_UPDATE = "exception.business.account.do_update";
	public static final String ACC_DELETE = "exception.business.account.do_delete";
	public static final String ACC_JSON_MAPPING = "exception.business.account.jsonmapping";
	public static final String ACC_JSON_PROCESSING = "exception.business.account.jsonprocessing";
	public static final String ACC_SEARCH = "exception.business.account.do_search";
	public static final String ACC_NOT_FOUND = "exception.business.account.not_found";
	public static final String ACC_EMAIL_ALREADY_EXIST = "exception.business.account.email_already_exist";
	public static final String ACC_PHONE_ALREADY_EXIST = "exception.business.account.phone_already_exist";
	public static final String ACC_FORBIDDEN = "exception.business.account.forbidden_unauthorized";
	public static final String ACC_SEND_EMAIL_FAILED = "exception.business.account.send_email_failed";
	public static final String ACC_SERVICE_ALREADY_EXIST = "exception.business.account.service_already_exist";
	public static final String ACC_CONTRACT_ALREADY_EXIST = "exception.business.account.contract_already_exist";
	public static final String ACC_UNAUTHORIZED = "exception.business.account.unauthorized";
	public static final String ACC_CREATE_AE = "exception.business.account.do_create_ae_onem2m";
	public static final String ACC_NOT_REGISTERED_SERVICE = "exception.business.account.not_registered_service";
	public static final String ACC_SUB_SERVICEPACK_ALREADY_EXIST = "exception.business.account.sub_servicepack_already_exist";
	public static final String ACC_SUB_SERVICEPACK_USING = "exception.business.account.sub_servicepack_using";
	public static final String ACC_SUB_SERVICEPACK_FAILED = "exception.business.account.sub_servicepack_failed";
	public static final String ACC_EMAIL_OR_LOGINID_ALREADY_EXIST = "exception.business.account.email_or_loginid_already_exist";

	// Master Code
	public static final String MC_GET_PROVINCE_CODE = "exception.business.mastercode.get_province_code";
	public static final String MC_GET_DISTRICT_CODE = "exception.business.mastercode.get_district_code";
	public static final String MC_GET_COMMUNE_CODE = "exception.business.mastercode.get_commune_code";
	public static final String MC_IMPORT_DATA = "exception.business.mastercode.import_data";

	// Service Pack
	public static final String SP_NOT_FOUND = "exception.business.service.pack.not_found";
	public static final String SP_JSON_PROCESSING = "exception.business.service.pack.jsonprocessing";

	// Service
	public static final String SERVICE_JSON_PROCESSING = "exception.business.service.jsonprocessing";
	public static final String SERVICE_NOT_FOUND = "exception.business.service.not_found";
	public static final String SERVICENAME_ALREADY_EXIST = "exception.business.servicename_already_exist";
	public static final String SERVICECODE_ALREADY_EXIST = "exception.business.servicecode_already_exist";
	public static final String SERVICE_PACK_ALREADY_EXIST = "exception.business.service_pack_already_exist";

	// UnitSale
	public static final String US_NOT_FOUND = "exception.business.unitsale.not_found";
	public static final String US_JSON_PROCESSING = "exception.business.unitsale.jsonprocessing";

	// Product
	public static final String PRODUCT_NOT_FOUND = "exception.business.product.not_found";
	public static final String PRODUCT_JSON_PROCESSING = "exception.business.product.jsonprocessing";
	public static final String PRODUCT_USING_IN_PRODUCT_GROUP = "exception.business.product.using_in_product_group";
	public static final String PRODUCT_USING_IN_ACTIVE_SERVICEPACK = "exception.business.product.using_in_active_servicepack";
	public static final String PRODUCT_NAME_ALREADY_EXIST = "exception.business.product.name_already_exist";
	public static final String PRODUCT_CODE_ALREADY_EXIST = "exception.business.product.code_already_exist";

	// Event
	public static final String EVENT_NOT_FOUND = "exception.business.event.not_found";
	public static final String EVENT_JSON_PROCESSING = "exception.business.event.jsonprocessing";

	// Product_Event
	public static final String PRODUCT_EVENT_NOT_FOUND = "exception.business.product.event.not_found";
	public static final String PRODUCT_EVENT_JSON_PROCESSING = "exception.business.product.event.jsonprocessing";

	// Product_Group
	public static final String PRODUCT_GROUP_NOT_FOUND = "exception.business.product.group.not_found";
	public static final String PRODUCT_GROUP_JSON_PROCESSING = "exception.business.product.group.jsonprocessing";
	public static final String PRODUCT_GROUP_USING_IN_ACTIVE_SERVICEPACK = "exception.business.product.group.using_in_active_servicepack";
	public static final String PRODUCT_GROUP_NOT_DELETE_USING_IN_ACTIVE_SERVICEPACK = "exception.business.product.group.not_delete_using_in_active_servicepack";
	public static final String PRODUCT_GROUP_NAME_ALREADY_EXIST = "exception.business.product.group.name_already_exist";
	public static final String PRODUCT_GROUP_CODE_ALREADY_EXIST = "exception.business.product.group.code_already_exist";

	// Product_Attribute
	public static final String PRODUCT_ATTRIBUTE_NOT_FOUND = "exception.business.product.attribute.not_found";

	// Product_Group_Attribute
	public static final String PRODUCT_GROUP_ATTRIBUTE_NOT_FOUND = "exception.business.product.group.attribute.not_found";

	// Address
	public static final String ADDRESS_NOT_FOUND = "exception.business.address.not_found";

	// AccountApikey
	public static final String AA_NOT_FOUND = "exception.business.account.apikey.not_found";
	public static final String AA_JSON_PROCESSING = "exception.business.account.apikey.jsonprocessing";

	// OrganizationInfo
	public static final String ORGANIZATIONINFO_NOT_FOUND = "exception.business.organizationInfo.not_found";

	// Contract
	public static final String CONTRACT_NOT_FOUND = "exception.business.contract.not_found";
	public static final String CONTRACT_JSON_PROCESSING = "exception.business.contract.jsonprocessing";
	public static final String CONTRACT_IOEXCEPTION = "exception.business.contract.ioexception";
	public static final String CONTRACT_UNAUTHORIZED = "exception.business.contract.unauthorized";
	public static final String CONTRACT_DELETE = "exception.business.account.do_delete";
	public static final String CONTRACT_NUMBER_ALREADY_EXIST = "exception.business.contract.contract_number_already_exist";
	public static final String CONTRACT_FILE_NOT_CORRECT = "exception.business.contract.file_not_correct";
	public static final String CONTRACT_CREATE = "exception.business.contract.do_create";

	// ReportTemplateEntity
	public static final String REPORTTEMPLATE_NOT_FOUND = "exception.business.reporttemplate.not_found";
	public static final String REPORTTEMPLATE_JSON_PROCESSING = "exception.business.reporttemplate.jsonprocessing";

	// NotifyConfig
	public static final String NOTIFYCONFIG_NOT_FOUND = "exception.business.notifyconfig.not_found";
	public static final String NOTIFYCONFIG_JSON_PROCESSING = "exception.business.notifyconfig.jsonprocessing";
	public static final String NOTIFYCONFIG_EXISTED = "exception.business.notify.config_in_already_existed";

	// ThresholdAction
	public static final String THRESHOLDACTION_NOT_FOUND = "exception.business.thresholdaction.not_found";
	public static final String THRESHOLDACTION_JSON_PROCESSING = "exception.business.thresholdaction.jsonprocessing";

	// Discount
	public static final String DISCOUNT_ALREADY_EXIST = "exception.business.discount.name_already_exist";
	public static final String DISCOUNT_NOT_FOUND = "exception.business.discount.not_found";
	public static final String DISCOUNT_ALREADY_EXIST_IN_DISCOUNTGROUP = "exception.business.discount.already_exist_in_discountgroup";

	// Price
	public static final String PRICE_NAME_ALREADY_EXIST = "exception.business.price.name_already_exist";
	public static final String PRICE_NOT_FOUND = "exception.business.price.not_found";
	public static final String PRICE_QUANTITY_WRONG = "exception.business.price.quantityusedfrom_after_quantityusedto";

	// Price group -- bộ giá
	public static final String PRICE_GROUP_ALREADY_EXIST_IN_SERVICE_PACK = "exception.business.price.group.already_exist_in_service_pack";
	public static final String PRICE_GROUP_DELETE = "exception.business.price.group.deletePriceGroup";
	public static final String PRICE_GROUP_UPDATE_HAS_ACTIVE_SERVICE_PACK = "exception.business.price.group.update_has_actived_service_pack";
}
