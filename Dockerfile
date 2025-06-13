# Use the latest Cypress image with pre-installed browsers  
FROM cypress/browsers:node-22.14.0-chrome-133.0.6943.126-1-ff-135.0.1-edge-133.0.3065.82-1  

# Switch to root temporarily for installing dependencies  
USER root

# 🔧 Install Java (OpenJDK 17 works well with Allure)
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean

# 🔧 Set JAVA_HOME and add it to PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# 🛠️ Install Cypress and dependencies
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci && npx cypress install

# 🗂️ Copy rest of your project
COPY . /app/

# ✅ Verify Cypress installation
RUN npx cypress verify

# 👤Drop root privileges after setup
RUN adduser --disabled-password --gecos "" cypressuser
 USER cypressuser

#  Default command — run Allure report
CMD ["npm", "run", "allure:report"]
