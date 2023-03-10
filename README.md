# CampCircle 

A Node. js Web Application

## Demo
https://camp-circle.cyclic.app/campgrounds <br>
https://campcircle.onrender.com/campgrounds

## Installation

* [Node](https://nodejs.)
* [MongoDB](https://www.mongodb.com/download-center)
  
  * [MLab](https://mongolab.com) (Alternative to downloading MongoDB locally)
see the [docs](https://docs.mlab.com/)

``` 
npm install
```
this will install all the necessary packages that you need to run the application. 

>I've used [dot.env](https://www.npmjs.com/package/dotenv) to store the environment variable, So you need to create a **.evn** file once you clone or download the repo.
paste below code into that file

```
# if you're using MLAB replace variable with your MLAB url
DATABASEURL = mongodb://localhost:27017/[your_database_name]
```
## Application Feature

* Authentication
  
  * Users can sign up or login using username and password.
  
  * User can not submit campgrounds if they are not logged in.

* Authorization 
 
  * User can only modify campgrounds created by them.

* User Profile

  * Every registered user has profile where all his submitted campgrounds are shown.
  
* Basic Functionality

  * Add Name, Image and Description to the campground.

  * Create, Update, Delete the Campground.

  * Add comments to campgrounds.

  * Flash Important messages to warn or gree the users.

  * Responsive Web design.


## Built with 

### Front end

* [Bootstrap 5.0](https://getbootstrap.com)

* [ejs](https://ejs.co/)

### Back End

* [Node. js](https://nodejs.org)

* [Express. js](https://expressjs.com)

* [MongoDB](https://www.mongodb.com/)

* [mLAB](https://mlab.com)

* [mongoose](http://mongoosejs.com/)

* [passport](http://www.passportjs.org/)

* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)

* [express-session](https://github.com/expressjs/session#express-session)

* [method-override](https://github.com/expressjs/method-override#method-override)

* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

* [dotenv](https://www.npmjs.com/package/dotenv)

* [body-parser](https://www.npmjs.com/package/body-parser)

* [connect-mongo](https://www.npmjs.com/package/connect-mongo)

### Text Editor

* [Visual Studio Code](https://code.visualstudio.com/)
