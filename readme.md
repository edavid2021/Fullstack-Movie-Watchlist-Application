# Setup
* <span style="font-size: 16pt;"><b>Local Implementation</b></span>
  * In order to run this application on your local machine, you must first clone the main branch or download the files to your VSC. Afterwards, you must have 2 different terminals opened, 1 for backend and another for the frontend.
    * Backend terminal: make sure you cd into the backend folder ("cd backend") and run the studentserver file ("node studentserver"), you may need to install axios if you do not have it installed ("npm install axios").
    * Frontend terminal: make sure you cd into the frontend folder ("cd frontend -> cd hw9-students-react") and run the react file ("npm start"), you may need to install react-scripts if you do not have it installed ("npm install react-scripts")
  * (**NOTE**)  you MUST have npm installed for this NodeJS app
 
* <span style="font-size: 16pt;"><b>Non-Local</b></span>
  * This app can also be used by going to the heroku deployment link @ 
https://movie-app-group20.herokuapp.com/

# How To Use


## When the user runs the application they will first be met with the home screen which gives a brief description of the app. In order for the user to make full use of our app they must first register/create or log in to an existing account, they can do this via gmail or simply creating a username and password. Once logged in the user will be able to use new functions displayed on the navbar.

* <span style="font-size: 16pt;"><b>Home</b></span>
  * The home page is the first thing the user sees when they run or open the application. The home page as stated earlier, simply displays a brief description of the app and what it offers.
  
* <span style="font-size: 16pt;"><b>Trending</b></span>
  * In this page the user will be able to see the top trending anime movies currently. Furthermore, on this page the user has the option of adding any movie they see to their watchlist by clicking on the "watchlist" button on the bottom right of the movie card.

* <span style="font-size: 16pt;"><b>Latest</b></span>
  * The "latest" page on the navbar works similarly to the trending page. When selected, the user will be able to see upcoming movies that are yet to be released as well as the most recent ones. On this page the user also has the option of adding an upcoming film to their watchlist by selecting the "watchlist" button.

* <span style="font-size: 16pt;"><b>Search</b></span>
  * In the navbar the user will have the option to look for a particular movie(s) by name. If the user would like to view a dragonball film, they can enter dragonball for example on in the search box and click the green search button. Afterwards, the page will display all movies that have the same or a similar name to what the user inputed.
  
* <span style="font-size: 16pt;"><b>Watchlist</b></span>
  * The Watchlist page is where the user will be able to view all of the movies they have added from the Latest, Trending pages as well as the Search on the navbar. On this page the user has the option to remove movies from their list if they choose. Furthermore, if the user selects any movie's card image it will display not only the details of that particular film, but also the user will be able to leave a personal rating and comment for other would be viewers.
  
* <span style="font-size: 16pt;"><b>Logout</b></span>
  * Lastly, on the navbar the user has the option to log out of their account. When logged out the user will be returned to the Home page and will lose access to all other functionalities besides the home page and log in.
  
  
