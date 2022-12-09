package com.ozdemirhakan.Agreement.Management.Application.business.abstracts;

import java.util.List;

import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.*;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithCustomerDto;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithFilesDto;
import org.springframework.http.ResponseEntity;

public interface AgreementService {
    ResponseEntity<List<Agreement>> getAllProducts();
    DataResult<List<Agreement>> getAllSorted();
    DataResult<List<Agreement>> getAll(int pageNo, int pageSize);

    Result addAgreement(Agreement agreement);

    Result updateAgreement(Agreement agreement);

    Result saveAgreement(Agreement agreement);
    Result setPassiveAgreement(Agreement agreement);

    Result setActiveAgreement(Agreement agreement);

    Result DeleteAgreementByID(Long agreement_id);

    Result DeleteAgreementByName(Agreement agreement);

    DataResult<Agreement> getByAgreementName(String agreementName);
    DataResult<Agreement> getById(Long id);

    DataResult<Agreement> getByAgreementAndCustomerId(String agreementName, long customerId);

    DataResult<List<Agreement>> getByAgreementOrCustomerId(String agreementName, long customerId);

    DataResult<List<Agreement>> getByUserId(long id);

    DataResult<List<Agreement>> getByUserIdSortedActive(long id);

    DataResult<List<Agreement>> getByAgreementNameContains(String agreementName);

    DataResult<List<Agreement>> getByAgreementNameStartsWith(String agreementName);

    Result numberOfAgrements();

    DataResult<List<AgreementWithCustomerDto>> getAgreementWithUserDetails();

    DataResult<List<AgreementWithFilesDto>> getAgreementWithFilesDetails();

    List<Agreement> getAll();

    List<Agreement> getAgreementLastMonth();

    List<Agreement> getAgreementEndedDate();

}
