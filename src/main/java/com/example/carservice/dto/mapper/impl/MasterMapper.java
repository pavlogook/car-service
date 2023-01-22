package com.example.carservice.dto.mapper.impl;

import com.example.carservice.dto.mapper.RequestDtoMapper;
import com.example.carservice.dto.mapper.ResponseDtoMapper;
import com.example.carservice.dto.request.MasterRequestDto;
import com.example.carservice.dto.response.MasterResponseDto;
import com.example.carservice.model.Master;
import com.example.carservice.model.Order;
import com.example.carservice.repository.OrderRepository;
import org.springframework.stereotype.Component;

@Component
public class MasterMapper implements RequestDtoMapper<MasterRequestDto, Master>,
        ResponseDtoMapper<MasterResponseDto, Master> {
    private final OrderRepository orderRepository;

    public MasterMapper(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Master mapToModel(MasterRequestDto dto) {
        Master master = new Master();
        master.setName(dto.getName());
        master.setCompletedOrders(dto.getCompleteOrderIds()
                .stream()
                .map(orderRepository::getReferenceById)
                .toList());
        return master;
    }

    @Override
    public MasterResponseDto mapToDto(Master master) {
        MasterResponseDto dto = new MasterResponseDto();
        dto.setId(master.getId());
        dto.setName(master.getName());
        dto.setCompleteOrderIds(master.getCompletedOrders()
                .stream()
                .map(Order::getId)
                .toList());
        return dto;
    }
}
