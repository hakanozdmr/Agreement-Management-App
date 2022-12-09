package com.ozdemirhakan.Agreement.Management.Application.entities.concretes;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Data
@Entity
@Table(name = "files")
@NoArgsConstructor
@AllArgsConstructor
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "data")
    private String data;

    @Column(name = "size")
    private Long size;

    @ManyToOne()
    @JoinColumn(name="agreement_id")
    @JsonIgnore
    private Agreement agreement;

    public Files(String name, String type ,String data,Long size) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.size = size;
    }
    public Files(String name, String type ,String data,Long size,Agreement agreement) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.size = size;
        this.agreement  = agreement;
    }



//    @OneToMany(mappedBy = "files")
//    private List<AgreementFiles> agreementFiles;
//    @ManyToOne()
//    @JoinColumn(name="agreement_id")
//    private Agreement agreement;
}
