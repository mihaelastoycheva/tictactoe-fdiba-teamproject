package com.example.demo.repository;

import com.example.demo.player.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    //same as SELECT * FROM student WHERE name = ?
    //@Query("SELECT p FROM Player p WHERE p.name = ?1")  // same as that below
    Optional<Player> findPlayerByName(String name);
}
