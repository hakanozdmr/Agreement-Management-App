package com.ozdemirhakan.Agreement.Management.Application.api.controllers;

import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.AgreementService;
import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.UserService;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@Secured("ADMIN")
public class AdminController {
    private final UserService userService;

    private final AgreementService agreementService;



    public AdminController(UserService userService, AgreementService agreementService) {
        this.userService = userService;
        this.agreementService = agreementService;
    }


    //User
    @GetMapping("/api/admin/getUsers")
    public ResponseEntity<?> findAllUsers(){
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/api/admin/getUserById")
    public DataResult<User> getById(@RequestParam long id){
        return this.userService.getById(id);
    }

    @PostMapping(value="/addUser")
    public ResponseEntity<?> add(@Valid @RequestBody User user) {

        return ResponseEntity.ok(this.userService.addUser(user)) ;
    }
    @PutMapping("/api/admin/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User existUser = userService.findByUsername(user.getUsername());
        if (existUser != null && !existUser.getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.CREATED);
    }
    @DeleteMapping("/api/admin/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestBody User user){
        return ResponseEntity.ok(this. userService.DeleteUserByID(user.getId())) ;
    }


    @GetMapping("/api/admin/NumbersOfUsers")
    public ResponseEntity<?> numberOfUsers(){
        return ResponseEntity.ok(this.userService.numberOfUsers());
    }


    // Agreement
    @PostMapping("/api/admin/createAgreement")
    public ResponseEntity<?> createAgreement(@RequestBody Agreement agreement){
        return new ResponseEntity<>(agreementService.saveAgreement(agreement), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/updateAgreement")
    public ResponseEntity<?> updateAgreement(@RequestBody Agreement agreement){
        return new ResponseEntity<>(agreementService.saveAgreement(agreement), HttpStatus.CREATED);
    }

    @PostMapping("/api/admin/deleteAgreement")
    public ResponseEntity<?> deleteProduct(@RequestBody Agreement agreement){
        agreementService.DeleteAgreementByID(agreement.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/admin/getAgreements")
    public ResponseEntity<List<Agreement>> getAllProducts(){
        return this.agreementService.getAllProducts();
    }

    @GetMapping("/api/admin/NumbersOfAgreements")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> numberOfAgreement(){
        return ResponseEntity.ok(this.agreementService.numberOfAgrements());
    }

}
