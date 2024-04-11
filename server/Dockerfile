FROM golang:latest

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

RUN go build -tags netgo -ldflags '-s -w' -o app

COPY . .

EXPOSE 8080

CMD ["./app"]