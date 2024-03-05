# Board Verse | A Real Time Collaborative Whiteboard Application

The Whiteboard Application is a collaborative drawing tool that allows users to create and join real-time whiteboard sessions. With a focus on simplicity and user experience, this application enables users to draw using various colors and brush sizes, undo/redo actions, and save the whiteboard content as images or PDFs. The implementation includes secure user authentication using Keycloak, ensuring that only authorized users can access and contribute to whiteboard sessions.

## Key Features

Create and join whiteboard sessions.
Drawing functionality with color and brush size options.
Undo/redo actions for seamless user experience.
Real-time cursor movements for connected users.
Save whiteboard content as images or PDFs.
Responsive design for both desktop and mobile devices.

## Technologies Used

1. React for front-end development.

2. WebSocket, Node Express for back-end development.

3. Keycloak for authentication.

4. Native canvas for drawing capabilities.
   Keycloak via Docker for secure user authentication.

5. Bootstrap 5.0 for a clean and fluidic layout.
   For detailed setup instructions, feature documentation, and screenshots, please refer to the respective sections below.

## Full Demo

[![Draw Verse Demo Video](https://i.imgur.com/3dcebSt.png)](https://youtu.be/iOeDbke1ZrU "Draw Verse Demo Video")

## Setting up the Project

### Keycloak setup

1. Run this Docker commaand to set up Keycloak on your local system

```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.0 start-dev
```

2. Set up the account with the following configuration

```
Keycloak({
  url: "http://localhost:8080",
  realm: "whiteboard-realm-react",
  clientId: "whiteboard-client-react",
});

```

3. Change the Keycloak public key to the `.env` file from your dashboard.

4. Go to `http:localhost:8080` to check whether it is correctly setup or not.

5. Refer to this [Keycloak document](https://www.keycloak.org/getting-started/getting-started-docker) for setup incase of any error.

## Frontend & Backend setup

1. Run this command in your local computer to clone the repo.

```
git clone https://github.com/olifarhaan/board-verse.git

```

2. Open the folder with an IDE (VSCode preferred)

3. Open the terminal and run `cd client` and then `npm i` to install the dependency of the front end

4. Then, open another terminal and run `cd api` and then `npm i` to install the dependency of the backend end

5. Run `npm run dev` on both the terminal

6. Go to `http://localhost:5173`
