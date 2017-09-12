# Gabble

Gabble is a social media site that is similar to Twitter. It allows users to sign-up, log-in, and post messages (Gabs) for everyone to see that are 140 characters or less. Users are able to like other Gabs or delete Gabs that they have posted.
I created this project during my time at The Iron Yard coding bootcamp.

## Screenshots

![Login page](/screenshots/screenshot-login.png)

![Sign-Up page](/screenshots/screenshot-register.png)

![Home page after Login](/screenshots/screenshot-home.png)

![Post a new Gab](/screenshots/screenshot-postgab.png)

## Getting Started

### Prerequisites

This script was designed using Python 2.7. If using Python 3.0 or above, adjustments will be necessary.

### Installation
```
git clone https://github.com/alexhmontgomery/gabble-app
cd gabble-app
npm install
npm start
```

## Instructions

### Editing the test parameters

The script is set up to determine if 'active labor' has been entered by whether or not the 5-1-1 Rule has occurred. This is a standard rule used by many hospitals to help expecting parents determine if they are in 'active labor'. The rule states that contractions must be at least 1 minute in duration, occurring at a frequency of 5 minutes (or less) for at least one hour.

If you wish to adjust these default parameters, you can change the variable test settings in the script. The test parameters on lines 15-18 (below) would need to be changed if you wish to adjust the settings for 'active labor'.

```
#For 5-1-1, testContraction = 60
testContraction = 60
#For 5-1-1, testFrequency = 300
testFrequency = 300
#For 5-1-1, testRange = 3600
testRange = 3600
```
