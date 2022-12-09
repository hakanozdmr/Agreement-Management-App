package com.ozdemirhakan.Agreement.Management.Application.entities.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgreementWithCustomerDto {
    private long id;
    private String customerName;
    private String agreementName;
}
