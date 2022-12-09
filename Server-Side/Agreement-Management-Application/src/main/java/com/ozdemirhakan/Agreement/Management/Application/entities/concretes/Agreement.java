package com.ozdemirhakan.Agreement.Management.Application.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Agreements")
@AllArgsConstructor
@NoArgsConstructor
public class Agreement {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "description")
    @NotBlank
    @NotNull
    private String description;

    @Column(name = "agreement_name")
    @NotBlank
    @NotNull
    private String agreementName;

    @Column(name = "agreement_total_price")
    @NotNull
    private Double agreementTotalPrice;

    @Column(name = "agreement_withdrawal_fee")
    @NotNull
    private Double agreementWithdrawalFee;

    @Column(name="acceptance_date")
    private LocalDate acceptanceDate;

    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name ="is_active",columnDefinition = "boolean default true")
    private Boolean active = true ;

//    @OneToMany(mappedBy = "agreement")
//    private List<Files> files;
    @ManyToOne()
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "agreement")
    private List<Files> files;

    @JsonIgnore
    @OneToMany(mappedBy = "agreement")
    private List<AgreementisActiveLog> agreementisActiveLogs;

//    @OneToMany(mappedBy = "agreement")
//    private List<AgreementFiles> agreementFiles;

}
