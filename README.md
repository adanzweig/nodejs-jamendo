# Music Downloader

A simple Node.js script to download instrumental jazz tracks from the Jamendo API.

## Prerequisites

- [Node.js](https://nodejs.org/)
- A Jamendo API token (you can obtain one from [Jamendo Developer Platform](https://devportal.jamendo.com/))

## Setup

1. Clone the repository:

```bash
git clone https://github.com/adanzweig/nodejs-jamendo.git
cd nodejs-jamendo
```

2. Install required dependencies:

```bash
npm install dotenv
```

3. Create a `.env` file in the root directory and set your Jamendo API token:

```env
JAMENDO_TOKEN=your_api_token_here
```

Replace `your_api_token_here` with your actual Jamendo API token.

## Usage

Run the script:

```bash
node index.js
```

The script will search for an instrumental jazz track on Jamendo and download it as `output.mp3` in the current directory.

## Features

- Retrieves JSON data from the Jamendo API to get track details.
- Downloads tracks with error handling to ensure successful downloads.
- Uses `https` module for API requests and file downloading.
- Uses `fs` module for file stream handling.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.