# Student Complaint System

A simple web application for students to submit and view complaints.

## Technologies Used
- **Backend**: C# with ASP.NET Core 8.0 (Web API)
- **Frontend**: HTML5, CSS3, and Vanilla JavaScript
- **Storage**: In-memory storage (No database required)

## Features
- Submit a complaint with student name, ID, subject, and description.
- View all submitted complaints in a real-time table.
- Delete complaints from the list.
- Responsive and clean user interface.

## How to Run
1. Ensure you have the [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) installed.
2. Open a terminal in the project root directory.
3. Run the following command:
   ```bash
   dotnet run
   ```
4. Open your browser and navigate to `http://localhost:5000` (or the port shown in the terminal).

## Project Structure
- `Controllers/ComplaintController.cs`: Handles API requests.
- `Models/Complaint.cs`: Defines the complaint data structure.
- `wwwroot/`: Contains the frontend assets (HTML, CSS, JS).
- `Program.cs`: Configures the web server and middleware.
