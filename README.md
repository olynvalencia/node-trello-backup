# node-trello-backup
This is a small node script that utilizes [node-trello](https://www.npmjs.com/package/node-trello) npm package to automatically export all boards visible to the authenticated user.

### Pre-requisites
1. Node and npm should already be installed
2. Install application dependencies. Execute `npm install` while inside the application directory.
3. Generate [Trello API Key](https://trello.com/app-key).
4. Obtain an authorization key by pointing your browser to the following URL: `https://trello.com/1/connect?key=[API_Key]&name=NodeTrelloBackup&response_type=token&expiration=never`.

### Usage
Execute script with the following command: `node app <Trello API Key> <Trello Token>`
