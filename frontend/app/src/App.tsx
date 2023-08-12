import React from 'react';
import './App.css';
import PostForm from "./components/PostForm";
import TopAppBar from "./components/TopAppBar";

// TODO ルーティング
// TODO consultを追加
function App() {
  return (
    <div className="App">
        <TopAppBar />
        <PostForm />
    </div>
  );
}

export default App;
