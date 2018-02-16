package com.MFAsia.onlineExamSystem.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "teachers")
@Data
public class Teacher implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long teacherId;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User users;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "teachers" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<QuestionsBank> questionBanks;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "teachers")
	private List<QuestionerDefination> questionerDefinations;
}
