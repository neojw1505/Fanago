<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Fanago Frontend - Admin</h3>

  <p align="center">
    An all-in-one ticketing system designed to streamline the process of booking tickets for music concerts and a variety of other events.
    <br />
    <a href="https://github.com/IS442-OOP-2024/ticket-master-swiftie.git">View Demo</a>
    ·
    <a href="https://github.com/IS442-OOP-2024/ticket-master-swiftie/issues/new?assignees=&labels=bug&template=bug-report.md&title=%5BMICROSERVICE_NAME%5D%3A+ISSUE_TITLE">Report Bug</a>
    ·
    <a href="https://github.com/IS442-OOP-2024/ticket-master-swiftie/issues/new?assignees=&labels=enhancement&template=feature-request.md&title=%5BMICROSERVICE_NAME%5D%3A+FEATURE_TITLE">Request Feature</a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Fanago is a comprehensive ticketing system designed to serve as a centralized hub for both event organizers and attendees, facilitating the management, distribution, and purchase of tickets efficiently. Fanago Customer serves as the main platform for customers to browse, book, and manage tickets for a wide range of events, including music concerts, and other entertainment events.

Admin Side has 2 main roles: Event Manager and Ticketing Officer

Key Features for Event Manager
- See all events
- Edit Events
- Delete Events
- Edit Venues
- View Event Statistics on Dashboard based on Event
- Download Event Statistics as CSV
- Adding Ticketing Officer

Key Features for Ticketing Officer
- Verify Ticket Validity using QR Code
- On-Site Ticket Booking
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [AWS Amplify](https://aws.amazon.com/amplify/) - Hosting and CI/CD
- [AWS Cognito](https://aws.amazon.com/cognito/) - Identity Provider
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Stripe](https://stripe.com/) - Payment Gateway

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- Ensure env file is created in the root directory following the `.env.example` template.

- yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo (make sure to cd into fanago-cux later on)
   ```sh
   git clone https://github.com/IS442-OOP-2024/ticket-master-swiftie.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Run the development server
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
