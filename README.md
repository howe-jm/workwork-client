# Welcome to WorkWork!

Hello!

WorkWork is the culmination of all my knowledge so far on creating a full-stack webapp using the PERN stack; PostgreSQL, Express, React, and Node!

WorkWork is an app that will help its users keep track of two very important parts of the post-graduate process: Job leads, and ongoing study. It does so in a familiar, user-friendly, card-based format that allows users to create new cards for jobs and study materials, add to, edit, or comment on them, as well as keep track of the various steps they've taken toward their goals with that particular job or study material.

Read on for more information, as well as instructions for deploying this app.

## Why WorkWork Exists

Prior to creating this app, I was on my own when it came to keeping track of jobs I'm interested, and in study materials. My main tools for doing so were a GoogleDocs spreadsheet, and Chrome bookmarks. That's it! I saw a need, even if it was just my own, and created an app to help satisfy that need. Here are the details!

### Track Your Career Search

WorkWork tracks jobs with cards, similar to those you may have seen on other sites like Trello or Google Projects. The difference is that WorkWork allows for a lot more information to be added to and tracked within those cards, including other cards (e.g. contacts for a particular job opportunity), and relevant events! It's as easy as creating a new card, filling out the information about the job when prompted, commenting on it if you'd like, and adding relevant information as you progress. This way, you can see when you made your last outreach call, for example, or recall whether you sent a recently revised resume to your potential employer by checking dates.

### Never Stop Learning

Equally as important as tracking job leads, if not moreso, keeping tabs on your ongoing learning and projects is important to your success as a developer! Using study cards, you can keep tabs on training material and even a broad overview of any projects you've been working on. Knowing when you last coded just for fun or practice can be important for keeping up to date on your skills, new interests, or portfolio projects, and WorkWork makes it quick and easy to do so.

## Useful Links

WorkWork was designed function as a client dependent on an API server, and as such, requires both ends to be completely functional. Here are the links to the repositories, and a live version of the app:

WorkWork Client Repository: https://github.com/howe-jm/workwork-client

WorkWork API Repository: https://github.com/howe-jm/workwork-api

Live App: https://workwork-client.vercel.app/

## Screenshots

### Mobile:

![Mobile Screenshot 01](https://github.com/howe-jm/workwork-api/blob/main/screenshots/mobile-01-thumb.jpg)
![Mobile Screenshot 02](https://github.com/howe-jm/workwork-api/blob/main/screenshots/mobile-02-thumb.jpg)
![Mobile Screenshot 03](https://github.com/howe-jm/workwork-api/blob/main/screenshots/mobile-03-thumb.jpg)

### Desktop:

![Desktop Screenshot 03](https://github.com/howe-jm/workwork-api/blob/main/screenshots/desktop-03-thumb.jpg)
![Desktop Screenshot 02](https://github.com/howe-jm/workwork-api/blob/main/screenshots/desktop-02-thumb.jpg)
![Desktop Screenshot 01](https://github.com/howe-jm/workwork-api/blob/main/screenshots/desktop-01-thumb.jpg)


## WorkWork Client

### How To Use WorkWork

#### First, create a new user account, or choose to view an existing user account.

Note that this version of the app is more of a 'proof of concept,' though it is essentially fully functional. Any user account you create or view is viewable to anybody else who accesses the app! Consider all information to be public.

For the time being, it is suggested to use fake names, numbers, etc. to test out the app, or run it locally if you wish to make use of it privately.

Eventually, this app will support fully secure user accounts, and all data will be private.

#### View and Manipulate Job/Study Cards

Both sets of cards operate in the same manner; Study cards are functionally the same as Jobs cards, but without additional contact information.

Viewing cards is simple: Each card starts out collapsed. Click the down arrow in the lower left corner to expand the card, exposing all of its information. You'll see contacts, events, and comments for job cards, and events and comments for study cards! Each section starts expanded, but clicking on the arrow on the left side of the section will collapse it, if desired.

Contacts can be changed at will: Simply click the pencil icon on the bottom of each contact to edit it, to add an e-mail address or change the phone number, for example. When finished, click the floppy disk icon to save changes.

Comments can be added or edited as you please, and you will be notified beneath the text field whether your comments are saved or unsaved. To save them, click the floppy disk icon under the text field.

To delete contacts or events, click the trash can icons beneath them. For entire cards, this icon is in the title area. Note that there is no confirmation for this process (yet!) and it is unreversable (for now!).

You can use the navigation bar on the left (desktop) or top (mobile) to switch card views, or to change users.

## Deploying the App

### Development

1. Download and deploy the API using the instructions in its README.md. It is located at: https://github.com/howe-jm/workwork-api
2. Clone this repository and change to its directory: `git clone URL/SSH workwork-client && cd $_`
3. (a) If you're not a contributor on the main repository, reinitialize the .git: `rm -rf .git && git init`
4. (b) If you are a contributor, please create a new branch before making any changes!
5. Install dependencies: `npm install`
6. Update the API_ENDPOINT variable in config.js, and the .env if using an API key.
7. Run the app in development mode: `npm start`

### Testing

Very basic smoke tests are in place. Run them with `npm t`

### Deploying live

1. Build the app for deployment `npm run build`
2. Deploy the app to a webserver.

-OR-

1. Link your github repository with Vercel.
2. Deploy the app to Vercel.
3. Simply push changes to your repo, and Vercel will pull and deploy the updated code.
