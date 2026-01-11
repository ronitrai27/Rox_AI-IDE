"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [recipe, setRecipe] = React.useState("");
  const handleClick = () => {
    setLoading(true);

    axios
      .get("/api/demo")
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to generate recipe");
        setLoading(false);
      });
  };
  return (
    <div className="p-8">
      <p>this is the home page</p>

      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Generating..." : "Generate Recipe"}
      </Button>

      {recipe && <div className="mt-8">
        <h2>Recipe:</h2>
        <p>{recipe}</p>
      </div>}

      {error && <div className="mt-8">
        <h2>Error:</h2>
        <p>{error}</p>
      </div>}
    </div>
  );
};

export default Home;
