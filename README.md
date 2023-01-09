# Meet Up

This project was developed in Young adessi training at Adesso Turkey.
Used technologies;

* MSSQL and MongoDB are used as databases. 
* Backend uses .NET and Node.js.
* Frontend use React.
* Used Docker-Compose.

Feature in the project;

* Register and log in.
* Adding, updating, deleting event.
* View Detail Event.
* Adding or removing an event from favorites.
* Join or unjoin to event.

## Running Project with Docker-Compose
 To run a project with Docker Compose, you will need to have Docker installed on your machine. Once you have Docker installed, you can use the following steps to run your project:
 
 * Clone the repository.
 * Create a .env file Node folder and add variable.  
    * PORT,   
    * MONGO_URL,  
    * MONGO_DB_NAME,   
    * HASH_KEY,   
    * JWT_SECRET_KEY  
* Run the **"dotnet ef update database"** command for migration operations in mssql. (MeetUp.Data)
* Build and start the containers: **"docker-compose up --build -d"**
 

