# Use a lightweight Node.js base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Create a non-root user and group
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only the necessary files to install dependencies
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Generate the Prisma Client
RUN npx prisma generate

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/api/main.js"]