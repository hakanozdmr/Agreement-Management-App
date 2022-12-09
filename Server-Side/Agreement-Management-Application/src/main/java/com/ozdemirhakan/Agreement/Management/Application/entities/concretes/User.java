package com.ozdemirhakan.Agreement.Management.Application.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","agreements"})
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotBlank
    @NotNull
    private String name;

    @Column(name = "username")
    @NotBlank
    @NotNull
    private String username;

    @Column(name = "password")
    @NotBlank
    @NotNull
    private String password;

    @Column(name="email")
    @Email
    @NotBlank
    @NotNull
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;


    @Transient
    private String accessToken;

    @OneToMany(mappedBy = "user")
    private List<Agreement> agreements;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<AgreementisActiveLog> agreementisActiveLogs;
}
