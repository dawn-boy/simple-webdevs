# Ellora
## Overview
![2](https://github.com/user-attachments/assets/7012a265-a4f3-4504-908a-0baac2ce9dad)
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

## Installation

Follow these steps to locally host Ellora in your network
```bash
git clone https://github.com/dawn-boy/simple-webdevs.git
npm install
npm run start
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
│    │   home.ejs               # home page     (root route)
│    │   index.ejs              # feed page     (index route)
│    │   post.ejs               # create page   (create route)
│    │   edit.ejs               # edit page     (update route)
│    │   show.ejs               # post page     (show route)
│    │   reply.ejs              # reply page    (reply route)
│    │
│    └───partials/          # recurring ejs codes are referenced from here
│    │   │   head.ejs           # linking css files
│    │   │   navbar.ejs         # Ellora head tab
│    │   │   foot.ejs           # footer tabs
```
