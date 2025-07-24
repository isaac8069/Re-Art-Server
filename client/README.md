<img alt="art" src="./src/components/homeComponents/images/readme/readme_header.jpg">

# Re-Art

A fullstack MERN application which allows users to purchase a seasonal subscription service for artwork shipped to their home, curated to the user's unique selection of art categories.

## Tech stack

MongoDB, Express, React, Node, Stripe API

## Styling

<img alt="design" src="./src/components/homeComponents/images/readme/design_inspo.png">

## User flows

- From the home page:
    - Easily log on or sign up
    - See examples of artwork from the collection
    - Learn about the subscription tiers
- Once logged in:
    - Add artwork tags/keywords to my profile that describe my taste in art
    - Experience a smooth checkout process for my artwork order
    - Edit my profile, including artwork tags/keywords, subscription status, and basic information


## Wireframes

<img alt="early wireframes" src="./src/components/homeComponents/images/readme/old_wireframes.png">
<img alt="wireframes final version" src="./src/components/homeComponents/images/readme/final_wireframes.png">

## ERDs for database management

<img alt="wireframes final version" src="./src/components/homeComponents/images/readme/erd.png">

## Timeline of Daily Sprints

1. Planning out features and functionality, developing wireframes, planning data management, create schedule for the week via Trello
2. Individual research/review of previously taught materials/documentations to prepare for project week
3. Finalized project details (especially database details, wireframes, CRUD routes), created version 1 of server, continued researching applicable libraries for front end, uploaded initial project files to Github repo, began working on site components
4. Continued work on site components (primarily having to do with profile, tags, and subscription), modified server repo as needed, worked on Stripe integration in subscription folder, restructured wireframes (see MVP version above)
5. Worked on functionality of creating a new profile and sending data to the db, site homepage styling, data creation, added site redirects to reflect our MVP user flow wireframes
6. Modified wireframes and user flow to better work with the current code to make sure we would meet MVP on time. Worked on site styling, existing profile and edit profile. Integrated subscription status into user profile, based on successful checkout. Started researching and testing MongoDB data seeding capabilities.
7. Continued debugging the subscription status in user profile and were able to successfully debug once the edit profile was completely functional. Ran into quite a few git issues later in the day and spent time troubleshooting our branches and main. Site styling continued and adjustments were made for smooth user flows and navigational needs. MVP technically functioning using local database after filtered art page was carefully merged into master.
8. Final styling, seeding data


## Local Setup

- Install the LTS version of node.js from [here](https://nodejs.org/en/)
- In a terminal, clone this repo

```sh
git clone https://github.com/isaac8069/Re-Art-Client.git
```

- Navigate to the repo folder

```sh
cd Re-Art-Client
```

- Install the project dependencies:

```sh
npm install
```

- Deploy the project on your local machine

```sh
npm start
```

- On your browser, navigate to localhost3000 and the Re-Art project automatically appears on your locally hosted web page. Here are some project screenshots:
<p align="center">  
  <img alt="Project Preview" src="./src/components/homeComponents/images/readme/screenshot.png" />
</p>

- Part 2 of local installment includes forking and cloning the server repository, found [here](https://github.com/isaac8069/Re-Art-Server)

## Cloud Deployment

The app is also deployed on Heroku and can be accessed [here](https://nodejs.org/en/)

## Contributors

- [Mackenzie Miller](https://github.com/Mackmiller) (Project Manager) - Fullstack Development, UX/UI
- [Isaac Newman](https://github.com/isaac8069) (Git Manager) - Fullstack Development, UX/UI
- [Isaac Waggoner](https://github.com/iwaggoner) - Fullstack Development
- [Michael Kohlberg](https://github.com/mgkdn9) - Fullstack Development
