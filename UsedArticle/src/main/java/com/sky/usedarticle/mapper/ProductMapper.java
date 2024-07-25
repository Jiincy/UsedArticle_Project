package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {

    List<Product> getAllProducts();
}
