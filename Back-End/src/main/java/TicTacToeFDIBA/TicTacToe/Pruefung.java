package TicTacToeFDIBA.TicTacToe;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;

@WebServlet("/login")
public class Pruefung extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		boolean authenticated = authenticate(username, password);

		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();

		if (authenticated) {
			out.println("Login successful");
		} else {
			out.println("Invalid username or password");
		}
	}

	private boolean authenticate(String username, String password) {
		// Connect to your database
		String url = "jdbc:mysql://localhost:3306/your_database";
		String dbUsername = "your_username";
		String dbPassword = "your_password";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, dbUsername, dbPassword);

			// Prepare and execute the query
			String query = "SELECT * FROM users WHERE username=? AND password=?";
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			pstmt.setString(2, password);
			ResultSet rs = pstmt.executeQuery();

			// If there is at least one row, the user is authenticated
			if (rs.next()) {
				con.close();
				return true;
			}

			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}