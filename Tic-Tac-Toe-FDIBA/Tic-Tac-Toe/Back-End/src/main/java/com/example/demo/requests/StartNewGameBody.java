package com.example.demo.requests;

public class StartNewGameBody {
    private Integer player1Id;
    private boolean symbol;

    public StartNewGameBody(Integer player1Id, boolean symbol) {
        this.player1Id = player1Id;
        this.symbol = symbol;
    }

    public boolean isValid() {
        return player1Id != null;
    }

    public Integer getPlayer1Id() {
        return player1Id;
    }

    public void setPlayer1Id(Integer player1Id) {
        this.player1Id = player1Id;
    }

    public boolean getSymbol() {
        return symbol;
    }

    public void setSymbol(boolean symbol) {
        this.symbol = symbol;
    }
}
