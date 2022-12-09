package com.ozdemirhakan.Agreement.Management.Application.entities.concretes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "agreements_logs")
@AllArgsConstructor
@NoArgsConstructor
public class AgreementisActiveLog {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Date")
    private String date;

    @Column(name = "new_status")
    private String newStatus;
    @ManyToOne()
    @JoinColumn(name="user")
    private User user;

    @ManyToOne()
    @JoinColumn(name="agreement")
    private Agreement agreement;


    public AgreementisActiveLog(String date,String newStatus, User user , Agreement agreement) {
        this.date = date;
        this.newStatus = newStatus;
        this.user = user;
        this.agreement  = agreement;
    }
}
