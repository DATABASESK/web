const { useState, useEffect } = React;
const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

const App = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [activationKey, setActivationKey] = useState("");
  const validKeys = ["SK19", "SK20", "SKYT", "ANI", "GAYU"]; // Example keys

  const handleActivation = () => {
    if (validKeys.includes(activationKey.toUpperCase())) {
      setIsActivated(true);
    } else {
      alert("Invalid Key. Please try again.");
    }
  };

  return (
    <BrowserRouter>
      {isActivated ? (
        <MainApp />
      ) : (
        <div style={{ textAlign: "center", padding: "50px", background: "black", color: "white" }}>
          <h1>Enter Activation Key</h1>
          <input
            type="text"
            value={activationKey}
            onChange={(e) => setActivationKey(e.target.value)}
            style={{ padding: "10px", margin: "20px", borderRadius: "5px", width: "300px" }}
          />
          <button
            onClick={handleActivation}
            style={{ padding: "10px 20px", borderRadius: "5px", background: "orange", color: "white" }}
          >
            Activate
          </button>
        </div>
      )}
    </BrowserRouter>
  );
};

const MainApp = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Drawer />
      <Routes>
        <Route path="/" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/tamil" />} />
        <Route path="/hollywood" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/Hollywood" />} />
        <Route path="/kids" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/PRIVATE" />} />
      </Routes>
    </div>
  );
};

const Drawer = () => {
  const links = [
    { path: "/", label: "Tamil Movies" },
    { path: "/hollywood", label: "Hollywood" },
    { path: "/kids", label: "Kids Movies" },
  ];

  return (
    <div style={{ background: "#222", color: "#fff", width: "200px", padding: "20px" }}>
      <h2>Menu</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <Link to={link.path} style={{ textDecoration: "none", color: "white" }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MovieGrid = ({ apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [apiUrl]);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, padding: "20px", background: "#000", color: "white" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies..."
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {filteredMovies.map((movie, index) => (
          <div key={index} style={{ width: "calc(25% - 10px)", background: "#222", borderRadius: "10px", padding: "10px" }}>
            <img src={movie.uri} alt={movie.name} style={{ width: "100%", borderRadius: "5px" }} />
            <p style={{ textAlign: "center", marginTop: "10px" }}>{movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
