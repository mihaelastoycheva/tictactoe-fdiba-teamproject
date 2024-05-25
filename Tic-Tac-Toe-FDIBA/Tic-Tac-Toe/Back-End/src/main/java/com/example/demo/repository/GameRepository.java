package com.example.demo.repository;

import com.example.demo.game.Game;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GameRepository {

    @Select("SELECT * FROM game WHERE id = #{gameId};")
    Game getGameById(Integer gameId);

    @Select("SELECT * FROM game;")
    List<Game> getGames();

    @Insert("INSERT INTO game (player1Id, player1Symbol, startTime, boardString, gameState) VALUES (#{player1Id}, #{player1Symbol}, #{startTime}, ',,,,,,,,', #{gameState})")
    @Options(keyProperty = "id", keyColumn = "id", useGeneratedKeys = true)
    void insertGame(Game game);

    @Update("UPDATE game SET boardString = #{boardString} WHERE id = #{gameId}")
    void updateBoard(String boardString, Integer gameId);

    @Update("UPDATE game SET player2Id = #{player2Id} WHERE id = #{gameId}")
    void setPlayer2(Integer player2Id, Integer gameId);

    @Update("UPDATE game SET gameState = #{gameState} WHERE id = #{gameId}")
    void updateState(Game.GameState gameState, int gameId);
}
