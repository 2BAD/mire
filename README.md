# Mire - Performance Testing API

This project provides a simple API for simulating various performance scenarios, including CPU load, memory usage, and I/O operations. It's designed to help developers and QA engineers test the performance and resilience of their systems under different conditions.

## Table of Contents

- [Mire - Performance Testing API](#mire---performance-testing-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Simulate CPU-intensive operations
- Create controlled memory leaks
- Simulate file I/O operations
- Simulate network requests
- Introduce controlled delays in responses

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/2bad/mire.git
   cd mire
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run start
   ```

The server will start on `http://localhost:3000` by default.

## Usage

You can interact with the API using any HTTP client. Here are some example requests using `curl`:

1. Check if the server is running:
   ```
   curl http://localhost:3000/ping
   ```

2. Simulate a delayed response:
   ```
   curl http://localhost:3000/delay/2000
   ```

3. Perform a CPU-intensive operation:
   ```
   curl http://localhost:3000/cpu/compute/40
   ```

## API Endpoints

- `/ping`: Check if server is running
- `/delay/:ms`: Delayed response
- `/cpu/compute/:n`: Compute nth Fibonacci number
- `/cpu/load`: Simulate random CPU usage
- `/memory`: Get current memory usage
- `/memory/leak`: Create a memory leak
- `/memory/allocate`: Allocate memory
- `/io/read`: Simulate file read operation
- `/io/write`: Simulate file write operation
- `/io/network`: Simulate network request

For more detailed information about the API endpoints, refer to the OpenAPI specification file: `openapi.yml`.

## Configuration

The following environment variables can be used to configure the server:

- `PORT`: The port number on which the server will listen (default: 3000)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
