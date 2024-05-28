package com.example.demo.requests;

public class StartNewGameResponse {
    private Integer gameId;

    public StartNewGameResponse(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getGameId() {
        return gameId;
    }
}
