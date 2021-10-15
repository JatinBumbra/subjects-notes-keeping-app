# Code Reactions Assignment - Subject Notes Keeper

Web and mobile apps for keeping subject notes, particularly helpful to students and scholars who want quick and round-the-clock access to thier vital notes.

## Getting Started

### TLDR;

1. Clone the project.

2. Run `yarn` from the root directory.

3. Run following from the root directory -

- `yarn workspace web start` - Runs the web app on localhost:3000.

- `yarn workspace mobile android` - Launches the mobile app on Android. Make sure you have Android studio installed. Otherwise connect your Android device in debug mode.

- `yarn workspace mobile bundle:release` - Bundles the mobile app for release.

- `yarn workspace mobile android:release` - Launches the 'release' variant of the mobile app.

4. Project hosted on Firebase : [https://subjectnoteskeeper.web.app](https://subjectnoteskeeper.web.app).

5. Mobile app only tested for Android.

### Setup

The setup is a monorepo to allow code-sharing. The web and mobile projects were configured to allow the setup to work.

The web uses `react-app-rewired` package to override the `ModuleScopePlugin` in webpack to allow imports outside of `src` directory. It also adds the root of the project to the project build.

For mobile, there are overrides in `metro.config.js` and in `android` directory.

Follow this [link](https://dev.to/brunolemos/tutorial-100-code-sharing-between-ios-android--web-using-react-native-web-andmonorepo-4pej) to view how the to setup monorepo.

### Packages Used

1. `create-react-app` for web.
2. `react-native-cli` for mobile.
3. `firebase` for backend

### Firebase Schema Setup

There is a single `Users` collection which has documents for different users. The doc IDs are hashes of user emails which can be used to reference the document for the user.

```
| Collection | Documents            |                 |
|------------|----------------------|----------------:|
| Users      | user_id (email hash) | {               |
|            |                      |   notes: [],    |
|            |                      |   subjects: [], |
|            |                      |   topics: []    |
|            |                      | }               |
```

Advantage is that querying is easy and data of each user is independent of each other.

#### What's not implemented

Loader and Error Handling
