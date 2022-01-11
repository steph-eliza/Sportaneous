# Northcoders Final Project - Sportaneous

## Description

Sportaneous is a social app for Android and IOS made to connect people looking to get into sporting events in their local area. The aim is aimed towards people who are looking to expand their range of activities, organise events requiring multiple people, or just meet new people in a fun environment!

## Technologies

The technologies used in this project include: React Native, Expo, and Typescript, as well as Firebase Auth and Firestore.

## Installation

**_This project requires node version 17.2.0, as well as a mobile device running Android 10+ or IOS 11+, Expo Go, and with QR code reading capabilities._**

As the app requires specific API keys and is not currently hosted there is not a live version to link to here at this time, but this may be possible in the future!

For now, if you would like to check out this project, the following presentation includes a run-through of app functionality and the development process:

> https://www.youtube.com/watch?v=E7k8uKvwgKc

# App Functionalities

## Event List

The page containing the list of all events hosted by users of the app. Here users can:

- Filter the events list by category
- Go to an event's details page by tapping an entry in the list
- Refresh the list to fetch new events

## Single Event Page

The details for any given single event. Here users can:

- View more details about the event
- Request to join an event and wait to be approved by the event host ( if the current user **_is not_** the host of the event )
- View a list of requested attendees ( if the current user **_is_** the host of the event )
- Return to the list of events

## Add Event

A form for users to add events that others can join. Requires details such as date, time, location, number of people, and event category.

## User Profile

Details about the currently logged-in user. Here they can:

- See their own profile details and click `Edit Details` to navigate to a page to update them
- See a list of all the events they are: hosting, approved to join, and waiting to be accepted into

For hosted events:

- View a list of pending join requests
- Approve / deny access to their event
- Delete the event from the app

For requested / approved events:

- Cancel event participation

## Chat

A space for users who are participating in the same events to talk and organise before the event begins. Here they can:

- Access individual chat rooms for each event in which they are participating
- Send messages in real-time to other members of that event
- Delete their own messages
