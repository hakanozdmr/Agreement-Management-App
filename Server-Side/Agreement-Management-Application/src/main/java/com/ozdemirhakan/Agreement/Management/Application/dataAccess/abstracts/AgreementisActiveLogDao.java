package com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts;

import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.AgreementisActiveLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgreementisActiveLogDao extends JpaRepository<AgreementisActiveLog,Long> {

}
