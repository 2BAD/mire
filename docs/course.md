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


## Class 8: Load Testing and Performance Analysis
- Introduction to load testing concepts
- Overview of load testing tools:
  - wrk
  - k6
  - Artillery
- Hands-on practice with selected tool(s)
- Understanding and addressing the Coordinated Omission Problem
- Best practices for accurate load testing

Homework:
- Conduct load tests on the application using at least two different tools
- Compare results and analyze differences
- Identify and explain any instances of the Coordinated Omission Problem
- Propose optimizations based on load test results

## Class 9: Monitoring Systems with Prometheus and Grafana
- Introduction to monitoring in DevOps
- Overview of Prometheus:
  - Architecture and components
  - Data model and metrics types
  - Query language (PromQL) basics
- Setting up Prometheus for our application
- Introduction to Grafana:
  - Dashboard creation
  - Data visualization techniques
- Integrating Prometheus with Grafana

Homework:
- Set up Prometheus to monitor our application
- Create custom metrics in the application
- Design and implement Grafana dashboards for key performance indicators
- Use PromQL to create meaningful alerts

## Class 10: Nginx Clustering and Load Balancing
- Advanced Nginx configurations
- Nginx clustering concepts
- Load balancing strategies:
  - Round-robin
  - Least connections
  - IP hash
- Nginx Plus features overview (if applicable)
- High availability setup with Nginx

Homework:
- Implement an Nginx cluster with at least three nodes
- Configure different load balancing strategies and test their performance
- Implement a high availability solution using Nginx
- Analyze and report on the performance differences between various setups

## Class 11: Continuous Integration and Deployment (CI/CD)
- Introduction to CI/CD principles
- Overview of popular CI/CD tools (e.g., Jenkins, GitLab CI, GitHub Actions)
- Setting up a CI/CD pipeline for our application
- Automated testing and deployment strategies

Homework:
- Implement a CI/CD pipeline using a chosen tool
- Include automated testing in the pipeline
- Set up staging and production environments
- Implement a blue-green or canary deployment strategy

## Class 12: Infrastructure as Code (IaC) and Configuration Management
- Introduction to IaC concepts
- Overview of tools like Terraform and Ansible
- Writing infrastructure as code for our application
- Managing configurations across different environments

Homework:
- Create Terraform scripts to provision required infrastructure
- Implement Ansible playbooks for configuration management
- Use IaC to set up a complete environment for our application

## Class 13: Microservices and Service Mesh
- Introduction to microservices architecture
- Decomposing our monolithic application into microservices
- Introduction to service mesh (e.g., Istio)
- Implementing service discovery and communication

Homework:
- Refactor a part of our application into microservices
- Implement service-to-service communication
- Set up a basic service mesh and demonstrate its benefits

## Class 14: Final Project and Course Wrap-up
- Review of key concepts
- Final project presentation and discussion
- Future learning paths in DevOps
- Q&A session

Final Project:
- Design and implement a complete DevOps pipeline for our application
- Incorporate all major concepts covered in the course
- Present the solution, explaining design choices and trade-offs


## Bonus Class 1: Environment Variables and Configuration Management

- Importance of externalized configuration
- Modifying our application to use environment variables
- Managing configurations for different environments (dev, staging, prod)
- Introduction to configuration management tools

## Bonus Class 2: Basic Security Practices

- Overview of web application security
- Securing nginx (HTTPS, basic authentication)
- Managing secrets and sensitive data
- Basic application security practices
