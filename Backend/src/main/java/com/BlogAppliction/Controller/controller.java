package com.BlogAppliction.Controller;

import com.BlogAppliction.Model.Post;
import com.BlogAppliction.Service.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("post")
public class controller {

    @Autowired
    private service ser;

    @GetMapping
    public List<Post> getAll(){
        return ser.getAll();
    }

    @GetMapping("/{id}")
    public Post getone(@PathVariable int id){
        return ser.getbyid(id);
    }

    @PostMapping("/")
    public Post create(@RequestBody Post post){
        return ser.create(post);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        ser.delete(id);
    }

    @PutMapping("/{id}")

    public Post update(@PathVariable int id, @RequestBody Post post){
        return ser.update(id,post);
    }
}
