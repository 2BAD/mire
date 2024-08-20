# DevOps Beginners Course Outline

## Class 1: Introduction to DevOps and Our Application

- What is DevOps?
- Importance of DevOps in modern software development
- Overview of our sample application
  - Purpose and structure
  - Key features (CPU load simulation, memory management, I/O operations)

## Class 2: Version Control and Code Management

- Introduction to Git
- Basic Git commands (clone, add, commit, push, pull)
- Cloning our application repository
- Best practices for version control

## Class 3: Understanding the Application

- Walkthrough of the application structure
- Explanation of key functions:
  - CPU load simulation
  - Memory management
  - I/O operations
  - Network request simulation

## Class 4: Building and Running the Application

- Introduction to Node.js and npm
- Installing dependencies
- Running the application locally
- Basic debugging and logging practices

## Class 5: Containerization with Docker

- Introduction to containerization concepts
- Docker basics (images, containers, Dockerfile)
- Creating a Dockerfile for our application
- Building and running the application as a Docker container

## Class 6: Introduction to nginx and Reverse Proxying

- What is a reverse proxy?
- Introduction to nginx
- Basic nginx configuration
- Benefits of using nginx with our application

## Class 7: Setting up nginx as a Reverse Proxy

- Creating an nginx configuration for our application
- Introduction to Docker Compose
- Creating a Docker Compose file for nginx and our application
- Running and testing the proxied setup

## Class 8: Basic Monitoring and Logging

- Importance of monitoring in DevOps
- Using our application's endpoints for monitoring (/cpu/load, /memory, etc.)
- Viewing and managing logs from nginx and our application
- Introduction to basic monitoring tools

## Class 9: Simple CI/CD Pipeline

- Introduction to Continuous Integration/Continuous Deployment
- Setting up a basic GitHub Actions workflow
- Automating build and test processes
- Discussing more advanced CI/CD concepts

## Class 10: Scaling and Load Balancing

- Concepts of scaling in web applications
- Using Docker Compose to run multiple instances of our application
- Configuring nginx for load balancing
- Testing and verifying load balanced setup

## Class 11: Environment Variables and Configuration Management

- Importance of externalized configuration
- Modifying our application to use environment variables
- Managing configurations for different environments (dev, staging, prod)
- Introduction to configuration management tools

## Class 12: Basic Security Practices

- Overview of web application security
- Securing nginx (HTTPS, basic authentication)
- Managing secrets and sensitive data
- Basic application security practices

## Throughout the Course

Use various endpoints in our application to demonstrate different aspects of system behavior and DevOps practices:

- /cpu/load: Demonstrate need for monitoring and autoscaling
- /memory endpoints: Discuss resource allocation in containerized environments
- /io endpoints: Discuss storage considerations in cloud environments

This course structure provides a comprehensive introduction to DevOps practices, utilizing our custom-built application as a practical, hands-on learning tool. It covers the basics of application deployment, containerization, server management, and introduces important DevOps tools and concepts.
