import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
  margin: 1em auto;
`;

const Header = styled.h1`
  color: red;
  text-align: center;
`;
const P = styled.p`
  text-align: center;
`;

const Imagecontainer = styled.div`
  margin: 2em auto;
  display: block;
  width: 70em;
`;

const Searching = styled.div`
  margin: 2em 2em 2em 35em;
  display: block;
`;
const Image = styled.img`
  height: 15em;
  width: 15em;
  padding: 1em;
`;

const unsplash = createApi({
  accessKey: "API_ACCESS_KEY",
});

const App = () => {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    if (count < 5) {
      setCount(count + 1);
      unsplash.photos
        .getRandom({
          count: 4,
        })
        .then((r) => {
          if (r.type === "success") {
            setImages(r.response);
          }
        });
    } else {
      unsplash.search
        .getPhotos({
          query: searchText,
          page: 1,
          perPage: 4,
        })
        .then((r) => {
          if (r.type == "success") {
            setImages(r.response.results);
          }
        });
    }
  };

  return (
    <div className="App">
      <Header>Welcome to React Random Image Generator!</Header>
      <P>Here you can browse random images from Unsplash.</P>
      <Imagecontainer>
        {images.map((i) => (
          <Image src={i.urls.thumb} />
        ))}
      </Imagecontainer>
      {count >= 5 && (
        <Searching>
          <label htmlFor="imagename">Search</label>
          <input
            type="text"
            id="imagename"
            name="imagename"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Searching>
      )}
      <Button onClick={getImages}>
        {count >= 5 ? "Search" : "Generate Images"}
      </Button>
    </div>
  );
};

export default App;
