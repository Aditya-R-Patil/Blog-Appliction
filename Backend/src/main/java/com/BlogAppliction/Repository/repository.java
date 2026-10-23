package com.BlogAppliction.Repository;

import com.BlogAppliction.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repository extends JpaRepository<Post , Integer> {
}
