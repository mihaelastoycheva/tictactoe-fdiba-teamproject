package com.example.demo.player;

import com.example.demo.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public void addNewPlayer(Player player) {
        Optional<Player> playerOptional = playerRepository.
                findPlayerByName(player.getName());
        if (playerOptional.isPresent()) {
            throw new IllegalStateException("Name is taken! Choose a different one!");
        }
        playerRepository.save(player);
    }

    public void deletePlayer(Integer playerId) {
        boolean playerExists = playerRepository.existsById(playerId);
        if(!playerExists) {
            throw new IllegalStateException("Player with id " + playerId + " does not exist!");
        }
         playerRepository.deleteById(playerId);
    }

    @Transactional
    public void updatePlayer(Integer playerId, String name) {
        Player player = playerRepository.findById(playerId).
                orElseThrow(() -> new IllegalStateException(
                        "Player with id " + playerId + " does not exist!"));
        if(name != null &&
                name.length() > 0 &&
                !player.getName().equals(name)) {
            Optional<Player> playerOptional = playerRepository.findPlayerByName(name);
            if(playerOptional.isPresent()) {
                throw new IllegalStateException("Player name " + name + " is taken! Choose a different one!");
            }
            player.setName(name);
        }
    }
}
