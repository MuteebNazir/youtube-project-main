# 🎥 Premium YouTube Clone — React, Redux Toolkit & Vite

A high-performance, feature-rich **YouTube Clone** built using **React**, **Redux Toolkit**, and **Vite**. This web application connects directly to the official **YouTube Data API v3** to fetch popular charts, display channel statistics, fetch comment threads, and deliver category-based video indexing alongside advanced simulated live chat features.

## 🚀 Key Highlights & Advanced Features

### 🔍 1. Search Debouncing & Autocomplete Caching

- **⚡ Debouncing Engine**: Implements a custom debouncing mechanism in the search input inside `Header.jsx`. Instead of calling the API on every single keystroke, a `setTimeout` delays the API request by `200ms`. If the user continues typing, the timer clears and resets, saving massive API quota and preventing screen jitter.
- **📦 Redux-based Cache Store**: When query suggestions are fetched, they are stored in the Redux `search` slice (`searchSlice.js`) using a key-value mapping (e.g. `{ "react": ["reactjs", "react tutorial", ...] }`). Before any network request is sent, the app inspects the local store. If the query exists in the cache, it is loaded layout-instantly, reducing typing lag to `0ms`.

### 💬 2. Live Chat API Polling & Memory Optimization

- **🔄 Simulated Polling Feed**: Uses a high-frequency polling mechanism in `LiveChat.jsx` to fetch/generate new chat messages every `1.5 seconds` with dynamically generated random names and messages.
- **🧠 Memory-Safe Queue Management**: To prevent browser slowdowns and DOM memory leaks during long stream viewing sessions, the Redux `chat` slice (`chatSlice.js`) restricts the feed to a strict maximum threshold. Once the queue exceeds the limit (e.g., 25 messages), the reducer automatically evicts the oldest message, ensuring a constant memory footprint.

### 🌓 3. Animated Light/Dark Theme & Local Storage

- **🎨 CSS Custom Variables System**: The app uses a highly flexible, unified design system in `index.css` leveraging CSS Custom Properties (`--bg-color`, `--text-color`, `--border-color`, `--hover-bg`, etc.) bound to `:root` and `[data-theme='dark']`.
- **⚙️ Persisted Selection**: Toggling the theme writes the preference to `localStorage`, which is read during app initialization so the user's theme is retained across reloads.
- **✨ Gorgeous Sun/Moon Icon Animation**: The theme button is styled with high-performance CSS transitions. On hover, the button scales up and rotates slightly. On click, the sun/moon SVG icons rotate 360 degrees and animate using a custom `@keyframes scaleUp` scaling fade, providing a state-of-the-art interactive feedback loop.
- **👁️ Seamless Asset Inversion**: In Dark Mode, the app automatically applies an `invert(1) hue-rotate(180deg)` CSS filter to the YouTube logo to turn its white background pitch black while keeping the red play button color perfectly intact.

### 🔀 4. Smart Dual-Mode Video Fetching

- **⚡ Category ID Mode**: When standard categories (e.g. _Gaming, Songs, Cooking, Sports_) are selected, the application queries YouTube's popular chart API directly with the corresponding category ID.
- **🔍 Keyword Search Fallback**: For custom developer topics (e.g. _ReactNative, Adobe AfterEffect, Motion Designer, SaaS_), the app gracefully falls back to the search query endpoint, feeding results into the identical video card grid layout.

### 💎 5. Premium UI Elements

- **🌈 Continuous Glow Edge**: The **Resume** button features a continuous, multi-color glowing edge background using an absolute `::before` pseudo-element with a rotating linear-gradient, sitting permanently behind the button background.
- **🌀 Perfect Circular Scroll Controls**: Left and right horizontal slider scroll buttons are styled with absolute circular dimensions (`40px` by `40px`) to prevent any layout distortion on hover.
- **📏 Sticky Header & Responsive SideBar**: A sticky top navigation bar with absolute Suggestions box positioning (`z-index: 1000`) and a collapsible sidebar transitions cleanly between expanded lists and minimal home icons.

