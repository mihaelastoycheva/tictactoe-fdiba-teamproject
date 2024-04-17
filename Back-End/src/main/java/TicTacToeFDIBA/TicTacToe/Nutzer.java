package TicTacToeFDIBA.TicTacToe;

public class Nutzer {
    String Nutzername;
    String Passwort;

    int Siege = 0;
    int Gleichceit = 0;
    int Verluste = 0;

    void setNameUndPasswort(String Name, String Passwort){
        this.Nutzername = Name;
        this.Passwort = Passwort;
    }

}
