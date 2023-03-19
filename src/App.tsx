import Footer from "./components/Footer";
import Header from "./components/Header";
import NotesApp from "./pages/NotesApp";

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-blue-100">
      <Header />
      <NotesApp />
      <Footer />
    </div>
  );
}

export default App;
