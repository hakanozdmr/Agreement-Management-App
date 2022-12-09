package com.ozdemirhakan.Agreement.Management.Application.business.concretes;

import com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws.FileResponse;
import com.ozdemirhakan.Agreement.Management.Application.core.mailsender.EmailDetails;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Files;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithFilesDto;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.AgreementService;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.SuccessDataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.SuccessResult;
import com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts.AgreementDao;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithCustomerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class AgreementManager implements AgreementService {

    private AgreementDao agreementDao;

    @Autowired
    public AgreementManager(AgreementDao agreementDao) {
        super();
        this.agreementDao = agreementDao;
    }


    @Override
    public ResponseEntity<List<Agreement>> getAllProducts() {

//        List<Agreement> agreements = new ArrayList<Agreement>();
//        agreementDao.findAll().forEach(agreements::add);
        return new ResponseEntity<>(agreementDao.findAll(), HttpStatus.OK);
    }

    @Override
    public DataResult<List<Agreement>> getAllSorted() {
        Sort sort = Sort.by(Sort.Direction.DESC,"agreementName");
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.findAll(sort),"Başarılı");
    }

    @Override
    public DataResult<List<Agreement>> getAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo-1, pageSize);

        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.findAll(pageable).getContent(),"Ürünler Listelendi");
    }

    @Override
    public Result addAgreement(Agreement agreement) {
        this.agreementDao.save(agreement);
        return new SuccessDataResult<Agreement>(agreement,"Kullanıcı eklendi");
    }

    @Override
    public Result updateAgreement(Agreement agreement) {
        this.agreementDao.save(agreement);
        return new SuccessResult("Ürün güncellendi");
    }

    @Override
    public Result saveAgreement(Agreement agreement) {
        this.agreementDao.save(agreement);
        return new SuccessResult("Ürün güncellendi");
    }

    @Override
    public Result setPassiveAgreement(Agreement agreement) {
        this.agreementDao.save(agreement);
        return new SuccessResult("Ürün güncellendi");
    }
    @Override
    public Result setActiveAgreement(Agreement agreement) {
        this.agreementDao.save(agreement);
        return new SuccessResult("Ürün güncellendi");
    }

    @Override
    public Result DeleteAgreementByID(Long agreement_id) {
        this.agreementDao.deleteById(agreement_id);
        return new SuccessResult("Ürün Silindi");
    }

    @Override
    public Result DeleteAgreementByName(Agreement agreement) {
        this.agreementDao.delete(agreement);
        return new SuccessResult("Ürün Silindi.");
    }

    @Override
    public DataResult<Agreement> getByAgreementName(String agreementName) {
        return new SuccessDataResult<Agreement>
                (this.agreementDao.getByAgreementName(agreementName),"Data listelendi");
    }

    @Override
    public DataResult<Agreement> getById(Long id) {
        return new SuccessDataResult<Agreement>
                (this.agreementDao.findById(id).get(),"Data listelendi");
    }

    @Override
    public DataResult<Agreement> getByAgreementAndCustomerId(String agreementName, long customerId) {
        return new SuccessDataResult<Agreement>
                (this.agreementDao.getByAgreementNameAndUser_Id(agreementName,customerId),"Data listelendi");
    }

    @Override
    public DataResult<List<Agreement>> getByAgreementOrCustomerId(String agreementName, long customerId) {
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.getByAgreementNameOrUser_Id(agreementName, customerId),"Data listelendi");
    }

    @Override
    public DataResult<List<Agreement>> getByUserId(long id) {
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.getByUser_Id(id),"Data listelendi");
    }

    @Override
    public DataResult<List<Agreement>> getByUserIdSortedActive(long id) {
        Sort sort = Sort.by(Sort.Direction.DESC,"active");
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.getByUser_Id(id,sort),"Data listelendi");
    }

    @Override
    public DataResult<List<Agreement>> getByAgreementNameContains(String agreementName) {
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.getByAgreementNameContains(agreementName),"Data listelendi");
    }

    @Override
    public DataResult<List<Agreement>> getByAgreementNameStartsWith(String agreementName) {
        return new SuccessDataResult<List<Agreement>>
                (this.agreementDao.getByAgreementNameStartsWith(agreementName),"Data listelendi");
    }

    @Override
    public Result numberOfAgrements() {
        long number = this.agreementDao.count();
        return new SuccessResult("Ürün sayısı = "+number);
    }

    @Override
    public DataResult<List<AgreementWithCustomerDto>> getAgreementWithUserDetails() {
        return new SuccessDataResult<List<AgreementWithCustomerDto>>
                (this.agreementDao.getAgreementWithUserDetails(),"Data listelendi");
    }
    @Override
    public DataResult<List<AgreementWithFilesDto>> getAgreementWithFilesDetails() {
        return new SuccessDataResult<List<AgreementWithFilesDto>>
                (this.agreementDao.getAgreementWithFileDetails(),"Data listelendi");
    }

    @Override
    public List<Agreement> getAll() {
        return this.agreementDao.findAll();
    }


    @Override
    public List<Agreement> getAgreementLastMonth() {
        var endDate = Timestamp.valueOf(LocalDateTime.now().plusMonths(1));
        System.out.println(endDate);
        return agreementDao.getAgreementLastMonth(endDate.toLocalDateTime().toLocalDate());
//        LocalDate endd = LocalDate.now();
//        LocalDate now = LocalDate.now();
//        DateTimeFormatter formatters = DateTimeFormatter.ofPattern("d/MM/uuuu");
//        var a = "";
//        var today = now.format(formatters);
//        for(Agreement agreement : agreementDao.findAll()) {
//            var endDate = agreement.getEndDate();
//            endd = endDate.minusMonths(1);
//            a = endd.format(formatters);
//            if (today == a) {
//
//            }
//        }
//        return this.agreementDao.getAgreementLastMonth("2022-09-15");
    }

    @Override
    public List<Agreement> getAgreementEndedDate() {
        var endDate = Timestamp.valueOf(LocalDateTime.now().minusMonths(1));
        return  agreementDao.getAgreementEndDate(endDate.toLocalDateTime().toLocalDate());
    }


}
