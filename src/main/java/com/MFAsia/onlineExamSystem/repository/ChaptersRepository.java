package com.MFAsia.onlineExamSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.MFAsia.onlineExamSystem.entities.Chapter;

public interface ChaptersRepository extends JpaRepository<Chapter, Long>{

	@Query("select c from Chapter c where c.books.bookId = :bookId")
	public List<Chapter> findAllChaperByBookId(@Param ("bookId") Long bookId);

}
