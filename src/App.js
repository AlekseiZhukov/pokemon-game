import React from "react"

import Header from "./components/Header"
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import './App.css'
import bgImg1 from './assets/images/bg2.jpg'
import bgImg2 from './assets/images/bg1.jpg'


function App() {
  return (
    <>
      <Header title="This is title" descr="This is Description!"/>
      <Layout title="This is title" descr="This is Description!" urlBg={bgImg1} />
      <Layout title="This is title" descr="This is Description!" colorBg="#e2e2e2"/>
      <Layout title="This is title" descr="This is Description!" urlBg={bgImg2}/>
      <Footer />
    </>
  );
}

export default App;
