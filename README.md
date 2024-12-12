# DateFnsTimeSlots

## Slot Generator and Viewer

This Angular application allows users to generate time slots within a valid date range and view the slots based on selected time zones. It includes functionality to validate time ranges, ensure valid slot durations, and provide a user-friendly interface for managing and viewing slots.

## Features

- **Slot Generation**: Generate time slots within a valid date range.
- **Customizable Time Intervals**: Specify time intervals between slots and slot duration.
- **Time Zone Handling**: View slots in different time zones, ensuring the correct representation of times.
- **Validation**:
  - Ensure slots are within a valid date range.
  - Validate that slots are not too early or too late.
  - Ensure the slot duration meets the minimum allowed time.

## Technologies Used

- **Angular**: Front-end framework for building the application.
- **date-fns**: Library for date manipulation.
- **date-fns-tz**: Library for handling time zones.
- **Reactive Forms**: Used for form handling and validation in Angular.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [Angular CLI](https://angular.io/cli)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/slot-generator-app.git

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
