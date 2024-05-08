package com.example.demo.game;

import com.example.demo.player.Player;
import com.example.demo.player.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Timestamp;
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
    public void startNewGame(@RequestBody Game game) {
        gameService.startNewGame(game);
    }
}

