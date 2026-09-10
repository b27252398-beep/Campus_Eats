package com.campuseats.repository;

import com.campuseats.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findFirstByUsername(String username);

    Optional<User> findFirstByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
