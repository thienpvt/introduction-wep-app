package isd.group6.hanu.common;

import isd.group6.hanu.common.ResponseFrontendDefine;
import isd.group6.hanu.exception.RalException;
import org.apache.http.HttpStatus;


import lombok.extern.slf4j.Slf4j;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * This class is used to handle exception
 */

@Slf4j
public abstract class BaseService {

	protected RalException handleException(Exception exception) {

		log.error("Error [{}]", exception.getMessage(), exception);

		String cause = "";
		if (exception.getCause() != null) {
			cause = exception.getCause().getClass().getCanonicalName();
		}

		if (exception instanceof RalException) {
			throw new RalException(HttpStatus.SC_OK, ((RalException) exception).getCode(), exception.getMessage());
		} else if (exception instanceof IllegalArgumentException || cause.contains("IncorrectParameterException")
				|| cause.contains("SQLGrammarException")) {
			return new RalException(HttpStatus.SC_INTERNAL_SERVER_ERROR, ResponseFrontendDefine.BAD_REQUEST_PARAMS,
					exception.getMessage());
		} else {
			return new RalException(ResponseFrontendDefine.GENERAL, exception.getMessage());
		}

	}
}
