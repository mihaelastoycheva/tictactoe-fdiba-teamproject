package com.example.demo.game;

import com.example.demo.player.Player;
import com.example.demo.player.PlayerService;
import com.example.demo.requests.StartNewGameBody;
import com.example.demo.requests.StartNewGameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Timestamp;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/game")
public class GameController {

    private final GameService gameService;
    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }
    @GetMapping
    public List<Game> getGames() {
        return gameService.getGames();
    }

    @PostMapping
    public StartNewGameResponse startNewGame(@RequestBody StartNewGameBody body) {
        Integer newGameId = gameService.startNewGame(body);
        return new StartNewGameResponse(newGameId);
    }

    @GetMapping(path = "{gameId}")
    public Game getGame(
            @PathVariable("gameId") Integer gameId) {
        return gameService.getGame(gameId);
    }

    @PostMapping(path = "{gameId}/move")
    public void makeMove(
            @PathVariable("gameId") Integer gameId,
            @RequestParam Integer playerId,
            @RequestParam Integer position) {
        gameService.makeMove(gameId, playerId, position);
    }

    @GetMapping(path = "{gameId}/connect")
    public void connectToGame(
            @PathVariable("gameId") Integer gameId,
            @RequestParam Integer playerId) {
        gameService.connectToGame(playerId, gameId);
    }
}

