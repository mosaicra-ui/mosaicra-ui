# Mosaicra UI Contributor's Guide

## Introduction

Mosaicra (moh · zay · uhkra) UI Library

### What is the purpose of Mosaicra UI?

The purpose of Mosaicra UI is to provide a unified solution across different frameworks, helping individuals navigate the complexities of using multiple frameworks. Mosaicra UI offers less complex and more customizable components, both for web and mobile, with added animations using frameworks like GSAP and Framer Motion.

### Target Audience

Mosaicra UI is designed for developers who work with frameworks like React, Next.js, Vite, Flutter, HTML, CSS, Tailwind, Laravel, and Django, covering languages such as JavaScript, TypeScript, Java, and Python.

## Getting Started

### How can contributors get access to the codebase?

Contributors can access the codebase on GitHub:
[Mosaicra UI GitHub Repository](https://github.com/mosaicra-ui/mosaicra-ui)

Follow the instructions below to run the project locally using Next.js.

### Installation

#### Clone the repository

```bash
git clone https://github.com/mosaicra-ui/mosaicra-ui.git
```

#### Navigate to the project directory

```bash
cd mosaicra-ui
```

#### Install dependencies

```bash
npm install
# otherwise
npm install --legacy-peer-deps

# or
yarn install
```

### Running the Development Server

To run the development server, execute the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites for Contributing

Contributors should have a basic understanding of web development and hands-on experience in creating UI library elements like buttons, navbars, cards, forms, and other elements. It would be beneficial to have experience with animations using CSS, JavaScript, and frameworks like GSAP and Framer Motion.

## Project Structure

### Overview of the Project Structure

The sidebar on the homepage contains a list of categories with frameworks and documentation on how to use the products. It includes elements like buttons, cards, forms, and many more, accessible via scrolling.

### Key Directories and Files

Contributors should be aware that the codebase also contains articles of ServerX, which should not be disturbed unless they wish to contribute to the articles as well. Contributions to the articles can be made through this repository:
[ServerX Archives GitHub Repository](https://github.com/serverx-org/SERVER-X-ARCHIVES)

## Setting Up the Development Environment

Follow the installation instructions provided in the "Getting Started" section to set up your development environment. Ensure you have Node.js and npm (or Yarn) installed on your system.

## Coding Standards

- Follow the [JavaScript Standard Style](https://standardjs.com/) for coding.
- Use meaningful variable and function names.
- Ensure your code is well-documented.
- Run the linters before submitting your code.

## Creating Components

- Follow the component naming conventions (PascalCase for component names).
- Document your components using JSDoc comments.
- Ensure your components are reusable and customizable.

## Testing

- Use Jest and React Testing Library for testing components.
- Write unit tests for all new components.
- Ensure existing tests pass before submitting your code.

## Submitting Contributions

- Fork the repository and create a new branch for your feature or bug fix.
- Make your changes in the new branch.
- Submit a pull request with a clear description of your changes.
- Ensure all tests pass and your code follows the coding standards.

## Review Process

- Pull requests will be reviewed by the maintainers.
- Reviews typically take a few days.
- Feedback will be provided, and changes may be requested before merging.

## Communication

- Join our [**Slack channel**](https://github.com/mosaicra-ui/contributors) for real-time communication.
- Regular contributor meetings are held every Thursday at 8:30 PM IST.

## Code of Conduct

All contributors must follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). Violations may result in being banned from the project.

<!--
## Resources

- [Project Documentation](https://mosaicra-ui/docs)
- [Tutorials](https://mosaicra-ui/tutorials)
- [API Reference](https://mosaicra-ui/api)
-->
