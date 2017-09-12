# Gabble

Gabble is a social media site that is similar to Twitter. It allows users to sign-up, log-in, and post messages (Gabs) for everyone to see that are 140 characters or less. Users are able to like other Gabs or delete Gabs that they have posted.
I created this project during my time at The Iron Yard coding bootcamp.

## Screenshots

![Login page](/screenshots/screenshot-login.png)

![Sign-Up page](/screenshots/screenshot-register.png)

![Home page after Login](/screenshots/screenshot-home.png)

![Post a new Gab](/screenshots/screenshot-postgab.png)

## Getting Started

### Installation
```
git clone https://github.com/alexhmontgomery/gabble-app
cd gabble-app
npm install
npm start
```

## Built With
* Node.js - server side language
* Express - web framework for Node
* Mustache - template engine
* PostgresQL - database management system

## Development Notes
This was the first full stack project that I built using an object relational database. I had to learn how to handle the associations between multiple tables. I had to manage the one-to-many relationships of users to gabs and gabs to likes. 
