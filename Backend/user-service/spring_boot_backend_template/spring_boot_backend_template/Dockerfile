FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# ✅ FIX: give execute permission to mvnw
RUN chmod +x mvnw

# build the jar
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/*.jar"]
