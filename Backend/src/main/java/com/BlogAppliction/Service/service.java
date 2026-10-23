package com.BlogAppliction.Service;

import com.BlogAppliction.Model.Post;
import com.BlogAppliction.Repository.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class service {

    @Autowired
    repository repo;

    public List<Post> getAll(){
        return repo.findAll();
    }

    public Post getbyid(int id){
        return repo.findById(id).orElseThrow();
    }

    public Post create(Post post){
        return repo.save(post);
    }

    public void delete(int id){

        repo.deleteById(id);
    }

    public Post update(int id , Post post){
        Post pre=repo.findById(id).orElseThrow();

        pre.setTitle(post.getTitle());
        pre.setContend(post.getContend());
        pre.setAuthor(post.getAuthor());

        return repo.save(pre);
    }
}
