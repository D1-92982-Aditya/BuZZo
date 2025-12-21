FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# give execute permission to mvnw
RUN chmod +x mvnw

# build jar using Java 21
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/*.jar"]
