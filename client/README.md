## /gsites-components/client

Testing display of all related content based on a URL query string.

## Requirements

1. Windows, Linux or Mac OS
2. NodeJS LTS v16.14.2

### Core Libraries/Frameworks

1. NextJS v13.0.4
2. React 18.2.0

### Online Demo

#### Production App
https://weaponsforge.github.io/gsites-components/

#### Development App
https://climate-profile-dev.web.app/

```
EXAMPLE USER (Development App Only)
email: user@gmail.com
password: useruser
```

## Installation

1. Install dependencies.<br>
`npm install`

2. Set up the environment variables. Create a `.env`, `.env.local` and a `.env.development` files inside the root project directory with reference to the `.env.example` file.<br>

   | Variable Name | Description |
   | --- | --- |
   | NEXT_PUBLIC_BASE_PATH                   | Root directory path name that NextJS uses for assets, media and client-side routing for the app.<br><br>Set its value to blank `''` when working on development mode in localhost.<br><br>Set its value to the sub-directory name where the exported NextJS app is to be deployed, i.e. `/<YOUR_REPOSITORY_NAME>` when<br> deploying on a repository (sub-directory) of a root GitHub Pages site, i.e, on `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>` |
   | NEXT_PUBLIC_FIREBASE_WEB_API_KEY        | Firebase web API key from the Firebase Project Settings configuration file. |
   | NEXT_PUBLIC_FIREBASE_WEB_AUTHDOMAIN     | Firebase web auth domain key from the Firebase Project Settings configuration |
   | NEXT_PUBLIC_FIREBASE_WEB_PROJECT_ID     | Firebase web project ID from the Firebase Project Settings configuration file. |
   | NEXT_PUBLIC_FIREBASE_WEB_STORAGE_BUCKET | Firebase web storage bucket key from the Firebase Project Settings configuration file. |
   | WATCHPACK_POLLING | Enables hot reload on NextJS apps (tested on NextJS v13.2.1) running inside Docker containers on a Windows host. Set it to `true` if running Docker Desktop with WSL2 on a Windows OS. |

3. Update the `.firebaserc` file.
   - Replace all instances of the `FIREBASE_PROJECT_DEV` text with the **development** Firebase project ID.
   - Replace all instances of the `FIREBASE_PROJECT_PROD` text with eth **production** Firebase project ID.
   - Replace the `FIREBASE_HOSTING_DEV` text with the **development** Firebase Hosting website name (minus the `".web.app"`)

> [!WARNING]
> Do not commit the updates in the `.firebaserc` file, if you plan on deploying updates using GitHub Actions.<br>
> Do the following to avoid commiting local updates in the `.firebaserc` file:
> - Ignore local changes to the file.<br>
> `git update-index --assume-unchanged .firebaserc`
> - Revert/start tracking later if needed.<br>
> `git update-index --no-assume-unchanged .firebaserc`

3. Switch to the **dev** Firebase target.<br>
`firebase use dev`

4. Deploy the **Firestore Security Rules** defined in the `"firestore.rules"` file using the Firebase CLI.<br>
`firebase deploy --only firestore:rules`

5. Deploy the **Firestore Indexes** defined in the `"firestore.indexes.json"` file using the Firebase CLI.<br>
`firebase deploy --only firestore:indexes`

6. Deploy the **Firebase Storage Security** Rules defined in the `"storage.rules"` file using the Firebase CLI.<br>
`firebase deploy --only storage`

7. Deploy the local website in the `"/out"` directory to **Firebase Hosting** using the Firebase CLI.<br>
   - (build) `npm run export`
   - (deploy) `firebase deploy --only hosting:dev`

8. Switch to the **prod** Firebase target.<br>
`firebase use prod`

9. Repeat from **step # 4 - 6**.

## Usage

1. Run the app in development mode.<br>
`npm run dev`

2. Launch the development website from:<br>
`http://localhost:3000`

3. Check for lint errors.
   - `npm run lint` (check lint errors)
   - `npm run lint:fix` (fix lint errors)

4. Export the static website.<br>
`npm run export`

@weaponsforge<br>
2022112
