package com.example.demo.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping("/ranking")
    public List<PlayerRank> getRanking() {
        return playerService.getRanking();
    }

    @GetMapping("/{playerId}")
    public Player getPlayer(@PathVariable Integer playerId) {
        return playerService.getPlayer(playerId);
    }

    @PostMapping(path = "/register")
    public void registerNewPlayer(@RequestBody Player player) {
        playerService.addNewPlayer(player);
    }

    @DeleteMapping(path = "/{playerId}")
    public void deletePlayer(@PathVariable("playerId") Integer playerId) {
        playerService.deletePlayer(playerId);
    }

    @PutMapping(path = "/{playerId}")
    public void updatePlayer(
            @PathVariable("playerId") Integer playerId,
            @RequestParam(required = false) String name) {
        playerService.updatePlayer(playerId, name);
    }
}
