package com.example.demo.repository;

import com.example.demo.player.Player;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface PlayerRepository {

    @Select("SELECT * FROM player WHERE id = #{player1Id}")
    Player getPlayerById(Integer player1Id);

    @Insert("INSERT INTO player (\"name\", password_hash) VALUES (#{name}, #{passwordHash})")
    void insertPlayer(Player player);

    @Update("UPDATE player SET gamesPlayed = gamesPlayed + 1 WHERE id = #{playerId}")
    void incrementGamesPlayed(Integer playerId);

    @Update("UPDATE player SET gamesWon = gamesWon + 1 WHERE id = #{playerId}")
    void incrementGamesWon(Integer playerId);

    @Select("SELECT * FROM player WHERE \"name\" = #{name}")
    Player findPlayerByName(String name);

    @Select("DELETE FROM player WHERE `id` = #{playerId}")
    void deleteById(Integer playerId);

    @Update("UPDATE player SET \"name\" = #{name} WHERE id = #{playerId}")
    void updatePlayerName(String name, Integer playerId);

    @Select("SELECT * FROM player")
    List<Player> getAll();
}
