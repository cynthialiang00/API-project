# SpringBnB
SpringBnb is an Airbnb clone with a Japanese Onsen theme that provides all the basic functionality, 
such as user authentication, navigation, and real-time website rendering based on user input. 
This initial iteration of SpringBnb includes two features:

Check out [SpringBnb](https://cynthia-new-auth-me.onrender.com/)!

<br/>

## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br />

##OVERVIEW

###LANDING PAGE
<img width="1470" alt="landing" src="https://user-images.githubusercontent.com/118590381/226367297-bb5e1896-3eb3-4f5f-85ec-201ccc0fe56c.png">


###SPOT DETAILS PAGE

<img width="1470" alt="details" src="https://user-images.githubusercontent.com/118590381/226367562-64598204-f7f2-4e7f-b837-cdb754ea75f2.png">


###MANAGE SPOTS IF LOGGED IN
<img width="1470" alt="manage" src="https://user-images.githubusercontent.com/118590381/226367740-f57be1c6-7caa-495b-93cd-77ecd63ffcce.png">

###WRITE A REVIEW
<img width="1469" alt="Screen Shot 2023-05-07 at 3 35 28 PM" src="https://user-images.githubusercontent.com/118590381/236705799-af9c17f0-9a02-441a-8692-fcb89591bb0d.png">

<br/>

## HOW TO RUN SERVER LOCALLY

1. Clone the repository from github on branch 'main'
2. Install dependencies in the root project directory.
```bash
npm start
```
3. In the backend folder, Create a .env file using the .envexample provided.

4. In the backend folder, run the following commands to migrate and seed your database.
```bash
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

* NOTE: to reset the database you can run
```bash
npx dotenv sequelize db:seed:undo:all
```

5. Start the app for the backend in the backend folder. Start the app for the frontend in the frontend folder. Both need to be running for the site to run locally.
```bash
npm start
```
<br/>



# Features 

## Spots
* Users can upload a Spot
* Users can read/view other Spots
* Users can edit their Spots
* Users can delete their Spots

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot



## Future Features
## Bookings
### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api 



