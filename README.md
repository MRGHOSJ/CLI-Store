# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Setting Up Electron + React on Ubuntu

If you have a clean Ubuntu installation and want to run your Electron + React project in development mode, follow these steps to install the required dependencies:

### 1️⃣ Install Basic Dependencies
First, update your package lists and install essential system dependencies:

```sh
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential libssl-dev libx11-dev \
                    libxkbfile-dev libsecret-1-dev libgtk-3-dev \
                    libnss3 libasound2
```

### 2️⃣ Install Node.js and Yarn
#### Option 1: Install Node.js via Nodesource (Recommended)
Install the latest LTS version of Node.js (Electron prefers LTS versions).

```sh
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```sh
node -v
npm -v
```

#### Option 2: Install via NVM (If you want multiple Node.js versions)
```sh
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### 3️⃣ Install Yarn (Package Manager)
Electron projects often use Yarn instead of npm for better performance.

```sh
npm install -g yarn
```

Verify:
```sh
yarn -v
```

### 4️⃣ Install Electron & Dependencies
Navigate to your project folder:

```sh
cd /path/to/your/project
yarn install
```

This will install all the dependencies listed in package.json.

### 5️⃣ Enable GPU Acceleration (Fix Electron Issues)
Some Electron apps may fail due to missing libraries. Fix it by installing:

```sh
sudo apt install -y libdrm2 libgbm1 libxrandr2 libxcursor1 libxinerama1 libxi6
```

### 6️⃣ Run Your Project in Development Mode
Start the React frontend:

```sh
yarn start
```

Start Electron in development mode:

```sh
yarn electron
```

OR run both simultaneously:

```sh
yarn start:both
```

### 7️⃣ Debug Issues
If you face errors, check:
- Missing dependencies → `yarn install`
- Node version mismatch → `node -v` and update if needed
- Permission issues → Run `sudo chown -R $USER:$USER ~/.npm ~/.config ~/.cache`


