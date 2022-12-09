package com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;

import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithCustomerDto;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithFilesDto;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AgreementDao extends JpaRepository<Agreement,Long> {
    Agreement getByAgreementName(String agreementName);

    Agreement getById(Long id);

    Agreement getByAgreementNameAndUser_Id(String agreementName, long customerId);

    List<Agreement> getByAgreementNameOrUser_Id(String agreementName, long customerId);

    List<Agreement> getByUser_Id(long id);

    List<Agreement> getByUser_Id(long id, Sort sort);

    List<Agreement> getByAgreementNameContains(String agreementName);

    List<Agreement> getByAgreementNameStartsWith(String agreementName);

    @Query("Select new com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithCustomerDto"
            + "(a.id, u.name ,a.agreementName ) "
            + "From Agreement a Inner Join a.user u")
    List<AgreementWithCustomerDto> getAgreementWithUserDetails();

    @Query("Select new com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithFilesDto"
            + "(a.id, f.data ,a.agreementName ) "
            + "From Agreement a Inner Join a.files f")
    List<AgreementWithFilesDto> getAgreementWithFileDetails();


    @Query("SELECT a FROM Agreement a WHERE a.endDate BETWEEN CURRENT_TIME"
            + " AND :timestampStart")
    List<Agreement> getAgreementLastMonth(
            @Param("timestampStart") LocalDate endDate);

    @Query("SELECT a FROM Agreement a WHERE a.endDate BETWEEN "
            + " :timestampStart AND CURRENT_TIME")
    List<Agreement> getAgreementEndDate(
            @Param("timestampStart") LocalDate endDate);



}
