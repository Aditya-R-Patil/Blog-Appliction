package com.BlogAppliction.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Column(length=5000)
    private String contend;
    private String author;
}
