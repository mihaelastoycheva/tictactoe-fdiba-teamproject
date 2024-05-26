package com.example.demo.requests;

public class StartNewGameBody {
    private Integer player1Id;
    private Integer player2Id;
    private boolean symbol;

    public StartNewGameBody(Integer player1Id, Integer player2Id, boolean symbol) {
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.symbol = symbol;
    }

    public boolean isValid() {
        return player1Id != null && player2Id != null;
    }

    public Integer getPlayer1Id() {
        return player1Id;
    }

    public void setPlayer1Id(Integer player1Id) {
        this.player1Id = player1Id;
    }

    public Integer getPlayer2Id() {
        return player2Id;
    }

    public void setPlayer2Id(Integer player2Id) {
        this.player2Id = player2Id;
    }

    public boolean getSymbol() {
        return symbol;
    }

    public void setSymbol(boolean symbol) {
        this.symbol = symbol;
    }
}
