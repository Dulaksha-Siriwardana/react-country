# Countries Explorer

A React application that allows users to explore countries around the world using the REST Countries API. The application features personalized session management, country details, search functionality, and region filtering.

## Features

- **Personalized Welcome**: Users are asked for their name and country when they first visit
- **User's Country First**: Initially shows details of the user's own country
- **Search Functionality**: Search for countries by name
- **Region Filtering**: Filter countries by region
- **Responsive Design**: Works on desktop and mobile devices
- **Session Management**: User preferences are stored between visits

## API Usage

This application uses the [REST Countries API](https://restcountries.com/) (v3.1) to fetch country data. The API endpoints used include:

- `GET /all` - Retrieve all countries (with specific fields)
- `GET /name/{name}` - Search for countries by name
- `GET /region/{region}` - Filter countries by region
- `GET /alpha/{code}` - Get detailed information about a specific country

The API implementation can be found in the `src/service/api.js` file, which uses Axios for HTTP requests.

## Project Structure

```
countries-explorer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CountryCard.js
│   │   ├── FilterBar.js
│   │   ├── Header.js
│   │   ├── SearchBar.js
│   │   └── WelcomeForm.js
│   ├── context/
│   │   └── UserContext.js
│   ├── pages/
│   │   ├── CountryPage.js
│   │   └── HomePage.js
│   ├── service/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## How to Run the Project

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone 
   cd countries-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Session Management

The application implements a simple yet effective session management approach:

### How It Works

1. **User Context Provider**:
   - A React Context API (`UserContext.js`) is used to manage user state throughout the application
   - User data is stored in the browser's localStorage for persistence between sessions

2. **Initial Experience**:
   - When a user first visits the site, they're presented with a welcome form
   - The form asks for their name and country
   - This information is stored in localStorage for future visits

3. **Personalized Navigation Flow**:
   - After providing their information, users are immediately redirected to their country's details page
   - A special welcome message appears when users view their own country
   - The header displays the user's name and country flag throughout the application

4. **Session Persistence**:
   - User data (name and country) persists across page refreshes and browser sessions
   - No backend or authentication is required for this simple implementation
   - Users can continue using the application seamlessly on return visits


## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration or adding custom CSS in the appropriate component files.

### API Fields

You can modify the fields fetched from the API by updating the query parameters in the API functions in `src/service/api.js`.
