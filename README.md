# uShare - Easy File Sharing App

uShare is a simple and lightweight web application that allows you to easily share files with anyone. With uShare, you can upload a file, generate a shareable link that is valid for 24 hours, and optionally send an automated email containing the download link to the recipient. The app is built using Node.js and utilizes various libraries for its functionality.

#### This is just the backend for frontend check the repository: `https://github.com/uttamkamar/ushare-backend.git`

## Features

- Upload files up to 100MB in size.
- Generate shareable links that expire after 24 hours.
- Send download links via email to recipients.
- Simple and intuitive user interface.
- Built-in styling using CSS.

## Dependencies

- `cors`: ^2.8.5
- `dotenv`: ^16.3.1
- `ejs`: ^3.1.9
- `express`: ^4.18.2
- `mongoose`: ^7.4.2
- `multer`: ^1.4.5-lts.1
- `nodemailer`: ^6.9.4
- `uuid`: ^9.0.0

## Development Dependencies

- `nodemon`: ^3.0.1

## Installation

1. Clone the repository: `git clone https://github.com/uttamkamar/ushare-backend.git`
2. Navigate to the project directory: `cd ushare`
3. Install dependencies: `npm install`

## Usage

1. Start the application: `npm start` or `npm run dev` (with nodemon)
2. Open your browser and navigate to `http://localhost:3000`

## Configuration

1. Create a `.env` file in the root directory based on the `.env.example` template.
2. Set your environment variables in the `.env` file, including email configurations, MongoDB connection, etc.

## Contributing

If you'd like to contribute to uShare, feel free to submit a pull request. We welcome contributions!

## Credits

This file share component was created by uttam and is distributed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

We hope you find this app useful for sharing files! If you have any questions or need further assistance, please don't hesitate to reach out at `support@digitaluttam.com`

Happy coding! 🚀
