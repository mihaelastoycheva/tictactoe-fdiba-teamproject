package com.example.demo.game;

import com.example.demo.player.Player;
import com.example.demo.repository.GameRepository;
import com.example.demo.repository.PlayerRepository;
import com.example.demo.requests.StartNewGameBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Supplier;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private PlayerRepository playerRepository;

    List<Game> getGames() {
        return gameRepository.getGames();
    }

    Integer startNewGame(StartNewGameBody body) {
        if (!body.isValid()) {
            throw new IllegalArgumentException("Player id cannot be null!");
        }

        if (playerRepository.getPlayerById(body.getPlayer1Id()) == null) {
            throw new IllegalArgumentException("This player does not exist!");
        } else if (playerRepository.getPlayerById(body.getPlayer2Id()) == null) {
            throw new IllegalArgumentException("This player does not exist!");
        }

        Game game = new Game(body.getPlayer1Id(), body.getPlayer2Id(), body.getSymbol());
        gameRepository.insertGame(game);

        return game.getId();
    }

    void connectToGame(Integer playerId, Integer gameId) {
        Game game = gameRepository.getGameById(gameId);
        if (game == null) {
            throw new IllegalArgumentException("This game does not exist!");
        }

        if (game.getPlayer2Id() != null) {
            throw new IllegalStateException("This game has already 2 players!");
        }

        Player player = playerRepository.getPlayerById(playerId);
        if (player == null) {
            throw new IllegalArgumentException("This player does not exist!");
        }

        gameRepository.setPlayer2(player.getId(), gameId);
    }

    Game getGame(Integer gameId) {
        Game game = gameRepository.getGameById(gameId);

        if (game == null) {
            throw new IllegalArgumentException("This game does not exist!");
        }

        return game;
    }

    @Transactional
    void makeMove(Integer gameId, Integer playerId, Integer position) {
        if (position < 1 || position > 9) {
            throw new IllegalArgumentException("This position is invalid!");
        }

        Player player = playerRepository.getPlayerById(playerId);
        Game game = gameRepository.getGameById(gameId);
        if (player == null || game == null) {
            throw new IllegalArgumentException("Missing game and/or player!");
        }

        game.makeMove(playerId, position);
        gameRepository.updateBoard(game.getBoardString(), game.getId());
        gameRepository.updateState(game.getGameState(), game.getId());
        if (game.getGameState() != Game.GameState.ONGOING) {
            playerRepository.incrementGamesPlayed(game.getPlayer1Id());
            playerRepository.incrementGamesPlayed(game.getPlayer2Id());

            if (game.getGameState() == Game.GameState.PLAYER1_WON) {
                playerRepository.incrementGamesWon(game.getPlayer1Id());
            } else if (game.getGameState() == Game.GameState.PLAYER2_WON) {
                playerRepository.incrementGamesWon(game.getPlayer2Id());
            }
        }
    }

}