### 🛠️ 6. Core React Architecture Concepts

- **✨ Functional Components**: Developed entirely with React Functional Components and Modern Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useSelector`, `useDispatch`, `useOutletContext`).
- **🧩 Shimmer UI Concept**: Uses structural loading skeletons to optimize the user's Perceived Load Time (PLT) before content completes rendering.
- **⚡ Higher-Order Components (HOC)**: Leverages higher-order composition patterns for card wrappers and design highlights.
- **🔀 Lifting State Up**: Employs React state lifting patterns to coordinate active category navigation states across the sidebar, header, and content views.
- **💬 Nested Comments Section**: Renders multi-threaded comment reply hierarchies recursively to mirror nested discussions on standard YouTube watches.
- **📺 Watch Page via iframe**: Displays YouTube streams inside an embedded `iframe` using the video ID extracted directly from the router URL parameter.

---

## 🛠️ Tech Stack & Deployment

- **Core Language**: `React 19` & `JavaScript (ES6+)`
- **Build Tool & Bundler**: `Vite` (pre-configured for fast hot-reloads)
- **Global State Management**: Redux Toolkit (`@reduxjs/toolkit` and `react-redux`)
- **Routing**: `React Router DOM` (v6)
- **Date Utilities**: `moment` (for human-readable upload times like "3 days ago")
- **Icons**: `react-icons`
- **Styling**: `Vanilla CSS` with CSS Variables and HSL dynamic coloring systems
- **Hosting Options**:
  - **Vercel hosting**
  - **AWS Services Hosting**: Compatible with AWS Amplify, S3, and EC2 configurations.

---

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/youtube-project.git
cd youtube-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add API Keys

Create a file at `utils/constants.js` and export your YouTube API credentials:

```javascript
export const GOOGLE_API_KEY = "YOUR_YOUTUBE_DATA_API_KEY";
```

### 4. Start Development Server

```bash
npm start
```

The application will launch on your local host (usually `http://localhost:1234`).

### 5. Build for Production

To bundle the project for production:

```bash
npm run build
```

---

## 📂 Project Structure

```
youtube-project/
├── assets/             # Assets and custom fonts
├── components/         # React components
│   ├── Header.jsx      # Top navigation search & theme toggle
│   ├── SideBar.jsx     # Navigation sidebar (collapsible)
│   ├── VideoCard.jsx   # Grid cards showing video thumbnails & view count formatting
│   ├── WatchPage.jsx   # Embedded player, description toggling & comments list
│   ├── LiveChat.jsx    # Live chat message polling feed
│   └── ThemeToggle.jsx # Animated Sun/Moon theme switcher
├── utils/              # Redux slices and constant definitions
│   ├── appSlice.js     # Controls sidebar states and theme toggles
│   ├── searchSlice.js  # Caches autocomplete search results
│   ├── chatSlice.js    # Manages chat message streams
│   └── store.js        # Configures Redux store
├── index.css           # Global vanilla CSS stylesheet and theme definitions
├── index.html          # Application entry HTML template
├── vite.config.js      # Vite compiler config
└── package.json        # Dependencies & scripts
```

---

## ⚙️ Engineering & Performance Details

### Debouncing logic in Search:

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    if (searchCache[searchQuery]) {
      setSuggestions(searchCache[searchQuery]);
    } else {
      getSearchSuggestions();
    }
  }, 200);

  return () => clearTimeout(timer);
}, [searchQuery]);
```

### API Polling & Chat Queue constraints:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    // Polls / Generates new message and pushes to store
    dispatch(
      addMessage({ name: "User", message: "New live chat message! 🚀" }),
    );
  }, 1500);

  return () => clearInterval(interval);
}, []);
```

_The `addMessage` reducer automatically trims the message array size to `25` inside the Redux slice._
