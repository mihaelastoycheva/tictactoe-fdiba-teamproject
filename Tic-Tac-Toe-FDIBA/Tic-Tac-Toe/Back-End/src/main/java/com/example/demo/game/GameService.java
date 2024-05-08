package com.example.demo.game;

import com.example.demo.player.Player;
import com.example.demo.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getGames() {
        return gameRepository.findAll();
    }

    public void startNewGame(Game game) {
        //to do...
    }

//    public void connectToGameIfPresent(Game game) {
//        Optional<Game> gameOptional = gameRepository.
//                findGameById(game.getId());
//        if (!gameOptional.isPresent()) {
//            throw new IllegalStateException("Game with id " + game.getId() + " does not exist!");
//        }
//        gameRepository.save(game); ------------------------------
//    }

}
