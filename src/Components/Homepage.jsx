import React, { useState, useRef } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Homepage() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });
  const center = { lat: 26.9124, lng: 75.7873 };
  if (!isLoaded) console.log("loading...");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const originRef = useRef(""); // to select origin's value
  const destinationRef = useRef(""); // to select destination's value

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("0");
  const [duration, setDuration] = useState("0");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [locations, setLocations] = useState(false);

  const findPath = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    setLocations(true);
    setOrigin(originRef.current.value);
    setDestination(destinationRef.current.value);
    setDirectionsResponse(null);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearAll = () => {
    // clear button to reset everything
    setDirectionsResponse(null);
    setDistance("0");
    setDuration("0");
    setLocations(false);
    originRef.current.value = "";
    destinationRef.current.value = "";
  };
  return (
    <Container>
      <Grid container>
        <Grid item lg={12} md={12} xs={12}>
          <TitleWrapper>
            <Title>
              Let's calculate <span className="dist">distance</span> from Google
              maps
            </Title>
          </TitleWrapper>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <ContainerWrapper>
            <LocationsWrapper>
              {" "}
              <PlacesCont>
                <PlacesWrapper>
                  <Origin>
                    Origin
                    {isLoaded && (
                      <Autocomplete>
                        <TextField
                          hiddenLabel
                          id="filled-hidden-label-small"
                          variant="outlined"
                          size="large"
                          inputRef={originRef}
                          style={{
                            backgroundColor: "white",
                            width: "272px",
                            height: "56px",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon
                                  fontSize="medium"
                                  style={{ color: "red" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Autocomplete>
                    )}
                  </Origin>

                  <Destination>
                    Destination
                    {isLoaded && (
                      <Autocomplete>
                        <TextField
                          hiddenLabel
                          id="filled-hidden-label-small"
                          variant="outlined"
                          size="large"
                          inputRef={destinationRef}
                          style={{
                            backgroundColor: "white",
                            width: "272px",
                            height: "56px",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon
                                  fontSize="medium"
                                  style={{ color: "red" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Autocomplete>
                    )}
                  </Destination>
                </PlacesWrapper>
                <BtnContainer>
                  <Button
                    variant="contained"
                    onClick={findPath}
                    style={{
                      borderRadius: "4rem",
                      height: "3rem",
                      backgroundColor: "#1B31A8",
                    }}
                  >
                    Calculate
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={clearAll}
                    style={{
                      borderRadius: "4rem",
                      height: "3rem",
                      margin: "0.5rem",
                    }}
                  >
                    Clear
                  </Button>
                </BtnContainer>
              </PlacesCont>
              <DetailsCont>
                <DistanceWrapper>
                  <h4>Distance</h4>
                  <span className="distance">
                    <h3>{distance}</h3>
                  </span>
                </DistanceWrapper>
                <EtaWrapper>
                  <h4>Eta </h4>
                  <span className="time">
                    <h3> {duration}</h3>
                  </span>
                </EtaWrapper>
                {locations && (
                  <DetailsWrapper>
                    Distance between <b> {origin.split(",")[0]} </b> and{" "}
                    <b>{destination.split(",")[0]}</b> is <b>{distance}</b> and
                    Estimated time of arrival is <b>{duration}</b>.
                  </DetailsWrapper>
                )}
              </DetailsCont>
            </LocationsWrapper>

            <MapsWrapper>
              <MapsContainer>
                {isLoaded && (
                  <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                      streetViewControl: false,
                    }}
                    onLoad={(map) => setMap(map)}
                  >
                    <Marker position={center} />
                    {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
                  </GoogleMap>
                )}
              </MapsContainer>
            </MapsWrapper>
          </ContainerWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  background-color: #f4f8fa;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
`;
const Title = styled.h3`
  color: #5869bf;
  font-weight: 600;
  .dist {
    color: #1b31a8;
  }
`;
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 83vh;
`;
const LocationsWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlacesCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Origin = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;

  width: "272px";
  height: "56px";
`;
const Destination = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const DetailsCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid black;
`;
const DistanceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;

  .distance {
    color: #0079ff;
    font-size: 1rem;
  }
`;
const EtaWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  font-style: normal;

  .time {
    color: red;
    font-size: 1rem;
    margin-left: 2rem;
  }
`;
const DetailsWrapper = styled.div`
  padding: 1rem;
  .span {
    font-size: bold;
  }
`;

const MapsWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MapsContainer = styled.div`
  width: 90%;
  height: 80%;
`;

export default Homepage;
