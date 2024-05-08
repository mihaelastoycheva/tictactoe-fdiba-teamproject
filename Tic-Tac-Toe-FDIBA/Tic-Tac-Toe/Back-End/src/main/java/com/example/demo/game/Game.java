package com.example.demo.game;

import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Timestamp;
import java.util.HashMap;

@Entity
@Table
public class Game {
    @Id
    @SequenceGenerator(
            name = "game_sequence",
            sequenceName = "game_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "game_sequence"
    )
    private int id;
    private int player1ID;
    private int player2ID;
    private int winnerID;
    private Timestamp startTime;
    //@JdbcTypeCode(SqlTypes.JSON)
    //private JSONObject moves;
    private HashMap<Integer, Character> moves;

    public Game() {
        super();
    }

    public Game(int id) {
        this.id = id;
    }

    public Game(int id, int player1ID, int player2ID) throws JSONException {
        this.id = id;
        this.player1ID = player1ID;
        this.player2ID = player2ID;
        this.startTime = new Timestamp(System.currentTimeMillis());
        this.moves = new HashMap<Integer, Character>();
        for(int i = 1; i <= 9; i++) {
            this.moves.put(i, null);
        }
    }

    public Game(int player1ID, int player2ID) throws JSONException {
        this.player1ID = player1ID;
        this.player2ID = player2ID;
        this.startTime = new Timestamp(System.currentTimeMillis());
        this.moves = new HashMap<Integer, Character>();
        for(int i = 1; i <= 9; i++) {
            this.moves.put(i, null);
        }
    }

    public void makeMove() {

    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPlayer1ID(int player1ID) {
        this.player1ID = player1ID;
    }

    public void setPlayer2ID(int player2ID) {
        this.player2ID = player2ID;
    }

    public void setWinnerID(int winnerID) {
        this.winnerID = winnerID;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setMoves(HashMap<Integer, Character> moves) {
        this.moves = moves;
    }


    public int getId() {
        return id;
    }

    public int getPlayer1ID() {
        return player1ID;
    }

    public int getPlayer2ID() {
        return player2ID;
    }

    public int getWinnerID() {
        return winnerID;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public HashMap<Integer, Character> getMoves() {
        return moves;
    }

    @Override
    public String toString() {
        return "Game{" +
                "id= " + id +
                ", player1ID= " + player1ID +
                ", player2ID= " + player2ID +
                ", winnerID= " + winnerID +
                ", startTime= " + startTime +
                ", moves= " + moves +
                '}';
    }
}

