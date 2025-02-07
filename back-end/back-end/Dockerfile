# Use a Debian-based OpenJDK image
FROM openjdk:23-jdk-slim 

# Install Maven using apt
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven build files
COPY pom.xml ./
COPY src ./src

# Install dependencies and build the application
RUN mvn clean install

# Expose the port your backend runs on
EXPOSE 9090

# Command to run the application
CMD ["java", "-jar", "target/classes/com/breakabletoy/back_end/BackEndApplication.class"]