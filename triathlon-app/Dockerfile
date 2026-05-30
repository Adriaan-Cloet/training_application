# Stage 1: Build de Angular applicatie
FROM node:24-alpine AS builder

WORKDIR /app

# Installeer Angular CLI
RUN npm install -g @angular/cli@21

# Kopieer package bestanden en installeer dependencies
COPY package*.json ./
RUN npm ci

# Kopieer de rest van de broncode
COPY . .

# Bouw de productie-versie
RUN ng build --configuration production

# Stage 2: Serveer de gebouwde app via Nginx
FROM nginx:alpine

# Kopieer de gebouwde bestanden van de builder stage
COPY --from=builder /app/dist/triathlon-app/browser /usr/share/nginx/html

# Kopieer een custom nginx config voor Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
