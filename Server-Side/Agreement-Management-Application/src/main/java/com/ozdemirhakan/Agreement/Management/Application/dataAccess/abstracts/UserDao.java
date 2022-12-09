package com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts;

import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserDao extends JpaRepository<User,Long> {
    User findByEmail(String email);

    Optional<User> findByUsername(String username);

    User getById(Long id);

    User getUserByUsername(String username);

    Optional<User> findByName(String username);

//    @Query("Select new com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithUserDto"
//            + "(u.id, u.name, a.agreementName) "
//            + "From User u Inner Join u.agreements a")
//    List<AgreementWithUserDto> getUserWithAgreementDetails();


}
