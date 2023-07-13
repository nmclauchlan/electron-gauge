#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <chrono>
#include <thread>
#include <cstdlib>
#include <ctime>

#pragma comment(lib, "ws2_32.lib")

#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 3000
#define BUFLEN 512
#define SEND_RATE 30

#define MIN_SPEED 0
#define MAX_SPEED 100

#define MIN_ALTITUDE -100
#define MAX_ALTITUDE 200

int main() {
    WSADATA wsa;
    SOCKET s;
    struct sockaddr_in server;
    char buf[BUFLEN];
    int speed = 50, altitude = 100; // Starting values

    // Initialize winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
    {
        printf("Failed. Error Code : %d", WSAGetLastError());
        return 1;
    }

    // Create socket
    if ((s = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) == SOCKET_ERROR)
    {
        printf("socket() failed with error code : %d", WSAGetLastError());
        return 1;
    }

    // Setup address structure
    memset((char*)&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(SERVER_PORT);

    if (inet_pton(AF_INET, SERVER_IP, &server.sin_addr) <= 0)
    {
        printf("inet_pton() failed\n");
        return 1;
    }

    while (true) {

        // Randoming knots/altitude data
        speed += rand() % 2 ? 1 : -1;
        altitude += rand() % 2 ? 1 : -1;

        if (speed < MIN_SPEED) {
            speed = MIN_SPEED;
        }

        if (speed > MAX_SPEED) {
            speed = MAX_SPEED;
        }

        if (altitude < MIN_ALTITUDE) {
            altitude = MIN_ALTITUDE;
        }

        if (altitude > MAX_ALTITUDE) {
            altitude = MAX_ALTITUDE;
        }

        // Format the message
        sprintf(buf, "%d,%d", speed, altitude);

        // Send the message to server
        if (sendto(s, buf, strlen(buf), 0, (struct sockaddr*)&server, sizeof(server)) == SOCKET_ERROR)
        {
            printf("sendto() failed with error code : %d", WSAGetLastError());
            exit(EXIT_FAILURE);
        }

        printf("%s sent.\n", buf);

        // Throttling send rate
        std::this_thread::sleep_for(std::chrono::milliseconds(1000 / 30));
    }

    closesocket(s);
    WSACleanup();

    return 0;
}