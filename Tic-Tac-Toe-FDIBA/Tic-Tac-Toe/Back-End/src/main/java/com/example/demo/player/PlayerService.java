package com.example.demo.player;

import com.example.demo.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    public Player getPlayer(Integer playerId) {
        return playerRepository.getPlayerById(playerId);
    }

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.getAll();
    }

    public List<PlayerRank> getRanking() {
        return playerRepository.getRanking();
    }

    public void addNewPlayer(Player player) {
        Player existingPlayer = playerRepository.findPlayerByName(player.getName());
        if (existingPlayer != null) {
            throw new IllegalStateException("Name is taken! Choose a different one!");
        }
        playerRepository.insertPlayer(player);
    }

    public void deletePlayer(Integer playerId) {
        Player player = playerRepository.getPlayerById(playerId);
        if(player == null) {
            throw new IllegalStateException("Player with id " + playerId + " does not exist!");
        }
        playerRepository.deleteById(playerId);
    }

    public void updatePlayer(Integer playerId, String name) {
        Player player = playerRepository.getPlayerById(playerId);
        if (player == null) {
            throw new IllegalStateException("Player with id " + playerId + " does not exist!");
        }
        if(name != null &&
                name.length() > 0 &&
                !player.getName().equals(name)) {
            Player existingPlayerWithName = playerRepository.findPlayerByName(name);
            if(existingPlayerWithName != null) {
                throw new IllegalStateException("Player name " + name + " is taken! Choose a different one!");
            }
            playerRepository.updatePlayerName(name, playerId);
        }
    }
}
