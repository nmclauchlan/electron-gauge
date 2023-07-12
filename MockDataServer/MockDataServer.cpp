#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <chrono>
#include <thread>

#pragma comment(lib, "ws2_32.lib")

#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 3000
#define BUFLEN 512

int main() {
    WSADATA wsa;
    SOCKET s;
    struct sockaddr_in server;
    char buf[BUFLEN];
    char message[] = "Hello from client!";

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
        // Send the message to server
        if (sendto(s, message, strlen(message), 0, (struct sockaddr*)&server, sizeof(server)) == SOCKET_ERROR)
        {
            printf("sendto() failed with error code : %d", WSAGetLastError());
            exit(EXIT_FAILURE);
        }

        // Wait for one second
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    closesocket(s);
    WSACleanup();

    return 0;
}