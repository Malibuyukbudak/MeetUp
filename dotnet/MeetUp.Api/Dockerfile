#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MeetUp.Api/MeetUp.Api.csproj", "MeetUp.Api/"]
COPY ["MeetUp.Application/MeetUp.Application.csproj", "MeetUp.Application/"]
COPY ["MeetUp.Core/MeetUp.Core.csproj", "MeetUp.Core/"]
COPY ["MeetUp.Data/MeetUp.Data.csproj", "MeetUp.Data/"]
COPY ["MeetUp.Domain/MeetUp.Domain.csproj", "MeetUp.Domain/"]
RUN dotnet restore "MeetUp.Api/MeetUp.Api.csproj"
COPY . .
WORKDIR "/src/MeetUp.Api"
RUN dotnet build "MeetUp.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MeetUp.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MeetUp.Api.dll"]