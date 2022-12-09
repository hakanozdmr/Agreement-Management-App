package com.ozdemirhakan.Agreement.Management.Application.api.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

//import com.ozdemirhakan.Agreement.Management.Application.business.concretes.CustomUserDetailService;
//import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.AgreementsFilesService;
import com.ozdemirhakan.Agreement.Management.Application.business.concretes.UserDetailManager;
import com.ozdemirhakan.Agreement.Management.Application.core.fileservice.ws.FileStorageService;
import com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts.AgreementisActiveLogDao;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.*;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithFilesDto;
import com.ozdemirhakan.Agreement.Management.Application.jwt.JwtTokenProvider;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.AgreementService;
import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.UserService;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.entities.dtos.AgreementWithCustomerDto;
import com.ozdemirhakan.Agreement.Management.Application.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.ErrorDataResult;

import org.springframework.validation.FieldError;

@RestController
@RequestMapping(value="/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {



    private JwtTokenProvider tokenProvider;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailManager userDetailsService;
    private UserService userService;
    private AgreementService agreementService;

    private AgreementisActiveLogDao agreementisActiveLogDao;

    //private AgreementsFilesService agreementsFilesService;


    @Autowired
    private FileStorageService fileStorageService;




    @Autowired
    public UserController(UserService userService, AgreementService agreementService,AgreementisActiveLogDao agreementisActiveLogDao) {
        super();
        this.userService = userService;
        this.agreementService = agreementService;
       // this.agreementsFilesService = agreementsFilesService;
        this.agreementisActiveLogDao = agreementisActiveLogDao;
    }


    @PostMapping("/user/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.findByUsername(user.getUsername())!=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }
    @PostMapping("user/login")
    public ResponseEntity<?> creteToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            } catch (BadCredentialsException ex) {
                throw new Exception("Incorret username or password", ex);
            }
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);
                User user = userService.findByUsername(authRequest.getUsername());

                user.setAccessToken(jwt);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

//    @PostMapping("/user/login")
//    public ResponseEntity<?> getUser(@AuthenticationPrincipal  Principal principal){
//        //principal = httpServletRequest.getUserPrincipal.
//        if(principal == null){
//            //logout will also use here so we should return ok http status.
//            return ResponseEntity.ok("principal");
//        }
//        UsernamePasswordAuthenticationToken authenticationToken =
//                (UsernamePasswordAuthenticationToken) principal;
//        User user = userService.findByUsername(authenticationToken.getName());
//        user.setToken(tokenProvider.generateToken(authenticationToken));
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }





    @GetMapping("/products")
    public ResponseEntity<List<Agreement>> getAllProducts(){
        return this.agreementService.getAllProducts();
    }



//    @GetMapping("/agreementFiles")
//    public DataResult<List<AgreementFiles>> getAllAF(){
//        return this.agreementsFilesService.getAllProducts();
//    }

    @PostMapping("/addAgreement")
    public Result addAgreement (@RequestBody Agreement agreement) {
        return this.agreementService.addAgreement(agreement);
    }

    @PutMapping("/updateAgreement")
    public Result updateAgreement (@RequestBody Agreement agreement) {
        return this.agreementService.updateAgreement(agreement);
    }

    @PutMapping("/passiveAgreement")
    public Result passiveAgreement (@RequestParam("agreementId") Long agreementId,Long userId) {
        var aID = (Long)agreementId;
        var uID = (Long)userId;
        LocalDateTime instance = LocalDateTime.now();
        DateTimeFormatter formatter
                = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");
        String formattedString = formatter.format(instance); //15-02-2022 12:43
        var agreement = agreementService.getById(agreementId).getData();
        var user = userService.getById(userId).getData();
        agreement.setActive(false);
        var newStatus = agreement.getActive().toString();
        AgreementisActiveLog aiaL = new AgreementisActiveLog(formattedString,newStatus,user,agreement);
        agreementisActiveLogDao.save(aiaL);
        return this.agreementService.setActiveAgreement(agreement);
    }

    @PutMapping("/activeAgreement")
    public Result activeAgreement (@RequestParam("agreementId") Long agreementId,Long userId) {
        var aID = (Long)agreementId;
        var uID = (Long)userId;
        LocalDateTime instance = LocalDateTime.now();
        DateTimeFormatter formatter
                = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");
        String formattedString = formatter.format(instance);
        var agreement = agreementService.getById(agreementId).getData();
        var user = userService.getById(userId).getData();
        agreement.setActive(true);
        var newStatus = agreement.getActive().toString();
        AgreementisActiveLog aiaL = new AgreementisActiveLog(formattedString,newStatus,user,agreement);
        agreementisActiveLogDao.save(aiaL);
        return this.agreementService.setActiveAgreement(agreement);
    }

    @GetMapping("/getByAgreementName")
    public DataResult<Agreement> getByAgreementName(@RequestParam String agreementName){
        return this.agreementService.getByAgreementName(agreementName);
    }
    @GetMapping("/getByAgreementId")
    public DataResult<Agreement> getById(@RequestParam long id){
        return this.agreementService.getById(id);
    }

    @GetMapping("/getAgreementByUserId")
    public DataResult<List<Agreement>> getByCustomerId(@RequestParam long id){
        return this.agreementService.getByUserId(id);
    }

    @GetMapping("/getAgreementByUserIdSorted")
    public DataResult<List<Agreement>> getByUserId(@RequestParam long id){
        return this.agreementService.getByUserIdSortedActive(id);
    }
    @GetMapping("/getByAgreementNameAndCustomerId")
    public DataResult<Agreement>
    getByProductNameAndCategoryId(@RequestParam("agreementName") String agreementName,@RequestParam("customerId") long customerId){
        return this.agreementService.getByAgreementAndCustomerId
                (agreementName, customerId);
    }

    @GetMapping("/getByProductNameContains")
    public DataResult<List<Agreement>> getByAgreementNameContains(@RequestParam String agreementName){
        return this.agreementService.getByAgreementNameContains(agreementName);
    }

    @GetMapping("/getAllByPage")
    DataResult<List<Agreement>> getAll(int pageNo, int pageSize){
        return this.agreementService.getAll(pageNo, pageSize);
    }
    @GetMapping("/getAllDesc")
    public DataResult<List<Agreement>> getAllSorted() {
        return this.agreementService.getAllSorted();
    }




    @GetMapping("/getAgreements")
    public DataResult<List<AgreementWithCustomerDto>> getAgreementWithUserDetails() {
        return  this.agreementService.getAgreementWithUserDetails();
    }

    @GetMapping("/Agreements")
    public DataResult<List<AgreementWithFilesDto>> getAgreementWithFilesDetails() {
        return  this.agreementService.getAgreementWithFilesDetails();
    }

    @GetMapping("/getAgreements2")
    public List<Agreement> getAgreementLM() {
        return  this.agreementService.getAgreementLastMonth();
    }

    @DeleteMapping("/deleteAgreement")
    public Result DeleteAgreementByID(Long id){
        return  this.agreementService.DeleteAgreementByID(id);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationException
            (MethodArgumentNotValidException exceptions){
        Map<String,String> validationErrors = new HashMap<String, String>();
        for(FieldError fieldError : exceptions.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ErrorDataResult<Object> errors
                = new ErrorDataResult<Object>(validationErrors,"Doğrulama hataları");
        return errors;
    }



}
