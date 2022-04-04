FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
WORKDIR /app
EXPOSE 80

#ENV ASPNETCORE_URLS=http://+:8080

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /src
COPY ["LogViewer/LogViewer.csproj", "LogViewer/"]
RUN dotnet restore "LogViewer/LogViewer.csproj"
COPY . .
WORKDIR "/src/LogViewer"
RUN dotnet build "LogViewer.csproj" -c Release -o /app/build

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs -yq

FROM build AS publish
RUN dotnet publish "LogViewer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LogViewer.dll"]

######

