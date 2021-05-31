# container to run the app
FROM openjdk:8

# default environment variables
ARG PORT=8008
ARG JARFILE=target/api-gateway-0.0.1-SNAPSHOT.jar

# container setup
VOLUME [ "/tmp" ]
EXPOSE ${PORT}

# jar file
COPY ${JARFILE} /opt/symphony/app.jar

WORKDIR /opt/symphony
ENTRYPOINT [ "java", "-jar", "app.jar" ]