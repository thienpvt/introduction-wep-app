package isd.group6.hanu.service;

import isd.group6.hanu.common.ResponseModel;

public interface IRootService<T> {

    ResponseModel retrieveAll();

    ResponseModel create(T entity);

    ResponseModel retrieve(String id);

    ResponseModel update(T entity);

    ResponseModel delete(String id);

}