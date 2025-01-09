# alitu-mic-check

Alitu Mic Check is an audio recorder used to check the quality of recordings made in a browser. This can be helpful for users troubleshooting audio quality issues.

Recordings can be played back in real time and downloaded for further analysis. All recording is done locally and **no data ever leaves the client**.

[Alitu Mic Check](https://mic.alitu.com)

## Setup

To run alitu-mic-check locally you should have the following installed:

- Git
- Node.js
- A Node package manager (yarn, npm, etc.)

1. Download the repository and install the dependencies
   ```sh
   git clone https://github.com/the-podcast-host/alitu-mic-check.git && cd alitu-mic-check && yarn
   ```
2. Start the development server
   ```sh
   yarn dev
   ```
   The development server should now be available on [http://localhost:3000](http://localhost:3000)

## Deployment

The production build exports the app as static files which can be uploaded to any web hosting.

> ℹ️ The app must be served from a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS) due to use of the MediaDevices API.

Use the build command to generate a production build:

```sh
yarn build
```

The build will be created in the `/out` directory which can be uploaded to the host.

## Development

Features for future development:

- Default / Auto Mic Selection
- Additional Download Formats
- Peak Indicator on Sound Meter
- Audio Codec Selection
- Recording Timer / Indicator

## License

The code in this repository is licensed under the terms of GNU Affero General Public License v3.0 specified in the [LICENSE](./LICENSE) file.

The image located at [/public/logo.svg](./public/Logo.svg) is owned by Alitu Podcast Ltd. and is used here with permission. It is not licensed under the same terms as the code and cannot be reused or redistributed without explicit permission from Alitu Podcast Ltd.
