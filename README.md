# Ellora

## Overview
Ellora is a Node.js based blog application that let's people log their day-to-day activities. This project is still undergoing development and we're in the alpha stage now.

## Features
- Make a post
- Delete a post
- Edit a post

## Goals
- Short-term
    - Login/Signup functionalities.
    - Modify replies.
    - Edited tags for edited contents. (special tags for admin edits)
    - Invitations.
    - Real-time updates for the reply count tag.
    - Media support in posts.
    - Hosting the site.

- Long-term
    - UI overhaul.
    - Mobile app.
    - AI integration.
    - SOmething a lot cooler..

## Looks
### HomePage
![1](https://github.com/user-attachments/assets/106bb8fe-5c8b-4278-82cb-eb938a5775ec)
### Feed
![2](https://github.com/user-attachments/assets/7012a265-a4f3-4504-908a-0baac2ce9dad)
### Make a new post
![3](https://github.com/user-attachments/assets/892e1da3-c92f-41ab-b0b0-171308bfd20c)
### Reply to a post
![4](https://github.com/user-attachments/assets/dba27703-0db0-43ce-858c-6964730b12aa)
### Modify a post
![5](https://github.com/user-attachments/assets/c66a42a5-6577-4daa-928f-2e33b0fb071f)    
### Editing a post
![6](https://github.com/user-attachments/assets/0c302317-bcc7-451e-ba9f-bf96372abb25)

## Installation

### Requirements
- npm
- nodemon
- ejs
- express
- method-override
- mongoose

Follow these steps to locally host Ellora in your network
```bash
git clone https://github.com/dawn-boy/sites
npm install
nodemon
```
## Project Structure

```
Ellora
│   index.js                # Entry point for the app. Defined all the routes here
│   package.json            # Requirements
│
└───node_modules/           # project modules
│
└───public/                 # .css and .js files
│   └───css/
│   │   │   *.css
|   └───js/
│   │   │   *.js
|
└───views/                  # .ejs files
│    │   edit.ejs
│    │   home.ejs
│    │   index.ejs
│    │   post.ejs
│    │   reply.ejs
│    │   show.ejs
│    │
│    └───partials/          # recurring ejs codes are referenced from here
│    │   │   foot.ejs
│    │   │   head.ejs
│    │   │   navbar.ejs
```
