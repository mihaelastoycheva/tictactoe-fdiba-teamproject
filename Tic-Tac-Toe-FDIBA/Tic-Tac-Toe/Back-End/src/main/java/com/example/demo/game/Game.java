package com.example.demo.game;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;
import java.util.Arrays;

public class Game {

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

    public enum GameState {
        ONGOING,
        TIE,
        PLAYER1_WON,
        PLAYER2_WON
    }

    private Integer id;
    private Integer player1Id;
    private Integer player2Id;
    private boolean player1Symbol; // X = true, O = false
    private Timestamp startTime;

    private GameState gameState;

    private Integer[] board; // X = 1, O = 0

    public Game() {
        super();
    }

    public Game(Integer player1Id, Integer player2Id, boolean symbol) {
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.gameState = GameState.ONGOING;
        this.startTime = new Timestamp(System.currentTimeMillis());
        this.player1Symbol = symbol;
        this.board = new Integer[9];
        for(int i = 0; i <= 8; i++) {
            board[i] = null;
        }
    }

    public void makeMove(Integer playerId, Integer position) {
        if (board[position - 1] != null) {
            throw new IllegalStateException("This move is already played!");
        }

        if (playerId.equals(player1Id)) {
            board[position - 1] = player1Symbol ? 1 : 0;
        } else if (playerId.equals(player2Id)) {
            board[position - 1] = player1Symbol ? 0 : 1;
        } else {
            throw new IllegalArgumentException("This player is not part of this game!");
        }
        isGameFinished();
    }

    public void isGameFinished() {
        Integer[][] winCombinations = {
                {1, 2, 3}, {4, 5, 6}, {7, 8, 9}, // Rows
                {1, 4, 7}, {2, 5, 8}, {3, 6, 9}, // Columns
                {1, 5, 9}, {3, 5, 7}             // Diagonals
        };

        for (Integer[] combination : winCombinations) {
            Integer first = combination[0];
            Integer symbol = board[first - 1];
            if (symbol == null) continue; // Skip combination if the first cell is empty
            if (symbol == board[combination[1] - 1] && symbol == board[combination[2] - 1]) {
                if (player1Symbol) {
                    if (symbol == 1) {
                        gameState = GameState.PLAYER1_WON;
                    } else {
                        gameState = GameState.PLAYER2_WON;
                    }
                } else {
                    if (symbol == 0) {
                        gameState = GameState.PLAYER1_WON;
                    } else {
                        gameState = GameState.PLAYER2_WON;
                    }
                }
                return;
            }
        }
        if (isBoardFull()) {
            gameState = GameState.TIE;
        }
    }

    public boolean isBoardEmpty() {
        for (int i = 1; i <= 9; i++) {
            if(board[i] != null) {
                return false;
            }
        }
        return true;
    }

    public boolean isBoardFull() {
        for (int i = 1; i <= 9; i++) {
            if(board[i] == null) {
                return false;
            }
        }
        return true;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPlayer1Id(int player1Id) {
        this.player1Id = player1Id;
    }

    public void setPlayer2Id(int player2Id) {
        this.player2Id = player2Id;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setBoardString(String board) {
        this.board = new Integer[9];
        int boardIndex = 0;
        for (int i = 0; i < board.length(); i++) {
            if (board.charAt(i) == '0' || board.charAt(i) == '1') {
                this.board[boardIndex] = board.charAt(i) - '0';
            } else if (board.charAt(i) == ',') {
                boardIndex++;
            }
        }
    }


    public int getId() {
        return id;
    }

    public Integer getPlayer1Id() {
        return player1Id;
    }

    public Integer getPlayer2Id() {
        return player2Id;
    }

    public Timestamp getStartTime() {
        return startTime;
    }


    @JsonIgnore
    public String getBoardString() {
       StringBuilder stringBuilder = new StringBuilder();
       for (int i = 0; i <= 8; i++) {
           if (board[i] != null) {
               stringBuilder.append(board[i]).append(",");
           } else {
               stringBuilder.append(",");
           }
       }
       stringBuilder.deleteCharAt(stringBuilder.length() - 1);
       return stringBuilder.toString();
    }

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", player1Id=" + player1Id +
                ", player2Id=" + player2Id +
                ", player1Symbol=" + player1Symbol +
                ", startTime=" + startTime +
                ", board=" + Arrays.toString(board) +
                '}';
    }

    public boolean getPlayer1Symbol() {
        return player1Symbol;
    }

    public void setPlayer1Symbol(boolean player1Symbol) {
        this.player1Symbol = player1Symbol;
    }

    public Integer[] getBoard() {
        return board;
    }

    public void setBoard(Integer[] board) {
        this.board = board;
    }
}

