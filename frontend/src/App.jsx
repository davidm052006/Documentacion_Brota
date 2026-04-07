import PreLoguin from "./pages/landing/PreLoguin";

function App() {
  return (
    <div>
      {/* 
        App.jsx ahora funciona como tu enrutador principal.
        Solo delegamos la responsabilidad a la pantalla que queremos mostrar.
      */}
      <PreLoguin />
    </div>
  );
}

export default App;