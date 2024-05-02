# CroCompass

 CroCompass is a dynamic web platform designed to serve as a comprehensive guide for tourists and locals alike, showcasing restaurants, attractions, and unique spots across Croatia. Developed specifically for the TVZ MC2 competition, this application allows different types of users, such as administrators, advertisers, and general users, to interact with the platform in ways tailored to their roles.

## Features

 - **User Authentication**: Secure login and registration system with different roles (Admin, Advertiser, User).
 - **Dynamic Content Management**: Admins can manage users and advertisements; Advertisers can create and manage their advertisements.
 - **Interactive Maps**: Users can explore various attractions through an integrated mapping system.
 - **Reviews and Ratings**: Users can post reviews and rate attractions and establishments.
 - **Responsive Design**: Optimized for various devices, ensuring a seamless user experience.

 ## Technologies Used

 - **Frontend**: React (with React-Bootstrap for styling)
 - **Backend**: ASP.NET Core Web API
 - **Database**: SQLite (for development), configurable for production environments
 - **Authentication**: ASP.NET Identity for user management and JWT for authentication
 - **API Testing**: Postman

 ## Getting Started

 These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

 ### Prerequisites

 - .NET 5.0 SDK
 - Node.js
 - A modern web browser

 ### Installing

 1. **Clone the repository**

    ```
    git clone https://github.com/yourgithubusername/crocompass.git
    cd crocompass
    ```

 2. **Set up the backend**

    Navigate to the backend directory and restore the .NET dependencies.

    ```
    cd CroCompassBackend
    dotnet restore
    ```

    Run the application.

    ```
    dotnet run
    ```

 3. **Set up the frontend**

    Navigate to the frontend directory and install the npm packages.
    
    ```
    cd ../CroCompassFrontend
    npm install
    ```

    Start the React application.

    ```
    npm start
    ```

    The application should now be running on `http://localhost:3000`.

 ### Configuration

 Ensure all configurations in `appsettings.json` and environment-specific settings are correctly set according to your development environment.

 ## Usage

 Once the application is running, you can register as a new user or log in using predefined credentials if you've set up seed data. Explore the functionalities based on the user role.

 ## Contributing

 Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

 1. Fork the Project
 2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
 3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
 4. Push to the Branch (`git push origin feature/AmazingFeature`)
 5. Open a Pull Request

 ## License

 Distributed under the MIT License. See `LICENSE` for more information.

 ## Contact

 Mario Žitković - mariozitkovic@gmail.com
 
 Borna Jurak - borna.jurak3@gmail.com

 Project Link: [https://github.com/yourgithubusername/crocompass](https://github.com/MarioZitko/CroCompass)

 ## Acknowledgements

 - [TVZ](http://www.tvz.hr)
 - [React Bootstrap](https://react-bootstrap.github.io/)
 - [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
